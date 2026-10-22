import { describe, expect, it } from "vitest";
import { seasonalEntrySchema } from "@/lib/seasonal-schema";

const entry = {
  _id: "test-event",
  _updatedAt: "2026-10-19T12:00:00Z",
  kind: "event",
  slug: "test-event",
  title: "Test event",
  date: "2026-12-01",
  category: "Wine dinner",
  summary: "Development example",
  seoDescription: "Development example",
  noIndex: true,
  hero: {
    eyebrow: "Event",
    heading: "Test event",
    description: "Development example",
    image: {
      src: "https://cdn.sanity.io/images/project/development/test.jpg",
      alt: "Dining room",
    },
  },
};

describe("seasonal CMS content", () => {
  it("limits editable related-card descriptions to twelve words", () => {
    const card = {
      _type: "seasonalRelatedPage",
      _key: "card",
      title: "Card",
      action: "Explore",
      image: entry.hero.image,
      href: "/menus/dinner",
      description:
        "One two three four five six seven eight nine ten eleven twelve",
    };
    const content = {
      ...entry,
      related: { eyebrow: "More", action: "Explore", cards: [card] },
    };
    expect(seasonalEntrySchema.safeParse(content).success).toBe(true);
    expect(
      seasonalEntrySchema.safeParse({
        ...content,
        related: {
          ...content.related,
          cards: [{ ...card, description: `${card.description} thirteen` }],
        },
      }).success,
    ).toBe(false);
  });
  it("accepts an editable page URL in both card sections", () => {
    const card = {
      _key: "custom",
      title: "A new experience",
      description: "Client copy",
      image: entry.hero.image,
      action: "Find Out More",
      href: "https://example.com/experiences/new?day=sunday#details",
    };
    const parsed = seasonalEntrySchema.parse({
      ...entry,
      menu: {
        eyebrow: "Food",
        heading: "Explore",
        description: "Copy",
        cards: [card],
      },
      related: {
        eyebrow: "More",
        action: "Explore",
        cards: [{ ...card, _type: "seasonalRelatedPage" }],
      },
    });
    expect(parsed.menu?.cards[0]).toMatchObject({ href: card.href });
    expect(parsed.related?.cards[0]).toMatchObject({ href: card.href });
  });
  it.each([undefined, "", "   "])(
    "requires a button URL in both linked card sections: %s",
    (href) => {
      const card = {
        _key: "link",
        title: "Card",
        description: "Copy",
        action: "Explore",
        image: entry.hero.image,
        href,
      };
      expect(
        seasonalEntrySchema.safeParse({
          ...entry,
          menu: {
            eyebrow: "Food",
            heading: "Explore",
            description: "Copy",
            cards: [card],
          },
        }).success,
      ).toBe(false);
      expect(
        seasonalEntrySchema.safeParse({
          ...entry,
          related: {
            eyebrow: "More",
            action: "Explore",
            cards: [{ ...card, _type: "seasonalRelatedPage" }],
          },
        }).success,
      ).toBe(false);
    },
  );
  it("accepts a minimal event without optional sections", () => {
    expect(seasonalEntrySchema.safeParse(entry).success).toBe(true);
  });
  it("rejects an impossible calendar date", () => {
    expect(
      seasonalEntrySchema.safeParse({ ...entry, date: "2026-02-30" }).success,
    ).toBe(false);
  });
  it("rejects an end date before the start", () => {
    expect(
      seasonalEntrySchema.safeParse({ ...entry, endDate: "2026-11-30" })
        .success,
    ).toBe(false);
  });
  it("rejects a slug that could escape the event path", () => {
    expect(
      seasonalEntrySchema.safeParse({ ...entry, slug: "../menus" }).success,
    ).toBe(false);
  });
  it("rejects an unsupported content variant", () => {
    expect(
      seasonalEntrySchema.safeParse({ ...entry, kind: "journal" }).success,
    ).toBe(false);
  });
  it("keeps test entries out of search unless explicitly enabled", () => {
    const parsed = seasonalEntrySchema.parse({ ...entry, noIndex: undefined });
    expect(parsed.noIndex).toBe(true);
  });
});

it("supports the Figma gallery's three to five photographs", () => {
  const gallery = (count: number) => ({
    eyebrow: "Gallery",
    heading: "Moments at Peploe's",
    images: Array.from({ length: count }, (_, index) => ({
      ...entry.hero.image,
      _key: `photo-${index}`,
    })),
  });
  for (const count of [3, 4, 5]) {
    expect(
      seasonalEntrySchema.safeParse({ ...entry, gallery: gallery(count) })
        .success,
    ).toBe(true);
  }
  for (const count of [2, 6]) {
    expect(
      seasonalEntrySchema.safeParse({ ...entry, gallery: gallery(count) })
        .success,
    ).toBe(false);
  }
});

it.each(["menu", "story", "gallery", "invitation", "related"])(
  "treats an empty %s section as absent",
  (section) => {
    const parsed = seasonalEntrySchema.parse({
      ...entry,
      [section]: { _type: "section", heading: "  ", image: {} },
    });
    expect(parsed[section as keyof typeof parsed]).toBeUndefined();
  },
);

it.each([
  ["menu", "cards"],
  ["story", "paragraphs"],
  ["gallery", "images"],
  ["related", "cards"],
])("hides %s when its %s collection is empty", (section, collection) => {
  const parsed = seasonalEntrySchema.parse({
    ...entry,
    [section]: {
      eyebrow: "Section label",
      heading: "Unused heading",
      [collection]: [],
    },
  });
  expect(parsed[section as keyof typeof parsed]).toBeUndefined();
});

it("does not hide malformed content in a populated optional section", () => {
  expect(
    seasonalEntrySchema.safeParse({
      ...entry,
      story: {
        heading: "A real story",
        paragraphs: [{ _key: "one", text: "Copy" }],
      },
    }).success,
  ).toBe(false);
  expect(
    seasonalEntrySchema.safeParse({ ...entry, story: [{ heading: "Story" }] })
      .success,
  ).toBe(false);
});

it("omits empty information rows while retaining completed rows", () => {
  const parsed = seasonalEntrySchema.parse({
    ...entry,
    details: [
      { _type: "seasonalDetail", _key: "empty" },
      { _key: "date", icon: "date", label: "Date", description: "1 December" },
    ],
  });
  expect(parsed.details.map((detail) => detail.label)).toEqual(["Date"]);
});

it("treats an empty diary label as unset so the shared label can be used", () => {
  expect(
    seasonalEntrySchema.parse({ ...entry, action: "  " }).action,
  ).toBeUndefined();
});
