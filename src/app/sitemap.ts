import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/constants";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return [
    ROUTES.HOME,
    ROUTES.LUNCH,
    ROUTES.DINNER,
    ROUTES.PRE_THEATRE,
    ROUTES.WINE,
    ROUTES.COCKTAILS,
    ROUTES.GROUP_SET_MENU,
    ROUTES.SEASONAL,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
  }));
}
