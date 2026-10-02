import type { IStoriesContent } from "@/lib/types";

export const STORIES_CONTENT = {
  eyebrow: "Stories from St Stephen's Green",
  headingLines: [
    "The people, produce, art and stories",
    "that shape Peploe’s.",
  ],
  description:
    "From the family behind the restaurant to the people we work with, these are the stories that continue to shape what comes next.",
  ctaLabel: "Explore the Journal",
  family: {
    eyebrow: "Our Story",
    heading: "Built by a family.",
    headingContinuation: "Carried forward today.",
    description:
      "From one generation to the next, Peploe’s remains a family business, shaped by the same values, the same place, and a deep love of hospitality.",
    ctaLabel: "Discover Our Story",
    image: {
      src: "/peploes-family.png",
      alt: "The Peploe’s team welcoming guests in the dining room.",
    },
  },
  produce: {
    eyebrow: "People & Produce",
    heading: "Rooted in good relationships.",
    description:
      "We work with people who share our passion for great produce, sourced with care and a lasting commitment to quality.",
    ctaLabel: "Meet the Producers",
    image: {
      src: "/peploes-producer.png",
      alt: "A fisherman holding a lobster beside fishing boats in the harbour.",
    },
  },
  gina: {
    eyebrow: "From Gina",
    heading: "Some things have changed. The things that matter haven’t.",
    ctaLabel: "Read the Story",
    image: {
      src: "/peploes-gina.png",
      alt: "A glass of wine beside a vase of flowers at Peploe’s.",
    },
  },
  art: {
    eyebrow: "Art & Place",
    heading: "The art of Peploe’s.",
    description: "Art has always been part of Peploe’s story.",
    ctaLabel: "Read the Story",
    image: {
      src: "/peploes-art.png",
      alt: "A collage of the painted portraits decorating Peploe’s.",
    },
  },
} as const satisfies IStoriesContent;
