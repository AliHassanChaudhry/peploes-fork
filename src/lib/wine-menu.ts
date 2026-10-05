import type { IWineCategory, IWineSection } from "@/lib/types";

export function getWineCategories(section: IWineSection): IWineCategory[] {
  const rowCount = Math.max(
    0,
    ...section.columns.map((column) => column.categories.length),
  );
  return Array.from({ length: rowCount }, (_, index) =>
    section.columns.flatMap((column) => {
      const category = column.categories[index];
      return category ? [category] : [];
    }),
  ).flat();
}

export function getAvailableWineSections(
  sections: readonly IWineSection[],
): IWineSection[] {
  return sections
    .map((section) => ({
      ...section,
      columns: section.columns
        .map((column) => ({
          ...column,
          categories: column.categories
            .map((category) => ({
              ...category,
              wines: category.wines.filter((wine) => wine.available !== false),
            }))
            .filter((category) => category.wines.length > 0),
        }))
        .filter((column) => column.categories.length > 0),
    }))
    .filter((section) => section.columns.length > 0);
}
