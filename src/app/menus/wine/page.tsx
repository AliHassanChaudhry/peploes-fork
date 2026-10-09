import { WineMenu } from "@/components/app/compounds/wine-menu";
import { ROUTES } from "@/lib/constants";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { WINE_MENU } from "@/lib/constants/wine-menu";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: "Wine Menu",
  description: WINE_MENU.seoDescription,
  url: ROUTES.WINE,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function MenuPage() {
  return <WineMenu menu={WINE_MENU} />;
}
