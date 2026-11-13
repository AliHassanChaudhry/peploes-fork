"use client";

import {
  addDays,
  addMonths,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown } from "lucide-react";
import {
  type KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { TableBookingCalendarSkeleton } from "@/components/app/molecules/table-booking-skeleton";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import { dublinToday, isBookableDay, monthGrid } from "@/lib/dates";
import type { ITableBookingDateProps } from "@/lib/types";

export function TableBookingDate({
  value,
  calendar,
  availability,
  onChange,
}: ITableBookingDateProps) {
  const [open, setOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(value);
  const grid = useRef<HTMLFieldSetElement>(null);
  const focusedDay = useRef<string | null>(null);
  const [month, setMonth] = useState(() => startOfMonth(parseISO(value)));
  const selectedMonth = value.slice(0, 7);
  const [previousSelectedMonth, setPreviousSelectedMonth] =
    useState(selectedMonth);

  if (selectedMonth !== previousSelectedMonth) {
    setPreviousSelectedMonth(selectedMonth);
    setMonth(startOfMonth(parseISO(value)));
  }
  const trigger = useRef<HTMLButtonElement>(null);
  const today = dublinToday();
  const minimum = today > calendar.today ? today : calendar.today;
  const firstMonth = startOfMonth(parseISO(minimum));
  const lastMonth = calendar.lastDate
    ? startOfMonth(parseISO(calendar.lastDate))
    : null;
  const atFirstMonth = !isAfter(month, firstMonth);
  const atLastMonth = lastMonth !== null && !isBefore(month, lastMonth);
  const days = monthGrid(month).filter(
    (day) =>
      !isBefore(day, startOfWeek(parseISO(minimum), { weekStartsOn: 1 })),
  );
  const openDates = availability.datesFor(month);
  const { load } = availability;

  function isUnavailable(date: string, available = openDates) {
    return (
      date < minimum ||
      !isBookableDay(date, calendar) ||
      (Array.isArray(available) && !available.includes(date))
    );
  }
  const tabDay =
    days.find(
      (day) =>
        format(day, "yyyy-MM-dd") === activeDate && !isUnavailable(activeDate),
    ) ?? days.find((day) => !isUnavailable(format(day, "yyyy-MM-dd")));

  const tabDate = tabDay ? format(tabDay, "yyyy-MM-dd") : undefined;

  useLayoutEffect(() => {
    if (
      !open ||
      !focusedDay.current ||
      !grid.current?.querySelector(
        `[data-date="${focusedDay.current}"]:disabled`,
      )
    )
      return;
    if (tabDate) {
      grid.current
        .querySelector<HTMLButtonElement>(`[data-date="${tabDate}"]`)
        ?.focus();
    } else {
      trigger.current?.focus();
    }
  }, [open, tabDate]);

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
    const targetMonth = startOfMonth(next);
    if (
      isBefore(targetMonth, firstMonth) ||
      (lastMonth && isAfter(targetMonth, lastMonth))
    )
      return;
    const forward =
      event.key === "Home" || (event.key !== "End" && !isBefore(next, day));
    const candidates = monthGrid(targetMonth);
    if (!forward) candidates.reverse();
    const available = availability.datesFor(targetMonth) ?? "loading";
    const target = candidates.find(
      (candidate) =>
        (forward ? !isBefore(candidate, next) : !isAfter(candidate, next)) &&
        !isUnavailable(format(candidate, "yyyy-MM-dd"), available),
    );
    if (!target) return;
    const date = format(target, "yyyy-MM-dd");
    setMonth(targetMonth);
    setActiveDate(date);
    requestAnimationFrame(() => {
      grid.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${date}"]`)
        ?.focus();
    });
  }

  useEffect(() => {
    if (open) load(month);
  }, [open, month, load]);

  return (
    <fieldset
      className={"booking-dateField relative grid min-w-0 gap-1 lg:gap-2"}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <span
        id="booking-date-label"
        className={
          "booking-fieldLabel text-[length:14px] lg:text-[length:16px] lg:font-medium leading-5 lg:leading-6"
        }
      >
        {TABLE_BOOKING_CONTENT.date.label}
      </span>
      <button
        ref={trigger}
        type="button"
        aria-labelledby="booking-date-label booking-date-value"
        aria-expanded={open}
        aria-controls={"booking-calendar"}
        className={
          "booking-selection flex items-center gap-2 w-full h-12 pt-0 pr-[13px] pb-0 pl-[13px] border border-solid border-[var(--booking-border)] rounded-[4px] bg-[var(--booking-control)] bg-none text-[var(--booking-value)] text-[length:16px] font-normal text-left [&&:disabled]:pointer-events-auto [&&:disabled]:cursor-not-allowed [&&:disabled]:opacity-100 lg:h-13 lg:gap-3 lg:pt-0 lg:pr-4 lg:pb-0 lg:pl-4 lg:text-[length:16px] [@media_(min-width:_1024px)_and_(max-width:_1279px)]:gap-3 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:pl-4 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:pr-4 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:text-[length:16px] [&&:not(:disabled)]:cursor-pointer [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 [&&[aria-expanded=true]]:border-[var(--booking-accent)] leading-6 lg:leading-6"
        }
        onFocus={() => {
          focusedDay.current = null;
        }}
        onClick={() => {
          const today = dublinToday();
          if (value < today) onChange(today);
          setOpen(!open);
        }}
      >
        <CalendarDays
          aria-hidden="true"
          className={
            "booking-fieldIcon w-6 h-6 shrink-0 stroke-[1.5] lg:w-6 lg:h-6"
          }
        />
        <span id="booking-date-value">
          {value
            ? format(parseISO(value), "EEE, d MMM yyyy")
            : TABLE_BOOKING_CONTENT.date.placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={
            "booking-chevron w-4 h-4 ml-auto shrink-0 stroke-[1.5] lg:w-4 lg:h-4"
          }
        />
      </button>
      {open && (
        <fieldset
          ref={grid}
          id={"booking-calendar"}
          className={
            "booking-calendar [@media_(prefers-reduced-motion:_no-preference)]:animate-[peploes-booking-open_180ms_ease-out] [&&_button]:cursor-pointer [&&_button:focus-visible]:outline-2 [&&_button:focus-visible]:outline-solid [&&_button:focus-visible]:outline-[var(--booking-accent)] [&&_button:focus-visible]:outline-offset-3 absolute z-5 top-[calc(100%_+_6px)] left-0 w-[min(100%,_700px)] pt-4 pr-4 pb-4 pl-4 border border-solid border-[var(--booking-border)] rounded-[4px] bg-[var(--booking-control)] bg-none shadow-[0_10px_24px_#0000001a] lg:w-[min(100%,_400px)] lg:pt-4 lg:pr-4 lg:pb-4 lg:pl-4"
          }
          aria-label="Choose date"
          onFocusCapture={(event) => {
            focusedDay.current =
              event.target instanceof HTMLButtonElement
                ? (event.target.dataset.date ?? null)
                : null;
          }}
        >
          <div
            className={
              "booking-calendarHeader flex items-center gap-1.5 mb-3 text-[length:14px] [&&_strong]:mr-auto [&&_button]:grid [&&_button]:place-items-center [&&_button]:w-8 [&&_button]:h-8 [&&_svg]:w-4 [&&_svg]:h-4 [&&_button[aria-disabled=true]]:text-[var(--booking-muted)] [&&_button[aria-disabled=true]]:opacity-45 [&&_button[aria-disabled=true]]:cursor-not-allowed lg:text-[length:16px] lg:mb-3 lg:[&&_button]:w-9 lg:[&&_button]:h-9"
            }
          >
            <strong aria-live="polite">{format(month, "MMMM yyyy")}</strong>
            <button
              type="button"
              aria-label="Previous month"
              aria-disabled={atFirstMonth}
              onClick={() => {
                if (!atFirstMonth) {
                  const next = addMonths(month, -1);
                  setMonth(next);
                  setActiveDate(format(next, "yyyy-MM-dd"));
                }
              }}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              aria-disabled={atLastMonth}
              onClick={() => {
                if (!atLastMonth) {
                  const next = addMonths(month, 1);
                  setMonth(next);
                  setActiveDate(format(next, "yyyy-MM-dd"));
                }
              }}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <div
            className={
              "booking-calendarGrid grid grid-cols-7 gap-1 [&&_>_*]:grid [&&_>_*]:place-items-center [&&_>_*]:min-w-0 [&&_>_*]:min-h-8 [&&_>_*]:text-[length:12px] [&&_button]:rounded-[50%] [&&_button]:aspect-[1] [&&_[data-outside=true]]:text-[var(--booking-muted)] [&&_[aria-pressed=true]]:bg-[var(--booking-accent)] [&&_[aria-pressed=true]]:bg-none [&&_[aria-pressed=true]]:text-[var(--booking-surface)] [&&_button:hover:not([aria-pressed=true],_:disabled)]:bg-[var(--booking-emblem)] [&&_button:hover:not([aria-pressed=true],_:disabled)]:bg-none [&&_button:disabled]:text-[var(--booking-muted)] [&&_button:disabled]:opacity-45 [&&_button:disabled]:cursor-not-allowed lg:gap-y-2.5 lg:[&&_>_*]:text-[length:14px] lg:[&&_>_*]:min-h-9 lg:[&&_button]:w-9 lg:[&&_button]:h-9 lg:[&&_button]:justify-self-center lg:[&&_button]:aspect-[auto]"
            }
          >
            {TABLE_BOOKING_CONTENT.weekdays.map((day) => (
              <span key={day} className={undefined}>
                {day}
              </span>
            ))}
            {days.map((day) => {
              const date = format(day, "yyyy-MM-dd");
              return (
                <button
                  type="button"
                  key={date}
                  aria-label={format(day, "EEEE, d MMMM yyyy")}
                  aria-pressed={date === value}
                  disabled={isUnavailable(date)}
                  data-date={date}
                  tabIndex={day === tabDay ? 0 : -1}
                  onFocus={() => setActiveDate(date)}
                  onKeyDown={(event) => moveDay(event, day)}
                  data-outside={!isSameMonth(day, month)}
                  onClick={() => {
                    const today = dublinToday();
                    onChange(date < today ? today : date);
                    setOpen(false);
                    trigger.current?.focus();
                  }}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
          <p
            role="status"
            className={
              "booking-calendarStatus min-h-4.5 mt-2 mr-0 mb-0 ml-0 text-[var(--booking-muted)] text-[length:12px] leading-4.5"
            }
          >
            {openDates === "loading" && TABLE_BOOKING_CONTENT.checkingDates}
            <span hidden={openDates !== "loading"}>
              <TableBookingCalendarSkeleton />
            </span>
          </p>
        </fieldset>
      )}
    </fieldset>
  );
}
