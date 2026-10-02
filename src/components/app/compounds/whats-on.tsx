import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { WHATS_ON_CONTENT } from "@/lib/constants/whats-on";
import { dmSans, ebGaramond } from "@/lib/fonts";
import type {
  IEventActionProps,
  IEventCardProps,
  IWhatsOnProps,
} from "@/lib/types";
import { cn } from "@/lib/utils";

function EventAction({ label }: IEventActionProps) {
  return (
    <Button
      type="button"
      variant="brand-text"
      aria-disabled="true"
      className="h-11 w-fit justify-start gap-2 rounded-none px-0 has-[>svg]:px-0 text-base leading-6 font-medium text-warm-cream uppercase"
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Button>
  );
}

function EventCard({ event, featured = false }: IEventCardProps) {
  return (
    <article
      className={cn(
        "min-w-0",
        featured
          ? "flex flex-col gap-4"
          : "relative grid grid-cols-1 items-start gap-4 not-first:pt-6 not-first:before:absolute not-first:before:inset-x-0 not-first:before:top-0 not-first:before:h-px not-first:before:bg-warm-cream/30 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured
            ? "aspect-635/260 rounded-[2px] sm:aspect-635/172"
            : "aspect-5/4 rounded-[1px] sm:h-40",
        )}
      >
        <Image
          src={event.imageSrc}
          alt={event.imageAlt}
          fill
          sizes={
            featured
              ? "(min-width: 1280px) calc((100vw - 192px) * 635 / 1248), calc(100vw - 48px)"
              : "(min-width: 640px) 240px, calc((100vw - 48px) * 1.2)"
          }
          className={cn("object-cover", featured && "object-[center_60%]")}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-xs leading-4 font-medium tracking-[0.1em] uppercase">
          {event.category}
        </p>
        <h3
          className={cn(
            ebGaramond.className,
            featured
              ? "text-4xl leading-[42px] font-normal sm:text-[42px] sm:leading-[48px]"
              : "text-2xl leading-[30px] font-medium",
          )}
        >
          {event.title}
        </h3>
        <p
          className={cn(
            "text-soft-stone",
            featured ? "text-base leading-6" : "text-sm leading-[21px]",
          )}
        >
          {event.description}
        </p>
        <EventAction label={event.ctaLabel} />
      </div>
    </article>
  );
}

export function WhatsOn({ events }: IWhatsOnProps) {
  const [featuredEvent, ...otherEvents] = events;

  if (!featuredEvent) return null;

  return (
    <section
      id="whats-on"
      aria-labelledby="whats-on-heading"
      className={cn(
        dmSans.className,
        "bg-button-primary-pressed text-warm-cream",
      )}
    >
      <div className="site-container flex flex-col gap-10 py-14 sm:gap-12 sm:py-20">
        <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-end xl:justify-between xl:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-7">
              <p className="flex items-center gap-2 text-xs leading-4 font-medium tracking-[0.1em] uppercase">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                {WHATS_ON_CONTENT.eyebrow}
              </p>
              <h2
                id="whats-on-heading"
                className={cn(
                  ebGaramond.className,
                  "text-5xl leading-[54px] font-medium sm:text-[60px] sm:leading-[66px]",
                )}
              >
                {WHATS_ON_CONTENT.heading}
              </h2>
            </div>
            <p className="text-lg leading-6">{WHATS_ON_CONTENT.description}</p>
          </div>
          <EventAction label={WHATS_ON_CONTENT.ctaLabel} />
        </div>

        <div className="grid items-start gap-10 sm:gap-12 xl:grid-cols-[minmax(0,635fr)_minmax(0,613fr)]">
          <EventCard event={featuredEvent} featured />
          {otherEvents.length > 0 && (
            <div className="flex min-w-0 flex-col gap-6">
              {otherEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
