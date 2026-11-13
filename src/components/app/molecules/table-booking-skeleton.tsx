export function TableBookingCalendarSkeleton() {
  return (
    <span
      aria-hidden="true"
      data-booking-skeleton="calendar"
      className={
        "booking-skeleton-calendar pointer-events-none animate-[peploes-booking-skeleton-pulse_1400ms_ease-in-out_infinite] rounded-[4px] bg-[color-mix(_in_srgb,_var(--booking-border)_75%,_var(--booking-surface)_)] bg-none block h-1.5 mt-1.5 [@media_(prefers-reduced-motion:_reduce)]:animate-none"
      }
    />
  );
}

export function TableBookingFormSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-booking-skeleton="form"
      className={
        "booking-skeleton-form grid pointer-events-none animate-[peploes-booking-skeleton-pulse_1400ms_ease-in-out_infinite] [&&_span]:block [&&_span]:rounded-[4px] [&&_span]:bg-[color-mix(_in_srgb,_var(--booking-border)_75%,_var(--booking-surface)_)] [&&_span]:bg-none gap-6 my-6 lg:grid-cols-2 [@media_(prefers-reduced-motion:_reduce)]:animate-none"
      }
    >
      <div className={"booking-skeleton-field grid gap-2"}>
        <span className={"booking-skeleton-label w-[35%] h-4"} />
        <span className={"booking-skeleton-control h-13"} />
      </div>
      <div className={"booking-skeleton-field grid gap-2"}>
        <span className={"booking-skeleton-label w-[35%] h-4"} />
        <span className={"booking-skeleton-control h-13"} />
      </div>
      <span className={"booking-skeleton-action col-span-full h-12"} />
    </div>
  );
}

export function TableBookingTimesSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-booking-skeleton="times"
      className={
        "booking-skeleton-times grid pointer-events-none animate-[peploes-booking-skeleton-pulse_1400ms_ease-in-out_infinite] [&&_span]:block [&&_span]:rounded-[4px] [&&_span]:bg-[color-mix(_in_srgb,_var(--booking-border)_75%,_var(--booking-surface)_)] [&&_span]:bg-none grid-cols-2 gap-2.5 mt-6 [&&_span]:h-11.5 [&&_span:nth-child(n_+_9)]:hidden lg:grid-cols-4 lg:gap-[12px_16px] lg:[&&_span:nth-child(n)]:block lg:[&&_span:nth-child(n)]:h-14 [@media_(prefers-reduced-motion:_reduce)]:animate-none"
      }
    >
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function TableBookingStatusSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-booking-skeleton="status"
      className={
        "booking-skeleton-status grid pointer-events-none animate-[peploes-booking-skeleton-pulse_1400ms_ease-in-out_infinite] [&&_span]:block [&&_span]:rounded-[4px] [&&_span]:bg-[color-mix(_in_srgb,_var(--booking-border)_75%,_var(--booking-surface)_)] [&&_span]:bg-none gap-2.5 my-4 [&&_span]:h-3 [&&_span:first-child]:w-[40%] [&&_span:last-child]:w-[65%] [@media_(prefers-reduced-motion:_reduce)]:animate-none"
      }
    >
      <span />
      <span />
      <span />
    </div>
  );
}

export function TableBookingPaymentSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-booking-skeleton="payment"
      className={
        "booking-skeleton-payment grid pointer-events-none animate-[peploes-booking-skeleton-pulse_1400ms_ease-in-out_infinite] [&&_span]:block [&&_span]:rounded-[4px] [&&_span]:bg-[color-mix(_in_srgb,_var(--booking-border)_75%,_var(--booking-surface)_)] [&&_span]:bg-none grid-cols-2 gap-4 [&&_span]:h-14 [&&_span:first-child]:col-span-full [&&_span:first-child]:w-[35%] [&&_span:first-child]:h-4 [&&_span:nth-child(2)]:col-span-full [@media_(prefers-reduced-motion:_reduce)]:animate-none"
      }
    >
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
