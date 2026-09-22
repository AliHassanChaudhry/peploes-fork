import "server-only";

import type { Metadata } from "next";
import { env } from "@/lib/config";
import { DEFAULT_SEO } from "@/lib/constants";
import type {
  IOrganizationSchemaConfig,
  ISeoConfig,
  IWebsiteSchemaConfig,
} from "@/lib/types";

export function getSiteUrl(): string {
  const url = env.NEXT_PUBLIC_SITE_URL;
  return url.replace(/\/$/u, "");
}

export function buildSeoMetadata(config: ISeoConfig): Metadata {
  const {
    title,
    description,
    url,
    image,
    imageAlt,
    type = "website",
    noIndex,
    noFollow,
    publishedTime,
    modifiedTime,
    author,
  } = config;
  const fullTitle = title.includes(DEFAULT_SEO.siteName)
    ? title
    : `${title}${DEFAULT_SEO.titleSuffix}`;
  const canonical = url.startsWith("http") ? url : `${getSiteUrl()}${url}`;
  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      type,
      siteName: DEFAULT_SEO.siteName,
      locale: DEFAULT_SEO.locale,
      ...(image ? { images: [{ url: image, alt: imageAlt }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(author ? { authors: [author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(DEFAULT_SEO.twitterHandle
        ? { creator: DEFAULT_SEO.twitterHandle }
        : {}),
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
  };
  return metadata;
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.url}`,
    })),
  };
}

export function getWebsiteSchema(config: IWebsiteSchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    description: config.description,
    url: config.url,
    ...(config.alternateName ? { alternateName: config.alternateName } : {}),
  };
}

export function getOrganizationSchema(config: IOrganizationSchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    ...(config.logoUrl ? { logo: config.logoUrl } : {}),
    ...(config.sameAs?.length ? { sameAs: config.sameAs } : {}),
  };
}
