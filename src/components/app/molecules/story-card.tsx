"use client";

import { useLayoutEffect, useRef } from "react";
import type { IStoryCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StoryCard({ children, className }: IStoryCardProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const card = ref.current;
    const copy = card?.querySelector<HTMLElement>("[data-story-copy]");
    const heading = copy?.querySelector("h3");
    const details = copy?.querySelector<HTMLElement>("[data-story-details]");
    if (!card || !copy || !heading || !details) return;

    const positionCopy = () => {
      const headingBottom = heading.offsetTop + heading.offsetHeight;
      const detailsBottom = details.offsetTop + details.offsetHeight;
      const offset = Math.max(0, detailsBottom - headingBottom);
      card.style.setProperty("--story-hidden-offset", `${offset}px`);
    };
    // Establish the measured offset before paint without an initial transition.
    copy.style.transition = "none";
    positionCopy();
    copy.getBoundingClientRect();
    copy.style.removeProperty("transition");
    const resizeObserver = new ResizeObserver(positionCopy);
    for (const element of [card, copy, details])
      resizeObserver.observe(element);

    const touch = window.matchMedia("(hover: none), (pointer: coarse)");
    let observer: IntersectionObserver | undefined;
    let revealed = false;
    const observeCopy = () => {
      observer?.disconnect();
      if (!touch.matches || revealed) return;
      card.dataset.copyReveal = "pending";
      observer = new IntersectionObserver(
        (entries) => {
          if (
            !entries.some(
              (entry) =>
                entry.isIntersecting && entry.intersectionRatio >= 0.15,
            )
          )
            return;
          revealed = true;
          card.dataset.copyReveal = "visible";
          observer?.disconnect();
        },
        { threshold: 0.15, rootMargin: "0px 0px -24px 0px" },
      );
      observer.observe(copy);
    };
    observeCopy();
    touch.addEventListener("change", observeCopy);

    return () => {
      resizeObserver.disconnect();
      observer?.disconnect();
      touch.removeEventListener("change", observeCopy);
    };
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "relative cursor-pointer [&_[data-story-details]]:flex [&_[data-story-details]]:flex-col [&_[data-story-details]]:gap-[inherit] [&_[data-story-copy]]:cursor-text [&_[data-story-copy]]:select-text [&_[data-story-copy]]:pointer-events-none [&_[data-story-text]]:[pointer-events:var(--text-action-pointer-events,auto)] [&_[data-story-copy]_:is(a,_button)]:[pointer-events:var(--text-action-pointer-events,auto)] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-copy]]:transform-[translateY(var(--story-hidden-offset,0px))] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-copy]]:transition-[transform] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-copy]]:duration-[400ms] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-copy]]:ease-[var(--ease-organic)] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-copy]]:[transition-delay:0s] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-copy]]:transition-normal [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]]:opacity-0 [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]]:transition-[opacity] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]]:duration-[400ms] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]]:ease-[var(--ease-organic)] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]]:[transition-delay:0s] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]]:transition-normal [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]_:is([data-story-text],_a,_button)]:[--text-action-content-pointer-events:none] [@media_(hover:_hover)_and_(pointer:_fine)]:[&_[data-story-details]_:is([data-story-text],_a,_button)]:pointer-events-none [@media_(hover:_hover)_and_(pointer:_fine)]:[&:where(:hover,_:has(:focus-visible))_[data-story-copy]]:transform-[translateY(0)] [@media_(hover:_hover)_and_(pointer:_fine)]:[&:where(:hover,_:has(:focus-visible))_[data-story-details]]:opacity-100 [@media_(hover:_hover)_and_(pointer:_fine)]:[&:where(:hover,_:has(:focus-visible))_[data-story-details]_:is([data-story-text],_a,_button)]:[--text-action-content-pointer-events:auto] [@media_(hover:_hover)_and_(pointer:_fine)]:[&:where(:hover,_:has(:focus-visible))_[data-story-details]_:is([data-story-text],_a,_button)]:[pointer-events:var(--text-action-pointer-events,auto)] [@media_(hover:_hover)_and_(pointer:_fine)_and_(width_<_40rem)]:[@media_not_(any-pointer:_coarse)]:[&_[data-variant=brand-secondary-inverse]]:[--text-action-pointer-events:none] [@media_(hover:_none),_(pointer:_coarse)]:[&_[data-story-copy]]:transition-[opacity,transform] [@media_(hover:_none),_(pointer:_coarse)]:[&_[data-story-copy]]:duration-[350ms,350ms] [@media_(hover:_none),_(pointer:_coarse)]:[&_[data-story-copy]]:ease-[var(--ease-organic),var(--ease-organic)] [@media_(hover:_none),_(pointer:_coarse)]:[&_[data-story-copy]]:[transition-delay:0s,0s] [@media_(hover:_none),_(pointer:_coarse)]:[&_[data-story-copy]]:transition-normal [@media_(hover:_none),_(pointer:_coarse)]:[&:where([data-copy-reveal=pending])_[data-story-copy]]:opacity-0 [@media_(hover:_none),_(pointer:_coarse)]:[&:where([data-copy-reveal=pending])_[data-story-copy]]:transform-[translateY(24px)] [@media_(hover:_none),_(pointer:_coarse)]:[&:where([data-copy-reveal=visible],_:focus-within)_[data-story-copy]]:opacity-100 [@media_(hover:_none),_(pointer:_coarse)]:[&:where([data-copy-reveal=visible],_:focus-within)_[data-story-copy]]:transform-[translateY(0)] [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:opacity-100 [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:transform-none [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:transition-none [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:duration-0 [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:ease-[ease] [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:[transition-delay:0s] [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-copy]]:transition-normal [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:opacity-100 [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:transform-none [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:transition-none [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:duration-0 [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:ease-[ease] [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:[transition-delay:0s] [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]]:transition-normal [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]_:is([data-story-text],_a,_button)]:[--text-action-content-pointer-events:auto] [@media_(prefers-reduced-motion:_reduce)]:[&_[data-story-details]_:is([data-story-text],_a,_button)]:[pointer-events:var(--text-action-pointer-events,auto)]",
        className,
      )}
    >
      {children}
    </article>
  );
}
