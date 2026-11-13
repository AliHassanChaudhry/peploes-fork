import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/app/atoms/tracked-link";
import { Button } from "@/components/ui/button";
import { RESTAURANT_CONTACT, ROUTES } from "@/lib/constants";
import { VISIT_CONTACT_DETAILS } from "@/lib/constants/visit-contact-details";
import { GA4Event } from "@/lib/enums";
import { cn } from "@/lib/utils";

export function VisitContactDetails() {
  return (
    <>
      <section
        aria-labelledby="visit-reservation-heading"
        className={
          "visit-detail-reservation pt-12 pb-12 bg-peploe-burgundy bg-none text-warm-cream xl:pt-13 xl:pb-13"
        }
      >
        <div
          data-scroll-reveal
          className={cn(
            "site-container",
            "visit-detail-reservationGrid grid gap-9 max-sm:gap-7 xl:grid-cols-[minmax(0,_1fr)_450px] xl:items-center xl:gap-16",
          )}
        >
          <div>
            <p
              className={
                "visit-detail-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase mb-2 [&&::before]:content-[''] [&&::before]:flex-[0_0_48px] [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [.visit-detail-reservation_&&]:text-inherit max-sm:mb-2 max-sm:text-[length:12px] xl:[.visit-detail-reservation_&&]:mb-2 xl:[.visit-detail-practicalities_&&]:mb-2 xl:[.visit-detail-dining_&&]:mb-2 leading-4 max-sm:leading-4.5"
              }
            >
              {VISIT_CONTACT_DETAILS.reservation.eyebrow}
            </p>
            <h2
              id="visit-reservation-heading"
              className={
                "visit-detail-heading font-[family-name:var(--font-eb-garamond),_serif] font-normal text-[length:44px] sm:text-[length:52px] xl:text-[length:60px] max-sm:text-[length:30px] leading-11.5 max-sm:leading-11 sm:leading-13.5 xl:leading-16"
              }
            >
              {VISIT_CONTACT_DETAILS.reservation.heading}
            </h2>
            <p
              className={
                "visit-detail-description mt-4 text-[length:18px] text-text-secondary [.visit-detail-reservation_&&]:text-inherit max-sm:text-[length:16px] xl:[.visit-detail-reservation_&&]:mt-5 xl:[.visit-detail-practicalities_&&]:mt-5 xl:[.visit-detail-reservation_&&]:max-w-195.5 leading-6.5 max-sm:leading-6"
              }
            >
              {VISIT_CONTACT_DETAILS.reservation.description}
            </p>
          </div>
          <div
            className={
              "visit-detail-reservationActions flex flex-col items-center gap-5 min-w-0 [&&_a:focus-visible]:outline-2 [&&_a:focus-visible]:outline-solid [&&_a:focus-visible]:outline-warm-cream [&&_a:focus-visible]:outline-offset-4 [&&_button:focus-visible]:outline-2 [&&_button:focus-visible]:outline-solid [&&_button:focus-visible]:outline-warm-cream [&&_button:focus-visible]:outline-offset-4 max-sm:gap-3 sm:max-w-112.5 xl:max-w-none xl:pl-14 xl:inset-shadow-[1px_0_var(--warm-cream)]"
            }
          >
            <Button
              asChild
              variant="brand-primary-inverse"
              className={
                "visit-detail-bookingButton [.visit-detail-reservationActions_&&]:h-auto [.visit-detail-reservationActions_&&]:min-h-12 [.visit-detail-reservationActions_&&]:w-full [.visit-detail-reservationActions_&&]:rounded-[4px] [.visit-detail-reservationActions_&&]:pt-3 [.visit-detail-reservationActions_&&]:pr-5 [.visit-detail-reservationActions_&&]:pb-3 [.visit-detail-reservationActions_&&]:pl-5 [.visit-detail-reservationActions_&&]:text-[length:18px] [.visit-detail-reservationActions_&&]:leading-6 [.visit-detail-reservationActions_&&]:whitespace-normal [.visit-detail-reservationActions_&&]:text-center max-sm:[.visit-detail-reservationActions_&&]:min-h-12 max-sm:[.visit-detail-reservationActions_&&]:pl-4 max-sm:[.visit-detail-reservationActions_&&]:pr-4 max-sm:[.visit-detail-reservationActions_&&]:text-[length:16px] max-sm:[.visit-detail-reservationActions_&&]:leading-6 xl:[.visit-detail-reservationActions_&&]:h-12"
              }
            >
              <TrackedLink
                href={ROUTES.BOOK_A_TABLE}
                interaction={{
                  event: GA4Event.BookingClick,
                  placement: "visit_contact_details",
                }}
              >
                {VISIT_CONTACT_DETAILS.reservation.bookingLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </TrackedLink>
            </Button>
            <Button
              asChild
              variant="brand-secondary-inverse"
              className={
                "visit-detail-phoneButton [.visit-detail-reservationActions_&&]:h-auto [.visit-detail-reservationActions_&&]:min-h-12 [.visit-detail-reservationActions_&&]:w-full [.visit-detail-reservationActions_&&]:rounded-[4px] [.visit-detail-reservationActions_&&]:pt-3 [.visit-detail-reservationActions_&&]:pr-5 [.visit-detail-reservationActions_&&]:pb-3 [.visit-detail-reservationActions_&&]:pl-5 [.visit-detail-reservationActions_&&]:text-[length:18px] [.visit-detail-reservationActions_&&]:whitespace-normal [.visit-detail-reservationActions_&&]:text-center [.visit-detail-reservationActions_&&]:border-0 [.visit-detail-reservationActions_&&]:border-none [.visit-detail-reservationActions_&&]:border-current [.visit-detail-reservationActions_&&]:inset-shadow-[0_0_0_1px_var(--warm-cream)] [.visit-detail-reservationActions_&&:hover]:bg-[color-mix(in_srgb,_var(--warm-cream)_12%,_transparent)] [.visit-detail-reservationActions_&&:hover]:bg-none [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-1 [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-solid [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-[CanvasText] [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:-outline-offset-1 max-sm:[.visit-detail-reservationActions_&&]:min-h-12 max-sm:[.visit-detail-reservationActions_&&]:pl-4 max-sm:[.visit-detail-reservationActions_&&]:pr-4 max-sm:[.visit-detail-reservationActions_&&]:text-[length:16px] [.visit-detail-reservationActions_&&]:leading-6 max-sm:[.visit-detail-reservationActions_&&]:leading-6"
              }
            >
              <TrackedAnchor
                href={`tel:${RESTAURANT_CONTACT.phone}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "visit_contact_details",
                  destination: "phone",
                }}
              >
                <Image
                  src={VISIT_CONTACT_DETAILS.reservation.phoneIcon}
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                {VISIT_CONTACT_DETAILS.reservation.phoneLabel}
              </TrackedAnchor>
            </Button>
            <Button
              asChild
              variant="brand-text"
              className={
                "visit-detail-emailLink [.visit-detail-reservationActions_&&]:min-h-11 [.visit-detail-reservationActions_&&]:h-auto [.visit-detail-reservationActions_&&]:max-w-full [.visit-detail-reservationActions_&&]:pt-0 [.visit-detail-reservationActions_&&]:pr-0 [.visit-detail-reservationActions_&&]:pb-0 [.visit-detail-reservationActions_&&]:pl-0 [.visit-detail-reservationActions_&&]:text-warm-cream [.visit-detail-reservationActions_&&]:text-[length:18px] [.visit-detail-reservationActions_&&]:font-normal [.visit-detail-reservationActions_&&]:leading-[27px] [.visit-detail-reservationActions_&&]:no-underline [.visit-detail-reservationActions_&&]:decoration-solid [.visit-detail-reservationActions_&&]:decoration-current [.visit-detail-reservationActions_&&]:decoration-auto [.visit-detail-reservationActions_&&]:whitespace-normal max-sm:[.visit-detail-reservationActions_&&]:text-[length:16px] max-sm:[.visit-detail-reservationActions_&&]:leading-6 xl:[.visit-detail-reservationActions_&&]:min-h-[27px]"
              }
            >
              <TrackedAnchor
                href={`mailto:${RESTAURANT_CONTACT.email}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "visit_contact_details",
                  destination: "email",
                }}
              >
                <span
                  className={
                    "visit-detail-emailLabel underline decoration-1 decoration-current underline-offset-5 [text-decoration-skip-ink:auto] [.visit-detail-emailLink:hover_&&]:decoration-[1.5px]"
                  }
                >
                  {VISIT_CONTACT_DETAILS.reservation.emailLabel}
                </span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </TrackedAnchor>
            </Button>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="visit-dining-heading"
        className={
          "visit-detail-dining pt-12 pb-12 bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none max-sm:pb-6"
        }
      >
        <div className="site-container">
          <div
            data-scroll-reveal
            className={
              "visit-detail-diningIntro grid gap-6 max-sm:gap-4 xl:grid-cols-[minmax(0,_654fr)_minmax(0,_578fr)] xl:items-center xl:gap-16"
            }
          >
            <div>
              <p
                className={
                  "visit-detail-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase mb-2 [&&::before]:content-[''] [&&::before]:flex-[0_0_48px] [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [.visit-detail-reservation_&&]:text-inherit max-sm:mb-2 max-sm:text-[length:12px] xl:[.visit-detail-reservation_&&]:mb-2 xl:[.visit-detail-practicalities_&&]:mb-2 xl:[.visit-detail-dining_&&]:mb-2 leading-4 max-sm:leading-4.5"
                }
              >
                {VISIT_CONTACT_DETAILS.dining.eyebrow}
              </p>
              <h2
                id="visit-dining-heading"
                className={
                  "visit-detail-heading font-[family-name:var(--font-eb-garamond),_serif] font-normal text-[length:44px] sm:text-[length:52px] xl:text-[length:60px] max-sm:text-[length:30px] leading-11.5 max-sm:leading-11 sm:leading-13.5 xl:leading-16"
                }
              >
                {VISIT_CONTACT_DETAILS.dining.heading}
              </h2>
            </div>
            <p
              className={
                "visit-detail-diningDescription text-text-secondary text-[length:18px] max-sm:text-[length:16px] leading-[27px] max-sm:leading-6"
              }
            >
              {VISIT_CONTACT_DETAILS.dining.description}
            </p>
          </div>
          <ul
            className={
              "visit-detail-services grid gap-7 mt-10 max-sm:gap-6 max-sm:mt-8 sm:grid-cols-2 sm:gap-[32px_0] xl:grid-cols-[minmax(0,_323.25fr)_repeat(3,_minmax(0,_324.25fr))] xl:gap-0"
            }
          >
            {VISIT_CONTACT_DETAILS.dining.services.map((service) => (
              <li
                data-scroll-reveal
                className={
                  "visit-detail-service flex flex-col items-center gap-3 min-w-0 text-center [.visit-detail-service_+_&&]:border-t [.visit-detail-service_+_&&]:[border-top-style:solid] [.visit-detail-service_+_&&]:border-t-soft-stone [.visit-detail-service_+_&&]:pt-7 max-sm:grid max-sm:grid-cols-[48px_minmax(0,_1fr)] max-sm:items-start max-sm:gap-[6px_16px] max-sm:text-left max-sm:[.visit-detail-service_+_&&]:pt-6 sm:border-t-0 sm:[border-top-style:none] sm:border-t-current sm:pt-0 sm:pr-5 sm:pb-0 sm:pl-5 sm:[.visit-detail-service_+_&&]:border-t-0 sm:[.visit-detail-service_+_&&]:[border-top-style:none] sm:[.visit-detail-service_+_&&]:border-t-current sm:[.visit-detail-service_+_&&]:pt-0 sm:[.visit-detail-service_+_&&]:pr-5 sm:[.visit-detail-service_+_&&]:pb-0 sm:[.visit-detail-service_+_&&]:pl-5 sm:[&&:nth-child(even)]:border-l sm:[&&:nth-child(even)]:[border-left-style:solid] sm:[&&:nth-child(even)]:border-l-soft-stone xl:pt-0 xl:pr-5 xl:pb-0 xl:pl-5 xl:[.visit-detail-service_+_&&]:pt-0 xl:[.visit-detail-service_+_&&]:pr-5 xl:[.visit-detail-service_+_&&]:pb-0 xl:[.visit-detail-service_+_&&]:pl-5 xl:[.visit-detail-service_+_&&]:border-l-0 xl:[.visit-detail-service_+_&&]:[border-left-style:none] xl:[.visit-detail-service_+_&&]:border-l-current xl:[.visit-detail-service_+_&&]:inset-shadow-[1px_0_var(--soft-stone)]"
                }
                key={service.heading}
              >
                <Image
                  src={service.icon}
                  alt=""
                  width={48}
                  height={48}
                  className={
                    "visit-detail-serviceIcon flex-[0_0_auto] max-sm:col-start-1 max-sm:col-end-auto max-sm:row-start-1 max-sm:row-end-[4]"
                  }
                />
                <h3
                  className={
                    "visit-detail-serviceHeading font-[family-name:var(--font-eb-garamond),_serif] font-normal text-[length:28px] max-sm:col-start-2 max-sm:col-end-auto max-sm:text-[length:22px] leading-8.5 max-sm:leading-6.5"
                  }
                >
                  {service.heading}
                </h3>
                <p
                  className={
                    "visit-detail-serviceHours font-[family-name:var(--font-eb-garamond),_serif] font-normal text-[length:26px] max-sm:col-start-2 max-sm:col-end-auto max-sm:text-[length:18px] leading-8.5 max-sm:leading-6.5"
                  }
                >
                  {service.hours}
                </p>
                {service.detail && (
                  <p
                    className={
                      "visit-detail-serviceDetail text-text-secondary text-[length:18px] max-sm:col-start-2 max-sm:col-end-auto max-sm:text-[length:16px] leading-[27px] max-sm:leading-5.5"
                    }
                  >
                    {service.detail}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div
        className={cn(
          "site-container",
          "visit-detail-practicalities grid gap-10 pt-12 pb-12 max-sm:gap-[29px] max-sm:pt-[29px] max-sm:pb-[29px] xl:grid-cols-[minmax(0,_608.5fr)_minmax(0,_591.5fr)] xl:gap-24 xl:[&&_>_section]:min-h-67.5",
        )}
      >
        <section
          data-scroll-reveal
          aria-labelledby="visit-accessibility-heading"
        >
          <p
            className={
              "visit-detail-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase mb-2 [&&::before]:content-[''] [&&::before]:flex-[0_0_48px] [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [.visit-detail-reservation_&&]:text-inherit max-sm:mb-2 max-sm:text-[length:12px] xl:[.visit-detail-reservation_&&]:mb-2 xl:[.visit-detail-practicalities_&&]:mb-2 xl:[.visit-detail-dining_&&]:mb-2 leading-4 max-sm:leading-4.5"
            }
          >
            {VISIT_CONTACT_DETAILS.accessibility.eyebrow}
          </p>
          <h2
            id="visit-accessibility-heading"
            className={
              "visit-detail-heading font-[family-name:var(--font-eb-garamond),_serif] font-normal text-[length:44px] sm:text-[length:52px] xl:text-[length:60px] max-sm:text-[length:30px] leading-11.5 max-sm:leading-11 sm:leading-13.5 xl:leading-16"
            }
          >
            {VISIT_CONTACT_DETAILS.accessibility.heading}
          </h2>
          <p
            className={
              "visit-detail-description mt-4 text-[length:18px] text-text-secondary [.visit-detail-reservation_&&]:text-inherit max-sm:text-[length:16px] xl:[.visit-detail-reservation_&&]:mt-5 xl:[.visit-detail-practicalities_&&]:mt-5 xl:[.visit-detail-reservation_&&]:max-w-195.5 leading-6.5 max-sm:leading-6"
            }
          >
            {VISIT_CONTACT_DETAILS.accessibility.description}
          </p>
        </section>
        <section
          data-scroll-reveal
          aria-labelledby="visit-gatherings-heading"
          className={
            "visit-detail-gatherings border-t [border-top-style:solid] border-t-soft-stone pt-10 max-sm:pt-[29px] xl:relative xl:pt-0 xl:border-t-0 xl:[border-top-style:none] xl:border-t-current xl:[&&::before]:content-[''] xl:[&&::before]:absolute xl:[&&::before]:top-0 xl:[&&::before]:bottom-0 xl:[&&::before]:-left-12 xl:[&&::before]:w-px xl:[&&::before]:bg-soft-stone xl:[&&::before]:bg-none"
          }
        >
          <p
            className={
              "visit-detail-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase mb-2 [&&::before]:content-[''] [&&::before]:flex-[0_0_48px] [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [.visit-detail-reservation_&&]:text-inherit max-sm:mb-2 max-sm:text-[length:12px] xl:[.visit-detail-reservation_&&]:mb-2 xl:[.visit-detail-practicalities_&&]:mb-2 xl:[.visit-detail-dining_&&]:mb-2 leading-4 max-sm:leading-4.5"
            }
          >
            {VISIT_CONTACT_DETAILS.gatherings.eyebrow}
          </p>
          <h2
            id="visit-gatherings-heading"
            className={
              "visit-detail-heading font-[family-name:var(--font-eb-garamond),_serif] font-normal text-[length:44px] sm:text-[length:52px] xl:text-[length:60px] max-sm:text-[length:30px] leading-11.5 max-sm:leading-11 sm:leading-13.5 xl:leading-16"
            }
          >
            {VISIT_CONTACT_DETAILS.gatherings.heading}
          </h2>
          <p
            className={
              "visit-detail-description mt-4 text-[length:18px] text-text-secondary [.visit-detail-reservation_&&]:text-inherit max-sm:text-[length:16px] xl:[.visit-detail-reservation_&&]:mt-5 xl:[.visit-detail-practicalities_&&]:mt-5 xl:[.visit-detail-reservation_&&]:max-w-195.5 leading-6.5 max-sm:leading-6"
            }
          >
            {VISIT_CONTACT_DETAILS.gatherings.description}
          </p>
          <Button
            asChild
            variant="brand-contact"
            className={
              "visit-detail-gatheringsButton [.visit-detail-gatherings_&&]:h-auto [.visit-detail-gatherings_&&]:min-h-12 [.visit-detail-gatherings_&&]:w-full [.visit-detail-gatherings_&&]:rounded-[4px] [.visit-detail-gatherings_&&]:pt-3 [.visit-detail-gatherings_&&]:pr-5 [.visit-detail-gatherings_&&]:pb-3 [.visit-detail-gatherings_&&]:pl-5 [.visit-detail-gatherings_&&]:text-[length:18px] [.visit-detail-gatherings_&&]:whitespace-normal [.visit-detail-gatherings_&&]:text-center [.visit-detail-gatherings_&&]:mt-5 [.visit-detail-gatherings_&&]:border-0 [.visit-detail-gatherings_&&]:border-none [.visit-detail-gatherings_&&]:border-current [.visit-detail-gatherings_&&]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] [.visit-detail-gatherings_&&]:gap-1.5 [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-peploe-burgundy [&&:focus-visible]:outline-offset-4 [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-1 [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-solid [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-[CanvasText] [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:-outline-offset-1 max-sm:[.visit-detail-gatherings_&&]:min-h-12 max-sm:[.visit-detail-gatherings_&&]:pl-4 max-sm:[.visit-detail-gatherings_&&]:pr-4 max-sm:[.visit-detail-gatherings_&&]:text-[length:16px] sm:[.visit-detail-gatherings_&&]:w-[337px] sm:[.visit-detail-gatherings_&&]:max-w-full sm:[.visit-detail-gatherings_&&]:pl-6 sm:[.visit-detail-gatherings_&&]:pr-6 xl:[.visit-detail-gatherings_&&]:h-12 [.visit-detail-gatherings_&&]:leading-6 max-sm:[.visit-detail-gatherings_&&]:leading-6"
            }
          >
            <Link href={ROUTES.PRIVATE_DINING}>
              <span>{VISIT_CONTACT_DETAILS.gatherings.label}</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
}
