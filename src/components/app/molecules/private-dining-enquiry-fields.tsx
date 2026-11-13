"use client";

import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  type FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";

import { submitPrivateDiningEnquiry } from "@/actions/private-dining-enquiry";
import { PrivateDiningDate } from "@/components/app/molecules/private-dining-date";
import { Button } from "@/components/ui/button";
import {
  PRIVATE_DINING_FORM,
  PRIVATE_DINING_REQUIRED_MESSAGES,
} from "@/lib/constants/private-dining";
import { env } from "@/lib/env";
import type {
  IEnquiryActionState,
  IPrivateDiningEnquiryProps,
} from "@/lib/types";

function fieldValidationMessage(
  control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): string {
  if (control.validity.valueMissing)
    return (
      PRIVATE_DINING_REQUIRED_MESSAGES[control.name] ??
      control.validationMessage
    );
  if (control.name === "email") return PRIVATE_DINING_FORM.invalidEmail;
  if (control.name === "date") return PRIVATE_DINING_FORM.invalidDate;
  if (control instanceof HTMLInputElement && control.name === "guests")
    return control.validity.rangeOverflow
      ? PRIVATE_DINING_FORM.guestLimit.replace("{maximum}", control.max)
      : PRIVATE_DINING_FORM.invalidGuests;
  return control.validationMessage;
}

export function PrivateDiningEnquiryFields({
  content,
}: IPrivateDiningEnquiryProps) {
  const [notificationId, setNotificationId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);
  const validationId = useId();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [requiredWarning, setRequiredWarning] = useState(false);
  const validationAttempted = useRef(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const messageResizeStart = useRef({ pointerY: 0, height: 0 });
  const submittingRef = useRef(false);
  const [state, setState] = useState<IEnquiryActionState>({
    status: "idle",
    message: "",
  });
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setNotificationId(crypto.randomUUID());
  }, []);

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (
      pending ||
      submittingRef.current ||
      state.status === "success" ||
      state.status === "unknown"
    )
      return;
    validationAttempted.current = true;
    if (!validateFields()) {
      event.currentTarget
        .querySelector<HTMLElement>(
          "input:invalid, select:invalid, textarea:invalid",
        )
        ?.focus();
      return;
    }
    submittingRef.current = true;
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const result = await submitPrivateDiningEnquiry(data);
        setState(result);
        if (result.status === "success") {
          formRef.current?.reset();
          validationAttempted.current = false;
          setFieldErrors({});
          setRequiredWarning(false);
          setNotificationId(crypto.randomUUID());
        }
      } catch {
        setState({
          status: "unknown",
          message: PRIVATE_DINING_FORM.feedback.unknown,
        });
      } finally {
        submittingRef.current = false;
      }
    });
  }

  function revise(): void {
    validateFields();
    if (state.status === "error" || state.status === "success") {
      setNotificationId(crypto.randomUUID());
      setState({ status: "idle", message: "" });
    }
  }

  function adjustGuests(step: number): void {
    guestsRef.current?.stepUp(step);
    revise();
  }

  function validateFields(): boolean {
    const controls = Array.from(formRef.current?.elements ?? []).filter(
      (element) =>
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement,
    );
    const missing = controls.filter((control) => control.validity.valueMissing);
    const showSummary = validationAttempted.current && missing.length > 1;
    const errors: Record<string, string> = {};
    for (const control of controls) {
      if (control.validity.valid) continue;
      if (
        control.validity.valueMissing &&
        (!validationAttempted.current || showSummary)
      )
        continue;
      errors[control.name] = fieldValidationMessage(control);
    }
    setFieldErrors(errors);
    setRequiredWarning(showSummary);
    return controls.every((control) => control.validity.valid);
  }

  function errorAttributes(name: string) {
    return {
      "aria-invalid": Boolean(fieldErrors[name]),
      "aria-describedby": fieldErrors[name]
        ? `${validationId}-${name}`
        : undefined,
    };
  }

  function fieldError(name: string) {
    return fieldErrors[name] ? (
      <p
        id={`${validationId}-${name}`}
        className={
          "pd-fieldError mt-1.5 mr-0 mb-0 ml-0 px-[17px]! text-peploe-burgundy text-[length:13px] [.pd-compactEnquiry_&]:px-4! lg:px-[13px]! lg:[.pd-compactEnquiry_&]:px-[13px]! lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&]:px-3.5! max-sm:[.pd-enquiry_&]:px-[15px]! leading-4.5"
        }
        role="alert"
      >
        {fieldErrors[name]}
      </p>
    ) : null;
  }

  function resizeMessage(height: number): void {
    if (messageRef.current)
      messageRef.current.style.height = `${Math.max(0, height)}px`;
  }

  function resizeMessageByLine(direction: number): void {
    const message = messageRef.current;
    if (!message) return;
    const lineHeight = Number.parseFloat(getComputedStyle(message).lineHeight);
    resizeMessage(
      message.getBoundingClientRect().height + direction * lineHeight,
    );
  }

  return (
    <>
      <style>
        {
          "@keyframes peploes-enquiry-complete {from {opacity:0;transform:scale(0.6)} to {opacity:1;transform:scale(1)}}"
        }
      </style>
      <form
        ref={formRef}
        className={
          "pd-enquiryFields grid gap-3 [&_textarea::-webkit-resizer]:[background:var(--message-resize-grip)] [&_input::-webkit-calendar-picker-indicator]:cursor-pointer [.pd-compactEnquiry_&_textarea]:pt-3.5! [.pd-compactEnquiry_&_:is(input,_select,_textarea)]:border-0 [.pd-compactEnquiry_&_:is(input,_select,_textarea)]:border-none [.pd-compactEnquiry_&_:is(input,_select,_textarea)]:border-current [.pd-compactEnquiry_&_:is(input,_select,_textarea)]:rounded-[4px] [.pd-compactEnquiry_&_:is(input,_select)]:text-text-secondary [.pd-compactEnquiry_&_input::placeholder]:text-text-secondary [.pd-compactEnquiry_&_input:not([type=checkbox])]:py-[10px_12px]! [.pd-compactEnquiry_&_select]:py-[10px_12px]! [.pd-compactEnquiry_&_select]:appearance-none [.pd-compactEnquiry_&_select]:pr-9! lg:gap-2 lg:[&&_input:not([type=checkbox])]:h-9.5 lg:[&_input:not([type=checkbox])]:pt-2! lg:[&_input:not([type=checkbox])]:pr-3! lg:[&_input:not([type=checkbox])]:pb-2! lg:[&_input:not([type=checkbox])]:pl-3! lg:[&_input:not([type=checkbox])]:text-[length:16px] lg:[&_select]:h-9.5 lg:[&_select]:pt-2! lg:[&_select]:pr-3! lg:[&_select]:pb-2! lg:[&_select]:pl-3! lg:[&_select]:text-[length:16px] lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:text-[length:16px] lg:[.pd-compactEnquiry_&_select]:text-[length:16px] lg:[&_textarea]:h-17 lg:[&_textarea]:pt-2! lg:[&_textarea]:pr-3! lg:[&_textarea]:pb-2! lg:[&_textarea]:pl-3! lg:[&_textarea]:text-[length:16px] lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:h-10 lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:pt-2! lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:pr-3! lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:pb-2! lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:pl-3! lg:[.pd-compactEnquiry_&_select]:h-10 lg:[.pd-compactEnquiry_&_select]:pt-2! lg:[.pd-compactEnquiry_&_select]:pr-3! lg:[.pd-compactEnquiry_&_select]:pb-2! lg:[.pd-compactEnquiry_&_select]:pl-3! lg:[.pd-compactEnquiry_&_textarea]:h-22.5 lg:[.pd-compactEnquiry_&_textarea]:min-h-10 lg:[.pd-compactEnquiry_&_textarea]:py-2! lg:[.pd-compactEnquiry_&_:is(input,_select,_textarea)]:border lg:[.pd-compactEnquiry_&_:is(input,_select,_textarea)]:border-solid lg:[.pd-compactEnquiry_&_:is(input,_select,_textarea)]:border-soft-stone lg:[.pd-compactEnquiry_&_textarea]:text-text-secondary lg:[.pd-compactEnquiry_&_textarea::placeholder]:text-text-secondary lg:[.pd-compactEnquiry_&_select]:appearance-auto lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:border-0 lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:border-none lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:border-current lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:rounded-[4px] lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:inset-shadow-[0_0_0_1px_var(--soft-stone)] lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:px-3.5! lg:[:where(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input:not([type=checkbox]),_select,_textarea)]:text-text-secondary lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&_:is(input,_textarea)::placeholder]:text-text-secondary lg:[.pd-celebrationEnquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:py-[7px]! lg:[.pd-weddingEnquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:py-[7px]! lg:[.pd-corporatePage_&_select]:appearance-none lg:[.pd-corporatePage_&_select]:pr-10! lg:[.pd-weddingEnquiry_&_select]:appearance-none lg:[.pd-weddingEnquiry_&_select]:pr-10! [&_input[type=date]]:cursor-pointer [&&_:is(input,_select,_textarea):focus-visible]:outline-none [&&_:is(input,_select,_textarea):focus-visible]:inset-shadow-[0_0_0_2px_var(--text-secondary)] [&_:is(input,_textarea):autofill]:shadow-[inset_0_0_0_1px_var(--soft-stone),_inset_0_0_0_1000px_var(--warm-cream)]! [&_:is(input,_textarea):autofill]:inset-shadow-none! [&_:is(input,_textarea):autofill:focus-visible]:shadow-[inset_0_0_0_2px_var(--text-secondary),_inset_0_0_0_1000px_var(--warm-cream)]! [&_:is(input,_textarea):autofill:focus-visible]:inset-shadow-none! forced-colors:[&&_:is(input,_select,_textarea):focus-visible]:outline-2 forced-colors:[&&_:is(input,_select,_textarea):focus-visible]:outline-solid forced-colors:[&&_:is(input,_select,_textarea):focus-visible]:outline-[Highlight] forced-colors:[&&_:is(input,_select,_textarea):focus-visible]:outline-offset-2 [&_input[name=guests]]:[appearance:textfield] [&_input[name=guests]::-webkit-inner-spin-button]:appearance-none [&_input[name=guests]::-webkit-inner-spin-button]:mt-0 [&_input[name=guests]::-webkit-inner-spin-button]:mr-0 [&_input[name=guests]::-webkit-inner-spin-button]:mb-0 [&_input[name=guests]::-webkit-inner-spin-button]:ml-0 [&_input[name=guests]::-webkit-outer-spin-button]:appearance-none [&_input[name=guests]::-webkit-outer-spin-button]:mt-0 [&_input[name=guests]::-webkit-outer-spin-button]:mr-0 [&_input[name=guests]::-webkit-outer-spin-button]:mb-0 [&_input[name=guests]::-webkit-outer-spin-button]:ml-0 max-sm:[.pd-enquiry_&]:gap-2 max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:h-auto max-sm:[.pd-enquiry_&&_:is(input:not([type=checkbox]),_select,_textarea)]:pt-2.5! max-sm:[.pd-enquiry_&&_:is(input:not([type=checkbox]),_select,_textarea)]:pr-3.5! max-sm:[.pd-enquiry_&&_:is(input:not([type=checkbox]),_select,_textarea)]:pb-2.5! max-sm:[.pd-enquiry_&&_:is(input:not([type=checkbox]),_select,_textarea)]:pl-3.5! max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:border max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:border-solid max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:border-soft-stone max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:rounded-[4px] max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:text-text-secondary max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:text-[length:16px] max-sm:[.pd-enquiry_&&_textarea[name=message]]:min-h-11 max-sm:[.pd-enquiry_&&_textarea[name=message]]:py-2.5! max-sm:[.pd-enquiry_&&_textarea[name=message]]:pr-8! max-sm:[.pd-enquiry_&_textarea::-webkit-resizer]:bg-[none] max-sm:[.pd-enquiry_&_textarea::-webkit-resizer]:bg-none max-sm:[.pd-enquiry_&&_input[type=date]]:pr-11! max-sm:[.pd-enquiry_&&_input[name=guests]]:pr-13! max-sm:[.pd-enquiry_&_:is(input,_textarea)::placeholder]:text-text-secondary max-sm:[.pd-enquiry_&_input[type=date]:invalid:not(:focus)]:text-transparent lg:[&_input:not([type=checkbox])]:leading-5 lg:[&_select]:leading-5 lg:[.pd-compactEnquiry_&_input:not([type=checkbox])]:leading-5 lg:[.pd-compactEnquiry_&_select]:leading-5 lg:[&_textarea]:leading-5 lg:[.pd-celebrationEnquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:leading-6 lg:[.pd-weddingEnquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:leading-6 max-sm:[.pd-enquiry_&_:is(input:not([type=checkbox]),_select,_textarea)]:leading-5.5"
        }
        aria-label={content.formEyebrow ?? content.eyebrow}
        noValidate
        onSubmit={submit}
        onChange={revise}
        onInvalid={(event) => {
          event.preventDefault();
          validateFields();
        }}
      >
        <input
          type="hidden"
          name="notificationId"
          value={notificationId}
          className={
            "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5 pd-enquiryHidden [.pd-enquiryFields_input&]:hidden"
          }
        />
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className={
            "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5 pd-enquiryHoneypot [.pd-enquiryFields_input&]:absolute [.pd-enquiryFields_input&]:left-[-10000px] [.pd-enquiryFields_input&]:h-px [.pd-enquiryFields_input&]:opacity-0"
          }
        />
        {content.occasions && (
          <div>
            <div
              className={
                "pd-selectField relative lg:[.pd-celebrationEnquiry_.pd-enquiryFields_&_select]:px-3.5! lg:[.pd-weddingEnquiry_.pd-enquiryFields_&_select]:px-3.5!"
              }
            >
              <select
                name="occasion"
                className={
                  "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] cursor-pointer leading-5.5 pd-enquirySelect supports-[appearance:base-select]:[.pd-enquiryFields_select&]:[appearance:base-select] supports-[appearance:base-select]:[&::picker(select)]:[appearance:base-select] supports-[appearance:base-select]:[.pd-enquiryFields_.pd-selectField_select&]:flex supports-[appearance:base-select]:[.pd-enquiryFields_.pd-selectField_select&]:items-center supports-[appearance:base-select]:[&::picker(select)]:[position-area:block-end_span-inline-end] supports-[appearance:base-select]:[&::picker(select)]:[position-try-order:normal] supports-[appearance:base-select]:[&::picker(select)]:my-1 supports-[appearance:base-select]:[&::picker(select)]:w-[anchor-size(width)] supports-[appearance:base-select]:[&::picker(select)]:max-w-[calc(100vw_-_32px)] supports-[appearance:base-select]:[&::picker(select)]:h-auto supports-[appearance:base-select]:[&::picker(select)]:max-h-[min(310px,_40dvh)] supports-[appearance:base-select]:[&::picker(select)]:pt-0! supports-[appearance:base-select]:[&::picker(select)]:pr-0! supports-[appearance:base-select]:[&::picker(select)]:pb-0! supports-[appearance:base-select]:[&::picker(select)]:pl-0! supports-[appearance:base-select]:[&::picker(select)]:overflow-y-auto supports-[appearance:base-select]:[&::picker(select)]:overscroll-contain supports-[appearance:base-select]:[&::picker(select)]:border supports-[appearance:base-select]:[&::picker(select)]:border-solid supports-[appearance:base-select]:[&::picker(select)]:border-soft-stone supports-[appearance:base-select]:[&::picker(select)]:rounded-[4px] supports-[appearance:base-select]:[&::picker(select)]:bg-warm-cream supports-[appearance:base-select]:[&::picker(select)]:bg-none supports-[appearance:base-select]:[&::picker(select)]:text-ink supports-[appearance:base-select]:[&::picker(select)]:shadow-[0_4px_12px_rgb(46_42_40_/_12%)] supports-[appearance:base-select]:[&_option]:flex supports-[appearance:base-select]:[&_option]:justify-between supports-[appearance:base-select]:[&_option]:gap-3 supports-[appearance:base-select]:[&_option]:bg-warm-cream supports-[appearance:base-select]:[&_option]:bg-none supports-[appearance:base-select]:[&_option]:text-ink supports-[appearance:base-select]:[&_option]:cursor-pointer supports-[appearance:base-select]:[&_option]:min-h-11 supports-[appearance:base-select]:[&_option]:pt-2.5! supports-[appearance:base-select]:[&_option]:pr-3! supports-[appearance:base-select]:[&_option]:pb-2.5! supports-[appearance:base-select]:[&_option]:pl-3! supports-[appearance:base-select]:[&_option]:text-[length:16px] supports-[appearance:base-select]:[&_option::checkmark]:order-1 supports-[appearance:base-select]:[&_option::checkmark]:ms-auto supports-[appearance:base-select]:[&_option:not(:disabled)_+_option:not(:disabled)]:border-t supports-[appearance:base-select]:[&_option:not(:disabled)_+_option:not(:disabled)]:border-solid supports-[appearance:base-select]:[&_option:not(:disabled)_+_option:not(:disabled)]:border-t-soft-stone supports-[appearance:base-select]:[&_option:is(:hover,_:checked)]:bg-[var(--events-pale)] supports-[appearance:base-select]:[&_option:is(:hover,_:checked)]:bg-none supports-[appearance:base-select]:[&_option:is(:hover,_:checked)]:text-peploe-burgundy supports-[appearance:base-select]:[&_option:focus-visible]:outline-2 supports-[appearance:base-select]:[&_option:focus-visible]:outline-solid supports-[appearance:base-select]:[&_option:focus-visible]:outline-text-secondary supports-[appearance:base-select]:[&_option:focus-visible]:outline-offset-[-2px] [.pd-enquiryFields_.pd-selectField_select&]:pr-11! [&::picker-icon]:hidden not-supports-[appearance:base-select]:[.pd-enquiryFields_.pd-selectField_select&]:appearance-none supports-[appearance:base-select]:[&_option]:leading-5.5"
                }
                aria-label={content.occasionLabel}
                defaultValue=""
                required
                {...errorAttributes("occasion")}
              >
                <option value="" disabled hidden>
                  {content.occasionLabel}
                </option>
                {content.occasions.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className={
                  "pd-selectIcon hidden [.pd-compactEnquiry_&]:block [.pd-compactEnquiry_&]:absolute [.pd-compactEnquiry_&]:right-4 [.pd-compactEnquiry_&]:top-4 [.pd-compactEnquiry_&]:w-5 [.pd-compactEnquiry_&]:h-5 [.pd-compactEnquiry_&]:stroke-[1] [.pd-compactEnquiry_&]:text-text-secondary [.pd-compactEnquiry_&]:pointer-events-none lg:[.pd-compactEnquiry_&]:hidden lg:[.pd-corporatePage_&]:block lg:[.pd-corporatePage_&]:absolute lg:[.pd-corporatePage_&]:top-1/2 lg:[.pd-corporatePage_&]:right-4 lg:[.pd-corporatePage_&]:w-4 lg:[.pd-corporatePage_&]:h-4 lg:[.pd-corporatePage_&]:transform-[translateY(-50%)] lg:[.pd-corporatePage_&]:stroke-[1] lg:[.pd-corporatePage_&]:text-text-secondary lg:[.pd-corporatePage_&]:pointer-events-none lg:[.pd-weddingEnquiry_&]:block lg:[.pd-weddingEnquiry_&]:absolute lg:[.pd-weddingEnquiry_&]:top-1/2 lg:[.pd-weddingEnquiry_&]:transform-[translateY(-50%)] lg:[.pd-weddingEnquiry_&]:pointer-events-none lg:[.pd-weddingEnquiry_&]:right-[15px] lg:[.pd-weddingEnquiry_&]:w-5 lg:[.pd-weddingEnquiry_&]:h-5 lg:[.pd-weddingEnquiry_&]:stroke-[1.2] lg:[.pd-weddingEnquiry_&]:text-ink [.pd-enquiryFields_.pd-selectField_&]:block [.pd-enquiryFields_.pd-selectField_&]:absolute [.pd-enquiryFields_.pd-selectField_&]:top-1/2 [.pd-enquiryFields_.pd-selectField_&]:right-3.5 [.pd-enquiryFields_.pd-selectField_&]:w-4.5 [.pd-enquiryFields_.pd-selectField_&]:h-4.5 [.pd-enquiryFields_.pd-selectField_&]:transform-[translateY(-50%)] [.pd-enquiryFields_.pd-selectField_&]:text-peploe-burgundy [.pd-enquiryFields_.pd-selectField_&]:stroke-[1.75] [.pd-enquiryFields_.pd-selectField_&]:pointer-events-none max-sm:[.pd-compactEnquiry_.pd-enquiryFields_.pd-selectField_&]:top-4 max-sm:[.pd-compactEnquiry_.pd-enquiryFields_.pd-selectField_&]:transform-none"
                }
              />
            </div>
            {fieldError("occasion")}
          </div>
        )}
        <div
          className={
            "pd-fieldRow grid items-start gap-3 [.pd-compactEnquiry_&]:gap-2 sm:max-lg:grid-cols-2 lg:grid-cols-2 lg:gap-2 max-sm:[.pd-enquiry_&]:gap-2"
          }
        >
          <div>
            <PrivateDiningDate
              errorId={fieldErrors.date ? `${validationId}-date` : undefined}
            />
            {fieldError("date")}
          </div>
          <div>
            <div
              className={
                "pd-guestField relative [.pd-enquiryFields_&_input[name=guests]]:pr-13!"
              }
            >
              <input
                ref={guestsRef}
                type="number"
                inputMode="numeric"
                name="guests"
                min={1}
                max={env.NEXT_PUBLIC_ENQUIRY_MAX_GUESTS}
                step={1}
                required
                aria-label={PRIVATE_DINING_FORM.guests}
                placeholder={PRIVATE_DINING_FORM.guests}
                {...errorAttributes("guests")}
                className={
                  "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5"
                }
              />
              <div
                className={
                  "pd-guestSteps absolute top-0 right-0 bottom-0 left-auto grid grid-rows-2 w-11"
                }
              >
                <Button
                  type="button"
                  variant="ghost"
                  className={
                    "pd-guestStep [.pd-guestSteps_&]:w-11 [.pd-guestSteps_&]:min-h-0 [.pd-guestSteps_&]:h-full [.pd-guestSteps_&]:pt-0.5! [.pd-guestSteps_&]:pr-2! [.pd-guestSteps_&]:pb-0.5! [.pd-guestSteps_&]:pl-2! [.pd-guestSteps_&]:bg-clip-content [.pd-guestSteps_&]:rounded-none [.pd-guestSteps_&]:text-peploe-burgundy [.pd-guestSteps_&:hover]:text-peploe-burgundy [.pd-guestSteps_&_svg]:w-4.5 [.pd-guestSteps_&_svg]:h-4.5 [.pd-guestSteps_&_svg]:fill-none [.pd-guestSteps_&_svg]:stroke-current [.pd-guestSteps_&_svg]:stroke-[1.75] [.pd-guestSteps_&:focus-visible]:outline-2 [.pd-guestSteps_&:focus-visible]:outline-solid [.pd-guestSteps_&:focus-visible]:outline-peploe-burgundy [.pd-guestSteps_&:focus-visible]:outline-offset-[-3px]"
                  }
                  aria-label={PRIVATE_DINING_FORM.increaseGuests}
                  onClick={() => adjustGuests(1)}
                >
                  <ChevronUp aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className={
                    "pd-guestStep [.pd-guestSteps_&]:w-11 [.pd-guestSteps_&]:min-h-0 [.pd-guestSteps_&]:h-full [.pd-guestSteps_&]:pt-0.5! [.pd-guestSteps_&]:pr-2! [.pd-guestSteps_&]:pb-0.5! [.pd-guestSteps_&]:pl-2! [.pd-guestSteps_&]:bg-clip-content [.pd-guestSteps_&]:rounded-none [.pd-guestSteps_&]:text-peploe-burgundy [.pd-guestSteps_&:hover]:text-peploe-burgundy [.pd-guestSteps_&_svg]:w-4.5 [.pd-guestSteps_&_svg]:h-4.5 [.pd-guestSteps_&_svg]:fill-none [.pd-guestSteps_&_svg]:stroke-current [.pd-guestSteps_&_svg]:stroke-[1.75] [.pd-guestSteps_&:focus-visible]:outline-2 [.pd-guestSteps_&:focus-visible]:outline-solid [.pd-guestSteps_&:focus-visible]:outline-peploe-burgundy [.pd-guestSteps_&:focus-visible]:outline-offset-[-3px]"
                  }
                  aria-label={PRIVATE_DINING_FORM.decreaseGuests}
                  onClick={() => adjustGuests(-1)}
                >
                  <ChevronDown aria-hidden="true" />
                </Button>
              </div>
            </div>
            {fieldError("guests")}
          </div>
        </div>
        <div
          className={
            content.company
              ? "pd-fieldRow grid items-start gap-3 [.pd-compactEnquiry_&]:gap-2 sm:max-lg:grid-cols-2 lg:grid-cols-2 lg:gap-2 max-sm:[.pd-enquiry_&]:gap-2"
              : undefined
          }
        >
          <div>
            <input
              name="name"
              autoComplete="name"
              required
              aria-label={PRIVATE_DINING_FORM.name}
              placeholder={PRIVATE_DINING_FORM.name}
              {...errorAttributes("name")}
              className={
                "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5"
              }
            />
            {fieldError("name")}
          </div>
          {content.company && (
            <input
              name="company"
              autoComplete="organization"
              aria-label={PRIVATE_DINING_FORM.company}
              placeholder={PRIVATE_DINING_FORM.company}
              className={
                "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5"
              }
            />
          )}
        </div>
        <div>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-label={PRIVATE_DINING_FORM.email}
            placeholder={PRIVATE_DINING_FORM.email}
            {...errorAttributes("email")}
            className={
              "block w-full min-w-0 min-h-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pt-3! pr-4! pb-3! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 leading-5.5"
            }
          />
          {fieldError("email")}
        </div>
        <div>
          <div
            className={
              "pd-messageField [--message-resize-grip:linear-gradient(_135deg,_transparent_50%,_var(--peploe-burgundy)_50%_55%,_transparent_55%_65%,_var(--peploe-burgundy)_65%_70%,_transparent_70%_80%,_var(--peploe-burgundy)_80%_85%,_transparent_85%_)_right_2px_bottom_2px_/_12px_12px_no-repeat] relative min-w-0"
            }
          >
            <textarea
              ref={messageRef}
              name="message"
              required
              aria-label={content.messageLabel}
              placeholder={content.messageLabel}
              rows={3}
              {...errorAttributes("message")}
              className={
                "block w-full min-w-0 border border-solid border-soft-stone rounded-[4px] bg-warm-cream text-ink pr-4! pl-4! font-[family-name:inherit]! font-[number:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:16px] placeholder:text-ink placeholder:opacity-100 min-h-11 py-2.5! resize-y leading-5.5"
              }
            />
            <Button
              type="button"
              variant="plain"
              className={
                "pd-messageResize [&]:hidden [&]:absolute [&]:right-px [&]:bottom-px [&]:w-6 [&]:h-6 [&]:pt-0! [&]:pr-0! [&]:pb-0! [&]:pl-0! [&]:border-0 [&]:border-none [&]:border-current [&]:rounded-[2px] [&]:[background:var(--message-resize-grip)] [&]:cursor-ns-resize [&]:touch-none [&:focus-visible]:outline-2 [&:focus-visible]:outline-solid [&:focus-visible]:outline-peploe-burgundy [&:focus-visible]:outline-offset-[-2px] max-sm:[&]:block"
              }
              aria-label={PRIVATE_DINING_FORM.resizeMessage}
              title={PRIVATE_DINING_FORM.resizeMessageHint}
              onPointerDown={(event) => {
                const message = messageRef.current;
                if (!message) return;
                event.preventDefault();
                messageResizeStart.current = {
                  pointerY: event.clientY,
                  height: message.getBoundingClientRect().height,
                };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!event.currentTarget.hasPointerCapture(event.pointerId))
                  return;
                resizeMessage(
                  messageResizeStart.current.height +
                    event.clientY -
                    messageResizeStart.current.pointerY,
                );
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onKeyDown={(event) => {
                if (event.key !== "ArrowUp" && event.key !== "ArrowDown")
                  return;
                event.preventDefault();
                resizeMessageByLine(event.key === "ArrowDown" ? 1 : -1);
              }}
              onClick={(event) => {
                if (event.detail === 0) resizeMessageByLine(1);
              }}
            />
          </div>
          {fieldError("message")}
        </div>
        {requiredWarning && (
          <p
            id={`${validationId}-required`}
            className={
              "pd-requiredWarning mt-0 mr-0 mb-0 ml-0 text-peploe-burgundy text-[length:13px] leading-4.5"
            }
            role="alert"
          >
            {PRIVATE_DINING_FORM.requiredWarning}
          </p>
        )}
        <Button
          type="submit"
          variant="brand-primary"
          disabled={
            pending ||
            !notificationId ||
            state.status === "success" ||
            state.status === "unknown"
          }
          aria-busy={pending}
          aria-describedby={
            requiredWarning
              ? `${validationId}-required enquiry-feedback`
              : "enquiry-feedback"
          }
          className={
            "pd-sendButton [&]:mt-4 [&]:justify-self-start [&]:w-full [&]:h-11 [&]:px-5! [&]:text-[length:16px] [&]:opacity-100 [&]:rounded-[4px] [&:disabled]:pointer-events-auto [&:disabled]:opacity-100 [&:disabled]:cursor-not-allowed lg:[&]:w-auto lg:[&]:mt-4 lg:[.pd-compactEnquiry_&]:mt-4 lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&]:w-[161px] lg:[:is(.pd-corporatePage,_.pd-celebrationEnquiry,_.pd-weddingEnquiry)_&]:gap-[5px]"
          }
        >
          {pending ? (
            <>
              {PRIVATE_DINING_FORM.loading}
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          ) : state.status === "success" ? (
            <>
              {PRIVATE_DINING_FORM.complete}
              <Check
                aria-hidden="true"
                className={
                  "pd-enquiryCheck animate-[peploes-enquiry-complete_240ms_ease-out] motion-reduce:animate-none"
                }
              />
            </>
          ) : (
            <>
              {PRIVATE_DINING_FORM.submit}
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
        <p
          id="enquiry-feedback"
          role="status"
          aria-atomic="true"
          className={
            state.status === "idle" && !pending
              ? "sr-only"
              : "pd-enquiryStatus text-[length:14px] text-text-secondary leading-[21px]"
          }
        >
          {pending ? PRIVATE_DINING_FORM.loading : state.message}
        </p>
      </form>
    </>
  );
}
