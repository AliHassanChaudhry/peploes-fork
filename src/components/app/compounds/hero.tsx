import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/app/atoms/scroll-reveal";
import styles from "@/components/app/compounds/hero.module.css";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/lib/constants/hero";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(dmSans.className, styles.hero, "isolate text-warm-cream")}
    >
      <div className="relative flex min-h-[660px] items-center bg-ink py-20 sm:min-h-[720px] lg:min-h-[780px] lg:py-[72px]">
        <Image
          src={HERO_CONTENT.backgroundImage.src}
          alt={HERO_CONTENT.backgroundImage.alt}
          fill
          sizes="(min-width: 1024px) max(100vw, 1170px), (min-width: 640px) 1080px, 990px"
          preload
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className={cn(styles.photoOverlay, "absolute inset-0")}
        />

        <div className="site-container relative flex flex-col gap-7">
          <div className="flex max-w-[720px] flex-col gap-7">
            <p className="flex items-center gap-2.5 text-sm leading-4 font-medium tracking uppercase">
              <span
                aria-hidden="true"
                className="h-0.5 w-12 shrink-0 bg-current"
              />
              {HERO_CONTENT.eyebrow}
            </p>

            <div className="flex flex-col gap-4">
              <h1
                id="hero-heading"
                className={cn(
                  ebGaramond.className,
                  "text-[clamp(40px,5.278vw,76px)] leading-[1.079] font-medium lg:text-[76px] lg:leading-[82px]",
                )}
              >
                <span className="lg:block">{HERO_CONTENT.headingLines[0]}</span>{" "}
                <span className="lg:block">{HERO_CONTENT.headingLines[1]}</span>{" "}
                <span className="lg:block">{HERO_CONTENT.headingLines[2]}</span>
              </h1>
              <p className="text-lg leading-7 text-warm-cream/90">
                {HERO_CONTENT.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="button"
              variant="brand-primary"
              aria-disabled="true"
              className="h-11 w-[156px] gap-2 rounded-[4px] bg-peploe-burgundy px-5 has-[>svg]:px-5 text-base leading-[22px] font-medium text-warm-cream shadow-none"
            >
              {HERO_CONTENT.bookingLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button
              type="button"
              variant="brand-secondary-inverse"
              aria-disabled="true"
              className="h-11 w-[136px] rounded-[4px] border-warm-cream bg-transparent px-5 text-base leading-[22px] font-medium text-warm-cream shadow-none"
            >
              {HERO_CONTENT.callLabel}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.entrance}>
        <Image
          src={HERO_CONTENT.entranceBackground.src}
          alt={HERO_CONTENT.entranceBackground.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className={cn(styles.entranceOverlay, "absolute inset-0")}
        />
        <Reveal className={styles.entranceArtwork} threshold={0.05}>
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
                styles.entranceCaption,
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
