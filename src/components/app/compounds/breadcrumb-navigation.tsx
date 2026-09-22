import { JsonLd } from "@/components/app/atoms/json-ld";
import { BreadcrumbTrail } from "@/components/app/molecules/breadcrumb-trail";
import { getBreadcrumbSchema } from "@/lib/seo";
import type { IBreadcrumbsProps } from "@/lib/types";

export function Breadcrumbs({ items }: IBreadcrumbsProps) {
  if (!items.length) return null;

  const breadcrumbSchema = getBreadcrumbSchema(items);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BreadcrumbTrail items={items} />
    </>
  );
}
