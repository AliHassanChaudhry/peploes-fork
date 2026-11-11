import { spawn, spawnSync } from "node:child_process";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import { PerformanceError } from "./manifest";

function terminateWindowsProcessTree(pid: number, executable: string): void {
  // Windows has no POSIX process groups; wait for the whole tree to stop.
  const result = spawnSync(executable, ["/pid", String(pid), "/t", "/f"], {
    windowsHide: true,
    stdio: "ignore",
    timeout: 10000,
  });
  if (result.error) throw result.error;
  if (result.status === 0) return;
  // A collector can exit between cancellation and taskkill.
  process.kill(pid, 0);
  throw new PerformanceError(
    `Audit process tree termination failed (${result.status}).`,
  );
}

export function runCommand(
  args: readonly string[],
  options: {
    readonly cwd: string;
    readonly log: string;
    readonly env: NodeJS.ProcessEnv;
    readonly signal: AbortSignal;
    readonly timeoutMs: number;
  },
): Promise<number> {
  return new Promise((resolve, reject) => {
    const [command, ...argv] = args;
    if (!command) return reject(new PerformanceError("Missing executable."));
    options.signal.throwIfAborted();
    const windowsDirectory = process.env.SystemRoot;
    const taskkill =
      process.platform === "win32" && windowsDirectory
        ? join(windowsDirectory, "System32", "taskkill.exe")
        : undefined;
    if (process.platform === "win32" && !taskkill)
      return reject(new PerformanceError("Windows SystemRoot is required."));
    const output = createWriteStream(options.log, { flags: "wx" });
    const child = spawn(command, argv, {
      cwd: options.cwd,
      env: options.env,
      detached: process.platform !== "win32",
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout.pipe(output, { end: false });
    child.stderr.pipe(output, { end: false });
    let stopped = false;
    let logError: Error | undefined;
    let escalation: ReturnType<typeof setTimeout> | undefined;
    const killGroup = (signal: NodeJS.Signals) => {
      if (!child.pid) return;
      try {
        if (taskkill) {
          terminateWindowsProcessTree(child.pid, taskkill);
          return;
        }
        process.kill(-child.pid, signal);
      } catch (error) {
        if (
          !(error instanceof Error && "code" in error && error.code === "ESRCH")
        )
          reject(error);
      }
    };
    const stop = () => {
      if (stopped) return;
      stopped = true;
      killGroup("SIGTERM");
      if (process.platform === "win32") return;
      escalation = setTimeout(() => {
        killGroup("SIGKILL");
      }, 3000);
    };
    const timer = setTimeout(stop, options.timeoutMs);
    options.signal.addEventListener("abort", stop, { once: true });
    const cleanup = () => {
      clearTimeout(timer);
      clearTimeout(escalation);
      options.signal.removeEventListener("abort", stop);
    };
    output.on("error", (error) => {
      logError = error;
      stop();
    });
    child.on("error", (error) => {
      cleanup();
      output.end();
      reject(error);
    });
    child.on("close", (code) => {
      const finish = () => {
        cleanup();
        if (logError) return reject(logError);
        if (stopped)
          return reject(
            new PerformanceError(
              "Audit command aborted or timed out; population is invalid.",
            ),
          );
        resolve(code ?? 1);
      };
      if (output.destroyed) finish();
      else output.end(finish);
    });
  });
}
