"use client";

import { useEffect, useState } from "react";

import { BOOKING_HOLD } from "@/lib/constants/booking";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import type { ITableBookingHoldTimerProps } from "@/lib/types";

export function TableBookingHoldTimer({
  endsAt,
  onExpire,
}: ITableBookingHoldTimerProps) {
  const [now, setNow] = useState(() => performance.now());
  const left = Math.max(0, endsAt - now - BOOKING_HOLD.submitMinRemainingMs);
  const seconds = Math.ceil(left / 1000);

  useEffect(() => {
    const tick = setInterval(() => setNow(performance.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (left === 0) onExpire();
  }, [left, onExpire]);

  return (
    <p
      role="timer"
      className={
        "booking-holdTimer mt-0 mr-0 mb-6 ml-0 pl-[var(--booking-summary-inset)] pr-[var(--booking-summary-inset)] text-[var(--booking-accent)] text-[length:18px] font-semibold text-right tabular-nums leading-6.5"
      }
    >
      {TABLE_BOOKING_CONTENT.heldFor(
        `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`,
      )}
    </p>
  );
}
