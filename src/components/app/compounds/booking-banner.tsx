import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { BOOKING_BANNER_CONTENT } from "@/lib/constants";
import { dmSans, ebGaramond, ebGaramondItalic } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function BookingBanner() {
  return (
    <section
      id="book-a-table"
      aria-labelledby="booking-banner-heading"
      className={cn(
        dmSans.className,
        "isolate scroll-mt-20 overflow-hidden bg-button-primary-pressed text-warm-cream",
      )}
    >
      <div className="site-container-inset relative py-14 sm:py-[72px]">
        <Image
          src={BOOKING_BANNER_CONTENT.image.src}
          alt={BOOKING_BANNER_CONTENT.image.alt}
          width={472}
          height={472}
          sizes="472px"
          className="pointer-events-none absolute -top-6 -right-[104px] h-[472px] w-[472px] max-w-none opacity-15 lg:opacity-35"
        />

        <div className="relative flex flex-col items-start gap-7">
          <div className="flex flex-col gap-6">
            <h2
              id="booking-banner-heading"
              className={cn(
                ebGaramond.className,
                "text-[36px] leading-[42px] font-normal sm:text-[48px] sm:leading-[54px]",
              )}
            >
              {BOOKING_BANNER_CONTENT.heading}{" "}
              <em className={ebGaramondItalic.className}>
                {BOOKING_BANNER_CONTENT.emphasizedHeading}
              </em>
            </h2>
            <p className="text-base leading-6">
              {BOOKING_BANNER_CONTENT.description}
            </p>
          </div>

          <Button
            type="button"
            variant="brand-primary-inverse"
            aria-disabled="true"
            className="h-11 w-[156px] rounded-[4px] bg-warm-cream px-5 has-[>svg]:px-5 text-base leading-[22px] font-medium text-peploe-burgundy shadow-none"
          >
            {BOOKING_BANNER_CONTENT.ctaLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
