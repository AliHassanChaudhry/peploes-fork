import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/app/atoms/tracked-link";
import { SeasonalJoin } from "@/components/app/compounds/seasonal";
import { SeasonalEventRelated } from "@/components/app/compounds/seasonal-event-related";
import { SeasonalEventAction } from "@/components/app/molecules/seasonal-event-action";
import { Button } from "@/components/ui/button";
import { FOCUS_RING, ROUTES } from "@/lib/constants";
import { GA4Event } from "@/lib/enums";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { ISeasonalEventProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SeasonalEvent({ content, join }: ISeasonalEventProps) {
  const { hero, details, menu, story, gallery, invitation, related } = content;

  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "seasonal-page text-ink bg-warm-cream bg-none [body:has(&.seasonal-page)]:[overflow-anchor:none] [&&_:is(a,_button):focus-visible]:outline-2 [&&_:is(a,_button):focus-visible]:outline-solid [&&_:is(a,_button):focus-visible]:outline-current [&&_:is(a,_button):focus-visible]:outline-offset-4",
        "seasonal-event-page [&&_:is(h1,_h2,_h3,_dt)]:font-[family-name:var(--font-eb-garamond),_serif] [&&_:is(h1,_h2,_h3,_dt)]:font-normal",
      )}
    >
      <section
        className={
          "seasonal-event-hero relative overflow-hidden [&&::after]:content-[''] [&&::after]:absolute [&&::after]:top-0 [&&::after]:right-0 [&&::after]:bottom-0 [&&::after]:left-0 [&&::after]:pointer-events-none [&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-cream-rgb)_/_97%),_rgb(var(--overlay-cream-rgb)_/_86%)_)] [&&::after]:bg-transparent lg:[&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-cream-rgb)_/_98.0392%),_rgb(var(--overlay-cream-rgb)_/_90.9804%)_47.204928%,_rgb(var(--overlay-cream-rgb)_/_18.0392%)_60.423192%,_rgb(var(--overlay-cream-rgb)_/_0%)_72%_)] lg:[&&::after]:bg-transparent"
        }
        aria-labelledby="event-title"
      >
        <Image
          {...hero.image}
          fill
          preload
          sizes="100vw"
          className={cn(
            "seasonal-event-cover object-cover",
            "seasonal-event-heroImage object-[center_59.67%]",
          )}
        />
        <div className="site-container">
          <div
            data-scroll-reveal
            className={
              "seasonal-event-heroCopy relative z-1 pt-12 pb-12 max-w-[671px] [&&_h1]:mt-2 [&&_h1]:text-[length:clamp(36px,_11vw,_48px)] [&&_h1]:tracking-[-1.5px] [&&_h1]:whitespace-pre-line [&&_>_p:last-child]:text-[length:18px] max-sm:pt-10 max-sm:pb-10 max-sm:[&&_h1]:mt-2 max-sm:[&&_h1]:tracking-[-1px] max-sm:[&&_>_p:last-child]:text-[length:16px] sm:[&&_h1]:text-[length:64px] lg:min-h-104 lg:pt-17 lg:pb-12 lg:[&&_h1]:mt-2 lg:[&&_h1]:text-[length:72px] [&&_h1]:leading-[1] [&&_>_p:last-child]:leading-6 max-sm:[&&_>_p:last-child]:leading-6 sm:[&&_h1]:leading-16 lg:[&&_h1]:leading-[69px]"
            }
          >
            <p
              className={
                "seasonal-event-eyebrow [.seasonal-event-page_&&]:text-peploe-burgundy [.seasonal-event-page_&&]:font-[family-name:inherit] [.seasonal-event-page_&&]:text-[length:14px] [.seasonal-event-page_&&]:font-medium [.seasonal-event-page_&&]:leading-4 [.seasonal-event-page_&&]:tracking-[0.1em] [.seasonal-event-page_&&]:uppercase [.seasonal-event-page_h2&&]:font-[family-name:inherit] [.seasonal-event-page_h2&&]:font-medium [.seasonal-event-story_&&]:text-inherit max-sm:[.seasonal-event-page_&&]:text-[length:12px]"
              }
            >
              {hero.eyebrow}
            </p>
            <h1 id="event-title">{hero.heading}</h1>
            <span
              className={
                "seasonal-event-heroDivider block w-14.5 h-px mt-4 mb-[17px] bg-text-secondary bg-none"
              }
              aria-hidden="true"
            />
            <p>{hero.description}</p>
          </div>
        </div>
      </section>

      {details && details.length > 0 && (
        <section
          className={
            "seasonal-event-details pt-8 pb-8 bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none lg:pt-12 lg:pb-12"
          }
          aria-label="Event information"
        >
          <dl
            className={cn(
              "site-container",
              "seasonal-event-detailsList grid gap-6 sm:grid-cols-2 lg:grid-cols-[23.668981%_26.060957%_26.060957%_24.209105%] lg:gap-0",
            )}
          >
            {details.map((detail) => (
              <div
                data-scroll-reveal
                key={detail._key ?? detail.label}
                className={
                  "seasonal-event-detail relative pl-17.5 [&&_dt]:text-[length:22px] [&&_dt]:font-medium! [&&_dd]:mt-1.5 [&&_dd]:text-text-secondary [&&_dd]:text-[length:14px] [&&_dd]:whitespace-pre-line max-sm:min-h-10 max-sm:pl-15 lg:min-h-17.5 lg:pl-[99px] lg:pr-7.5 lg:border-l lg:[border-left-style:solid] lg:border-l-soft-stone lg:[&&:first-child]:pl-17.5 lg:[&&:first-child]:border-l-0 lg:[&&:first-child]:[border-left-style:none] lg:[&&:first-child]:border-l-current lg:[&&:last-child]:pr-0 [&&_dt]:leading-6 [&&_dd]:leading-5"
                }
              >
                <dt>
                  <Image
                    {...detail.icon}
                    alt=""
                    className={
                      "seasonal-event-detailIcon absolute top-0 left-0 max-sm:w-10 max-sm:h-10 lg:left-[29px] lg:[.seasonal-event-detail:first-child_&&]:left-0"
                    }
                  />
                  {detail.label}
                </dt>
                <dd>{detail.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {menu && (
        <section
          className={
            "seasonal-event-menu pt-12 pb-12 [&&_h2]:mt-2 [&&_h2]:text-[length:44px] max-sm:pt-10 max-sm:pb-10 max-sm:[&&_h2]:text-[length:42px] max-sm:[&&_h2]:mt-2 sm:[&&_h2]:text-[length:56px] lg:pt-16.5 lg:pb-7 lg:[&&_h2]:mt-2 lg:[&&_h2]:text-[length:64px] lg:[&&_h2]:tracking-[-1px] [&&_h2]:leading-11.5 max-sm:[&&_h2]:leading-11 sm:[&&_h2]:leading-14.5 lg:[&&_h2]:leading-[65px]"
          }
          aria-labelledby="event-menu"
        >
          <div className="site-container">
            <p
              data-scroll-reveal
              className={cn(
                "seasonal-event-eyebrow [.seasonal-event-page_&&]:text-peploe-burgundy [.seasonal-event-page_&&]:font-[family-name:inherit] [.seasonal-event-page_&&]:text-[length:14px] [.seasonal-event-page_&&]:font-medium [.seasonal-event-page_&&]:leading-4 [.seasonal-event-page_&&]:tracking-[0.1em] [.seasonal-event-page_&&]:uppercase [.seasonal-event-page_h2&&]:font-[family-name:inherit] [.seasonal-event-page_h2&&]:font-medium [.seasonal-event-story_&&]:text-inherit max-sm:[.seasonal-event-page_&&]:text-[length:12px]",
                "seasonal-event-ruledEyebrow flex items-center gap-2.5 [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:shrink-0 [&&::before]:bg-current [&&::before]:bg-none",
              )}
            >
              {menu.eyebrow}
            </p>
            <h2 data-scroll-reveal id="event-menu">
              {menu.heading}
            </h2>
            <p
              data-scroll-reveal
              className={
                "seasonal-event-menuDescription mt-6 text-text-secondary text-[length:18px] max-sm:text-[length:16px] max-sm:mt-4 lg:mt-5 lg:text-[length:22px] leading-[27px] max-sm:leading-6 lg:leading-[31px]"
              }
            >
              {menu.description}
            </p>
            <div
              className={
                "seasonal-event-menuCards grid gap-7 mt-8 max-sm:gap-6 max-sm:mt-7 sm:grid-cols-2 sm:gap-10 lg:mt-12"
              }
            >
              {menu.cards.map((card) => {
                const image = (
                  <Image
                    {...card.image}
                    fill
                    sizes="(min-width: 1584px) 700px, (min-width: 1280px) calc((100vw - 184px) / 2), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 32px)"
                    className={cn(
                      "seasonal-event-cover object-cover",
                      "transition-transform duration-(--duration-base) ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none",
                    )}
                  />
                );
                return (
                  <article
                    key={card.id ?? card.title}
                    className={
                      "seasonal-event-menuCard shadow-[0_4px_12px_color-mix(in_srgb,_var(--ink)_6.27451%,_transparent)] [&&:first-child_img]:object-[center_67.133%] [&&:nth-child(2)_img]:object-[center_32.867%] [&&_h3]:text-[length:32px] max-sm:[&&_h3]:text-[length:28px] [&&_h3]:leading-8.5 max-sm:[&&_h3]:leading-7.5 lg:[&&_h3]:leading-8"
                    }
                    data-image-card
                  >
                    {card.href ? (
                      <Link
                        href={card.href as Route}
                        prefetch={true}
                        aria-label={card.title}
                        data-card-image
                        className={cn(
                          FOCUS_RING,
                          "seasonal-event-menuImage relative h-52 max-sm:h-auto max-sm:aspect-[3/2]",
                          "group block overflow-hidden",
                        )}
                      >
                        {image}
                      </Link>
                    ) : (
                      <div
                        className={
                          "seasonal-event-menuImage relative h-52 max-sm:h-auto max-sm:aspect-[3/2]"
                        }
                      >
                        {image}
                      </div>
                    )}
                    <div
                      data-scroll-reveal
                      className={
                        "seasonal-event-menuCardCopy pt-5 pr-6 pb-8 pl-6 [&&_>_p]:mt-2 [&&_>_p]:text-text-secondary [&&_>_p]:text-[length:18px] max-sm:[&&_>_p]:text-[length:16px] max-sm:pt-5 max-sm:pr-5 max-sm:pb-5 max-sm:pl-5 lg:min-h-[171px] lg:pt-4 lg:pb-10 [&&_>_p]:leading-6.5 max-sm:[&&_>_p]:leading-6"
                      }
                    >
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      {card.href && (
                        <SeasonalEventAction
                          label={card.action}
                          href={card.href}
                        />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {story && (
        <section
          className={
            "seasonal-event-story [&&_h2]:mt-2 [&&_h2]:text-[length:44px] relative bg-button-primary-pressed bg-none text-warm-cream max-sm:[&&_h2]:text-[length:42px] max-sm:[&&_h2]:mt-2 sm:[&&_h2]:text-[length:56px] lg:grid lg:grid-cols-[minmax(0,_1fr)_47.777778%] lg:gap-12 lg:min-h-117.5 lg:[&&_h2]:text-[length:72px] lg:[&&_h2]:mt-2 lg:[&&_h2]:tracking-[-1px] [&&_h2]:leading-11.5 max-sm:[&&_h2]:leading-11 sm:[&&_h2]:leading-14.5 lg:[&&_h2]:leading-[73px]"
          }
          aria-labelledby="event-story"
        >
          <div
            className={cn(
              "site-container",
              "seasonal-event-storyContent lg:[.seasonal-event-story_&&]:w-auto lg:[.seasonal-event-story_&&]:min-w-0 lg:[.seasonal-event-story_&&]:max-w-none lg:[.seasonal-event-story_&&]:ml-0 lg:[.seasonal-event-story_&&]:mr-0 lg:[.seasonal-event-story_&&]:pl-6 xl:[.seasonal-event-story_&&]:pl-[max(72px,_calc((100vw_-_var(--site-content-max-width))_/_2))]",
            )}
          >
            <div
              data-scroll-reveal
              className={
                "seasonal-event-storyCopy pt-12 pb-12 max-sm:pt-10 max-sm:pb-10 lg:w-150 lg:max-w-full lg:pt-13.5 lg:pb-12"
              }
            >
              <p
                data-scroll-reveal
                className={cn(
                  "seasonal-event-eyebrow [.seasonal-event-page_&&]:text-peploe-burgundy [.seasonal-event-page_&&]:font-[family-name:inherit] [.seasonal-event-page_&&]:text-[length:14px] [.seasonal-event-page_&&]:font-medium [.seasonal-event-page_&&]:leading-4 [.seasonal-event-page_&&]:tracking-[0.1em] [.seasonal-event-page_&&]:uppercase [.seasonal-event-page_h2&&]:font-[family-name:inherit] [.seasonal-event-page_h2&&]:font-medium [.seasonal-event-story_&&]:text-inherit max-sm:[.seasonal-event-page_&&]:text-[length:12px]",
                  "seasonal-event-ruledEyebrow flex items-center gap-2.5 [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:shrink-0 [&&::before]:bg-current [&&::before]:bg-none",
                )}
              >
                {story.eyebrow}
              </p>
              <h2 id="event-story">{story.heading}</h2>
              {story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph._key}
                  className={
                    "seasonal-event-storyParagraph mt-6 text-[length:18px] max-sm:text-[length:16px] max-sm:mt-4 max-sm:[.seasonal-event-storyParagraph_+_&&]:mt-6 lg:mt-5 lg:text-[length:22px] lg:[.seasonal-event-storyParagraph_+_&&]:mt-[31px] leading-[27px] max-sm:leading-6 lg:leading-[31px]"
                  }
                >
                  {paragraph.text}
                </p>
              ))}
            </div>
          </div>
          <div
            className={
              "seasonal-event-storyImage relative h-85 max-sm:h-auto max-sm:aspect-[3/2] lg:w-auto lg:h-auto"
            }
          >
            <Image
              {...story.image}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className={"seasonal-event-cover object-cover"}
            />
          </div>
        </section>
      )}

      {gallery && gallery.images.length > 0 && (
        <section
          className={
            "seasonal-event-gallery pt-12 pb-12 [&&_h2]:mt-2 [&&_h2]:text-[length:44px] max-sm:pt-10 max-sm:pb-10 max-sm:[&&_h2]:text-[length:42px] max-sm:[&&_h2]:mt-2 sm:[&&_h2]:text-[length:56px] lg:[&&_h2]:text-[length:72px] lg:[&&_h2]:mt-2 [&&_h2]:leading-11.5 max-sm:[&&_h2]:leading-11 sm:[&&_h2]:leading-14.5 lg:[&&_h2]:leading-18.5"
          }
          aria-labelledby="event-gallery"
        >
          <div className="site-container">
            <p
              data-scroll-reveal
              className={cn(
                "seasonal-event-eyebrow [.seasonal-event-page_&&]:text-peploe-burgundy [.seasonal-event-page_&&]:font-[family-name:inherit] [.seasonal-event-page_&&]:text-[length:14px] [.seasonal-event-page_&&]:font-medium [.seasonal-event-page_&&]:leading-4 [.seasonal-event-page_&&]:tracking-[0.1em] [.seasonal-event-page_&&]:uppercase [.seasonal-event-page_h2&&]:font-[family-name:inherit] [.seasonal-event-page_h2&&]:font-medium [.seasonal-event-story_&&]:text-inherit max-sm:[.seasonal-event-page_&&]:text-[length:12px]",
                "seasonal-event-ruledEyebrow flex items-center gap-2.5 [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:shrink-0 [&&::before]:bg-current [&&::before]:bg-none",
              )}
            >
              {gallery.eyebrow}
            </p>
            <h2 data-scroll-reveal id="event-gallery">
              {gallery.heading}
            </h2>
            <div
              className={
                "seasonal-event-galleryImages grid gap-6 mt-9 max-sm:gap-4 max-sm:mt-7 sm:grid-cols-3 lg:mt-11.5"
              }
            >
              {gallery.images.map((photo) => (
                <div
                  key={photo._key ?? photo.src}
                  className={
                    "seasonal-event-galleryImage relative aspect-[416/269.674]"
                  }
                >
                  <Image
                    {...photo}
                    fill
                    sizes="(min-width: 1584px) 464px, (min-width: 1280px) calc((100vw - 192px) / 3), (min-width: 640px) calc((100vw - 96px) / 3), calc(100vw - 48px)"
                    className={"seasonal-event-cover object-cover"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {invitation && (
        <section
          className={
            "seasonal-event-invitation relative overflow-hidden [&&::after]:content-[''] [&&::after]:absolute [&&::after]:top-0 [&&::after]:right-0 [&&::after]:bottom-0 [&&::after]:left-0 [&&::after]:pointer-events-none text-warm-cream bg-ink bg-none [&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb)_/_95%),_rgb(var(--overlay-warm-ink-rgb)_/_65%)_)] [&&::after]:bg-transparent [&&_h2]:text-[length:44px] max-sm:[&&_h2]:text-[length:42px] lg:[&&::after]:bg-[image:linear-gradient(_90deg,_var(--ink),_color-mix(in_srgb,_var(--ink)_80%,_transparent)_40.09913%,_transparent_77.01389%_)] lg:[&&::after]:bg-transparent lg:[&&_h2]:text-[length:60px] [&&_h2]:leading-11.5 max-sm:[&&_h2]:leading-11 lg:[&&_h2]:leading-15.5"
          }
          aria-labelledby="event-invitation"
        >
          <Image
            {...invitation.image}
            fill
            sizes="100vw"
            className={"seasonal-event-cover object-cover"}
          />
          <div className="site-container">
            <div
              data-scroll-reveal
              className={
                "seasonal-event-invitationCopy relative z-1 pt-12 pb-12 max-w-135 [&&_>_p]:max-w-107.5 [&&_>_p]:mt-7 [&&_>_p]:text-[length:20px] max-sm:[&&_>_p]:hidden max-sm:[&&_>_p]:text-[length:16px] max-sm:[&&_>_p]:mt-4 max-sm:flex max-sm:min-h-110 max-sm:flex-col max-sm:justify-end max-sm:pt-32 max-sm:pb-10 lg:min-h-93 lg:pt-18.5 lg:pb-18 lg:[&&_>_p]:mt-7 lg:[&&_>_p]:text-[length:21px] [&&_>_p]:leading-7 max-sm:[&&_>_p]:leading-6 lg:[&&_>_p]:leading-7.5"
              }
            >
              <h2 id="event-invitation">{invitation.heading}</h2>
              <p>{invitation.description}</p>
              <div data-button-pair className="mt-6 gap-2.5 sm:mt-7 sm:gap-4">
                <Button
                  asChild
                  variant="brand-primary"
                  className="h-auto min-h-11 w-full max-w-full gap-2 whitespace-normal rounded-[4px] px-6 py-2.5 text-base leading-[22px] has-[>svg]:px-6 sm:min-h-12 sm:w-auto sm:text-lg sm:leading-[26px] lg:min-w-[249px] lg:px-5 lg:has-[>svg]:px-5"
                >
                  <TrackedLink
                    href={ROUTES.BOOK_A_TABLE}
                    interaction={{
                      event: GA4Event.BookingClick,
                      placement: "seasonal_event",
                    }}
                  >
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {invitation.bookingAction}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </TrackedLink>
                </Button>
                <Button
                  asChild
                  variant="brand-secondary-inverse"
                  className="h-auto min-h-11 w-full max-w-full gap-2 whitespace-normal rounded-none px-6 py-2.5 text-base leading-[22px] has-[>svg]:px-6 sm:min-h-12 sm:w-auto sm:text-lg sm:leading-[26px] lg:min-w-[206px] lg:px-5 lg:has-[>svg]:px-5"
                >
                  <Link href={`${ROUTES.PRIVATE_DINING}#enquire`}>
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {invitation.enquiryAction}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {related && related.cards.length > 0 && (
        <SeasonalEventRelated content={related} />
      )}
      <SeasonalJoin join={join} />
    </main>
  );
}
