import type { IRestaurantFeaturesContent } from "@/lib/types";

export const RESTAURANT_FEATURES_CONTENT: IRestaurantFeaturesContent = {
  sectionLabel: "The Peploe’s experience",
  items: [
    {
      title: "Exceptional food & wine",
      description: "Seasonal menus and a thoughtful wine list.",
      illustration: "/peploes-food-wine.svg",
    },
    {
      title: "A welcoming atmosphere",
      description: "A place to relax, celebrate and catch up.",
      illustration: "/peploes-hospitality.svg",
    },
    {
      title: "Moments for every occasion",
      description: "From quiet dinners to lively gatherings.",
      illustration: "/peploes-occasions.svg",
    },
    {
      title: "A taste of the seasons",
      description: "The best produce, beautifully served.",
      illustration: "/peploes-seasons.svg",
    },
  ],
};
