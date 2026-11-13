"use client";

import { Calendar } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { DateCalendar } from "@/components/app/atoms/date-calendar";
import { Button } from "@/components/ui/button";
import { PRIVATE_DINING_FORM } from "@/lib/constants/private-dining";
import { dublinToday } from "@/lib/dates";
import type { IPrivateDiningDateProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningDate({ errorId }: IPrivateDiningDateProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [minimum, setMinimum] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const field = useRef<HTMLFieldSetElement>(null);
  const calendarId = useId();

  const refreshMinimum = useCallback(() => {
    const today = dublinToday();
    if (input.current) {
      input.current.min = today;
      setValue(input.current.value);
    }
    setMinimum(today);
    return today;
  }, []);

  useEffect(() => {
    const form = input.current?.form;
    refreshMinimum();
    form?.addEventListener("focusin", refreshMinimum);
    form?.addEventListener("input", refreshMinimum);
    form?.addEventListener("submit", refreshMinimum, true);
    return () => {
      form?.removeEventListener("focusin", refreshMinimum);
      form?.removeEventListener("input", refreshMinimum);
      form?.removeEventListener("submit", refreshMinimum, true);
    };
  }, [refreshMinimum]);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !field.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function closeCalendar() {
    setOpen(false);
    input.current?.focus({ preventScroll: true });
  }

  function openCalendar() {
    refreshMinimum();
    setOpen(true);
  }

  function selectDate(date: string) {
    const element = input.current;
    if (!element || date < refreshMinimum()) return;
    // Use the native setter so React observes the change and cancels form previews.
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set?.call(element, date);
    element.dispatchEvent(new Event("input", { bubbles: true }));
    closeCalendar();
  }

  return (
    <fieldset
      ref={field}
      className={"pdd-field relative min-w-0"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          closeCalendar();
        }
      }}
    >
      <label
        className={cn(
          "pd-dateField relative min-w-0 [&_span]:absolute [&_span]:top-1/2 [&_span]:left-4 [&_span]:transform-[translateY(-50%)] [&_span]:pointer-events-none [&_span]:text-[length:16px] [&_input:invalid:not(:focus)]:text-transparent [&_input:valid_+_span]:hidden [&_input:focus_+_span]:hidden [.pd-compactEnquiry_&_span]:text-text-secondary [.pd-compactEnquiry_&_input:invalid:not(:focus)]:text-transparent [.pd-compactEnquiry_&_input::-webkit-calendar-picker-indicator]:opacity-0 lg:[&_span]:left-3 lg:[&_span]:text-[length:16px] lg:[.pd-compactEnquiry_&_input::-webkit-calendar-picker-indicator]:opacity-100 lg:[.pd-compactEnquiry_&_span]:top-1/2 lg:[.pd-compactEnquiry_&_span]:transform-[translateY(-50%)] lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_span]:left-3.5 lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_span]:text-text-secondary lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_input:invalid:not(:focus)]:text-transparent lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_.pd-fieldRow:has(&:where(.pd-dateField))]:grid-cols-[minmax(0,_294fr)_minmax(0,_296fr)] lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_.pd-fieldRow:has(&:where(.pd-dateField))]:gap-3",
          "pdd-label block [&&_input[type=date]]:pr-10.5! [&_input[type=date]::-webkit-calendar-picker-indicator]:hidden ",
        )}
      >
        <input
          ref={input}
          type="date"
          name="date"
          max="9999-12-31"
          aria-label={PRIVATE_DINING_FORM.date}
          aria-invalid={Boolean(errorId)}
          aria-describedby={errorId}
          aria-controls={open ? calendarId : undefined}
          required
          onFocus={refreshMinimum}
          onChange={refreshMinimum}
          onPointerDown={openCalendar}
          onClick={(event) => {
            event.preventDefault();
            openCalendar();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === " ") {
              event.preventDefault();
              openCalendar();
              requestAnimationFrame(() => {
                field.current
                  ?.querySelector<HTMLButtonElement>(
                    "button[data-date][tabindex='0']",
                  )
                  ?.focus();
              });
            }
          }}
          className={
            "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5"
          }
        />
        <span aria-hidden="true">{PRIVATE_DINING_FORM.date}</span>
      </label>
      <Button
        variant="plain"
        type="button"
        className={
          "pdd-trigger [&]:absolute [&]:top-0 [&]:right-0 [&]:bottom-0 [&]:grid [&]:place-items-center [&]:w-11 [&]:border-0 [&]:border-none [&]:border-current [&]:rounded-[4px] [&]:bg-transparent [&]:bg-none [&]:text-text-secondary [&]:cursor-pointer [&_svg]:w-5 [&_svg]:h-5 [&_svg]:stroke-[1] [&:focus-visible]:outline-2 [&:focus-visible]:outline-solid [&:focus-visible]:outline-text-secondary [&:focus-visible]:outline-offset-[-2px]"
        }
        aria-label="Choose preferred date"
        aria-expanded={open}
        aria-controls={open ? calendarId : undefined}
        onClick={() => {
          refreshMinimum();
          setOpen(!open);
        }}
      >
        <Calendar aria-hidden="true" />
      </Button>
      {open && minimum && (
        <DateCalendar
          key={`${value}:${minimum}`}
          id={calendarId}
          value={value}
          min={minimum}
          onChange={selectDate}
          className={
            "pdd-calendar [.pdd-field_&]:w-full [.pdd-field_&]:pt-3! [.pdd-field_&]:pr-3! [.pdd-field_&]:pb-3! [.pdd-field_&]:pl-3!"
          }
        />
      )}
    </fieldset>
  );
}
