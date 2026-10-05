import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FOOTER_STYLES, MOBILE_FOOTER_CONTENT } from "@/lib/constants/footer";
import { ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function MobileFooterNavigation() {
  return (
    <div className={cn(FOOTER_STYLES.mobileDivider, "order-3 xl:hidden")}>
      {MOBILE_FOOTER_CONTENT.navigation.map(({ heading, labels }) => (
        <nav
          key={heading}
          aria-label={heading}
          className="not-first:shadow-[inset_0_1px_0_var(--soft-stone)]"
        >
          <h2
            className={cn(
              ebGaramond.className,
              "flex h-[52px] items-center justify-between border-b border-soft-stone text-xl leading-[26px] font-medium",
            )}
          >
            {heading}
            <ChevronRight
              aria-hidden="true"
              className="size-4 text-peploe-burgundy"
            />
          </h2>
          <ul className="pt-1 pb-3">
            {labels.map((label) => (
              <li key={label}>
                <Button
                  type="button"
                  variant="brand-nav"
                  aria-disabled="true"
                  className="h-11 w-full justify-start rounded-none p-0 text-base leading-[22px] font-normal text-text-secondary"
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}
