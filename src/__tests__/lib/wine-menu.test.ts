import { describe, expect, it } from "vitest";

import type { IWineCategory, IWineSection } from "@/lib/types";
import { getAvailableWineSections, getWineCategories } from "@/lib/wine-menu";

const category = (heading: string): IWineCategory => ({
  _key: heading.toLowerCase(),
  heading,
  showGlass: true,
  showVintage: true,
  wines: [{ _key: "sample", name: "Sample wine", glass: 0 }],
});

describe("wine menu content", () => {
  it("removes unavailable bottles and empty navigation targets without mutating the source", () => {
    const source: IWineSection[] = [
      {
        _key: "white",
        heading: "White Wines",
        columns: [
          {
            _key: "left",
            categories: [
              {
                ...category("France"),
                wines: [
                  { _key: "sold-out", name: "Sold out", available: false },
                ],
              },
              category("Germany"),
            ],
          },
        ],
      },
    ];
    const result = getAvailableWineSections(source);
    expect(result[0].columns[0].categories.map((item) => item.heading)).toEqual(
      ["Germany"],
    );
    expect(result[0].columns[0].categories[0].wines[0].glass).toBe(0);
    expect(source[0].columns[0].categories).toHaveLength(2);
  });

  it("omits a whole section when no available categories remain", () => {
    expect(
      getAvailableWineSections([
        {
          _key: "empty",
          heading: "Empty",
          columns: [{ _key: "left", categories: [] }],
        },
      ]),
    ).toEqual([]);
    expect(getAvailableWineSections([])).toEqual([]);
  });

  it("reads countries across desktop rows in the same order on mobile and in the index", () => {
    expect(
      getWineCategories({
        _key: "white",
        heading: "White Wines",
        columns: [
          {
            _key: "left",
            categories: [
              category("France"),
              category("Spain"),
              category("Germany"),
            ],
          },
          { _key: "right", categories: [category("Italy"), category("USA")] },
        ],
      }).map((item) => item.heading),
    ).toEqual(["France", "Italy", "Spain", "USA", "Germany"]);
  });
});
