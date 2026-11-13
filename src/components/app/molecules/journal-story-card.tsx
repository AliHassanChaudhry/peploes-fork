import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  formatJournalDate,
  getJournalArticlePath,
  getJournalCategoryPath,
} from "@/lib/journal-data";
import type { IJournalStoryCardProps } from "@/lib/types";

export function JournalStoryCard({
  article,
  action,
  dateGranularity,
}: IJournalStoryCardProps) {
  const href = getJournalArticlePath(article.slug);

  return (
    <article
      data-image-card
      className={
        "journal-card-card min-w-0 [&&_a:focus-visible]:outline-2 [&&_a:focus-visible]:outline-solid [&&_a:focus-visible]:outline-peploe-burgundy [&&_a:focus-visible]:outline-offset-4"
      }
    >
      <Link
        href={href}
        prefetch={true}
        data-card-image
        aria-label={article.title}
        className={
          "journal-card-image relative block h-60 overflow-hidden bg-soft-stone bg-none [&&_img]:object-cover [@media_(prefers-reduced-motion:_no-preference)]:[&&_img]:will-change-[scale] [@media_(prefers-reduced-motion:_no-preference)]:[&&_img]:transition-[scale] [@media_(prefers-reduced-motion:_no-preference)]:[&&_img]:duration-[var(--duration-base)] [@media_(prefers-reduced-motion:_no-preference)]:[&&_img]:ease-[ease-in-out] [@media_(prefers-reduced-motion:_no-preference)]:[&&_img]:[transition-delay:0s] [@media_(prefers-reduced-motion:_no-preference)]:[&&_img]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[&&:focus-visible_img]:scale-105 [@media_(hover:_hover)_and_(prefers-reduced-motion:_no-preference)]:[&&:hover_img]:scale-105"
        }
      >
        {/* Keep the image on its layer to avoid a sharpness jump after zooming out. */}
        <Image
          src={article.heroImage.src}
          alt={article.heroImage.alt}
          fill
          sizes="(min-width: 1584px) 459px, (min-width: 1280px) calc((100vw - 208px) / 3), (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 640px) calc((100vw - 64px) / 2), calc(100vw - 32px)"
        />
      </Link>
      <div className={"journal-card-copy flex flex-col items-start gap-2 pt-5"}>
        {/* Keep touch targets in the existing gaps without increasing card height. */}
        <p
          className={
            "journal-card-metadata text-text-secondary text-[length:14px] font-medium tracking-[1.05px] uppercase [&&_a:hover]:underline [&&_a:hover]:decoration-solid [&&_a:hover]:decoration-current [&&_a:hover]:decoration-auto [&&_a:hover]:underline-offset-4 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:inline-flex [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:items-center [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:min-h-11 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:-mt-5 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:-mb-1 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:pt-5 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:pb-1 leading-5"
          }
        >
          <Link href={getJournalCategoryPath(article.category.slug)}>
            {article.category.name}
          </Link>
          <span aria-hidden="true"> / </span>
          <time dateTime={article.date}>
            {formatJournalDate(article.date, dateGranularity)}
          </time>
        </p>
        <h3
          className={
            "journal-card-title [&&_a:hover]:underline [&&_a:hover]:decoration-solid [&&_a:hover]:decoration-current [&&_a:hover]:decoration-auto [&&_a:hover]:underline-offset-4 font-[family-name:var(--font-eb-garamond),_serif] text-[length:26px] font-normal wrap-anywhere max-sm:text-[length:30px] [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:block [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:min-h-11 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:-mt-1 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:-mb-2 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:pt-1 [@media_(width_<_40rem),_(pointer:_coarse)]:[&&_a]:pb-2 leading-8"
          }
        >
          <Link href={href}>{article.title}</Link>
        </h3>
        <Button
          asChild
          variant="brand-text"
          className={
            "journal-card-action [&&]:justify-start [&&]:h-auto [&&]:min-h-11 [&&]:max-w-full [&&]:-mb-1 [&&]:pt-2 [&&]:pr-0 [&&]:pb-3 [&&]:pl-0 [&&]:rounded-none [&&]:text-[length:16px] [&&]:whitespace-normal [&&]:text-left [&&]:leading-6"
          }
        >
          <Link href={href} data-card-action>
            {action}
            <span className="sr-only">: {article.title}</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
