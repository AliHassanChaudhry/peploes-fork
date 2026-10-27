import type { ReactNode } from "react";

import { TrackEvent } from "@/components/app/atoms/track-event";
import { DrinksMenu } from "@/components/app/compounds/drinks-menu";
import { RestaurantMenu } from "@/components/app/compounds/restaurant-menu";
import { SetMenuCollection } from "@/components/app/compounds/set-menu-collection";
import { WineMenu } from "@/components/app/compounds/wine-menu";
import { MENU_ROUTES } from "@/lib/constants";
import { GA4Event } from "@/lib/enums";
import { getMenuBooking, loadMenu, loadMenusPage } from "@/lib/menu-content";
import { buildSeoMetadata } from "@/lib/seo";
import type { ICmsMenuPageProps, TMenuSlug } from "@/lib/types";

export async function CmsMenuPage({ slug }: ICmsMenuPageProps) {
  const [menu, settings] = await Promise.all([loadMenu(slug), loadMenusPage()]);
  const booking = getMenuBooking(slug, menu.booking ?? settings.booking);
  let content: ReactNode;
  switch (menu._type) {
    case "restaurantMenu":
      content = <RestaurantMenu menu={{ ...menu, booking }} />;
      break;
    case "wineMenu":
      content = <WineMenu menu={{ ...menu, booking }} />;
      break;
    case "drinksMenu":
      content = <DrinksMenu menu={{ ...menu, booking }} />;
      break;
    case "setMenuCollection":
      content = <SetMenuCollection menu={{ ...menu, booking }} />;
      break;
  }
  return (
    <>
      <TrackEvent eventName={GA4Event.MenuView} params={{ menu: slug }} />
      {content}
    </>
  );
}

export async function getMenuMetadata(slug: TMenuSlug) {
  const [menu, settings] = await Promise.all([loadMenu(slug), loadMenusPage()]);
  const image = menu.image ?? settings.image;
  return buildSeoMetadata({
    title: menu.title,
    description: menu.seoDescription,
    url: MENU_ROUTES[slug],
    image: image.src,
    imageAlt: image.alt,
  });
}
