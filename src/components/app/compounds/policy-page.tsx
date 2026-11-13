import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { TrackedAnchor } from "@/components/app/atoms/tracked-link";
import { PolicyContents } from "@/components/app/molecules/policy-contents";
import { Button } from "@/components/ui/button";
import { POLICY_HELP } from "@/lib/constants/policies";
import { GA4Event } from "@/lib/enums";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { IPolicyPageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PolicyPage({ policy }: IPolicyPageProps) {
  return (
    <main
      aria-labelledby="policy-title"
      data-policy={policy.variant}
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "policy-page text-ink bg-warm-cream bg-none [&&_:where(h1,_h2,_.policy-number)]:font-[family-name:var(--font-eb-garamond),_serif] [&&_:where(h1,_h2,_.policy-number)]:font-normal [&&_a:focus-visible]:outline-2 [&&_a:focus-visible]:outline-solid [&&_a:focus-visible]:outline-peploe-burgundy [&&_a:focus-visible]:outline-offset-4 [&&_button:focus-visible]:outline-2 [&&_button:focus-visible]:outline-solid [&&_button:focus-visible]:outline-peploe-burgundy [&&_button:focus-visible]:outline-offset-4 [&&_a:hover]:text-peploe-burgundy [&&_a:hover]:underline [&&_a:hover]:decoration-solid [&&_a:hover]:decoration-current [&&_a:hover]:decoration-auto [&&_a:hover]:underline-offset-4 [&&_h1]:mt-2 [&&_h1]:text-[length:44px] [&&_h1]:font-medium [&&_h1]:whitespace-pre-line max-xl:[&&_h1]:mt-2 max-xl:[&&_h1]:text-[length:clamp(40px,_11.8vw,_46px)] max-xl:[&&_h1]:font-normal max-xl:[&&_h1]:whitespace-normal max-xl:[&&_h1]:text-balance xl:[&&_h1]:text-[length:76px] max-sm:[&&_h1]:text-[length:36px] [&&_h1]:leading-12 max-xl:[&&_h1]:leading-[1.08] xl:[&&_h1]:leading-20.5",
      )}
    >
      <section
        className={"policy-hero relative xl:h-100 xl:overflow-hidden"}
        aria-labelledby="policy-title"
      >
        <div
          className={cn(
            "site-container",
            "policy-heroContainer xl:relative xl:z-1 xl:pointer-events-none",
          )}
        >
          <div
            data-scroll-reveal
            className={
              "policy-heroCopy pt-8 pb-8 md:max-xl:max-w-155 xl:w-155 xl:pt-12 xl:pb-12"
            }
          >
            <p
              className={
                "policy-eyebrow text-text-secondary text-[length:14px] font-medium tracking-[0.1em] [.policy-help_&&]:text-peploe-burgundy max-xl:text-peploe-burgundy max-xl:text-[length:12px] leading-5 max-xl:leading-4.5"
              }
            >
              {policy.eyebrow}
            </p>
            <h1 id="policy-title">{policy.heading}</h1>
            <p
              className={
                "policy-description mt-4 text-text-secondary text-[length:16px] xl:text-[length:18px] leading-6 max-xl:leading-6.5 xl:leading-7"
              }
            >
              {policy.description}
            </p>
          </div>
        </div>
        <div
          className={
            "policy-heroImage relative aspect-[2/1] overflow-hidden max-xl:w-full max-xl:min-h-50 md:max-xl:h-90 md:max-xl:aspect-[auto] xl:absolute xl:top-0 xl:right-0 xl:bottom-0 xl:left-1/2 xl:h-auto xl:aspect-[auto] xl:[&&::after]:content-[''] xl:[&&::after]:absolute xl:[&&::after]:top-0 xl:[&&::after]:right-auto xl:[&&::after]:bottom-0 xl:[&&::after]:left-0 xl:[&&::after]:w-25 xl:[&&::after]:bg-[image:linear-gradient(to_right,_var(--warm-cream),_transparent)] xl:[&&::after]:bg-transparent"
          }
        >
          <div
            className={cn(
              "policy-photoBounds absolute top-0 left-0 w-full",
              {
                privacy:
                  "policy-privacy [.policy-photoBounds&&]:aspect-[3/4] [.policy-photoBounds&&]:translate-x-[0.0612%] [.policy-photoBounds&&]:-translate-y-[40.8045%]",
                accessibility:
                  "policy-accessibility [.policy-photoBounds&&]:w-[115.5172%] [.policy-photoBounds&&]:aspect-[3/2] [.policy-photoBounds&&]:-translate-x-[6.7164%] [.policy-photoBounds&&]:-translate-y-[15.1343%]",
                terms:
                  "policy-terms [.policy-photoBounds&&]:aspect-[4000/2667] [.policy-photoBounds&&]:min-h-[calc(100%_/_0.839052)] [.policy-photoBounds&&]:-translate-y-[16.0948%] [.policy-photoBounds&&_img]:object-cover",
                booking:
                  "policy-booking [.policy-photoBounds&&_img]:object-cover [.policy-photoBounds&&]:aspect-[695/800] [.policy-photoBounds&&]:-translate-y-[41.83125%]",
              }[policy.variant],
            )}
          >
            <Image
              {...policy.image}
              fill
              preload
              sizes="(min-width: 1280px) 56vw, 116vw"
            />
          </div>
        </div>
      </section>

      <div
        data-policy-content
        className={cn(
          "site-container",
          "policy-content pt-6 pb-8 md:max-xl:max-w-180 xl:grid xl:grid-cols-[312px_minmax(0,_1fr)] xl:gap-12 xl:pt-2 xl:pb-0",
        )}
      >
        <PolicyContents key={policy.path}>
          <ol>
            {policy.sections.map((section, index) => (
              <li key={section._key}>
                <a href={`#${section._key}`}>
                  <span
                    className={
                      "policy-contentsNumber text-peploe-burgundy text-[length:14px]"
                    }
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{section.heading}</span>
                </a>
              </li>
            ))}
          </ol>
          <div
            className={
              "policy-relatedPolicies mt-3 pb-3 [&&_h2]:pb-3 [&&_h2]:border-b [&&_h2]:[border-bottom-style:solid] [&&_h2]:border-b-soft-stone [&&_h2]:text-[length:20px] [&&_h2]:font-medium [&&_ul]:grid [&&_ul]:mt-3 [&&_a]:flex [&&_a]:items-center [&&_a]:gap-2 [&&_a]:pt-3 [&&_a]:pb-3 [&&_a]:text-peploe-burgundy [&&_a]:text-[length:14px] [&&_a_svg]:shrink-0 xl:pb-0 xl:[&&_ul]:gap-3 xl:[&&_a]:pt-0 xl:[&&_a]:pb-0 [&&_h2]:leading-6 [&&_a]:leading-5 xl:[&&_a]:leading-[19px]"
            }
          >
            <h2 id="related-policies-title">Related policies</h2>
            <ul aria-labelledby="related-policies-title">
              {policy.relatedPolicies.map((related) => (
                <li key={related.path}>
                  <Button
                    asChild
                    variant="brand-text"
                    className="h-auto justify-start rounded-none p-0 text-left text-sm font-normal whitespace-normal"
                  >
                    <Link href={related.path}>
                      {related.title}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </PolicyContents>
        {/* Figma uses a filled rule; borders round down at fractional browser scaling. */}
        <div className={"policy-sections xl:min-w-0 xl:max-w-234"}>
          {policy.sections.map((section, index) => (
            <section
              data-scroll-reveal
              key={section._key}
              id={section._key}
              aria-labelledby={`${section._key}-heading`}
              className={
                "policy-policySection [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-peploe-burgundy [&&:focus-visible]:outline-offset-4 grid grid-cols-[32px_minmax(0,_1fr)] gap-x-4 gap-y-3 pt-7 pb-7 scroll-mt-24 [&&:not(:last-child)]:inset-shadow-[0_-1px_0_var(--soft-stone)] [&&_h2]:text-[length:28px] max-xl:grid-cols-[28px_minmax(0,_1fr)] max-xl:gap-x-3 max-xl:gap-y-4 xl:relative xl:grid-cols-[80px_minmax(0,_1fr)] xl:gap-x-8 xl:gap-y-2 xl:pt-5 xl:pb-5.5 xl:[&&:not(:first-child)]:pt-[21px] xl:[&&:not(:first-child)::before]:content-[''] xl:[&&:not(:first-child)::before]:absolute xl:[&&:not(:first-child)::before]:top-0 xl:[&&:not(:first-child)::before]:right-0 xl:[&&:not(:first-child)::before]:bottom-auto xl:[&&:not(:first-child)::before]:left-0 xl:[&&:not(:first-child)::before]:h-px xl:[&&:not(:first-child)::before]:bg-soft-stone xl:[&&:not(:first-child)::before]:bg-none xl:[&&:not(:last-child)]:shadow-none xl:[&&:not(:last-child)]:inset-shadow-none xl:[&&_h2]:text-[length:28px] [&&_h2]:leading-8.5 max-xl:[&&_h2]:leading-8 xl:[&&_h2]:leading-8.5"
              }
              tabIndex={-1}
            >
              <span
                className={
                  "policy-number text-peploe-burgundy text-[length:28px] max-xl:text-[length:24px] xl:row-start-1 xl:row-end-[3] xl:text-[length:32px] leading-8.5 max-xl:leading-8 xl:leading-9.5"
                }
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 id={`${section._key}-heading`}>{section.heading}</h2>
              <div
                className={
                  "policy-sectionCopy col-start-2 col-end-auto min-w-0 text-text-secondary text-[length:16px] wrap-anywhere [&&_a]:text-peploe-burgundy [&&_a]:underline [&&_a]:decoration-solid [&&_a]:decoration-current [&&_a]:decoration-auto [&&_a]:underline-offset-2 [&&_ul]:mt-2 [&&_ul]:pl-7 [&&_ul]:list-disc [&&_li::marker]:text-peploe-burgundy max-xl:col-span-full max-xl:[&&_ul]:mt-3 max-xl:[&&_ul]:pl-5 max-xl:[&&_li_+_li]:mt-1.5 leading-6 max-xl:leading-6.5"
                }
              >
                <p>
                  {section.body.map((part) => (
                    <Fragment key={part.text}>
                      {part.href ? (
                        <a href={part.href}>{part.text}</a>
                      ) : (
                        part.text
                      )}
                    </Fragment>
                  ))}
                </p>
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section
        className={
          "policy-help border border-solid border-soft-stone bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none [&&_h2]:mt-2 [&&_h2]:text-[length:36px] max-xl:[&&_h2]:text-[length:32px] xl:[&&_h2]:mt-2 xl:[&&_h2]:text-[length:42px] [&&_h2]:leading-10.5 max-xl:[&&_h2]:leading-9.5 xl:[&&_h2]:leading-12"
        }
        aria-labelledby="policy-help-title"
      >
        <div
          className={cn(
            "site-container",
            "policy-helpContainer grid gap-6 pt-8 pb-8 max-xl:gap-4 md:max-xl:max-w-180 xl:grid-cols-[433px_minmax(0,_1fr)] xl:gap-10 xl:min-h-41.5 xl:pt-[31px] xl:pb-[31px]",
          )}
        >
          <div
            data-scroll-reveal
            className={
              "policy-helpHeading xl:flex xl:flex-col xl:justify-center xl:border-r xl:[border-right-style:solid] xl:border-r-soft-stone"
            }
          >
            <p
              className={
                "policy-eyebrow text-text-secondary text-[length:14px] font-medium tracking-[0.1em] [.policy-help_&&]:text-peploe-burgundy max-xl:text-peploe-burgundy max-xl:text-[length:12px] leading-5 max-xl:leading-4.5"
              }
            >
              {POLICY_HELP.eyebrow}
            </p>
            <h2 id="policy-help-title">{POLICY_HELP.heading}</h2>
          </div>
          <div
            data-scroll-reveal
            className={
              "policy-helpDetails text-text-secondary text-[length:16px] xl:self-center leading-6 max-xl:leading-6.5"
            }
          >
            <p>{POLICY_HELP.description}</p>
            <div
              className={
                "policy-contactActions flex flex-wrap gap-x-4 mt-3 [&&_a]:inline-flex [&&_a]:items-center [&&_a]:min-h-11 [&&_a]:text-ink [&&_a_+_a]:text-peploe-burgundy max-xl:grid max-xl:gap-2 max-xl:mt-5 max-xl:[&&_a]:justify-center max-xl:[&&_a]:min-h-12 max-xl:[&&_a]:pt-2.5 max-xl:[&&_a]:pr-3 max-xl:[&&_a]:pb-2.5 max-xl:[&&_a]:pl-3 max-xl:[&&_a]:border max-xl:[&&_a]:border-solid max-xl:[&&_a]:border-[color-mix(in_srgb,_var(--peploe-burgundy)_30%,_transparent)] max-xl:[&&_a]:rounded-[4px] max-xl:[&&_a]:text-[length:14px] max-xl:[&&_a]:font-medium max-xl:[&&_a]:wrap-anywhere max-xl:[&&_a:hover]:bg-warm-cream max-xl:[&&_a:hover]:bg-none xl:items-center xl:gap-8 xl:mt-3 xl:[&&_a]:min-h-11 xl:[&&_a_+_a]:relative xl:[&&_a_+_a::before]:content-[''] xl:[&&_a_+_a::before]:absolute xl:[&&_a_+_a::before]:top-3 xl:[&&_a_+_a::before]:-left-[17px] xl:[&&_a_+_a::before]:w-px xl:[&&_a_+_a::before]:h-5 xl:[&&_a_+_a::before]:bg-[color-mix(in_srgb,_var(--peploe-burgundy)_50%,_transparent)] xl:[&&_a_+_a::before]:bg-none"
              }
            >
              <TrackedAnchor
                href={`tel:${POLICY_HELP.phone}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "policy_page",
                  destination: "phone",
                }}
              >
                {POLICY_HELP.phoneLabel}
              </TrackedAnchor>
              <TrackedAnchor
                href={`mailto:${POLICY_HELP.email}`}
                interaction={{
                  event: GA4Event.ContactClick,
                  placement: "policy_page",
                  destination: "email",
                }}
              >
                {POLICY_HELP.email}
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
