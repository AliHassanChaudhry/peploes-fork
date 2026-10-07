import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { dmSans, ebGaramond, ebGaramondItalic } from "@/lib/fonts";
import type { IMenuBookingProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MenuBooking({
  booking = MENU_PAGE_CONTENT.booking,
}: IMenuBookingProps) {
  return (
    <section
      aria-labelledby="menu-booking-heading"
      className={cn(
        "relative isolate flex min-h-[330px] items-end overflow-hidden bg-ink text-warm-cream xl:min-h-[220px] xl:items-center",
        booking.description && "min-h-[360px] xl:min-h-64",
        booking.tallOnMobile && "min-h-[390px]",
      )}
    >
      <Image
        src={booking.image.src}
        alt={booking.image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(32,16,9,0),rgba(32,16,9,0.78))] xl:bg-[linear-gradient(90deg,rgba(32,16,9,0),rgb(32,16,9))]"
      />
      <div
        className={cn(
          "site-container flex flex-col items-end gap-6 py-[54px] xl:py-12",
          !booking.description && "xl:gap-4",
        )}
      >
        <h2
          id="menu-booking-heading"
          className={cn(
            booking.description
              ? ebGaramond.className
              : ebGaramondItalic.className,
            "max-w-[280px] text-right text-[29px] leading-[33px] xl:max-w-none xl:text-[28px] xl:leading-[1.2]",
            booking.description &&
              "max-w-[342px] text-[30px] leading-[31px] xl:text-[30px] xl:leading-9",
          )}
        >
          {booking.heading}
        </h2>
        {booking.description && (
          <p
            className={cn(
              dmSans.className,
              "-mt-3 max-w-[465px] text-right text-base leading-[22px]",
            )}
          >
            {booking.description}
          </p>
        )}
        <Button
          type="button"
          variant="brand-primary-inverse"
          aria-disabled="true"
          className={cn(
            dmSans.className,
            "h-11 rounded-[4px] px-5 text-base has-[>svg]:px-5",
          )}
        >
          {booking.label}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </section>
  );
}
