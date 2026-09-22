"use client";

import { useEffect, useRef } from "react";

function getTotalLengthSafe(element: Element): number {
  if (!(element instanceof SVGGraphicsElement)) return 100;
  const svgElement = element as SVGGraphicsElement & {
    getTotalLength?(): number;
  };
  if (typeof svgElement.getTotalLength === "function") {
    return svgElement.getTotalLength();
  }
  return 100;
}

export function useDrawOn(threshold = 0.3) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const paths = el.querySelectorAll("path, circle");

    for (const path of paths) {
      if (!(path instanceof SVGGraphicsElement)) continue;
      const length = getTotalLengthSafe(path);
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = "none";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let i = 0;
        for (const path of paths) {
          if (!(path instanceof SVGGraphicsElement)) continue;
          path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.15}s`;
          path.style.strokeDashoffset = "0";
          i++;
        }
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
