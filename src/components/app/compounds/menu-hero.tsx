import Image from "next/image";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { IMenuHeroProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MenuHero({ content }: IMenuHeroProps) {
  return (
    <section
      className={cn(
        dmSans.className,
        "relative isolate flex min-h-[428px] items-end overflow-hidden bg-ink text-warm-cream xl:min-h-[390px] xl:items-center",
      )}
      aria-labelledby="menus-hero-heading"
    >
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-center xl:object-[50%_59.24%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(24,20,19,0)_0%,rgba(24,20,19,0.2)_28%,rgba(24,20,19,0.82)_100%)] xl:bg-[linear-gradient(90deg,rgba(24,20,19,0.98)_0%,rgba(24,20,19,0.8)_34.055%,rgba(24,20,19,0.18)_76.727%,rgba(24,20,19,0)_98.368%)]"
      />
      <div
        data-scroll-reveal
        className="site-container py-[54px] max-sm:relative max-sm:pb-8 xl:pt-[68px] xl:pb-[52px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 top-7 bottom-0 -z-10 bg-[linear-gradient(180deg,rgba(24,20,19,0)_0px,rgba(24,20,19,0.82)_32px,rgba(24,20,19,0.82)_100%)] sm:hidden"
        />
        <div className="max-w-[720px]">
          <p className="text-sm leading-5 font-medium tracking-[0.08em] uppercase">
            {content.eyebrow}
          </p>
          <p
            id="menus-hero-heading"
            className={cn(
              ebGaramond.className,
              "mt-2 whitespace-pre-line text-[36px] sm:text-[46px] leading-[44px] tracking-[-0.6px] xl:text-[62px] xl:leading-[0.96] xl:tracking-[-1.5px]",
            )}
          >
            {content.heading}
          </p>
          <span
            aria-hidden="true"
            className="mt-5 block max-sm:mt-2 xl:mt-4 h-px w-[58px] bg-peploe-burgundy"
          />
          <p className="mt-3 max-sm:mt-2 xl:mt-4 text-base leading-[23px] xl:text-lg xl:leading-[1.35]">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
