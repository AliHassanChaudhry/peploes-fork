import { ROUTES } from "@/lib/constants";
import type { IGroupsOccasionsContent } from "@/lib/types";

export const GROUPS_OCCASIONS_CONTENT: IGroupsOccasionsContent = {
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
      href: ROUTES.CELEBRATIONS,
      description:
        "Birthdays, family gatherings, long lunches and special occasions.",
      mobileDescription:
        "Private dining and relaxed celebrations, with menus shaped around your occasion.",
      image: {
        src: "/peploes-celebrations.jpg",
        alt: "Guests raising glasses of red wine over a candlelit table.",
      },
    },
    {
      title: "Corporate & Exclusive Hire",
      href: ROUTES.CORPORATE_EVENTS,
      description:
        "From team dinners to full-room occasions, with bespoke menus and attentive service.",
      image: {
        src: "/peploes-corporate.jpg",
        alt: "A table set for a group dinner with white flowers and wine glasses.",
      },
    },
    {
      title: "Weddings",
      href: ROUTES.WEDDINGS,
      description:
        "Intimate celebrations with delicious food, warm hospitality and a truly special setting.",
      image: {
        src: "/peploes-weddings.jpg",
        alt: "A wedding table with flowers, candles and champagne glasses.",
      },
    },
  ],
};
