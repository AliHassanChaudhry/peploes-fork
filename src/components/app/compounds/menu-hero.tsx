import Image from "next/image";

import { MENU_PAGE_CONTENT } from "@/lib/constants/menu-page";
import { dmSans, ebGaramond } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function MenuHero() {
  return (
    <section
      className={cn(
        dmSans.className,
        "relative isolate flex min-h-[428px] items-end overflow-hidden bg-ink text-warm-cream xl:min-h-[390px] xl:items-center",
      )}
      aria-labelledby="menus-hero-heading"
    >
      <Image
        src={MENU_PAGE_CONTENT.image.src}
        alt={MENU_PAGE_CONTENT.image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[50%_59%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,15,13,0.08)_0%,rgba(20,15,13,0.72)_72%,rgba(20,15,13,0.86)_100%)] xl:bg-[linear-gradient(90deg,rgba(20,15,13,0.88)_0%,rgba(20,15,13,0.56)_45%,rgba(20,15,13,0.12)_100%)]"
      />
      <div className="site-container py-[54px] xl:py-[60px]">
        <p className="text-sm leading-5 font-medium tracking-[0.08em] uppercase">
          {MENU_PAGE_CONTENT.eyebrow}
        </p>
        <p
          id="menus-hero-heading"
          className={cn(
            ebGaramond.className,
            "whitespace-pre-line text-[46px] leading-[44px] tracking-[-0.6px] xl:mt-4 xl:text-[62px] xl:leading-[60px]",
          )}
        >
          {MENU_PAGE_CONTENT.heading}
        </p>
        <span
          aria-hidden="true"
          className="mt-5 block h-px w-[58px] bg-peploe-burgundy"
        />
        <p className="mt-3 max-w-[440px] text-base leading-[23px] xl:text-lg xl:leading-6">
          {MENU_PAGE_CONTENT.description}
        </p>
      </div>
    </section>
  );
}
