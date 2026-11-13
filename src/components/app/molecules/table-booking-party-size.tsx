"use client";

import { ChevronDown, UserRound, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import type { ITableBookingPartySizeProps } from "@/lib/types";

export function TableBookingPartySize({
  value,
  min,
  max,
  onChange,
}: ITableBookingPartySizeProps) {
  const { label } = TABLE_BOOKING_CONTENT.partySize;
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);
  const field = useRef<HTMLFieldSetElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const activeOption = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !field.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open]);

  useEffect(() => {
    if (open && active)
      activeOption.current?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function choose(count: string) {
    onChange(count);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  function moveActive(direction: number) {
    const index = options.findIndex((count) => String(count) === active);
    const next = Math.max(0, Math.min(index + direction, options.length - 1));
    setActive(open ? String(options[next]) : value);
    setOpen(true);
  }

  return (
    <fieldset
      ref={field}
      className={"booking-field grid min-w-0 gap-1 lg:gap-2"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <span
        id="booking-party-size-label"
        className={
          "booking-fieldLabel text-[length:14px] lg:text-[length:16px] lg:font-medium leading-5 lg:leading-6"
        }
      >
        {label}
      </span>
      <div className={"booking-selectWrapper relative min-w-0"}>
        <Button
          variant="plain"
          ref={trigger}
          type="button"
          role="combobox"
          aria-labelledby="booking-party-size-label"
          aria-expanded={open}
          aria-controls={open ? "booking-party-options" : undefined}
          aria-haspopup="listbox"
          aria-activedescendant={
            open ? `booking-party-option-${active}` : undefined
          }
          className={
            "booking-selection [&&]:flex [&&]:items-center [&&]:gap-2 [&&]:w-full [&&]:h-12 [&&]:pt-0 [&&]:pr-[13px] [&&]:pb-0 [&&]:pl-[13px] [&&]:border [&&]:border-solid [&&]:border-[var(--booking-border)] [&&]:rounded-[4px] [&&]:bg-[var(--booking-control)] [&&]:bg-none [&&]:text-[var(--booking-value)] [&&]:text-[length:16px] [&&]:font-normal [&&]:text-left [&&:disabled]:pointer-events-auto [&&:disabled]:cursor-not-allowed [&&:disabled]:opacity-100 lg:[&&]:h-13 lg:[&&]:gap-3 lg:[&&]:pt-0 lg:[&&]:pr-4 lg:[&&]:pb-0 lg:[&&]:pl-4 lg:[&&]:text-[length:16px] [@media_(min-width:_1024px)_and_(max-width:_1279px)]:[&&]:gap-3 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:[&&]:pl-4 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:[&&]:pr-4 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:[&&]:text-[length:16px] [&&:not(:disabled)]:cursor-pointer [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 [&&[aria-expanded=true]]:border-[var(--booking-accent)] [&&]:leading-6 lg:[&&]:leading-6"
          }
          onClick={() => {
            setActive(value);
            setOpen(!open);
          }}
          onKeyDown={(event) => {
            switch (event.key) {
              case "Escape":
                if (open) event.preventDefault();
                setOpen(false);
                break;
              case "Tab":
                setOpen(false);
                break;
              case "Enter":
              case " ":
                event.preventDefault();
                if (open) choose(active);
                else {
                  setActive(value);
                  setOpen(true);
                }
                break;
              case "ArrowDown":
                event.preventDefault();
                moveActive(1);
                break;
              case "ArrowUp":
                event.preventDefault();
                moveActive(-1);
                break;
              case "Home":
              case "End":
                event.preventDefault();
                setActive(
                  String(
                    event.key === "Home"
                      ? options[0]
                      : options[options.length - 1],
                  ),
                );
                setOpen(true);
                break;
              default:
                if (options.some((count) => String(count) === event.key)) {
                  event.preventDefault();
                  setActive(event.key);
                  setOpen(true);
                }
            }
          }}
        >
          <UserRound
            aria-hidden="true"
            className={
              "booking-fieldIcon w-6 h-6 shrink-0 stroke-[1.5] lg:w-6 lg:h-6"
            }
          />
          <span>
            {value} {value === "1" ? "guest" : "guests"}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={
              "booking-chevron w-4 h-4 ml-auto shrink-0 stroke-[1.5] lg:w-4 lg:h-4"
            }
          />
        </Button>
        {open && (
          <div
            id="booking-party-options"
            role="listbox"
            aria-labelledby="booking-party-size-label"
            className={
              "booking-partyOptions [@media_(prefers-reduced-motion:_no-preference)]:animate-[peploes-booking-open_180ms_ease-out] absolute z-5 top-[calc(100%_-_1px)] left-0 grid w-full max-h-[min(332px,_60svh)] gap-[3px] overflow-y-auto overscroll-contain pt-[9px] pr-[9px] pb-[9px] pl-[9px] border border-solid border-[var(--booking-border)] rounded-[6px] bg-[var(--booking-control)] bg-none shadow-[0_6px_16px_rgb(64_55_43_/_9.41%)]"
            }
          >
            {options.map((count) => {
              const option = String(count);
              const Icon = count > 2 ? UsersRound : UserRound;
              return (
                <Button
                  variant="plain"
                  key={count}
                  ref={option === active ? activeOption : undefined}
                  id={`booking-party-option-${count}`}
                  type="button"
                  role="option"
                  aria-selected={option === value}
                  data-active={option === active}
                  tabIndex={-1}
                  className={
                    "booking-partyOption [&&]:flex [&&]:items-center [&&]:min-h-10.5 [&&]:gap-3.5 [&&]:pt-0 [&&]:pr-3 [&&]:pb-0 [&&]:pl-3 [&&]:rounded-[4px] [&&]:text-[var(--booking-value)] [&&]:text-[length:14px] [&&]:text-left [&&]:cursor-pointer [&&[aria-selected=true]]:text-[var(--booking-accent)] [&&[aria-selected=true]]:bg-[color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--booking-control)_)] [&&[aria-selected=true]]:bg-none [&&[data-active=true]]:text-[var(--booking-accent)] [&&[data-active=true]]:bg-[color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--booking-control)_)] [&&[data-active=true]]:bg-none [&&:hover]:text-[var(--booking-accent)] [&&:hover]:bg-[color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--booking-control)_)] [&&:hover]:bg-none [&&[data-active=true]:not([aria-selected=true])]:outline-1 [&&[data-active=true]:not([aria-selected=true])]:outline-solid [&&[data-active=true]:not([aria-selected=true])]:outline-[var(--booking-accent)] [&&[data-active=true]:not([aria-selected=true])]:outline-offset-[-1px] [&&]:leading-5"
                  }
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => choose(option)}
                >
                  <Icon
                    aria-hidden="true"
                    className={
                      "booking-fieldIcon w-6 h-6 shrink-0 stroke-[1.5] lg:w-6 lg:h-6"
                    }
                  />
                  <span>
                    {count} {count === 1 ? "guest" : "guests"}
                  </span>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </fieldset>
  );
}
