import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/constants";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return [{ url: `${baseUrl}${ROUTES.HOME}` }];
}
