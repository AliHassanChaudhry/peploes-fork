import { GROUPS_OCCASIONS_CONTENT } from "@/lib/constants/groups-occasions";

export const GROUPS_SHELF_CONTENT = {
  eyebrow: "Gather at Peploe’s",
  heading: GROUPS_OCCASIONS_CONTENT.heading,
  description:
    "From intimate gatherings to unforgettable celebrations, we make every occasion feel at home.",
  destinations: [
    {
      label: "Groups & Celebrations",
      description: "Memorable dining for every milestone.",
      image: "/peploes-groups-shelf-celebrations.png",
    },
    {
      label: "Corporate & Exclusive Hire",
      description: "Inspiring settings for business and beyond.",
      image: "/peploes-groups-shelf-corporate.png",
    },
    {
      label: "Weddings",
      description: "A beautiful backdrop for your next chapter.",
      image: "/peploes-groups-shelf-weddings.png",
    },
  ],
} as const;
