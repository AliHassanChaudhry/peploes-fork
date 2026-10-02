"use client";

import { Clock3, Mail, MapPin, Menu, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { CloseButton } from "@/components/app/atoms/close-button";
import { NavbarBookingButton } from "@/components/app/atoms/navbar-booking-button";
import { NavbarBrand } from "@/components/app/atoms/navbar-brand";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FOCUS_RING } from "@/lib/constants";
import { MOBILE_NAVIGATION_CONTENT } from "@/lib/constants/mobile-navigation";

import type {
  IMobileNavigationItem,
  IMobileNavigationProps,
} from "@/lib/types";
import { cn } from "@/lib/utils";

import styles from "./mobile-navigation.module.css";

export function MobileNavigation({
  brandPhraseClassName,
}: IMobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 80rem)");

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isDesktop) dialogRef.current?.close();
  }, [isDesktop]);

  function openMenu() {
    dialogRef.current?.showModal();
    closeButtonRef.current?.querySelector("button")?.focus();
    setIsOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <div className="xl:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={MOBILE_NAVIGATION_CONTENT.openLabel}
        aria-controls={dialogId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={openMenu}
        className={cn(
          FOCUS_RING,
          "size-11 rounded-sm text-ink transition-colors duration-(--duration-fast) hover:bg-soft-stone/40 hover:text-ink focus-visible:ring-peploe-burgundy motion-reduce:transition-none",
        )}
      >
        <Menu aria-hidden="true" className="size-6" />
      </Button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={titleId}
        onClose={() => {
          setIsOpen(false);
          setExpandedSection(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
          }
        }}
        className={cn(
          styles.dialog,
          "fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-y-auto overscroll-contain border-0 bg-warm-cream p-0 text-ink backdrop:bg-ink/40",
        )}
      >
        <div className="min-h-full">
          <h2 id={titleId} className="sr-only">
            {MOBILE_NAVIGATION_CONTENT.title}
          </h2>
          <div className="flex h-[72px] items-center justify-between gap-2 px-6 shadow-[inset_0_-1px_0_var(--soft-stone)]">
            <NavbarBrand onClick={closeMenu} />
            <div className="flex shrink-0 items-center gap-3">
              <NavbarBookingButton />
              <div ref={closeButtonRef}>
                <CloseButton
                  onClick={closeMenu}
                  ariaLabel={MOBILE_NAVIGATION_CONTENT.closeLabel}
                  className={cn(
                    FOCUS_RING,
                    "static size-11 rounded-sm border-transparent text-ink transition-colors duration-(--duration-fast) hover:border-transparent hover:bg-soft-stone/40 hover:text-ink focus-visible:ring-peploe-burgundy motion-reduce:transition-none [&>svg]:size-6",
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-6 pt-6 pb-7">
            <nav aria-label={MOBILE_NAVIGATION_CONTENT.navigationLabel}>
              <ul className="flex flex-col gap-1">
                {MOBILE_NAVIGATION_CONTENT.items.map(
                  (item: IMobileNavigationItem) => (
                    <li
                      key={item.id}
                      className="not-last:after:mt-1 not-last:after:block not-last:after:h-px not-last:after:bg-soft-stone"
                    >
                      <Button
                        type="button"
                        variant="brand-nav"
                        aria-disabled={item.children ? undefined : true}
                        aria-expanded={
                          item.children
                            ? expandedSection === item.id
                            : undefined
                        }
                        aria-controls={
                          item.children ? `${dialogId}-${item.id}` : undefined
                        }
                        onClick={
                          item.children
                            ? () =>
                                setExpandedSection(
                                  expandedSection === item.id ? null : item.id,
                                )
                            : undefined
                        }
                        className={cn(
                          FOCUS_RING,
                          "h-auto min-h-12 w-full justify-between gap-4 rounded-none px-2 py-2.5 text-left text-base leading-6 font-medium whitespace-normal hover:no-underline focus-visible:ring-peploe-burgundy",
                          expandedSection === item.id &&
                            "text-peploe-burgundy shadow-[inset_0_-1px_0_var(--peploe-burgundy)]",
                        )}
                      >
                        <span>{item.label}</span>
                        {item.children && (
                          <span
                            aria-hidden="true"
                            className="size-6 shrink-0 text-center text-xl leading-6 font-normal"
                          >
                            {expandedSection === item.id ? "−" : "+"}
                          </span>
                        )}
                      </Button>
                      {item.children && (
                        <div
                          id={`${dialogId}-${item.id}`}
                          aria-hidden={expandedSection !== item.id}
                          inert={expandedSection !== item.id}
                          className={cn(
                            "grid transition-[grid-template-rows,visibility] duration-200 motion-reduce:transition-none",
                            expandedSection === item.id
                              ? "visible mt-1 grid-rows-[1fr]"
                              : "invisible grid-rows-[0fr]",
                          )}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <ul className="flex flex-col gap-1 pt-1 pb-2 pl-6">
                              {item.children.map((label) => (
                                <li key={label}>
                                  <Button
                                    type="button"
                                    variant="brand-nav"
                                    aria-disabled="true"
                                    className={cn(
                                      FOCUS_RING,
                                      "h-auto min-h-11 w-full justify-start rounded-none p-0 text-left text-sm leading-[21px] font-normal whitespace-normal focus-visible:ring-peploe-burgundy",
                                    )}
                                  >
                                    {label}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <Button
              type="button"
              variant="brand-contact"
              aria-disabled="true"
              className="h-12 w-full rounded-[4px] border-peploe-burgundy px-6 py-[13px] text-base leading-[22px] font-medium"
            >
              {MOBILE_NAVIGATION_CONTENT.giftVouchersLabel}
            </Button>
            <div className="flex flex-col gap-2 text-sm leading-[21px]">
              <div className="flex min-h-12 items-start gap-3.5">
                <Clock3 aria-hidden="true" className="size-5 shrink-0" />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-text-secondary">
                    {MOBILE_NAVIGATION_CONTENT.openingHoursHeading}
                  </p>
                  <dl className="space-y-0.5">
                    {MOBILE_NAVIGATION_CONTENT.openingHours.map((row) => (
                      <div key={row.days} className="grid grid-cols-2 gap-1">
                        <dt className="leading-5 font-medium">{row.days}</dt>
                        <dd className="text-text-secondary">{row.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="flex min-h-12 items-center gap-3.5">
                <MapPin aria-hidden="true" className="size-5 shrink-0" />
                <p>{MOBILE_NAVIGATION_CONTENT.address}</p>
              </div>
              <a
                href={MOBILE_NAVIGATION_CONTENT.phoneAction.href}
                className={cn(
                  FOCUS_RING,
                  "flex min-h-12 items-center gap-3.5 rounded-sm underline-offset-4 hover:underline focus-visible:ring-peploe-burgundy",
                )}
              >
                <Phone aria-hidden="true" className="size-5 shrink-0" />
                <span>{MOBILE_NAVIGATION_CONTENT.phoneAction.label}</span>
              </a>
              <a
                href={MOBILE_NAVIGATION_CONTENT.emailAction.href}
                className={cn(
                  FOCUS_RING,
                  "flex min-h-12 items-center gap-3.5 rounded-sm underline-offset-4 hover:underline focus-visible:ring-peploe-burgundy",
                )}
              >
                <Mail aria-hidden="true" className="size-5 shrink-0" />
                <span className="break-all">
                  {MOBILE_NAVIGATION_CONTENT.emailAction.label}
                </span>
              </a>
            </div>
            <p
              className={cn(
                brandPhraseClassName,
                "text-center text-lg leading-[26px] text-peploe-burgundy",
              )}
            >
              {MOBILE_NAVIGATION_CONTENT.brandPhrase}
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
