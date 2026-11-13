import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/app/atoms/tracked-link";
import { PrivateDiningEnquiry } from "@/components/app/compounds/private-dining-enquiry";
import { VisitContactDetails } from "@/components/app/compounds/visit-contact-details";
import { VisitLocationMap } from "@/components/app/molecules/visit-location-map";
import { Button } from "@/components/ui/button";
import {
  RESTAURANT_CONTACT,
  RESTAURANT_OPENING_HOURS,
  ROUTES,
} from "@/lib/constants";
import { PRIVATE_DINING } from "@/lib/constants/private-dining";
import { VISIT_CONTACT_CONTENT } from "@/lib/constants/visit-contact";
import { GA4Event } from "@/lib/enums";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

function VisitBookingButton() {
  return (
    <Button
      asChild
      variant="brand-primary"
      className={cn(
        "visit-action [&&]:h-auto [&&]:min-h-12 [&&]:max-w-full [&&]:pt-2.5 [&&]:pr-6 [&&]:pb-2.5 [&&]:pl-6 [&&]:rounded-[4px] [&&]:text-[length:18px] [&&]:whitespace-normal [&&]:gap-2 [.visit-closingCopy_&&]:mt-7 max-sm:[&&]:text-[length:16px] max-sm:[.visit-heroActions_&&]:w-full max-sm:[.visit-closingCopy_&&]:w-full max-sm:[.visit-closingCopy_&&]:mt-6 [&&]:leading-6.5 max-sm:[&&]:leading-6",
        "visit-booking [&&]:w-44.5 [&&]:gap-[5px] [&&]:whitespace-nowrap",
      )}
    >
      <TrackedLink
        href={ROUTES.BOOK_A_TABLE}
        interaction={{
          event: GA4Event.BookingClick,
          placement: "visit_contact",
        }}
      >
        {VISIT_CONTACT_CONTENT.bookingLabel}
        <ArrowRight aria-hidden="true" className="size-4" />
      </TrackedLink>
    </Button>
  );
}

function VisitHero() {
  return (
    <section
      className={"visit-hero relative lg:min-h-151"}
      aria-labelledby="visit-title"
    >
      <div
        className={
          "visit-heroImage relative h-90 overflow-hidden max-sm:h-[clamp(220px,_62vw,_280px)] lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-[45%] lg:h-auto lg:[&&::after]:content-[''] lg:[&&::after]:absolute lg:[&&::after]:top-0 lg:[&&::after]:right-auto lg:[&&::after]:bottom-0 lg:[&&::after]:left-0 lg:[&&::after]:w-[49.0783%] lg:[&&::after]:bg-[image:linear-gradient(_90deg,_var(--warm-cream)_5.7512%,_rgb(var(--overlay-cream-rgb)_/_90%)_28.4072%,_transparent_)] lg:[&&::after]:bg-transparent xl:left-[calc(max(72px,_(100%_-_var(--site-content-max-width))_/_2)_+_500px)]"
        }
      >
        <Image
          {...VISIT_CONTACT_CONTENT.hero.image}
          width={765}
          height={1020}
          preload
          sizes="(min-width: 1584px) calc(50vw + 220px), (min-width: 1280px) calc(100vw - 572px), (min-width: 1024px) 55vw, 100vw"
          className={
            "visit-heroPhoto w-full h-full object-cover object-[center_78%] min-[90rem]:h-auto min-[90rem]:max-w-none min-[90rem]:origin-top-left min-[90rem]:transform-[scaleY(0.95045955)_translateY(-38.44655%)]"
          }
        />
      </div>
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "visit-heroCopy relative pt-10 pb-12 [&&_h1]:mt-2 [&&_h1]:text-[length:56px] [&&_h1]:whitespace-pre-line max-sm:pt-8 max-sm:pb-10 max-sm:[&&_h1]:mt-2 lg:max-w-[565px] lg:w-1/2 lg:pt-15 lg:[&&_h1]:text-[length:72px] xl:w-[565px] max-sm:[&&_h1]:text-[length:36px] [&&_h1]:leading-15 max-sm:[&&_h1]:leading-[1.08] lg:[&&_h1]:leading-19"
          }
        >
          <p
            className={
              "visit-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [&&::before]:shrink-0 [.visit-closing_&&]:text-inherit [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:21px] max-sm:text-[length:12px] max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:16px] leading-4 [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7.5 max-sm:leading-4.5 max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7"
            }
          >
            {VISIT_CONTACT_CONTENT.hero.eyebrow}
          </p>
          <h1 id="visit-title">{VISIT_CONTACT_CONTENT.hero.heading}</h1>
          <p
            className={
              "visit-heroAddress mt-6 text-[length:24px] max-sm:mt-4 max-sm:text-[length:20px] lg:text-[length:28px] leading-8.5 max-sm:leading-7 lg:leading-[39px]"
            }
          >
            {VISIT_CONTACT_CONTENT.hero.address}
          </p>
          <p
            className={
              "visit-description text-text-secondary text-[length:18px] [.visit-heroCopy_&&]:mt-6 max-sm:text-[length:16px] max-sm:[.visit-heroCopy_&&]:mt-4 leading-6.5 max-sm:leading-6"
            }
          >
            {VISIT_CONTACT_CONTENT.hero.description}
          </p>
          <div
            data-button-pair
            className={
              "visit-heroActions flex flex-wrap gap-4 mt-6 max-sm:gap-3"
            }
          >
            <VisitBookingButton />
            <Button
              asChild
              variant="brand-contact"
              className={cn(
                "visit-action [&&]:h-auto [&&]:min-h-12 [&&]:max-w-full [&&]:pt-2.5 [&&]:pr-6 [&&]:pb-2.5 [&&]:pl-6 [&&]:rounded-[4px] [&&]:text-[length:18px] [&&]:whitespace-normal [&&]:gap-2 [.visit-closingCopy_&&]:mt-7 max-sm:[&&]:text-[length:16px] max-sm:[.visit-heroActions_&&]:w-full max-sm:[.visit-closingCopy_&&]:w-full max-sm:[.visit-closingCopy_&&]:mt-6 [&&]:leading-6.5 max-sm:[&&]:leading-6",
                "visit-directions [&&]:w-58 [&&]:border-0 [&&]:border-none [&&]:border-current [&&]:rounded-[4px] [&&]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] [&&:hover]:bg-peploe-burgundy [&&:hover]:bg-none [&&:hover]:text-warm-cream [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-1 [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-solid [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:outline-[CanvasText] [@media_(forced-colors:_active)]:[&&:not(:focus-visible)]:-outline-offset-1",
              )}
            >
              <TrackedAnchor
                href={VISIT_CONTACT_CONTENT.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                interaction={{
                  event: GA4Event.DirectionsClick,
                  placement: "visit_contact",
                }}
              >
                <MapPin aria-hidden="true" className="size-4" />
                {VISIT_CONTACT_CONTENT.directionsLabel}
              </TrackedAnchor>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisitContactInformation() {
  return (
    <section
      className={
        "visit-contact pt-10 pb-10 bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none scroll-mt-25"
      }
      id="opening-hours"
      aria-label="Opening hours, address and contact"
    >
      <div
        className={cn(
          "site-container",
          "visit-contactGrid grid gap-8 max-sm:gap-6 sm:max-xl:grid-cols-[minmax(0,_1fr)_minmax(max-content,_1fr)] xl:grid-cols-[minmax(max-content,_440fr)_minmax(0,_320fr)_minmax(max-content,_360fr)] xl:gap-22",
        )}
      >
        <div
          data-scroll-reveal
          className={
            "visit-contactItem grid grid-cols-[48px_minmax(0,_1fr)] items-start gap-6 min-w-0 [&&_h2]:flex [&&_h2]:items-center [&&_h2]:min-h-12 [&&_h2]:text-[length:30px] [&&_address]:mt-2 [&&_address]:text-text-secondary [&&_address]:text-[length:18px] [&&_address]:not-italic [&&_address]:whitespace-pre-line max-sm:grid-cols-[minmax(0,_1fr)] max-sm:justify-items-center max-sm:text-center max-sm:gap-3 max-sm:[&&_>_img]:w-8 max-sm:[&&_>_img]:h-8 max-sm:[&&_>_div]:contents max-sm:[.visit-contactItem_+_&&]:pt-6 max-sm:[.visit-contactItem_+_&&]:border-t max-sm:[.visit-contactItem_+_&&]:[border-top-style:solid] max-sm:[.visit-contactItem_+_&&]:border-t-soft-stone max-sm:[&&_h2]:min-h-0 max-sm:[&&_address]:mt-0 max-sm:[&&_address]:mr-0 max-sm:[&&_address]:mb-0 max-sm:[&&_address]:ml-0 max-sm:[&&_address]:text-[length:15px] sm:max-xl:[&&:first-child]:col-span-full sm:max-xl:[&&:first-child]:max-w-140 sm:max-xl:[&&:first-child]:[contain:inline-size] xl:[.visit-contactItem_+_&&]:relative xl:[.visit-contactItem_+_&&::before]:content-[''] xl:[.visit-contactItem_+_&&::before]:absolute xl:[.visit-contactItem_+_&&::before]:top-0 xl:[.visit-contactItem_+_&&::before]:bottom-0 xl:[.visit-contactItem_+_&&::before]:-left-10 xl:[.visit-contactItem_+_&&::before]:w-px xl:[.visit-contactItem_+_&&::before]:bg-soft-stone xl:[.visit-contactItem_+_&&::before]:bg-none max-sm:[&&_h2]:text-[length:24px] [&&_h2]:leading-[39px] [&&_address]:leading-[27px] max-sm:[&&_h2]:leading-[33px] max-sm:[&&_address]:leading-6"
          }
        >
          <Image src="/peploes-visit-clock.svg" alt="" width={48} height={48} />
          <div>
            <h2>{VISIT_CONTACT_CONTENT.contact.hoursHeading}</h2>
            <dl
              className={
                "visit-hours grid gap-4 mt-4 text-text-secondary text-[length:18px] [&&_>_div]:flex [&&_>_div]:justify-between [&&_>_div]:gap-3 [&&_dd]:shrink-0 max-sm:[.visit-contactItem_&&]:mt-0 max-sm:[.visit-contactItem_&&]:mr-0 max-sm:[.visit-contactItem_&&]:mb-0 max-sm:[.visit-contactItem_&&]:ml-0 max-sm:gap-3 max-sm:text-[length:15px] max-sm:[&&_>_div]:grid max-sm:[&&_>_div]:grid-cols-[minmax(0,_1fr)_auto] max-sm:[&&_>_div]:items-baseline max-sm:[&&_>_div]:gap-6 max-sm:[&&_>_div]:text-left max-sm:[&&_dd]:text-right leading-[23px] max-sm:leading-6"
              }
            >
              {RESTAURANT_OPENING_HOURS.map((item) => (
                <div key={item.days}>
                  <dt>{item.days}</dt>
                  <dd>{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div
          data-scroll-reveal
          className={
            "visit-contactItem grid grid-cols-[48px_minmax(0,_1fr)] items-start gap-6 min-w-0 [&&_h2]:flex [&&_h2]:items-center [&&_h2]:min-h-12 [&&_h2]:text-[length:30px] [&&_address]:mt-2 [&&_address]:text-text-secondary [&&_address]:text-[length:18px] [&&_address]:not-italic [&&_address]:whitespace-pre-line max-sm:grid-cols-[minmax(0,_1fr)] max-sm:justify-items-center max-sm:text-center max-sm:gap-3 max-sm:[&&_>_img]:w-8 max-sm:[&&_>_img]:h-8 max-sm:[&&_>_div]:contents max-sm:[.visit-contactItem_+_&&]:pt-6 max-sm:[.visit-contactItem_+_&&]:border-t max-sm:[.visit-contactItem_+_&&]:[border-top-style:solid] max-sm:[.visit-contactItem_+_&&]:border-t-soft-stone max-sm:[&&_h2]:min-h-0 max-sm:[&&_address]:mt-0 max-sm:[&&_address]:mr-0 max-sm:[&&_address]:mb-0 max-sm:[&&_address]:ml-0 max-sm:[&&_address]:text-[length:15px] sm:max-xl:[&&:first-child]:col-span-full sm:max-xl:[&&:first-child]:max-w-140 sm:max-xl:[&&:first-child]:[contain:inline-size] xl:[.visit-contactItem_+_&&]:relative xl:[.visit-contactItem_+_&&::before]:content-[''] xl:[.visit-contactItem_+_&&::before]:absolute xl:[.visit-contactItem_+_&&::before]:top-0 xl:[.visit-contactItem_+_&&::before]:bottom-0 xl:[.visit-contactItem_+_&&::before]:-left-10 xl:[.visit-contactItem_+_&&::before]:w-px xl:[.visit-contactItem_+_&&::before]:bg-soft-stone xl:[.visit-contactItem_+_&&::before]:bg-none max-sm:[&&_h2]:text-[length:24px] [&&_h2]:leading-[39px] [&&_address]:leading-[27px] max-sm:[&&_h2]:leading-[33px] max-sm:[&&_address]:leading-6"
          }
        >
          <Image
            src="/peploes-events-location.svg"
            alt=""
            width={48}
            height={48}
          />
          <div>
            <h2>{VISIT_CONTACT_CONTENT.contact.addressHeading}</h2>
            <address>{VISIT_CONTACT_CONTENT.contact.address}</address>
          </div>
        </div>
        <div
          data-scroll-reveal
          className={
            "visit-contactItem grid grid-cols-[48px_minmax(0,_1fr)] items-start gap-6 min-w-0 [&&_h2]:flex [&&_h2]:items-center [&&_h2]:min-h-12 [&&_h2]:text-[length:30px] [&&_address]:mt-2 [&&_address]:text-text-secondary [&&_address]:text-[length:18px] [&&_address]:not-italic [&&_address]:whitespace-pre-line max-sm:grid-cols-[minmax(0,_1fr)] max-sm:justify-items-center max-sm:text-center max-sm:gap-3 max-sm:[&&_>_img]:w-8 max-sm:[&&_>_img]:h-8 max-sm:[&&_>_div]:contents max-sm:[.visit-contactItem_+_&&]:pt-6 max-sm:[.visit-contactItem_+_&&]:border-t max-sm:[.visit-contactItem_+_&&]:[border-top-style:solid] max-sm:[.visit-contactItem_+_&&]:border-t-soft-stone max-sm:[&&_h2]:min-h-0 max-sm:[&&_address]:mt-0 max-sm:[&&_address]:mr-0 max-sm:[&&_address]:mb-0 max-sm:[&&_address]:ml-0 max-sm:[&&_address]:text-[length:15px] sm:max-xl:[&&:first-child]:col-span-full sm:max-xl:[&&:first-child]:max-w-140 sm:max-xl:[&&:first-child]:[contain:inline-size] xl:[.visit-contactItem_+_&&]:relative xl:[.visit-contactItem_+_&&::before]:content-[''] xl:[.visit-contactItem_+_&&::before]:absolute xl:[.visit-contactItem_+_&&::before]:top-0 xl:[.visit-contactItem_+_&&::before]:bottom-0 xl:[.visit-contactItem_+_&&::before]:-left-10 xl:[.visit-contactItem_+_&&::before]:w-px xl:[.visit-contactItem_+_&&::before]:bg-soft-stone xl:[.visit-contactItem_+_&&::before]:bg-none max-sm:[&&_h2]:text-[length:24px] [&&_h2]:leading-[39px] [&&_address]:leading-[27px] max-sm:[&&_h2]:leading-[33px] max-sm:[&&_address]:leading-6"
          }
        >
          <Image
            src="/peploes-visit-contact.svg"
            alt=""
            width={48}
            height={48}
          />
          <div>
            <h2>{VISIT_CONTACT_CONTENT.contact.heading}</h2>
            <div
              className={
                "visit-contactLinks grid gap-4 mt-4 text-peploe-burgundy text-[length:21px] font-medium [&&_a]:w-fit [&&_a]:max-w-full [&&_a]:wrap-anywhere [&&_a]:underline-offset-4 [&&_a]:underline [&&_a]:decoration-solid [&&_a]:decoration-current [&&_a]:decoration-auto [&&_a]:decoration-transparent [&&_a]:transition-[text-decoration-color] [&&_a]:duration-[var(--duration-base)] [&&_a]:ease-[var(--ease-organic)] [&&_a]:[transition-delay:0s] [&&_a]:transition-normal [&&_a:hover]:decoration-current max-sm:[.visit-contactItem_&&]:mr-0 max-sm:[.visit-contactItem_&&]:ml-0 max-sm:[.visit-contactItem_&&]:-mt-5 max-sm:[.visit-contactItem_&&]:-mb-5 max-sm:justify-items-center max-sm:gap-0 max-sm:text-[length:16px] max-sm:[&&_a]:flex max-sm:[&&_a]:items-end max-sm:[&&_a]:min-h-11 max-sm:[&&_a_+_a]:items-start [@media_(prefers-reduced-motion:_reduce)]:[&&_a]:transition-none [@media_(prefers-reduced-motion:_reduce)]:[&&_a]:duration-0 [@media_(prefers-reduced-motion:_reduce)]:[&&_a]:ease-[ease] [@media_(prefers-reduced-motion:_reduce)]:[&&_a]:[transition-delay:0s] [@media_(prefers-reduced-motion:_reduce)]:[&&_a]:transition-normal leading-7.5 max-sm:leading-6"
              }
            >
              <TrackedAnchor
                href={`tel:${RESTAURANT_CONTACT.phone}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "visit_contact",
                  destination: "phone",
                }}
              >
                {RESTAURANT_CONTACT.phoneLabel}
              </TrackedAnchor>
              <TrackedAnchor
                href={`mailto:${RESTAURANT_CONTACT.email}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "visit_contact",
                  destination: "email",
                }}
              >
                {RESTAURANT_CONTACT.email}
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisitLocation() {
  return (
    <section
      className={"visit-locationSection scroll-mt-25 bg-warm-cream bg-none"}
      id="find-us"
    >
      <div className={"visit-location pt-12 pb-11"}>
        <div
          className={cn(
            "site-container",
            "visit-locationGrid grid items-center gap-8 lg:grid-cols-[488fr_760fr] lg:gap-12",
          )}
        >
          <div data-scroll-reveal className={"visit-locationCopy"}>
            <p
              className={
                "visit-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [&&::before]:shrink-0 [.visit-closing_&&]:text-inherit [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:21px] max-sm:text-[length:12px] max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:16px] leading-4 [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7.5 max-sm:leading-4.5 max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7"
              }
            >
              {VISIT_CONTACT_CONTENT.location.eyebrow}
            </p>
            <h2
              className={
                "visit-heading text-[length:48px] whitespace-pre-line [.visit-messageGrid_&&]:mt-2 [.visit-messageGrid_&&]:mb-5 [.visit-locationCopy_&&]:mt-2 [.visit-locationCopy_&&]:mb-6 [.visit-closingCopy_&&]:mt-2 [.visit-closingCopy_&&]:mb-7 max-sm:[.visit-locationCopy_&&]:mt-2 max-sm:[.visit-locationCopy_&&]:mb-4 max-sm:[.visit-closingCopy_&&]:mt-2 max-sm:[.visit-closingCopy_&&]:mb-4 lg:text-[length:60px] max-sm:text-[length:30px] leading-13 max-sm:leading-11 lg:leading-16"
              }
            >
              {VISIT_CONTACT_CONTENT.location.heading}
            </h2>
            <p
              className={
                "visit-description text-text-secondary text-[length:18px] [.visit-heroCopy_&&]:mt-6 max-sm:text-[length:16px] max-sm:[.visit-heroCopy_&&]:mt-4 leading-6.5 max-sm:leading-6"
              }
            >
              {VISIT_CONTACT_CONTENT.location.description}
            </p>
          </div>
          <VisitLocationMap />
        </div>
      </div>
      <div
        data-scroll-reveal
        className={cn(
          "site-container",
          "visit-transport mt-10 pb-11 max-sm:mt-8",
        )}
      >
        <h3
          className={
            "visit-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [&&::before]:shrink-0 [.visit-closing_&&]:text-inherit [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:21px] max-sm:text-[length:12px] max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:16px] leading-4 [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7.5 max-sm:leading-4.5 max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7"
          }
        >
          {VISIT_CONTACT_CONTENT.location.transportHeading}
        </h3>
        <ul
          className={
            "visit-transportGrid grid gap-7 mt-7 [&&_li]:grid [&&_li]:grid-cols-[48px_minmax(0,_1fr)] [&&_li]:gap-6 [&&_li]:items-start [&&_h4]:[text-box:trim-start_cap_alphabetic] [&&_h4]:text-[length:28px] [&&_p]:mt-3 [&&_p]:text-text-secondary [&&_p]:text-[length:18px] max-sm:gap-6 max-sm:mt-6 max-sm:[&&_li]:gap-4 max-sm:[&&_li_+_li]:border-t max-sm:[&&_li_+_li]:[border-top-style:solid] max-sm:[&&_li_+_li]:border-t-soft-stone max-sm:[&&_li_+_li]:pt-6 max-sm:[&&_h4]:text-[length:22px] max-sm:[&&_p]:mt-2 max-sm:[&&_p]:text-[length:16px] sm:max-xl:grid-cols-2 xl:grid-cols-[279.25fr_repeat(3,_280.25fr)] xl:gap-13 xl:pr-5 xl:[&&_p]:max-w-[208.25px] xl:[&&_li:first-child_p]:max-w-[207.25px] xl:[&&_li_+_li]:relative xl:[&&_li_+_li::before]:content-[''] xl:[&&_li_+_li::before]:absolute xl:[&&_li_+_li::before]:top-0 xl:[&&_li_+_li::before]:bottom-0 xl:[&&_li_+_li::before]:-left-8 xl:[&&_li_+_li::before]:w-px xl:[&&_li_+_li::before]:bg-soft-stone xl:[&&_li_+_li::before]:bg-none [&&_h4]:leading-[37px] [&&_p]:leading-7 max-sm:[&&_h4]:leading-6.5 max-sm:[&&_p]:leading-6"
          }
        >
          {VISIT_CONTACT_CONTENT.location.transport.map((item) => (
            <li key={item.heading}>
              <Image src={item.icon} alt="" width={48} height={48} />
              <div>
                <h4>{item.heading}</h4>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VisitClosing() {
  return (
    <section
      className={
        "visit-closing relative isolate text-warm-cream bg-ink bg-none [&&_>_img]:-z-2 [&&::before]:content-[''] [&&::before]:absolute [&&::before]:top-0 [&&::before]:right-0 [&&::before]:bottom-0 [&&::before]:left-0 [&&::before]:-z-1 [&&::before]:bg-[image:linear-gradient(_90deg,_var(--ink),_color-mix(in_srgb,_var(--ink)_80%,_transparent)_52.0656%,_transparent_)] [&&::before]:bg-transparent [&&_:is(a,_button):focus-visible]:outline-warm-cream max-sm:[&&::before]:bg-[color-mix(in_srgb,_var(--ink)_78%,_transparent)] max-sm:[&&::before]:bg-none lg:[&&::before]:w-[77.0139%]"
      }
    >
      <Image
        {...VISIT_CONTACT_CONTENT.closing.image}
        fill
        sizes="100vw"
        className={"visit-cover object-cover"}
      />
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "visit-closingCopy max-w-155 pt-18 pb-18 max-sm:pt-12 max-sm:pb-12"
          }
        >
          <p
            className={
              "visit-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:bg-current [&&::before]:bg-none [&&::before]:shrink-0 [.visit-closing_&&]:text-inherit [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:21px] max-sm:text-[length:12px] max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:text-[length:16px] leading-4 [.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7.5 max-sm:leading-4.5 max-sm:[.visit-closingCopy_>_p:not(&.visit-eyebrow)]:leading-7"
            }
          >
            {VISIT_CONTACT_CONTENT.closing.eyebrow}
          </p>
          <h2
            className={
              "visit-heading text-[length:48px] whitespace-pre-line [.visit-messageGrid_&&]:mt-2 [.visit-messageGrid_&&]:mb-5 [.visit-locationCopy_&&]:mt-2 [.visit-locationCopy_&&]:mb-6 [.visit-closingCopy_&&]:mt-2 [.visit-closingCopy_&&]:mb-7 max-sm:[.visit-locationCopy_&&]:mt-2 max-sm:[.visit-locationCopy_&&]:mb-4 max-sm:[.visit-closingCopy_&&]:mt-2 max-sm:[.visit-closingCopy_&&]:mb-4 lg:text-[length:60px] max-sm:text-[length:30px] leading-13 max-sm:leading-11 lg:leading-16"
            }
          >
            {VISIT_CONTACT_CONTENT.closing.heading}
          </h2>
          <p>{VISIT_CONTACT_CONTENT.closing.description}</p>
          <VisitBookingButton />
        </div>
      </div>
    </section>
  );
}

export function VisitContact() {
  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "visit-page text-ink bg-warm-cream bg-none [body:has(&.visit-page)_[data-navbar-visit]]:relative [body:has(&.visit-page)_[data-navbar-visit]]:w-29 [body:has(&.visit-page)_[data-navbar-visit]]:text-peploe-burgundy [body:has(&.visit-page)_[data-navbar-visit]]:no-underline [body:has(&.visit-page)_[data-navbar-visit]]:decoration-solid [body:has(&.visit-page)_[data-navbar-visit]]:decoration-current [body:has(&.visit-page)_[data-navbar-visit]]:decoration-auto [&&_:is(h1,_h2,_h4)]:font-[family-name:var(--font-eb-garamond),_serif]! [&&_:is(h1,_h2,_h4)]:font-normal [&&_:is(a,_button):focus-visible]:outline-2 [&&_:is(a,_button):focus-visible]:outline-solid [&&_:is(a,_button):focus-visible]:outline-peploe-burgundy [&&_:is(a,_button):focus-visible]:outline-offset-4",
      )}
    >
      <VisitHero />
      <VisitContactInformation />
      <VisitLocation />
      <VisitContactDetails />
      <PrivateDiningEnquiry
        content={PRIVATE_DINING.enquiry}
        compact
        className={
          "pd-page [--events-pale:#f1e9e3] [--events-content-width:min(_calc(100vw_-_48px),_var(--site-content-max-width)_)] [--events-content-edge:calc((100vw_-_var(--events-content-width))_/_2)] [--events-outer-gutter:max(_72px,_calc((100vw_-_var(--site-content-max-width))_/_2)_)] bg-warm-cream bg-none text-ink xl:[--events-content-width:min(_calc(100vw_-_144px),_var(--site-content-max-width)_)]"
        }
      />
      <VisitClosing />
    </main>
  );
}
