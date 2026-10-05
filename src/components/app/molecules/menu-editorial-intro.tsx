import Image from "next/image";

import { Breadcrumbs } from "@/components/app/compounds/breadcrumb-navigation";
import { ROUTES } from "@/lib/constants";
import { ebGaramond, ebGaramondItalic } from "@/lib/fonts";
import type {
  IMenuEditorialImageProps,
  IMenuEditorialIntroProps,
  IMenuImageStyle,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export function MenuEditorialIntro({
  menu,
  compact = false,
}: IMenuEditorialIntroProps) {
  return (
    <header
      className={cn(
        "grid gap-6 pt-8 pb-8 xl:min-h-60 xl:items-center xl:gap-8 xl:py-6",
        (menu.image || menu.aside) && "xl:grid-cols-2",
        menu.image && menu.aside && "xl:grid-cols-[minmax(0,1fr)_280px_220px]",
        compact && "xl:min-h-40 xl:py-8",
        compact &&
          menu.image &&
          menu.aside &&
          "xl:grid-cols-[minmax(0,1fr)_134px_220px]",
        menu.serviceTimes && "xl:min-h-72",
      )}
    >
      <div>
        <Breadcrumbs
          items={[
            { name: "Menus", url: ROUTES.MENUS },
            {
              name: menu.slug.replaceAll("-", " "),
              url: `${ROUTES.MENUS}/${menu.slug}`,
            },
          ]}
          className="[&_ol]:gap-4 [&_ol]:text-sm [&_ol]:leading-5 [&_ol]:font-medium [&_ol]:tracking-[0.08em] [&_ol]:text-peploe-burgundy [&_ol]:uppercase [&_li]:gap-4 [&_[aria-current]]:text-peploe-burgundy"
        />
        <h1
          className={cn(
            ebGaramond.className,
            "mt-3 whitespace-pre-line text-[46px] leading-[1.1] tracking-[-0.5px] after:mt-3 after:block after:h-px after:w-14 after:bg-text-secondary/70 xl:text-[54px] xl:leading-[52px] xl:after:hidden",
            compact && "xl:text-[46px]",
          )}
        >
          {menu.title}
        </h1>
        {menu.description && (
          <p className={cn(ebGaramond.className, "mt-4 text-lg leading-6")}>
            {menu.description}
          </p>
        )}
        {menu.serviceTimes && (
          <p className="mt-7 text-xs leading-[19px] font-medium tracking-[0.06em] text-text-secondary uppercase xl:text-sm">
            {menu.serviceTimes}
          </p>
        )}
        {menu.offer && (
          <p className="mt-3 text-[17px] leading-6 font-medium tracking-[0.06em] text-text-secondary uppercase xl:text-xl">
            {menu.offer}
          </p>
        )}
      </div>
      {menu.image && (
        <MenuEditorialImage
          image={menu.image}
          compact={compact}
          imageBeforeAside={menu.imageBeforeAside}
        />
      )}
      {menu.aside && (
        <p
          className={cn(
            ebGaramondItalic.className,
            "text-lg leading-6 text-text-secondary after:mt-7 after:block after:h-0.5 after:w-14 after:bg-peploe-burgundy xl:order-3 xl:text-base xl:leading-[22px]",
          )}
        >
          {menu.aside}
        </p>
      )}
    </header>
  );
}

function MenuEditorialImage({
  image,
  compact,
  imageBeforeAside,
}: IMenuEditorialImageProps) {
  const imageStyle: IMenuImageStyle = {
    "--menu-image-scale": image.scale ?? 1,
  };
  return (
    <div
      className={cn(
        "relative h-[230px] overflow-hidden xl:order-2 xl:h-48",
        compact && "h-[210px] xl:h-[108px]",
        image.fit === "cover" && "xl:-my-6 xl:h-60",
        !imageBeforeAside && "order-3",
      )}
      style={imageStyle}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 280px, (min-width: 640px) 600px, calc(100vw - 48px)"
        className={cn(
          "object-contain",
          image.fit === "cover" && "object-cover",
          image.scale &&
            "origin-bottom scale-(--menu-image-scale) object-cover",
        )}
      />
    </div>
  );
}
