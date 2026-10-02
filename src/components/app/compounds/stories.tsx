import { ArrowRight } from "lucide-react";
import Image from "next/image";

import styles from "@/components/app/compounds/stories.module.css";
import { Button } from "@/components/ui/button";
import { STORIES_CONTENT } from "@/lib/constants/stories";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { IStoryActionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

function StoryAction({ label, filled = false }: IStoryActionProps) {
  return (
    <Button
      type="button"
      variant={filled ? "brand-primary-inverse" : "brand-secondary-inverse"}
      aria-disabled="true"
      className={cn(
        "h-auto min-h-11 max-w-full self-start rounded-[4px] border border-warm-cream/70 px-4 has-[>svg]:px-4 text-base leading-6 font-medium whitespace-normal shadow-none sm:px-5 sm:has-[>svg]:px-5",
        filled
          ? "bg-warm-cream text-peploe-burgundy"
          : "bg-transparent text-warm-cream",
      )}
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Button>
  );
}

export function Stories() {
  return (
    <section
      aria-labelledby="stories-heading"
      className={cn(dmSans.className, "bg-warm-cream text-ink")}
    >
      <div className="site-container flex flex-col gap-12 py-14 sm:py-20 lg:gap-[72px] xl:pb-[76px]">
        <div className="flex flex-col items-start gap-4">
          <p className="mb-3 flex items-center gap-2.5 text-sm leading-4 font-medium tracking-[0.1em] text-peploe-burgundy uppercase">
            <span
              aria-hidden="true"
              className="h-0.5 w-12 shrink-0 bg-current"
            />
            {STORIES_CONTENT.eyebrow}
          </p>
          <h2
            id="stories-heading"
            className={cn(
              ebGaramond.className,
              "text-[40px] leading-[44px] font-medium sm:text-[52px] sm:leading-[58px] lg:text-[60px] lg:leading-[66px]",
            )}
          >
            {STORIES_CONTENT.headingLines[0]}
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            {STORIES_CONTENT.headingLines[1]}
          </h2>
          <p className="text-lg leading-6 text-text-secondary">
            {STORIES_CONTENT.description}
          </p>
          <Button
            type="button"
            variant="brand-text"
            aria-disabled="true"
            className="h-11 rounded-none px-0 has-[>svg]:px-0 text-base leading-6 font-medium text-peploe-burgundy"
          >
            {STORIES_CONTENT.ctaLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="grid items-start gap-7 text-warm-cream xl:w-[calc(100%+4px)] xl:grid-cols-[repeat(2,minmax(0,636px))]">
          <article className="relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[4px] bg-ink p-6 sm:p-10 xl:min-h-[640px]">
            <Image
              src={STORIES_CONTENT.family.image.src}
              alt={STORIES_CONTENT.family.image.alt}
              fill
              sizes="(min-width: 1280px) 960px, max(780px, calc(100vw - 48px))"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className={cn(styles.familyOverlay, "absolute inset-0")}
            />
            <div className="relative flex flex-col gap-4">
              <p className="text-sm leading-5 font-medium tracking-[0.1em] uppercase">
                {STORIES_CONTENT.family.eyebrow}
              </p>
              <h3
                className={cn(
                  ebGaramond.className,
                  "text-[32px] leading-[38px] font-normal sm:text-[38px] sm:leading-[44px]",
                )}
              >
                {STORIES_CONTENT.family.heading}
                <br />
                {STORIES_CONTENT.family.headingContinuation}
              </h3>
              <p className="text-[15px] leading-[22px] text-warm-cream/90">
                {STORIES_CONTENT.family.description}
              </p>
              <div className="pt-3">
                <StoryAction label={STORIES_CONTENT.family.ctaLabel} filled />
              </div>
            </div>
          </article>

          <div className="grid min-w-0 gap-7">
            <article className="relative isolate flex min-h-[420px] items-end justify-end overflow-hidden rounded-[4px] bg-ink sm:min-h-[308px] sm:items-center">
              <Image
                src={STORIES_CONTENT.produce.image.src}
                alt={STORIES_CONTENT.produce.image.alt}
                fill
                sizes="(min-width: 640px) max(955px, calc(100vw - 48px)), 1302px"
                className="object-cover sm:object-right"
              />
              <div
                aria-hidden="true"
                className={cn(styles.produceOverlay, "absolute inset-0")}
              />
              <div className="relative flex w-full flex-col gap-3 p-6 sm:w-1/2 sm:p-8">
                <p className="text-xs leading-[18px] font-medium tracking-[0.1em] uppercase">
                  {STORIES_CONTENT.produce.eyebrow}
                </p>
                <h3
                  className={cn(
                    ebGaramond.className,
                    "text-2xl leading-[30px] font-normal",
                  )}
                >
                  {STORIES_CONTENT.produce.heading}
                </h3>
                <p className="text-sm leading-5">
                  {STORIES_CONTENT.produce.description}
                </p>
                <StoryAction label={STORIES_CONTENT.produce.ctaLabel} />
              </div>
            </article>

            <div className="grid gap-7 sm:grid-cols-2">
              <article className="relative isolate flex min-h-[308px] flex-col justify-end overflow-hidden rounded-[4px] bg-ink p-6">
                <Image
                  src={STORIES_CONTENT.gina.image.src}
                  alt={STORIES_CONTENT.gina.image.alt}
                  fill
                  sizes="(min-width: 1440px) 304px, (min-width: 1280px) calc((100vw - 224px) / 4), (min-width: 640px) calc((100vw - 76px) / 2), calc(100vw - 48px)"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className={cn(styles.ginaOverlay, "absolute inset-0")}
                />
                <div className="relative flex flex-col gap-2">
                  <p className="text-xs leading-[18px] font-medium tracking-[0.1em] uppercase">
                    {STORIES_CONTENT.gina.eyebrow}
                  </p>
                  <h3
                    className={cn(
                      ebGaramond.className,
                      "text-xl leading-[26px] font-normal",
                    )}
                  >
                    {STORIES_CONTENT.gina.heading}
                  </h3>
                  <div className="pt-2">
                    <StoryAction label={STORIES_CONTENT.gina.ctaLabel} />
                  </div>
                </div>
              </article>

              <article className="relative isolate flex min-h-[308px] flex-col justify-end overflow-hidden rounded-[4px] bg-ink p-6">
                <Image
                  src={STORIES_CONTENT.art.image.src}
                  alt={STORIES_CONTENT.art.image.alt}
                  fill
                  sizes="(min-width: 1280px) 512px, (min-width: 640px) max(512px, calc((100vw - 76px) / 2)), max(512px, calc(100vw - 48px))"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className={cn(styles.artOverlay, "absolute inset-0")}
                />
                <div className="relative flex flex-col gap-2">
                  <p className="text-xs leading-[18px] font-medium tracking-[0.1em] uppercase">
                    {STORIES_CONTENT.art.eyebrow}
                  </p>
                  <h3
                    className={cn(
                      ebGaramond.className,
                      "text-xl leading-[26px] font-normal",
                    )}
                  >
                    {STORIES_CONTENT.art.heading}
                  </h3>
                  <p className="text-[13px] leading-[18px] text-warm-cream/80">
                    {STORIES_CONTENT.art.description}
                  </p>
                  <div className="pt-2">
                    <StoryAction label={STORIES_CONTENT.art.ctaLabel} />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
