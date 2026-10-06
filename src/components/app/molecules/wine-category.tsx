import { ebGaramond } from "@/lib/fonts";
import { formatMenuPrice } from "@/lib/menu-price";
import type { IWineCategoryProps, IWineCategoryStyle } from "@/lib/types";
import { cn } from "@/lib/utils";

export function WineCategory({
  category,
  sectionKey,
  column,
  rowSpan,
  continued,
}: IWineCategoryProps) {
  const id = `${sectionKey}-${category._key}`;
  const columnCount =
    2 + Number(category.showVintage) + Number(category.showGlass);
  const style: IWineCategoryStyle = {
    "--wine-column": column,
    "--wine-row-span": rowSpan,
  };
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      style={style}
      className={cn(
        "scroll-mt-40 border-soft-stone not-first:border-t not-first:pt-8 xl:col-start-(--wine-column) xl:row-span-(--wine-row-span)",
        !continued && "xl:not-first:border-t-0 xl:not-first:pt-0",
        column === 2 && "xl:-ml-14 xl:border-l xl:pl-14",
      )}
    >
      <h3
        id={`${id}-heading`}
        className={cn(
          ebGaramond.className,
          "mb-6 text-[34px] leading-10 xl:text-[32px]",
        )}
      >
        {category.heading}
      </h3>
      <table className="w-full table-fixed text-sm">
        <caption className="sr-only">
          {category.heading} wine list, prices in euro
        </caption>
        <thead className="text-right text-[10px] font-medium tracking-[0.04em] text-peploe-burgundy uppercase xl:text-xs">
          <tr>
            <th scope="col" className="pb-4 text-left font-medium">
              <span className="xl:sr-only">Origin</span>
            </th>
            {category.showVintage && (
              <th scope="col" className="w-[54px] pb-4 font-medium xl:w-16">
                Vintage
              </th>
            )}
            {category.showGlass && (
              <th scope="col" className="w-12 pb-4 font-medium xl:w-16">
                Glass
              </th>
            )}
            <th scope="col" className="w-14 pb-4 font-medium xl:w-16">
              Bottle
            </th>
          </tr>
        </thead>
        {category.wines.map((wine) => (
          <tbody key={wine._key}>
            <tr className="xl:hidden">
              <th
                scope="rowgroup"
                colSpan={columnCount}
                className="pt-2 text-left text-base leading-6 font-normal"
              >
                {wine.name}
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                className="hidden pb-4 text-left align-top text-base leading-6 font-normal xl:table-cell"
              >
                {wine.name}
                {wine.region && (
                  <span
                    className={cn(
                      ebGaramond.className,
                      "block text-sm leading-5 text-text-secondary",
                    )}
                  >
                    {wine.region}
                  </span>
                )}
              </th>
              <td
                className={cn(
                  ebGaramond.className,
                  "pb-4 pt-1 pr-1 text-sm leading-5 text-text-secondary xl:hidden",
                )}
              >
                {wine.region}
              </td>
              {category.showVintage && (
                <td className="pb-4 text-right align-top">
                  {wine.vintage ?? "–"}
                </td>
              )}
              {category.showGlass && (
                <td className="pb-4 text-right align-top">
                  {formatMenuPrice(wine.glass) ?? "–"}
                </td>
              )}
              <td className="pb-4 text-right align-top">
                {formatMenuPrice(wine.bottle) ?? "–"}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </section>
  );
}
