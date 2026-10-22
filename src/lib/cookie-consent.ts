import { z } from "zod";

import { COOKIE_PREFERENCES } from "@/lib/constants/cookie-consent";
import type { ICookiePreferences } from "@/lib/types";

export const cookiePreferencesSchema = z.object({
  analytics: z.boolean(),
  performance: z.boolean(),
  marketing: z.boolean(),
});

let denyOptionalCookies = false;

export function getCookiePreferences(): ICookiePreferences {
  if (typeof window === "undefined" || denyOptionalCookies) {
    return COOKIE_PREFERENCES.defaults;
  }
  try {
    const stored = window.localStorage.getItem(COOKIE_PREFERENCES.storageKey);
    const result = cookiePreferencesSchema.safeParse(
      stored ? JSON.parse(stored) : null,
    );
    return result.success ? result.data : COOKIE_PREFERENCES.defaults;
  } catch {
    return COOKIE_PREFERENCES.defaults;
  }
}

export function saveCookiePreferences(
  preferences: ICookiePreferences,
): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(
      COOKIE_PREFERENCES.storageKey,
      JSON.stringify(preferences),
    );
    denyOptionalCookies = false;
    return true;
  } catch {
    // A failed withdrawal must override older consent that is still readable.
    denyOptionalCookies = true;
    return false;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getCookiePreferences().analytics;
}
