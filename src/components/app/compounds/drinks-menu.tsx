import { MenuBooking } from "@/components/app/compounds/menu-booking";
import { MenuEditorialIntro } from "@/components/app/molecules/menu-editorial-intro";
import { MenuNotes } from "@/components/app/molecules/menu-notes";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { formatMenuPrice } from "@/lib/menu-price";
import type { IDrinksMenuProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DrinksMenu({ menu }: IDrinksMenuProps) {
  return (
    <article className={cn(dmSans.className, "bg-warm-cream text-ink")}>
      <div className="site-container pb-12">
        <MenuEditorialIntro menu={menu} />
        {menu.cocktailSections
          .filter((section) => section.dishes.length > 0)
          .map((section) => (
            <section
              key={section._key}
              aria-labelledby={section._key}
              className="border-t border-soft-stone py-8 xl:py-10"
            >
              <h2
                id={section._key}
                className={cn(
                  ebGaramond.className,
                  "mb-6 text-[38px] leading-[44px] xl:text-[32px]",
                )}
              >
                {section.heading}
              </h2>
              <ul className="space-y-4 xl:space-y-3">
                {section.dishes.map((dish) => (
                  <li
                    key={dish._key}
                    className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 xl:grid-cols-[160px_1fr_auto]"
                  >
                    <h3 className="text-base leading-6">{dish.name}</h3>
                    {dish.description && (
                      <p
                        className={cn(
                          ebGaramond.className,
                          "col-start-1 row-start-2 text-[15px] leading-[23px] text-text-secondary xl:col-start-2 xl:row-start-1",
                        )}
                      >
                        {dish.description}
                      </p>
                    )}
                    {dish.price != null && (
                      <span className="col-start-2 row-start-1 text-sm leading-6 xl:col-start-3">
                        {formatMenuPrice(dish.price)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        {menu.spirits.some((section) => section.dishes.length > 0) && (
          <section
            aria-labelledby="spirits-heading"
            className="border-t border-soft-stone pt-8 xl:pt-10"
          >
            <h2
              id="spirits-heading"
              className={cn(
                ebGaramond.className,
                "text-[38px] leading-[44px] xl:text-[32px]",
              )}
            >
              {menu.spiritsHeading}
            </h2>
            {menu.spiritsDescription && (
              <p className="mt-4 text-[15px] leading-6 text-text-secondary xl:text-base">
                {menu.spiritsDescription}
              </p>
            )}
            <div className="mt-8 grid xl:grid-cols-2 xl:gap-x-28">
              {menu.spirits
                .filter((section) => section.dishes.length > 0)
                .map((section) => (
                  <section
                    key={section._key}
                    aria-labelledby={section._key}
                    className={cn(
                      "border-soft-stone py-8 not-first:border-t xl:even:-ml-14 xl:even:border-l xl:even:pl-14 xl:nth-2:border-t-0",
                      section.columns === 2 && "xl:col-span-2",
                    )}
                  >
                    <h3
                      id={section._key}
                      className="mb-4 flex items-center gap-2.5 text-sm tracking-[0.08em] text-peploe-burgundy uppercase before:h-0.5 before:w-12 before:bg-peploe-burgundy"
                    >
                      {section.heading}
                    </h3>
                    <div
                      className={cn(
                        "grid gap-4",
                        section.columns === 2 && "xl:grid-cols-2 xl:gap-x-28",
                      )}
                    >
                      {Array.from({ length: section.columns }, (_, index) =>
                        section.dishes.slice(
                          index *
                            Math.ceil(section.dishes.length / section.columns),
                          (index + 1) *
                            Math.ceil(section.dishes.length / section.columns),
                        ),
                      )
                        .filter((items) => items.length > 0)
                        .map((items) => (
                          <table
                            key={items[0]._key}
                            className="w-full text-[15px] xl:text-base"
                          >
                            <caption className="sr-only">
                              {section.heading} prices in euro
                            </caption>
                            <thead>
                              <tr className="text-[10px] font-medium tracking-[0.04em] text-peploe-burgundy uppercase xl:text-xs">
                                <th
                                  scope="col"
                                  className="pb-3 text-left font-medium"
                                >
                                  <span className="xl:sr-only">Selection</span>
                                </th>
                                <th
                                  scope="col"
                                  className="pb-3 text-right font-medium"
                                >
                                  Price
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((dish) => (
                                <tr key={dish._key}>
                                  <th
                                    scope="row"
                                    className="py-1 pr-4 text-left leading-[21px] font-normal"
                                  >
                                    {dish.name}
                                  </th>
                                  <td className="py-1 text-right align-top whitespace-nowrap">
                                    {formatMenuPrice(dish.price, 2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ))}
                    </div>
                  </section>
                ))}
            </div>
          </section>
        )}
      </div>
      <MenuNotes menu={menu} compact />
      <MenuBooking booking={menu.booking} />
    </article>
  );
}
