import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PrivateDiningImageSection } from "@/components/app/compounds/private-dining-image-section";
import { Button } from "@/components/ui/button";
import {
  PRIVATE_DINING_MENU_IMAGE,
  PRIVATE_DINING_MENU_LINKS,
} from "@/lib/constants/private-dining";
import { ebGaramond } from "@/lib/fonts";
import type { IPrivateDiningMenuProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningMenus({
  heading,
  paragraphs,
  imageFirst = false,
  className,
}: IPrivateDiningMenuProps) {
  return (
    <PrivateDiningImageSection
      className={cn("pd-menuPromo lg:min-h-[373px]", className)}
      heading={heading}
      image={PRIVATE_DINING_MENU_IMAGE}
      imageFirst={imageFirst}
    >
      <div
        className={cn(
          ebGaramond.className,
          "pd-menuDescriptions grid gap-5 mt-6 text-[length:18px] [.pd-celebrationMenus_&]:text-text-secondary [.pd-corporateMenus_&]:text-text-secondary lg:max-w-175 lg:mt-6 lg:[.pd-celebrationMenus_&]:mt-4 lg:[.pd-corporateMenus_&]:mt-4 lg:[.pd-corporateMenus_&]:gap-4 max-sm:text-[length:16px] leading-7 lg:leading-[23px]",
        )}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ul
        className={
          "pd-menuLinks grid gap-4 mt-7 [&_>_li]:border [&_>_li]:border-solid [&_>_li]:border-soft-stone [&_>_li]:pt-4.5! [&_>_li]:pr-5! [&_>_li]:pb-2! [&_>_li]:pl-5! [&_h3]:text-[length:24px] [&_a]:pt-0! [&_a]:pr-0! [&_a]:pb-0! [&_a]:pl-0! [&_a]:text-[length:16px] [&_a]:min-h-11 [.pd-celebrationMenus_&_>_li]:border-0 [.pd-celebrationMenus_&_>_li]:border-none [.pd-celebrationMenus_&_>_li]:border-current [.pd-celebrationMenus_&_>_li]:rounded-[2px] [.pd-celebrationMenus_&_>_li]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] [.pd-celebrationMenus_&_a]:gap-[5px] [.pd-corporateMenus_&_>_li]:border-0 [.pd-corporateMenus_&_>_li]:border-none [.pd-corporateMenus_&_>_li]:border-current [.pd-corporateMenus_&_>_li]:rounded-[2px] [.pd-corporateMenus_&_>_li]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] sm:max-lg:grid-cols-2 lg:grid-cols-2 lg:max-w-150 lg:gap-4 lg:mt-7 lg:[&_h3]:font-[family-name:inherit]! lg:[&_h3]:text-[length:13px] lg:[&_>_li]:pt-1.5! lg:[&_>_li]:pr-4! lg:[&_>_li]:pb-1.5! lg:[&_>_li]:pl-4! lg:[&_>_li]:border-peploe-burgundy lg:[&_>_li]:text-center lg:[&_a]:text-[length:16px] lg:[&_a]:mx-auto lg:[.pd-celebrationMenus_&]:max-w-none lg:[.pd-celebrationMenus_&]:gap-8 lg:[.pd-celebrationMenus_&]:mt-12 lg:[.pd-celebrationMenus_&_>_li]:pt-[7px]! lg:[.pd-celebrationMenus_&_>_li]:pr-0! lg:[.pd-celebrationMenus_&_>_li]:pb-[7px]! lg:[.pd-celebrationMenus_&_>_li]:pl-0! lg:[.pd-corporateMenus_&]:max-w-none lg:[.pd-corporateMenus_&]:mt-12 lg:[.pd-corporateMenus_&]:gap-8 lg:[.pd-corporateMenus_&_>_li]:pt-[7px]! lg:[.pd-corporateMenus_&_>_li]:pr-0! lg:[.pd-corporateMenus_&_>_li]:pb-[7px]! lg:[.pd-corporateMenus_&_>_li]:pl-0! lg:[.pd-corporateMenus_&_a]:gap-[5px] [&_h3]:leading-7.5 [.pd-celebrationMenus_&_a]:leading-6 lg:[&_h3]:leading-5 lg:[.pd-celebrationMenus_&_h3]:leading-[17px] lg:[.pd-corporateMenus_&_h3]:leading-[17px] lg:[.pd-corporateMenus_&_a]:leading-6"
        }
      >
        {PRIVATE_DINING_MENU_LINKS.map((menu) => (
          <li key={menu.href}>
            <h3 className={ebGaramond.className}>{menu.title}</h3>
            <Button asChild variant="brand-text">
              <Link href={menu.href}>
                {menu.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </PrivateDiningImageSection>
  );
}
