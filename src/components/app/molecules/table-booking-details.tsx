"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import { z } from "zod";
import { TableBookingProcessing } from "@/components/app/molecules/table-booking-processing";
import { Button } from "@/components/ui/button";
import {
  BOOKING_GUEST_LIMITS,
  BOOKING_MESSAGES,
  BOOKING_PATTERNS,
} from "@/lib/constants/booking";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import type {
  ITableBookingDetailsProps,
  ITableBookingFieldProps,
  ITableBookingGuestDetails,
  TTableBookingDetailsErrors,
} from "@/lib/types";

function phoneError(phone: string): string {
  if (BOOKING_PATTERNS.internationalPrefix.test(phone.trim()))
    return BOOKING_MESSAGES.mobileWithoutCode;
  const digits = phone.replace(/\D/g, "").length;
  return /^[\d\s()-]+$/.test(phone) &&
    digits >= BOOKING_GUEST_LIMITS.mobileMinDigits &&
    digits <= BOOKING_GUEST_LIMITS.mobileMaxDigits
    ? ""
    : TABLE_BOOKING_CONTENT.details.phoneError;
}

function getDetailsErrors(details: ITableBookingGuestDetails) {
  const copy = TABLE_BOOKING_CONTENT.details;
  return {
    firstName: details.firstName.trim() ? "" : copy.nameError,
    surname: details.surname.trim() ? "" : copy.nameError,
    email: z.string().email().safeParse(details.email.trim()).success
      ? ""
      : copy.emailError,
    phone: phoneError(details.phone),
    terms: details.terms ? "" : copy.termsError,
  };
}
function BookingField({
  label,
  error,
  id,
  className,
  children,
  ...props
}: ITableBookingFieldProps) {
  const errorId = `${id}-error`;
  const input = (
    <input
      {...props}
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    />
  );
  return (
    <label htmlFor={id} className={className}>
      <span>
        {label} <span className={"booking-required text-[#a32932]"}>*</span>
      </span>
      {children ? (
        <span
          className={
            "booking-phoneRow grid grid-cols-[auto_minmax(0,_1fr)] gap-2"
          }
        >
          {children}
          {input}
        </span>
      ) : (
        input
      )}
      {error && (
        <span
          id={errorId}
          className={
            "booking-error text-[#a32932] text-[length:12px] lg:text-[length:14px] leading-4.5 lg:leading-5"
          }
        >
          {error}
        </span>
      )}
    </label>
  );
}
export function TableBookingDetails({
  details,
  terms,
  sending,
  serverErrors,
  formError,
  onChange,
  onBack,
  onContinue,
}: ITableBookingDetailsProps) {
  const [attempted, setAttempted] = useState(false);
  const termsDialog = useRef<HTMLDialogElement>(null);
  const termsButton = useRef<HTMLButtonElement>(null);
  const termsHeading = useRef<HTMLHeadingElement>(null);
  const termsId = useId();
  const paragraphOccurrences = new Map<string, number>();
  const copy = TABLE_BOOKING_CONTENT.details;
  const fullName = details.surname
    ? `${details.firstName} ${details.surname}`
    : details.firstName;
  const invalid = getDetailsErrors(details);
  const errors: TTableBookingDetailsErrors = {
    ...(attempted ? invalid : {}),
    ...serverErrors,
  };
  function update(
    field: keyof ITableBookingGuestDetails,
    value: string | boolean,
  ) {
    onChange({ ...details, [field]: value });
  }
  function updateFullName(value: string) {
    if (value === fullName) return;
    let separator = value.lastIndexOf(" ");
    // Retain the known name boundary when editing one part in the mobile field.
    if (details.firstName && value.startsWith(`${details.firstName} `)) {
      separator = details.firstName.length;
    } else if (details.surname && value.endsWith(` ${details.surname}`)) {
      separator = value.length - details.surname.length - 1;
    }
    const hasSurname = separator >= 0 && separator < value.length - 1;
    onChange({
      ...details,
      firstName: hasSurname ? value.slice(0, separator) : value,
      surname: hasSurname ? value.slice(separator + 1) : "",
    });
  }
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (sending) return;
        const form = event.currentTarget;
        setAttempted(true);
        if (Object.values(invalid).some(Boolean)) {
          requestAnimationFrame(() => {
            Array.from(
              form.querySelectorAll<HTMLInputElement>('[aria-invalid="true"]'),
            )
              .find((field) => field.getClientRects().length)
              ?.focus();
          });
          return;
        }
        onContinue();
      }}
    >
      <div className={"booking-detailsIntroduction hidden lg:block lg:mb-6"}>
        <h2
          className={
            "booking-flowHeading mt-0 mr-0 mb-0 ml-0 text-[length:30px] lg:text-[length:36px] leading-9 lg:leading-10.5"
          }
        >
          {copy.heading}
        </h2>
        <p
          className={
            "booking-flowDescription mt-2 text-text-secondary text-[length:14px] lg:mt-2 lg:text-[length:16px] max-sm:text-[length:16px] leading-5 lg:leading-6"
          }
        >
          {copy.description}
        </p>
      </div>
      <div
        className={
          "booking-detailsFields grid gap-4 [&&_label]:min-w-0 [&&_label]:text-[length:14px] [&&_input]:w-full [&&_input]:min-w-0 [&&_input]:min-h-11 [&&_input]:pt-[11px] [&&_input]:pr-3 [&&_input]:pb-[11px] [&&_input]:pl-3 [&&_input]:border [&&_input]:border-solid [&&_input]:border-[var(--booking-border)] [&&_input]:rounded-[4px] [&&_input]:bg-[var(--booking-control)] [&&_input]:bg-none [&&_input]:text-[var(--booking-value)] [&&_input]:text-[length:16px] [&&_select]:w-full [&&_select]:min-w-0 [&&_select]:min-h-11 [&&_select]:pt-[11px] [&&_select]:pr-3 [&&_select]:pb-[11px] [&&_select]:pl-3 [&&_select]:border [&&_select]:border-solid [&&_select]:border-[var(--booking-border)] [&&_select]:rounded-[4px] [&&_select]:bg-[var(--booking-control)] [&&_select]:bg-none [&&_select]:text-[var(--booking-value)] [&&_select]:text-[length:16px] [&&_textarea]:w-full [&&_textarea]:min-w-0 [&&_textarea]:min-h-11 [&&_textarea]:pt-[11px] [&&_textarea]:pr-3 [&&_textarea]:pb-[11px] [&&_textarea]:pl-3 [&&_textarea]:border [&&_textarea]:border-solid [&&_textarea]:border-[var(--booking-border)] [&&_textarea]:rounded-[4px] [&&_textarea]:bg-[var(--booking-control)] [&&_textarea]:bg-none [&&_textarea]:text-[var(--booking-value)] [&&_textarea]:text-[length:16px] [&&_textarea]:resize-y [&&_[aria-invalid=true]]:border-[#a32932] [&&_:is(input,_textarea):focus-visible]:outline-2 [&&_:is(input,_textarea):focus-visible]:outline-solid [&&_:is(input,_textarea):focus-visible]:outline-[var(--booking-accent)] [&&_:is(input,_textarea):focus-visible]:outline-offset-2 lg:grid-cols-2 lg:gap-[20px_24px] lg:[&&_label]:order-0 lg:[&&_label]:text-[length:16px] lg:[&&_label]:gap-2 lg:[&&_input]:min-h-12 lg:[&&_input]:pt-[11px] lg:[&&_input]:pr-4 lg:[&&_input]:pb-[11px] lg:[&&_input]:pl-4 lg:[&&_input]:text-[length:16px] lg:[&&_select]:min-h-12 lg:[&&_select]:pt-[11px] lg:[&&_select]:pr-4 lg:[&&_select]:pb-[11px] lg:[&&_select]:pl-4 lg:[&&_select]:text-[length:16px] lg:[&&_textarea]:min-h-12 lg:[&&_textarea]:pt-[11px] lg:[&&_textarea]:pr-4 lg:[&&_textarea]:pb-[11px] lg:[&&_textarea]:pl-4 lg:[&&_textarea]:text-[length:16px] [&&_label]:leading-5 [&&_input]:leading-6 [&&_select]:leading-6 [&&_textarea]:leading-6 lg:[&&_label]:leading-6 lg:[&&_input]:leading-6 lg:[&&_select]:leading-6 lg:[&&_textarea]:leading-6"
        }
      >
        <BookingField
          id="booking-first"
          className={"booking-desktopField hidden lg:grid"}
          label="First name"
          autoComplete="given-name"
          value={details.firstName}
          placeholder="Your name"
          error={errors.firstName}
          onChange={(event) => update("firstName", event.target.value)}
        />
        <BookingField
          id="booking-surname"
          className={"booking-desktopField hidden lg:grid"}
          label="Surname"
          autoComplete="family-name"
          value={details.surname}
          placeholder="Your name"
          error={errors.surname}
          onChange={(event) => update("surname", event.target.value)}
        />
        <BookingField
          id="booking-name"
          className={"booking-mobileField grid gap-1.5 order-0 lg:hidden"}
          label="Full name"
          autoComplete="name"
          value={fullName}
          placeholder="Your name"
          error={errors.firstName || errors.surname}
          onChange={(event) => updateFullName(event.target.value)}
        />
        <div className={"booking-phoneField grid gap-1.5 order-2"}>
          <BookingField
            id="booking-phone"
            className={undefined}
            label={
              <>
                <span className={"booking-desktopOnly hidden lg:inline"}>
                  Mobile number
                </span>
                <span className={"booking-mobileOnly inline lg:hidden"}>
                  Telephone number
                </span>
              </>
            }
            type="tel"
            autoComplete="tel-national"
            value={details.phone}
            placeholder="e.g. 087 123 4567"
            error={errors.phone || errors.countryCode}
            onChange={(event) => update("phone", event.target.value)}
          >
            <select
              aria-label={copy.countryCode}
              autoComplete="tel-country-code"
              className={
                "booking-countryCode [.booking-detailsFields_&&]:w-auto [.booking-detailsFields_&&]:pr-2"
              }
              value={details.countryCode}
              onChange={(event) => update("countryCode", event.target.value)}
            >
              {TABLE_BOOKING_CONTENT.countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
          </BookingField>
        </div>
        <BookingField
          id="booking-email"
          className={"booking-emailField grid gap-1.5 order-1"}
          label="Email address"
          type="email"
          autoComplete="email"
          value={details.email}
          placeholder="you@example.com"
          error={errors.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <label
          className={
            "booking-requestsField grid gap-1.5 order-3 lg:col-span-full"
          }
        >
          <span>Special requests (optional)</span>
          <textarea
            rows={1}
            aria-invalid={!!errors.requests}
            aria-describedby={
              errors.requests ? "booking-requests-error" : undefined
            }
            value={details.requests}
            placeholder="e.g. dietary requirements, occasion"
            onChange={(event) => update("requests", event.target.value)}
          />
          {errors.requests && (
            <span
              id="booking-requests-error"
              className={
                "booking-error text-[#a32932] text-[length:12px] lg:text-[length:14px] leading-4.5 lg:leading-5"
              }
            >
              {errors.requests}
            </span>
          )}
        </label>
      </div>
      <div
        className={
          "booking-terms flex items-start gap-2.5 mt-5 w-fit cursor-default [&&_input]:cursor-pointer lg:[&&_label]:cursor-pointer lg:[label&&]:cursor-pointer [&&_input]:w-4.5 [&&_input]:h-4.5 [&&_input]:shrink-0 [&&_input]:accent-[var(--booking-accent)] [.booking-terms_~_&&]:mt-2 [&&_input]:mt-0 [&&_input]:mr-0 [&&_input]:mb-0 [&&_input]:ml-0 text-text-secondary text-[length:12px] lg:[&&_input]:w-4.5 lg:[&&_input]:h-4.5 lg:[&&_input]:mt-[3px] lg:mt-6 lg:text-[length:14px] lg:gap-2.5 leading-4.5 lg:leading-5.5"
        }
      >
        <input
          id={`${termsId}-agreement`}
          type="checkbox"
          aria-labelledby={`${termsId}-label ${termsId}-button`}
          checked={details.terms}
          aria-invalid={!!errors.terms}
          aria-describedby={errors.terms ? "booking-terms-error" : undefined}
          onChange={(event) => update("terms", event.target.checked)}
        />
        <span>
          <label htmlFor={`${termsId}-agreement`} id={`${termsId}-label`}>
            {copy.termsAgreement}
          </label>{" "}
          <button
            id={`${termsId}-button`}
            ref={termsButton}
            type="button"
            className={
              "booking-termsName border-0 border-none border-current pt-0 pr-0 pb-0 pl-0 bg-[none] bg-none font-[family-name:inherit] [font-style:inherit] font-stretch-[inherit] [font-variant:inherit] text-[length:inherit] [text-align:inherit] cursor-pointer text-inherit font-semibold underline decoration-solid decoration-current decoration-auto leading-[inherit]"
            }
            onClick={() => {
              termsDialog.current?.showModal();
              termsHeading.current?.focus();
            }}
          >
            {copy.termsName}
          </button>
        </span>
      </div>
      <dialog
        ref={termsDialog}
        closedby="closerequest"
        aria-labelledby={`${termsId}-title`}
        className={`${"booking-changeDialog w-[min(480px,_calc(100%_-_32px))] max-h-[calc(100dvh_-_32px)] mt-auto mr-auto mb-auto ml-auto border-0 border-none border-current pt-8 pr-8 pb-8 pl-8 bg-warm-cream bg-none text-ink shadow-[0_16px_48px_rgb(0_0_0_/_20%)] [&&::backdrop]:bg-[rgb(0_0_0_/_40%)] [&&::backdrop]:bg-none"} ${"booking-termsDialog [body:has(&.booking-termsDialog[open])]:overflow-hidden overflow-y-auto overscroll-contain [@media_(prefers-reduced-motion:_no-preference)]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:transform-[translateY(16px)] [@media_(prefers-reduced-motion:_no-preference)]:transition-[opacity,transform,display,overlay] [@media_(prefers-reduced-motion:_no-preference)]:duration-[var(--duration-base),var(--duration-base),var(--duration-base),var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:ease-[var(--ease-organic),var(--ease-organic),ease,ease] [@media_(prefers-reduced-motion:_no-preference)]:[transition-delay:0s,0s,0s,0s] [@media_(prefers-reduced-motion:_no-preference)]:[transition-behavior:normal,normal,allow-discrete,allow-discrete] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:opacity-100 [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:transform-[translateY(0)] [@media_(prefers-reduced-motion:_no-preference)]:[&&::backdrop]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:[&&::backdrop]:transition-[opacity,display,overlay] [@media_(prefers-reduced-motion:_no-preference)]:[&&::backdrop]:duration-[var(--duration-base),var(--duration-base),var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[&&::backdrop]:ease-[var(--ease-organic),ease,ease] [@media_(prefers-reduced-motion:_no-preference)]:[&&::backdrop]:[transition-delay:0s,0s,0s] [@media_(prefers-reduced-motion:_no-preference)]:[&&::backdrop]:[transition-behavior:normal,allow-discrete,allow-discrete] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:opacity-100 [@media_(prefers-reduced-motion:_no-preference)]:starting:[&&[open]]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:starting:[&&[open]]:transform-[translateY(16px)] [@media_(prefers-reduced-motion:_no-preference)]:starting:[&&[open]::backdrop]:opacity-0"}`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.currentTarget.close();
          }
        }}
        onClose={(event) => {
          if (!event.currentTarget.open) termsButton.current?.focus();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            event.currentTarget.close();
          }
        }}
      >
        <h2
          ref={termsHeading}
          id={`${termsId}-title`}
          className={
            "booking-flowHeading mt-0 mr-0 mb-0 ml-0 text-[length:30px] lg:text-[length:36px] leading-9 lg:leading-10.5"
          }
          tabIndex={-1}
        >
          {copy.termsHeading}
        </h2>
        <section
          aria-labelledby={`${termsId}-title`}
          className={
            "booking-termsText mt-4 text-text-secondary text-[length:14px] [&&_p_+_p]:mt-3 leading-5.5"
          }
        >
          {terms.map((paragraph) => {
            const occurrence = (paragraphOccurrences.get(paragraph) ?? 0) + 1;
            paragraphOccurrences.set(paragraph, occurrence);
            return <p key={`${paragraph}-${occurrence}`}>{paragraph}</p>;
          })}
        </section>
        <div
          className={
            "booking-changeActions flex flex-wrap justify-end gap-3 mt-6"
          }
        >
          <Button
            type="button"
            variant="brand-contact"
            onClick={() => termsDialog.current?.close()}
          >
            {copy.termsClose}
          </Button>
        </div>
      </dialog>
      {errors.terms && (
        <p
          id="booking-terms-error"
          className={
            "booking-error text-[#a32932] text-[length:12px] lg:text-[length:14px] leading-4.5 lg:leading-5"
          }
        >
          {errors.terms}
        </p>
      )}
      <label
        className={
          "booking-terms flex items-start gap-2.5 mt-5 w-fit cursor-default [&&_input]:cursor-pointer lg:[&&_label]:cursor-pointer lg:[label&&]:cursor-pointer [&&_input]:w-4.5 [&&_input]:h-4.5 [&&_input]:shrink-0 [&&_input]:accent-[var(--booking-accent)] [.booking-terms_~_&&]:mt-2 [&&_input]:mt-0 [&&_input]:mr-0 [&&_input]:mb-0 [&&_input]:ml-0 text-text-secondary text-[length:12px] lg:[&&_input]:w-4.5 lg:[&&_input]:h-4.5 lg:[&&_input]:mt-[3px] lg:mt-6 lg:text-[length:14px] lg:gap-2.5 leading-4.5 lg:leading-5.5"
        }
      >
        <input
          type="checkbox"
          checked={details.newsletterOptIn}
          onChange={(event) => update("newsletterOptIn", event.target.checked)}
        />
        <span>{copy.newsletterLabel}</span>
      </label>
      {sending && (
        <TableBookingProcessing>{copy.sendingMessage}</TableBookingProcessing>
      )}
      {formError && (
        <p
          role="alert"
          className={
            "booking-formError mt-4 mr-0 mb-0 ml-0 text-[var(--booking-accent)] text-[length:14px] leading-5"
          }
        >
          {formError}
        </p>
      )}
      <div
        className={
          "booking-flowActions flex items-center justify-between gap-3.5 mt-7.5 pt-6 border-t border-solid border-t-[var(--booking-border)] lg:mt-7 lg:pt-0 lg:border-t-0 lg:border-none lg:border-t-current lg:gap-6"
        }
      >
        <Button
          variant="plain"
          type="button"
          className={
            "booking-backAction [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 [&&]:inline-flex [&&]:items-center [&&]:gap-1 [&&]:text-[var(--booking-accent)] [&&]:text-[length:12px] [&&]:text-left [&&]:underline [&&]:decoration-solid [&&]:decoration-current [&&]:decoration-auto [&&]:cursor-pointer [&&_svg]:w-3.5 [&&_svg]:h-3.5 [&&_svg]:shrink-0 [&&:disabled]:opacity-40 [&&:disabled]:cursor-not-allowed lg:[&&]:text-[length:16px] lg:[&&_svg]:w-4 lg:[&&_svg]:h-4 [@media_(max-width:_359px)]:[&&]:text-[length:11px] [&&]:leading-4.5 lg:[&&]:leading-6"
          }
          disabled={sending}
          onClick={onBack}
        >
          <ArrowLeft aria-hidden="true" /> Back to times
        </Button>
        <Button
          type="submit"
          variant="brand-primary"
          className={
            "booking-continueAction [&&]:min-w-0 [&&]:flex-1 [&&]:h-12 [&&]:pl-2.5 [&&]:pr-2.5 [&&]:rounded-[4px] [&&]:bg-[var(--booking-accent)] [&&]:bg-none [&&]:text-[length:14px] [&&:disabled]:opacity-40 lg:[&&]:flex-[0_1_50%] lg:[&&]:h-12 lg:[&&]:text-[length:16px] [@media_(max-width:_359px)]:[&&]:text-[length:12px]"
          }
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? copy.sending : copy.action}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
