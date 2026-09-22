"use client";

import { GA4Event } from "@/lib/enums";
import { env } from "@/lib/env";

import type { IPurchaseParams } from "@/lib/types";
import { hasAnalyticsConsent } from "../cookie-consent";
import { logGA4Event } from "./debug";
import { isDuplicate, recordEvent } from "./deduplication";
import { getCurrentUTMParams } from "./utm";

export const GA_MEASUREMENT_ID = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function isGAEnabled(): boolean {
  return (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    !!GA_MEASUREMENT_ID &&
    hasAnalyticsConsent()
  );
}

function enrichWithUTM(params: unknown): Record<string, unknown> {
  const utmParams = getCurrentUTMParams();
  const safeParams =
    params !== null && typeof params === "object" ? params : {};
  return { ...safeParams, ...utmParams };
}

function sendEvent(eventName: string, params: Record<string, unknown>): void {
  logGA4Event(eventName, params);

  if (!isGAEnabled()) return;
  if (isDuplicate(eventName, params)) return;

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  recordEvent(eventName, params);
}

export function trackPageView(params?: {
  page_location?: string;
  page_title?: string;
}): void {
  if (typeof window === "undefined") return;

  const enrichedParams = enrichWithUTM({
    page_location: params?.page_location ?? window.location.href,
    page_title: params?.page_title ?? document.title,
  });

  sendEvent(GA4Event.PageView, enrichedParams);
}

export function trackPurchase(params: IPurchaseParams): void {
  const enrichedParams = enrichWithUTM(params);
  sendEvent(GA4Event.Purchase, enrichedParams);
}

export function trackCustomEvent(
  eventName: string,
  params: Record<string, unknown>,
): void {
  const enrichedParams = enrichWithUTM(params);
  sendEvent(eventName, enrichedParams);
}
