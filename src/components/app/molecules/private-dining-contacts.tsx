import { Mail, Phone } from "lucide-react";
import { TrackedAnchor } from "@/components/app/atoms/tracked-link";
import { Button } from "@/components/ui/button";
import { RESTAURANT_CONTACT } from "@/lib/constants";
import { PRIVATE_DINING_FORM } from "@/lib/constants/private-dining";
import { GA4Event } from "@/lib/enums";

export function PrivateDiningContacts() {
  return (
    <div
      data-button-pair
      className={
        "pd-contacts [:where(.pd-enquiryIntro)_&]:mt-8 flex flex-wrap gap-2.5 [&_a]:rounded-[4px] [&_a]:text-[length:16px] [&_a]:h-11 [&_a]:w-full [&_a]:px-5! [:where(.pd-closing)_&]:mt-6 [:where(.pd-closing)_&_a]:text-warm-cream [:where(.pd-closing)_&_a]:border-[rgb(250_247_241_/_60%)] [.pd-closing_&_a:hover]:bg-[color-mix(in_srgb,_var(--warm-cream)_12%,_transparent)] [.pd-closing_&_a:hover]:border-warm-cream [:where(.pd-overviewClosing)_&]:mt-4 [.pd-overviewClosing_&_a]:min-w-0 [.pd-overviewClosing_&_a]:px-[16px_20px]! [.pd-overviewClosing_&_a]:border-[rgb(var(--overlay-cream-rgb)_/_35%)] [.pd-overviewClosing_&_a]:text-[length:15px] sm:max-lg:[&_a]:w-auto lg:[:where(.pd-enquiryIntro)_&]:mt-12 lg:[:where(.pd-enquiryIntro)_&]:max-w-134 lg:gap-3 lg:[&_a]:w-auto lg:[&_a]:min-w-50 lg:[&_a]:border-peploe-burgundy lg:[&_a]:text-[length:15px] lg:[:where(.pd-enquiryIntro)_&_a]:flex-1 lg:[:where(.pd-enquiryIntro)_&_a]:h-12 lg:[.pd-overviewClosing_&]:mt-3.5 lg:[.pd-overviewClosing_&]:gap-4 lg:[.pd-overviewClosing_&_a]:min-w-[173px] lg:[.pd-overviewClosing_&_a_+_a]:min-w-44 lg:[.pd-corporatePage_&_a]:rounded-[2px] lg:[.pd-corporatePage_&_a]:border-0 lg:[.pd-corporatePage_&_a]:border-none lg:[.pd-corporatePage_&_a]:border-current lg:[.pd-corporatePage_&_a]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] lg:[.pd-celebrationEnquiry_&_a]:rounded-[2px] lg:[.pd-celebrationEnquiry_&_a]:border-0 lg:[.pd-celebrationEnquiry_&_a]:border-none lg:[.pd-celebrationEnquiry_&_a]:border-current lg:[.pd-celebrationEnquiry_&_a]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] lg:[.pd-weddingEnquiry_&_a]:rounded-[2px] lg:[.pd-weddingEnquiry_&_a]:border-0 lg:[.pd-weddingEnquiry_&_a]:border-none lg:[.pd-weddingEnquiry_&_a]:border-current lg:[.pd-weddingEnquiry_&_a]:inset-shadow-[0_0_0_1px_var(--peploe-burgundy)] lg:[.pd-weddingEnquiry_&_svg]:stroke-[1.5] forced-colors:[.pd-corporatePage_:where(input,_select,_textarea,_&_a)]:outline-1 forced-colors:[.pd-corporatePage_:where(input,_select,_textarea,_&_a)]:outline-solid forced-colors:[.pd-corporatePage_:where(input,_select,_textarea,_&_a)]:outline-[CanvasText] forced-colors:[.pd-corporatePage_:where(input,_select,_textarea,_&_a)]:outline-offset-[-1px] forced-colors:[.pd-celebrationEnquiry_:where(input,_select,_textarea,_&_a)]:outline-1 forced-colors:[.pd-celebrationEnquiry_:where(input,_select,_textarea,_&_a)]:outline-solid forced-colors:[.pd-celebrationEnquiry_:where(input,_select,_textarea,_&_a)]:outline-[CanvasText] forced-colors:[.pd-celebrationEnquiry_:where(input,_select,_textarea,_&_a)]:outline-offset-[-1px] forced-colors:[.pd-weddingEnquiry_:where(input,_select,_textarea,_&_a)]:outline-1 forced-colors:[.pd-weddingEnquiry_:where(input,_select,_textarea,_&_a)]:outline-solid forced-colors:[.pd-weddingEnquiry_:where(input,_select,_textarea,_&_a)]:outline-[CanvasText] forced-colors:[.pd-weddingEnquiry_:where(input,_select,_textarea,_&_a)]:outline-offset-[-1px] forced-colors:[.pd-corporatePage_&_a:focus-visible]:outline-2 forced-colors:[.pd-corporatePage_&_a:focus-visible]:outline-solid forced-colors:[.pd-corporatePage_&_a:focus-visible]:outline-[CanvasText] forced-colors:[.pd-corporatePage_&_a:focus-visible]:outline-offset-3 forced-colors:[.pd-celebrationEnquiry_&_a:focus-visible]:outline-2 forced-colors:[.pd-celebrationEnquiry_&_a:focus-visible]:outline-solid forced-colors:[.pd-celebrationEnquiry_&_a:focus-visible]:outline-[CanvasText] forced-colors:[.pd-celebrationEnquiry_&_a:focus-visible]:outline-offset-3 forced-colors:[.pd-weddingEnquiry_&_a:focus-visible]:outline-2 forced-colors:[.pd-weddingEnquiry_&_a:focus-visible]:outline-solid forced-colors:[.pd-weddingEnquiry_&_a:focus-visible]:outline-[CanvasText] forced-colors:[.pd-weddingEnquiry_&_a:focus-visible]:outline-offset-3 [&_a]:leading-5.5"
      }
    >
      <Button asChild variant="brand-contact">
        <TrackedAnchor
          href={`tel:${RESTAURANT_CONTACT.phone}`}
          interaction={{
            event: GA4Event.ContactClick,
            placement: "private_dining",
            destination: "phone",
          }}
        >
          <Phone aria-hidden="true" className="size-4" />
          {RESTAURANT_CONTACT.phoneLabel}
        </TrackedAnchor>
      </Button>
      <Button asChild variant="brand-contact">
        <TrackedAnchor
          href={`mailto:${RESTAURANT_CONTACT.email}`}
          interaction={{
            event: GA4Event.ContactClick,
            placement: "private_dining",
            destination: "email",
          }}
        >
          <Mail aria-hidden="true" className="size-4" />
          {PRIVATE_DINING_FORM.emailAction}
        </TrackedAnchor>
      </Button>
    </div>
  );
}
