"use client";

import { Pencil } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { fetcher } from "@/helpers/api";
import { BOOKING_API, BOOKING_BUDGET_MS } from "@/lib/constants/booking";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import { HttpVerb } from "@/lib/enums";
import type {
  IHoldStatusResult,
  IHoldSummary,
  ITableBookingChangeProps,
  TBookingResponse,
} from "@/lib/types";

const copy = TABLE_BOOKING_CONTENT.changeBooking;

interface IChangeDialogProps {
  summary: IHoldSummary;
  checking: boolean;
  onKeep: () => void;
  onChoose: () => void;
}

async function checkHold(summary: IHoldSummary) {
  const query = new URLSearchParams({
    holdReference: summary.reference,
    holdRevision: String(summary.revision),
  });
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), BOOKING_BUDGET_MS.holdCheck);
  });
  const reply = await Promise.race([
    fetcher<never, TBookingResponse<IHoldStatusResult>>({
      url: `${BOOKING_API.holdStatus}?${query}`,
      method: HttpVerb.Get,
    }).then((response) => response.data),
    timeout,
  ]);
  clearTimeout(timer);
  return reply?.ok ? reply.data : null;
}

function ChangeDialog({
  summary,
  checking,
  onKeep,
  onChoose,
}: IChangeDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return (
    <dialog
      ref={dialog}
      closedby={checking ? "none" : "closerequest"}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
      className={
        "booking-changeDialog w-[min(480px,_calc(100%_-_32px))] max-h-[calc(100dvh_-_32px)] mt-auto mr-auto mb-auto ml-auto border-0 border-none border-current pt-8 pr-8 pb-8 pl-8 bg-warm-cream bg-none text-ink shadow-[0_16px_48px_rgb(0_0_0_/_20%)] [&&::backdrop]:bg-[rgb(0_0_0_/_40%)] [&&::backdrop]:bg-none"
      }
      onCancel={(event) => {
        event.preventDefault();
        if (!checking) onKeep();
      }}
      onClose={(event) => {
        const element = event.currentTarget;
        if (!element.isConnected || element.open) return;
        if (checking) {
          element.showModal();
        } else {
          onKeep();
        }
      }}
    >
      <h2
        id={`${id}-title`}
        className={
          "booking-flowHeading mt-0 mr-0 mb-0 ml-0 text-[length:30px] lg:text-[length:36px] leading-9 lg:leading-10.5"
        }
      >
        {copy.heading}
      </h2>
      <p
        id={`${id}-text`}
        role={checking ? "status" : undefined}
        className={
          "booking-flowDescription mt-2 text-text-secondary text-[length:14px] lg:mt-2 lg:text-[length:16px] max-sm:text-[length:16px] leading-5 lg:leading-6"
        }
      >
        {copy.text(summary.timeLabel, summary.dateLabel)}
      </p>
      <div
        className={
          "booking-changeActions flex flex-wrap justify-end gap-3 mt-6"
        }
      >
        <Button
          type="button"
          variant="brand-contact"
          autoFocus
          disabled={checking}
          onClick={onKeep}
        >
          {copy.keep}
        </Button>
        <Button
          type="button"
          variant="brand-primary"
          disabled={checking}
          onClick={onChoose}
        >
          {checking ? copy.checking : copy.choose}
        </Button>
      </div>
    </dialog>
  );
}

export function TableBookingChange({
  busy,
  payment,
  onEdit,
  onStartOver,
  onConfirmed,
}: ITableBookingChangeProps) {
  const [asking, setAsking] = useState(false);
  const [checking, setChecking] = useState(false);
  const checkingHold = useRef(false);

  async function chooseAnotherTime() {
    if (!payment || checkingHold.current) return;
    checkingHold.current = true;
    setChecking(true);
    const result = await checkHold(payment.summary);
    setAsking(false);
    setChecking(false);
    checkingHold.current = false;
    if (result?.status === "confirmed") {
      onConfirmed({ reference: result.reference, summary: result.summary });
    } else {
      onStartOver();
    }
  }

  return (
    <>
      <Button
        variant="plain"
        type="button"
        className={
          "booking-editAction [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-3 [&&]:shrink-0 [&&]:text-[var(--booking-accent)] [&&]:underline [&&]:decoration-solid [&&]:decoration-current [&&]:decoration-auto [&&]:cursor-pointer [&&_>_svg]:hidden [@media_(hover:_hover)]:[&&:hover:not(:disabled)]:bg-[color-mix(in_srgb,_var(--booking-accent)_8%,_transparent)] [@media_(hover:_hover)]:[&&:hover:not(:disabled)]:text-[var(--booking-accent)] [@media_(prefers-reduced-motion:_no-preference)]:[&&]:transition-[background-color,color] [@media_(prefers-reduced-motion:_no-preference)]:[&&]:duration-[180ms,180ms] [@media_(prefers-reduced-motion:_no-preference)]:[&&]:ease-[ease,ease] [@media_(prefers-reduced-motion:_no-preference)]:[&&]:[transition-delay:0s,0s] [@media_(prefers-reduced-motion:_no-preference)]:[&&]:transition-normal [&&:disabled]:opacity-40 [&&:disabled]:cursor-not-allowed lg:[&&]:flex lg:[&&]:items-center lg:[&&]:gap-2 lg:[&&]:min-h-11 lg:[&&]:pt-2.5 lg:[&&]:pr-4 lg:[&&]:pb-2.5 lg:[&&]:pl-4 lg:[&&]:border lg:[&&]:border-solid lg:[&&]:border-[var(--booking-accent)] lg:[&&]:rounded-[4px] lg:[&&]:text-[length:16px] lg:[&&]:no-underline lg:[&&]:decoration-solid lg:[&&]:decoration-current lg:[&&]:decoration-auto lg:[&&_>_svg]:block lg:[&&_>_svg]:w-4 lg:[&&_>_svg]:h-4"
        }
        aria-label="Edit date & guests"
        disabled={busy || checking}
        onClick={payment ? () => setAsking(true) : onEdit}
      >
        <Pencil aria-hidden="true" />
        <span className={"booking-desktopOnly hidden lg:inline"}>
          Edit date &amp; guests
        </span>
        <span className={"booking-mobileOnly inline lg:hidden"}>Edit</span>
      </Button>
      {asking && payment && (
        <ChangeDialog
          summary={payment.summary}
          checking={checking}
          onKeep={() => setAsking(false)}
          onChoose={chooseAnotherTime}
        />
      )}
    </>
  );
}
