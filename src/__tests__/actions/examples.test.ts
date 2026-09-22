import { describe, expect, it } from "vitest";

import { createExampleAction } from "@/actions/examples";
import { ErrorCode } from "@/lib/enums";

describe("createExampleAction", function createExampleActionTests() {
  it("rejects mutations until verified authentication is configured", async function rejectsUnauthenticatedMutation() {
    const formData = new FormData();

    const result = await createExampleAction(formData);

    expect(result).toMatchObject({
      error: { code: ErrorCode.Unauthorized },
    });
  });
});
