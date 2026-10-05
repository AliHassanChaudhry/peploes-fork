import { NavigationShelf } from "@/components/app/molecules/navigation-shelf";
import { NavigationShelfLink } from "@/components/app/molecules/navigation-shelf-link";
import { MENUS_SHELF_CONTENT } from "@/lib/constants";
import { MENUS_CONTENT } from "@/lib/constants/menus";

export function DesktopMenus() {
  return (
    <NavigationShelf
      eyebrow={MENUS_CONTENT.eyebrow}
      heading={MENUS_SHELF_CONTENT.heading}
      description={MENUS_SHELF_CONTENT.description}
      introClassName="w-[360px]"
    >
      <ul
        aria-label={MENUS_CONTENT.categoriesLabel}
        className="grid min-w-0 flex-1 grid-cols-3 gap-x-10 gap-y-9"
      >
        {MENUS_CONTENT.categories.map(({ label, description }) => (
          <li key={label} className="min-w-0">
            <NavigationShelfLink label={label} description={description} />
          </li>
        ))}
      </ul>
    </NavigationShelf>
  );
}
