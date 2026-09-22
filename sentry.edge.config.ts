import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";
const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "";

try {
  Sentry.init({
    dsn,
    enabled: Boolean(dsn),
    tracesSampleRate: isProd ? 0.15 : 1.0,
    profilesSampleRate: 0,
    debug: false,
  });
} catch (e) {
  console.error("Sentry edge init failed:", e);
}
