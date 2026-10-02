import type { IFooterContent } from "@/lib/types";

export const FOOTER_CONTENT = {
  homeLabel: "Peploe’s home",
  address: "16 St Stephen's Green, Dublin 2",
  tagline: "A Dublin Restaurant",
  contactHeading: "Contact",
  openingHoursHeading: "Opening Hours",
  openingHours: [
    { days: "Monday – Wednesday", hours: "12pm to 10pm" },
    { days: "Thursday – Saturday", hours: "12pm to Late" },
    { days: "Sunday", hours: "Closed" },
  ],
  exploreHeading: "Explore",
  exploreLabels: [
    "Menus",
    "Our Story",
    "Groups & Occasions",
    "What’s On",
    "The Journal",
    "Visit & Contact",
    "Gift Vouchers",
  ],
  newsletter: {
    heading: "A Letter from Gina",
    description:
      "Seasonal notes from St Stephen's Green — food, wine, people and what's happening at Peploe's.",
    emailLabel: "Your email address",
    submitLabel: "Subscribe",
    status: "Newsletter signup is not available yet.",
  },
  copyright: "© 2026 Peploe’s",
  legalNavigationLabel: "Legal and accessibility",
  legalItems: [
    { label: "Privacy", mobileLabel: null },
    { label: "Terms", mobileLabel: null },
    { label: "Cookie Preferences", mobileLabel: "Cookies" },
    { label: "Accessibility", mobileLabel: null },
  ],
  instagramLabel: "Peploe’s on Instagram",
  facebookLabel: "Peploe’s on Facebook",
} as const satisfies IFooterContent;

export const FOOTER_STYLES = {
  heading:
    "text-[22px] leading-7 font-medium text-ink after:mt-1 after:block after:h-0.5 after:w-8 after:bg-peploe-burgundy xl:text-2xl xl:leading-[30px] xl:after:-mb-px",
  contactLink:
    "flex min-h-11 w-fit items-center gap-2 rounded-sm text-base leading-[22px] font-medium text-peploe-burgundy underline-offset-4 hover:underline focus-visible:ring-peploe-burgundy focus-visible:ring-offset-warm-cream xl:min-h-0",
} as const;
