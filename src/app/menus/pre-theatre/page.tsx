import { RestaurantMenu } from "@/components/app/compounds/restaurant-menu";
import { ROUTES } from "@/lib/constants";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { PRE_THEATRE_MENU } from "@/lib/constants/pre-theatre-menu";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: PRE_THEATRE_MENU.title,
  description: PRE_THEATRE_MENU.seoDescription,
  url: ROUTES.PRE_THEATRE,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function MenuPage() {
  return <RestaurantMenu menu={PRE_THEATRE_MENU} />;
}
