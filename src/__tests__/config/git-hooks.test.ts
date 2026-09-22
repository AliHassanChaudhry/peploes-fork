import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const hookDirectory = path.resolve(".husky");
let checkout: string;

function git(...args: string[]) {
  return execFileSync("git", args, { cwd: checkout, encoding: "utf8" });
}

function runHook(
  hook: string,
  input = "",
  environment: Record<string, string> = {},
) {
  return spawnSync("sh", [path.join(hookDirectory, hook)], {
    cwd: checkout,
    input,
    encoding: "utf8",
    env: {
      ...process.env,
      CI: "",
      ALLOW_PROTECTED_PUSH: "",
      TEST_LINT_EXIT: "0",
      PATH: `${checkout}:${process.env.PATH}`,
      ...environment,
    },
  });
}

describe("Git hook safeguards", () => {
  beforeEach(() => {
    checkout = mkdtempSync(path.join(tmpdir(), "starter-hook-test-"));
    git("init", "--quiet", "--template=", "--initial-branch=chore/test/hooks");
    writeFileSync(
      path.join(checkout, "bun"),
      '#!/bin/sh\nif [ "$2" = lint ]; then exit "$TEST_LINT_EXIT"; fi\nexit 0\n',
      { mode: 0o755 },
    );
    writeFileSync(path.join(checkout, "bunx"), "#!/bin/sh\nexit 0\n", {
      mode: 0o755,
    });
  });

  afterEach(() => {
    rmSync(checkout, { recursive: true, force: true });
  });

  it("preserves staged content and later unstaged edits", () => {
    const filename = "partially staged.ts";
    writeFileSync(path.join(checkout, filename), "export const count = 1;\n");
    git("add", "--", filename);
    writeFileSync(path.join(checkout, filename), "export const count = 2;\n");

    expect(runHook("pre-commit").status).toBe(0);
    expect(git("show", `:${filename}`)).toBe("export const count = 1;\n");
    expect(readFileSync(path.join(checkout, filename), "utf8")).toBe(
      "export const count = 2;\n",
    );
  });

  it.each(["dev", "main"])(
    "rejects a push from a ticket branch to %s",
    (destination) => {
      const result = runHook(
        "pre-push",
        `refs/heads/chore/test/hooks ${"1".repeat(40)} refs/heads/${destination} ${"2".repeat(40)}\n`,
      );
      expect(result.status).toBe(1);
      expect(result.stdout + result.stderr).toContain(destination);
    },
  );

  it("checks every destination, including protected branch deletion", () => {
    const result = runHook(
      "pre-push",
      `HEAD ${"1".repeat(40)} refs/heads/chore/test/hooks ${"2".repeat(40)}\n(delete) ${"0".repeat(40)} refs/heads/dev ${"2".repeat(40)}\n`,
    );
    expect(result.status).toBe(1);
    expect(result.stdout + result.stderr).toContain("refs/heads/dev");
  });

  it("allows a feature destination regardless of the local branch name", () => {
    git("symbolic-ref", "HEAD", "refs/heads/dev");
    const result = runHook(
      "pre-push",
      `refs/heads/dev ${"1".repeat(40)} refs/heads/chore/test/hooks ${"0".repeat(40)}\n`,
    );
    expect(result.status).toBe(0);
  });

  it("allows an explicit protected-push exception while retaining checks", () => {
    const input = `HEAD ${"1".repeat(40)} refs/heads/dev ${"2".repeat(40)}\n`;
    expect(
      runHook("pre-push", input, { ALLOW_PROTECTED_PUSH: "true" }).status,
    ).toBe(0);
    expect(
      runHook("pre-push", input, {
        ALLOW_PROTECTED_PUSH: "true",
        TEST_LINT_EXIT: "7",
      }).status,
    ).toBe(7);
  });

  it.each(["pre-commit", "pre-push"])(
    "%s propagates a failing lint gate",
    (hook) => {
      expect(runHook(hook, "", { TEST_LINT_EXIT: "7" }).status).toBe(7);
    },
  );

  it("rejects staged conflict markers", () => {
    writeFileSync(
      path.join(checkout, "conflict.txt"),
      "<<<<<<< HEAD\nleft\n=======\nright\n>>>>>>> incoming\n",
    );
    git("add", "--", "conflict.txt");
    const result = runHook("pre-commit");
    expect(result.status).not.toBe(0);
    expect(result.stdout + result.stderr).toContain("conflict marker");
  });
});
