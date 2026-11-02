import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/constants";
import { loadPublishedJournalSlugs } from "@/lib/journal-content";
import { getJournalArticlePath } from "@/lib/journal-data";
import { loadSeasonalEntries } from "@/lib/seasonal-content";
import { seasonalPath } from "@/lib/seasonal-data";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const staticPages = [
    ROUTES.HOME,
    ROUTES.WHATS_ON,
    ROUTES.OUR_STORY,
    ROUTES.JOURNAL,
    ROUTES.LUNCH,
    ROUTES.DINNER,
    ROUTES.PRE_THEATRE,
    ROUTES.WINE,
    ROUTES.COCKTAILS,
    ROUTES.GROUP_SET_MENU,
    ROUTES.SEASONAL,
    ROUTES.PRIVATE_DINING,
    ROUTES.CELEBRATIONS,
    ROUTES.CORPORATE_EVENTS,
    ROUTES.WEDDINGS,
    ROUTES.VISIT_CONTACT,
    ROUTES.PRIVACY_COOKIES,
    ROUTES.ACCESSIBILITY_POLICY,
    ROUTES.TERMS_CONDITIONS,
    ROUTES.BOOKING_CANCELLATION_TERMS,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
  }));
  const [entries, articles] = await Promise.all([
    loadSeasonalEntries(),
    loadPublishedJournalSlugs(),
  ]);
  return [
    ...staticPages,
    ...articles
      .filter((article) => !article.noIndex)
      .map((article) => ({
        url: `${baseUrl}${getJournalArticlePath(article.slug)}`,
        lastModified: article._updatedAt,
      })),
    ...entries
      .filter((entry) => !entry.noIndex)
      .map((entry) => ({
        url: `${baseUrl}${seasonalPath(entry.slug)}`,
        lastModified: entry._updatedAt,
      })),
  ];
}
