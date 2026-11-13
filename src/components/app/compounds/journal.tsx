import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { JournalArticleList } from "@/components/app/compounds/journal-article-list";
import { Button } from "@/components/ui/button";
import { JOURNAL_UI } from "@/lib/constants/journal";
import { dmSans, ebGaramond } from "@/lib/fonts";
import {
  formatJournalDate,
  getJournalArticlePath,
  getJournalCategoryPath,
} from "@/lib/journal-data";
import type { IJournalHubProps, TJournalPage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Journal({
  content,
  categories,
  articles,
  initialCategory,
}: IJournalHubProps) {
  const featured = content.featuredArticle;
  const featuredHref = getJournalArticlePath(featured.slug);

  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "journal-page text-ink bg-warm-cream bg-none [&&_:is(h1,_h2)]:font-[family-name:var(--font-eb-garamond),_serif] [&&_:is(h1,_h2)]:font-normal [&&_:is(a,_button):focus-visible]:outline-2 [&&_:is(a,_button):focus-visible]:outline-solid [&&_:is(a,_button):focus-visible]:outline-current [&&_:is(a,_button):focus-visible]:outline-offset-4",
      )}
    >
      <JournalHero {...content.hero} />
      <section
        className={
          "journal-featured pt-12 pb-12 bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none lg:pt-13.5 lg:pb-13.5"
        }
        aria-labelledby={"journal-featured"}
      >
        <div className="site-container">
          <p
            data-scroll-reveal
            className={
              "journal-featuredLabel mb-7 text-peploe-burgundy text-[length:12px] font-medium tracking-[1.5px] uppercase max-sm:mb-4.5 max-sm:text-[length:11px] max-sm:tracking-[1.35px] leading-4.5 max-sm:leading-4"
            }
          >
            {JOURNAL_UI.featuredLabel}
          </p>
          <article
            data-image-card
            className={
              "journal-featuredStory grid gap-6 max-sm:gap-4.5 lg:grid-cols-2 lg:gap-16"
            }
          >
            <Link
              data-scroll-reveal
              data-card-image
              href={featuredHref}
              prefetch={true}
              aria-label={featured.title}
              className={
                "journal-featuredImage relative block min-h-60 overflow-hidden bg-soft-stone bg-none max-sm:min-h-0 max-sm:h-58 lg:min-h-[263px]"
              }
            >
              <Image
                src={featured.heroImage.src}
                alt={featured.heroImage.alt}
                fill
                sizes="(min-width: 1584px) 688px, (min-width: 1280px) calc((100vw - 208px) / 2), (min-width: 1024px) calc((100vw - 96px) / 2), calc(100vw - 32px)"
                className={
                  "journal-cover object-cover [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:transition-[scale] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:duration-[var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:ease-[ease-out] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:[transition-delay:0s] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage:focus-visible_>_&&]:scale-105 [@media_(hover:_hover)_and_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage:hover_>_&&]:scale-105"
                }
              />
            </Link>
            <div
              data-scroll-reveal
              className={
                "journal-featuredCopy flex min-w-0 flex-col items-start gap-4 [&&_h2_a:hover]:underline [&&_h2_a:hover]:decoration-solid [&&_h2_a:hover]:decoration-current [&&_h2_a:hover]:decoration-auto [&&_h2_a:hover]:underline-offset-4 [&&_h2]:text-[length:36px] [&&_h2]:wrap-anywhere max-sm:gap-4.5 max-sm:[&&_h2]:text-[length:30px] [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_h2_a]:block [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_h2_a]:min-h-11 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_h2_a]:-mt-0.5 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_h2_a]:-mb-0.5 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_h2_a]:pt-0.5 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_h2_a]:pb-0.5 lg:[&&_h2]:text-[length:46px] [&&_h2]:leading-10 max-sm:[&&_h2]:leading-[39px] lg:[&&_h2]:leading-13"
              }
            >
              <div className="flex flex-col gap-2">
                <p
                  className={
                    "journal-metadata flex flex-wrap items-center gap-x-3 text-peploe-burgundy text-[length:11px] font-medium tracking-[1.05px] uppercase [&&_a:hover]:underline [&&_a:hover]:decoration-solid [&&_a:hover]:decoration-current [&&_a:hover]:decoration-auto [&&_a:hover]:underline-offset-4 max-sm:text-[length:10px] max-sm:tracking-[0.7px] [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:inline-flex [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:min-h-11 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:-mt-[13.5px] [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:-mb-[13.5px] [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:items-center max-sm:[&&&_a]:-mt-3.5 max-sm:[&&&_a]:-mb-3.5 leading-[17px] max-sm:leading-4"
                  }
                >
                  <Link href={getJournalCategoryPath(featured.category.slug)}>
                    {featured.category.name}
                  </Link>
                  <span aria-hidden="true"> · </span>
                  <span>{featured.readTimeMinutes} min read</span>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={featured.date}>
                    {formatJournalDate(featured.date)}
                  </time>
                </p>
                <h2 id={"journal-featured"}>
                  <Link href={featuredHref}>{featured.title}</Link>
                </h2>
              </div>
              <p
                className={
                  "journal-featuredDescription text-text-secondary text-[length:16px] max-sm:text-[length:16px] leading-[25px] max-sm:leading-6"
                }
              >
                {featured.standfirst}
              </p>
              <Button
                asChild
                variant="brand-text"
                className={
                  "journal-action [&&]:justify-start [&&]:max-w-full [&&]:h-auto [&&]:min-h-11 [&&]:pt-2 [&&]:pr-0 [&&]:pb-2 [&&]:pl-0 [&&]:rounded-none [&&]:text-[length:16px] [&&]:whitespace-normal [&&]:text-left [&&]:leading-6"
                }
              >
                <Link href={featuredHref} data-card-action>
                  {content.listing.articleAction}
                  <span className="sr-only">: {featured.title}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
      <Suspense fallback={<div aria-busy="true" className="min-h-screen" />}>
        <JournalArticleList
          listing={content.listing}
          categories={categories}
          articles={articles.filter((article) => article._id !== featured._id)}
          initialCategory={initialCategory}
        />
      </Suspense>
      <JournalClosing {...content.closing} />
    </main>
  );
}

function JournalHero(hero: TJournalPage["hero"]) {
  return (
    <section
      className={
        "journal-hero relative overflow-hidden text-warm-cream bg-[rgb(var(--overlay-warm-ink-rgb))] bg-none [&&::after]:content-[''] [&&::after]:absolute [&&::after]:top-0 [&&::after]:right-0 [&&::after]:bottom-0 [&&::after]:left-0 [&&::after]:pointer-events-none [&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb)_/_95%)_15%,_rgb(var(--overlay-warm-ink-rgb)_/_80%)_40%,_rgb(var(--overlay-warm-ink-rgb)_/_15%)_100%_)] [&&::after]:bg-transparent max-sm:[&&::after]:bg-[image:linear-gradient(_180deg,_rgb(15_11_10_/_8%)_0%,_rgb(15_11_10_/_35%)_30%,_rgb(15_11_10_/_85%)_60%,_rgb(15_11_10_/_96%)_100%_)] max-sm:[&&::after]:bg-transparent lg:[&&::after]:bg-[image:linear-gradient(_90deg,_rgb(var(--overlay-warm-ink-rgb))_29.701%,_rgb(var(--overlay-warm-ink-rgb)_/_80%)_48.568%,_rgb(var(--overlay-warm-ink-rgb)_/_18.0392%)_76.727%,_rgb(var(--overlay-warm-ink-rgb)_/_0%)_98.368%_)] lg:[&&::after]:bg-transparent"
      }
      aria-labelledby="journal-title"
    >
      {hero.image && (
        <div
          className={
            "journal-heroImage absolute top-0 right-0 bottom-0 left-0 lg:left-[26.8314%] lg:right-0 lg:bottom-auto lg:top-[49.954%] lg:aspect-[1053.53/1250.41] lg:translate-x-0 lg:-translate-y-[49.954%]"
          }
        >
          {/* Preserve the image fill authored in Figma's 1440 × 389px hero. */}
          <Image
            {...hero.image}
            fill
            preload
            sizes="(min-width: 1024px) 73vw, 100vw"
            className={
              "journal-cover object-cover [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:transition-[scale] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:duration-[var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:ease-[ease-out] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:[transition-delay:0s] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage:focus-visible_>_&&]:scale-105 [@media_(hover:_hover)_and_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage:hover_>_&&]:scale-105"
            }
          />
        </div>
      )}
      <div className="site-container">
        <div
          data-scroll-reveal
          className={
            "journal-heroCopy relative z-1 flex flex-col gap-5 max-w-[613px] pt-12 pb-12 [&&_h1]:text-[length:48px] [&&_h1]:tracking-normal max-sm:gap-5 max-sm:min-h-[calc(100svh_-_72px)] max-sm:justify-end max-sm:pt-10 max-sm:pb-20 max-sm:[&&_h1]:text-[length:36px] max-sm:[&&_h1]:tracking-normal lg:min-h-[389px] lg:pt-16 lg:pb-12 lg:[&&_h1]:text-[length:72px] [&&_h1]:leading-[1.02] max-sm:[&&_h1]:leading-13 lg:[&&_h1]:leading-[73px]"
          }
        >
          <div className="flex flex-col gap-2">
            <p
              className={
                "journal-heroEyebrow text-[length:14px] font-medium tracking-[1.4px] uppercase max-sm:text-[length:11px] max-sm:tracking-[1.35px] leading-4"
              }
            >
              {hero.eyebrow}
            </p>
            <h1 id="journal-title">{hero.heading}</h1>
          </div>
          <p
            className={
              "journal-standfirst text-soft-stone font-[family-name:var(--font-eb-garamond),_serif] text-[length:28px] max-sm:text-warm-cream lg:text-[length:31px] max-sm:text-[length:16px] leading-8.5 max-sm:leading-[31px] lg:leading-[39px]"
            }
          >
            {hero.standfirst}
          </p>
          <p
            className={
              "journal-description text-[length:16px] max-sm:[.journal-heroCopy_&&]:hidden lg:text-[length:18px] max-sm:text-[length:16px] leading-6 lg:leading-[25px]"
            }
          >
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function JournalClosing(closing: TJournalPage["closing"]) {
  return (
    <section
      className={
        "journal-closing relative overflow-hidden text-warm-cream bg-[rgb(var(--overlay-warm-ink-rgb))] bg-none [&&::after]:content-[''] [&&::after]:absolute [&&::after]:top-0 [&&::after]:right-0 [&&::after]:bottom-0 [&&::after]:left-0 [&&::after]:pointer-events-none [&&::after]:bg-[image:linear-gradient(_270deg,_rgb(9_8_6),_rgb(9_8_6_/_60%)_53%,_rgb(9_8_6_/_0%)_73%_)] [&&::after]:bg-transparent [@media_(40rem_<=_width_<_80rem)]:[&&::after]:bg-[rgb(9_8_6_/_50%)] max-sm:[&&::after]:bg-[rgb(var(--hero-overlay-dark-rgb))] max-sm:[&&::after]:bg-none"
      }
      aria-labelledby={"journal-closing"}
    >
      {/* Figma crops a 260px photo frame inside the shorter text-led banner. */}
      <div
        className={
          "journal-closingImage absolute top-0 right-0 bottom-0 left-0 max-sm:hidden lg:left-[0.03%] lg:-right-[0.03%] lg:min-h-65 lg:[&&_img]:object-[center_87.304%]"
        }
      >
        <Image
          {...closing.image}
          fill
          sizes="100vw"
          className={
            "journal-cover object-cover [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:transition-[scale] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:duration-[var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:ease-[ease-out] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:[transition-delay:0s] [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage_>_&&]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage:focus-visible_>_&&]:scale-105 [@media_(hover:_hover)_and_(prefers-reduced-motion:_no-preference)]:[.journal-featuredImage:hover_>_&&]:scale-105"
          }
        />
      </div>
      <div className="site-container">
        <h2
          data-scroll-reveal
          id={"journal-closing"}
          className={
            "journal-closingCopy relative z-1 max-w-185 ml-auto pt-12 pb-12 text-[length:36px] max-sm:pt-11 max-sm:pb-10 max-sm:text-[length:26px] max-sm:text-center lg:text-[length:44px] leading-[1.04] max-sm:leading-8"
          }
        >
          {closing.heading}
        </h2>
      </div>
    </section>
  );
}
