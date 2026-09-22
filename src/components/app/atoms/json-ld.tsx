import type { IJsonLdProps } from "@/lib/types";

export function JsonLd({ data }: IJsonLdProps) {
  const jsonLd = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inner HTML for script tags
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
