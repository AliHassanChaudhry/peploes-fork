import { ChevronDown } from "lucide-react";

import { FOCUS_RING } from "@/lib/constants";
import { ebGaramond } from "@/lib/fonts";
import type { IMenuNotesProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MenuNotes({ menu, compact = false }: IMenuNotesProps) {
  const hasNotes = Boolean(menu.offer) || menu.notes.length > 0;
  if (!hasNotes && !menu.allergens) return null;

  const notes = hasNotes && <MenuNotesText menu={menu} compact={compact} />;

  const allergens = menu.allergens && (
    <details
      open
      className={cn(
        "group relative min-h-11",
        compact && "xl:pl-[190px]",
        hasNotes &&
          !compact &&
          "border-t border-warm-cream/40 pt-6 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-16",
      )}
    >
      <summary
        className={cn(
          ebGaramond.className,
          FOCUS_RING,
          "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-xl leading-6 focus-visible:ring-warm-cream [&::-webkit-details-marker]:hidden xl:justify-start",
          compact && "xl:absolute xl:top-0 xl:left-0 xl:text-base",
        )}
      >
        {menu.allergens.heading}
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 -rotate-90 group-open:rotate-0"
        />
      </summary>
      <p
        className={cn(
          "mt-1 text-sm leading-[21px] xl:mt-3",
          compact && "xl:mt-0 xl:pt-1 xl:text-xs xl:leading-[18px]",
        )}
      >
        {menu.allergens.description}
      </p>
    </details>
  );

  return (
    <div className="bg-peploe-burgundy text-warm-cream">
      <div
        className={cn(
          "site-container grid gap-8 py-8 xl:gap-0 xl:py-9",
          menu.allergens && hasNotes && "xl:grid-cols-2",
          compact && "xl:gap-8 xl:py-3",
          compact && menu.allergens && hasNotes && "xl:grid-cols-[1fr_360px]",
        )}
      >
        {compact ? allergens : notes}
        {compact ? notes : allergens}
      </div>
    </div>
  );
}

function MenuNotesText({ menu, compact }: IMenuNotesProps) {
  return (
    <div
      className={cn(
        "xl:pr-16",
        compact &&
          "border-t border-warm-cream/40 pt-6 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6 xl:pr-0",
      )}
    >
      {menu.offer && (
        <p
          className={cn(
            ebGaramond.className,
            "text-[27px] leading-[35px] after:mt-4 after:block after:h-px after:w-9 after:bg-warm-cream/60 xl:text-[30px] xl:leading-[38px]",
          )}
        >
          {menu.offer}
        </p>
      )}
      {menu.notes.length > 0 && (
        <div className={cn("text-sm leading-[21px]", menu.offer && "mt-4")}>
          {menu.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}
