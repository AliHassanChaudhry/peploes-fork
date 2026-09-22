import { describe, expect, it } from "vitest";

import { EXAMPLE_LIMITS } from "@/lib/constants";
import { createExampleSchema } from "@/lib/examples-schema";

describe("createExampleSchema", function createExampleSchemaTests() {
  it("trims valid names and keeps only writable fields", function trimsValidNames() {
    const result = createExampleSchema.safeParse({
      id: 42,
      name: "  Example  ",
    });

    expect(result).toMatchObject({
      success: true,
      data: { name: "Example" },
    });
  });

  it("rejects blank names", function rejectsBlankNames() {
    const result = createExampleSchema.safeParse({ name: "   " });

    expect(result.success).toBe(false);
  });

  it("rejects names longer than the database column", function rejectsLongNames() {
    const result = createExampleSchema.safeParse({
      name: "x".repeat(EXAMPLE_LIMITS.NAME_MAX_LENGTH + 1),
    });

    expect(result.success).toBe(false);
  });
});
