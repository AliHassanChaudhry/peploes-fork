import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ebGaramond } from "@/lib/fonts";
import type { IPrivateDiningHeroProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningHero({ hero, variant }: IPrivateDiningHeroProps) {
  return (
    <section
      className={cn(
        "pd-hero relative lg:min-h-[383px]",
        {
          overview:
            "pd-overview min-h-144.5 text-warm-cream flex items-end isolate [&::after]:content-[''] [&::after]:absolute [&::after]:top-0 [&::after]:right-0 [&::after]:bottom-0 [&::after]:left-0 [&::after]:-z-1 [&::after]:bg-[image:linear-gradient(_180deg,_rgb(var(--overlay-warm-ink-rgb)_/_20%),_rgb(var(--overlay-warm-ink-rgb)_/_65%)_38.4901%,_rgb(var(--overlay-warm-ink-rgb))_)] [&::after]:bg-transparent max-sm:min-h-0 max-sm:overflow-hidden max-sm:[&::after]:bg-[image:linear-gradient(_180deg,_rgb(var(--overlay-warm-ink-rgb)_/_8%)_0%,_rgb(var(--overlay-warm-ink-rgb)_/_35%)_30%,_rgb(var(--overlay-warm-ink-rgb)_/_85%)_60%,_rgb(var(--overlay-warm-ink-rgb)_/_96%)_100%_)] max-sm:[&::after]:bg-transparent lg:min-h-111 lg:items-center lg:[&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb)_/_98.0392%),_rgb(var(--overlay-warm-ink-rgb)_/_80%)_34.05472%,_rgb(var(--overlay-warm-ink-rgb)_/_18.0392%)_76.72707%,_rgb(var(--overlay-warm-ink-rgb)_/_0%)_98.36804%_)] lg:[&::after]:bg-transparent",
          corporate:
            "pd-corporate lg:[--corporate-gutter:24px] lg:[--corporate-copy-share:calc(16_/_27)] lg:min-h-98 xl:[--corporate-gutter:72px]",
          celebrations: "pd-celebrations",
          weddings: "pd-weddings lg:min-h-99.5",
        }[variant],
      )}
      aria-labelledby="private-dining-title"
    >
      <div
        className={
          "pd-heroImage relative h-80 overflow-hidden [.pd-overview_&]:absolute [.pd-overview_&]:top-0 [.pd-overview_&]:right-0 [.pd-overview_&]:bottom-0 [.pd-overview_&]:left-0 [.pd-overview_&]:h-auto [.pd-overview_&]:-z-2 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-[calc(var(--events-content-edge)_+_var(--events-content-width)_*_0.4075)] lg:h-auto lg:[.pd-celebrations_&]:left-[calc(_var(--events-content-edge)_+_min(var(--events-content-width)_*_0.4075,_528px)_)] lg:[.pd-overview_&]:top-0 lg:[.pd-overview_&]:right-0 lg:[.pd-overview_&]:bottom-0 lg:[.pd-overview_&]:left-0 lg:[.pd-corporate_&]:top-0 lg:[.pd-corporate_&]:right-[calc(_max(_var(--corporate-gutter),_(100%_-_var(--site-content-max-width))_/_2_)_+_min(100%_-_var(--corporate-gutter)_*_2,_var(--site-content-max-width))_*_var(--corporate-copy-share)_+_48px_)] lg:[.pd-corporate_&]:bottom-0 lg:[.pd-corporate_&]:left-0 lg:[.pd-weddings_&]:left-[calc(_var(--events-content-edge)_+_var(--events-content-width)_*_0.57716_)] max-sm:[.pd-celebrations_&]:h-80 max-sm:[.pd-corporatePage_&]:h-80 max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_&]:h-[clamp(160px,_28svh,_240px)]"
        }
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes={
            variant === "overview" ? "100vw" : "(min-width: 1024px) 60vw, 100vw"
          }
          className={
            "pd-cover object-cover [:where(.pd-overview_.pd-heroImage)_&]:transform-[translateX(-12.15%)_scaleX(1.515)] [:where(.pd-overview_.pd-heroImage)_&]:object-fill max-sm:[.pd-overview_.pd-heroImage_&]:object-cover max-sm:[.pd-overview_.pd-heroImage_&]:object-[58%_center] max-sm:[.pd-overview_.pd-heroImage_&]:transform-[scale(1.3)] max-sm:[.pd-overview_.pd-heroImage_&]:origin-[58%_80%] sm:max-lg:[:where(.pd-overview_.pd-heroImage)_&]:transform-none sm:max-lg:[:where(.pd-overview_.pd-heroImage)_&]:object-cover lg:[:where(.pd-celebrations_.pd-heroImage)_&]:object-[center_bottom] lg:[:where(.pd-overview_.pd-heroImage)_&]:transform-none lg:[:where(.pd-overview_.pd-heroImage)_&]:object-cover lg:[:where(.pd-overview_.pd-heroImage)_&]:object-[center_40%] lg:[:where(.pd-corporate_.pd-heroImage)_&]:transform-[scaleX(-1)] lg:[:where(.pd-corporate_.pd-heroImage)_&]:object-[center_66.25%] lg:[:where(.pd-weddings_.pd-heroImage)_&]:object-[center]"
          }
        />
      </div>
      <div className={cn("site-container", undefined)}>
        <div
          data-scroll-reveal
          className={
            "pd-heroCopy py-12! [.pd-overview_&]:max-w-115 [.pd-overview_&]:py-10! max-sm:[.pd-overview_&]:flex max-sm:[.pd-overview_&]:min-h-[calc(100svh_-_72px)] max-sm:[.pd-overview_&]:max-w-[613px] max-sm:[.pd-overview_&]:flex-col max-sm:[.pd-overview_&]:justify-end max-sm:[.pd-overview_&]:py-[40px_32px]! lg:w-[40.75%] lg:py-12! lg:pr-12! lg:[.pd-celebrations_&]:max-w-132 lg:[.pd-overview_&]:w-full lg:[.pd-overview_&]:max-w-120 lg:[.pd-overview_&]:py-20! lg:[.pd-corporate_&]:ml-auto lg:[.pd-corporate_&]:pr-0! lg:[.pd-corporate_&]:w-[calc(100%_*_var(--corporate-copy-share))] lg:[.pd-weddings_&]:w-[57.716%] lg:[.pd-weddings_&]:pr-12! max-sm:py-8! max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_&]:py-6!"
          }
        >
          <p
            className={
              "pd-eyebrow text-peploe-burgundy flex items-center gap-2.5 text-[length:14px] font-medium tracking-[0.1em] uppercase [&::before]:content-[''] [&::before]:w-12 [&::before]:h-px [&::before]:bg-current [&::before]:bg-none [&::before]:shrink-0 [:where(.pd-corporatePage)_&::before]:h-0.5 [.pd-sectionHeading_&]:mb-2 [:where(.pd-overview,_.pd-personalDetails,_.pd-capacity,_.pd-weddingHire)_&]:text-inherit [.pd-overview_&::before]:hidden max-sm:[.pd-overview_&]:text-inherit max-sm:[.pd-overview_&]:text-[length:12px] [.pd-gatherings_&&]:mb-2 [.pd-gatherings_&::before]:h-[3px] [.pd-celebrations_&::before]:h-0.5 [.pd-celebrationOccasions_&::before]:h-0.5 [.pd-celebrationPlanning_&::before]:h-0.5 [.pd-overviewMenuCopy_&&]:mb-2 [.pd-overviewMenuCopy_&::before]:h-0.5 [.pd-compactEnquiry_&::before]:h-0.5 [.pd-personalDetails_&::before]:h-0.5 [.pd-celebrationMenus_&::before]:h-0.5 [.pd-celebrationEnquiry_&::before]:h-0.5 [.pd-weddingEnquiry_&::before]:h-0.5 [.pd-compactEnquiry_&&]:mb-2 [.pd-weddingDay_&::before]:h-0.5 [.pd-weddingHire_&::before]:h-0.5 [.pd-weddingDetails_>_.pd-sectionHeading_&::before]:h-0.5 [.pd-weddingTasting_&&]:text-[length:12px] max-sm:[:is(.pd-celebrationOccasions,_.pd-personalDetails,_.pd-celebrationPlanning)_&]:mb-2 lg:[.pd-sectionHeading_&]:mb-2 lg:[.pd-gatherings_&&]:mb-2 lg:[.pd-gatherings_&::before]:h-0.5 lg:[.pd-compactEnquiry_&&]:mb-2 lg:[.pd-capacity_&&]:mb-2 lg:[.pd-location_&&]:mb-2 lg:[.pd-weddingTasting_&&]:mb-2 lg:[.pd-weddingTasting_&::before]:hidden max-sm:[.pd-corporatePage_.pd-location_&]:justify-center leading-4"
            }
          >
            {hero.eyebrow}
          </p>
          <h1
            id="private-dining-title"
            className={cn(
              ebGaramond.className,
              "pd-heroTitle text-[length:46px] font-normal whitespace-pre-line my-[8px_24px] [.pd-overview_&]:my-[8px_20px] max-sm:[.pd-overview_&]:my-[8px_0] max-sm:[.pd-overview_&]:tracking-[-1px] max-sm:[.pd-overview_&]:whitespace-normal lg:text-[length:56px] lg:my-[8px_16px] lg:[.pd-overview_&]:text-[length:62px] lg:[.pd-overview_&]:my-[8px_20px] lg:[.pd-corporate_&]:max-w-192 lg:[.pd-corporate_&]:text-[length:60px] lg:[.pd-weddings_&]:text-[length:64px] max-sm:[.pd-celebrations_&]:text-[length:30px] max-sm:[.pd-weddings_&]:text-[length:30px] max-sm:[.pd-overview_&]:text-[length:36px] max-sm:[.pd-corporate_&]:text-[length:32px] max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_&]:mb-4 max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_&]:whitespace-normal leading-12.5 max-sm:[.pd-overview_&]:leading-11 lg:leading-[55px] lg:[.pd-overview_&]:leading-[61px] lg:[.pd-corporate_&]:leading-15.5 lg:[.pd-weddings_&]:leading-[67px] max-sm:[.pd-celebrations_&]:leading-11 max-sm:[.pd-corporate_&]:leading-10 max-sm:[.pd-weddings_&]:leading-10",
            )}
          >
            {hero.heading}
          </h1>
          <p
            className={cn(
              "pd-heroDescription [:where(.pd-corporate)_&]:text-text-secondary text-[length:18px] max-sm:[.pd-overview_&]:block max-sm:[.pd-overview_&]:mt-4 max-sm:[.pd-overview_&]:text-[length:16px] [.pd-celebrations_&]:font-[family-name:var(--font-eb-garamond)]! [.pd-celebrations_&]:text-text-secondary lg:text-[length:18px] lg:[.pd-corporate_&]:max-w-192 lg:[.pd-corporate_&]:text-[length:21px] lg:[.pd-weddings_&]:text-[length:21px] max-sm:text-[length:16px] leading-7 max-sm:[.pd-overview_&]:leading-6 lg:leading-[23px] lg:[.pd-overview_&]:leading-6 lg:[.pd-corporate_&]:leading-7.5 lg:[.pd-weddings_&]:leading-7 max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_&]:leading-6",
              variant === "overview" && "hidden sm:block",
            )}
          >
            {hero.description}
          </p>
          {hero.action ? (
            <>
              {variant !== "overview" && (
                <Button
                  asChild
                  variant="brand-primary"
                  className={cn(
                    "pd-action [&]:min-h-11 [&]:h-auto [&]:max-w-full [&]:whitespace-normal [&]:py-2.5! [&]:rounded-[4px] [&]:text-[length:16px] [&]:px-5! [.pd-heroCopy_&]:mt-7 [.pd-celebrations_.pd-heroCopy_&]:w-[223px] [.pd-celebrations_.pd-heroCopy_&]:gap-[5px] [.pd-overviewMenuCopy_&]:w-full [.pd-overviewMenuCopy_&]:mt-6 [.pd-overviewMenuCopy_&]:border-peploe-burgundy lg:[.pd-heroCopy_&]:mt-4 lg:[.pd-corporate_&]:h-12 lg:[.pd-weddings_&]:h-12 lg:[.pd-corporate_&]:w-[287px] lg:[.pd-corporate_&]:pt-[13px]! lg:[.pd-corporate_&]:pr-6! lg:[.pd-corporate_&]:pb-[13px]! lg:[.pd-corporate_&]:pl-6! lg:[.pd-corporate_&]:text-[length:18px] lg:[.pd-corporate_&]:gap-2 lg:[.pd-corporate_&]:whitespace-nowrap lg:[.pd-corporate_&_>_span]:w-[15px] lg:[.pd-overviewMenuCopy_&]:w-fit lg:[.pd-overviewMenuCopy_&]:mt-7 max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_.pd-heroCopy_&]:mt-5 [&]:leading-5.5 [.pd-celebrations_.pd-heroCopy_&]:leading-6 lg:[.pd-corporate_&]:leading-6.5",
                    "sm:hidden",
                  )}
                >
                  <a href="#enquiry-form">
                    {hero.action}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="brand-primary"
                className={cn(
                  "pd-action [&]:min-h-11 [&]:h-auto [&]:max-w-full [&]:whitespace-normal [&]:py-2.5! [&]:rounded-[4px] [&]:text-[length:16px] [&]:px-5! [.pd-heroCopy_&]:mt-7 [.pd-celebrations_.pd-heroCopy_&]:w-[223px] [.pd-celebrations_.pd-heroCopy_&]:gap-[5px] [.pd-overviewMenuCopy_&]:w-full [.pd-overviewMenuCopy_&]:mt-6 [.pd-overviewMenuCopy_&]:border-peploe-burgundy lg:[.pd-heroCopy_&]:mt-4 lg:[.pd-corporate_&]:h-12 lg:[.pd-weddings_&]:h-12 lg:[.pd-corporate_&]:w-[287px] lg:[.pd-corporate_&]:pt-[13px]! lg:[.pd-corporate_&]:pr-6! lg:[.pd-corporate_&]:pb-[13px]! lg:[.pd-corporate_&]:pl-6! lg:[.pd-corporate_&]:text-[length:18px] lg:[.pd-corporate_&]:gap-2 lg:[.pd-corporate_&]:whitespace-nowrap lg:[.pd-corporate_&_>_span]:w-[15px] lg:[.pd-overviewMenuCopy_&]:w-fit lg:[.pd-overviewMenuCopy_&]:mt-7 max-sm:[:is(.pd-celebrations,_.pd-corporate,_.pd-weddings)_.pd-heroCopy_&]:mt-5 [&]:leading-5.5 [.pd-celebrations_.pd-heroCopy_&]:leading-6 lg:[.pd-corporate_&]:leading-6.5",
                  variant !== "overview" && "hidden sm:inline-flex",
                )}
              >
                <a href="#enquire">
                  {hero.action}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </Button>
            </>
          ) : (
            <span
              aria-hidden="true"
              className={
                "pd-heroRule block h-px w-11 bg-current bg-none mt-7 [.pd-overview_&]:mt-4 [.pd-overview_&]:h-0.5 max-sm:[.pd-overview_&]:hidden [.pd-closing_&]:my-[0_24px] [.pd-overviewClosing_&]:h-0.5 [.pd-overviewClosing_&]:w-9 [.pd-overviewClosing_&]:mb-4 lg:[.pd-overview_&]:mt-4 lg:[.pd-overview_&]:h-0.5 lg:[.pd-overviewClosing_&]:mb-3.5"
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
