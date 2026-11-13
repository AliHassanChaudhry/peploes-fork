import { ebGaramond } from "@/lib/fonts";
import type { IPrivateDiningHeadingProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningHeading({
  eyebrow,
  heading,
  description,
  className,
}: IPrivateDiningHeadingProps) {
  return (
    <div
      data-scroll-reveal
      className={cn(
        "pd-sectionHeading [.pd-enquiryForm_&]:mb-7 lg:[.pd-personalDetails_&]:max-w-145 lg:[.pd-enquiryForm_&]:mb-7",
        className,
      )}
    >
      <p
        className={
          "pd-eyebrow text-peploe-burgundy flex items-center gap-2.5 text-[length:14px] font-medium tracking-[0.1em] uppercase [&::before]:content-[''] [&::before]:w-12 [&::before]:h-px [&::before]:bg-current [&::before]:bg-none [&::before]:shrink-0 [:where(.pd-corporatePage)_&::before]:h-0.5 [.pd-sectionHeading_&]:mb-2 [:where(.pd-overview,_.pd-personalDetails,_.pd-capacity,_.pd-weddingHire)_&]:text-inherit [.pd-overview_&::before]:hidden max-sm:[.pd-overview_&]:text-inherit max-sm:[.pd-overview_&]:text-[length:12px] [.pd-gatherings_&&]:mb-2 [.pd-gatherings_&::before]:h-[3px] [.pd-celebrations_&::before]:h-0.5 [.pd-celebrationOccasions_&::before]:h-0.5 [.pd-celebrationPlanning_&::before]:h-0.5 [.pd-overviewMenuCopy_&&]:mb-2 [.pd-overviewMenuCopy_&::before]:h-0.5 [.pd-compactEnquiry_&::before]:h-0.5 [.pd-personalDetails_&::before]:h-0.5 [.pd-celebrationMenus_&::before]:h-0.5 [.pd-celebrationEnquiry_&::before]:h-0.5 [.pd-weddingEnquiry_&::before]:h-0.5 [.pd-compactEnquiry_&&]:mb-2 [.pd-weddingDay_&::before]:h-0.5 [.pd-weddingHire_&::before]:h-0.5 [.pd-weddingDetails_>_.pd-sectionHeading_&::before]:h-0.5 [.pd-weddingTasting_&&]:text-[length:12px] max-sm:[:is(.pd-celebrationOccasions,_.pd-personalDetails,_.pd-celebrationPlanning)_&]:mb-2 lg:[.pd-sectionHeading_&]:mb-2 lg:[.pd-gatherings_&&]:mb-2 lg:[.pd-gatherings_&::before]:h-0.5 lg:[.pd-compactEnquiry_&&]:mb-2 lg:[.pd-capacity_&&]:mb-2 lg:[.pd-location_&&]:mb-2 lg:[.pd-weddingTasting_&&]:mb-2 lg:[.pd-weddingTasting_&::before]:hidden max-sm:[.pd-corporatePage_.pd-location_&]:justify-center leading-4"
        }
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          ebGaramond.className,
          "pd-heading text-[length:36px] font-normal whitespace-pre-line [.pd-enquiryForm_&]:text-[length:32px] lg:text-[length:48px] lg:[.pd-gatherings_&]:text-[length:50px] lg:[.pd-overviewMenuCopy_&]:text-[length:42px] lg:[.pd-celebrationOccasions_&]:text-[length:48px] lg:[.pd-personalDetails_&]:text-[length:48px] lg:[.pd-promoCopy_&]:text-[length:46px] lg:[.pd-enquiryIntro_&]:text-[length:44px] lg:[.pd-enquiryForm_&]:text-[length:34px] lg:[.pd-compactEnquiry_&&]:text-[length:48px] lg:[.pd-closing_&]:text-[length:44px] lg:[.pd-overviewClosing_&]:text-[length:42px] lg:[.pd-celebrationClosing_&&]:max-w-185 lg:[.pd-corporateOccasions_&&]:text-[length:60px] lg:[.pd-exclusiveHire_&&]:text-[length:52px] lg:[.pd-capacity_&]:text-[length:52px] lg:[.pd-location_&]:text-[length:48px] lg:[.pd-corporatePage_.pd-enquiryIntro_&]:text-[length:40px] lg:[.pd-weddingEnquiry_.pd-enquiryIntro_&]:text-[length:40px] lg:[.pd-corporateClosing_&]:text-[length:52px] lg:[.pd-weddingDay_&]:text-[length:52px] lg:[.pd-weddingHire_&]:max-w-136 lg:[.pd-weddingHire_&]:text-[length:52px] lg:[.pd-weddingDetails_>_.pd-sectionHeading_&]:text-[length:48px] lg:[.pd-weddingTasting_&]:text-[length:40px] lg:[.pd-weddingClosing_&]:max-w-132.5 lg:[.pd-weddingClosing_&]:text-[length:52px] max-sm:[.pd-celebrationClosing_&&]:whitespace-normal max-sm:text-[length:30px] max-sm:[.pd-celebrationClosing_&&]:text-[length:30px] max-sm:[.pd-capacity_&]:text-[length:30px] max-sm:[.pd-enquiryForm_&]:text-[length:30px] max-sm:[.pd-celebrationOccasions_&]:text-[length:30px] leading-11 [.pd-enquiryForm_&]:leading-9.5 max-sm:[.pd-capacity_&]:leading-9.5 lg:leading-13.5 lg:[.pd-gatherings_&]:leading-13 lg:[.pd-overviewMenuCopy_&]:leading-11 lg:[.pd-celebrationOccasions_&]:leading-12.5 lg:[.pd-personalDetails_&]:leading-[1.04] lg:[.pd-promoCopy_&]:leading-13 lg:[.pd-celebrationMenus_&&]:leading-12 lg:[.pd-celebrationPlanning_&]:leading-12.5 lg:[.pd-enquiryIntro_&]:leading-11.5 lg:[.pd-enquiryForm_&]:leading-[35px] lg:[.pd-compactEnquiry_&&]:leading-12.5 lg:[.pd-closing_&]:leading-12 lg:[.pd-overviewClosing_&]:leading-11 lg:[.pd-celebrationClosing_&&]:leading-11.5 lg:[.pd-corporateOccasions_&&]:leading-15.5 lg:[.pd-exclusiveHire_&&]:leading-13.5 lg:[.pd-corporateMenus_&&]:leading-12 lg:[.pd-location_&]:leading-12.5 lg:[.pd-corporatePage_.pd-enquiryIntro_&]:leading-10.5 lg:[.pd-weddingEnquiry_.pd-enquiryIntro_&]:leading-10.5 lg:[.pd-corporateClosing_&]:leading-13.5 lg:[.pd-weddingDay_&]:leading-13.5 lg:[.pd-weddingHire_&]:leading-13.5 lg:[.pd-weddingDetails_>_.pd-sectionHeading_&]:leading-12.5 lg:[.pd-weddingTasting_&]:leading-10.5 lg:[.pd-weddingClosing_&]:leading-13.5 max-sm:[.pd-celebrationClosing_&&]:leading-10 max-sm:[.pd-celebrationOccasions_&]:leading-10",
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={
            "pd-description mt-6 text-[length:18px] text-text-secondary [.pd-personalDetails_&]:text-inherit [.pd-compactEnquiry_&&]:font-[family-name:var(--font-eb-garamond)]! [.pd-compactEnquiry_&&]:mt-4 [.pd-weddingHireCopy_&]:text-inherit max-sm:[.pd-personalDetails_&]:mt-4 lg:text-[length:18px] lg:[.pd-personalDetails_&]:mt-4 lg:[.pd-enquiryIntro_&]:max-w-149.5 lg:[.pd-enquiryIntro_&]:mt-4 lg:[.pd-compactEnquiry_&&]:font-[family-name:inherit]! lg:[.pd-compactEnquiry_&&]:max-w-145 lg:[.pd-corporateOccasions_&]:max-w-324 lg:[.pd-corporateOccasions_&]:text-[length:21px] lg:[.pd-corporateOccasions_&]:mt-4 lg:[.pd-exclusiveHire_&]:mt-4 lg:[.pd-corporatePage_.pd-enquiryIntro_&]:mt-4 lg:[.pd-weddingDay_&]:text-[length:21px] lg:[.pd-weddingDay_&]:mt-4 lg:[.pd-weddingHire_&]:max-w-136 lg:[.pd-weddingHire_&]:text-[length:21px] lg:[.pd-weddingHire_&]:mt-4 lg:[.pd-weddingDetails_>_.pd-sectionHeading_&]:mt-4 lg:[.pd-weddingTasting_&]:text-[length:18px] lg:[.pd-weddingTasting_&]:mt-2 max-sm:[.pd-weddingHireCopy_&]:mt-5.5 max-sm:[.pd-weddingDetails_>_.pd-sectionHeading_&]:mt-5.5 max-sm:text-[length:16px] leading-7 max-sm:[.pd-personalDetails_&]:leading-6.5 lg:leading-[27px] lg:[.pd-personalDetails_&]:leading-[1.4] lg:[.pd-enquiryIntro_&]:leading-[23px] lg:[.pd-compactEnquiry_&&]:leading-[23px] lg:[.pd-corporateOccasions_&]:leading-7.5 lg:[.pd-exclusiveHire_&]:leading-6.5 lg:[.pd-corporatePage_.pd-enquiryIntro_&]:leading-6.5 lg:[.pd-weddingEnquiry_.pd-enquiryIntro_&]:leading-6 lg:[.pd-weddingDay_&]:leading-7 lg:[.pd-weddingHire_&]:leading-7 lg:[.pd-weddingDetails_>_.pd-sectionHeading_&]:leading-7 lg:[.pd-weddingTasting_&]:leading-[23px]"
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
