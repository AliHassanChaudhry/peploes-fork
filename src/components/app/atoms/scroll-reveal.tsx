"use client";

import { useReveal } from "@/hooks";
import type { IRevealProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  threshold,
  stagger,
}: IRevealProps) {
  const ref = useReveal(threshold);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(stagger ? "reveal-stagger" : undefined, className)}
    >
      {children}
    </div>
  );
}
