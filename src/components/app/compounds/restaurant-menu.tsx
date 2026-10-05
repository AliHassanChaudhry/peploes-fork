import Image from "next/image";

import { Breadcrumbs } from "@/components/app/compounds/breadcrumb-navigation";
import { MenuBooking } from "@/components/app/compounds/menu-booking";
import { MenuCourse } from "@/components/app/molecules/menu-course";
import { MenuEditorialIntro } from "@/components/app/molecules/menu-editorial-intro";
import { MenuNotes } from "@/components/app/molecules/menu-notes";
import { ROUTES } from "@/lib/constants";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { IMenuContentProps, IMenuImageStyle } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RestaurantMenu({ menu }: IMenuContentProps) {
  const imageStyle: IMenuImageStyle = {
    "--menu-image-scale": menu.image?.desktopScale ?? 1.1,
  };

  return (
    <article className={cn(dmSans.className, "bg-warm-cream text-ink")}>
      <div className="site-container">
        {menu.introLayout === "editorial" ? (
          <MenuEditorialIntro menu={menu} />
        ) : (
          <div
            className={cn(
              "relative grid gap-4 pt-8 pb-7 xl:gap-6 xl:pt-10 xl:pb-10",
              menu.image && "xl:min-h-72 xl:grid-cols-2",
            )}
          >
            <div className="relative z-10">
              <Breadcrumbs
                items={[
                  { name: "Menus", url: ROUTES.MENUS },
                  { name: menu.slug, url: `${ROUTES.MENUS}/${menu.slug}` },
                ]}
                className="[&_ol]:gap-4 [&_ol]:text-sm [&_ol]:leading-5 [&_ol]:font-medium [&_ol]:tracking-[0.08em] [&_ol]:text-peploe-burgundy [&_ol]:uppercase [&_li]:gap-4 [&_[aria-current]]:text-peploe-burgundy"
              />
              <h1
                className={cn(
                  ebGaramond.className,
                  "mt-3 text-[46px] leading-[56px] tracking-[-0.5px] after:mt-2 after:block after:h-px after:w-14 after:bg-text-secondary/70 xl:text-[54px] xl:leading-[64px] xl:after:w-[72px]",
                )}
              >
                {menu.title}
              </h1>
              <p className="mt-3 text-xs leading-[19px] font-medium tracking-[0.06em] text-text-secondary uppercase xl:text-sm xl:leading-5">
                {menu.serviceTimes}
              </p>
              {menu.offer && (
                <p className="mt-3 text-[17px] leading-6 font-medium tracking-[0.06em] text-text-secondary uppercase xl:text-xl">
                  {menu.offer}
                </p>
              )}
            </div>
            {menu.image && (
              <div
                className="relative h-[214px] overflow-hidden sm:h-[320px] xl:absolute xl:top-12 xl:right-0 xl:bottom-0 xl:h-auto xl:w-[57%]"
                style={imageStyle}
              >
                <Image
                  src={menu.image.src}
                  alt={menu.image.alt}
                  fill
                  sizes="(min-width: 1280px) 57vw, (min-width: 640px) 100vw, calc(100vw - 48px)"
                  className="object-contain xl:scale-(--menu-image-scale) xl:object-cover xl:object-[center_42%]"
                />
              </div>
            )}
          </div>
        )}
        {menu.courses.map((course) => (
          <MenuCourse key={course._key} course={course} />
        ))}
      </div>
      <MenuNotes menu={menu} />
      <MenuBooking />
    </article>
  );
}
