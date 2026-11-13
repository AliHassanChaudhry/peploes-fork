import Image from "next/image";

import { PrivateDiningHeading } from "@/components/app/molecules/private-dining-heading";
import type { IPrivateDiningImageSectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningImageSection({
  heading,
  image,
  className,
  imageFirst = false,
  contained = false,
  children,
}: IPrivateDiningImageSectionProps) {
  return (
    <section
      className={cn(
        "pd-imageSection relative",
        imageFirst && "pd-imageFirst lg:[&]:min-h-[435px]",
        className,
      )}
    >
      <div
        className={
          "pd-promoImage relative h-72.5 overflow-hidden lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:w-[53%] lg:h-auto lg:[&::after]:content-[''] lg:[&::after]:absolute lg:[&::after]:top-0 lg:[&::after]:right-0 lg:[&::after]:bottom-0 lg:[&::after]:left-0 lg:[&::after]:bg-[image:linear-gradient(90deg,_var(--warm-cream),_transparent_65%)] lg:[&::after]:bg-transparent lg:[.pd-celebrationMenus_&]:top-0 lg:[.pd-celebrationMenus_&]:right-0 lg:[.pd-celebrationMenus_&]:bottom-0 lg:[.pd-celebrationMenus_&]:left-0 lg:[.pd-celebrationMenus_&]:w-full lg:[.pd-celebrationMenus_&::after]:bg-[image:linear-gradient(_90deg,_var(--warm-cream)_49.9073%,_rgb(242_234_229_/_50%)_66.2329%,_rgb(242_234_229_/_0%)_100%_)] lg:[.pd-celebrationMenus_&::after]:bg-transparent lg:[.pd-imageFirst_&]:right-auto lg:[.pd-imageFirst_&]:left-0 lg:[.pd-imageFirst_&]:w-1/2 lg:[.pd-imageFirst_&::after]:bg-[image:linear-gradient(270deg,_var(--warm-cream),_transparent_65%)] lg:[.pd-imageFirst_&::after]:bg-transparent lg:[.pd-exclusiveHire_&]:left-[47.5201%] lg:[.pd-exclusiveHire_&]:right-auto lg:[.pd-exclusiveHire_&]:w-[55.73985%] lg:[.pd-exclusiveHire_&::after]:hidden lg:[.pd-corporateMenus_&::after]:hidden lg:[.pd-corporateMenus_&&]:top-0 lg:[.pd-corporateMenus_&&]:right-0 lg:[.pd-corporateMenus_&&]:bottom-auto lg:[.pd-corporateMenus_&&]:left-0 lg:[.pd-corporateMenus_&&]:w-full lg:[.pd-corporateMenus_&&]:aspect-[1440/435] lg:[.pd-corporateMenus_&&]:overflow-visible lg:[.pd-weddingTasting_&]:bottom-[-6px] lg:[.pd-weddingTasting_&]:w-[calc(100%_*_604_/_1296)] lg:[.pd-weddingTasting_&&::after]:bg-[image:linear-gradient(_90deg,_color-mix(in_srgb,_var(--peploe-burgundy)_6%,_transparent),_transparent_),_linear-gradient(90deg,_var(--warm-cream),_transparent)] lg:[.pd-weddingTasting_&&::after]:bg-transparent max-sm:h-50 max-sm:[.pd-celebrationMenus_&]:h-72.5"
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={
            "pd-cover object-cover lg:[:where(.pd-menuPromo_.pd-promoImage)_&]:object-[center_22%] lg:[:where(.pd-celebrationMenus_.pd-promoImage)_&]:max-w-[57.2529%] lg:[:where(.pd-celebrationMenus_.pd-promoImage)_&]:min-h-[302.8252%] lg:[:where(.pd-celebrationMenus_.pd-promoImage)_&]:ml-[47.1079%] lg:[:where(.pd-celebrationMenus_.pd-promoImage)_&]:transform-[translateY(-11.7445%)] lg:[:where(.pd-imageFirst_.pd-promoImage)_&&]:object-[center_15%] lg:[:where(.pd-exclusiveHire_.pd-promoImage)_&]:object-[center_73%] lg:[:where(.pd-corporateMenus_.pd-promoImage)_&]:max-w-[58.291%] lg:[:where(.pd-corporateMenus_.pd-promoImage)_&]:min-h-[241.4024%] lg:[:where(.pd-corporateMenus_.pd-promoImage)_&]:ml-[-8.2922%] lg:[:where(.pd-corporateMenus_.pd-promoImage)_&]:transform-[translateY(-8.5824%)] lg:[:where(.pd-weddingTasting_.pd-promoImage)_&]:object-[center_88.19955375%] lg:[:where(.pd-weddingTasting_.pd-promoImage)_&]:origin-top-left lg:[:where(.pd-weddingTasting_.pd-promoImage)_&]:transform-[translateX(0.117681%)_scaleY(1.17505182)]"
          }
        />
      </div>
      <div className={contained ? undefined : "site-container"}>
        <div
          data-scroll-reveal
          className={
            "pd-promoCopy py-12! [.pd-weddingTasting_&]:py-8! lg:relative lg:w-[57%] lg:py-12! lg:[.pd-celebrationMenus_&]:max-w-156 lg:[.pd-imageFirst_&]:ml-[49%] lg:[.pd-imageFirst_&]:w-[51%] lg:[.pd-exclusiveHire_&]:w-[48.91975309%] lg:[.pd-exclusiveHire_&]:max-w-158.5 lg:[.pd-exclusiveHire_&]:z-1 lg:[.pd-corporateMenus_&&]:w-[48.14814815%] lg:[.pd-corporateMenus_&&]:ml-auto lg:[.pd-corporateMenus_&&]:z-1 lg:[.pd-weddingTasting_&]:relative lg:[.pd-weddingTasting_&]:w-[calc(100%_*_727_/_1296)] lg:[.pd-weddingTasting_&]:max-w-[727px] lg:[.pd-weddingTasting_&]:pt-12! lg:[.pd-weddingTasting_&]:pr-6.5! lg:[.pd-weddingTasting_&]:pb-12! lg:[.pd-weddingTasting_&]:pl-6.5! max-sm:py-8!"
          }
        >
          <PrivateDiningHeading {...heading} />
          {children}
        </div>
      </div>
    </section>
  );
}
