import { ArrowRight } from "lucide-react";
import Image from "next/image";

import styles from "@/components/app/compounds/wine.module.css";
import { Button } from "@/components/ui/button";
import { WINE_CONTENT } from "@/lib/constants";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Wine() {
  return (
    <section
      id="wine"
      aria-labelledby="wine-heading"
      className={cn(
        dmSans.className,
        "relative isolate scroll-mt-20 bg-ink text-warm-cream",
      )}
    >
      <Image
        src={WINE_CONTENT.image.src}
        alt={WINE_CONTENT.image.alt}
        fill
        sizes="(min-width: 1024px) 100vw, 1200px"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className={cn(styles.overlay, "absolute inset-0")}
      />

      <div className="site-container relative">
        <div className="flex w-full max-w-[748px] flex-col gap-8 py-14 sm:py-20">
          <p className="flex items-center gap-2.5 text-sm leading-4 font-medium tracking-[0.1em] uppercase">
            <span
              aria-hidden="true"
              className="h-0.5 w-12 shrink-0 bg-current"
            />
            {WINE_CONTENT.eyebrow}
          </p>

          <h2
            id="wine-heading"
            className={cn(
              ebGaramond.className,
              "text-[40px] leading-[44px] font-medium tracking-[-0.5px] sm:text-[52px] sm:leading-[58px] lg:text-[60px] lg:leading-[66px]",
            )}
          >
            {WINE_CONTENT.heading}
          </h2>

          <p className="text-lg leading-6 text-warm-cream/85">
            {WINE_CONTENT.description}
          </p>

          <div className="flex flex-col items-start gap-6">
            <Button
              type="button"
              variant="brand-primary"
              aria-disabled="true"
              className="h-11 w-[220px] gap-2 rounded-[4px] bg-peploe-burgundy px-5 has-[>svg]:px-5 text-base leading-[22px] font-medium text-warm-cream shadow-none"
            >
              {WINE_CONTENT.primaryCtaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button
              type="button"
              variant="brand-text"
              aria-disabled="true"
              className="h-11 gap-2 rounded-none px-0 has-[>svg]:px-0 text-base leading-[22px] font-medium text-warm-cream"
            >
              {WINE_CONTENT.secondaryCtaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
