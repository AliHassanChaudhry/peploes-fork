import { RESTAURANT_CONTACT } from "@/lib/constants";
import type { IMobileNavigationContent } from "@/lib/types";

export const MOBILE_NAVIGATION_CONTENT = {
  openLabel: "Open menu",
  closeLabel: "Close menu",
  title: "Navigation menu",
  navigationLabel: "Mobile navigation",
  items: [
    {
      id: "menus",
      label: "Menus",
      children: [
        "Lunch",
        "Dinner",
        "Pre–Theatre",
        "Wine",
        "Cocktails",
        "Seasonal",
      ],
    },
    { id: "our-story", label: "Our Story" },
    {
      id: "groups-occasions",
      label: "Groups & Occasions",
      children: [
        "Groups & Celebrations",
        "Corporate & Exclusive Hire",
        "Weddings",
      ],
    },
    { id: "whats-on", label: "What’s On" },
    { id: "visit-contact", label: "Visit & Contact" },
  ],
  giftVouchersLabel: "Gift Vouchers",
  openingHoursHeading: "Opening Hours",
  openingHours: [
    { days: "Monday – Wednesday", hours: "12pm to 10pm" },
    { days: "Thursday – Saturday", hours: "12pm to Late" },
  ],
  address: "16 St Stephen’s Green, Dublin 2",
  phoneAction: {
    href: `tel:${RESTAURANT_CONTACT.phone}`,
    label: RESTAURANT_CONTACT.phoneLabel,
  },
  emailAction: {
    href: `mailto:${RESTAURANT_CONTACT.email}`,
    label: RESTAURANT_CONTACT.email,
  },
  brandPhrase: "People make Peploe’s.",
} as const satisfies IMobileNavigationContent;
