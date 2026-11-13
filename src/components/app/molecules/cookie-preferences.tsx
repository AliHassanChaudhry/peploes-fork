"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CloseButton } from "@/components/app/atoms/close-button";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import {
  COOKIE_PREFERENCES,
  COOKIE_PREFERENCES_CONTENT as content,
} from "@/lib/constants/cookie-consent";
import {
  getCookiePreferences,
  saveCookiePreferences,
} from "@/lib/cookie-consent";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { ICookiePreferences } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CookiePreferences() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [preferences, setPreferences] = useState<ICookiePreferences>(
    COOKIE_PREFERENCES.defaults,
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isClosing || !dialog) return;
    let cancelled = false;
    const animations = dialog
      .getAnimations({ subtree: true })
      .filter(
        (animation) =>
          animation.effect instanceof KeyframeEffect &&
          animation.effect.target === dialog,
      );
    void Promise.allSettled(
      animations.map((animation) => animation.finished),
    ).then(() => {
      if (!cancelled) dialog.close();
    });
    return () => {
      cancelled = true;
    };
  }, [isClosing]);

  function closePreferences() {
    setIsClosing(true);
  }

  function persist(next: ICookiePreferences, close = false) {
    if (!saveCookiePreferences(next)) {
      setPreferences(getCookiePreferences());
      setError(true);
      return;
    }
    setPreferences(next);
    setError(false);
    if (close) closePreferences();
  }

  return (
    <>
      <Button
        type="button"
        variant="brand-nav"
        aria-haspopup="dialog"
        aria-controls={isOpen ? id : undefined}
        className="min-h-11 min-w-11 h-auto justify-center rounded-none p-0 text-[11px] leading-[21px] font-normal text-text-secondary min-[360px]:text-xs xl:min-h-0 xl:min-w-0 xl:leading-5"
        onClick={() => {
          setPreferences(getCookiePreferences());
          setError(false);
          setIsOpen(true);
        }}
      >
        {content.trigger}
      </Button>
      {isOpen &&
        createPortal(
          <dialog
            ref={dialogRef}
            id={id}
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            data-closing={isClosing || undefined}
            onClose={() => {
              setIsOpen(false);
              setIsClosing(false);
            }}
            onCancel={(event) => {
              event.preventDefault();
              closePreferences();
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                closePreferences();
              }
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
                closePreferences();
              }
            }}
            className={cn(
              dmSans.className,
              "cookies-dialog fixed top-0 right-0 bottom-0 left-0 mt-auto mr-auto mb-auto ml-auto w-[min(720px,_calc(100%_-_32px))] max-h-[calc(100dvh_-_32px)] overflow-y-auto overscroll-contain border-0 border-none border-current pt-10 pr-10 pb-10 pl-10 bg-warm-cream bg-none text-ink shadow-[0_16px_48px_rgb(0_0_0_/_20%)] [&&::backdrop]:bg-[rgb(0_0_0_/_40%)] [&&::backdrop]:bg-none [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:opacity-100 [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:translate-y-[0] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:transition-[opacity,transform] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:duration-[var(--duration-base),var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:ease-[var(--ease-organic),var(--ease-organic)] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:[transition-delay:0s,0s] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:opacity-100 [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:transition-[opacity] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:duration-[var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:ease-[var(--ease-organic)] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:[transition-delay:0s] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open]::backdrop]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[&&[open][data-closing]]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:[&&[open][data-closing]]:translate-y-[16px] [@media_(prefers-reduced-motion:_no-preference)]:[&&[open][data-closing]::backdrop]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:starting:[&&[open]]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:starting:[&&[open]]:translate-y-[16px] [@media_(prefers-reduced-motion:_no-preference)]:starting:[&&[open]::backdrop]:opacity-0 [@media_(max-width:_600px)]:w-[min(390px,_calc(100%_-_24px))] [@media_(max-width:_600px)]:max-w-full [@media_(max-width:_600px)]:max-h-[calc(100dvh_-_32px)] [@media_(max-width:_600px)]:rounded-[12px] [@media_(max-width:_600px)]:pt-5 [@media_(max-width:_600px)]:pr-5 [@media_(max-width:_600px)]:pb-5 [@media_(max-width:_600px)]:pl-5",
            )}
          >
            <CloseButton
              ariaLabel={content.closeLabel}
              onClick={closePreferences}
              className={
                "cookies-close [.cookies-dialog_&&]:top-11 [.cookies-dialog_&&]:right-10 [.cookies-dialog_&&]:border-0 [.cookies-dialog_&&]:border-none [.cookies-dialog_&&]:border-current [.cookies-dialog_&&]:text-ink [@media_(max-width:_600px)]:[.cookies-dialog_&&]:top-3.5 [@media_(max-width:_600px)]:[.cookies-dialog_&&]:right-3 [@media_(max-width:_600px)]:[.cookies-dialog_&&]:w-11 [@media_(max-width:_600px)]:[.cookies-dialog_&&]:h-11"
              }
            />
            <h2
              id={`${id}-title`}
              className={cn(
                ebGaramond.className,
                "cookies-title pr-10 text-[length:40px] font-normal [@media_(max-width:_600px)]:text-[length:28px] leading-12 [@media_(max-width:_600px)]:leading-8",
              )}
            >
              {content.title}
            </h2>
            <p
              id={`${id}-description`}
              className={
                "cookies-description mt-2 mb-3 text-[length:16px] [@media_(max-width:_600px)]:text-[length:14px] max-sm:text-[length:16px] leading-6 [@media_(max-width:_600px)]:leading-[21px]"
              }
            >
              {content.description}
            </p>
            <div
              className={
                "cookies-category [border-block-start:1px_solid_var(--soft-stone)] pt-4 pb-4 [&&_p]:text-[length:14px] [&&_p]:text-text-secondary [&&_p]:mt-2 [@media_(max-width:_600px)]:pt-3 [@media_(max-width:_600px)]:pb-3 [@media_(max-width:_600px)]:[&&_p]:mt-1 [@media_(max-width:_600px)]:[&&_p]:text-[length:13px] max-sm:[&&_p]:text-[length:16px] [&&_p]:leading-[21px] [@media_(max-width:_600px)]:[&&_p]:leading-5"
              }
            >
              <div
                className={
                  "cookies-row flex items-center justify-between gap-4 min-h-7 [&&_h3]:text-[length:18px] [&&_h3]:font-medium [@media_(max-width:_600px)]:[&&_h3]:text-[length:16px] [&&_h3]:leading-6 [@media_(max-width:_600px)]:[&&_h3]:leading-5.5"
                }
              >
                <h3>{content.necessary.title}</h3>
                <span
                  className={
                    "cookies-status text-[length:14px] text-text-secondary shrink-0 [@media_(max-width:_600px)]:text-[length:12px] leading-[21px]"
                  }
                >
                  {content.necessary.status}
                </span>
              </div>
              <p>{content.necessary.description}</p>
            </div>
            {content.categories.map(({ key, title, description }) => (
              <div
                key={key}
                className={
                  "cookies-category [border-block-start:1px_solid_var(--soft-stone)] pt-4 pb-4 [&&_p]:text-[length:14px] [&&_p]:text-text-secondary [&&_p]:mt-2 [@media_(max-width:_600px)]:pt-3 [@media_(max-width:_600px)]:pb-3 [@media_(max-width:_600px)]:[&&_p]:mt-1 [@media_(max-width:_600px)]:[&&_p]:text-[length:13px] max-sm:[&&_p]:text-[length:16px] [&&_p]:leading-[21px] [@media_(max-width:_600px)]:[&&_p]:leading-5"
                }
              >
                <div
                  className={
                    "cookies-row flex items-center justify-between gap-4 min-h-7 [&&_h3]:text-[length:18px] [&&_h3]:font-medium [@media_(max-width:_600px)]:[&&_h3]:text-[length:16px] [&&_h3]:leading-6 [@media_(max-width:_600px)]:[&&_h3]:leading-5.5"
                  }
                >
                  <h3 id={`${id}-${key}`}>{title}</h3>
                  <input
                    type="checkbox"
                    role="switch"
                    aria-checked={preferences[key]}
                    aria-labelledby={`${id}-${key}`}
                    aria-describedby={`${id}-${key}-description`}
                    checked={preferences[key]}
                    onChange={(event) =>
                      persist({ ...preferences, [key]: event.target.checked })
                    }
                    className={
                      "cookies-toggle appearance-none shrink-0 w-12 h-7 rounded-[999px] bg-text-secondary bg-none cursor-pointer [&&::before]:content-[''] [&&::before]:block [&&::before]:w-5 [&&::before]:h-5 [&&::before]:mt-1 [&&::before]:mr-1 [&&::before]:mb-1 [&&::before]:ml-1 [&&::before]:rounded-[50%] [&&::before]:bg-warm-cream [&&::before]:bg-none [&&:checked]:bg-peploe-burgundy [&&:checked]:bg-none [&&:checked::before]:transform-[translateX(20px)] [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-peploe-burgundy [&&:focus-visible]:outline-offset-4 [@media_(prefers-reduced-motion:_no-preference)]:[&&::before]:transition-[transform] [@media_(prefers-reduced-motion:_no-preference)]:[&&::before]:duration-[var(--duration-interaction)] [@media_(prefers-reduced-motion:_no-preference)]:[&&::before]:ease-[var(--ease-organic)] [@media_(prefers-reduced-motion:_no-preference)]:[&&::before]:[transition-delay:0s] [@media_(prefers-reduced-motion:_no-preference)]:[&&::before]:transition-normal"
                    }
                  />
                </div>
                <p id={`${id}-${key}-description`}>{description}</p>
              </div>
            ))}
            <Link
              href={ROUTES.PRIVACY_COOKIES}
              onClick={closePreferences}
              className={
                "cookies-policy [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-peploe-burgundy [&&:focus-visible]:outline-offset-4 flex items-center gap-1 border-t border-solid border-t-soft-stone pt-2 text-[length:14px] text-peploe-burgundy underline decoration-solid decoration-current decoration-auto underline-offset-2 leading-[21px]"
              }
            >
              {content.policyLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            {error && <p role="alert">{content.storageError}</p>}
            <div
              className={
                "cookies-actions flex gap-3 mt-2 [&&_button]:flex-1 [&&_button]:min-h-11 [&&_button]:h-auto [&&_button]:rounded-[2px] [&&_button]:text-[length:16px] [&&_button]:whitespace-normal [&&_button:first-child]:border-peploe-burgundy [@media_(max-width:_600px)]:flex-col [&&_button]:leading-6"
              }
            >
              <Button
                type="button"
                variant="brand-contact"
                onClick={() => persist(COOKIE_PREFERENCES.defaults, true)}
              >
                {content.rejectLabel}
              </Button>
              <Button
                type="button"
                variant="brand-primary"
                onClick={() => persist(COOKIE_PREFERENCES.accepted, true)}
              >
                {content.acceptLabel}
              </Button>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
