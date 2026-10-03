"use client";

import { useReveal } from "@/hooks/use-reveal";
import type { IRevealProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  threshold,
  stagger,
}: IRevealProps) {
  const ref = useReveal<HTMLDivElement>(threshold);

  return (
    <div
      ref={ref}
      className={cn(stagger ? "reveal-stagger" : undefined, className)}
    >
      {children}
    </div>
  );
}
