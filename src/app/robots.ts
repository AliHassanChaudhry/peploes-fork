import type { MetadataRoute } from "next";
import { isProduction } from "@/lib/config";
import { buildRobots, getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(getSiteUrl(), isProduction());
}
