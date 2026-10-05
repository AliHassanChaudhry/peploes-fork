import { describe, expect, it } from "vitest";

import { formatMenuPrice } from "@/lib/menu-price";

describe("menu prices", () => {
  it("leaves prices empty for dishes included in a set menu", () => {
    expect(formatMenuPrice(undefined)).toBeNull();
    expect(formatMenuPrice(null)).toBeNull();
  });

  it("keeps a valid zero distinct from a missing price", () => {
    expect(formatMenuPrice(0)).toBe("€0");
  });

  it("formats individual prices without rounding away cents", () => {
    expect(formatMenuPrice(7)).toBe("€7");
    expect(formatMenuPrice(7.5)).toBe("€7.5");
    expect(formatMenuPrice(12.95)).toBe("€12.95");
    expect(formatMenuPrice(7.5, 2)).toBe("€7.50");
  });
});
