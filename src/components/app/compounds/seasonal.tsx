import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/app/atoms/tracked-link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { SEASONAL_UI } from "@/lib/constants/seasonal";
import { GA4Event } from "@/lib/enums";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { seasonalPath } from "@/lib/seasonal-data";
import type {
  ISeasonalJoinProps,
  ISeasonalProps,
  TWhatsOnPage,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export function Seasonal({ content, months }: ISeasonalProps) {
  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "seasonal-page text-ink bg-warm-cream bg-none [body:has(&.seasonal-page)]:[overflow-anchor:none] [&&_:is(a,_button):focus-visible]:outline-2 [&&_:is(a,_button):focus-visible]:outline-solid [&&_:is(a,_button):focus-visible]:outline-current [&&_:is(a,_button):focus-visible]:outline-offset-4",
      )}
    >
      <SeasonalHero {...content.hero} />
      <SeasonalDiary content={content} months={months} />
      {content.terrace && <SeasonalTerrace {...content.terrace} />}
      <SeasonalJoin join={content.join} />
    </main>
  );
}

export function SeasonalJoin({ join }: ISeasonalJoinProps) {
  return (
    <section
      className={
        "seasonal-join relative overflow-hidden text-warm-cream bg-[rgb(var(--overlay-warm-ink-rgb))] bg-none [&&::after]:content-[''] [&&::after]:absolute [&&::after]:top-0 [&&::after]:right-0 [&&::after]:bottom-0 [&&::after]:left-0 [&&::after]:pointer-events-none [&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb)_/_92%),_rgb(var(--overlay-warm-ink-rgb)_/_65%)_)] [&&::after]:bg-transparent max-sm:[&&::after]:bg-[image:linear-gradient(_180deg,_rgb(var(--overlay-warm-ink-rgb)_/_8%)_0%,_rgb(var(--overlay-warm-ink-rgb)_/_35%)_30%,_rgb(var(--overlay-warm-ink-rgb)_/_85%)_60%,_rgb(var(--overlay-warm-ink-rgb)_/_96%)_100%_)] max-sm:[&&::after]:bg-transparent lg:[&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-dark-ink-rgb))_1.26153%,_rgb(var(--overlay-dark-ink-rgb)_/_80%)_40.0266%,_rgb(var(--overlay-dark-ink-rgb)_/_0%)_)] lg:[&&::after]:bg-transparent"
      }
      aria-labelledby="seasonal-join"
    >
      <div
        className={
          "seasonal-joinImage absolute top-0 right-0 bottom-0 left-0 [&&_img]:object-[65%_60%] max-sm:[&&_img]:transform-[scale(1.5)] max-sm:[&&_img]:origin-[65%_bottom] lg:right-auto lg:bottom-auto lg:top-1/2 lg:-left-[0.0166154%] lg:w-[140.4861%] lg:aspect-[3/4] lg:-translate-y-[58.239%]"
        }
      >
        <Image
          {...join.image}
          fill
          sizes="(min-width: 1024px) 141vw, (min-width: 640px) 100vw, 150vw"
          className={"seasonal-cover object-cover"}
        />
      </div>
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "seasonal-joinCopy relative z-1 pt-12 pb-12 [&&_h2]:mt-2 [&&_h2]:text-[length:44px] max-w-176 max-sm:flex max-sm:min-h-130 max-sm:flex-col max-sm:justify-end max-sm:pb-10 max-sm:[&&_h2]:mt-2 max-sm:pt-36 sm:[&&_h2]:text-[length:60px] sm:[&&_h2]:whitespace-pre-line lg:pt-13 lg:pb-18 lg:[&&_h2]:text-[length:70px] max-sm:[&&_h2]:text-[length:30px] [&&_h2]:leading-11.5 sm:[&&_h2]:leading-15.5 lg:[&&_h2]:leading-[71px] max-sm:[&&_h2]:leading-10"
          }
        >
          <p
            className={
              "seasonal-eyebrow text-[length:14px] font-medium tracking-[0.1em] uppercase [.seasonal-diaryIntroduction_&&]:text-peploe-burgundy max-sm:text-[length:12px] lg:[.seasonal-diaryIntroduction_&&]:col-span-full lg:[.seasonal-diaryIntroduction_&&]:mb-2 leading-4"
            }
          >
            {join.eyebrow}
          </p>
          <h2 id="seasonal-join">{join.heading}</h2>
          <p
            className={
              "seasonal-description mt-5 text-[length:18px] [.seasonal-terraceCopy_&&]:text-text-secondary max-sm:[.seasonal-joinCopy_&&]:hidden max-sm:mt-4 max-sm:text-[length:16px] leading-[25px] max-sm:leading-6"
            }
          >
            {join.description}
          </p>
          <div data-button-pair className="mt-6 gap-2.5 sm:mt-7 sm:gap-5">
            <Button
              asChild
              variant="brand-primary"
              size="cta"
              className="h-auto min-h-11 w-full whitespace-normal leading-[22px] sm:w-auto sm:min-w-[156px] sm:gap-1 sm:leading-6"
            >
              <TrackedLink
                href={ROUTES.BOOK_A_TABLE}
                interaction={{
                  event: GA4Event.BookingClick,
                  placement: "seasonal",
                }}
              >
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  {join.bookingAction}
                </span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </TrackedLink>
            </Button>
            <Button
              asChild
              variant="brand-secondary-inverse"
              size="cta"
              className="h-auto min-h-11 w-full whitespace-normal leading-[22px] sm:w-auto sm:min-w-[148px] sm:gap-1.5 sm:px-[18px] sm:py-[9px] sm:leading-6 sm:has-[>svg]:px-[18px]"
            >
              <Link href={ROUTES.VISIT_CONTACT}>
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  {join.contactAction}
                </span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeasonalHero(hero: TWhatsOnPage["hero"]) {
  return (
    <section
      className={
        "seasonal-hero relative overflow-hidden text-warm-cream bg-[rgb(var(--overlay-warm-ink-rgb))] bg-none [&&::after]:content-[''] [&&::after]:absolute [&&::after]:top-0 [&&::after]:right-0 [&&::after]:bottom-0 [&&::after]:left-0 [&&::after]:pointer-events-none [&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb)_/_92%),_rgb(var(--overlay-warm-ink-rgb)_/_65%)_)] [&&::after]:bg-transparent max-sm:[&&::after]:bg-[image:linear-gradient(_180deg,_rgb(var(--overlay-warm-ink-rgb)_/_8%)_0%,_rgb(var(--overlay-warm-ink-rgb)_/_35%)_30%,_rgb(var(--overlay-warm-ink-rgb)_/_85%)_60%,_rgb(var(--overlay-warm-ink-rgb)_/_96%)_100%_)] max-sm:[&&::after]:bg-transparent lg:[&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb))_29.701%,_rgb(var(--overlay-warm-ink-rgb)_/_80%)_48.568%,_rgb(var(--overlay-warm-ink-rgb)_/_18.0392%)_76.727%,_rgb(var(--overlay-warm-ink-rgb)_/_0%)_98.368%_)] lg:[&&::after]:bg-transparent"
      }
      aria-labelledby="seasonal-title"
    >
      <div
        className={
          "seasonal-heroImage absolute top-0 right-0 bottom-0 left-0 [&&_img]:object-[58%_center] max-sm:[&&_img]:transform-[scale(1.3)] max-sm:[&&_img]:origin-[58%_80%] lg:left-[26.8314%] lg:right-0 lg:[&&_img]:object-[center_49.954%]"
        }
      >
        <Image
          {...hero.image}
          fill
          preload
          sizes="(min-width: 1024px) 74vw, (min-width: 640px) 100vw, 130vw"
          className={"seasonal-cover object-cover"}
        />
      </div>
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "seasonal-heroCopy relative z-1 pt-12 pb-12 [&&_h1]:mt-2 [&&_h1]:text-[length:44px] max-w-[613px] max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:[&&_h1]:mt-2 max-sm:[&&_h1]:tracking-[-1px] sm:[&&_h1]:text-[length:60px] sm:[&&_h1]:whitespace-pre-line lg:pt-16 lg:pb-12 lg:[&&_h1]:text-[length:72px] max-sm:min-h-[calc(100svh_-_72px)] max-sm:pt-14 max-sm:pb-16 max-sm:[&&_h1]:text-[length:36px] [&&_h1]:leading-11.5 sm:[&&_h1]:leading-15.5 lg:[&&_h1]:leading-[73px] max-sm:[&&_h1]:leading-10"
          }
        >
          <p
            className={
              "seasonal-eyebrow text-[length:14px] font-medium tracking-[0.1em] uppercase [.seasonal-diaryIntroduction_&&]:text-peploe-burgundy max-sm:text-[length:12px] lg:[.seasonal-diaryIntroduction_&&]:col-span-full lg:[.seasonal-diaryIntroduction_&&]:mb-2 leading-4"
            }
          >
            {hero.eyebrow}
          </p>
          <h1 id="seasonal-title">{hero.heading}</h1>
          <p
            className={
              "seasonal-description mt-5 text-[length:18px] [.seasonal-terraceCopy_&&]:text-text-secondary max-sm:[.seasonal-joinCopy_&&]:hidden max-sm:mt-4 max-sm:text-[length:16px] leading-[25px] max-sm:leading-6"
            }
          >
            {hero.description}
          </p>
          <Button
            asChild
            variant="brand-primary"
            size="cta"
            className="mt-6 w-full whitespace-normal sm:hidden"
          >
            <a href="#upcoming-events">
              {SEASONAL_UI.upcomingEventsAction}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SeasonalDiary({ content, months }: ISeasonalProps) {
  const { diary } = content;

  return (
    <section
      id="upcoming-events"
      className={"seasonal-diary scroll-mt-25 pt-12 pb-12"}
      aria-labelledby="seasonal-diary"
    >
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "seasonal-diaryIntroduction grid gap-6 [&&_h2]:mt-2 [&&_h2]:text-[length:56px] [&&_>_p]:text-text-secondary [&&_>_p]:text-[length:18px] max-sm:gap-4 max-sm:[&&_h2]:mt-2 max-sm:[&&_>_p]:text-[length:16px] lg:grid-cols-[minmax(0,_560fr)_minmax(0,_530fr)] lg:items-center lg:gap-[0_32px] lg:[&&_>_div]:contents lg:[&&_h2]:mt-0 lg:[&&_h2]:[text-box:trim-both_cap_alphabetic] lg:[&&_h2]:text-[length:84px] lg:[&&_>_p]:justify-self-end lg:[&&_>_p]:[text-box:trim-both_cap_alphabetic] lg:[&&_>_p]:max-w-132.5 lg:[&&_>_p]:text-[length:20px] max-sm:[&&_h2]:text-[length:30px] [&&_h2]:leading-14.5 [&&_>_p]:leading-6.5 max-sm:[&&_h2]:leading-11 max-sm:[&&_>_p]:leading-6 lg:[&&_h2]:leading-21.5 lg:[&&_>_p]:leading-7"
          }
        >
          <div>
            <p
              className={
                "seasonal-eyebrow text-[length:14px] font-medium tracking-[0.1em] uppercase [.seasonal-diaryIntroduction_&&]:text-peploe-burgundy max-sm:text-[length:12px] lg:[.seasonal-diaryIntroduction_&&]:col-span-full lg:[.seasonal-diaryIntroduction_&&]:mb-2 leading-4"
              }
            >
              {diary.eyebrow}
            </p>
            <h2 id="seasonal-diary">{diary.heading}</h2>
          </div>
          <p>{diary.description}</p>
        </div>
        <div className={"seasonal-months mt-8"}>
          {months.length === 0 && <p>{diary.emptyMessage}</p>}
          {months.map((month) => (
            <section
              key={month.key}
              className={"seasonal-month"}
              aria-labelledby={`seasonal-${month.key}`}
            >
              <h3
                data-scroll-reveal
                id={`seasonal-${month.key}`}
                className={
                  "seasonal-monthHeading pt-2 pb-2 text-peploe-burgundy bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none text-[length:20px] font-semibold text-center uppercase max-sm:pt-2.5 max-sm:pb-2.5 max-sm:text-[length:16px] max-sm:tracking-[0.06em] lg:text-[length:22px] leading-[29px] max-sm:leading-5"
                }
              >
                {month.name}
              </h3>
              <ul>
                {month.events.map((event) => (
                  <li
                    data-scroll-reveal
                    key={event._id}
                    className={
                      "seasonal-event flex items-center gap-5 pt-7 pb-7 inset-shadow-[0_1px_var(--soft-stone)] [.seasonal-month:not(:last-child)_&&:last-child]:shadow-[inset_0_1px_var(--soft-stone),_inset_0_-1px_var(--soft-stone)] [.seasonal-month:not(:last-child)_&&:last-child]:inset-shadow-none max-sm:items-start max-sm:gap-4 max-sm:pt-6 max-sm:pb-6 sm:gap-8 sm:min-h-56 sm:pt-4 sm:pb-4"
                    }
                  >
                    <p
                      className={
                        "seasonal-eventDate flex flex-[0_0_64px] self-stretch flex-col gap-0.5 pr-3 border-r [border-right-style:solid] border-r-soft-stone text-peploe-burgundy text-[length:14px] font-medium uppercase max-sm:basis-14 max-sm:text-[length:12px] sm:basis-35 sm:self-center sm:min-h-41 sm:pr-6 leading-4 sm:leading-4.5"
                      }
                    >
                      <span
                        className={
                          "seasonal-day [.seasonal-page_:is(h1,_h2,_h4,_&.seasonal-day)]:font-[family-name:var(--font-eb-garamond),_serif] [.seasonal-page_:is(h1,_h2,_h4,_&.seasonal-day)]:font-normal text-[length:48px] max-sm:text-[length:42px] sm:text-[length:68px] leading-13 max-sm:leading-11 sm:leading-17"
                        }
                      >
                        {event.day}
                      </span>
                      <span>{month.abbreviation}</span>
                    </p>
                    <div
                      className={
                        "seasonal-eventCopy flex flex-[0_1_470px] min-w-0 flex-col items-start gap-2 [&&_h4]:text-[length:29px] max-sm:[&&_h4]:text-[length:24px] sm:[&&_h4]:text-[length:36px] [&&_h4]:leading-[31px] max-sm:[&&_h4]:leading-7.5 sm:[&&_h4]:leading-9"
                      }
                    >
                      <p
                        className={
                          "seasonal-category text-peploe-burgundy text-[length:12px] font-medium uppercase sm:text-[length:14px] leading-4"
                        }
                      >
                        {event.category}
                      </p>
                      <h4>{event.title}</h4>
                      <p
                        className={
                          "seasonal-eventDescription text-text-secondary text-[length:16px] sm:text-[length:18px] leading-6"
                        }
                      >
                        {event.summary}
                      </p>
                      <Button
                        asChild
                        variant="brand-text"
                        className={
                          "seasonal-eventAction [&&]:justify-start [&&]:gap-2 [&&]:max-w-full [&&]:h-auto [&&]:min-h-11 [&&]:pt-2 [&&]:pr-0 [&&]:pb-2 [&&]:pl-0 [&&]:rounded-none [&&]:text-[length:16px] [&&]:whitespace-normal [&&]:text-left lg:[&&]:min-h-10 [&&]:leading-6"
                        }
                      >
                        <Link href={seasonalPath(event.slug)} prefetch={true}>
                          {event.action ?? diary.action}
                          <span className="sr-only">: {event.title}</span>
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeasonalTerrace(terrace: NonNullable<TWhatsOnPage["terrace"]>) {
  return (
    <section
      className={
        "seasonal-terrace relative mb-12 text-ink bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none lg:mb-0 max-sm:mb-0"
      }
      aria-labelledby="seasonal-terrace"
    >
      <div
        className={
          "seasonal-terraceImage relative overflow-hidden h-60 [&&_img]:object-[center_bottom] max-sm:h-auto max-sm:aspect-[3/2] lg:absolute lg:top-0 lg:right-auto lg:bottom-0 lg:left-0 lg:w-[40.555556%] lg:h-auto lg:[&&_img]:transform-[scale(1.65)] lg:[&&_img]:origin-[left_15%] [@media_(64rem_<=_width_<_80rem)]:[&&_img]:origin-[left_60%]"
        }
      >
        <Image
          {...terrace.image}
          fill
          sizes="(min-width: 1024px) 67vw, 100vw"
          className={"seasonal-cover object-cover"}
        />
      </div>
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "seasonal-terraceCopy pt-10 pb-12 [&&_h2]:text-[length:42px] max-sm:pt-8 max-sm:pb-10 sm:[&&_h2]:text-[length:56px] lg:w-[54.938272%] lg:ml-auto lg:pt-12 lg:pb-12 lg:[&&_h2]:text-[length:clamp(46px,_4.444444vw,_64px)] max-sm:[&&_h2]:text-[length:30px] [&&_h2]:leading-11 sm:[&&_h2]:leading-14.5 lg:[&&_h2]:leading-[65px] max-sm:[&&_h2]:leading-10"
          }
        >
          <h2 id="seasonal-terrace">{terrace.heading}</h2>
          <p
            className={
              "seasonal-description mt-5 text-[length:18px] [.seasonal-terraceCopy_&&]:text-text-secondary max-sm:[.seasonal-joinCopy_&&]:hidden max-sm:mt-4 max-sm:text-[length:16px] leading-[25px] max-sm:leading-6"
            }
          >
            {terrace.description}
          </p>
        </div>
      </div>
    </section>
  );
}
