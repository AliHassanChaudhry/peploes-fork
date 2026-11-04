"use client";

import { ArrowRight, Check, ChevronDown, Triangle } from "lucide-react";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { submitPrivateDiningEnquiry } from "@/actions/private-dining-enquiry";
import styles from "@/components/app/compounds/private-dining.module.css";
import { PrivateDiningDate } from "@/components/app/molecules/private-dining-date";
import { Button } from "@/components/ui/button";
import { PRIVATE_DINING_FORM } from "@/lib/constants/private-dining";
import { env } from "@/lib/env";
import type {
  IEnquiryActionState,
  IPrivateDiningEnquiryProps,
} from "@/lib/types";

export function PrivateDiningEnquiryFields({
  content,
}: IPrivateDiningEnquiryProps) {
  const [notificationId, setNotificationId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);
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
      state.status === "unknown" ||
      !event.currentTarget.reportValidity()
    )
      return;
    submittingRef.current = true;
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const result = await submitPrivateDiningEnquiry(data);
        setState(result);
        if (result.status === "success") {
          formRef.current?.reset();
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
    if (state.status === "error" || state.status === "success") {
      setNotificationId(crypto.randomUUID());
      setState({ status: "idle", message: "" });
    }
  }

  function adjustGuests(step: number): void {
    guestsRef.current?.stepUp(step);
    revise();
  }

  return (
    <form
      ref={formRef}
      className={styles.enquiryFields}
      aria-label={content.formEyebrow ?? content.eyebrow}
      noValidate
      onSubmit={submit}
      onChange={revise}
    >
      <input
        type="hidden"
        name="notificationId"
        value={notificationId}
        className={styles.enquiryHidden}
      />
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className={styles.enquiryHoneypot}
      />
      {content.occasions && (
        <div className={styles.selectField}>
          <select
            name="occasion"
            className={styles.enquirySelect}
            aria-label={content.occasionLabel}
            defaultValue=""
            required
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
          <ChevronDown aria-hidden="true" className={styles.selectIcon} />
        </div>
      )}
      <div className={styles.fieldRow}>
        <PrivateDiningDate />
        <div className={styles.guestField}>
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
          />
          <div className={styles.guestSteps}>
            <Button
              type="button"
              variant="ghost"
              className={styles.guestStep}
              aria-label={PRIVATE_DINING_FORM.increaseGuests}
              onClick={() => adjustGuests(1)}
            >
              <Triangle aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className={styles.guestStep}
              aria-label={PRIVATE_DINING_FORM.decreaseGuests}
              onClick={() => adjustGuests(-1)}
            >
              <Triangle aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      <div className={content.company ? styles.fieldRow : undefined}>
        <input
          name="name"
          autoComplete="name"
          required
          aria-label={PRIVATE_DINING_FORM.name}
          placeholder={PRIVATE_DINING_FORM.name}
        />
        {content.company && (
          <input
            name="company"
            autoComplete="organization"
            aria-label={PRIVATE_DINING_FORM.company}
            placeholder={PRIVATE_DINING_FORM.company}
          />
        )}
      </div>
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        aria-label={PRIVATE_DINING_FORM.email}
        placeholder={PRIVATE_DINING_FORM.email}
      />
      <textarea
        name="message"
        required
        aria-label={content.messageLabel}
        placeholder={content.messageLabel}
        rows={3}
      />
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
        aria-describedby="enquiry-feedback"
        className={styles.sendButton}
      >
        {pending ? (
          <>
            {PRIVATE_DINING_FORM.loading}
            <ArrowRight aria-hidden="true" className="size-4" />
          </>
        ) : state.status === "success" ? (
          <>
            {PRIVATE_DINING_FORM.complete}
            <Check aria-hidden="true" className={styles.enquiryCheck} />
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
          state.status === "idle" && !pending ? "sr-only" : styles.enquiryStatus
        }
      >
        {pending ? PRIVATE_DINING_FORM.loading : state.message}
      </p>
    </form>
  );
}
