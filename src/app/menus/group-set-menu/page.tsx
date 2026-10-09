import { SetMenuCollection } from "@/components/app/compounds/set-menu-collection";
import { ROUTES } from "@/lib/constants";
import { GROUP_SET_MENU } from "@/lib/constants/group-set-menu";
import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata = buildSeoMetadata({
  title: "Group Set Menu",
  description: GROUP_SET_MENU.seoDescription,
  url: ROUTES.GROUP_SET_MENU,
  image: MENU_PAGE_CONTENT.image.src,
  imageAlt: MENU_PAGE_CONTENT.image.alt,
});

export default function MenuPage() {
  return <SetMenuCollection menu={GROUP_SET_MENU} />;
}
