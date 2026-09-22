import type { IFieldErrorProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FieldError({ errors, className }: IFieldErrorProps) {
  if (!errors?.length) return null;

  return (
    <p className={cn("text-xs text-red-600", className)} role="alert">
      {errors[0]}
    </p>
  );
}
