"use client";

import { addMonths, format, parseISO, startOfMonth } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { TableBookingChange } from "@/components/app/molecules/table-booking-change";
import { TableBookingDate } from "@/components/app/molecules/table-booking-date";
import { TableBookingDetails } from "@/components/app/molecules/table-booking-details";
import { TableBookingHoldTimer } from "@/components/app/molecules/table-booking-hold-timer";
import { TableBookingPartySize } from "@/components/app/molecules/table-booking-party-size";
import { TableBookingPayment } from "@/components/app/molecules/table-booking-payment";
import {
  PaymentOutcome,
  TableBookingReturn,
} from "@/components/app/molecules/table-booking-payment-outcome";
import { TableBookingProcessing } from "@/components/app/molecules/table-booking-processing";
import {
  TableBookingFormSkeleton,
  TableBookingStatusSkeleton,
  TableBookingTimesSkeleton,
} from "@/components/app/molecules/table-booking-skeleton";
import { TableBookingSupport } from "@/components/app/molecules/table-booking-support";
import { Button } from "@/components/ui/button";
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "@/helpers/storage";
import { useBookingStatus } from "@/hooks/use-booking-status";
import { useBookingTimes } from "@/hooks/use-booking-times";
import {
  forgetGuestDetails,
  storedGuestDetails,
  useGuestDetails,
} from "@/hooks/use-guest-details";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOpenDates } from "@/hooks/use-open-dates";
import { storedHold, useTableHold } from "@/hooks/use-table-hold";
import {
  beginBookingSearch,
  resumeBookingAttempt,
  trackBooking,
  trackBookingConfirmed,
} from "@/lib/analytics/booking";
import { holdReferenceSchema } from "@/lib/booking-schema";
import { ROUTES } from "@/lib/constants";
import {
  BOOKING_BANK_REFUSED_STATUSES,
  BOOKING_GUEST_LIMITS,
  BOOKING_MESSAGES,
  BOOKING_RETURN_PARAMS,
} from "@/lib/constants/booking";
import {
  TABLE_BOOKING_CONTENT as content,
  TABLE_BOOKING_SCROLL_GAP_PX,
  TABLE_BOOKING_TIMES,
} from "@/lib/constants/table-booking";
import { dublinToday, firstFreeBookingDate, guestsLabel } from "@/lib/dates";
import { GA4Event } from "@/lib/enums";
import type {
  IBookingBankReturn,
  IBookingTime,
  IGuestDetailsAttempt,
  IGuestDetailsSending,
  IHoldChoice,
  IHoldSummary,
  IReturnBy,
  ITableBookingConfirmationProps,
  ITableBookingGuestDetails,
  ITableBookingHeldStepProps,
  ITableBookingNoticeProps,
  ITableBookingPanelProps,
  ITableBookingProgressProps,
  ITableBookingTimesProps,
  ITableHold,
  TBookingStatusCheck,
  TBookingTimes,
  TOpenDates,
  TPaymentStep,
  TTableBookingTimesListProps,
} from "@/lib/types";
import { cn } from "@/lib/utils";

function resumeBookingAnalytics(saved: ReturnType<typeof savedBooking>) {
  if (!saved) return;
  const reference =
    saved.kind === "held"
      ? storedHold()?.holdReference
      : saved.kind === "returning"
        ? saved.returned.reference
        : saved.summary.reference;
  if (reference) resumeBookingAttempt(reference);
}

export function TableBookingNotice({
  message,
  loading = false,
}: ITableBookingNoticeProps) {
  return (
    <section
      aria-label={content.label}
      aria-busy={loading}
      className={
        "booking-panel [--booking-accent:#790e1d] [--booking-surface:#faf8f3] [--booking-control:#fcfaf7] [--booking-border:#ddd9d1] [--booking-muted:#8d8a87] [--booking-label:#111110] [--booking-value:#221a17] [--booking-emblem:#f1e4dd] [--booking-shadow:rgb(64_55_43_/_4.70588%)] [--booking-summary-inset:10px] min-w-0 min-h-0 pt-8 pr-[23px] pb-8 pl-[23px] border border-solid border-[var(--booking-border)] rounded-[16px] bg-[var(--booking-surface)] bg-none text-[var(--booking-label)] lg:[--booking-summary-inset:16px] lg:min-h-0 lg:pt-8 lg:pr-[clamp(47px,_calc(25vw_-_241px),_119px)] lg:pb-10 lg:pl-[clamp(47px,_calc(25vw_-_241px),_119px)] lg:rounded-[6px] lg:shadow-[0_8px_28px_var(--booking-shadow)] scroll-mt-25 [&&:focus]:outline-none [&&:focus]:outline-[length:medium] [&&:focus]:outline-current [&&[aria-busy=true]]:min-h-[715px] lg:[&&[aria-busy=true]]:min-h-[603px] [@media_(max-width:_359px)]:[&&[aria-busy=true]]:min-h-193.5"
      }
    >
      <p
        role={loading ? "status" : undefined}
        className={
          "booking-panelMessage mt-0 mr-0 mb-6 ml-0 text-[var(--booking-accent)]"
        }
      >
        {message}
      </p>
      {loading && <TableBookingFormSkeleton />}
      <TableBookingSupport />
    </section>
  );
}

export function TableBookingPanel({ findTable }: ITableBookingPanelProps) {
  const [step, setStep] = useState(0);
  const [showRestoreError, setShowRestoreError] = useState(false);
  const [date, setDate] = useState(findTable.calendar.defaultDate);
  const [partySize, setPartySize] = useState(
    String(findTable.partySize.default),
  );
  const [time, setTime] = useState<IBookingTime | null>(null);
  const [loadTimes, setLoadTimes] = useState(false);
  const [datePicked, setDatePicked] = useState(false);
  const availability = useOpenDates(partySize, findTable.calendar.lastDate);
  const { load } = availability;

  const [returnAccepted, setReturnAccepted] = useState(false);
  const [details, setDetails] = useState(emptyDetails);
  const [booked, setBooked] = useState<ITableBookingConfirmationProps | null>(
    null,
  );
  const guest = useGuestDetails();
  const { restore: restoreDetails } = guest;
  const [payment, setPayment] = useState<TPaymentStep | null>(null);
  const [returned, setReturned] = useState<IBookingBankReturn | null>(null);
  const [paid, setPaid] = useState<IHoldSummary | null>(null);
  const [paymentSaved, setPaymentSaved] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentBusy, setPaymentBusy] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const shortDate = format(
    parseISO(step === 2 && time?.date ? time.date : date),
    "EEE, d MMM yyyy",
  );
  const longDate = format(parseISO(date), "EEEE, d MMMM yyyy");
  const guests = guestsLabel(Number(partySize));
  const returnBy = returnByOf(time);
  const times = useBookingTimes(date, partySize, loadTimes && step !== 0);
  const hold = useTableHold();
  const { place, resume } = hold;
  const view = [
    step,
    payment?.kind,
    Boolean(returned),
    Boolean(paid),
    Boolean(guest.unsure),
    Boolean(hold.active),
  ].join(":");
  const previousView = useRef(view);
  const restoring = useRef(true);

  const showHeld = useCallback((choice: IHoldChoice, summary: IHoldSummary) => {
    setDate(choice.searchDate);
    setPartySize(String(choice.partySize));
    setDatePicked(true);
    setTime({
      searchDate: choice.searchDate,
      date: summary.date,
      time: summary.time,
      label: summary.timeLabel,
      offers: [summary.offer],
    });
    setReturnAccepted(true);
    setStep(2);
  }, []);

  useEffect(() => {
    if (!restoring.current) return;
    restoring.current = false;
    const saved = savedBooking();
    resumeBookingAnalytics(saved);
    if (saved?.kind === "held") {
      setShowRestoreError(true);
      place(saved.choice, (summary) => showHeld(saved.choice, summary));
      return;
    }
    if (!saved) return;
    if (saved.kind === "returning") {
      setReturned(saved.returned);
      return;
    }
    showHeld(saved.choice, saved.summary);
    if (saved.kind === "details") {
      resume(saved.attempt.hold);
      restoreDetails(saved.attempt);
      return;
    }
    forgetGuestDetails();
    if (saved.kind !== "paid") {
      setPayment(saved.step);
      if (saved.kind === "refused") setPaymentError(content.payment.bankFailed);
      return;
    }
    savePaid(saved.summary);
    setPaid(saved.summary);
  }, [place, resume, restoreDetails, showHeld]);

  const { forgetHold } = hold;
  const confirmBooking = useCallback(
    (confirmed: ITableBookingConfirmationProps) => {
      void trackBookingConfirmed(confirmed.reference);
      forgetGuestDetails();
      forgetBankReturn();
      setReturned(null);
      setBooked(confirmed);
      setPayment(null);
      setPaid(null);
      removeSessionStorage(PAID_KEY);
      removeSessionStorage(PAYMENT_KEY);
      forgetHold();
      setStep(3);
    },
    [forgetHold],
  );

  function sendDetails() {
    const active = hold.active;
    if (!active) return;
    guest.send(details, active, (reply) => {
      if (reply.kind === "confirmed") {
        confirmBooking({ reference: reply.reference, summary: reply.summary });
      } else {
        setPaymentSaved(setSessionStorage(PAYMENT_KEY, reply));
        setPayment(reply);
      }
    });
  }

  const resumePaid = useCallback(
    (summary: IHoldSummary) => {
      forgetGuestDetails();
      if (savePaid(summary)) forgetBankReturn();
      showHeld(choiceFor(summary), summary);
      setReturned(null);
      setPaid(summary);
    },
    [showHeld],
  );

  const paymentAccepted = useCallback(() => {
    if (payment) resumePaid(payment.summary);
  }, [payment, resumePaid]);

  const paymentExpired = useCallback(() => {
    setPayment(null);
    setPaymentError(null);
    removeSessionStorage(PAYMENT_KEY);
    forgetHold();
  }, [forgetHold]);

  function editSearch() {
    setPayment(null);
    setPaymentError(null);
    removeSessionStorage(PAYMENT_KEY);
    setStep(0);
  }

  function startOver() {
    forgetBankReturn();
    setReturned(null);
    setPaid(null);
    removeSessionStorage(PAID_KEY);
    forgetHold();
    editSearch();
  }

  function startAgain() {
    setDetails((current) => ({
      ...current,
      newsletterOptIn: emptyDetails().newsletterOptIn,
    }));
    startOver();
  }

  function holdChosenTime() {
    if (!time) return;
    setShowRestoreError(false);
    const choice = {
      searchDate: time.searchDate,
      time: time.time,
      partySize: Number(partySize),
    };
    place(choice, (summary) => showHeld(choice, summary));
  }
  const busy = isBusy(hold, guest, paymentBusy, paid);
  const month = startOfMonth(parseISO(date));
  const monthDates = availability.datesFor(month);
  const dateFull = isDateFull(monthDates, date);
  const nextMonthDates = availability.datesFor(addMonths(month, 1));
  const firstFree = firstFreeBookingDate(date, findTable.calendar, [
    monthDates,
    nextMonthDates,
  ]);
  const waitingForDate = waitingForNextMonth(datePicked, nextMonthDates);
  const moveDate = dateFull && !datePicked && firstFree !== undefined;

  useEffect(() => {
    if (step === 0) load(startOfMonth(parseISO(date)));
  }, [load, date, step]);

  useEffect(() => {
    if (step === 0 && moveDate) setDate(firstFree);
  }, [step, moveDate, firstFree]);

  useEffect(() => {
    if (step !== 0) return;
    function refreshDate() {
      const today = dublinToday();
      setDate((current) => (current < today ? today : current));
    }
    window.addEventListener("focus", refreshDate);
    document.addEventListener("visibilitychange", refreshDate);
    return () => {
      window.removeEventListener("focus", refreshDate);
      document.removeEventListener("visibilitychange", refreshDate);
    };
  }, [step]);

  useEffect(() => {
    if (previousView.current !== view) {
      previousView.current = view;
      alignBookingPanel(panel.current);
    }
  }, [view]);

  if (returned) {
    return (
      <section
        ref={panel}
        tabIndex={-1}
        aria-label={content.label}
        className={cn(
          "booking-panel [--booking-accent:#790e1d] [--booking-surface:#faf8f3] [--booking-control:#fcfaf7] [--booking-border:#ddd9d1] [--booking-muted:#8d8a87] [--booking-label:#111110] [--booking-value:#221a17] [--booking-emblem:#f1e4dd] [--booking-shadow:rgb(64_55_43_/_4.70588%)] [--booking-summary-inset:10px] min-w-0 min-h-0 pt-8 pr-[23px] pb-8 pl-[23px] border border-solid border-[var(--booking-border)] rounded-[16px] bg-[var(--booking-surface)] bg-none text-[var(--booking-label)] lg:[--booking-summary-inset:16px] lg:min-h-0 lg:pt-8 lg:pr-[clamp(47px,_calc(25vw_-_241px),_119px)] lg:pb-10 lg:pl-[clamp(47px,_calc(25vw_-_241px),_119px)] lg:rounded-[6px] lg:shadow-[0_8px_28px_var(--booking-shadow)] scroll-mt-25 [&&:focus]:outline-none [&&:focus]:outline-[length:medium] [&&:focus]:outline-current [&&[aria-busy=true]]:min-h-[715px] lg:[&&[aria-busy=true]]:min-h-[603px] [@media_(max-width:_359px)]:[&&[aria-busy=true]]:min-h-193.5",
          "booking-flowPanel lg:min-h-0",
        )}
      >
        <BookingProgress step={2} />
        <TableBookingReturn
          returned={returned}
          onPaid={resumePaid}
          onConfirmed={confirmBooking}
          onStartAgain={startAgain}
        />
      </section>
    );
  }

  return (
    <section
      ref={panel}
      tabIndex={-1}
      aria-label={content.label}
      className={cn(
        "booking-panel [--booking-accent:#790e1d] [--booking-surface:#faf8f3] [--booking-control:#fcfaf7] [--booking-border:#ddd9d1] [--booking-muted:#8d8a87] [--booking-label:#111110] [--booking-value:#221a17] [--booking-emblem:#f1e4dd] [--booking-shadow:rgb(64_55_43_/_4.70588%)] [--booking-summary-inset:10px] min-w-0 min-h-0 pt-8 pr-[23px] pb-8 pl-[23px] border border-solid border-[var(--booking-border)] rounded-[16px] bg-[var(--booking-surface)] bg-none text-[var(--booking-label)] lg:[--booking-summary-inset:16px] lg:min-h-0 lg:pt-8 lg:pr-[clamp(47px,_calc(25vw_-_241px),_119px)] lg:pb-10 lg:pl-[clamp(47px,_calc(25vw_-_241px),_119px)] lg:rounded-[6px] lg:shadow-[0_8px_28px_var(--booking-shadow)] scroll-mt-25 [&&:focus]:outline-none [&&:focus]:outline-[length:medium] [&&:focus]:outline-current [&&[aria-busy=true]]:min-h-[715px] lg:[&&[aria-busy=true]]:min-h-[603px] [@media_(max-width:_359px)]:[&&[aria-busy=true]]:min-h-193.5",

        step > 0 && "booking-flowPanel lg:min-h-0",
        step === 3 && "booking-confirmedPanel",
      )}
    >
      <BookingProgress step={step} />

      <div
        key={step}
        className={
          "booking-stepContent [@media_(prefers-reduced-motion:_no-preference)]:animate-[peploes-booking-open_180ms_ease-out]"
        }
      >
        {step === 0 && (
          <>
            <div className={"booking-availability mt-4.5 lg:mt-8"}>
              <div
                className={"booking-fields grid gap-4 lg:grid-cols-2 lg:gap-6"}
              >
                <TableBookingDate
                  value={date}
                  calendar={findTable.calendar}
                  availability={availability}
                  onChange={(value) => {
                    setDate(value);
                    setDatePicked(true);
                  }}
                />
                <TableBookingPartySize
                  value={partySize}
                  min={findTable.partySize.min}
                  max={findTable.partySize.max}
                  onChange={setPartySize}
                />
              </div>
              <Button
                type="button"
                variant="brand-primary"
                className={
                  "booking-findTable [&&:disabled]:pointer-events-auto [&&:disabled]:cursor-not-allowed [&&:disabled]:opacity-100 [&&]:w-full [&&]:h-12 [&&]:mt-4 [&&]:gap-2 [&&]:rounded-[4px] [&&]:bg-[var(--booking-accent)] [&&]:bg-none [&&]:text-[length:16px] [&&]:font-medium [&&:disabled:hover]:bg-[var(--booking-accent)] [&&:disabled:hover]:bg-none lg:[&&]:h-12 lg:[&&]:mt-6 lg:[&&]:gap-2 lg:[&&]:text-[length:16px] [&&]:leading-6 lg:[&&]:leading-6"
                }
                disabled={!date}
                onClick={() => {
                  const today = dublinToday();
                  if (date < today) {
                    setDate(today);
                    return;
                  }
                  const attemptId = beginBookingSearch();
                  trackBooking(GA4Event.BookingSearch, "submitted", {
                    attemptId,
                  });
                  setLoadTimes(true);
                  setShowRestoreError(false);
                  setTime(null);
                  setReturnAccepted(false);
                  setStep(1);
                }}
              >
                {content.action}
                <ArrowRight
                  aria-hidden="true"
                  className={
                    "booking-actionArrow [.booking-findTable_&&]:w-4 [.booking-findTable_&&]:h-4 lg:[.booking-findTable_&&]:w-4 lg:[.booking-findTable_&&]:h-4"
                  }
                />
              </Button>
            </div>
            <p
              role="status"
              className={
                "booking-dateNote mt-2 mr-0 mb-0 ml-0 text-[var(--booking-accent)] text-[length:14px] [&&:empty]:mt-0 [&&:empty]:mr-0 [&&:empty]:mb-0 [&&:empty]:ml-0 leading-5"
              }
            >
              {dateFull &&
                !moveDate &&
                !waitingForDate &&
                content.fullDate(guests, shortDate)}
            </p>
            <HoldError message={hold.error} visible={showRestoreError} />
            <div hidden={!hold.pending}>
              <TableBookingProcessing>
                {content.holdingMessage}
              </TableBookingProcessing>
            </div>
            <TableBookingSupport />
          </>
        )}

        {(step === 1 || step === 2) && (
          <>
            <div
              className={
                "booking-summary flex items-center gap-2 mt-4.5 mr-0 mb-6 ml-0 pt-3 pr-[var(--booking-summary-inset)] pb-3 pl-[var(--booking-summary-inset)] bg-[#f2eee8] bg-none text-[length:12px] [&&_>_svg]:w-5 [&&_>_svg]:h-5 [&&_>_svg]:shrink-0 [&&_p]:flex-1 [&&_small]:block [&&_small]:text-text-secondary lg:gap-3 lg:mt-6 lg:mr-0 lg:mb-6 lg:ml-0 lg:pt-2.5 lg:pr-[var(--booking-summary-inset)] lg:pb-2.5 lg:pl-[var(--booking-summary-inset)] lg:text-[length:16px] lg:[&&_>_svg]:w-6 lg:[&&_>_svg]:h-6 lg:[&&_small]:text-[length:14px] leading-4.5 lg:leading-6 lg:[&&_small]:leading-5"
              }
            >
              <CalendarDays aria-hidden="true" />
              <p>
                {shortDate}
                <span aria-hidden="true"> | </span>
                {step === 2 && time && (
                  <>
                    {time.label}
                    <span aria-hidden="true"> | </span>
                  </>
                )}
                {guests}
                {step === 2 && returnBy && (
                  <small>{content.tableUntil(returnBy.label)}</small>
                )}
              </p>
              <TableBookingChange
                busy={busy}
                payment={payment}
                onEdit={editSearch}
                onStartOver={startOver}
                onConfirmed={confirmBooking}
              />
            </div>
            {step === 1 ? (
              <BookingTimes
                longDate={longDate}
                guests={guests}
                times={times}
                time={time}
                holding={hold.pending}
                holdError={hold.error}
                returnAccepted={returnAccepted}
                onTimeChange={(selected) => {
                  setTime(selected);
                  setReturnAccepted(false);
                }}
                onReturnChange={setReturnAccepted}
                onBack={() => setStep(0)}
                onContinue={holdChosenTime}
              />
            ) : (
              <HeldStep
                terms={findTable.terms}
                hold={hold}
                details={details}
                guest={guest}
                payment={payment}
                paymentError={paymentError}
                paymentSaved={paymentSaved}
                paid={paid}
                onPaid={paymentAccepted}
                onExpired={paymentExpired}
                onBusyChange={setPaymentBusy}
                onConfirmed={confirmBooking}
                onDetailsChange={setDetails}
                onBack={() => {
                  setLoadTimes(true);
                  setStep(1);
                }}
                onContinue={sendDetails}
                onStartAgain={startAgain}
                onCheckAgain={() => setPaid(paid ? { ...paid } : null)}
              />
            )}
          </>
        )}

        {step === 3 && booked && (
          <>
            <BookingConfirmation
              reference={booked.reference}
              summary={booked.summary}
            />
            <TableBookingSupport confirmation />
            <button
              type="button"
              className={cn(
                "booking-backAction [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 inline-flex items-center gap-1 text-[var(--booking-accent)] text-[length:12px] text-left underline decoration-solid decoration-current decoration-auto cursor-pointer [&&_svg]:w-3.5 [&&_svg]:h-3.5 [&&_svg]:shrink-0 [&&:disabled]:opacity-40 [&&:disabled]:cursor-not-allowed lg:text-[length:16px] lg:[&&_svg]:w-4 lg:[&&_svg]:h-4 [@media_(max-width:_359px)]:text-[length:11px] leading-4.5 lg:leading-6",
                "booking-restart mt-6",
              )}
              onClick={() => {
                setStep(0);
                setTime(null);
                setReturnAccepted(false);
                setDetails(emptyDetails());
                setBooked(null);
              }}
            >
              <ArrowLeft aria-hidden="true" />
              Start again
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export function alignBookingPanel(element: HTMLElement | null) {
  if (!element) return;
  if (!element.contains(document.activeElement))
    element.focus({ preventScroll: true });
  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  element.style.scrollMarginTop = `${headerHeight + TABLE_BOOKING_SCROLL_GAP_PX}px`;
  element.scrollIntoView({
    block: "start",
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}

function BookingConfirmation({
  reference,
  summary,
}: ITableBookingConfirmationProps) {
  const { returnBy } = summary.offer;
  return (
    <div className={"booking-confirmation mt-6 text-center lg:mt-8"}>
      <span
        className={
          "booking-confirmationCheck grid place-items-center w-12 h-12 mt-0 mr-auto mb-5 ml-auto rounded-[50%] bg-[var(--booking-accent)] bg-none text-[var(--booking-surface)] [&&_svg]:w-7.5 [&&_svg]:h-7.5 [&&_svg]:stroke-[1.5] lg:w-16 lg:h-16 lg:mb-5 lg:[&&_svg]:w-8 lg:[&&_svg]:h-8"
        }
      >
        <Check aria-hidden="true" />
      </span>
      <h2
        className={
          "booking-flowHeading mt-0 mr-0 mb-0 ml-0 text-[length:30px] lg:text-[length:36px] leading-9 lg:leading-10.5"
        }
      >
        {content.confirmation.heading}
      </h2>
      <p
        className={
          "booking-bookingReference mt-5 text-text-secondary text-[length:14px] [&&_strong]:text-[var(--booking-value)] [&&_strong]:text-[length:16px] leading-6"
        }
      >
        {content.confirmation.referenceLabel}
        <br />
        <strong>{reference}</strong>
      </p>
      <p
        className={
          "booking-confirmationSummary mt-1 text-[length:13px] lg:mt-4 lg:text-[length:18px] leading-[21px] lg:leading-7"
        }
      >
        {summary.dateLabel}
        <br className={"booking-desktopOnly hidden lg:inline"} /> ·{" "}
        {summary.timeLabel} · {summary.guestsLabel}
        {returnBy && (
          <>
            <br />
            {content.tableUntil(returnBy.label)}
          </>
        )}
      </p>
      <p
        className={
          "booking-confirmationDisclaimer mt-6 mr-auto mb-0 ml-auto max-w-160 text-text-secondary text-[length:13px] lg:mt-4 lg:text-[length:16px] leading-5 lg:leading-6"
        }
      >
        {content.confirmation.keepReference}
      </p>
      <div
        className={
          "booking-confirmationActions grid grid-cols-2 gap-2.5 mt-6 [&&_>_*]:min-w-0 [&&_>_*]:h-11 [&&_>_*]:pl-2 [&&_>_*]:pr-2 [&&_>_*]:rounded-[4px] [&&_>_*]:text-[length:13px] [&&_>_:first-child]:col-span-full [&&_>_:disabled]:opacity-60 lg:grid-cols-3 lg:gap-4 lg:mt-6 lg:[&&_>_*]:h-12 lg:[&&_>_*]:text-[length:16px] lg:[&&_>_:first-child]:col-auto [@media_(max-width:_359px)]:grid-cols-[1fr]"
        }
      >
        <Button
          type="button"
          variant="brand-contact"
          disabled
          title="Calendar export isn't available yet."
        >
          Add to Calendar
        </Button>
        <Button asChild variant="brand-primary">
          <Link href={ROUTES.MENUS}>
            View Menus
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="brand-contact">
          <Link href={ROUTES.VISIT_CONTACT}>
            Plan Your Visit
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface IDetailsCheckProps {
  hold: IHoldSummary;
  pendingFrom: number;
  onSettled: (check: TBookingStatusCheck) => void;
  onStartAgain: () => void;
}

function DetailsCheck({
  hold,
  pendingFrom,
  onSettled,
  onStartAgain,
}: IDetailsCheckProps) {
  const [checkedHold, setCheckedHold] = useState(hold);
  const check = useBookingStatus(checkedHold, pendingFrom);

  useEffect(() => {
    if (check.kind !== "checking" && check.kind !== "unknown") {
      onSettled(check);
    }
  }, [check, onSettled]);

  if (check.kind === "unknown" && check.notFound) {
    return (
      <PaymentOutcome
        phase="details"
        check={check}
        reference={hold.reference}
        onStartAgain={onStartAgain}
        onCheckAgain={() => setCheckedHold({ ...hold })}
      />
    );
  }

  return (
    <div aria-busy={check.kind === "checking"}>
      <p
        role="status"
        className={
          "booking-flowDescription mt-2 text-text-secondary text-[length:14px] lg:mt-2 lg:text-[length:16px] max-sm:text-[length:16px] leading-5 lg:leading-6"
        }
      >
        {check.kind === "unknown"
          ? content.details.stillConfirming(hold.reference)
          : content.details.checking}
      </p>
      {check.kind === "checking" && <TableBookingStatusSkeleton />}
    </div>
  );
}

const PAID_KEY = "peploes:booking-paid";
const PAYMENT_KEY = "peploes:booking-payment";

type TSavedBooking =
  | { kind: "returning"; returned: IBookingBankReturn }
  | { kind: "held"; choice: IHoldChoice }
  | { kind: "paid"; choice: IHoldChoice; summary: IHoldSummary }
  | {
      kind: "details";
      choice: IHoldChoice;
      summary: IHoldSummary;
      attempt: IGuestDetailsAttempt;
    }
  | {
      kind: "refused" | "paying";
      choice: IHoldChoice;
      summary: IHoldSummary;
      step: TPaymentStep;
    };

function choiceFor(summary: IHoldSummary): IHoldChoice {
  const saved = storedHold();
  if (
    saved?.holdReference === summary.reference &&
    saved.holdRevision === summary.revision
  ) {
    return saved.choice;
  }
  return {
    searchDate: summary.date,
    time: summary.time,
    partySize: summary.partySize,
  };
}

function savePaid(summary: IHoldSummary): boolean {
  if (!setSessionStorage(PAID_KEY, summary)) return false;
  removeSessionStorage(PAYMENT_KEY);
  return true;
}

function forgetBankReturn() {
  if (new URLSearchParams(window.location.search).has("redirect_status")) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

function bankReturn(): TSavedBooking | null {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("redirect_status");
  if (!status) return null;
  const step = getSessionStorage<TPaymentStep>(PAYMENT_KEY);
  const secret = params.get(
    step?.kind === "card"
      ? "setup_intent_client_secret"
      : "payment_intent_client_secret",
  );
  if (!step || secret !== step.stripe.clientSecret) {
    const returned = returnedHold(params, status);
    if (!returned) forgetBankReturn();
    return returned;
  }
  forgetBankReturn();
  const { summary } = step;
  return BOOKING_BANK_REFUSED_STATUSES.has(status)
    ? { kind: "refused", choice: choiceFor(summary), summary, step }
    : { kind: "paid", choice: choiceFor(summary), summary };
}

function returnedHold(
  params: URLSearchParams,
  status: string,
): TSavedBooking | null {
  const hold = holdReferenceSchema.safeParse({
    holdReference: params.get(BOOKING_RETURN_PARAMS.reference),
    holdRevision: params.get(BOOKING_RETURN_PARAMS.revision),
  });
  if (!hold.success) return null;
  const query = new URLSearchParams([
    [BOOKING_RETURN_PARAMS.reference, hold.data.holdReference],
    [BOOKING_RETURN_PARAMS.revision, String(hold.data.holdRevision)],
    ["redirect_status", status],
  ]);
  window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  return {
    kind: "returning",
    returned: {
      reference: hold.data.holdReference,
      revision: hold.data.holdRevision,
      status,
    },
  };
}

function savedBooking(): TSavedBooking | null {
  const returned = bankReturn();
  if (returned) return returned;
  const paid = getSessionStorage<IHoldSummary>(PAID_KEY);
  if (paid) return { kind: "paid", choice: choiceFor(paid), summary: paid };
  const step = getSessionStorage<TPaymentStep>(PAYMENT_KEY);
  if (step) {
    const { summary } = step;
    return { kind: "paying", choice: choiceFor(summary), summary, step };
  }
  return savedDetailsOrHold();
}

function savedDetailsOrHold(): TSavedBooking | null {
  const attempt = storedGuestDetails();
  if (attempt) {
    const { summary } = attempt.hold;
    return { kind: "details", choice: choiceFor(summary), summary, attempt };
  }
  const held = storedHold();
  return held ? { kind: "held", choice: held.choice } : null;
}

const KEEP_HOLD = () => undefined;

function isBusy(
  hold: ITableHold,
  guest: IGuestDetailsSending,
  paymentBusy: boolean,
  paid: IHoldSummary | null,
): boolean {
  return (
    hold.pending ||
    guest.sending ||
    guest.unsure !== null ||
    paymentBusy ||
    paid !== null
  );
}

function waitingForNextMonth(
  datePicked: boolean,
  dates: TOpenDates | undefined,
): boolean {
  return !datePicked && dates === "loading";
}

function isDateFull(dates: TOpenDates | undefined, date: string): boolean {
  return Array.isArray(dates) && !dates.includes(date);
}

function emptyDetails(): ITableBookingGuestDetails {
  return {
    firstName: "",
    surname: "",
    email: "",
    countryCode: String(BOOKING_GUEST_LIMITS.defaultCountryCode),
    phone: "",
    requests: "",
    terms: false,
    newsletterOptIn: true,
  };
}

function returnByOf(time: IBookingTime | null): IReturnBy | null {
  return time?.offers[0]?.returnBy ?? null;
}

function BookingProgress({ step }: ITableBookingProgressProps) {
  return (
    <ol
      aria-label={content.progressLabel}
      className={
        "booking-progress grid grid-cols-4 gap-2.5 h-16.5 mt-0 mb-0 ml-[-12px] mr-[-12px] pt-0 pr-0 pb-0 pl-0 list-none lg:h-12 lg:gap-6 lg:ml-0 lg:mr-0 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:gap-4 lg:[.booking-confirmedPanel_&&]:hidden"
      }
    >
      {content.steps.map((item, index) => (
        <li
          key={item.number}
          aria-current={index === step ? "step" : undefined}
          data-complete={index < step}
          className={
            "booking-step relative flex min-w-0 flex-col items-center text-[var(--booking-muted)] [&&:not(:last-child)::after]:content-[''] [&&:not(:last-child)::after]:absolute [&&:not(:last-child)::after]:top-4.5 [&&:not(:last-child)::after]:left-[calc(50%_+_18px)] [&&:not(:last-child)::after]:w-[calc(100%_-_26px)] [&&:not(:last-child)::after]:h-px [&&:not(:last-child)::after]:bg-[var(--booking-border)] [&&:not(:last-child)::after]:bg-none [&&:not(:last-child)::after]:opacity-55 [&&[aria-current=step]]:text-[var(--booking-accent)] lg:flex-row lg:items-start lg:gap-2.5 lg:[&&::before]:content-[''] lg:[&&::before]:absolute lg:[&&::before]:right-0 lg:[&&::before]:bottom-px lg:[&&::before]:left-0 lg:[&&::before]:h-px lg:[&&::before]:bg-[var(--booking-border)] lg:[&&::before]:bg-none lg:[&&[aria-current=step]::before]:bottom-0 lg:[&&[aria-current=step]::before]:h-[3px] lg:[&&[aria-current=step]::before]:bg-[var(--booking-accent)] lg:[&&[aria-current=step]::before]:bg-none lg:[&&:not(:last-child)::after]:hidden [@media_(min-width:_1024px)_and_(max-width:_1279px)]:gap-2"
          }
        >
          <span
            className={
              "booking-stepNumber grid w-9 h-9 place-items-center border border-solid border-[var(--booking-border)] rounded-[50%] bg-[var(--booking-surface)] bg-none text-[length:16px] font-normal [.booking-step[aria-current=step]_&&]:border-[var(--booking-accent)] [.booking-step[aria-current=step]_&&]:bg-[var(--booking-accent)] [.booking-step[aria-current=step]_&&]:bg-none [.booking-step[aria-current=step]_&&]:text-warm-cream lg:w-8 lg:h-8 lg:shrink-0 lg:border-2 lg:text-[length:14px] lg:font-medium lg:[.booking-step:not([aria-current=step])_&&]:transform-[translateY(1px)] [.booking-step[data-complete=true]_&&]:bg-[var(--booking-label)] [.booking-step[data-complete=true]_&&]:bg-none [.booking-step[data-complete=true]_&&]:text-[var(--booking-surface)] [.booking-step[data-complete=true]_&&]:border-[var(--booking-label)] leading-[1]"
            }
            aria-hidden="true"
          >
            {index < step ? (
              <Check
                className={
                  "booking-completedIcon w-4.5 h-4.5 lg:w-4.5 lg:h-4.5"
                }
              />
            ) : (
              <>
                <span className={"booking-desktopNumber hidden lg:inline"}>
                  {item.number}
                </span>
                <span className={"booking-mobileNumber lg:hidden"}>
                  {item.mobileNumber}
                </span>
              </>
            )}
          </span>
          <span
            className={
              "booking-stepName mt-2 text-[length:14px] font-medium whitespace-nowrap [.booking-step:not([aria-current=step])_&&]:absolute [.booking-step:not([aria-current=step])_&&]:w-px [.booking-step:not([aria-current=step])_&&]:h-px [.booking-step:not([aria-current=step])_&&]:overflow-hidden [.booking-step:not([aria-current=step])_&&]:[clip-path:inset(50%)] lg:static lg:w-auto lg:h-auto lg:mt-0 lg:overflow-visible lg:[clip-path:none] lg:text-[length:16px] lg:font-normal lg:[.booking-step:not([aria-current=step])_&&]:static lg:[.booking-step:not([aria-current=step])_&&]:w-auto lg:[.booking-step:not([aria-current=step])_&&]:h-auto lg:[.booking-step:not([aria-current=step])_&&]:mt-0 lg:[.booking-step:not([aria-current=step])_&&]:overflow-visible lg:[.booking-step:not([aria-current=step])_&&]:[clip-path:none] lg:[.booking-step:not([aria-current=step])_&&]:text-[length:16px] lg:[.booking-step:not([aria-current=step])_&&]:font-normal lg:[.booking-step[aria-current=step]_&&]:font-semibold lg:[.booking-step:not([aria-current=step])_&&]:transform-[translateY(1px)] [@media_(min-width:_1024px)_and_(max-width:_1279px)]:text-[length:15px] [@media_(min-width:_1024px)_and_(max-width:_1279px)]:[.booking-step:not([aria-current=step])_&&]:text-[length:15px] leading-5 lg:leading-8 lg:[.booking-step:not([aria-current=step])_&&]:leading-8"
            }
          >
            {item.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function HoldError({
  message,
  visible = true,
}: {
  message: string | null;
  visible?: boolean;
}) {
  if (!visible || !message) return null;
  return (
    <p
      role="alert"
      className={
        "booking-timesMessage mt-0 mr-0 mb-4 ml-0 text-[var(--booking-accent)] text-[length:13px] [&&:empty]:mt-0 [&&:empty]:mr-0 [&&:empty]:mb-0 [&&:empty]:ml-0 lg:text-[length:16px] leading-5 lg:leading-6"
      }
    >
      {message}
    </p>
  );
}

function BookingTimes({
  longDate,
  guests,
  times,
  time,
  holding,
  holdError,
  returnAccepted,
  onTimeChange,
  onReturnChange,
  onBack,
  onContinue,
}: ITableBookingTimesProps) {
  const returnBy = returnByOf(time);
  const mustAccept = returnBy?.required === true;
  return (
    <div>
      <h2
        className={
          "booking-flowHeading mt-0 mr-0 mb-0 ml-0 text-[length:30px] lg:text-[length:36px] leading-9 lg:leading-10.5"
        }
      >
        {content.timesLabel}
      </h2>
      <p
        className={
          "booking-flowDescription mt-2 text-text-secondary text-[length:14px] lg:mt-2 lg:text-[length:16px] max-sm:text-[length:16px] leading-5 lg:leading-6"
        }
      >
        Showing times for {longDate} · {guests}
      </p>
      <TimesList times={times} time={time} onTimeChange={onTimeChange} />
      {returnBy && !mustAccept && (
        <p
          className={
            "booking-returnInfo mt-6 text-text-secondary text-[length:13px] lg:text-[length:16px] leading-5 lg:leading-6"
          }
        >
          {content.tableUntil(returnBy.label)}
        </p>
      )}
      {returnBy && mustAccept && (
        <div
          className={
            "booking-returnNotice mt-7 text-text-secondary text-[length:13px] [&&_strong]:text-[var(--booking-value)] [&&_strong]:font-semibold [&&_p]:mt-4 [&&_label]:flex [&&_label]:items-start [&&_label]:gap-2.5 [&&_label]:mt-5 [&&_label]:w-fit [&&_label]:cursor-default [&&_input]:cursor-pointer lg:[&&_label]:cursor-pointer [&&_input]:w-4.5 [&&_input]:h-4.5 [&&_input]:shrink-0 [&&_input]:accent-[var(--booking-accent)] lg:mt-6 lg:text-[length:16px] lg:[&&_input]:w-4.5 lg:[&&_input]:h-4.5 lg:[&&_input]:mt-[3px] leading-5 lg:leading-6"
          }
        >
          <strong>{content.returnTime.heading}</strong>
          <label>
            <input
              type="checkbox"
              checked={returnAccepted}
              onChange={(event) => onReturnChange(event.target.checked)}
            />
            {content.returnTime.accept(returnBy.label)}
          </label>
        </div>
      )}
      <HoldError message={holdError} />
      {holding && (
        <TableBookingProcessing>
          {content.holdingMessage}
        </TableBookingProcessing>
      )}
      <div
        className={
          "booking-flowActions flex items-center justify-between gap-3.5 mt-7.5 pt-6 border-t border-solid border-t-[var(--booking-border)] lg:mt-7 lg:pt-0 lg:border-t-0 lg:border-none lg:border-t-current lg:gap-6"
        }
      >
        <button
          type="button"
          className={
            "booking-backAction [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 inline-flex items-center gap-1 text-[var(--booking-accent)] text-[length:12px] text-left underline decoration-solid decoration-current decoration-auto cursor-pointer [&&_svg]:w-3.5 [&&_svg]:h-3.5 [&&_svg]:shrink-0 [&&:disabled]:opacity-40 [&&:disabled]:cursor-not-allowed lg:text-[length:16px] lg:[&&_svg]:w-4 lg:[&&_svg]:h-4 [@media_(max-width:_359px)]:text-[length:11px] leading-4.5 lg:leading-6"
          }
          disabled={holding}
          onClick={onBack}
        >
          <ArrowLeft aria-hidden="true" />
          Back to search
        </button>
        <Button
          type="button"
          variant="brand-primary"
          className={
            "booking-continueAction [&&]:min-w-0 [&&]:flex-1 [&&]:h-12 [&&]:pl-2.5 [&&]:pr-2.5 [&&]:rounded-[4px] [&&]:bg-[var(--booking-accent)] [&&]:bg-none [&&]:text-[length:14px] [&&:disabled]:opacity-40 lg:[&&]:flex-[0_1_50%] lg:[&&]:h-12 lg:[&&]:text-[length:16px] [@media_(max-width:_359px)]:[&&]:text-[length:12px]"
          }
          disabled={!time || holding || (mustAccept && !returnAccepted)}
          onClick={onContinue}
        >
          {holding ? content.holding : "Continue"}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function HeldStep({
  terms,
  hold,
  details,
  guest,
  payment,
  paymentError,
  paymentSaved,
  paid,
  onPaid,
  onExpired,
  onBusyChange,
  onConfirmed,
  onDetailsChange,
  onBack,
  onContinue,
  onStartAgain,
  onCheckAgain,
}: ITableBookingHeldStepProps) {
  const check = useBookingStatus(paid);
  const { settle } = guest;
  const { forgetHold } = hold;
  const expireHold = useCallback(() => {
    if (hold.active)
      trackBooking(GA4Event.BookingHold, "expired", {
        reference: hold.active.summary.reference,
      });
    forgetHold();
  }, [hold.active, forgetHold]);

  useEffect(() => {
    if (check.kind === "confirmed") {
      onConfirmed({ reference: check.reference, summary: check.summary });
    } else if (check.kind === "failed") {
      removeSessionStorage(PAID_KEY);
      forgetHold();
    }
  }, [check, onConfirmed, forgetHold]);

  const settleDetails = useCallback(
    (detailsCheck: TBookingStatusCheck) => {
      settle(detailsCheck);
      if (detailsCheck.kind === "confirmed") {
        onConfirmed({
          reference: detailsCheck.reference,
          summary: detailsCheck.summary,
        });
      } else if (detailsCheck.kind === "failed") {
        forgetHold();
      }
    },
    [settle, forgetHold, onConfirmed],
  );

  if (guest.unsure) {
    return (
      <DetailsCheck
        hold={guest.unsure}
        pendingFrom={guest.pendingFrom}
        onSettled={settleDetails}
        onStartAgain={() => {
          settle({ kind: "unknown", notFound: true });
          onStartAgain();
        }}
      />
    );
  }
  if (paid) {
    return (
      <PaymentOutcome
        check={check}
        reference={paid.reference}
        onStartAgain={onStartAgain}
        onCheckAgain={onCheckAgain}
      />
    );
  }
  if (payment) {
    return (
      <TableBookingPayment
        step={payment}
        initialError={paymentError}
        storageBlocked={!paymentSaved}
        onPaid={onPaid}
        onExpired={onExpired}
        onStartAgain={onStartAgain}
        onConfirmed={onConfirmed}
        onBusyChange={onBusyChange}
      />
    );
  }
  if (!hold.active) {
    return (
      <div
        className={
          "booking-flowNotice [@media_(prefers-reduced-motion:_no-preference)]:animate-[peploes-booking-open_180ms_ease-out] grid justify-items-start gap-4 text-[var(--booking-accent)]"
        }
      >
        <p role="alert">{BOOKING_MESSAGES.holdExpired}</p>
        <Button type="button" variant="brand-primary" onClick={onBack}>
          {content.chooseAgain}
        </Button>
      </div>
    );
  }
  return (
    <>
      <TableBookingHoldTimer
        endsAt={hold.active.endsAt}
        onExpire={guest.sending ? KEEP_HOLD : expireHold}
      />
      <TableBookingDetails
        terms={terms}
        details={details}
        sending={guest.sending}
        serverErrors={guest.fieldErrors}
        formError={guest.formError}
        onChange={onDetailsChange}
        onBack={onBack}
        onContinue={onContinue}
      />
    </>
  );
}

function TimesList({ times, time, onTimeChange }: TTableBookingTimesListProps) {
  const desktop = useMediaQuery(TABLE_BOOKING_TIMES.desktopQuery);
  const [expanded, setExpanded] = useState(time !== null);
  const initialCount = desktop
    ? TABLE_BOOKING_TIMES.initialDesktopCount
    : TABLE_BOOKING_TIMES.initialMobileCount;
  const slots = times.status === "ready" ? times.data.times : [];
  const [previousInitialCount, setPreviousInitialCount] =
    useState(initialCount);
  if (previousInitialCount !== initialCount) {
    setPreviousInitialCount(initialCount);
    if (
      slots
        .slice(initialCount)
        .some((slot) => slot.date === time?.date && slot.time === time.time)
    ) {
      setExpanded(true);
    }
  }
  const remainingSlots = slots.slice(initialCount);
  const renderSlot = (slot: IBookingTime) => (
    <button
      type="button"
      key={`${slot.date} ${slot.time}`}
      aria-pressed={time?.date === slot.date && time.time === slot.time}
      className={
        "booking-timeSlot cursor-pointer [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 min-h-11.5 pt-2 pr-2 pb-2 pl-2 border border-solid border-[var(--booking-border)] rounded-[4px] bg-[var(--booking-control)] bg-none text-[length:16px] [&&[aria-pressed=true]]:border-[var(--booking-accent)] [&&[aria-pressed=true]]:bg-[var(--booking-accent)] [&&[aria-pressed=true]]:bg-none [&&[aria-pressed=true]]:text-[var(--booking-surface)] [&&:hover:not([aria-pressed=true])]:bg-[var(--booking-emblem)] [&&:hover:not([aria-pressed=true])]:bg-none lg:min-h-14 lg:text-[length:18px] leading-6 lg:leading-6.5"
      }
      onClick={() => onTimeChange(slot)}
    >
      {slot.label}
    </button>
  );
  return (
    <>
      <p
        role="status"
        className={
          "booking-timesMessage mt-0 mr-0 mb-4 ml-0 text-[var(--booking-accent)] text-[length:13px] [&&:empty]:mt-0 [&&:empty]:mr-0 [&&:empty]:mb-0 [&&:empty]:ml-0 lg:text-[length:16px] leading-5 lg:leading-6"
        }
      >
        {timesMessage(times)}
      </p>
      {times.status === "loading" && <TableBookingTimesSkeleton />}
      {slots.length > 0 && (
        <fieldset id="booking-times" aria-label={content.timesLabel}>
          <div
            className={
              "booking-timeGrid [@media_(prefers-reduced-motion:_no-preference)]:animate-[peploes-booking-open_180ms_ease-out] grid grid-cols-2 gap-2.5 mt-6 lg:grid-cols-4 lg:gap-[12px_16px] lg:mt-6"
            }
          >
            {slots.slice(0, initialCount).map(renderSlot)}
          </div>
          {remainingSlots.length > 0 && (
            <div
              id="booking-extra-times"
              className={
                "booking-extraTimes grid grid-rows-[0fr] opacity-0 invisible transition-[grid-template-rows,opacity,visibility] duration-[220ms,180ms,0s] ease-[ease,ease,linear] [transition-delay:0s,0s,220ms] transition-normal [&&[data-expanded=true]]:grid-rows-[1fr] [&&[data-expanded=true]]:opacity-100 [&&[data-expanded=true]]:visible [&&[data-expanded=true]]:[transition-delay:0s] [@media_(prefers-reduced-motion:_reduce)]:transition-none [@media_(prefers-reduced-motion:_reduce)]:duration-0 [@media_(prefers-reduced-motion:_reduce)]:ease-[ease] [@media_(prefers-reduced-motion:_reduce)]:[transition-delay:0s] [@media_(prefers-reduced-motion:_reduce)]:transition-normal"
              }
              data-expanded={expanded}
              inert={!expanded}
            >
              <div className={"booking-extraTimesClip min-h-0 overflow-hidden"}>
                <div
                  className={cn(
                    "booking-timeGrid [@media_(prefers-reduced-motion:_no-preference)]:animate-[peploes-booking-open_180ms_ease-out] grid grid-cols-2 gap-2.5 mt-6 lg:grid-cols-4 lg:gap-[12px_16px] lg:mt-6",
                    "booking-extraTimeGrid mt-2.5 lg:[.booking-timeGrid&&]:mt-3",
                  )}
                >
                  {remainingSlots.map(renderSlot)}
                </div>
              </div>
            </div>
          )}
        </fieldset>
      )}
      {remainingSlots.length > 0 && (
        <button
          type="button"
          className={
            "booking-showMoreTimes [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 flex items-center justify-center gap-3 min-h-11 mt-4 mr-auto mb-0 ml-auto text-[var(--booking-accent)] text-[length:16px] cursor-pointer [&&_svg]:w-3.5 [&&_svg]:h-3.5 leading-6"
          }
          aria-controls="booking-extra-times"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown aria-hidden="true" />
          {expanded
            ? content.showFewerTimes
            : content.showMoreTimes(remainingSlots.length)}
        </button>
      )}
    </>
  );
}

function timesMessage(times: TBookingTimes): string {
  if (times.status === "loading") return content.findingTimes;
  if (times.status === "failed") return times.message;
  const { emptyReason, dateLabel, guestsLabel } = times.data;
  switch (emptyReason) {
    case "closed":
      return content.noTimes.closed(dateLabel);
    case "none_online":
      return content.noTimes.noneOnline(guestsLabel, dateLabel);
    case "all_passed":
      return content.noTimes.allPassed(dateLabel);
    default:
      return "";
  }
}
