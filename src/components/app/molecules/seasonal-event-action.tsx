import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ISeasonalEventActionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SeasonalEventAction({
  label,
  href,
  className,
}: ISeasonalEventActionProps) {
  const content = (
    <>
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </>
  );

  return href ? (
    <Button
      data-card-action
      asChild
      variant="brand-text"
      className={cn(
        "justify-start gap-2 h-auto min-h-11 mt-3 px-0 py-2 rounded-none text-base leading-6 whitespace-normal text-left lg:min-h-10 lg:[article_&]:mt-[9px] max-sm:[[aria-labelledby=event-related]_li_&]:text-[length:15px]",
        className,
      )}
    >
      <Link href={href as Route}>{content}</Link>
    </Button>
  ) : (
    <Button
      type="button"
      aria-disabled="true"
      variant="brand-text"
      className={cn(
        "justify-start gap-2 h-auto min-h-11 mt-3 px-0 py-2 rounded-none text-base leading-6 whitespace-normal text-left lg:min-h-10 lg:[article_&]:mt-[9px] max-sm:[[aria-labelledby=event-related]_li_&]:text-[length:15px]",
        className,
      )}
    >
      {content}
    </Button>
  );
}
