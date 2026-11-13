import { Mail, Phone } from "lucide-react";
import { TrackedAnchor } from "@/components/app/atoms/tracked-link";
import { Button } from "@/components/ui/button";
import { RESTAURANT_CONTACT } from "@/lib/constants";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import { GA4Event } from "@/lib/enums";
import type { ITableBookingSupportProps } from "@/lib/types";
import { cn } from "@/lib/utils";
export function TableBookingSupport({
  confirmation = false,
}: ITableBookingSupportProps) {
  const support = confirmation
    ? TABLE_BOOKING_CONTENT.confirmationSupport
    : TABLE_BOOKING_CONTENT.support;
  return (
    <div
      className={
        "booking-support mt-10 pt-5.5 border-t border-solid border-t-[var(--booking-border)] lg:mt-10 lg:pt-8"
      }
    >
      <div
        className={
          "booking-supportInformation grid grid-cols-[48px_minmax(0,_1fr)] gap-3.5 lg:grid-cols-[56px_minmax(0,_1fr)] lg:gap-5 lg:pl-8 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:pl-0"
        }
      >
        <span
          className={
            "booking-contactEmblem grid w-12 h-12 place-items-center rounded-[50%] bg-[var(--booking-emblem)] bg-none text-[var(--booking-accent)] lg:w-14 lg:h-14"
          }
          aria-hidden="true"
        >
          <Phone
            className={
              "booking-contactEmblemIcon w-6 h-6 stroke-[1.5] lg:w-6 lg:h-6"
            }
          />
        </span>
        <div className={undefined}>
          <h2
            className={
              "booking-supportHeading mt-0 mr-0 mb-0 ml-0 text-[length:21px] font-normal lg:text-[length:28px] leading-[25px] lg:leading-8.5"
            }
          >
            {support.heading}
          </h2>
          <p
            className={
              "booking-supportDescription whitespace-pre-line mt-1.5 text-text-secondary text-[length:12px] lg:whitespace-normal lg:mt-2 lg:text-[length:16px] max-sm:text-[length:16px] leading-[17px] lg:leading-6"
            }
          >
            {support.description}
          </p>
        </div>
      </div>
      <div
        data-button-pair
        className={
          "booking-contactActions flex flex-col gap-2 mt-3.5 lg:flex-row lg:gap-3 lg:mt-5 lg:ml-27 [@media_(min-width:_1024px)_and_(max-width:_1279px)]:ml-19"
        }
      >
        <Button
          asChild
          variant="brand-contact"
          className={cn(
            "booking-contactAction [&&]:w-full [&&]:h-11 [&&]:gap-2 [&&]:border [&&]:border-solid [&&]:border-[var(--booking-accent)] [&&]:rounded-[4px] [&&]:text-[var(--booking-accent)] [&&]:text-[length:12px] [&&]:font-medium [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-4 lg:[&&]:h-11 lg:[&&]:gap-2 lg:[&&]:border-[color-mix(in_srgb,_var(--peploe-burgundy)_25%,_transparent)] lg:[&&]:text-peploe-burgundy lg:[&&]:text-[length:16px] [&&]:leading-[17px] lg:[&&]:leading-6",
            "booking-emailAction lg:[&&]:w-45",
          )}
        >
          <TrackedAnchor
            href={`mailto:${RESTAURANT_CONTACT.email}`}
            interaction={{
              event: GA4Event.ContactClick,
              placement: "table_booking_support",
              destination: "email",
            }}
          >
            <Mail
              aria-hidden="true"
              className={
                "booking-contactActionIcon [.booking-contactAction_&&]:w-4 [.booking-contactAction_&&]:h-4 [.booking-contactAction_&&]:stroke-[1.5] lg:[.booking-contactAction_&&]:w-4 lg:[.booking-contactAction_&&]:h-4"
              }
            />
            <span className={"booking-desktopEmail hidden lg:inline"}>
              {TABLE_BOOKING_CONTENT.support.emailLabel}
            </span>
            <span className={"booking-mobileEmail lg:hidden"}>
              {RESTAURANT_CONTACT.email}
            </span>
          </TrackedAnchor>
        </Button>
        <Button
          asChild
          variant="brand-contact"
          className={cn(
            "booking-contactAction [&&]:w-full [&&]:h-11 [&&]:gap-2 [&&]:border [&&]:border-solid [&&]:border-[var(--booking-accent)] [&&]:rounded-[4px] [&&]:text-[var(--booking-accent)] [&&]:text-[length:12px] [&&]:font-medium [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-[var(--booking-accent)] [&&:focus-visible]:outline-offset-4 lg:[&&]:h-11 lg:[&&]:gap-2 lg:[&&]:border-[color-mix(in_srgb,_var(--peploe-burgundy)_25%,_transparent)] lg:[&&]:text-peploe-burgundy lg:[&&]:text-[length:16px] [&&]:leading-[17px] lg:[&&]:leading-6",
            "booking-phoneAction [&&]:-order-1 lg:[&&]:w-49 lg:[&&]:order-0",
          )}
        >
          <TrackedAnchor
            href={`tel:${RESTAURANT_CONTACT.phone}`}
            interaction={{
              event: GA4Event.ContactClick,
              placement: "table_booking_support",
              destination: "phone",
            }}
          >
            <Phone
              aria-hidden="true"
              className={
                "booking-contactActionIcon [.booking-contactAction_&&]:w-4 [.booking-contactAction_&&]:h-4 [.booking-contactAction_&&]:stroke-[1.5] lg:[.booking-contactAction_&&]:w-4 lg:[.booking-contactAction_&&]:h-4"
              }
            />
            {RESTAURANT_CONTACT.phoneLabel}
          </TrackedAnchor>
        </Button>
      </div>
    </div>
  );
}
