import { type LogContext, LogLevel } from "./enums";

const LOG_PREFIX = {
  [LogLevel.Debug]: "DEBUG",
  [LogLevel.Info]: "INFO",
  [LogLevel.Warning]: "WARN",
  [LogLevel.Error]: "ERROR",
  [LogLevel.Critical]: "CRIT",
  [LogLevel.Fatal]: "FATAL",
} as const;

function formatTimestamp(): string {
  return new Date().toISOString();
}

function formatMetadata(metadata?: Record<string, unknown>): string {
  if (!metadata || Object.keys(metadata).length === 0) return "";
  try {
    return ` ${JSON.stringify(metadata)}`;
  } catch {
    return " [unserializable metadata]";
  }
}

function log(
  level: LogLevel,
  context: LogContext,
  message: string,
  metadata?: Record<string, unknown>,
): void {
  const prefix = LOG_PREFIX[level];
  const timestamp = formatTimestamp();
  const meta = formatMetadata(metadata);
  const output = `[${timestamp}] [${prefix}] [${context}] ${message}${meta}`;

  switch (level) {
    case LogLevel.Error:
    case LogLevel.Critical:
    case LogLevel.Fatal: {
      console.error(output);
      break;
    }
    case LogLevel.Warning: {
      console.warn(output);
      break;
    }
    default: {
      console.log(output);
      break;
    }
  }
}

export const logger = {
  debug(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Debug, context, message, metadata);
  },

  info(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Info, context, message, metadata);
  },

  warn(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Warning, context, message, metadata);
  },

  error(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Error, context, message, metadata);
  },

  critical(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Critical, context, message, metadata);
  },

  fatal(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Fatal, context, message, metadata);
  },

  success(
    context: LogContext,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    log(LogLevel.Info, context, message, { ...metadata, success: true });
  },
};
