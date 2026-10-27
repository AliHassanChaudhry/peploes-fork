import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/app/atoms/tracked-link";
import { Button } from "@/components/ui/button";
import { NAVBAR_CONTENT, ROUTES } from "@/lib/constants";
import { GA4Event } from "@/lib/enums";
import type { INavbarBookingButtonProps } from "@/lib/types";

export function NavbarBookingButton({ onNavigate }: INavbarBookingButtonProps) {
  return (
    <Button
      asChild
      variant="brand-primary"
      className="h-11 w-[99px] gap-2 rounded-[4px] bg-peploe-burgundy px-5 text-base leading-6 font-medium text-warm-cream shadow-none has-[>svg]:px-5 xl:w-[156px] xl:leading-[22px]"
    >
      <TrackedLink
        href={ROUTES.BOOK_A_TABLE}
        onNavigate={onNavigate}
        interaction={{ event: GA4Event.BookingClick, placement: "navbar" }}
      >
        <span className="xl:hidden">{NAVBAR_CONTENT.mobileBookingLabel}</span>
        <span className="hidden xl:inline">{NAVBAR_CONTENT.bookingLabel}</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </TrackedLink>
    </Button>
  );
}
