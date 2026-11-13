import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { JournalStoryCard } from "@/components/app/molecules/journal-story-card";
import { Button } from "@/components/ui/button";
import { JOURNAL_UI } from "@/lib/constants/journal";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { formatJournalDate, getJournalCategoryPath } from "@/lib/journal-data";
import type {
  IJournalArticleProps,
  IMenuImageStyle,
  TJournalBlock,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export function JournalArticle({
  article,
  relatedArticles,
  articleAction,
}: IJournalArticleProps) {
  const heroImageStyle: Omit<IMenuImageStyle, "--menu-image-scale"> = {
    "--menu-image-position": article.heroImage.mobilePosition,
    "--menu-image-desktop-position": article.heroImage.desktopPosition,
  };

  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "journal-article-page text-ink bg-warm-cream bg-none wrap-anywhere [&&_:is(h1,_h2,_h3)]:font-[family-name:var(--font-eb-garamond),_serif] [&&_:is(h1,_h2,_h3)]:font-normal [&&_a:focus-visible]:outline-2 [&&_a:focus-visible]:outline-solid [&&_a:focus-visible]:outline-peploe-burgundy [&&_a:focus-visible]:outline-offset-4",
      )}
    >
      <article aria-labelledby="journal-article-title">
        <header
          className={
            "journal-article-hero grid grid-cols-[minmax(0,_1fr)] xl:grid-cols-[480px_minmax(0,_1fr)] xl:gap-12 xl:min-h-89 xl:pl-[max(72px,_calc((100vw_-_var(--site-content-max-width))_/_2))]"
          }
        >
          <div
            data-scroll-reveal
            className={
              "journal-article-heroCopy flex min-w-0 flex-col justify-center gap-4 pt-8 pr-4 pb-8 pl-4 [&&_h1]:text-[length:clamp(40px,_11vw,_56px)] sm:pt-12 sm:pb-12 xl:pl-0 xl:pr-0 xl:[&&_h1]:text-[length:56px] [&&_h1]:leading-[1] xl:[&&_h1]:leading-[0.98]"
            }
          >
            <div className="flex flex-col gap-2">
              <p
                className={
                  "journal-article-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:12px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:shrink-0 [&&::before]:bg-current [&&::before]:bg-none [&&_a:hover]:underline [&&_a:hover]:decoration-solid [&&_a:hover]:decoration-current [&&_a:hover]:decoration-auto [&&_a:hover]:underline-offset-4 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:inline-flex [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:min-h-11 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:items-center sm:text-[length:14px] leading-4.5 sm:leading-4"
                }
              >
                <Link href={getJournalCategoryPath(article.category.slug)}>
                  {article.category.name}
                </Link>
              </p>
              <h1 id="journal-article-title">{article.title}</h1>
            </div>
            <p
              className={
                "journal-article-standfirst text-text-secondary font-[family-name:var(--font-eb-garamond),_serif] text-[length:20px] xl:text-[length:18px] max-sm:text-[length:16px] leading-6.5 xl:leading-[1.25]"
              }
            >
              {article.standfirst}
            </p>
            <p
              className={
                "journal-article-metadata flex flex-wrap items-center gap-[8px_12px] text-[length:11px] font-medium tracking-[0.1em] uppercase leading-[17px]"
              }
            >
              <time dateTime={article.date}>
                {formatJournalDate(article.date)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{article.readTimeMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>{article.author}</span>
            </p>
          </div>
          <div
            data-scroll-reveal
            className={
              "journal-article-heroImage relative min-w-0 w-full min-h-55 aspect-[2/1] bg-soft-stone bg-none xl:aspect-[auto]"
            }
            style={heroImageStyle}
          >
            <Image
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              fill
              preload
              sizes="(min-width: 1584px) calc(50vw + 192px), (min-width: 1280px) calc(100vw - 600px), 100vw"
              className={
                "journal-article-cover object-cover object-[var(--menu-image-position,_center)] xl:object-[var(--menu-image-desktop-position,_center)]"
              }
            />
          </div>
        </header>
        <div
          className={
            "journal-article-intro pt-8 pb-8 text-warm-cream bg-button-primary-pressed bg-none font-[family-name:var(--font-eb-garamond),_serif] text-[length:26px] sm:pt-12 sm:pb-12 sm:text-[length:30px] max-sm:text-[length:16px] leading-8 sm:leading-9.5"
          }
        >
          <p data-scroll-reveal className="site-container">
            {article.intro}
          </p>
        </div>
        <div
          className={cn(
            "site-container",
            "journal-article-body flex flex-col gap-4 pt-8 pb-8 text-text-secondary text-[length:16px] [&&_:is(h2,_h3)]:text-ink [&&_:is(h2,_h3)]:text-[length:30px] [&&_h3]:text-[length:26px] [&&_>_:is(p,_figure)_+_:is(h2,_h3)]:mt-2 [&&_>_p]:whitespace-pre-line [&&_figcaption]:mt-3 [&&_figcaption]:text-[length:14px] sm:pt-12 sm:pb-12 sm:gap-4 sm:text-[length:18px] sm:[&&_>_:is(p,_figure)_+_:is(h2,_h3)]:mt-0 sm:[&&_h2]:text-[length:36px] leading-6.5 [&&_:is(h2,_h3)]:leading-9 [&&_h3]:leading-8 [&&_figcaption]:leading-5.5 sm:leading-[27px] sm:[&&_h2]:leading-10.5",
          )}
        >
          {article.blocks.map(renderBlock)}
        </div>
      </article>
      {relatedArticles.length > 0 && (
        <section
          className={
            "journal-article-related pt-8 pb-8 bg-[#f2eae5] bg-none sm:pt-12 sm:pb-12"
          }
          aria-labelledby="journal-related-title"
        >
          <div className="site-container">
            <div
              data-scroll-reveal
              className={
                "journal-article-relatedHeader flex flex-wrap items-center justify-between gap-[16px_32px] [&&_h2]:min-w-0 [&&_h2]:text-[length:32px] lg:[&&_h2]:text-[length:40px] [&&_h2]:leading-9.5 lg:[&&_h2]:leading-11.5"
              }
            >
              <div>
                <p
                  className={
                    "journal-article-relatedEyebrow mb-2 text-peploe-burgundy text-[length:11px] font-medium tracking-[1.3px] uppercase leading-4"
                  }
                >
                  {JOURNAL_UI.relatedLabel}
                </p>
                <h2 id="journal-related-title">
                  More from {article.category.name}
                </h2>
              </div>
              <Button
                asChild
                variant="brand-text"
                className={
                  "journal-article-action [&&]:justify-start [&&]:gap-2 [&&]:h-auto [&&]:min-h-11 [&&]:max-w-full [&&]:pt-2 [&&]:pr-0 [&&]:pb-2 [&&]:pl-0 [&&]:rounded-none [&&]:text-[length:16px] [&&]:whitespace-normal [&&]:text-left [&&]:leading-6"
                }
              >
                <Link href={getJournalCategoryPath(article.category.slug)}>
                  View all {article.category.name}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
            <div
              className={
                "journal-article-relatedCards grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {relatedArticles.map((related) => (
                <div data-scroll-reveal key={related._id}>
                  <JournalStoryCard
                    article={related}
                    action={articleAction}
                    dateGranularity="month"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function renderBlock(block: TJournalBlock) {
  switch (block._type) {
    case "journalParagraph":
      return (
        <p data-scroll-reveal key={block._key}>
          {block.text}
        </p>
      );
    case "journalHeading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return (
        <Heading data-scroll-reveal key={block._key}>
          {block.text}
        </Heading>
      );
    }
    case "journalImage":
      return (
        <figure
          data-scroll-reveal
          key={block._key}
          className={"journal-article-figure min-w-0"}
        >
          <div
            className={
              "journal-article-bodyImage relative aspect-[16/9] [&&_img]:object-contain"
            }
          >
            <Image
              {...block.image}
              fill
              sizes="(min-width: 1584px) 1440px, (min-width: 1280px) calc(100vw - 144px), calc(100vw - 32px)"
            />
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "journalQuote":
      return (
        <figure
          data-scroll-reveal
          key={block._key}
          className={
            "journal-article-quote min-w-0 pl-5 border-l-2 border-solid border-l-peploe-burgundy [&&_blockquote]:text-ink [&&_blockquote]:font-[family-name:var(--font-eb-garamond),_serif] [&&_blockquote]:text-[length:28px] [&&_blockquote]:leading-8.5"
          }
        >
          <blockquote>
            <p>{block.text}</p>
          </blockquote>
          {block.attribution && <figcaption>{block.attribution}</figcaption>}
        </figure>
      );
  }
  const unreachable: never = block;
  return unreachable;
}
