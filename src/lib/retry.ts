import { err, ok, type Result } from "neverthrow";
import type { IAppError } from "./types";

export async function retry<R>(
  fn: () => Promise<Result<R, IAppError>>,
  maxRetries: number,
  baseDelayMs: number,
  shouldRetry?: (error: IAppError) => boolean,
): Promise<Result<R, IAppError>> {
  let lastError: IAppError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await fn();

    if (result.isOk()) {
      return ok(result.value);
    }

    lastError = result.error;

    if (attempt < maxRetries) {
      if (shouldRetry && !shouldRetry(lastError)) {
        break;
      }

      const delay = baseDelayMs * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return err(
    lastError ?? {
      code: "INTERNAL_ERROR" as never,
      message: "Retry failed but no error was captured",
    },
  );
}
