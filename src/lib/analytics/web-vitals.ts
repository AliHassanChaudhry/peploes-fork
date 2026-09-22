"use client";

import { useEffect } from "react";

import { ANALYTICS } from "@/lib/constants";
import {
  GA4AlertType,
  GA4Event,
  PerfRating,
  WebVitalsMetricName,
} from "@/lib/enums";

import { trackCustomEvent } from "./client";

function getRating(name: WebVitalsMetricName, value: number): PerfRating {
  const thresholds = ANALYTICS.THRESHOLDS[name];

  if (value <= thresholds.good) return PerfRating.Good;
  if (value <= thresholds.needsImprovement) return PerfRating.NeedsImprovement;
  return PerfRating.Poor;
}

function handleMetric(
  name: WebVitalsMetricName,
  value: number,
  id: string,
  delta: number,
): void {
  const rating = getRating(name, value);

  trackCustomEvent(GA4Event.WebVitals, {
    metric_name: name,
    metric_value: Math.round(
      name === WebVitalsMetricName.Cls ? value * 1000 : value,
    ),
    metric_rating: rating,
    metric_delta: Math.round(
      name === WebVitalsMetricName.Cls ? delta * 1000 : delta,
    ),
    metric_id: id,
  });

  if (rating === PerfRating.Poor) {
    trackCustomEvent(GA4Event.PerformanceAlert, {
      alert_type: GA4AlertType.PoorPerformance,
      metric_name: name,
      metric_value: Math.round(value),
      metric_rating: rating,
    });
  }

  if (
    name === WebVitalsMetricName.Lcp &&
    value > ANALYTICS.THRESHOLDS.LCP.needsImprovement
  ) {
    trackCustomEvent(GA4Event.SlowLcp, {
      lcp_value: Math.round(value),
      lcp_rating: rating,
      alert_type: GA4AlertType.SlowLcp,
    });
  }
}

export function useWebVitals(): void {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      import("web-vitals")
        .then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
          onCLS(({ value, id, delta }) =>
            handleMetric(WebVitalsMetricName.Cls, value, id, delta),
          );
          onINP(({ value, id, delta }) =>
            handleMetric(WebVitalsMetricName.Inp, value, id, delta),
          );
          onLCP(({ value, id, delta }) =>
            handleMetric(WebVitalsMetricName.Lcp, value, id, delta),
          );
          onFCP(({ value, id, delta }) =>
            handleMetric(WebVitalsMetricName.Fcp, value, id, delta),
          );
          onTTFB(({ value, id, delta }) =>
            handleMetric(WebVitalsMetricName.Ttfb, value, id, delta),
          );
        })
        .catch((error) => {
          console.warn(ANALYTICS.ERROR_MESSAGES.WEB_VITALS_LOAD_FAILED, error);
        });
    }, ANALYTICS.WEB_VITALS_LOAD_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);
}
