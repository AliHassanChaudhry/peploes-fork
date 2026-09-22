import "server-only";

import type { SeverityLevel } from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";
import { ZodError } from "zod";

import { ErrorType, LogContext, LogLevel, SentryTag } from "./enums";
import { logger } from "./logger";
import type { ISentryLogConfig } from "./types";

function mapLogLevelToSeverity(level: LogLevel): SeverityLevel {
  const mapping: Record<LogLevel, SeverityLevel> = {
    [LogLevel.Debug]: "debug",
    [LogLevel.Info]: "info",
    [LogLevel.Warning]: "warning",
    [LogLevel.Error]: "error",
    [LogLevel.Critical]: "fatal",
    [LogLevel.Fatal]: "fatal",
  };
  return mapping[level] ?? "error";
}

function applySentryScope(scope: Sentry.Scope, config: ISentryLogConfig): void {
  scope.setLevel(mapLogLevelToSeverity(config.level ?? LogLevel.Error));
  scope.setTag(SentryTag.Module, config.module);
  scope.setTag(SentryTag.Stage, config.stage);

  if (config.errorType) {
    scope.setTag(SentryTag.ErrorType, config.errorType);
  }

  if (config.tags) {
    for (const [key, value] of Object.entries(config.tags)) {
      scope.setTag(key, value);
    }
  }

  if (config.context) {
    for (const [ctxKey, ctxVal] of Object.entries(config.context)) {
      scope.setContext(ctxKey, ctxVal as Record<string, unknown>);
    }
  }
}

export function logToSentry(error: unknown, config: ISentryLogConfig): void {
  Sentry.withScope((scope) => {
    applySentryScope(scope, config);
    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage(String(error));
    }
  });
}

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export function createValidationErrorResponse(error: ZodError): {
  success: false;
  message: string;
  errors: Record<string, string>;
} {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.join(".");
    fieldErrors[field] = issue.message;
  }
  return {
    success: false,
    message: "Please check the form for errors",
    errors: fieldErrors,
  };
}

function logErrorToConsole(error: unknown, config: ISentryLogConfig): void {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  logger.error(LogContext.ErrorHandler, `Error in ${config.module}`, {
    stage: config.stage,
    errorType: config.errorType,
    message,
    stack,
    context: config.context,
  });
}

export const GENERIC_ERROR_MESSAGE =
  "Something went wrong, please refresh and try again";

export async function safeServerAction<T>(
  action: () => Promise<T>,
  sentryConfig: ISentryLogConfig,
): Promise<
  T | { success: false; message: string; errors?: Record<string, string> }
> {
  try {
    return await action();
  } catch (error: unknown) {
    if (isZodError(error)) {
      const config = { ...sentryConfig, errorType: ErrorType.ValidationError };
      logErrorToConsole(error, config);
      logToSentry(error, config);
      return createValidationErrorResponse(error);
    }
    logErrorToConsole(error, sentryConfig);
    logToSentry(error, sentryConfig);
    return { success: false, message: GENERIC_ERROR_MESSAGE };
  }
}

export function logNonThrowableError(
  message: string,
  config: ISentryLogConfig,
  metadata?: Record<string, unknown>,
): void {
  const errorSuffix = metadata?.error ? ` - ${metadata.error}` : "";
  logger.error(
    LogContext.ErrorHandler,
    `${config.module}: ${message}${errorSuffix}`,
    {
      stage: config.stage,
      errorType: config.errorType,
      ...config.context,
      ...metadata,
    },
  );
}
