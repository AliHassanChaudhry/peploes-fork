import { Mail, Phone } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  HUMAN_HOSPITALITY_CONTACT_CLASSNAME,
  HUMAN_HOSPITALITY_CONTENT,
} from "@/lib/constants/human-hospitality";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function HumanHospitality() {
  return (
    <section
      aria-labelledby="human-hospitality-heading"
      className={cn(
        dmSans.className,
        "overflow-hidden bg-warm-cream bg-linear-to-b from-ink/10 to-transparent to-[66px] text-ink",
      )}
    >
      <div className="relative isolate grid">
        <div className="site-container relative z-10">
          <div className="flex min-w-0 flex-col items-start gap-7 py-14 sm:py-20 xl:max-w-[783px]">
            <p className="flex items-center gap-2.5 text-sm leading-4 font-medium tracking-[0.1em] text-peploe-burgundy uppercase">
              <span
                aria-hidden="true"
                className="h-0.5 w-12 shrink-0 bg-current"
              />
              {HUMAN_HOSPITALITY_CONTENT.eyebrow}
            </p>

            <div className="flex flex-col gap-4">
              <h2
                id="human-hospitality-heading"
                className={cn(
                  ebGaramond.className,
                  "text-[40px] leading-[44px] font-medium text-peploe-burgundy sm:text-[52px] sm:leading-[58px] xl:text-[60px] xl:leading-[66px]",
                )}
              >
                {HUMAN_HOSPITALITY_CONTENT.heading}
              </h2>
              <p className="text-base leading-[26px] text-ink/80">
                {HUMAN_HOSPITALITY_CONTENT.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="brand-contact"
                className={HUMAN_HOSPITALITY_CONTACT_CLASSNAME}
              >
                <a href={HUMAN_HOSPITALITY_CONTENT.phoneAction.href}>
                  <Phone
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.5}
                  />
                  {HUMAN_HOSPITALITY_CONTENT.phoneAction.label}
                </a>
              </Button>
              <Button
                asChild
                variant="brand-contact"
                className={HUMAN_HOSPITALITY_CONTACT_CLASSNAME}
              >
                <a href={HUMAN_HOSPITALITY_CONTENT.emailAction.href}>
                  <Mail
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.5}
                  />
                  {HUMAN_HOSPITALITY_CONTENT.emailAction.label}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative aspect-[563/389] w-full max-w-[675px] self-end justify-self-end overflow-hidden xl:absolute xl:-right-8 xl:bottom-0 xl:w-[39.0972%] xl:max-w-[563px]">
          <Image
            src={HUMAN_HOSPITALITY_CONTENT.image.src}
            alt={HUMAN_HOSPITALITY_CONTENT.image.alt}
            width={1024}
            height={1024}
            sizes="(min-width: 1440px) 704px, (min-width: 1280px) 49vw, (min-width: 675px) 844px, 125vw"
            className="absolute -top-[30.4%] -left-[17%] h-auto w-[125%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
