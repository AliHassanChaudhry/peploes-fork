"use client";

import { useEffect } from "react";
import { trackCustomEvent } from "@/lib/analytics/client";
import type { ITrackEventProps } from "@/lib/types";

export function TrackEvent({ eventName, params }: ITrackEventProps) {
  useEffect(() => {
    trackCustomEvent(eventName, params ?? {});
  }, [eventName, params]);

  return null;
}
