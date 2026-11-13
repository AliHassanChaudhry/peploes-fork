"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SeasonalEventAction } from "@/components/app/molecules/seasonal-event-action";
import { Button } from "@/components/ui/button";
import { FOCUS_RING } from "@/lib/constants";
import type { ISeasonalEventRelatedProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SeasonalEventRelated({ content }: ISeasonalEventRelatedProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    function updateControls() {
      if (!list) return;
      setCanGoBack(list.scrollLeft > 1);
      setCanGoForward(
        list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      );
    }

    const observer = new ResizeObserver(updateControls);
    observer.observe(list);
    list.addEventListener("scroll", updateControls, { passive: true });
    updateControls();

    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updateControls);
    };
  }, []);

  function scrollCards(direction: number) {
    const list = listRef.current;
    const firstCard = list?.firstElementChild;
    if (!list || !firstCard) return;

    const distance =
      firstCard.getBoundingClientRect().width +
      Number.parseFloat(getComputedStyle(list).columnGap);
    list.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      className={"pt-7 pb-10 sm:pt-6 sm:pb-[38px] lg:pt-3.5"}
      aria-labelledby="event-related"
    >
      <div className="site-container">
        <div
          data-scroll-reveal
          className={"flex items-center justify-between gap-4"}
        >
          <h2
            id="event-related"
            className={
              "event-eyebrow text-peploe-burgundy font-[family-name:inherit]! text-xs font-medium! leading-4 tracking-[0.1em] uppercase sm:text-sm sm:leading-4"
            }
          >
            {content.eyebrow}
          </h2>
          <div
            className={
              "hidden gap-2 sm:flex [&_button]:grid [&_button]:size-11 [&_button]:place-items-center [&_button]:cursor-pointer [&_button]:transition-[color] [&_button]:duration-(--duration-interaction) [&_button]:ease-(--ease-organic) [&_button:hover:not(:disabled)]:text-peploe-burgundy [&_button:disabled]:cursor-default motion-reduce:[&_button]:transition-none"
            }
          >
            <Button
              variant="plain"
              type="button"
              aria-label="Previous related items"
              aria-controls="event-related-items"
              disabled={!canGoBack}
              onClick={() => scrollCards(-1)}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </Button>
            <Button
              variant="plain"
              type="button"
              aria-label="Next related items"
              aria-controls="event-related-items"
              disabled={!canGoForward}
              onClick={() => scrollCards(1)}
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
        <ul
          ref={listRef}
          id="event-related-items"
          className={cn(
            "grid grid-cols-[minmax(0,1fr)] gap-10 overflow-visible mt-6 py-1 [scrollbar-width:none] snap-none sm:flex sm:grid-cols-none sm:gap-8 sm:overflow-x-auto sm:mt-3 sm:snap-x sm:snap-mandatory lg:pb-0 xl:w-[calc(100%_+_59px)] xl:max-w-[1355px] xl:gap-7",
            "xl:[--card-gap:28px] xl:[--card-track-width:round(down,_(100%_-_2_*_var(--card-gap))_/_3,_4px)] xl:grid-cols-[repeat(2,minmax(0,var(--card-track-width)))_minmax(0,1fr)] xl:gap-x-[var(--card-gap)]",
          )}
        >
          {content.cards.map((card) => (
            <li
              data-image-card
              key={card.id ?? card.title}
              className={cn(
                "grow-0 shrink-0 basis-full snap-start xl:basis-(--card-track-width)",
                "[--card-image-width:140px] relative grid grid-cols-[var(--card-image-width)_minmax(0,1fr)] gap-[20px] min-w-0 p-0 [&::before]:absolute [&::before]:inset-y-0 [&::before]:left-[1px] [&::before]:hidden [&::before]:w-[1px] [&::before]:bg-soft-stone [&::before]:bg-none [&::before]:content-[''] max-[360px]:[--card-image-width:124px] sm:[--card-image-width:180px] sm:grid-cols-[var(--card-image-width)_minmax(140px,1fr)] xl:[--card-image-width:160px] xl:grid-cols-[var(--card-image-width)_minmax(0,1fr)] xl:px-[20px] xl:[&::before]:block",
              )}
            >
              <Link
                data-card-image
                href={card.href as Route}
                prefetch={true}
                aria-label={card.title}
                className={cn(
                  FOCUS_RING,
                  "relative block self-start overflow-hidden w-full h-[calc(var(--card-image-width)_*_4_/_3_-_4px)] rounded-[2px] sm:h-[calc(var(--card-image-width)_*_4_/_3_-_2px)] xl:h-[185px]",
                  "group",
                )}
              >
                {/* Landscape photos need enough pixels for the full portrait crop. */}
                <Image
                  {...card.image}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 640px) 360px, 280px"
                  className="object-cover transition-transform duration-(--duration-base) ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none"
                />
              </Link>
              <div
                data-scroll-reveal
                className={"flex flex-col min-w-0 sm:gap-[10px]"}
              >
                <div className={"flex flex-col gap-[10px]"}>
                  <h3
                    className={
                      "text-[22px] font-medium! leading-[28px] sm:text-[24px] sm:leading-[30px]"
                    }
                  >
                    {card.title}
                  </h3>
                  <p
                    className={
                      "m-0 text-text-secondary text-[14px] leading-[21px] max-sm:text-base"
                    }
                  >
                    {card.description}
                  </p>
                </div>
                <SeasonalEventAction
                  label={card.action}
                  href={card.href}
                  className={
                    "self-start h-[44px]! min-h-[44px]! mt-auto! p-0! rounded-[0] text-peploe-burgundy text-[16px] font-medium leading-[22px]! xl:leading-[24px]!"
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
