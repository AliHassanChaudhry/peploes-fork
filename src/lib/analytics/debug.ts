import type { IEventLogData } from "@/lib/types";

const isDev = process.env.NODE_ENV === "development";

const STYLES = {
  ga4: "background: #4285F4; color: white; padding: 2px 6px; border-radius: 3px;",
  params: "color: #666; font-style: italic;",
} as const;

function formatParams(params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) return "";

  const filtered = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
    .join(", ");

  return filtered ? ` (${filtered})` : "";
}

export function logAnalyticsEvent({
  platform,
  event,
  params,
  eventId,
}: IEventLogData): void {
  if (!isDev) return;

  const eventIdStr = eventId ? ` [${eventId.slice(0, 8)}]` : "";
  const paramsStr = formatParams(params);

  console.log(
    `%c${platform}%c ${event}${eventIdStr}${paramsStr}`,
    STYLES.ga4,
    STYLES.params,
  );
}

export function logGA4Event(
  event: string,
  params?: Record<string, unknown>,
): void {
  logAnalyticsEvent({ platform: "GA4", event, params });
}
