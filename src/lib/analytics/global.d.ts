interface Window {
  gtag?: (
    command: "event" | "config" | "set" | "js",
    eventName: string,
    params?: Record<string, unknown>,
  ) => void;
  clientErrorLog?: unknown[];
  dataLayer?: unknown[];
}
