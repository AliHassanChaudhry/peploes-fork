import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { TableBookingLoader } from "@/components/app/compounds/table-booking-loader";
import { TableBookingNotice } from "@/components/app/compounds/table-booking-panel";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { TABLE_BOOK_PAGE_CONTENT } from "@/lib/constants/table-book-page";
import { TABLE_BOOKING_CONTENT } from "@/lib/constants/table-booking";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type { ITableBookPageProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TableBookPage({ booking }: ITableBookPageProps) {
  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "book-page text-ink bg-warm-cream bg-none [body:has(&.book-page)]:[overflow-anchor:none] [&&_:is(h1,_h2)]:font-[family-name:var(--font-eb-garamond),_serif] [&&_:is(h1,_h2)]:font-normal",
      )}
    >
      <style>
        {
          "@keyframes peploes-booking-open{from{opacity:0}to{opacity:1}}@keyframes peploes-booking-skeleton-pulse{0%,100%{opacity:.45}50%{opacity:.9}}"
        }
      </style>
      <section
        className={
          "book-hero relative flex flex-col-reverse lg:block lg:h-76.5"
        }
        aria-labelledby="table-book-title"
      >
        <div
          className={
            "book-heroImage w-[min(100%,_560px)] aspect-[704/337] mt-5 mr-auto mb-0 ml-auto lg:absolute lg:top-0 lg:right-[3.125%] lg:w-[48.888889%] lg:h-[337px] lg:mt-0 lg:mr-0 lg:mb-0 lg:ml-0 lg:aspect-[auto] xl:right-[max(45px,_calc((100%_-_var(--site-content-max-width))_/_2_-_27px))] xl:max-w-176"
          }
        >
          <Image
            {...TABLE_BOOK_PAGE_CONTENT.hero.image}
            width={4094}
            height={1971}
            preload
            sizes="(min-width: 1024px) 49vw, (min-width: 640px) 560px, 100vw"
            className={"book-heroPhoto block w-full h-full object-cover"}
          />
        </div>
        <div
          data-scroll-reveal
          className={cn(
            "site-container",
            "book-heroCopy pt-10 [&&_h1]:mt-2 [&&_h1]:text-[length:clamp(42px,_11vw,_56px)] lg:relative lg:pt-18 lg:[&&_h1]:text-[length:76px] lg:max-xl:[&&_h1]:text-[length:64px] [&&_h1]:leading-[1] lg:[&&_h1]:leading-16.5 lg:max-xl:[&&_h1]:leading-15.5",
          )}
        >
          <p
            className={
              "book-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:flex-[none] [&&::before]:bg-current [&&::before]:bg-none leading-4"
            }
          >
            {TABLE_BOOK_PAGE_CONTENT.hero.eyebrow}
          </p>
          <h1 id="table-book-title">{TABLE_BOOK_PAGE_CONTENT.hero.heading}</h1>
          <p
            className={
              "book-introduction max-w-152.5 mt-6 text-text-secondary text-[length:16px] lg:text-[length:20px] lg:max-xl:max-w-[48%] lg:max-xl:text-[length:18px] leading-6 lg:leading-7 lg:max-xl:leading-6.5"
            }
          >
            {TABLE_BOOK_PAGE_CONTENT.hero.description}
          </p>
        </div>
      </section>
      <div
        className={
          "book-bookingContainer relative z-1 ml-auto mr-auto pb-10 sm:max-lg:w-[calc(100%_-_48px)] sm:max-lg:max-w-160 lg:w-[calc(100%_-_48px)] lg:max-w-[var(--site-content-max-width)] lg:pb-[59px] xl:w-[calc(100%_-_144px)]"
        }
      >
        <Suspense
          fallback={
            <TableBookingNotice
              message={TABLE_BOOKING_CONTENT.loadingMessage}
              loading
            />
          }
        >
          <TableBookingSection booking={booking} />
        </Suspense>
      </div>
      <section
        className={
          "book-groups bg-[color-mix(in_srgb,_var(--peploe-burgundy)_6%,_var(--warm-cream))] bg-none lg:grid lg:grid-cols-[37.926667%_minmax(0,_1fr)]"
        }
        aria-labelledby="booking-groups-title"
      >
        <div
          className={
            "book-groupImage relative aspect-[546.144/344] overflow-hidden lg:min-h-86 lg:aspect-[auto]"
          }
        >
          <Image
            {...TABLE_BOOK_PAGE_CONTENT.groups.image}
            width={1440}
            height={1920}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className={
              "book-groupPhoto absolute top-0 right-0 bottom-0 left-0 block w-full h-full object-cover object-[center_68.37%]"
            }
          />
        </div>
        <div
          data-scroll-reveal
          className={
            "book-groupCopy pt-10 pr-6 pb-10 pl-6 [&&_h2]:mt-2 [&&_h2]:text-[length:36px] lg:flex lg:flex-col lg:justify-center lg:pt-12 lg:pr-18 lg:pb-12 lg:pl-12 lg:[&&_h2]:mt-2 lg:[&&_h2]:text-[length:42px] lg:max-xl:pl-8 lg:max-xl:pr-6 max-sm:[&&_h2]:text-[length:30px] [&&_h2]:leading-10 lg:[&&_h2]:leading-11"
          }
        >
          <p
            className={
              "book-eyebrow flex items-center gap-2.5 text-peploe-burgundy text-[length:14px] font-medium tracking-[0.1em] uppercase [&&::before]:content-[''] [&&::before]:w-12 [&&::before]:h-0.5 [&&::before]:flex-[none] [&&::before]:bg-current [&&::before]:bg-none leading-4"
            }
          >
            {TABLE_BOOK_PAGE_CONTENT.groups.eyebrow}
          </p>
          <h2 id="booking-groups-title">
            {TABLE_BOOK_PAGE_CONTENT.groups.heading}
          </h2>
          <p
            className={
              "book-groupDescription mt-3 font-[family-name:var(--font-eb-garamond),_serif] text-text-secondary text-[length:20px] lg:min-h-18 lg:mt-4 max-sm:text-[length:16px] leading-6"
            }
          >
            {TABLE_BOOK_PAGE_CONTENT.groups.description}
          </p>
          <Button
            asChild
            variant="brand-contact"
            className={
              "book-groupAction [&&]:w-[237px] [&&]:min-h-11 [&&]:h-11 [&&]:max-w-full [&&]:mt-7 [&&]:pt-[9px] [&&]:pr-5 [&&]:pb-[9px] [&&]:pl-5 [&&]:gap-2 [&&]:border-peploe-burgundy [&&]:rounded-[4px] [&&]:text-[length:16px] [&&]:whitespace-nowrap [&&:focus-visible]:outline-2 [&&:focus-visible]:outline-solid [&&:focus-visible]:outline-peploe-burgundy [&&:focus-visible]:outline-offset-4 [&&]:leading-6"
            }
          >
            <Link href={ROUTES.PRIVATE_DINING}>
              {TABLE_BOOK_PAGE_CONTENT.groups.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

async function TableBookingSection({ booking }: ITableBookPageProps) {
  const result = await booking;
  return <TableBookingLoader result={result} />;
}
