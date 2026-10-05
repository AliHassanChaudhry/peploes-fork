import { Slot } from "@radix-ui/react-slot";

import { buttonVariants } from "@/lib/constants/button";
import type { IButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: IButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
