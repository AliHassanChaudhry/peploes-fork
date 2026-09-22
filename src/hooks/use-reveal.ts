"use client";

import { useEffect, useRef } from "react";
import type { IRevealObserverRegistry } from "@/lib/types";

const revealObserverRegistry = new Map<number, IRevealObserverRegistry>();

function getRevealObserverRegistry(
  threshold: number,
): IRevealObserverRegistry | null {
  if (typeof window === "undefined") return null;

  const existing = revealObserverRegistry.get(threshold);
  if (existing) return existing;

  const handlers = new Map<Element, () => void>();

  const observer = new IntersectionObserver(
    (entries) => {
      const registry = revealObserverRegistry.get(threshold);
      if (!registry) return;

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const handler = registry.handlers.get(entry.target);
        if (!handler) continue;

        handler();
        registry.observer.unobserve(entry.target);
        registry.handlers.delete(entry.target);
      }

      if (registry.handlers.size === 0) {
        registry.observer.disconnect();
        revealObserverRegistry.delete(threshold);
      }
    },
    { threshold },
  );

  const nextRegistry = {
    observer,
    handlers,
  };

  revealObserverRegistry.set(threshold, nextRegistry);
  return nextRegistry;
}

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");

    const registry = getRevealObserverRegistry(threshold);
    if (!registry) {
      el.classList.add("is-visible");
      return;
    }

    const onIntersect = () => {
      el.classList.add("is-visible");
    };

    registry.handlers.set(el, onIntersect);
    registry.observer.observe(el);

    return () => {
      const currentRegistry = revealObserverRegistry.get(threshold);
      if (!currentRegistry) return;

      currentRegistry.observer.unobserve(el);
      currentRegistry.handlers.delete(el);

      if (currentRegistry.handlers.size === 0) {
        currentRegistry.observer.disconnect();
        revealObserverRegistry.delete(threshold);
      }
    };
  }, [threshold]);

  return ref;
}
