import { SetMenuCollection } from "@/components/app/compounds/set-menu-collection";
import { ROUTES } from "@/lib/constants";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { SEASONAL_MENU } from "@/lib/constants/seasonal-menu";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: "Seasonal Menu",
  description: SEASONAL_MENU.seoDescription,
  url: ROUTES.SEASONAL,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function MenuPage() {
  return <SetMenuCollection menu={SEASONAL_MENU} />;
}
