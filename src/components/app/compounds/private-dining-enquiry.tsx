import { PrivateDiningContacts } from "@/components/app/molecules/private-dining-contacts";
import { PrivateDiningEnquiryFields } from "@/components/app/molecules/private-dining-enquiry-fields";
import { PrivateDiningHeading } from "@/components/app/molecules/private-dining-heading";
import { PRIVATE_DINING_FORM } from "@/lib/constants/private-dining";
import type { IPrivateDiningEnquiryProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivateDiningEnquiry({
  content,
  compact = false,
  className,
}: IPrivateDiningEnquiryProps) {
  return (
    <section
      id="enquire"
      className={cn(
        "pd-enquiry relative z-1 py-12! scroll-mt-20 lg:py-12! lg:[.pd-corporatePage_&]:py-0! lg:[.pd-weddingEnquiry_&]:py-0! max-sm:[.pd-corporatePage_:is(.pd-heroCopy,_.pd-promoCopy,_.pd-paleSection,_&:where(.pd-enquiry))]:py-12! max-sm:py-8!",
        compact && "pd-compactEnquiry [&]:bg-[var(--events-pale)] [&]:bg-none",
        className,
      )}
    >
      <div
        className={cn(
          "site-container",
          "pd-enquiryContainer grid gap-12 [.pd-compactEnquiry_&]:gap-8 lg:grid-cols-[minmax(0,_622fr)_minmax(0,_650fr)] lg:gap-6 lg:[.pd-compactEnquiry_&]:grid-cols-[612fr_555fr] lg:[.pd-compactEnquiry_&]:gap-[129px] lg:[.pd-corporatePage_&]:grid-cols-[minmax(0,_598fr)_minmax(0,_650fr)] lg:[.pd-corporatePage_&]:gap-12 lg:[.pd-celebrationEnquiry_&]:grid-cols-[minmax(0,_598fr)_minmax(0,_650fr)] lg:[.pd-celebrationEnquiry_&]:gap-12 lg:[.pd-weddingEnquiry_&]:grid-cols-[minmax(0,_598fr)_minmax(0,_650fr)] lg:[.pd-weddingEnquiry_&]:gap-12",
        )}
      >
        <div
          data-scroll-reveal
          className={
            "pd-enquiryIntro lg:pr-6! lg:[.pd-compactEnquiry_&]:pt-0! lg:[.pd-compactEnquiry_&]:pr-0! lg:[.pd-compactEnquiry_&]:pb-0! lg:[.pd-compactEnquiry_&]:pl-0! lg:[.pd-corporatePage_&]:pt-12! lg:[.pd-corporatePage_&]:pr-0! lg:[.pd-corporatePage_&]:pb-12! lg:[.pd-corporatePage_&]:pl-0! lg:[.pd-celebrationEnquiry_&]:pt-12! lg:[.pd-celebrationEnquiry_&]:pr-0! lg:[.pd-celebrationEnquiry_&]:pb-12! lg:[.pd-celebrationEnquiry_&]:pl-0! lg:[.pd-weddingEnquiry_&]:pt-12! lg:[.pd-weddingEnquiry_&]:pr-0! lg:[.pd-weddingEnquiry_&]:pb-12! lg:[.pd-weddingEnquiry_&]:pl-0!"
          }
        >
          <PrivateDiningHeading
            eyebrow={content.eyebrow}
            heading={content.heading}
            description={content.description}
          />
          {content.contacts && <PrivateDiningContacts />}
        </div>
        <div
          id="enquiry-form"
          data-scroll-reveal
          className={
            "pd-enquiryForm lg:border-l lg:border-solid lg:border-l-soft-stone lg:px-6! lg:[.pd-compactEnquiry_&]:relative lg:[.pd-compactEnquiry_&]:border-0 lg:[.pd-compactEnquiry_&]:border-none lg:[.pd-compactEnquiry_&]:border-current lg:[.pd-compactEnquiry_&]:pt-0! lg:[.pd-compactEnquiry_&]:pr-0! lg:[.pd-compactEnquiry_&]:pb-0! lg:[.pd-compactEnquiry_&]:pl-0! lg:[.pd-compactEnquiry_&::before]:content-[''] lg:[.pd-compactEnquiry_&::before]:absolute lg:[.pd-compactEnquiry_&::before]:left-[-65px] lg:[.pd-compactEnquiry_&::before]:top-0 lg:[.pd-compactEnquiry_&::before]:bottom-13 lg:[.pd-compactEnquiry_&::before]:w-px lg:[.pd-compactEnquiry_&::before]:bg-soft-stone lg:[.pd-compactEnquiry_&::before]:bg-none lg:[.pd-corporatePage_&]:border-0 lg:[.pd-corporatePage_&]:border-none lg:[.pd-corporatePage_&]:border-current lg:[.pd-corporatePage_&]:inset-shadow-[1px_0_var(--soft-stone)] lg:[.pd-corporatePage_&]:py-12! lg:[.pd-celebrationEnquiry_&]:border-0 lg:[.pd-celebrationEnquiry_&]:border-none lg:[.pd-celebrationEnquiry_&]:border-current lg:[.pd-celebrationEnquiry_&]:inset-shadow-[1px_0_var(--soft-stone)] lg:[.pd-celebrationEnquiry_&]:py-12! lg:[.pd-weddingEnquiry_&]:border-0 lg:[.pd-weddingEnquiry_&]:border-none lg:[.pd-weddingEnquiry_&]:border-current lg:[.pd-weddingEnquiry_&]:inset-shadow-[1px_0_var(--soft-stone)] lg:[.pd-weddingEnquiry_&]:py-12! max-sm:scroll-mt-20"
          }
        >
          {content.formEyebrow && (
            <PrivateDiningHeading
              eyebrow={content.formEyebrow}
              heading={PRIVATE_DINING_FORM.heading}
            />
          )}
          <PrivateDiningEnquiryFields content={content} />
        </div>
      </div>
    </section>
  );
}
