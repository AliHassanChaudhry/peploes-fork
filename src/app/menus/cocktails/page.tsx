import { DrinksMenu } from "@/components/app/compounds/drinks-menu";
import { ROUTES } from "@/lib/constants";
import { COCKTAILS_MENU } from "@/lib/constants/cocktails-menu";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: "Cocktails Menu",
  description: COCKTAILS_MENU.seoDescription,
  url: ROUTES.COCKTAILS,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function MenuPage() {
  return <DrinksMenu menu={COCKTAILS_MENU} />;
}
