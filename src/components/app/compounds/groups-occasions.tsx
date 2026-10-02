import { ArrowRight } from "lucide-react";
import Image from "next/image";

import styles from "@/components/app/compounds/groups-occasions.module.css";
import { Button } from "@/components/ui/button";
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
      <div className="relative isolate bg-ink text-warm-cream">
        <Image
          src={GROUPS_OCCASIONS_CONTENT.image.src}
          alt={GROUPS_OCCASIONS_CONTENT.image.alt}
          fill
          sizes="(min-width: 1024px) 100vw, 720px"
          className="object-cover lg:object-[center_60%]"
        />
        <div
          aria-hidden="true"
          className={cn(styles.overlay, "absolute inset-0")}
        />

        <div className="site-container relative pt-14 pb-12 sm:pt-20">
          <div className="flex max-w-[720px] flex-col items-start gap-7">
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
                "text-[40px] leading-[44px] font-medium sm:text-[52px] sm:leading-[58px] lg:text-[60px] lg:leading-[66px]",
              )}
            >
              {GROUPS_OCCASIONS_CONTENT.heading}
            </h2>

            <p className="max-w-[520px] text-base leading-6 text-warm-cream/90">
              {GROUPS_OCCASIONS_CONTENT.description}
            </p>

            <Button
              type="button"
              variant="brand-primary-inverse"
              aria-disabled="true"
              className="h-11 w-[216px] rounded-[4px] bg-warm-cream px-5 has-[>svg]:px-5 text-base leading-[22px] font-medium text-peploe-burgundy shadow-none"
            >
              {GROUPS_OCCASIONS_CONTENT.ctaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <ul className="site-container grid items-center gap-8 pt-12 pb-14 sm:pb-20 xl:grid-cols-3 xl:gap-25">
        {GROUPS_OCCASIONS_CONTENT.occasions.map((occasion) => (
          <li
            key={occasion.title}
            className="relative grid min-w-0 grid-cols-[minmax(0,120px)_minmax(140px,1fr)] gap-5 sm:grid-cols-[minmax(0,180px)_minmax(140px,1fr)] xl:before:absolute xl:before:top-1/2 xl:before:-left-10 xl:before:h-[100px] xl:before:w-px xl:before:-translate-y-1/2 xl:before:bg-soft-stone xl:first:before:hidden"
            style={{ minHeight: occasion.minHeight }}
          >
            <div className="relative overflow-hidden rounded-[2px]">
              <Image
                src={occasion.image}
                alt={occasion.imageAlt}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-2.5">
              <div className="flex flex-col gap-2.5">
                <h3
                  className={cn(
                    ebGaramond.className,
                    "text-2xl leading-[30px] font-medium",
                  )}
                >
                  {occasion.title}
                </h3>
                <p className="text-sm leading-[21px] text-text-secondary">
                  {occasion.description}
                </p>
              </div>
              <Button
                type="button"
                variant="brand-text"
                aria-disabled="true"
                aria-label={`${GROUPS_OCCASIONS_CONTENT.cardCtaLabel} ${occasion.title}`}
                className="mt-auto h-11 self-start rounded-none px-0 has-[>svg]:px-0 text-base leading-[22px] font-medium text-peploe-burgundy"
              >
                {GROUPS_OCCASIONS_CONTENT.cardCtaLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
