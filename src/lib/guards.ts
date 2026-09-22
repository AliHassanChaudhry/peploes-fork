import { ALLOWED_URL_SCHEMES } from "@/lib/constants";

export function isValidUrl(value: string): boolean {
  if (value.startsWith("/") || value.startsWith("#")) return true;

  try {
    const urlObject = new URL(value, "https://example.com");
    return ALLOWED_URL_SCHEMES.includes(
      urlObject.protocol as (typeof ALLOWED_URL_SCHEMES)[number],
    );
  } catch {
    return false;
  }
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidErrorCode(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}
