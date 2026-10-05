import { ChevronDown } from "lucide-react";

import { MenuBooking } from "@/components/app/compounds/menu-booking";
import { MenuEditorialIntro } from "@/components/app/molecules/menu-editorial-intro";
import { MenuNotes } from "@/components/app/molecules/menu-notes";
import { WineCategory } from "@/components/app/molecules/wine-category";
import { FOCUS_RING } from "@/lib/constants";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { IWineMenuProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getAvailableWineSections, getWineCategories } from "@/lib/wine-menu";

export function WineMenu({ menu }: IWineMenuProps) {
  const sections = getAvailableWineSections(menu.sections);
  return (
    <article className={cn(dmSans.className, "bg-warm-cream text-ink")}>
      <div className="site-container">
        <MenuEditorialIntro menu={menu} />
        {sections.length > 0 && (
          <details
            open
            className="group mb-8 border border-soft-stone bg-[#f1e9e3] px-4 py-3 xl:p-0"
          >
            <summary
              className={cn(
                FOCUS_RING,
                "flex min-h-11 w-fit cursor-pointer list-none items-center gap-6 text-xs tracking-[0.06em] text-peploe-burgundy uppercase focus-visible:ring-peploe-burgundy [&::-webkit-details-marker]:hidden xl:bg-peploe-burgundy xl:px-5 xl:text-base xl:tracking-normal xl:text-warm-cream xl:normal-case",
              )}
            >
              {menu.indexLabel}
              <ChevronDown
                aria-hidden="true"
                className="size-4 group-open:rotate-180"
              />
            </summary>
            <nav
              aria-label={menu.indexLabel}
              className="grid xl:grid-cols-5 xl:gap-5 xl:p-5"
            >
              {sections.map((section) => (
                <div
                  key={section._key}
                  className="border-t border-soft-stone py-4 xl:border-t-0 xl:border-r xl:py-0 xl:last:border-r-0"
                >
                  <a
                    href={`#wine-${section._key}`}
                    className={cn(
                      FOCUS_RING,
                      "text-sm text-peploe-burgundy focus-visible:ring-peploe-burgundy xl:text-xs xl:tracking-[0.08em] xl:uppercase",
                    )}
                  >
                    {section.heading}
                  </a>
                  <ul
                    className={cn(
                      ebGaramond.className,
                      "mt-1 flex flex-wrap gap-x-2 xl:mt-2 xl:block xl:space-y-2",
                    )}
                  >
                    {getWineCategories(section).map((category) => (
                      <li key={category._key}>
                        <a
                          href={`#${section._key}-${category._key}`}
                          className={cn(
                            FOCUS_RING,
                            "text-[15px] leading-6 hover:text-peploe-burgundy focus-visible:ring-peploe-burgundy xl:text-lg",
                          )}
                        >
                          {category.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </details>
        )}
      </div>
      {sections.map((section) => (
        <section
          key={section._key}
          id={`wine-${section._key}`}
          aria-labelledby={`wine-${section._key}-heading`}
          className={cn("scroll-mt-40", section.highlighted && "bg-[#f1e9e3]")}
        >
          <div className="site-container">
            <div className="border-t border-soft-stone py-8 xl:py-9">
              <h2
                id={`wine-${section._key}-heading`}
                className="mb-7 flex items-center gap-2.5 text-sm tracking-[0.08em] text-peploe-burgundy uppercase before:h-0.5 before:w-12 before:bg-peploe-burgundy"
              >
                {section.heading}
              </h2>
              {section.description && (
                <p className="mb-8 text-base leading-6 text-text-secondary xl:text-lg">
                  {section.description}
                </p>
              )}
              <div className="grid gap-8 xl:grid-cols-2 xl:gap-x-28">
                {getWineCategories(section).map((category) => {
                  const columnIndex = section.columns.findIndex((column) =>
                    column.categories.some(
                      (item) => item._key === category._key,
                    ),
                  );
                  const categories = section.columns[columnIndex].categories;
                  return (
                    <WineCategory
                      key={category._key}
                      category={category}
                      sectionKey={section._key}
                      column={columnIndex + 1}
                      continued={categories[0]._key !== category._key}
                      rowSpan={
                        categories.length === 1
                          ? Math.max(
                              ...section.columns.map(
                                (column) => column.categories.length,
                              ),
                            )
                          : 1
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}
      <MenuNotes menu={menu} compact />
      <MenuBooking booking={menu.booking} />
    </article>
  );
}
