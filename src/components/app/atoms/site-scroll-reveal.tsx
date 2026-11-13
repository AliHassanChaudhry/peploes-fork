"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const targetClasses =
  'site-reveal-target [@media_(prefers-reduced-motion:_no-preference)]:transition-[opacity,transform] [@media_(prefers-reduced-motion:_no-preference)]:duration-[350ms,350ms] [@media_(prefers-reduced-motion:_no-preference)]:ease-[var(--ease-organic),var(--ease-organic)] [@media_(prefers-reduced-motion:_no-preference)]:[transition-delay:0s,0s] [@media_(prefers-reduced-motion:_no-preference)]:transition-normal [@media_(prefers-reduced-motion:_no-preference)]:[&[data-scroll-reveal-state="pending"]]:opacity-0 [@media_(prefers-reduced-motion:_no-preference)]:[&[data-scroll-reveal-state="pending"]]:transform-[translateY(24px)] [@media_(prefers-reduced-motion:_no-preference)]:[&[data-scroll-reveal-state="visible"]]:opacity-100 [@media_(prefers-reduced-motion:_no-preference)]:[&[data-scroll-reveal-state="visible"]]:transform-[translateY(0)]'.split(
    " ",
  );

const targets = "[data-scroll-reveal]";

export function SiteScrollReveal() {
  const pathname = usePathname();
  return <PageScrollReveal key={pathname} />;
}

function PageScrollReveal() {
  useEffect(() => {
    const elements = new Set<HTMLElement>();
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let observer: IntersectionObserver | undefined;

    const reveal = (element: HTMLElement) => {
      element.dataset.scrollRevealState = "visible";
      observer?.unobserve(element);
    };
    const reset = () => {
      observer?.disconnect();
      for (const element of elements) {
        element.classList.remove(...targetClasses);
        delete element.dataset.scrollRevealState;
      }
      elements.clear();
    };
    const registerElement = (
      element: HTMLElement,
      initiallyVisible: boolean,
    ) => {
      elements.add(element);
      element.classList.add(...targetClasses);
      if (initiallyVisible) {
        reveal(element);
      } else {
        element.dataset.scrollRevealState = "pending";
        observer?.observe(element);
      }
    };
    const register = () => {
      for (const element of elements) {
        if (!element.isConnected) {
          observer?.unobserve(element);
          elements.delete(element);
        }
      }
      if (!media.matches) return;
      // Streamed content is staged in hidden containers before entering the page.
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(targets),
      )
        .filter(
          (element) =>
            !elements.has(element) &&
            !element.parentElement?.closest(targets) &&
            element.getClientRects().length > 0,
        )
        .map((element) => ({
          element,
          initiallyVisible:
            element.getBoundingClientRect().top < window.innerHeight - 24,
        }));
      for (const { element, initiallyVisible } of candidates) {
        registerElement(element, initiallyVisible);
      }
    };
    const observe = () => {
      reset();
      if (!media.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (
              entry.isIntersecting &&
              (entry.intersectionRatio >= 0.15 ||
                entry.boundingClientRect.height > window.innerHeight - 24)
            )
              reveal(entry.target as HTMLElement);
          }
        },
        { threshold: [0, 0.15], rootMargin: "0px 0px -24px 0px" },
      );
      register();
    };
    const onFocus = (event: FocusEvent) => {
      if (!media.matches || !(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(`.${targetClasses[0]}`);
      if (element) reveal(element);
    };

    observe();
    // Route content can arrive after the layout through a streamed boundary.
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    media.addEventListener("change", observe);
    document.addEventListener("focusin", onFocus);
    return () => {
      reset();
      mutations.disconnect();
      media.removeEventListener("change", observe);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  return null;
}
