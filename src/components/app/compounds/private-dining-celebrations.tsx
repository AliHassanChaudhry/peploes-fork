import { PrivateDiningEnquiry } from "@/components/app/compounds/private-dining-enquiry";
import { PrivateDiningFeatureSection } from "@/components/app/compounds/private-dining-feature-section";
import { PrivateDiningClosing } from "@/components/app/molecules/private-dining-closing";
import { PrivateDiningFeatures } from "@/components/app/molecules/private-dining-features";
import { PrivateDiningHeading } from "@/components/app/molecules/private-dining-heading";
import { PrivateDiningHero } from "@/components/app/molecules/private-dining-hero";
import { PrivateDiningMenus } from "@/components/app/molecules/private-dining-menus";
import {
  CELEBRATION_DETAILS,
  CELEBRATION_MENUS,
  CELEBRATION_OCCASIONS,
  CELEBRATION_PLANNING,
  CELEBRATIONS,
} from "@/lib/constants/private-dining-celebrations";
import { cn } from "@/lib/utils";

export function PrivateDiningCelebrations() {
  return (
    <>
      <PrivateDiningHero hero={CELEBRATIONS.hero} variant="celebrations" />
      <PrivateDiningFeatureSection
        content={CELEBRATION_OCCASIONS}
        className={"pd-celebrationOccasions lg:min-h-114"}
        featuresClassName={
          "pd-fiveFeatures lg:flex lg:gap-0 lg:text-center lg:[&_>_li]:flex-1 lg:[&_>_li]:min-w-0 lg:[&_>_li]:px-4! lg:[&_>_li_+_li]:border-l lg:[&_>_li_+_li]:border-solid lg:[&_>_li_+_li]:border-l-soft-stone lg:[&_>_li:last-child]:flex-[1.5]"
        }
      />
      <section
        className={
          "pd-personalDetails bg-button-primary-pressed bg-none text-warm-cream py-12! max-sm:py-8!"
        }
      >
        <div
          className={cn(
            "site-container",
            "pd-personalDetailsContainer grid items-start gap-10 max-sm:gap-8 lg:grid-cols-[580fr_668fr] lg:gap-12 xl:grid-cols-[minmax(0,_1fr)_668px]",
          )}
        >
          <PrivateDiningHeading {...CELEBRATION_DETAILS} />
          <PrivateDiningFeatures
            items={CELEBRATION_DETAILS.items}
            className={
              "pd-personalFeatures gap-6 [&_>_li]:pl-6! [&_>_li]:inset-shadow-[1px_0_var(--soft-stone)] [&_p]:text-[length:15px] max-sm:[&_>_li]:pl-0! max-sm:[&_>_li]:shadow-none max-sm:[&_>_li]:inset-shadow-none max-sm:[&_>_li_+_li]:pt-6! max-sm:[&_>_li_+_li]:border-t max-sm:[&_>_li_+_li]:border-solid max-sm:[&_>_li_+_li]:border-t-[rgb(var(--overlay-cream-rgb)_/_25%)] lg:grid-cols-[1fr] lg:gap-6 lg:pt-3.5! max-sm:[&_p]:text-[length:16px] lg:[&_p]:leading-[1.4]"
            }
          />
        </div>
      </section>
      <PrivateDiningMenus
        heading={CELEBRATION_MENUS}
        paragraphs={CELEBRATION_MENUS.paragraphs}
        className={"pd-celebrationMenus"}
      />
      <PrivateDiningFeatureSection
        content={CELEBRATION_PLANNING}
        className={"pd-celebrationPlanning lg:min-h-83"}
      />
      <PrivateDiningEnquiry
        content={CELEBRATIONS.enquiry}
        className={"pd-celebrationEnquiry lg:py-0!"}
      />
      <PrivateDiningClosing
        content={CELEBRATIONS.closing}
        className={
          "pd-celebrationClosing lg:bg-ink lg:bg-none lg:[&&::after]:bg-[image:linear-gradient(_90deg,_rgb(9_8_6),_rgb(9_8_6_/_60%)_53%,_rgb(9_8_6_/_0%)_73%_)] lg:[&&::after]:bg-transparent lg:[&&_p]:font-[family-name:var(--font-eb-garamond)]! lg:[&&_p]:text-[length:20px] lg:[&&_p]:max-w-185 lg:[&&_p]:mt-3 lg:[&&_p]:leading-[25px]"
        }
      />
    </>
  );
}
