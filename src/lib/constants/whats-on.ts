import type { IWhatsOnContent, IWhatsOnEvent } from "@/lib/types";

export const WHATS_ON_CONTENT: IWhatsOnContent = {
  eyebrow: "This season at Peploe’s",
  heading: "What’s On",
  description:
    "From seasonal menus to special events, there’s always something to look forward to at Peploe’s.",
  ctaLabel: "View what’s on",
};

export const whatsOnEvents: readonly IWhatsOnEvent[] = [
  {
    id: "lobster-week",
    category: "Seasonal special",
    title: "Lobster Week Returns",
    description:
      "A Peploe’s favourite is back. Enjoy a specially curated menu celebrating the best of the season, with fresh Irish lobster at its heart.",
    imageSrc: "/peploes-lobster.jpg",
    imageAlt: "Lobster served with seasonal vegetables in the restaurant.",
    ctaLabel: "Explore Lobster Week",
  },
  {
    id: "seasonal-wine-dinner",
    category: "Special event",
    title: "A Seasonal Wine Dinner",
    description:
      "An intimate evening exploring remarkable wines and seasonal dishes, hosted by our team and special guests.",
    imageSrc: "/peploes-wine-dinner.jpg",
    imageAlt: "Wine being poured at a table set for dinner.",
    ctaLabel: "Find out more",
  },
  {
    id: "sunday-at-peploes",
    category: "At Peploe’s",
    title: "Sunday at Peploe’s",
    description:
      "Long lunches, great company and the perfect end to the week, in the heart of St Stephen’s Green.",
    imageSrc: "/peploes-sunday.png",
    imageAlt: "Guests sharing lunch around a long table at Peploe’s.",
    ctaLabel: "See more",
    mobileCtaLabel: "Find out more",
  },
];
