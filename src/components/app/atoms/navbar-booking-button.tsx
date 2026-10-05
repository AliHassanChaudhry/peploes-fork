import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAVBAR_CONTENT } from "@/lib/constants";

export function NavbarBookingButton() {
  return (
    <Button
      type="button"
      variant="brand-primary"
      aria-disabled="true"
      className="h-11 w-[99px] gap-2 rounded-[4px] bg-peploe-burgundy px-5 text-base leading-6 font-medium text-warm-cream shadow-none has-[>svg]:px-5 xl:w-[156px] xl:leading-[22px]"
    >
      <span className="xl:hidden">{NAVBAR_CONTENT.mobileBookingLabel}</span>
      <span className="hidden xl:inline">{NAVBAR_CONTENT.bookingLabel}</span>
      <ArrowRight aria-hidden="true" className="size-4" />
    </Button>
  );
}
