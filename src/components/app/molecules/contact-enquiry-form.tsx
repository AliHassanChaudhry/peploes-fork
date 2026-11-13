"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import Link from "next/link";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { submitContactEnquiry } from "@/actions/contact-enquiry";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { VISIT_CONTACT_CONTENT } from "@/lib/constants/visit-contact";
import type { IEnquiryActionState } from "@/lib/types";

const content = VISIT_CONTACT_CONTENT.form;

export function ContactEnquiryForm() {
  const [notificationId, setNotificationId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const [state, setState] = useState<IEnquiryActionState>({
    status: "idle",
    message: "",
  });
  const [pending, startTransition] = useTransition();

  useEffect(() => setNotificationId(crypto.randomUUID()), []);

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
        const result = await submitContactEnquiry(data);
        setState(result);
        if (result.status === "success") {
          formRef.current?.reset();
          setNotificationId(crypto.randomUUID());
        }
      } catch {
        setState({ status: "unknown", message: content.feedback.unknown });
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

  return (
    <section
      className={"py-12 sm:py-18"}
      aria-labelledby="contact-message-heading"
    >
      <div
        className={`site-container ${"grid gap-10 [&_.visit-heading]:my-5 lg:grid-cols-2 lg:gap-16"}`}
      >
        <div data-scroll-reveal>
          <p
            className={
              "visit-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [&&::before]:shrink-0 [.visit-closing_&&]:text-inherit [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:21px] max-sm:text-[length:12px] max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:16px] leading-4 [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7.5 max-sm:leading-4.5 max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7"
            }
          >
            {content.eyebrow}
          </p>
          <h2
            id="contact-message-heading"
            className={
              "visit-heading text-[length:48px] whitespace-pre-line [.visit-messageGrid_&&]:mt-2 [.visit-messageGrid_&&]:mb-5 [.visit-locationCopy_&&]:mt-2 [.visit-locationCopy_&&]:mb-6 [.visit-closingCopy_&&]:mt-2 [.visit-closingCopy_&&]:mb-7 max-sm:[.visit-locationCopy_&&]:mt-2 max-sm:[.visit-locationCopy_&&]:mb-4 max-sm:[.visit-closingCopy_&&]:mt-2 max-sm:[.visit-closingCopy_&&]:mb-4 lg:text-[length:60px] max-sm:text-[length:30px] leading-13 max-sm:leading-11 lg:leading-16"
            }
          >
            {content.heading}
          </h2>
          <p
            className={
              "visit-description text-text-secondary text-[length:18px] [.visit-heroCopy_&&]:mt-6 max-sm:text-[length:16px] max-sm:[.visit-heroCopy_&&]:mt-4 leading-6.5 max-sm:leading-6"
            }
          >
            {content.description}
          </p>
        </div>
        <form
          data-scroll-reveal
          ref={formRef}
          className={
            "grid gap-4 [&_:is(input:not([type=checkbox]),textarea)]:w-full [&_:is(input:not([type=checkbox]),textarea)]:min-w-0 [&_:is(input:not([type=checkbox]),textarea)]:min-h-12 [&_:is(input:not([type=checkbox]),textarea)]:px-4 [&_:is(input:not([type=checkbox]),textarea)]:py-3 [&_:is(input:not([type=checkbox]),textarea)]:border [&_:is(input:not([type=checkbox]),textarea)]:border-solid [&_:is(input:not([type=checkbox]),textarea)]:border-soft-stone [&_:is(input:not([type=checkbox]),textarea)]:rounded-[4px] [&_:is(input:not([type=checkbox]),textarea)]:bg-warm-cream [&_:is(input:not([type=checkbox]),textarea)]:text-ink [&_:is(input:not([type=checkbox]),textarea)]:[font:inherit] [&_textarea]:min-h-36 [&_textarea]:resize-y [&_:is(input,textarea):focus-visible]:outline-2 [&_:is(input,textarea):focus-visible]:outline-solid [&_:is(input,textarea):focus-visible]:outline-peploe-burgundy [&_:is(input,textarea):focus-visible]:outline-offset-2"
          }
          aria-label="General contact message"
          noValidate
          onSubmit={submit}
          onChange={revise}
        >
          <fieldset
            className={
              "grid gap-4 min-w-0 m-0 p-0 border-0 border-none [&>label:not(.visit-message-consent)]:grid [&>label:not(.visit-message-consent)]:gap-2 [&>label:not(.visit-message-consent)]:text-base"
            }
            disabled={pending}
          >
            <input type="hidden" name="notificationId" value={notificationId} />
            <input
              name="website"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className={"absolute left-[-10000px] w-px h-px opacity-0"}
            />
            <label>
              {content.name}
              <input name="name" autoComplete="name" maxLength={120} required />
            </label>
            <label>
              {content.email}
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label>
              {content.message}
              <textarea name="message" maxLength={5000} rows={5} required />
            </label>
            <label
              className={
                "visit-message-consent flex items-start gap-2.5 text-sm [&_input]:mt-1 [&_input]:accent-peploe-burgundy [&_a]:text-peploe-burgundy [&_a]:underline leading-[22px]"
              }
            >
              <input name="consent" type="checkbox" required />
              <span>
                I agree to the{" "}
                <Link href={ROUTES.PRIVACY_COOKIES}>privacy policy</Link> for
                enquiries.
              </span>
            </label>
          </fieldset>
          <Button
            type="submit"
            variant="brand-primary"
            className={
              "justify-self-start min-h-12 min-w-45 gap-2 max-sm:w-full"
            }
            disabled={
              pending ||
              !notificationId ||
              state.status === "success" ||
              state.status === "unknown"
            }
            aria-busy={pending}
            aria-describedby="contact-message-feedback"
          >
            {pending
              ? content.sending
              : state.status === "success"
                ? content.sent
                : content.submit}
            {pending ? (
              <LoaderCircle
                aria-hidden="true"
                className="size-4 motion-safe:animate-spin"
              />
            ) : state.status === "success" ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <ArrowRight aria-hidden="true" className="size-4" />
            )}
          </Button>
          <p
            id="contact-message-feedback"
            role="status"
            aria-atomic="true"
            className={
              state.status === "idle" && !pending
                ? "sr-only"
                : "text-text-secondary text-sm leading-[21px]"
            }
          >
            {pending ? content.sending : state.message}
          </p>
        </form>
      </div>
    </section>
  );
}
