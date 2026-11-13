import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FOCUS_RING, MOBILE_HOME_CONTENT, ROUTES } from "@/lib/constants";
import { GROUPS_OCCASIONS_CONTENT } from "@/lib/constants/groups-occasions";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function GroupsOccasions() {
  return (
    <section
      id="groups-occasions"
      aria-labelledby="groups-occasions-heading"
      className={cn(dmSans.className, "scroll-mt-20 bg-warm-cream text-ink")}
    >
      <div className="relative isolate flex min-h-[560px] items-end bg-ink text-warm-cream sm:block sm:min-h-0 lg:flex lg:min-h-[410px] lg:items-center">
        <Image
          src={GROUPS_OCCASIONS_CONTENT.image.src}
          alt={GROUPS_OCCASIONS_CONTENT.image.alt}
          fill
          sizes="(min-width: 1024px) 100vw, 720px"
          className="object-cover lg:object-[center_60%]"
        />
        <div
          aria-hidden="true"
          className={cn(
            "groups-overlay bg-[image:linear-gradient(_180deg,_rgb(var(--overlay-warm-ink-rgb)_/_0%)_15%,_rgb(var(--overlay-warm-ink-rgb)_/_70%)_45%,_rgb(var(--overlay-warm-ink-rgb)_/_95%)_100%_)] bg-transparent [@media_(40rem_<=_width_<_64rem)]:bg-[rgb(var(--overlay-dark-ink-rgb)_/_80%)] [@media_(40rem_<=_width_<_64rem)]:bg-none lg:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-dark-ink-rgb)_/_92.55%)_0%,_rgb(var(--overlay-dark-ink-rgb)_/_56.47%)_50%,_rgb(var(--overlay-dark-ink-rgb)_/_0%)_100%_)] lg:bg-transparent",
            "absolute inset-0",
          )}
        />

        <div className="site-container relative pt-[185px] pb-10 sm:pt-20 sm:pb-12 lg:py-12">
          <div
            data-scroll-reveal
            className="flex max-w-[720px] flex-col items-start gap-5 sm:gap-7"
          >
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2.5 text-sm leading-4 font-medium tracking-[0.1em] uppercase">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-12 shrink-0 bg-current"
                />
                {GROUPS_OCCASIONS_CONTENT.eyebrow}
              </p>
              <h2
                id="groups-occasions-heading"
                className={cn(
                  ebGaramond.className,
                  "text-[30px] leading-[40px] font-medium sm:text-[52px] sm:leading-[58px] lg:text-[60px] lg:leading-[66px]",
                )}
              >
                {GROUPS_OCCASIONS_CONTENT.heading}
              </h2>
            </div>

            <p className="w-full text-base leading-6 text-warm-cream/90">
              <span className="sm:hidden">
                {MOBILE_HOME_CONTENT.groupsDescription}
              </span>
              <span className="hidden sm:inline">
                {GROUPS_OCCASIONS_CONTENT.description}
              </span>
            </p>

            <Button
              asChild
              variant="brand-primary-inverse"
              size="cta"
              className="w-[216px]"
            >
              <Link href={ROUTES.PRIVATE_DINING}>
                {GROUPS_OCCASIONS_CONTENT.ctaLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="site-container">
        {/* Preserve authored tracks alongside the default equal-width grid utilities. */}
        <ul
          className={cn(
            "groups-cards xl:[--card-gap:28px] xl:[--card-track-width:round(down,_(100%_-_2_*_var(--card-gap))_/_3,_4px)] xl:[&&]:grid-cols-[repeat(2,_minmax(0,_var(--card-track-width)))_minmax(_0,_1fr_)] xl:gap-x-[var(--card-gap)]",
            "grid items-center gap-10 py-8 sm:gap-8 sm:py-12 xl:w-[calc(100%+59px)] xl:max-w-[1355px] xl:grid-cols-3 xl:items-stretch",
          )}
        >
          {GROUPS_OCCASIONS_CONTENT.occasions.map((occasion) => (
            <li
              key={occasion.title}
              className={
                "groups-card [--card-image-width:140px] relative grid grid-cols-[var(--card-image-width)_minmax(0,_1fr)] gap-5 min-w-0 pt-0 pr-0 pb-0 pl-0 [&&::before]:absolute [&&::before]:top-0 [&&::before]:bottom-0 [&&::before]:left-px [&&::before]:hidden [&&::before]:w-px [&&::before]:bg-soft-stone [&&::before]:bg-none [&&::before]:content-[''] [@media_(width_<_360px)]:[--card-image-width:124px] sm:[--card-image-width:180px] sm:grid-cols-[var(--card-image-width)_minmax(140px,_1fr)] xl:[--card-image-width:160px] xl:grid-cols-[var(--card-image-width)_minmax(0,_1fr)] xl:pl-5 xl:pr-5 xl:[&&::before]:block"
              }
              data-image-card
            >
              <Link
                data-card-image
                href={occasion.href}
                aria-label={occasion.title}
                className={cn(
                  FOCUS_RING,
                  "groups-image relative block self-start overflow-hidden w-full h-[calc(var(--card-image-width)_*_4_/_3_-_4px)] rounded-[2px] sm:h-[calc(var(--card-image-width)_*_4_/_3_-_2px)] xl:h-[185px]",
                  "group",
                )}
              >
                {/* Landscape sources need enough pixels for their portrait crop. */}
                <Image
                  src={occasion.image.src}
                  alt={occasion.image.alt}
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 640px) 360px, (max-width: 359px) 244px, 280px"
                  className="object-cover transition-transform duration-(--duration-base) ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none"
                />
              </Link>
              <div
                data-scroll-reveal
                className={"groups-copy flex flex-col min-w-0 sm:gap-2.5"}
              >
                <div className={"groups-introduction flex flex-col gap-2.5"}>
                  <h3
                    className={cn(
                      ebGaramond.className,
                      "groups-title [.groups-card_&&]:text-[length:22px] [.groups-card_&&]:font-medium [.groups-card_&&]:leading-7 sm:[.groups-card_&&]:text-[length:24px] sm:[.groups-card_&&]:leading-7.5",
                    )}
                  >
                    {occasion.title}
                  </h3>
                  <p
                    className={
                      "groups-description [.groups-card_&&]:mt-0 [.groups-card_&&]:mr-0 [.groups-card_&&]:mb-0 [.groups-card_&&]:ml-0 [.groups-card_&&]:text-text-secondary [.groups-card_&&]:text-[length:14px] [.groups-card_&&]:leading-[21px] max-sm:[.groups-card_&&]:text-[length:16px]"
                    }
                  >
                    {occasion.mobileDescription ? (
                      <>
                        <span className="sm:hidden">
                          {occasion.mobileDescription}
                        </span>
                        <span className="hidden sm:inline">
                          {occasion.description}
                        </span>
                      </>
                    ) : (
                      occasion.description
                    )}
                  </p>
                </div>
                <Button
                  data-card-action
                  asChild
                  variant="brand-text"
                  aria-label={`${GROUPS_OCCASIONS_CONTENT.cardCtaLabel} ${occasion.title}`}
                  className={
                    "groups-action [.groups-card_&&]:self-start [.groups-card_&&]:h-11 [.groups-card_&&]:min-h-11 [.groups-card_&&]:mt-auto [.groups-card_&&]:pt-0 [.groups-card_&&]:pr-0 [.groups-card_&&]:pb-0 [.groups-card_&&]:pl-0 [.groups-card_&&]:rounded-none [.groups-card_&&]:text-peploe-burgundy [.groups-card_&&]:text-[length:16px] [.groups-card_&&]:font-medium [.groups-card_&&]:leading-5.5 xl:[.groups-card_&&]:leading-6"
                  }
                >
                  <Link href={occasion.href}>
                    {GROUPS_OCCASIONS_CONTENT.cardCtaLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
