import type { IMenusContent } from "@/lib/types";

export const MENUS_CONTENT = {
  eyebrow: "Our Menus",
  heading: "Good food brings people together.",
  description:
    "A seasonally inspired menu, classic favourites and a few Peploe's signature dishes, all served with care in a setting made for good company.",
  categoriesLabel: "Menu categories",
  categories: [
    { label: "Lunch", description: "Elegant dishes for daytime dining." },
    { label: "Dinner", description: "A classic Peploe’s experience." },
    {
      label: "Pre-Theatre",
      description: "Perfect for an evening in the city.",
    },
    { label: "Wine", description: "An exceptional cellar, carefully curated." },
    {
      label: "Cocktails",
      description: "Timeless classics and creative serves.",
    },
    { label: "Seasonal", description: "Inspired by the best of each season." },
  ],
  ctaLabel: "Explore Our Menus",
  image: {
    src: "/peploes-dining-room.jpg",
    alt: "Guests dining at Peploe’s, surrounded by red banquettes and colourful murals.",
  },
} as const satisfies IMenusContent;
