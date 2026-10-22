import { expect, it } from "vitest";
import { pageLinkSchema } from "@/lib/link-schema";

it.each([
  "/menus/seasonal",
  "/seasonal/client-event",
  "/future-page?day=sunday#details",
  "https://example.com/event?day=sunday#details",
  "http://example.com/event",
  "#details",
])("accepts a client page destination: %s", (href) => {
  expect(pageLinkSchema.parse(href)).toBe(href);
});

it("trims surrounding whitespace from a pasted URL", () => {
  expect(pageLinkSchema.parse(" https://example.com/event ")).toBe(
    "https://example.com/event",
  );
});

it.each([
  undefined,
  null,
  "",
  " ",
  "javascript:alert(1)",
  "data:text/html,hello",
  "//example.com",
  "/\\example.com",
  "https:\\example.com",
  "https://",
  "https:example.com",
  "http:example.com",
  "mailto:hello@example.com",
  "/bad path",
  "/bad\u0000path",
  "/bad\u007fpath",
  "https://exa\nmple.com",
])("rejects a missing or unsafe page destination: %s", (href) => {
  expect(pageLinkSchema.safeParse(href).success).toBe(false);
});
