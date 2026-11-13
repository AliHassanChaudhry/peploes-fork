import Image from "next/image";

import { PrivateDiningContacts } from "@/components/app/molecules/private-dining-contacts";
import { ebGaramond } from "@/lib/fonts";
import type { IPrivateDiningClosingProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningClosing({
  content,
  imageSizes = "100vw",
  className,
}: IPrivateDiningClosingProps) {
  return (
    <section
      className={cn(
        "pd-closing relative isolate text-warm-cream min-h-90 flex items-end [&::after]:content-[''] [&::after]:absolute [&::after]:top-0 [&::after]:right-0 [&::after]:bottom-0 [&::after]:left-0 [&::after]:-z-1 [&::after]:bg-[image:linear-gradient(180deg,_rgb(0_0_0_/_8%),_rgb(0_0_0_/_75%))] [&::after]:bg-transparent [&_p]:text-[length:18px] [&_p]:mt-5 lg:min-h-62.5 lg:items-center lg:[&::after]:bg-[image:linear-gradient(90deg,_rgb(0_0_0_/_75%),_rgb(0_0_0_/_20%)_80%)] lg:[&::after]:bg-transparent lg:[&_p]:mt-5 max-sm:[&_p]:text-[length:16px] [&_p]:leading-7",
        className,
      )}
    >
      <div
        className={
          "pd-closingImage absolute top-0 right-0 bottom-0 left-0 -z-2 overflow-hidden"
        }
      >
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes={imageSizes}
          className={
            "pd-cover object-cover [:where(.pd-closing)_&]:-z-2 [:where(.pd-overviewClosing)_&]:object-fill [:where(.pd-overviewClosing)_&]:origin-top-left [:where(.pd-overviewClosing)_&]:transform-[translateX(-46.153846%)_scaleX(1.5384615)] lg:[:where(.pd-overviewClosing)_&]:object-cover lg:[:where(.pd-overviewClosing)_&]:object-[center_79.5966%] lg:[:where(.pd-overviewClosing)_&]:origin-center lg:[:where(.pd-overviewClosing)_&]:transform-[scaleY(1.2)] lg:[:where(.pd-celebrationClosing)_&]:object-[center_86.075%] lg:[:where(.pd-corporateClosing)_&]:object-[center_35%] lg:[:where(.pd-weddingClosing)_&]:object-[center_23.915%]"
          }
        />
      </div>
      <div
        data-scroll-reveal
        className={cn(
          "site-container",
          "pd-closingCopy py-10! lg:py-10! lg:[.pd-overviewClosing_&]:py-8! lg:[.pd-celebrationClosing_&]:py-12! lg:[.pd-corporateClosing_&]:py-12! lg:[.pd-weddingClosing_&]:py-12!",
        )}
      >
        {content.contacts && (
          <span
            aria-hidden="true"
            className={
              "pd-heroRule block h-px w-11 bg-current bg-none mt-7 [.pd-overview_&]:mt-4 [.pd-overview_&]:h-0.5 max-sm:[.pd-overview_&]:hidden [.pd-closing_&]:my-[0_24px] [.pd-overviewClosing_&]:h-0.5 [.pd-overviewClosing_&]:w-9 [.pd-overviewClosing_&]:mb-4 lg:[.pd-overview_&]:mt-4 lg:[.pd-overview_&]:h-0.5 lg:[.pd-overviewClosing_&]:mb-3.5"
            }
          />
        )}
        <h2
          className={cn(
            ebGaramond.className,
            "pd-heading text-[length:36px] font-normal whitespace-pre-line [.pd-enquiryForm_&]:text-[length:32px] lg:text-[length:48px] lg:[.pd-gatherings_&]:text-[length:50px] lg:[.pd-overviewMenuCopy_&]:text-[length:42px] lg:[.pd-celebrationOccasions_&]:text-[length:48px] lg:[.pd-personalDetails_&]:text-[length:48px] lg:[.pd-promoCopy_&]:text-[length:46px] lg:[.pd-enquiryIntro_&]:text-[length:44px] lg:[.pd-enquiryForm_&]:text-[length:34px] lg:[.pd-compactEnquiry_&&]:text-[length:48px] lg:[.pd-closing_&]:text-[length:44px] lg:[.pd-overviewClosing_&]:text-[length:42px] lg:[.pd-celebrationClosing_&&]:max-w-185 lg:[.pd-corporateOccasions_&&]:text-[length:60px] lg:[.pd-exclusiveHire_&&]:text-[length:52px] lg:[.pd-capacity_&]:text-[length:52px] lg:[.pd-location_&]:text-[length:48px] lg:[.pd-corporatePage_.pd-enquiryIntro_&]:text-[length:40px] lg:[.pd-weddingEnquiry_.pd-enquiryIntro_&]:text-[length:40px] lg:[.pd-corporateClosing_&]:text-[length:52px] lg:[.pd-weddingDay_&]:text-[length:52px] lg:[.pd-weddingHire_&]:max-w-136 lg:[.pd-weddingHire_&]:text-[length:52px] lg:[.pd-weddingDetails_>_.pd-sectionHeading_&]:text-[length:48px] lg:[.pd-weddingTasting_&]:text-[length:40px] lg:[.pd-weddingClosing_&]:max-w-132.5 lg:[.pd-weddingClosing_&]:text-[length:52px] max-sm:[.pd-celebrationClosing_&&]:whitespace-normal max-sm:text-[length:30px] max-sm:[.pd-celebrationClosing_&&]:text-[length:30px] max-sm:[.pd-capacity_&]:text-[length:30px] max-sm:[.pd-enquiryForm_&]:text-[length:30px] max-sm:[.pd-celebrationOccasions_&]:text-[length:30px] leading-11 [.pd-enquiryForm_&]:leading-9.5 max-sm:[.pd-capacity_&]:leading-9.5 lg:leading-13.5 lg:[.pd-gatherings_&]:leading-13 lg:[.pd-overviewMenuCopy_&]:leading-11 lg:[.pd-celebrationOccasions_&]:leading-12.5 lg:[.pd-personalDetails_&]:leading-[1.04] lg:[.pd-promoCopy_&]:leading-13 lg:[.pd-celebrationMenus_&&]:leading-12 lg:[.pd-celebrationPlanning_&]:leading-12.5 lg:[.pd-enquiryIntro_&]:leading-11.5 lg:[.pd-enquiryForm_&]:leading-[35px] lg:[.pd-compactEnquiry_&&]:leading-12.5 lg:[.pd-closing_&]:leading-12 lg:[.pd-overviewClosing_&]:leading-11 lg:[.pd-celebrationClosing_&&]:leading-11.5 lg:[.pd-corporateOccasions_&&]:leading-15.5 lg:[.pd-exclusiveHire_&&]:leading-13.5 lg:[.pd-corporateMenus_&&]:leading-12 lg:[.pd-location_&]:leading-12.5 lg:[.pd-corporatePage_.pd-enquiryIntro_&]:leading-10.5 lg:[.pd-weddingEnquiry_.pd-enquiryIntro_&]:leading-10.5 lg:[.pd-corporateClosing_&]:leading-13.5 lg:[.pd-weddingDay_&]:leading-13.5 lg:[.pd-weddingHire_&]:leading-13.5 lg:[.pd-weddingDetails_>_.pd-sectionHeading_&]:leading-12.5 lg:[.pd-weddingTasting_&]:leading-10.5 lg:[.pd-weddingClosing_&]:leading-13.5 max-sm:[.pd-celebrationClosing_&&]:leading-10 max-sm:[.pd-celebrationOccasions_&]:leading-10",
          )}
        >
          {content.heading}
        </h2>
        <p className="hidden sm:block">{content.description}</p>
        {content.contacts && <PrivateDiningContacts />}
      </div>
    </section>
  );
}
