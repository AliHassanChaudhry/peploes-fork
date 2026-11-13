import Image from "next/image";

import { ebGaramond } from "@/lib/fonts";
import type { IPrivateDiningFeaturesProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningFeatures({
  items,
  className,
}: IPrivateDiningFeaturesProps) {
  return (
    <ul
      className={cn(
        "pd-features grid gap-10 [&_p]:text-[length:16px] [&_p]:text-text-secondary [.pd-benefits_&]:text-center [.pd-paleSection_&]:mt-10 [.pd-personalDetails_&_p]:text-inherit max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mt-8 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:gap-6 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li]:grid max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li]:grid-cols-[48px_minmax(0,_1fr)] max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li]:gap-x-4 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li]:gap-y-2 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li]:content-start max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li_+_li]:pt-6! max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li_+_li]:border-t max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li_+_li]:border-solid max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&_>_li_+_li]:border-t-soft-stone max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_:is(.pd-featureHeading,_.pd-occasionList,_&:where(.pd-features)_>_li_>_p)]:col-start-2 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_:is(.pd-featureHeading,_.pd-occasionList,_&:where(.pd-features)_>_li_>_p)]:col-end-auto sm:max-lg:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:[.pd-celebrationOccasions_&&]:mt-12 lg:[.pd-celebrationPlanning_&&]:grid-cols-3 lg:[.pd-celebrationPlanning_&&]:gap-6 lg:[.pd-celebrationPlanning_&&]:mt-12 lg:[.pd-celebrationPlanning_&_>_li]:relative lg:[.pd-celebrationPlanning_&_>_li]:min-h-23.5 lg:[.pd-celebrationPlanning_&_>_li]:px-[70px_16px]! lg:[.pd-celebrationPlanning_&_>_li_+_li]:pl-25! lg:[.pd-celebrationPlanning_&_>_li_+_li]:inset-shadow-[1px_0_var(--soft-stone)] lg:[.pd-celebrationPlanning_&_:is(h3,_p)]:max-w-[197.75px] lg:[.pd-celebrationPlanning_&_>_li:first-child_:is(h3,_p)]:max-w-[196.75px] lg:[.pd-celebrationPlanning_&_p]:text-[length:14px] lg:[.pd-location_&&]:grid-cols-[276.75fr_309.75fr_309.75fr_309.75fr] lg:[.pd-location_&&]:gap-7.5 lg:[.pd-location_&&]:mt-7 lg:[.pd-location_&_>_li]:relative lg:[.pd-location_&_>_li]:min-h-35 lg:[.pd-location_&_>_li]:pt-5! lg:[.pd-location_&_>_li]:pr-0! lg:[.pd-location_&_>_li]:pb-5! lg:[.pd-location_&_>_li]:pl-19! lg:[.pd-location_&_>_li_+_li]:pl-27! lg:[.pd-location_&_>_li_+_li]:inset-shadow-[1px_0_var(--soft-stone)] lg:[.pd-location_&_>_li:last-child]:self-start lg:[.pd-location_&_>_li:last-child]:min-h-[137px] lg:[.pd-location_&_p]:max-w-[201.75px] lg:[.pd-location_&_>_li:first-child_p]:max-w-[200.75px] max-sm:[.pd-benefits_&]:grid-cols-2 max-sm:[.pd-benefits_&]:gap-[24px_16px] max-sm:[.pd-corporatePage_.pd-location_&_p]:text-[length:16px] lg:[.pd-celebrationPlanning_&_p]:leading-5 lg:[.pd-location_&_p]:leading-5.5",
        className,
      )}
    >
      {items.map((item) => (
        <li data-scroll-reveal key={item._key}>
          {item.illustration && (
            <Image
              src={item.illustration}
              alt=""
              width={48}
              height={48}
              className={
                "pd-illustration w-12 h-12 object-contain mb-4 [.pd-benefits_&]:mx-auto max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:col-start-1 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:col-end-auto max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:row-start-1 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:row-end-[span_2] max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mt-0 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mr-0 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mb-0 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:ml-0 max-sm:[.pd-capacityGrid_&]:col-start-1 max-sm:[.pd-capacityGrid_&]:col-end-auto max-sm:[.pd-capacityGrid_&]:row-start-1 max-sm:[.pd-capacityGrid_&]:row-end-[span_3] max-sm:[.pd-capacityGrid_&]:w-10 max-sm:[.pd-capacityGrid_&]:h-10 max-sm:[.pd-capacityGrid_&]:mt-1 max-sm:[.pd-capacityGrid_&]:mr-0 max-sm:[.pd-capacityGrid_&]:mb-0 max-sm:[.pd-capacityGrid_&]:ml-0 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:row-auto max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:w-8 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:h-8 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:mt-0 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:mr-0 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:mb-2 max-sm:[.pd-capacityGrid_>_li:nth-child(-n_+_2)_&]:ml-0 lg:[.pd-fiveFeatures_&]:mx-auto lg:[.pd-celebrationPlanning_&]:absolute lg:[.pd-celebrationPlanning_&]:left-0 lg:[.pd-celebrationPlanning_&]:top-0 lg:[.pd-celebrationPlanning_.pd-features_>_li_+_li_&]:left-7.5 lg:[.pd-capacityGrid_&]:mb-2 lg:[.pd-location_&]:absolute lg:[.pd-location_&]:top-5 lg:[.pd-location_&]:left-0 lg:[.pd-location_.pd-features_>_li_+_li_&]:left-8 max-sm:[.pd-corporatePage_.pd-location_&]:mx-auto"
              }
            />
          )}
          <h3
            className={cn(
              ebGaramond.className,
              "pd-featureHeading text-[length:22px] mb-2.5 font-normal [.pd-celebrationOccasions_&]:font-medium [.pd-celebrationPlanning_&]:font-medium [.pd-benefits_&]:mb-0 [.pd-benefits_&]:font-medium [.pd-benefits_&]:whitespace-pre-line [.pd-personalFeatures_&]:mb-2 [.pd-personalFeatures_&]:font-medium [.pd-personalFeatures_&]:text-[length:23px] [.pd-weddingTouches_&]:text-[length:28px] max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:mb-0 max-sm:[.pd-celebrationPlanning_&]:text-[length:18px] lg:[.pd-benefits_&]:max-w-73.5 lg:[.pd-benefits_&]:mx-auto lg:[.pd-fiveFeatures_&]:mb-7 lg:[.pd-fiveFeatures_>_li:last-child_&]:max-w-none lg:[.pd-personalFeatures_&]:min-h-[29px] lg:[.pd-celebrationPlanning_&]:mb-1.5 lg:[.pd-location_&]:max-w-[201.75px] lg:[.pd-location_.pd-features_>_li:first-child_&]:max-w-[200.75px] lg:[.pd-location_&]:mb-1.5 lg:[.pd-weddingTouches_&]:text-[length:32px] lg:[.pd-weddingTouches_&]:mb-2 max-sm:[.pd-corporatePage_.pd-location_&]:text-[length:22px] max-sm:[.pd-benefits_&]:text-[length:18px] max-sm:[.pd-benefits_&]:whitespace-normal max-sm:[.pd-weddingTouches_&]:text-[length:26px] leading-7 [.pd-weddingTouches_&]:leading-8.5 max-sm:[:is(.pd-celebrationOccasions,_.pd-celebrationPlanning)_&]:leading-6.5 max-sm:[.pd-personalFeatures_&]:leading-6.5 lg:[.pd-benefits_&]:leading-6.5 lg:[.pd-fiveFeatures_&]:leading-[23px] lg:[.pd-personalFeatures_&]:leading-[1] lg:[.pd-celebrationPlanning_&]:leading-6 lg:[.pd-location_&]:leading-[25px] lg:[.pd-weddingTouches_&]:leading-9 max-sm:[.pd-benefits_&]:leading-6.5",
            )}
          >
            {item.heading}
          </h3>
          {/* Keep base leading on the paragraph, independent of consumer font-size utilities. */}
          {item.description && (
            <p className="leading-[23px]">{item.description}</p>
          )}
          {item.items && (
            <ul
              className={
                "pd-occasionList text-[length:16px] text-text-secondary [.pd-celebrationOccasions_&]:whitespace-pre-line [:where(.pd-celebrationOccasions_&)_>_li]:py-2! [:where(.pd-celebrationOccasions_&)_>_li_+_li]:border-t [:where(.pd-celebrationOccasions_&)_>_li_+_li]:border-solid [:where(.pd-celebrationOccasions_&)_>_li_+_li]:border-t-soft-stone list-none max-sm:[.pd-celebrationOccasions_&]:whitespace-normal max-sm:[:where(.pd-celebrationOccasions_&)_>_li:last-child]:pb-0! lg:[.pd-fiveFeatures_:is(.pd-featureHeading,_&:where(.pd-occasionList))]:max-w-[226.4px] lg:[.pd-fiveFeatures_:is(.pd-featureHeading,_&:where(.pd-occasionList))]:mx-auto leading-[23px] max-sm:[:is(.pd-celebrationOccasions,_.pd-personalDetails,_.pd-celebrationPlanning)_:is(.pd-features_p,_&:where(.pd-occasionList))]:leading-6"
              }
            >
              {item.items.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
