import { describe, expect, it } from "vitest";

import { hasAnalyticsConsent } from "@/lib/cookie-consent";

describe("analytics consent", function analyticsConsentTests() {
  it("denies analytics until a project supplies consent", function defaultConsentTest() {
    expect(hasAnalyticsConsent()).toBe(false);
  });
});
