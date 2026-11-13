import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/app/atoms/scroll-reveal";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/app/atoms/tracked-link";
import { Button } from "@/components/ui/button";
import { NAVBAR_CONTENT, RESTAURANT_CONTACT, ROUTES } from "@/lib/constants";
import { HERO_CONTENT } from "@/lib/constants/hero";
import { GA4Event } from "@/lib/enums";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(dmSans.className, "isolate text-warm-cream")}
    >
      <style>{`@keyframes homepage-entrance { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="relative flex min-h-[calc(100svh-72px)] items-end bg-ink py-8 sm:min-h-[720px] sm:items-center sm:py-20 lg:min-h-[780px] lg:py-[72px]">
        <Image
          src={HERO_CONTENT.backgroundImage.src}
          alt={HERO_CONTENT.backgroundImage.alt}
          fill
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 1080px, 990px"
          fetchPriority="high"
          loading="eager"
          className="object-cover object-[center_-64px] sm:object-center"
        />
        <div
          aria-hidden="true"
          className={cn(
            "[--photo-overlay-angle:180deg] bg-[linear-gradient(var(--photo-overlay-angle),rgb(var(--hero-overlay-light-rgb)_/_0%)_8.69%,rgb(var(--hero-overlay-soft-rgb)_/_16%)_20.59%,rgb(var(--hero-overlay-mid-rgb)_/_32%)_32.49%,rgb(var(--hero-overlay-dark-rgb)_/_48%)_44.4%,rgb(var(--hero-overlay-deep-rgb)_/_64%)_56.3%,rgb(var(--black-rgb)_/_80%)_68.2%),linear-gradient(180deg,rgb(var(--hero-shadow-rgb)_/_0%)_84.12%,rgb(var(--hero-shadow-rgb)_/_70%)_91.04%,rgb(var(--hero-shadow-rgb))_98.88%)] bg-transparent lg:[--photo-overlay-angle:-101.1deg]",
            "absolute inset-0",
          )}
        />

        <div
          data-scroll-reveal
          data-scroll-reveal-initial
          className={cn(
            "[@media_(width_>=_40rem)_and_(prefers-reduced-motion:_no-preference)]:animate-[homepage-entrance_350ms_var(--ease-organic)_both]",
            "site-container relative flex flex-col gap-[22px] sm:gap-7",
          )}
        >
          <div className="max-w-[720px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2.5 text-sm leading-4 font-medium tracking-[0.1em] uppercase sm:tracking-normal">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-12 shrink-0 bg-current"
                  />
                  {HERO_CONTENT.eyebrow}
                </p>
                <h1
                  id="hero-heading"
                  className={cn(
                    ebGaramond.className,
                    "text-[36px] leading-[40px] font-medium tracking-[-1px] sm:text-[clamp(40px,5.278vw,76px)] sm:leading-[1.079] sm:tracking-normal lg:text-[76px] lg:leading-[82px]",
                  )}
                >
                  <span className="lg:block">
                    {HERO_CONTENT.headingLines[0]}
                  </span>{" "}
                  <span className="lg:block">
                    {HERO_CONTENT.headingLines[1]}
                  </span>{" "}
                  <span className="lg:block">
                    {HERO_CONTENT.headingLines[2]}
                  </span>
                </h1>
              </div>
              <p className="hidden text-base leading-[23px] text-warm-cream/92 sm:block sm:text-lg sm:leading-7 sm:text-warm-cream/90">
                {HERO_CONTENT.description}
              </p>
            </div>
          </div>

          <div data-button-pair className="gap-2.5 sm:gap-4">
            <Button
              asChild
              variant="brand-primary"
              size="cta"
              className="w-full sm:w-[156px]"
            >
              <TrackedLink
                href={ROUTES.BOOK_A_TABLE}
                interaction={{
                  event: GA4Event.BookingClick,
                  placement: "hero",
                }}
              >
                {HERO_CONTENT.bookingLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </TrackedLink>
            </Button>
            <Button
              asChild
              variant="brand-secondary-inverse"
              size="cta"
              className="w-full sm:w-[156px]"
            >
              <TrackedAnchor
                href={`tel:${RESTAURANT_CONTACT.phone}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "hero",
                  destination: "phone",
                }}
              >
                {HERO_CONTENT.callLabel}
              </TrackedAnchor>
            </Button>
          </div>
          <Link
            href={ROUTES.MENUS}
            className="inline-flex min-h-11 items-center justify-center gap-2 text-lg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 sm:hidden"
          >
            {NAVBAR_CONTENT.menusLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>

      <figure className="bg-warm-cream sm:hidden">
        <div
          className={
            "relative bg-[rgb(var(--hero-shadow-rgb))] h-[520px] [&::after]:absolute [&::after]:right-[0] [&::after]:bottom-[0] [&::after]:left-0 [&::after]:pointer-events-none [&::after]:content-[''] [&::after]:h-[clamp(100px,14.653vw,211px)] [&::after]:bg-[linear-gradient(0deg,var(--warm-cream)_0%,rgb(var(--overlay-cream-rgb)_/_95%)_30.29%,rgb(var(--overlay-cream-rgb)_/_75.3%)_56.73%,rgb(var(--overlay-cream-rgb)_/_0%)_86.06%)] [&::after]:bg-transparent"
          }
        >
          <Image
            src={HERO_CONTENT.entranceBackground.src}
            alt={HERO_CONTENT.entranceBackground.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className={cn(
              "bg-[linear-gradient(rgb(var(--hero-shadow-rgb)),rgb(var(--hero-shadow-rgb)_/_50%))] bg-transparent",
              "absolute inset-0",
            )}
          />
          <Image
            src={HERO_CONTENT.entranceImage.src}
            alt={HERO_CONTENT.entranceImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption
          data-scroll-reveal
          className={cn(
            ebGaramond.className,
            "px-6 py-[22px] text-center text-[28px] leading-[30px] font-medium text-peploe-burgundy",
          )}
        >
          {HERO_CONTENT.entranceCaption}
        </figcaption>
      </figure>
      <div
        className={cn(
          "relative bg-[rgb(var(--hero-shadow-rgb))] aspect-[1440/1307]",
          "hidden sm:block",
        )}
      >
        <Image
          src={HERO_CONTENT.entranceBackground.src}
          alt={HERO_CONTENT.entranceBackground.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className={cn(
            "bg-[linear-gradient(rgb(var(--hero-shadow-rgb)),rgb(var(--hero-shadow-rgb)_/_50%))] bg-transparent",
            "absolute inset-0",
          )}
        />
        <Reveal
          className={"absolute right-[0] bottom-[0] left-0 aspect-[1440/1407]"}
          threshold={0.05}
        >
          <figure className="relative h-full">
            <Image
              src={HERO_CONTENT.entranceImage.src}
              alt={HERO_CONTENT.entranceImage.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <figcaption
              className={cn(
                ebGaramond.className,
                "h-[clamp(100px,14.653vw,211px)] bg-[linear-gradient(0deg,var(--warm-cream)_0%,rgb(var(--overlay-cream-rgb)_/_95%)_30.29%,rgb(var(--overlay-cream-rgb)_/_75.3%)_56.73%,rgb(var(--overlay-cream-rgb)_/_0%)_86.06%)] bg-transparent pb-[clamp(16px,2.639vw,38px)]",
                "absolute inset-x-0 bottom-0 flex items-end justify-center px-6 text-center text-[clamp(24px,4.167vw,60px)] leading-[1.1] font-medium tracking-[-0.017em] text-peploe-burgundy",
              )}
            >
              {HERO_CONTENT.entranceCaption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
