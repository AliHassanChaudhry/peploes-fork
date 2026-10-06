import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { FOCUS_RING } from "@/lib/constants";
import { MOBILE_NAVIGATION_CONTENT } from "@/lib/constants/mobile-navigation";
import { cn } from "@/lib/utils";

interface IMobileNavigationDetailsProps {
  brandPhraseClassName: string;
}

export function MobileNavigationDetails({
  brandPhraseClassName,
}: IMobileNavigationDetailsProps) {
  return (
    <>
      <div className="flex flex-col gap-2 text-sm leading-[21px]">
        <div className="flex min-h-12 items-start gap-3.5">
          <Clock3 aria-hidden="true" className="size-5 shrink-0" />
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="text-text-secondary">
              {MOBILE_NAVIGATION_CONTENT.openingHoursHeading}
            </p>
            <dl className="space-y-0.5">
              {MOBILE_NAVIGATION_CONTENT.openingHours.map((row) => (
                <div key={row.days} className="grid grid-cols-2 gap-1">
                  <dt className="leading-5 font-medium">{row.days}</dt>
                  <dd className="text-text-secondary">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="flex min-h-12 items-center gap-3.5">
          <MapPin aria-hidden="true" className="size-5 shrink-0" />
          <p>{MOBILE_NAVIGATION_CONTENT.address}</p>
        </div>
        <a
          href={MOBILE_NAVIGATION_CONTENT.phoneAction.href}
          className={cn(
            FOCUS_RING,
            "flex min-h-12 items-center gap-3.5 rounded-sm underline-offset-4 hover:underline focus-visible:ring-peploe-burgundy",
          )}
        >
          <Phone aria-hidden="true" className="size-5 shrink-0" />
          <span>{MOBILE_NAVIGATION_CONTENT.phoneAction.label}</span>
        </a>
        <a
          href={MOBILE_NAVIGATION_CONTENT.emailAction.href}
          className={cn(
            FOCUS_RING,
            "flex min-h-12 items-center gap-3.5 rounded-sm underline-offset-4 hover:underline focus-visible:ring-peploe-burgundy",
          )}
        >
          <Mail aria-hidden="true" className="size-5 shrink-0" />
          <span className="break-all">
            {MOBILE_NAVIGATION_CONTENT.emailAction.label}
          </span>
        </a>
      </div>
      <p
        className={cn(
          brandPhraseClassName,
          "text-center text-lg leading-[26px] text-peploe-burgundy",
        )}
      >
        {MOBILE_NAVIGATION_CONTENT.brandPhrase}
      </p>
    </>
  );
}
