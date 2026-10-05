"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import styles from "@/components/app/molecules/desktop-navigation.module.css";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DESKTOP_NAVIGATION_QUERY, FOCUS_RING, ROUTES } from "@/lib/constants";
import type {
  IDesktopNavigationProps,
  IOpenDesktopNavigation,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export function DesktopNavigation({ items }: IDesktopNavigationProps) {
  const [openItem, setOpenItem] = useState<IOpenDesktopNavigation | null>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigationId = useId();
  const isDesktop = useMediaQuery(DESKTOP_NAVIGATION_QUERY);
  const pathname = usePathname();
  const activeNavigationId = pathname.startsWith(ROUTES.MENUS) ? "menus" : null;

  useEffect(() => {
    if (!isDesktop) setOpenItem(null);
  }, [isDesktop]);

  useEffect(() => {
    if (!openItem) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !activeItemRef.current?.contains(event.target)
      ) {
        setOpenItem(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (activeItemRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
      setOpenItem(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openItem]);

  return (
    <ul
      className="hidden h-full flex-1 items-center gap-[30px] xl:flex"
      onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest("a[href]"))
          setOpenItem(null);
      }}
    >
      {items.map(({ id, label, content }) => {
        const isOpen = openItem?.id === id;
        const panelId = `${navigationId}-${id}`;

        return (
          <li
            key={id}
            ref={isOpen ? activeItemRef : undefined}
            className="flex h-full items-center"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") {
                setOpenItem((current) => {
                  if (!content) return null;
                  return current?.id === id ? current : { id, source: "hover" };
                });
              }
            }}
            onPointerLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) {
                setOpenItem((current) => (current?.id === id ? null : current));
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setOpenItem((current) => (current?.id === id ? null : current));
              }
            }}
          >
            <Button
              ref={isOpen ? triggerRef : undefined}
              type="button"
              data-active={activeNavigationId === id}
              variant="brand-nav"
              aria-disabled={content ? undefined : true}
              aria-expanded={content ? isOpen : undefined}
              aria-controls={content ? panelId : undefined}
              onFocus={() =>
                setOpenItem((current) => (current?.id === id ? current : null))
              }
              onClick={
                content
                  ? () =>
                      setOpenItem((current) =>
                        current?.id === id && current.source === "activation"
                          ? null
                          : { id, source: "activation" },
                      )
                  : undefined
              }
              className={cn(
                FOCUS_RING,
                "h-11 rounded-sm p-0 text-base leading-[22px] font-medium text-ink focus-visible:ring-peploe-burgundy data-[active=true]:text-peploe-burgundy data-[active=true]:underline",
                isOpen && "text-peploe-burgundy underline",
              )}
            >
              {label}
            </Button>
            {content && (
              <div
                id={panelId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={cn(styles.panel, isOpen && styles.open)}
              >
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
