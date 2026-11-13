import type { PropsWithChildren } from "react";

export function TableBookingProcessing({ children }: PropsWithChildren) {
  return (
    <div
      role="status"
      className={
        "booking-processing-processing grid justify-items-center gap-3 my-4 text-center [&&_p]:mt-0 [&&_p]:mr-0 [&&_p]:mb-0 [&&_p]:ml-0 [&&_p]:text-[var(--booking-label)] [&&_p]:text-[length:16px] [&&_p]:font-medium [&&_p]:leading-6"
      }
    >
      <p>{children}</p>
      <span
        aria-hidden="true"
        className={
          "booking-processing-circle w-9 h-9 border-[3px] border-solid border-[color-mix(in_srgb,_var(--booking-accent)_25%,_transparent)] border-t-[var(--booking-accent)] rounded-[50%] animate-spin [animation-duration:800ms] [@media_(prefers-reduced-motion:_reduce)]:animate-none"
        }
      />
    </div>
  );
}
