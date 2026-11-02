"use client";

import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "@/components/app/compounds/private-dining.module.css";
import { PrivateDiningDate } from "@/components/app/molecules/private-dining-date";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { PRIVATE_DINING_FORM } from "@/lib/constants/private-dining";
import type { IPrivateDiningEnquiryProps } from "@/lib/types";

const PREVIEW_DURATION_MS = 1200;

export function PrivateDiningEnquiryFields({
  content,
}: IPrivateDiningEnquiryProps) {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "complete">("idle");
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReady(true);
    return () => {
      if (previewTimer.current !== null) clearTimeout(previewTimer.current);
    };
  }, []);

  return (
    <form
      className={styles.enquiryFields}
      aria-label={content.formEyebrow ?? content.eyebrow}
      noValidate
      onChange={() => {
        if (previewTimer.current !== null) clearTimeout(previewTimer.current);
        previewTimer.current = null;
        setStatus("idle");
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (
          status !== "idle" ||
          previewTimer.current !== null ||
          !event.currentTarget.reportValidity()
        )
          return;
        setStatus("loading");
        // Issue #59 previews feedback until enquiry delivery is connected.
        previewTimer.current = setTimeout(() => {
          previewTimer.current = null;
          setStatus("complete");
        }, PREVIEW_DURATION_MS);
      }}
    >
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
        <div className={styles.selectField}>
          <select
            name="guests"
            className={styles.enquirySelect}
            required
            aria-label={PRIVATE_DINING_FORM.guests}
            defaultValue=""
          >
            <option value="" disabled hidden>
              {PRIVATE_DINING_FORM.guests}
            </option>
            {PRIVATE_DINING_FORM.guestCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className={styles.selectIcon} />
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
      {content.consent && (
        <label className={styles.consent}>
          <input type="checkbox" name="consent" required />
          <span>
            {PRIVATE_DINING_FORM.consent.beforePolicy}
            <Link
              href={ROUTES.PRIVACY_COOKIES}
              className={styles.consentPolicy}
            >
              {PRIVATE_DINING_FORM.consent.policy}
            </Link>
            {PRIVATE_DINING_FORM.consent.afterPolicy}
          </span>
        </label>
      )}
      <Button
        type="submit"
        variant="brand-primary"
        disabled={!ready || status !== "idle"}
        aria-busy={status === "loading"}
        aria-describedby="enquiry-preview"
        className={styles.sendButton}
      >
        {status === "loading" ? (
          <>
            {PRIVATE_DINING_FORM.loading}
            <LoaderCircle
              aria-hidden="true"
              className="size-4 motion-safe:animate-spin"
            />
          </>
        ) : status === "complete" ? (
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
      <p id="enquiry-preview" className={styles.enquiryNotice}>
        {PRIVATE_DINING_FORM.preview}
      </p>
      <p
        role="status"
        aria-atomic="true"
        className={status === "idle" ? "sr-only" : styles.enquiryStatus}
      >
        {status === "loading"
          ? PRIVATE_DINING_FORM.loading
          : status === "complete"
            ? PRIVATE_DINING_FORM.completedPreview
            : ""}
      </p>
    </form>
  );
}
