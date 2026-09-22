import type { IBreadcrumbTrailProps } from "@/lib/types";

export function BreadcrumbTrail({ items }: IBreadcrumbTrailProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-foreground"
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="transition-colors hover:text-foreground"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
