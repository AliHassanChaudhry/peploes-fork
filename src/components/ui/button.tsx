import { Slot } from "@radix-ui/react-slot";
import { cloneElement, isValidElement, type ReactNode } from "react";

import { buttonVariants } from "@/lib/constants/button";
import type { IButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

function Button({
  className,
  variant,
  size,
  asChild = false,
  hoverArea,
  children,
  ...props
}: IButtonProps) {
  const Comp = asChild ? Slot : "button";
  if (variant === "plain") {
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  const wrapContent =
    hoverArea === "content" ||
    (hoverArea !== "control" &&
      (variant === "brand-text" || variant === "brand-secondary-inverse"));
  let content = children;

  if (wrapContent) {
    const child =
      asChild && isValidElement<{ children?: ReactNode }>(children) && children;
    const label = (
      <span
        className={
          "site-button-content inline-flex min-w-0 max-w-full [flex-direction:inherit] [align-items:inherit] [justify-content:inherit] gap-[inherit] [text-decoration:inherit] decoration-inherit underline-offset-[inherit]"
        }
      >
        {child ? child.props.children : children}
      </span>
    );
    content = child ? cloneElement(child, undefined, label) : label;
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-hover-area={wrapContent ? "content" : "control"}
      className={cn(
        buttonVariants({ variant, size, className }),
        wrapContent &&
          "[@media_(hover:_hover)_and_(pointer:_fine)]:[@media_not_(any-pointer:_coarse)]:[&:not(:disabled)]:[pointer-events:var(--text-action-pointer-events,none)] [@media_(hover:_hover)_and_(pointer:_fine)]:[@media_not_(any-pointer:_coarse)]:[&:not(:disabled)_>_.site-button-content]:[pointer-events:var(--text-action-content-pointer-events,auto)]",
        variant === "brand-secondary-inverse" &&
          "[@media_(hover:_hover)_and_(pointer:_fine)]:[@media_not_(any-pointer:_coarse)]:[&:not(:disabled)]:[pointer-events:var(--text-action-pointer-events,auto)]",
      )}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { Button, buttonVariants };
