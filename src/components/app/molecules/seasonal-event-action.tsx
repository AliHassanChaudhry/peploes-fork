import { ArrowRight } from "lucide-react";

import styles from "@/components/app/compounds/seasonal-event.module.css";
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
      asChild
      variant="brand-text"
      className={cn(styles.textAction, className)}
    >
      <a href={href}>{content}</a>
    </Button>
  ) : (
    <Button
      type="button"
      aria-disabled="true"
      variant="brand-text"
      className={cn(styles.textAction, className)}
    >
      {content}
    </Button>
  );
}
