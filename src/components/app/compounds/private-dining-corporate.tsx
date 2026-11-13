import Image from "next/image";
import { PrivateDiningEnquiry } from "@/components/app/compounds/private-dining-enquiry";
import { PrivateDiningFeatureSection } from "@/components/app/compounds/private-dining-feature-section";
import { PrivateDiningImageSection } from "@/components/app/compounds/private-dining-image-section";
import { PrivateDiningClosing } from "@/components/app/molecules/private-dining-closing";
import { PrivateDiningHeading } from "@/components/app/molecules/private-dining-heading";
import { PrivateDiningHero } from "@/components/app/molecules/private-dining-hero";
import { PrivateDiningMenus } from "@/components/app/molecules/private-dining-menus";
import {
  CORPORATE_CAPACITY,
  CORPORATE_EVENTS,
  CORPORATE_HIRE,
  CORPORATE_LOCATION,
  CORPORATE_MENUS,
  CORPORATE_OCCASIONS,
  CORPORATE_SPACES,
} from "@/lib/constants/private-dining-corporate";
import { ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function PrivateDiningCorporate() {
  return (
    <div
      className={
        "pd-corporatePage [--events-pale:color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream)_)] xl:[body:has(&:where(.pd-corporatePage))_[data-navbar-primary]]:gap-7 xl:[body:has(&:where(.pd-corporatePage))_[data-navbar-gift]:not(:hover):not(:focus-visible)]:text-ink"
      }
    >
      <PrivateDiningHero hero={CORPORATE_EVENTS.hero} variant="corporate" />
      <section
        className={cn(
          "pd-paleSection bg-[var(--events-pale)] bg-none py-12! max-sm:py-8!",
          "pd-corporateOccasions lg:min-h-[431px]",
        )}
      >
        <div className="site-container">
          <PrivateDiningHeading {...CORPORATE_OCCASIONS} />
          <ul
            className={
              "pd-corporateOccasionList grid gap-8 mt-10 [&_h3]:text-[length:24px] [&_h3]:mb-3 [&_h3]:font-medium [&_p]:text-[length:18px] [&_p]:text-text-secondary sm:max-lg:grid-cols-2 lg:grid-cols-[299.25fr_332.25fr_332.25fr_332.25fr] lg:gap-0 lg:mt-7 lg:[&_>_li]:pt-6! lg:[&_>_li]:pr-6! lg:[&_>_li]:pb-0! lg:[&_>_li]:pl-0! lg:[&_>_li]:min-h-[125px] lg:[&_>_li_+_li]:inset-shadow-[1px_0_var(--soft-stone)] lg:[&_>_li_+_li]:pl-8! lg:[&_h3]:text-[length:20px] lg:[&_h3]:mb-1.5 lg:[&_p]:max-w-[276.25px] lg:[&_p]:text-[length:16px] lg:[&_>_li:first-child_p]:max-w-[275.25px] lg:[&_>_li:last-child_p]:text-[length:14px] max-sm:[&_p]:text-[length:16px] [&_h3]:leading-7.5 [&_p]:leading-6.5 lg:[&_h3]:leading-6.5 lg:[&_p]:leading-[23px] lg:[&_>_li:last-child_p]:leading-5"
            }
          >
            {CORPORATE_OCCASIONS.items.map((item) => (
              <li data-scroll-reveal key={item._key}>
                <h3 className={ebGaramond.className}>{item.heading}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PrivateDiningImageSection
        className={
          "pd-exclusiveHire lg:min-h-87.5 lg:overflow-hidden lg:[&::after]:content-[''] lg:[&::after]:absolute lg:[&::after]:top-0 lg:[&::after]:right-0 lg:[&::after]:bottom-0 lg:[&::after]:left-0 lg:[&::after]:pointer-events-none lg:[&::after]:bg-[image:linear-gradient(_90deg,_var(--warm-cream)_49.6582%,_rgb(242_234_229_/_50%)_66.2436%,_rgb(242_234_229_/_0%)_)] lg:[&::after]:bg-transparent"
        }
        heading={CORPORATE_HIRE}
        image={CORPORATE_HIRE.image}
      >
        <p
          className={
            "pd-hireNote text-[length:14px] text-peploe-burgundy mt-6 lg:[.pd-exclusiveHire_&]:mt-4 leading-5"
          }
        >
          {CORPORATE_HIRE.note}
        </p>
      </PrivateDiningImageSection>
      <section
        className={
          "pd-capacity py-12! bg-button-primary-pressed bg-none text-warm-cream max-sm:py-10! lg:min-h-[411px]"
        }
      >
        <div className="site-container">
          <PrivateDiningHeading {...CORPORATE_CAPACITY} />
          <ul
            className={
              "pd-capacityGrid grid gap-10 mt-10 [&_li_>_p:last-child]:text-[length:18px] [&_li_>_p:last-child]:mt-2 [&_li_>_p:last-child]:text-soft-stone [&_li:last-child_>_p:last-child]:text-[length:13px] max-sm:grid-cols-2 max-sm:gap-3 max-sm:mt-7 max-sm:[&_>_li]:grid max-sm:[&_>_li]:col-span-full max-sm:[&_>_li]:grid-cols-[40px_minmax(0,_1fr)] max-sm:[&_>_li]:gap-x-4 max-sm:[&_>_li]:gap-y-1 max-sm:[&_>_li]:py-6! max-sm:[&_>_li:nth-child(n_+_3)]:border-t max-sm:[&_>_li:nth-child(n_+_3)]:border-solid max-sm:[&_>_li:nth-child(n_+_3)]:border-t-[rgb(var(--overlay-cream-rgb)_/_25%)] max-sm:[&_>_li:nth-child(-n_+_2)]:col-auto max-sm:[&_>_li:nth-child(-n_+_2)]:grid-cols-[minmax(0,_1fr)] max-sm:[&_>_li:nth-child(-n_+_2)]:content-start max-sm:[&_>_li:nth-child(-n_+_2)]:pt-4! max-sm:[&_>_li:nth-child(-n_+_2)]:pr-4! max-sm:[&_>_li:nth-child(-n_+_2)]:pb-4! max-sm:[&_>_li:nth-child(-n_+_2)]:pl-4! max-sm:[&_>_li:nth-child(-n_+_2)]:border max-sm:[&_>_li:nth-child(-n_+_2)]:border-solid max-sm:[&_>_li:nth-child(-n_+_2)]:border-[rgb(var(--overlay-cream-rgb)_/_25%)] max-sm:[&_>_li:nth-child(-n_+_2)]:rounded-[4px] max-sm:[&_>_li:nth-child(-n_+_2)]:bg-[rgb(var(--overlay-cream-rgb)_/_4%)] max-sm:[&_>_li:nth-child(-n_+_2)]:bg-none max-sm:[&_>_li:last-child]:pb-0! max-sm:[&_>_li:last-child]:gap-y-1.5 max-sm:[&_>_li_>_:not(img)]:col-start-2 max-sm:[&_>_li_>_:not(img)]:col-end-auto max-sm:[&_>_li:nth-child(-n_+_2)_>_:not(img)]:col-start-1 max-sm:[&_>_li:nth-child(-n_+_2)_>_:not(img)]:col-end-auto max-sm:[&_li_>_p:last-child]:text-[length:16px] max-sm:[&_li_>_p:last-child]:mt-0 max-sm:[&_li:last-child_>_p:last-child]:mt-px max-sm:[&_li:nth-child(-n_+_2)_>_p:last-child]:text-[length:14px] sm:max-lg:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:mt-12 lg:[&_>_li]:inset-shadow-[1px_0_var(--soft-stone)] lg:[&_>_li]:px-[32px_20px]! lg:[&_li:last-child_>_p:last-child]:text-[length:12px] lg:[&_li:last-child_>_p:last-child]:mt-[-2px] max-sm:[&_li:last-child_>_p:last-child]:text-[length:16px] [&_li_>_p:last-child]:leading-[23px] [&_li:last-child_>_p:last-child]:leading-5 max-sm:[&_li_>_p:last-child]:leading-6 max-sm:[&_li:nth-child(-n_+_2)_>_p:last-child]:leading-5.5 max-sm:[&_li:last-child_>_p:last-child]:leading-5.5 lg:[&_li_>_p:last-child]:leading-6.5 lg:[&_li:last-child_>_p:last-child]:leading-[17px]"
            }
          >
            {CORPORATE_CAPACITY.items.map((item) => (
              <li data-scroll-reveal key={item._key}>
                <Image
                  src={item.illustration}
                  alt=""
                  width={48}
                  height={48}
                  className={
                    "pd-illustration w-12 h-12 object-contain mb-4 [.pd-benefits_&]:mx-auto max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:col-start-1 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:col-end-auto max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:row-start-1 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:row-end-[span_2] max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mt-0 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mr-0 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mb-0 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:ml-0 max-sm:[.pd-capacityGrid_&]:col-start-1 max-sm:[.pd-capacityGrid_&]:col-end-auto max-sm:[.pd-capacityGrid_&]:row-start-1 max-sm:[.pd-capacityGrid_&]:row-end-[span_3] max-sm:[.pd-capacityGrid_&]:w-10 max-sm:[.pd-capacityGrid_&]:h-10 max-sm:[.pd-capacityGrid_&]:mt-1 max-sm:[.pd-capacityGrid_&]:mr-0 max-sm:[.pd-capacityGrid_&]:mb-0 max-sm:[.pd-capacityGrid_&]:ml-0 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:row-auto max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:w-8 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:h-8 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:mt-0 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:mr-0 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:mb-2 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:ml-0 lg:[.pd-fiveFeatures_&]:mx-auto lg:[.pd-celebrationPlanning_&]:absolute lg:[.pd-celebrationPlanning_&]:left-0 lg:[.pd-celebrationPlanning_&]:top-0 lg:[.pd-celebrationPlanning_.pd-features_>_li_+_li_&]:left-7.5 lg:[.pd-capacityGrid_&]:mb-2 lg:[.pd-location_&]:absolute lg:[.pd-location_&]:top-5 lg:[.pd-location_&]:left-0 lg:[.pd-location_.pd-features_>_li_+_li_&]:left-8 max-sm:[.pd-corporatePage_.pd-location_&]:mx-auto"
                  }
                />
                <h3
                  className={cn(
                    ebGaramond.className,
                    "pd-capacityFigure text-[length:58px] whitespace-pre-line [.pd-capacityGrid_li:nth-child(n_+_3)_&]:text-[length:34px] max-sm:[.pd-capacityGrid_&]:text-[length:44px] max-sm:[.pd-capacityGrid_li:nth-child(n_+_3)_&]:text-[length:24px] lg:[.pd-capacityGrid_li:nth-child(3)_&&]:text-[length:40px] lg:[.pd-capacityGrid_li:last-child_&&]:text-[length:34px] leading-15 [.pd-capacityGrid_li:nth-child(n_+_3)_&]:leading-10 max-sm:[.pd-capacityGrid_&]:leading-11.5 max-sm:[.pd-capacityGrid_li:nth-child(n_+_3)_&]:leading-7.5 max-sm:[.pd-capacityGrid_li:nth-child(3)_&&]:leading-[31px] lg:[.pd-capacityGrid_li:nth-child(3)_&&]:leading-[41px] lg:[.pd-capacityGrid_li:last-child_&&]:leading-[35px]",
                  )}
                >
                  {item.figure}
                </h3>
                {"label" in item && (
                  <p
                    className={cn(
                      ebGaramond.className,
                      "pd-capacityLabel text-[length:30px] mt-1 [.pd-capacityGrid_li:last-child_&]:text-[length:20px] max-sm:[.pd-capacityGrid_&]:font-[family-name:inherit]! max-sm:[.pd-capacityGrid_&]:text-[length:16px] max-sm:[.pd-capacityGrid_&]:mt-0 max-sm:[.pd-capacityGrid_li:last-child_&]:font-[family-name:inherit]! max-sm:[.pd-capacityGrid_li:last-child_&]:text-[length:16px] max-sm:[.pd-capacityGrid_li:last-child_&]:mt-[5px] lg:mt-0 lg:[.pd-capacityGrid_li:last-child_&]:font-[family-name:inherit]! lg:[.pd-capacityGrid_li:last-child_&]:text-[length:18px] lg:[.pd-capacityGrid_li:last-child_&]:mt-2 lg:[.pd-capacityGrid_li:last-child_&]:text-soft-stone leading-9 [.pd-capacityGrid_li:last-child_&]:leading-6.5 max-sm:[.pd-capacityGrid_&]:leading-5.5 max-sm:[.pd-capacityGrid_li:last-child_&]:leading-5.5 lg:leading-[33px] lg:[.pd-capacityGrid_li:last-child_&]:leading-6.5",
                    )}
                  >
                    {item.label}
                  </p>
                )}
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-label="Spaces for your event">
        <ul
          className={
            "pd-spaces relative grid gap-6 [&::after]:content-[''] [&::after]:absolute [&::after]:top-auto [&::after]:right-0 [&::after]:bottom-0 [&::after]:left-0 [&::after]:border-b [&::after]:border-solid [&::after]:border-b-soft-stone [&::after]:pointer-events-none [&_>_li]:relative [&_>_li::after]:content-[''] [&_>_li::after]:absolute [&_>_li::after]:top-0 [&_>_li::after]:right-0 [&_>_li::after]:bottom-0 [&_>_li::after]:left-0 [&_>_li::after]:pointer-events-none [&_>_li::after]:inset-shadow-[0_-1px_var(--soft-stone)] lg:grid-cols-3 lg:gap-2 lg:[&_>_li::after]:inset-shadow-[-1px_-1px_var(--soft-stone)]"
          }
        >
          {CORPORATE_SPACES.map((space) => (
            <li key={space._key}>
              <div
                className={
                  "pd-spaceImage relative h-72.5 lg:h-57.5 max-sm:h-50 max-sm:[.pd-corporatePage_:is(.pd-promoImage,_&:where(.pd-spaceImage))]:h-72.5"
                }
              >
                <Image
                  src={space.image.src}
                  alt={space.image.alt}
                  fill
                  unoptimized={space.image.unoptimized}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={"pd-cover object-cover"}
                />
              </div>
              <div
                data-scroll-reveal
                className={
                  "pd-spaceCopy pt-5! pr-6! pb-5! pl-6! [&_h3]:text-[length:13px] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:mb-2 [&_p]:text-[length:16px] [&_p]:text-text-secondary lg:pt-5! lg:pr-9! lg:pb-5! lg:pl-9! lg:min-h-22 [&_h3]:leading-[17px] [&_p]:leading-[23px]"
                }
              >
                <h3>{space.title}</h3>
                <p>{space.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <PrivateDiningMenus
        className={
          "pd-corporateMenus lg:[&::after]:content-[''] lg:[&::after]:absolute lg:[&::after]:top-0 lg:[&::after]:right-0 lg:[&::after]:bottom-0 lg:[&::after]:left-0 lg:[&::after]:pointer-events-none lg:grid lg:items-center lg:overflow-hidden lg:[&::before]:content-[''] lg:[&::before]:row-start-1 lg:[&::before]:row-end-auto lg:[&::before]:col-start-1 lg:[&::before]:col-end-auto lg:[&::before]:aspect-[1440/435] lg:[&_>_div]:row-start-1 lg:[&_>_div]:row-end-auto lg:[&_>_div]:col-start-1 lg:[&_>_div]:col-end-auto lg:[&::after]:bg-[image:linear-gradient(_90deg,_rgb(242_234_229_/_0%),_rgb(242_234_229_/_50%)_33.7671%,_var(--warm-cream)_50.0927%_)] lg:[&::after]:bg-transparent"
        }
        heading={CORPORATE_MENUS}
        paragraphs={CORPORATE_MENUS.paragraphs}
        imageFirst
      />
      <PrivateDiningFeatureSection
        content={CORPORATE_LOCATION}
        className={
          "pd-location lg:py-[36px_40px]! lg:min-h-81.5 max-sm:[.pd-corporatePage_&]:text-center"
        }
      />
      <PrivateDiningEnquiry content={CORPORATE_EVENTS.enquiry} />
      <PrivateDiningClosing
        content={CORPORATE_EVENTS.closing}
        className={
          "pd-corporateClosing overflow-hidden bg-warm-cream bg-none [&_p]:text-[length:20px] [&_p]:mt-4 lg:min-h-69.5 lg:[&_p]:mt-4 lg:[&::after]:bg-[image:linear-gradient(_90deg,_rgb(9_8_6),_rgb(9_8_6_/_50%)_42.8269%,_rgb(9_8_6_/_0%)_64%_)] lg:[&::after]:bg-transparent max-sm:[&_p]:text-[length:16px] [&_p]:leading-[29px]"
        }
      />
    </div>
  );
}
