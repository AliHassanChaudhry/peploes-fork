import { describe, expect, it, vi } from "vitest";

import { batchProcess } from "@/lib/batch";

describe("batchProcess", () => {
  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid concurrency %s before processing",
    async (concurrency) => {
      const processor = vi.fn(() => Promise.resolve("unused"));

      await expect(
        batchProcess({ items: [], processor, concurrency }),
      ).rejects.toThrow("Concurrency must be a positive integer.");
      expect(processor).not.toHaveBeenCalled();
    },
  );

  it("keeps successful results ordered and records failures by input index", async () => {
    const failure = new Error("Item unavailable");
    let active = 0;
    let peak = 0;

    const result = await batchProcess({
      items: [1, 2, 3, 4],
      concurrency: 2,
      processor: async (item) => {
        active++;
        peak = Math.max(peak, active);
        await Promise.resolve();
        active--;
        if (item === 2) throw failure;
        return item * 10;
      },
    });

    expect(result).toEqual({
      results: [10, 30, 40],
      errors: [{ index: 1, error: failure }],
    });
    expect(peak).toBe(2);
  });

  it("records a processor that throws before returning a promise", async () => {
    const failure = new Error("Cannot start item");

    const result = await batchProcess({
      items: [1, 2, 3],
      concurrency: 2,
      processor: (item) => {
        if (item === 2) throw failure;
        return Promise.resolve(item);
      },
    });

    expect(result).toEqual({
      results: [1, 3],
      errors: [{ index: 1, error: failure }],
    });
  });
});
