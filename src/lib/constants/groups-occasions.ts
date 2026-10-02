import type { IGroupsOccasionsContent } from "@/lib/types";

export const GROUPS_OCCASIONS_CONTENT = {
  eyebrow: "Groups & Occasions",
  heading: "Life tastes better together.",
  description:
    "From long lunches to special celebrations, Peploe's offers a welcoming setting for private dining and group bookings in the heart of St. Stephen's Green.",
  ctaLabel: "Groups & Occasions",
  cardCtaLabel: "Explore",
  image: { src: "/peploes-groups-banner.png", alt: "" },
  occasions: [
    {
      title: "Groups & Celebrations",
      description:
        "Birthdays, family gatherings, long lunches and special occasions.",
      image: "/peploes-celebrations.jpg",
      imageAlt: "Guests raising glasses of red wine over a candlelit table.",
      minHeight: 187,
    },
    {
      title: "Corporate & Exclusive Hire",
      description:
        "From team dinners to full-room occasions, with bespoke menus and attentive service.",
      image: "/peploes-corporate.jpg",
      imageAlt:
        "A table set for a group dinner with white flowers and wine glasses.",
      minHeight: 208,
    },
    {
      title: "Weddings",
      description:
        "Intimate celebrations in the heart of Dublin, with a setting that feels both special and relaxed.",
      image: "/peploes-weddings.jpg",
      imageAlt: "A wedding table with flowers, candles and champagne glasses.",
      minHeight: 208,
    },
  ],
} as const satisfies IGroupsOccasionsContent;
