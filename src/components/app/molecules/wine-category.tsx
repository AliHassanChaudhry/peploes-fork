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
  const hasOrigins = category.wines.some((wine) => Boolean(wine.region));
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
        "relative scroll-mt-40 border-soft-stone not-first:pt-8 not-first:before:absolute not-first:before:top-0 not-first:before:h-0.5 not-first:before:w-[42px] not-first:before:bg-peploe-burgundy xl:col-start-(--wine-column) xl:row-span-(--wine-row-span) xl:not-first:border-t xl:before:hidden",
        !continued && "xl:not-first:border-t-0 xl:not-first:pt-0",
        column === 2 &&
          "xl:after:absolute xl:after:inset-y-0 xl:after:-left-[57px] xl:after:w-px xl:after:bg-soft-stone",
        !hasOrigins && "not-first:mt-[14px] xl:not-first:mt-0",
      )}
    >
      <h3
        id={`${id}-heading`}
        className={cn(
          ebGaramond.className,
          "mb-4 text-[34px] leading-10 tracking-[-0.6px] xl:mb-4 xl:text-[32px] xl:leading-[38px]",
          category.emphasized && "xl:text-[42px] xl:leading-[46px]",
        )}
      >
        {category.heading}
      </h3>
      <table className="w-full table-fixed text-sm leading-5">
        <caption className="sr-only">
          {category.heading} wine list, prices in euro
        </caption>
        <thead className="text-right text-[10px] font-medium tracking-[0.04em] text-peploe-burgundy uppercase xl:text-xs">
          <tr>
            <th scope="col" className="pb-4 text-left font-medium">
              <span className="xl:sr-only">
                {hasOrigins ? "Origin" : "Wine"}
              </span>
            </th>
            {category.showVintage && (
              <th
                scope="col"
                className="w-[60px] pb-4 font-medium xl:w-20 xl:text-center"
              >
                Vintage
              </th>
            )}
            {category.showGlass && (
              <th
                scope="col"
                className="w-14 pb-4 font-medium xl:w-20 xl:text-center"
              >
                Glass
              </th>
            )}
            <th
              scope="col"
              className="w-14 pb-4 font-medium xl:w-20 xl:text-center"
            >
              Bottle
            </th>
          </tr>
        </thead>
        {category.wines.map((wine) => (
          <tbody key={wine._key}>
            <tr className={hasOrigins ? "xl:hidden" : "hidden"}>
              <th
                scope="rowgroup"
                colSpan={columnCount}
                className="text-left text-base leading-6 font-normal"
              >
                {wine.name}
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                className={cn(
                  "pb-[14px] text-left align-top text-base leading-6 font-normal xl:table-cell",
                  hasOrigins && "hidden",
                )}
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
                  !hasOrigins && "hidden",
                )}
              >
                {wine.region}
              </td>
              {category.showVintage && (
                <td
                  className={cn(
                    "pb-[14px] text-right align-top leading-6 xl:text-center",
                    hasOrigins && "pt-1 leading-5 xl:pt-0 xl:leading-6",
                  )}
                >
                  {wine.vintage ?? "–"}
                </td>
              )}
              {category.showGlass && (
                <td
                  className={cn(
                    "pb-[14px] text-right align-top leading-6 xl:text-center",
                    hasOrigins && "pt-1 leading-5 xl:pt-0 xl:leading-6",
                  )}
                >
                  {formatMenuPrice(wine.glass) ?? "–"}
                </td>
              )}
              <td
                className={cn(
                  "pb-[14px] text-right align-top leading-6 xl:text-center",
                  hasOrigins && "pt-1 leading-5 xl:pt-0 xl:leading-6",
                )}
              >
                {formatMenuPrice(wine.bottle) ?? "–"}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </section>
  );
}
