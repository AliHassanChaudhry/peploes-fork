import { ANALYTICS } from "@/lib/constants";
import type { IEventRecord, IEventSignature } from "@/lib/types";

const eventHistory: Map<string, IEventRecord> = new Map();

function generateEventSignature(event: IEventSignature): string {
  if (
    !event ||
    typeof event !== "object" ||
    !event.eventName ||
    !event.params
  ) {
    console.warn("[GA4] Invalid event signature input");
    return "";
  }

  const sortedParams = Object.fromEntries(
    Object.keys(event.params)
      .sort()
      .map((key) => [key, event.params[key]]),
  );

  return `${event.eventName}::${JSON.stringify(sortedParams)}`;
}

export function isDuplicate(
  eventName: string,
  params: Record<string, unknown>,
): boolean {
  if (!eventName || typeof eventName !== "string") {
    console.warn("[GA4] Invalid eventName provided to isDuplicate");
    return false;
  }

  const signature = generateEventSignature({ eventName, params });
  if (!signature) return false;

  const now = Date.now();
  const record = eventHistory.get(signature);

  if (!record) return false;

  return now - record.timestamp < ANALYTICS.DEDUP_WINDOW_MS;
}

export function recordEvent(
  eventName: string,
  params: Record<string, unknown>,
): void {
  if (!eventName || typeof eventName !== "string") {
    console.warn("[GA4] Invalid eventName provided to recordEvent");
    return;
  }

  const signature = generateEventSignature({ eventName, params });
  if (!signature) return;

  if (eventHistory.size >= ANALYTICS.MAX_HISTORY_SIZE) {
    cleanupOldEvents();

    if (eventHistory.size >= ANALYTICS.MAX_HISTORY_SIZE) {
      evictOldestEntry();
    }
  }

  eventHistory.set(signature, {
    signature,
    timestamp: Date.now(),
  });
}

function cleanupOldEvents(): void {
  const cutoff = Date.now() - ANALYTICS.DEDUP_WINDOW_MS;

  for (const [signature, record] of eventHistory.entries()) {
    if (record.timestamp >= cutoff) continue;
    eventHistory.delete(signature);
  }
}

function evictOldestEntry(): void {
  let oldestSignature: string | null = null;
  let oldestTimestamp = Infinity;

  for (const [sig, record] of eventHistory.entries()) {
    if (record.timestamp < oldestTimestamp) {
      oldestTimestamp = record.timestamp;
      oldestSignature = sig;
    }
  }

  if (oldestSignature) {
    eventHistory.delete(oldestSignature);
  }
}

export function clearEventHistory(): void {
  eventHistory.clear();
}
