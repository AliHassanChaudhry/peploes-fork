import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PrivateDiningEnquiry } from "@/components/app/compounds/private-dining-enquiry";
import { PrivateDiningClosing } from "@/components/app/molecules/private-dining-closing";
import { PrivateDiningFeatures } from "@/components/app/molecules/private-dining-features";
import { PrivateDiningHeading } from "@/components/app/molecules/private-dining-heading";
import { PrivateDiningHero } from "@/components/app/molecules/private-dining-hero";
import { Button } from "@/components/ui/button";
import { FOCUS_RING, ROUTES } from "@/lib/constants";
import {
  PRIVATE_DINING,
  PRIVATE_DINING_BENEFITS,
  PRIVATE_DINING_GATHERINGS,
  PRIVATE_DINING_MENUS,
} from "@/lib/constants/private-dining";
import { ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function PrivateDining() {
  return (
    <>
      <PrivateDiningHero hero={PRIVATE_DINING.hero} variant="overview" />
      <section
        className={cn(
          "site-container",
          "pd-gatherings py-12! lg:py-12! max-sm:py-[48px_22px]!",
        )}
      >
        <PrivateDiningHeading {...PRIVATE_DINING_GATHERINGS} />
        <ul
          className={cn(
            "pd-gatheringCards grid gap-8 mt-8 sm:max-lg:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:mt-12 lg:[&_>_li]:relative lg:[&_>_li]:flex lg:[&_>_li]:flex-col lg:[&_>_li:not(:last-child)::after]:content-[''] lg:[&_>_li:not(:last-child)::after]:absolute lg:[&_>_li:not(:last-child)::after]:inset-y-0 lg:[&_>_li:not(:last-child)::after]:right-[-13px] lg:[&_>_li:not(:last-child)::after]:w-[1.3px] lg:[&_>_li:not(:last-child)::after]:opacity-70 lg:[&_>_li:not(:last-child)::after]:bg-[color-mix(_in_srgb,_var(--soft-stone),_var(--text-secondary)_15%_)] lg:[&_>_li:not(:last-child)::after]:bg-none max-sm:[&_>_li]:flex max-sm:[&_>_li]:flex-col",
            "mobile-browse-row max-sm:[&&&]:flex max-sm:[&&&]:items-stretch max-sm:[&&&]:gap-4 max-sm:[&&&]:overflow-x-auto max-sm:[&&&]:pt-1 max-sm:[&&&]:pb-4 max-sm:[&&&_[data-story-copy]]:opacity-100 max-sm:[&&&_[data-story-copy]]:transform-none max-sm:[&&&_[data-story-copy]]:transition-none max-sm:[&&&_[data-story-copy]]:duration-0 max-sm:[&&&_[data-story-copy]]:ease-[ease] max-sm:[&&&_[data-story-copy]]:[transition-delay:0s] max-sm:[&&&_[data-story-copy]]:transition-normal max-sm:[&&&_[data-story-details]]:opacity-100 max-sm:[&&&_[data-story-details]]:transform-none max-sm:[&&&_[data-story-details]]:transition-none max-sm:[&&&_[data-story-details]]:duration-0 max-sm:[&&&_[data-story-details]]:ease-[ease] max-sm:[&&&_[data-story-details]]:[transition-delay:0s] max-sm:[&&&_[data-story-details]]:transition-normal max-sm:[&&&_[data-story-details]_:is([data-story-text],_a,_button)]:pointer-events-auto",
            "mobile-browse-hideScrollbar max-sm:[scrollbar-width:none] max-sm:[&&::-webkit-scrollbar]:hidden",
            "max-sm:-mr-4",
          )}
        >
          {PRIVATE_DINING_GATHERINGS.items.map((item, index) => (
            <li
              key={item._key}
              className={
                "mobile-browse-card max-sm:[.mobile-browse-row_&&]:flex-[0_0_88%] max-sm:[.mobile-browse-row_&&]:min-w-0 max-sm:[.mobile-browse-row_&&]:min-h-[var(--browse-card-min-height,_340px)]"
              }
            >
              <Link
                href={item.href}
                aria-label={item.title}
                className={cn(
                  FOCUS_RING,
                  "pd-gatheringImage [--image-zoom-ease:ease-in-out] block relative h-95 overflow-hidden sm:max-lg:h-75 lg:h-54 max-sm:h-55",
                )}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1584px) 464px, (min-width: 1280px) calc((100vw - 192px) / 3), (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 640px) calc((100vw - 80px) / 2), calc(100vw - 48px)"
                  className={
                    "pd-cover object-cover motion-safe:[.pd-gatheringImage_&]:will-change-transform motion-safe:[.pd-gatheringImage_&]:transition-[transform] motion-safe:[.pd-gatheringImage_&]:duration-[var(--duration-base)] motion-safe:[.pd-gatheringImage_&]:ease-[var(--image-zoom-ease)] motion-safe:[.pd-gatheringImage_&]:[transition-delay:0s] motion-safe:[.pd-gatheringImage:focus-visible_&]:transform-[scale(1.05)] [@media_(hover:_hover)_and_(prefers-reduced-motion:_no-preference)]:[.pd-gatheringImage:hover_&]:transform-[scale(1.05)] sm:max-lg:[:where(.pd-gatheringImage)_&]:object-[center_bottom] sm:max-lg:[:where(.pd-gatheringCards_>_li:first-child_.pd-gatheringImage)_&&]:object-[center_90%] lg:[:where(.pd-gatheringImage)_&]:object-[center_bottom] lg:[:where(.pd-gatheringCards_>_li:first-child_.pd-gatheringImage)_&&]:object-[center_88.866%] lg:[:where(.pd-gatheringCards_>_li:nth-child(2)_.pd-gatheringImage)_&&]:object-[center_99.193%]"
                  }
                />
              </Link>
              <div
                data-scroll-reveal
                className={
                  "pd-gatheringCopy pt-5! [&_h3]:text-[length:28px] [&_h3]:mb-2 max-sm:[&_h3]:text-[length:24px] lg:pt-5! lg:pr-0! lg:pb-0! lg:pl-0! lg:ml-3 lg:min-h-61 lg:flex-1 lg:flex lg:flex-col lg:[&_h3]:text-[length:32px] lg:[&_h3]:mb-2 max-sm:flex max-sm:flex-1 max-sm:flex-col [&_h3]:leading-8.5 lg:[&_h3]:leading-8.5"
                }
              >
                <p
                  className={
                    "pd-cardNumber text-[length:14px] font-medium tracking-[0.1em] text-peploe-burgundy mb-2 lg:text-[length:12px] lg:font-normal lg:tracking-normal lg:mb-2 leading-4 lg:leading-4"
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={ebGaramond.className}>
                  {"mobileTitle" in item ? (
                    <>
                      <span
                        className={
                          "pd-desktopTitle hidden whitespace-pre-line lg:inline"
                        }
                      >
                        {item.title}
                      </span>
                      <span className={"pd-mobileTitle lg:hidden"}>
                        {item.mobileTitle}
                      </span>
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
                <p
                  className={cn(
                    ebGaramond.className,
                    "pd-cardDescription text-[length:18px] text-text-secondary lg:text-[length:18px] lg:min-h-18 max-sm:[.pd-gatheringCopy_&]:flex-1 max-sm:text-[length:16px] leading-7 lg:leading-[1.3]",
                  )}
                >
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="brand-text"
                  className={
                    "pd-cardLink [:where(.pd-gatheringCards_>_li:has(.pd-gatheringImage:focus-visible))_&]:underline [:where(.pd-gatheringCards_>_li:has(.pd-gatheringImage:focus-visible))_&]:decoration-current [@media_(hover:_hover)]:[:where(.pd-gatheringCards_>_li:has(.pd-gatheringImage:hover))_&]:underline [@media_(hover:_hover)]:[:where(.pd-gatheringCards_>_li:has(.pd-gatheringImage:hover))_&]:decoration-current motion-safe:[:where(.pd-gatheringCards_>_li:has(.pd-gatheringImage:focus-visible)_&:where(.pd-cardLink))_svg]:transform-[translateX(3px)] [@media_(hover:_hover)_and_(prefers-reduced-motion:_no-preference)]:[:where(.pd-gatheringCards_>_li:has(.pd-gatheringImage:hover)_&:where(.pd-cardLink))_svg]:transform-[translateX(3px)] [&]:pt-0! [&]:pr-0! [&]:pb-0! [&]:pl-0! [&]:mt-3 [&]:h-11 [&]:text-[length:16px] lg:[&]:mt-auto lg:[&]:self-start lg:[&]:h-11 max-sm:[.pd-gatheringCopy_&]:self-start [&]:leading-6"
                  }
                >
                  <Link href={item.href}>
                    {PRIVATE_DINING_GATHERINGS.action}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section
        className={
          "pd-benefits bg-[var(--events-pale)] bg-none py-12! max-sm:py-8!"
        }
        aria-label="Gathering at Peploe’s"
      >
        <PrivateDiningFeatures
          items={PRIVATE_DINING_BENEFITS}
          className="site-container"
        />
      </section>
      <section
        className={
          "pd-overviewMenus grid lg:grid-cols-[44.542%_minmax(0,_1fr)] lg:min-h-101"
        }
      >
        <div className={"pd-overviewMenuImage h-72.5 relative lg:h-auto"}>
          <Image
            src={PRIVATE_DINING_MENUS.image.src}
            alt={PRIVATE_DINING_MENUS.image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className={"pd-cover object-cover"}
          />
        </div>
        <div
          data-scroll-reveal
          className={
            "pd-overviewMenuCopy pt-12! pr-6! pb-12! pl-6! sm:max-lg:px-[max(24px,_calc((100vw_-_700px)_/_2))]! lg:relative lg:pt-12! lg:pr-[calc(var(--events-outer-gutter)_+_105px)]! lg:pb-12! lg:pl-12! max-sm:py-8!"
          }
        >
          <PrivateDiningHeading
            eyebrow={PRIVATE_DINING_MENUS.eyebrow}
            heading={PRIVATE_DINING_MENUS.heading}
          />
          <p
            className={cn(
              ebGaramond.className,
              "pd-menuDescription text-[length:18px] mt-6 text-text-secondary lg:mt-5 lg:text-[length:20px] max-sm:text-[length:16px] leading-7 lg:leading-6",
            )}
          >
            {PRIVATE_DINING_MENUS.description}
          </p>
          <p
            className={
              "pd-menuEligibility text-[length:16px] mt-6 text-text-secondary lg:mt-4 leading-6"
            }
          >
            {PRIVATE_DINING_MENUS.eligibility}
          </p>
          <Button
            asChild
            variant="brand-contact"
            className={
              "pd-action [&]:min-h-11 [&]:h-auto [&]:max-w-full [&]:whitespace-normal [&]:py-2.5! [&]:rounded-[4px] [&]:text-[length:16px] [&]:px-5! [.pd-heroCopy_&]:mt-7 [.pd-celebrations_.pd-heroCopy_&]:w-[223px] [.pd-celebrations_.pd-heroCopy_&]:gap-[5px] [.pd-overviewMenuCopy_&]:w-full [.pd-overviewMenuCopy_&]:mt-6 [.pd-overviewMenuCopy_&]:border-peploe-burgundy lg:[.pd-heroCopy_&]:mt-4 lg:[.pd-corporate_&]:h-12 lg:[.pd-weddings_&]:h-12 lg:[.pd-corporate_&]:w-[287px] lg:[.pd-corporate_&]:pt-[13px]! lg:[.pd-corporate_&]:pr-6! lg:[.pd-corporate_&]:pb-[13px]! lg:[.pd-corporate_&]:pl-6! lg:[.pd-corporate_&]:text-[length:18px] lg:[.pd-corporate_&]:gap-2 lg:[.pd-corporate_&]:whitespace-nowrap lg:[.pd-corporate_&_>_span]:w-[15px] lg:[.pd-overviewMenuCopy_&]:w-fit lg:[.pd-overviewMenuCopy_&]:mt-7 max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_.pd-heroCopy_&]:mt-5 [&]:leading-5.5 [.pd-celebrations_.pd-heroCopy_&]:leading-6 lg:[.pd-corporate_&]:leading-6.5"
            }
          >
            <Link href={ROUTES.GROUP_SET_MENU}>
              {PRIVATE_DINING_MENUS.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <Image
            src={PRIVATE_DINING_MENUS.illustration}
            alt=""
            width={106}
            height={222}
            className={cn(
              "pd-botanical w-26.5 h-55.5 object-contain mt-6 lg:absolute lg:right-[max(68px,_calc((100vw_-_var(--site-content-max-width))_/_2))] lg:top-[91px] lg:mt-0 lg:mr-0 lg:mb-0 lg:ml-0",
              "max-sm:mx-auto",
            )}
          />
        </div>
      </section>
      <PrivateDiningEnquiry content={PRIVATE_DINING.enquiry} compact />
      <PrivateDiningClosing
        content={PRIVATE_DINING.closing}
        imageSizes="(min-width: 1024px) 100vw, 153.85vw"
        className={
          "pd-overviewClosing min-h-128 overflow-hidden [&::after]:bg-[image:linear-gradient(_180deg,_rgb(var(--overlay-warm-ink-rgb)_/_20%),_rgb(var(--overlay-warm-ink-rgb)_/_65%)_30.5343%,_rgb(var(--overlay-warm-ink-rgb))_)] [&::after]:bg-transparent [&_p]:mt-4 lg:min-h-72 lg:[&::after]:bg-[image:linear-gradient(_90deg,_var(--ink),_color-mix(in_srgb,_var(--ink)_75%,_transparent)_50.5519%,_color-mix(in_srgb,_var(--ink)_14.902%,_transparent)_70%,_color-mix(in_srgb,_var(--ink)_40%,_transparent)_)] lg:[&::after]:bg-transparent lg:[&_p]:text-[length:18px] lg:[&_p]:mt-5 lg:[&_p]:leading-6"
        }
      />
    </>
  );
}
