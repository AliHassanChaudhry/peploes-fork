import type { IHeroContent } from "@/lib/types";

export const HERO_CONTENT: IHeroContent = {
  eyebrow: "A Dublin restaurant",
  headingLines: ["Good food, fine wine", "and a room worth", "being in."],
  description:
    "Great food, exceptional wine and genuine hospitality in the heart of the city.",
  bookingLabel: "Book a Table",
  callLabel: "Call Peploe's",
  backgroundImage: { src: "/peploes-hero.jpg", alt: "" },
  entranceBackground: { src: "/peploes-entrance-backdrop.png", alt: "" },
  entranceImage: {
    src: "/peploes-entrance.png",
    alt: "Peploe’s red awning above the steps leading down to the restaurant.",
  },
  entranceCaption: "Step down from the city.",
};
