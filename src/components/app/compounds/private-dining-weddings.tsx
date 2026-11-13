import Image from "next/image";
import { PrivateDiningEnquiry } from "@/components/app/compounds/private-dining-enquiry";
import { PrivateDiningImageSection } from "@/components/app/compounds/private-dining-image-section";
import { PrivateDiningClosing } from "@/components/app/molecules/private-dining-closing";
import { PrivateDiningFeatures } from "@/components/app/molecules/private-dining-features";
import { PrivateDiningHeading } from "@/components/app/molecules/private-dining-heading";
import { PrivateDiningHero } from "@/components/app/molecules/private-dining-hero";
import {
  WEDDING_DAY,
  WEDDING_DETAILS,
  WEDDING_HIRE,
  WEDDINGS,
} from "@/lib/constants/private-dining-weddings";
import { ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function PrivateDiningWeddings() {
  return (
    <>
      <PrivateDiningHero hero={WEDDINGS.hero} variant="weddings" />
      <section
        className={cn(
          "pd-paleSection bg-[var(--events-pale)] bg-none py-12! max-sm:py-8!",
          "pd-weddingDay [--events-pale:color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream)_)] lg:min-h-[453px]",
        )}
      >
        <div className="site-container">
          <PrivateDiningHeading {...WEDDING_DAY} />
          <ol
            className={
              "pd-weddingSteps grid gap-8 mt-10 [&_h3]:text-[length:30px] [&_h3]:mb-3.5 [&_p]:text-text-secondary [&_p]:text-[length:18px] sm:max-lg:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:mt-12 lg:pt-1! lg:[&_>_li:not(:last-child)]:inset-shadow-[-1px_0_var(--soft-stone)] lg:[&_p]:text-[length:20px] lg:[&_h3]:mb-3 max-sm:[&_h3]:text-[length:26px] max-sm:[&_p]:text-[length:16px] [&_h3]:leading-9 [&_p]:leading-7 lg:[&_p]:leading-7 lg:[&_h3]:leading-[39px]"
            }
          >
            {WEDDING_DAY.items.map((item) => (
              <li data-scroll-reveal key={item._key}>
                <h3 className={ebGaramond.className}>{item.heading}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className={
          "pd-weddingHire grid bg-button-primary-pressed bg-none text-warm-cream lg:grid-cols-[minmax(0,_47fr)_minmax(0,_43fr)] lg:min-h-87"
        }
      >
        <div
          className={"pd-weddingHireImage relative h-80 lg:h-auto max-sm:h-55"}
        >
          <Image
            src={WEDDING_HIRE.image.src}
            alt={WEDDING_HIRE.image.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className={
              "pd-cover object-cover lg:[:where(.pd-weddingHireImage)_&]:object-[center]"
            }
          />
        </div>
        <PrivateDiningHeading
          {...WEDDING_HIRE}
          className={
            "pd-weddingHireCopy pt-12! pr-6! pb-12! pl-6! lg:pt-12! lg:pr-[max(48px,_calc((100vw_-_1296px)_/_2))]! lg:pb-12! lg:pl-[max(48px,_calc((100vw_-_1296px)_/_2))]! min-[90rem]:px-[72px_var(--events-outer-gutter)]! max-sm:py-8!"
          }
        />
      </section>
      <section
        className={cn(
          "site-container",
          "pd-weddingDetails [--events-pale:color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream)_)] py-12! lg:py-9! lg:min-h-[915px] max-sm:py-8!",
        )}
      >
        <PrivateDiningHeading {...WEDDING_DETAILS} />
        <PrivateDiningImageSection
          className={
            "pd-weddingTasting mt-10 lg:mt-12 lg:min-h-[249px] lg:bg-[var(--events-pale)] lg:bg-none lg:overflow-hidden"
          }
          heading={WEDDING_DETAILS.featured}
          image={WEDDING_DETAILS.featured.image}
          contained
        />
        <PrivateDiningFeatures
          items={WEDDING_DETAILS.items}
          className={
            "pd-weddingTouches grid-cols-[1fr] gap-0 [&_>_li]:py-8! [&_>_li]:border-t [&_>_li]:border-solid [&_>_li]:border-t-soft-stone [&_p]:text-[length:18px] lg:grid-cols-[minmax(0,_643.5fr)_minmax(0,_652.5fr)] lg:gap-0 lg:mt-12 lg:[&_>_li]:pt-5! lg:[&_>_li]:pr-6! lg:[&_>_li]:pb-5! lg:[&_>_li]:pl-0! lg:[&_>_li]:min-h-42.5 lg:[&_>_li]:border-0 lg:[&_>_li]:border-none lg:[&_>_li]:border-current lg:[&_>_li:nth-child(-n_+_2)]:inset-shadow-[0_-1px_var(--soft-stone)] lg:[&_>_li:nth-child(even)]:px-[32px_0]! lg:[&_>_li:nth-child(even)]:inset-shadow-[1px_0_var(--soft-stone)] lg:[&&_>_li:nth-child(2)]:shadow-[inset_1px_0_var(--soft-stone),_inset_0_-1px_var(--soft-stone)] lg:[&&_>_li:nth-child(2)]:inset-shadow-none lg:[&_>_li:nth-child(n_+_3)]:min-h-47.5 lg:[&_p]:max-w-[620.5px] lg:[&_p]:text-[length:18px] max-sm:[&_>_li]:py-7! max-sm:[&_>_li:last-child]:pb-0! max-sm:[&_p]:text-[length:16px] [&_p]:leading-7 lg:[&_p]:leading-[23px]"
          }
        />
      </section>
      <div
        className={
          "pd-weddingEnquiry [--events-pale:color-mix(_in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream)_)] bg-[var(--events-pale)] bg-none"
        }
      >
        <PrivateDiningEnquiry content={WEDDINGS.enquiry} />
      </div>
      <PrivateDiningClosing
        content={WEDDINGS.closing}
        className={
          "pd-weddingClosing lg:[&_p]:mt-4 lg:[&::after]:bg-[image:linear-gradient(_90deg,_rgb(9_8_6),_rgb(9_8_6_/_50%)_42.8269%,_rgb(9_8_6_/_0%)_64%_)] lg:[&::after]:bg-transparent lg:min-h-56 lg:[&_p]:text-[length:20px] lg:[&_p]:max-w-132.5 lg:[&_p]:leading-[29px]"
        }
      />
    </>
  );
}
