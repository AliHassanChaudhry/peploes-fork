import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FOCUS_RING, RESTAURANT_CONTACT, ROUTES } from "@/lib/constants";
import { FOOTER_CONTENT, FOOTER_STYLES } from "@/lib/constants/footer";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className={cn(dmSans.className, "bg-warm-cream text-ink")}>
      <div className="site-container-inset pt-14 pb-10 xl:pt-20">
        <div className="grid gap-6 xl:grid-cols-[240fr_160fr_280fr_375fr] xl:gap-[75px] min-[1440px]:grid-cols-[240px_160px_280px_minmax(0,1fr)]">
          <div className="flex flex-col gap-5 border-b border-soft-stone pb-6 xl:gap-7 xl:border-0 xl:pb-0">
            <Link
              href={ROUTES.HOME}
              aria-label={FOOTER_CONTENT.homeLabel}
              className={cn(
                FOCUS_RING,
                "block h-[72px] w-[134px] rounded-sm focus-visible:ring-peploe-burgundy focus-visible:ring-offset-warm-cream",
              )}
            >
              <span
                aria-hidden="true"
                className="block h-full w-full bg-ink mask-[url('/peploes-logo.webp')] mask-contain mask-center mask-no-repeat"
              />
            </Link>
            <div className="space-y-2">
              <address className="text-sm leading-[21px] not-italic">
                {FOOTER_CONTENT.address}
              </address>
              <p className="text-xs leading-[18px] tracking-[0.08em] text-text-secondary uppercase">
                {FOOTER_CONTENT.tagline}
              </p>
            </div>
          </div>

          <section
            aria-labelledby="footer-contact-heading"
            className="border-b border-soft-stone pb-6 xl:relative xl:order-3 xl:border-0 xl:pb-0 xl:before:absolute xl:before:top-0 xl:before:-left-[37.5px] xl:before:h-[276px] xl:before:w-px xl:before:bg-soft-stone"
          >
            <h2
              id="footer-contact-heading"
              className={cn(ebGaramond.className, FOOTER_STYLES.heading)}
            >
              {FOOTER_CONTENT.contactHeading}
            </h2>
            <div className="mt-4 flex flex-col gap-4 xl:mt-6">
              <a
                href={`tel:${RESTAURANT_CONTACT.phone}`}
                className={cn(FOCUS_RING, FOOTER_STYLES.contactLink)}
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {RESTAURANT_CONTACT.phoneLabel}
              </a>
              <a
                href={`mailto:${RESTAURANT_CONTACT.email}`}
                className={cn(FOCUS_RING, FOOTER_STYLES.contactLink)}
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {RESTAURANT_CONTACT.email}
              </a>
            </div>
            <div className="mt-4 xl:relative xl:mt-6 xl:pt-[25px] xl:before:absolute xl:before:inset-x-0 xl:before:top-0 xl:before:h-px xl:before:bg-soft-stone">
              <h3 className="flex items-center gap-2 text-sm leading-[21px] font-medium">
                <Clock3 aria-hidden="true" className="size-4 shrink-0" />
                {FOOTER_CONTENT.openingHoursHeading}
              </h3>
              <dl className="mt-3 space-y-2 text-sm leading-[21px] text-text-secondary">
                {FOOTER_CONTENT.openingHours.map(({ days, hours }) => (
                  <div key={days} className="flex justify-between gap-3">
                    <dt>{days}</dt>
                    <dd className="shrink-0">{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <nav
            aria-labelledby="footer-explore-heading"
            className="xl:relative xl:order-2 xl:before:absolute xl:before:top-0 xl:before:-left-[37.5px] xl:before:h-[276px] xl:before:w-px xl:before:bg-soft-stone"
          >
            <h2
              id="footer-explore-heading"
              className={cn(ebGaramond.className, FOOTER_STYLES.heading)}
            >
              {FOOTER_CONTENT.exploreHeading}
            </h2>
            <ul className="mt-4 xl:mt-6 xl:space-y-[10px]">
              {FOOTER_CONTENT.exploreLabels.map((label) => (
                <li
                  key={label}
                  className="border-b border-soft-stone xl:border-0"
                >
                  <Button
                    type="button"
                    variant="brand-nav"
                    aria-disabled="true"
                    className="flex h-12 w-full justify-between rounded-none p-0 text-sm leading-[21px] font-normal text-ink has-[>svg]:px-0 xl:h-auto xl:justify-start"
                  >
                    {label}
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 text-peploe-burgundy xl:hidden"
                    />
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <section
            aria-labelledby="footer-newsletter-heading"
            className="xl:relative xl:order-4 xl:before:absolute xl:before:top-0 xl:before:-left-[37.5px] xl:before:h-[276px] xl:before:w-px xl:before:bg-soft-stone"
          >
            <h2
              id="footer-newsletter-heading"
              className={cn(
                ebGaramond.className,
                FOOTER_STYLES.heading,
                "text-[28px] leading-[34px] font-normal xl:text-[32px] xl:leading-[38px]",
              )}
            >
              {FOOTER_CONTENT.newsletter.heading}
            </h2>
            <p className="mt-4 text-sm leading-[21px] text-text-secondary xl:mt-6">
              {FOOTER_CONTENT.newsletter.description}
            </p>
            <div className="mt-4 flex flex-col gap-4 xl:mt-6 xl:flex-row xl:items-end xl:gap-3">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {FOOTER_CONTENT.newsletter.emailLabel}
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                autoComplete="email"
                placeholder={FOOTER_CONTENT.newsletter.emailLabel}
                aria-describedby="footer-newsletter-status"
                className="h-8 min-w-0 flex-1 rounded-none border-b border-border-interactive bg-transparent text-sm leading-[21px] text-ink placeholder:text-text-secondary disabled:opacity-100 xl:h-11"
              />
              <Button
                type="button"
                variant="brand-primary"
                aria-disabled="true"
                aria-describedby="footer-newsletter-status"
                className="h-11 gap-2 rounded-[4px] bg-peploe-burgundy px-5 text-base leading-[22px] font-medium text-warm-cream shadow-none has-[>svg]:px-5"
              >
                {FOOTER_CONTENT.newsletter.submitLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
            <p id="footer-newsletter-status" className="sr-only">
              {FOOTER_CONTENT.newsletter.status}
            </p>
          </section>
        </div>

        <div className="relative mt-6 flex flex-col gap-4 pt-[25px] text-xs leading-5 text-text-secondary before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-soft-stone xl:mt-16 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-4">
            <p>{FOOTER_CONTENT.copyright}</p>
            <span aria-hidden="true" className="hidden xl:inline">
              |
            </span>
            <nav aria-label={FOOTER_CONTENT.legalNavigationLabel}>
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 xl:gap-x-4">
                {FOOTER_CONTENT.legalItems.map(
                  ({ label, mobileLabel }, index) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 xl:gap-4"
                    >
                      {index > 0 && (
                        <span aria-hidden="true">
                          <span className="xl:hidden">·</span>
                          <span className="hidden xl:inline">|</span>
                        </span>
                      )}
                      <Button
                        type="button"
                        variant="brand-nav"
                        aria-disabled="true"
                        className="h-auto rounded-none p-0 text-xs leading-5 font-normal text-text-secondary"
                      >
                        {mobileLabel !== null ? (
                          <>
                            <span className="xl:hidden">{mobileLabel}</span>
                            <span className="hidden xl:inline">{label}</span>
                          </>
                        ) : (
                          label
                        )}
                      </Button>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="brand-nav"
              aria-disabled="true"
              aria-label={FOOTER_CONTENT.instagramLabel}
              className="size-5 p-0 text-text-secondary has-[>svg]:px-0"
            >
              <Instagram aria-hidden="true" className="size-5" />
            </Button>
            <Button
              type="button"
              variant="brand-nav"
              aria-disabled="true"
              aria-label={FOOTER_CONTENT.facebookLabel}
              className="size-5 p-0 text-text-secondary has-[>svg]:px-0"
            >
              <Facebook aria-hidden="true" className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
