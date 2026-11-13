"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { JournalStoryCard } from "@/components/app/molecules/journal-story-card";
import { Button } from "@/components/ui/button";
import { JOURNAL_UI } from "@/lib/constants/journal";
import { getJournalCategoryPath } from "@/lib/journal-data";
import type {
  IJournalArticleListProps,
  IJournalArticleResultsProps,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export function JournalArticleList({
  articles,
  categories,
  listing,
  initialCategory,
}: IJournalArticleListProps) {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams
    ? (searchParams.get("category") ?? "")
    : (initialCategory ?? "");
  const activeCategory = categories.find(
    (category) => category.slug === requestedCategory,
  );
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const hasAlignedTab = useRef(false);
  const activeSlug = activeCategory?.slug ?? "";
  const previousSlug = useRef(activeSlug);
  const [hasChangedCategory, setHasChangedCategory] = useState(false);
  const invalidCategory = searchParams?.has("category") && !activeCategory;

  useLayoutEffect(() => {
    if (previousSlug.current !== activeSlug) {
      previousSlug.current = activeSlug;
      setHasChangedCategory(true);
    }
    const scroll = categoryScrollRef.current;
    const indicator = indicatorRef.current;
    if (!scroll || !indicator) return;
    const update = () => {
      const active = scroll.querySelector<HTMLElement>("[aria-current]");
      if (!active) return;
      const bounds = active.getBoundingClientRect();
      indicator.style.transform = `translateX(${bounds.left - scroll.getBoundingClientRect().left + scroll.scrollLeft}px) scaleX(${bounds.width})`;
      scroll.dataset.indicatorReady = "true";
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(scroll);
    for (const link of scroll.querySelectorAll("a")) observer.observe(link);
    return () => observer.disconnect();
  }, [activeSlug]);

  useEffect(() => {
    if (!invalidCategory) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  }, [invalidCategory]);

  useEffect(() => {
    const scroll = categoryScrollRef.current;
    const active = scroll?.querySelector<HTMLElement>("[aria-current]");
    if (!scroll || !active || active.dataset.category !== activeSlug) return;
    scroll.scrollTo({ left: scroll.scrollLeft, behavior: "instant" });
    const bounds = active.getBoundingClientRect();
    const viewport = scroll.getBoundingClientRect();
    const behavior =
      hasAlignedTab.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "smooth"
        : "instant";
    if (bounds.left < viewport.left) {
      scroll.scrollBy({
        left: bounds.left - viewport.left,
        behavior,
      });
    } else if (bounds.right > viewport.right) {
      scroll.scrollBy({
        left: bounds.right - viewport.right,
        behavior,
      });
    }
    hasAlignedTab.current = true;
  }, [activeSlug]);

  const filteredArticles = activeCategory
    ? articles.filter(
        (article) => article.category.slug === activeCategory.slug,
      )
    : articles;

  function selectCategory(slug?: string) {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("category", slug);
    else url.searchParams.delete("category");
    if (url.href !== window.location.href) {
      window.history.pushState(null, "", url);
    }
  }

  return (
    <>
      <style>
        {
          "@keyframes peploes-journal-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}"
        }
      </style>
      <nav
        className={
          "journal-list-categories border-b border-solid border-b-soft-stone bg-warm-cream bg-none"
        }
        aria-label={JOURNAL_UI.categoriesLabel}
      >
        <div
          data-scroll-reveal
          className={cn(
            "site-container",
            "journal-list-categoriesInner flex min-w-0 flex-col gap-3 pt-5 pb-5 max-sm:gap-3.5 max-sm:pt-6 max-sm:pb-6 lg:min-h-22 lg:flex-row lg:items-center lg:gap-7 lg:pt-6 lg:pb-6",
          )}
        >
          <p
            className={
              "journal-list-categoriesLabel shrink-0 text-text-secondary text-[length:11px] font-medium tracking-[1.3px] uppercase max-sm:text-[length:10px] max-sm:tracking-[1.2px] lg:w-45 leading-4 max-sm:leading-[15px]"
            }
          >
            {JOURNAL_UI.categoriesLabel}
          </p>
          <div
            ref={categoryScrollRef}
            className={
              "journal-list-categoryScroll relative min-w-0 overflow-x-auto overscroll-x-contain [&&:not([data-indicator-ready])_a[aria-current]::after]:content-[''] [&&:not([data-indicator-ready])_a[aria-current]::after]:absolute [&&:not([data-indicator-ready])_a[aria-current]::after]:right-0 [&&:not([data-indicator-ready])_a[aria-current]::after]:bottom-[7px] [&&:not([data-indicator-ready])_a[aria-current]::after]:left-0 [&&:not([data-indicator-ready])_a[aria-current]::after]:h-0.5 [&&:not([data-indicator-ready])_a[aria-current]::after]:bg-peploe-burgundy [&&:not([data-indicator-ready])_a[aria-current]::after]:bg-none max-sm:min-h-12 max-sm:[scrollbar-width:none] max-sm:[&&:not([data-indicator-ready])_a[aria-current]::after]:bottom-3.5"
            }
          >
            <ul
              className={
                "journal-list-categoryLinks flex gap-7 w-max pl-1 pr-1 [&&_a]:relative [&&_a]:flex [&&_a]:min-h-11 [&&_a]:items-center [&&_a]:pt-[7px] [&&_a]:pb-[13px] [&&_a]:text-[length:14px] [&&_a]:font-medium [&&_a]:whitespace-nowrap [&&_a[aria-current]]:text-peploe-burgundy [&&_a:hover]:text-peploe-burgundy [&&&_a:focus-visible]:-outline-offset-2 max-sm:gap-6 max-sm:pl-0 max-sm:pr-0 max-sm:[&&_a]:min-h-12 max-sm:[&&_a]:pt-2 max-sm:[&&_a]:pb-5 lg:pl-0 lg:pr-0 [&&_a]:leading-5"
              }
            >
              <li>
                <Link
                  href={getJournalCategoryPath()}
                  data-category=""
                  aria-current={!activeCategory ? "page" : undefined}
                  scroll={false}
                  prefetch={false}
                  onNavigate={(event) => {
                    event.preventDefault();
                    selectCategory();
                  }}
                >
                  {listing.allLabel}
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={getJournalCategoryPath(category.slug)}
                    data-category={category.slug}
                    aria-current={
                      activeCategory?.slug === category.slug
                        ? "page"
                        : undefined
                    }
                    scroll={false}
                    prefetch={false}
                    onNavigate={(event) => {
                      event.preventDefault();
                      selectCategory(category.slug);
                    }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <span
              ref={indicatorRef}
              aria-hidden="true"
              data-journal-indicator
              className={
                "journal-list-indicator absolute bottom-[7px] left-0 w-px h-0.5 invisible bg-peploe-burgundy bg-none pointer-events-none origin-left [.journal-list-categoryScroll[data-indicator-ready]_&&]:visible [.journal-list-categoryScroll[data-indicator-ready]_&&]:transition-[transform] [.journal-list-categoryScroll[data-indicator-ready]_&&]:duration-[260ms] [.journal-list-categoryScroll[data-indicator-ready]_&&]:ease-[ease] [.journal-list-categoryScroll[data-indicator-ready]_&&]:[transition-delay:0s] [.journal-list-categoryScroll[data-indicator-ready]_&&]:transition-normal [@media_(prefers-reduced-motion:_reduce)]:[.journal-list-categoryScroll[data-indicator-ready]_&&]:transition-none [@media_(prefers-reduced-motion:_reduce)]:[.journal-list-categoryScroll[data-indicator-ready]_&&]:duration-0 [@media_(prefers-reduced-motion:_reduce)]:[.journal-list-categoryScroll[data-indicator-ready]_&&]:ease-[ease] [@media_(prefers-reduced-motion:_reduce)]:[.journal-list-categoryScroll[data-indicator-ready]_&&]:[transition-delay:0s] [@media_(prefers-reduced-motion:_reduce)]:[.journal-list-categoryScroll[data-indicator-ready]_&&]:transition-normal max-sm:bottom-3.5"
              }
            />
          </div>
        </div>
      </nav>
      <section
        className={
          "journal-list-stream pt-12 pb-12 max-sm:pt-11 max-sm:pb-13 lg:pt-15 lg:pb-15"
        }
        aria-labelledby="journal-stories"
      >
        <div className="site-container">
          <div
            data-scroll-reveal
            className={
              "journal-list-introduction mb-9 [&&_h2]:text-[length:36px] [&&_h2_+_p]:mt-4 [&&_h2_+_p]:text-text-secondary [&&_h2_+_p]:text-[length:16px] max-sm:mb-7 max-sm:[&&_h2]:text-[length:30px] lg:[&&_h2]:text-[length:42px] [&&_h2]:leading-10.5 [&&_h2_+_p]:leading-6 max-sm:[&&_h2]:leading-[37px] lg:[&&_h2]:leading-12"
            }
          >
            <p
              className={
                "journal-list-eyebrow mb-2 text-peploe-burgundy text-[length:11px] font-medium tracking-[1.35px] uppercase max-sm:mb-2 max-sm:text-[length:10px] max-sm:tracking-[1.25px] leading-4 max-sm:leading-[15px]"
              }
            >
              {JOURNAL_UI.latestLabel}
            </p>
            <h2 id="journal-stories">{listing.heading}</h2>
            {listing.description && <p>{listing.description}</p>}
          </div>
          <JournalArticleResults
            key={activeSlug}
            articles={filteredArticles}
            listing={listing}
            animate={hasChangedCategory}
          />
        </div>
      </section>
    </>
  );
}

function JournalArticleResults({
  articles,
  listing,
  animate = false,
}: IJournalArticleResultsProps) {
  const [visibleCount, setVisibleCount] = useState<number>(JOURNAL_UI.pageSize);
  const resultsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const firstNewIndex = useRef<number | null>(null);
  const previousHeight = useRef<number | null>(null);
  const visibleArticles = articles.slice(0, visibleCount);

  useLayoutEffect(() => {
    if (firstNewIndex.current === null || visibleCount <= firstNewIndex.current)
      return;
    const results = resultsRef.current;
    const height = previousHeight.current;
    previousHeight.current = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!results || height === null || reducedMotion.matches) return;

    const animation = results.animate(
      [
        { height: `${height}px`, overflow: "clip" },
        {
          height: `${results.getBoundingClientRect().height}px`,
          overflow: "clip",
        },
      ],
      {
        duration: 500,
        easing: getComputedStyle(results)
          .getPropertyValue("--ease-organic")
          .trim(),
      },
    );
    const stop = () => {
      animation.removeEventListener("finish", stop);
      animation.cancel();
      reducedMotion.removeEventListener("change", stop);
      window.removeEventListener("resize", stop);
    };
    animation.addEventListener("finish", stop);
    reducedMotion.addEventListener("change", stop);
    window.addEventListener("resize", stop);
    return stop;
  }, [visibleCount]);

  useEffect(() => {
    if (firstNewIndex.current === null || visibleCount <= firstNewIndex.current)
      return;
    const firstNewCard = listRef.current?.children[firstNewIndex.current];
    firstNewCard?.querySelector<HTMLAnchorElement>("a")?.focus({
      preventScroll: true,
    });
    firstNewIndex.current = null;
  }, [visibleCount]);

  return (
    <div
      ref={resultsRef}
      data-journal-results
      className={
        animate
          ? "journal-list-resultsEnter animate-[peploes-journal-enter_220ms_ease-out_both] [@media_(prefers-reduced-motion:_reduce)]:animate-none"
          : undefined
      }
    >
      {articles.length ? (
        <ul
          ref={listRef}
          id="journal-story-list"
          className={
            "journal-list-cards grid gap-[36px_32px] [&&_>_li]:min-w-0 max-sm:gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {visibleArticles.map((article, index) => (
            <li
              data-scroll-reveal
              key={article._id}
              className={
                index >= JOURNAL_UI.pageSize
                  ? "journal-list-appended [@media_(prefers-reduced-motion:_no-preference)]:[&&_>_article]:animate-[peploes-journal-enter_350ms_var(--ease-organic)_both]"
                  : undefined
              }
            >
              <JournalStoryCard
                article={article}
                action={listing.articleAction}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p
          data-scroll-reveal
          className={
            "journal-list-empty text-text-secondary text-[length:16px] leading-6"
          }
        >
          {listing.emptyMessage}
        </p>
      )}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {visibleArticles.length} of {articles.length} stories shown.
      </p>
      {visibleCount < articles.length && (
        <div
          data-scroll-reveal
          className={
            "journal-list-loadMore flex justify-center mt-9 max-sm:justify-start max-sm:mt-7"
          }
        >
          <Button
            type="button"
            variant="brand-contact"
            size="cta"
            className={
              "journal-list-loadMoreButton [&&]:min-w-44.5 [&&]:min-h-11 [&&]:h-auto [&&]:pt-[9px] [&&]:pr-5 [&&]:pb-[9px] [&&]:pl-5 [&&]:border-peploe-burgundy [&&]:text-[length:16px] [&&]:whitespace-normal [&&]:leading-6"
            }
            aria-controls="journal-story-list"
            onClick={() => {
              previousHeight.current =
                resultsRef.current?.getBoundingClientRect().height ?? null;
              firstNewIndex.current = visibleCount;
              setVisibleCount((count) => count + JOURNAL_UI.pageSize);
            }}
          >
            {listing.loadMoreAction}
          </Button>
        </div>
      )}
    </div>
  );
}
