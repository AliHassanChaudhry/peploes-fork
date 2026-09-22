import { ANALYTICS } from "@/lib/constants";
import type { IUTMParameters } from "@/lib/types";

function hasUTMParams(params: IUTMParameters): boolean {
  return Object.keys(params).length > 0;
}

export function extractUTMFromURL(url?: string): IUTMParameters {
  if (typeof window === "undefined") return {};

  const urlString = url ?? window.location.href;
  const urlParams = new URL(urlString).searchParams;
  const utmParams: IUTMParameters = {};

  for (const key of ANALYTICS.UTM_KEYS) {
    const value = urlParams.get(key);
    if (!value) continue;
    utmParams[key] = value;
  }

  return utmParams;
}

export function storeUTMParams(params: IUTMParameters): void {
  if (typeof window === "undefined") return;
  if (!hasUTMParams(params)) return;

  const data = { params, timestamp: Date.now() };

  sessionStorage.setItem(ANALYTICS.UTM_STORAGE_KEY, JSON.stringify(data));
}

export function getStoredUTMParams(): IUTMParameters {
  if (typeof window === "undefined") return {};

  const stored = sessionStorage.getItem(ANALYTICS.UTM_STORAGE_KEY);
  if (!stored) return {};

  let data: { params: IUTMParameters; timestamp: number } | null = null;

  try {
    data = JSON.parse(stored) as {
      params: IUTMParameters;
      timestamp: number;
    } | null;
  } catch {
    sessionStorage.removeItem(ANALYTICS.UTM_STORAGE_KEY);
    return {};
  }

  if (!data || typeof data.timestamp !== "number") {
    sessionStorage.removeItem(ANALYTICS.UTM_STORAGE_KEY);
    return {};
  }

  const expiryMs = ANALYTICS.UTM_EXPIRY_HOURS * 60 * 60 * 1000;

  if (Date.now() - data.timestamp > expiryMs) {
    sessionStorage.removeItem(ANALYTICS.UTM_STORAGE_KEY);
    return {};
  }

  return data.params ?? {};
}

export function getCurrentUTMParams(): IUTMParameters {
  const urlParams = extractUTMFromURL();

  if (hasUTMParams(urlParams)) {
    storeUTMParams(urlParams);
    return urlParams;
  }

  return getStoredUTMParams();
}

export function initializeUTMTracking(): IUTMParameters {
  if (typeof window === "undefined") return {};
  return getCurrentUTMParams();
}
