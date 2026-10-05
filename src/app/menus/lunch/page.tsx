import { RestaurantMenu } from "@/components/app/compounds/restaurant-menu";
import { ROUTES } from "@/lib/constants";
import { LUNCH_MENU } from "@/lib/constants/lunch-menu";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: LUNCH_MENU.title,
  description: LUNCH_MENU.seoDescription,
  url: ROUTES.LUNCH,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function LunchMenuPage() {
  return <RestaurantMenu menu={LUNCH_MENU} />;
}
