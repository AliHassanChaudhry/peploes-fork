import { z } from "zod";
import { cardDescriptionSchema } from "@/lib/card-description";
import { SEASONAL_GALLERY_LIMITS } from "@/lib/constants";
import { pageLinkSchema } from "@/lib/link-schema";
import {
  keyedMenuArray,
  menuImageSchema,
  menuKeySchema,
  menuTextSchema,
  optionalMenuTextSchema,
} from "@/lib/menu-schema";

const text = menuTextSchema;
const image = menuImageSchema.pick({ src: true, alt: true });
export const seasonalSlugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().date();
const introduction = z.object({
  eyebrow: text,
  heading: text,
  description: text,
});
const hero = introduction.extend({ image });
const invitation = z.object({
  heading: text,
  description: text,
  bookingAction: text,
  enquiryAction: text,
  image,
});
export const seasonalCardSchema = z.object({
  _id: text,
  slug: seasonalSlugSchema,
  title: text,
  summary: text,
  action: optionalMenuTextSchema,
  category: text,
  date,
  endDate: date.nullish(),
  kind: z.enum(["campaign", "event", "menuMoment"]),
  noIndex: z.boolean().default(true),
  _updatedAt: z.string().datetime(),
  hero,
});
const menuCard = z.object({
  _key: menuKeySchema,
  title: text,
  description: text,
  action: text,
  image,
  href: pageLinkSchema,
});
const menuHighlight = menuCard.omit({ action: true, href: true }).extend({
  _type: z.literal("seasonalMenuHighlight"),
});
const relatedPage = menuCard.extend({
  description: cardDescriptionSchema,
  _type: z.literal("seasonalRelatedPage"),
});
const relatedCard = z.object({
  _id: text,
  title: text,
  summary: text,
  slug: seasonalSlugSchema,
  hero,
});

function hasSectionContent(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(hasSectionContent);
  if (value && typeof value === "object")
    return Object.entries(value).some(
      ([key, item]) =>
        key !== "_type" && key !== "_key" && hasSectionContent(item),
    );
  return value !== null && value !== undefined;
}

function optionalSection<Schema extends z.ZodTypeAny>(
  schema: Schema,
  collection?: string,
) {
  return z.preprocess((value) => {
    if (!hasSectionContent(value)) return undefined;
    if (
      collection &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      const items: unknown = Object.entries(value).find(
        ([key]) => key === collection,
      )?.[1];
      if (
        items == null ||
        (Array.isArray(items) && !items.some(hasSectionContent))
      )
        return undefined;
    }
    return value;
  }, schema.nullish());
}

export const seasonalEntrySchema = seasonalCardSchema
  .extend({
    seoDescription: text,
    details: z.preprocess(
      (value) =>
        Array.isArray(value) ? value.filter(hasSectionContent) : value,
      keyedMenuArray(
        z.object({
          _key: menuKeySchema,
          label: text,
          description: text,
          icon: z.enum(["date", "time", "price", "menu"]),
        }),
      ),
    ),
    menu: optionalSection(
      introduction.extend({
        cards: keyedMenuArray(z.union([menuHighlight, menuCard])),
      }),
      "cards",
    ),
    story: optionalSection(
      z.object({
        eyebrow: text,
        heading: text,
        paragraphs: keyedMenuArray(
          z.object({ _key: menuKeySchema, text }),
        ).refine((items) => items.length > 0, "Add at least one paragraph."),
        image,
      }),
      "paragraphs",
    ),
    gallery: optionalSection(
      z.object({
        eyebrow: text,
        heading: text,
        images: keyedMenuArray(image.extend({ _key: menuKeySchema })).refine(
          (images) =>
            images.length >= SEASONAL_GALLERY_LIMITS.MIN_IMAGES &&
            images.length <= SEASONAL_GALLERY_LIMITS.MAX_IMAGES,
          "Use three to five photos.",
        ),
      }),
      "images",
    ),
    invitation: optionalSection(invitation),
    related: optionalSection(
      z.object({
        eyebrow: text,
        action: text,
        cards: z.array(z.union([relatedPage, relatedCard])),
      }),
      "cards",
    ),
  })
  .refine((entry) => !entry.endDate || entry.endDate >= entry.date, {
    message: "End date must be on or after the start.",
    path: ["endDate"],
  });

export const whatsOnPageSchema = z.object({
  title: text,
  seoDescription: text,
  hero,
  diary: introduction.extend({ emptyMessage: text, action: text }),
  terrace: optionalSection(
    z.object({ heading: text, description: text, image }),
  ),
  join: hero.extend({ bookingAction: text, contactAction: text }),
});
