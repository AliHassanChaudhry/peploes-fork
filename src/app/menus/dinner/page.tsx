import { RestaurantMenu } from "@/components/app/compounds/restaurant-menu";
import { ROUTES } from "@/lib/constants";
import { DINNER_MENU } from "@/lib/constants/dinner-menu";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: DINNER_MENU.title,
  description: DINNER_MENU.seoDescription,
  url: ROUTES.DINNER,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function DinnerMenuPage() {
  return <RestaurantMenu menu={DINNER_MENU} />;
}
