"use client";

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CALENDAR_NAMES } from "@/lib/constants";
import { dublinToday, isCalendarDate } from "@/lib/dates";
import type { IDateCalendarProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DateCalendar({
  id,
  value,
  min,
  onChange,
  className,
}: IDateCalendarProps) {
  const initialDate =
    isCalendarDate(value) && (!min || value >= min)
      ? value
      : (min ?? dublinToday());
  const [month, setMonth] = useState(() => startOfMonth(parseISO(initialDate)));
  const [activeDate, setActiveDate] = useState(initialDate);
  const calendar = useRef<HTMLFieldSetElement>(null);
  const days = eachDayOfInterval({
    start: startOfWeek(month, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
  });

  function changeMonth(offset: number) {
    const next = addMonths(month, offset);
    const first = format(next, "yyyy-MM-dd");
    if (!isCalendarDate(first)) return;
    setMonth(next);
    setActiveDate(min && first < min ? min : first);
  }

  function moveDay(event: KeyboardEvent<HTMLButtonElement>, day: Date) {
    const next = new Map([
      ["ArrowLeft", addDays(day, -1)],
      ["ArrowRight", addDays(day, 1)],
      ["ArrowUp", addDays(day, -7)],
      ["ArrowDown", addDays(day, 7)],
      ["Home", startOfWeek(day, { weekStartsOn: 1 })],
      ["End", endOfWeek(day, { weekStartsOn: 1 })],
      ["PageUp", addMonths(day, -1)],
      ["PageDown", addMonths(day, 1)],
    ]).get(event.key);
    if (!next) return;
    event.preventDefault();
    const date = format(next, "yyyy-MM-dd");
    if (!isCalendarDate(date)) return;
    const target = min && date < min ? min : date;
    setMonth(startOfMonth(parseISO(target)));
    setActiveDate(target);
    requestAnimationFrame(() => {
      calendar.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${target}"]`)
        ?.focus();
    });
  }

  return (
    <fieldset
      ref={calendar}
      id={id}
      className={cn(
        "pdc-calendar @container absolute z-5 top-[calc(100%_+_6px)] left-0 w-[min(100%,_700px)] min-w-0 pt-4! pr-4! pb-4! pl-4! border border-solid border-[var(--booking-border,_var(--soft-stone))] rounded-[4px] bg-[var(--booking-control,_var(--warm-cream))] bg-none text-ink shadow-[0_10px_24px_color-mix(in_srgb,_var(--ink)_10%,_transparent)] [&_button]:grid [&_button]:place-items-center [&_button]:pt-0! [&_button]:pr-0! [&_button]:pb-0! [&_button]:pl-0! [&_button]:border-0 [&_button]:border-none [&_button]:border-current [&_button]:bg-transparent [&_button]:bg-none [&_button]:text-inherit [&_button]:cursor-pointer [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-solid [&_button:focus-visible]:outline-[var(--booking-accent,_var(--peploe-burgundy))] [&_button:focus-visible]:outline-offset-2 [&_button:disabled]:opacity-40 [&_button:disabled]:cursor-not-allowed [&_button:hover:not(:disabled,_[aria-pressed=true])]:bg-[var(--booking-emblem,_color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))_)] [&_button:hover:not(:disabled,_[aria-pressed=true])]:bg-none lg:w-[min(100%,_400px)]",
        className,
      )}
      aria-label="Choose date"
    >
      <div
        className={
          "pdc-header flex items-center gap-1.5 mb-3 text-[length:14px] [&_strong]:mr-auto [&_button]:w-8 [&_button]:h-8 [&_button]:rounded-[4px] [&_svg]:w-4 [&_svg]:h-4 lg:text-[length:16px] lg:[&_button]:w-9 lg:[&_button]:h-9 [@container_(width_<_280px)]:text-[length:12px] [@container_(width_<_280px)]:[&_button]:w-7 [@container_(width_<_280px)]:[&_button]:h-7"
        }
      >
        <strong aria-live="polite">{format(month, "MMMM yyyy")}</strong>
        <Button
          variant="plain"
          type="button"
          aria-label="Previous month"
          disabled={Boolean(min && format(month, "yyyy-MM") <= min.slice(0, 7))}
          onClick={() => changeMonth(-1)}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <Button
          variant="plain"
          type="button"
          aria-label="Next month"
          disabled={!isCalendarDate(format(addMonths(month, 1), "yyyy-MM-dd"))}
          onClick={() => changeMonth(1)}
        >
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
      <div
        className={
          "pdc-grid grid grid-cols-7 gap-1 [&_>_*]:grid [&_>_*]:place-items-center [&_>_*]:min-w-0 [&_>_*]:min-h-8 [&_>_*]:text-[length:12px] [&_button]:rounded-[50%] [&_button]:aspect-[1] [&_[data-outside=true]]:text-[var(--booking-muted,_var(--text-secondary))] [&_[data-past-week=true]]:hidden [&_[aria-pressed=true]]:bg-[var(--booking-accent,_var(--peploe-burgundy))] [&_[aria-pressed=true]]:bg-none [&_[aria-pressed=true]]:text-[var(--booking-surface,_var(--warm-cream))] lg:[&_>_*]:text-[length:14px] lg:[&_>_*]:min-h-9 [@container_(width_<_280px)]:[&_>_*]:text-[length:12px] [@container_(width_<_280px)]:[&_>_*]:min-h-6 [@container_(width_<_280px)]:[&_>_span]:text-[length:11px] forced-colors:[&_[aria-pressed=true]]:outline-2 forced-colors:[&_[aria-pressed=true]]:outline-solid forced-colors:[&_[aria-pressed=true]]:outline-[Highlight] forced-colors:[&_[aria-pressed=true]]:outline-offset-[-2px]"
        }
      >
        {days.slice(0, 7).map((day) => (
          <span key={day.getDay()}>
            {CALENDAR_NAMES.weekdaysShort[day.getDay()]}
          </span>
        ))}
        {days.map((day) => {
          const date = format(day, "yyyy-MM-dd");
          return (
            <Button
              variant="plain"
              type="button"
              key={date}
              aria-label={format(day, "EEEE, d MMMM yyyy")}
              aria-pressed={date === value}
              data-outside={!isSameMonth(day, month)}
              data-date={date}
              data-past-week={Boolean(
                min &&
                  format(endOfWeek(day, { weekStartsOn: 1 }), "yyyy-MM-dd") <
                    min,
              )}
              tabIndex={date === activeDate ? 0 : -1}
              disabled={!isCalendarDate(date) || Boolean(min && date < min)}
              onFocus={() => setActiveDate(date)}
              onKeyDown={(event) => moveDay(event, day)}
              onClick={() => onChange(date)}
            >
              {format(day, "d")}
            </Button>
          );
        })}
      </div>
    </fieldset>
  );
}
