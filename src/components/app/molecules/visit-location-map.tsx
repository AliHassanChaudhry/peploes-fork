"use client";

import { LocateFixed } from "lucide-react";
import type { Map as MapboxMap } from "mapbox-gl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  VISIT_CONTACT_CONTENT,
  VISIT_MAP,
} from "@/lib/constants/visit-contact";
import { env } from "@/lib/env";

export function VisitLocationMap() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const copy = VISIT_CONTACT_CONTENT.location.map;
  const token = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    const element = container.current;
    if (!token || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setNearViewport(true);
      },
      { rootMargin: VISIT_MAP.loadAheadMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || !token || !container.current) return;
    let disposed = false;
    let failedToLoad = false;
    let loaded = false;
    let map: MapboxMap | undefined;
    const element = container.current;

    function fail() {
      if (disposed) return;
      failedToLoad = true;
      clearTimeout(timeout);
      setFailed(true);
      map?.remove();
      map = undefined;
      mapRef.current = null;
    }

    const timeout = setTimeout(fail, VISIT_MAP.loadTimeoutMs);

    async function initialize() {
      try {
        const mapbox = (await import("mapbox-gl")).default;
        if (disposed || failedToLoad) return;
        if (!mapbox.supported()) {
          fail();
          return;
        }
        map = new mapbox.Map({
          container: element,
          accessToken: token,
          style: env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
          center: [...VISIT_MAP.center],
          zoom: VISIT_MAP.zoom,
          minZoom: VISIT_MAP.minZoom,
          maxZoom: VISIT_MAP.maxZoom,
          scrollZoom: false,
          cooperativeGestures: true,
          attributionControl: true,
        });
        mapRef.current = map;
        map.addControl(new mapbox.NavigationControl({ showCompass: false }));
        map.addControl(
          new mapbox.FullscreenControl({
            container: element.parentElement ?? element,
          }),
        );
        map.once("load", () => {
          if (disposed || !map) return;
          customizeDefaultStyle(map);
          const marker = document.createElement("button");
          marker.type = "button";
          // Mapbox otherwise exposes custom markers as images.
          marker.setAttribute("role", "button");
          marker.className =
            "w-[34px] h-11 bg-peploe-burgundy [clip-path:polygon(50%_100%,4%_40%,0_25%,8%_10%,25%_0,75%_0,92%_10%,100%_25%,96%_40%)] cursor-pointer after:content-[''] after:absolute after:top-2 after:left-2.5 after:size-3.5 after:rounded-[50%] after:bg-warm-cream focus-visible:bg-ink";
          marker.setAttribute(
            "aria-label",
            VISIT_CONTACT_CONTENT.location.map.markerLabel,
          );
          const address = document.createElement("p");
          address.className =
            "whitespace-pre-line m-0 pt-5 pr-13 pb-5 pl-5 text-ink font-[family-name:inherit] text-[length:15px] leading-6";
          address.textContent = VISIT_CONTACT_CONTENT.contact.address;
          const close = document.createElement("button");
          close.type = "button";
          close.className =
            "absolute top-1 right-1 grid place-items-center size-11 border-0 rounded-[4px] bg-transparent text-peploe-burgundy text-[length:24px] cursor-pointer transition-[background-color] duration-(--duration-base) ease-(--ease-organic) hover:bg-soft-stone focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-peploe-burgundy focus-visible:-outline-offset-4 motion-reduce:transition-none";
          close.setAttribute(
            "aria-label",
            VISIT_CONTACT_CONTENT.location.map.popupCloseLabel,
          );
          close.textContent = "×";
          const content = document.createElement("div");
          content.append(address, close);
          const popup = new mapbox.Popup({
            anchor: "top",
            offset: 4,
            className:
              "font-[family-name:inherit] animate-[visit-map-popup-open_var(--duration-base)_var(--ease-organic)_both] drop-shadow-[0_8px_18px_rgb(45_35_30/14%)] [&_.mapboxgl-popup-content]:p-0! [&_.mapboxgl-popup-content]:bg-warm-cream! [&_.mapboxgl-popup-content]:rounded-[8px]! [&_.mapboxgl-popup-content]:shadow-none! [&.mapboxgl-popup-anchor-top_.mapboxgl-popup-tip]:border-b-warm-cream! [&.mapboxgl-popup-anchor-top_.mapboxgl-popup-tip]:border-8! [&.mapboxgl-popup-anchor-top_.mapboxgl-popup-tip]:border-t-0! [&.visit-map-popup-closing]:pointer-events-none [&.visit-map-popup-closing]:animate-[visit-map-popup-close_var(--duration-base)_var(--ease-organic)_both] [&.visit-map-popup-closing_.mapboxgl-popup-content]:pointer-events-none! motion-reduce:[animation-duration:1ms]!",
            closeButton: false,
            closeOnClick: false,
            maxWidth: "260px",
          })
            .setLngLat([...VISIT_MAP.center])
            .setDOMContent(content);
          marker.setAttribute("aria-expanded", "false");
          function closePopup() {
            if (!popup.isOpen()) return;
            marker.setAttribute("aria-expanded", "false");
            marker.focus({ preventScroll: true });
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              popup.remove();
            } else {
              popup.getElement()?.classList.add("visit-map-popup-closing");
            }
          }
          marker.addEventListener("click", (event) => {
            event.stopPropagation();
            if (marker.getAttribute("aria-expanded") === "true") {
              closePopup();
              return;
            }
            if (!map) return;
            popup.addTo(map);
            const popupElement = popup.getElement();
            if (!popupElement) return;
            popupElement.classList.remove("visit-map-popup-closing");
            popupElement.onanimationend = (event) => {
              if (
                event.target === popupElement &&
                popupElement.classList.contains("visit-map-popup-closing")
              ) {
                popup.remove();
              }
            };
            marker.setAttribute("aria-expanded", "true");
          });
          close.addEventListener("click", closePopup);
          content.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              closePopup();
            }
          });
          marker.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closePopup();
          });
          map.on("click", closePopup);
          new mapbox.Marker({ element: marker, anchor: "bottom" })
            .setLngLat([...VISIT_MAP.center])
            .addTo(map);
          clearTimeout(timeout);
          loaded = true;
          setReady(true);
        });
        map.on("error", () => {
          if (!loaded) fail();
        });
      } catch {
        fail();
      }
    }

    void initialize();
    return () => {
      disposed = true;
      clearTimeout(timeout);
      map?.remove();
      mapRef.current = null;
    };
  }, [nearViewport]);

  return (
    <>
      <style>
        {
          "@keyframes visit-map-popup-open{from{opacity:0}to{opacity:1}}@keyframes visit-map-popup-close{from{opacity:1}to{opacity:0}}"
        }
      </style>
      <div
        className={`${"relative block aspect-auto h-60 border-[0.2px] border-solid border-soft-stone shadow-[0_4px_18px_5px_color-mix(in_srgb,var(--ink)_6%,transparent)] sm:aspect-[760/333] sm:h-auto sm:shadow-[0_4px_18px_3px_color-mix(in_srgb,var(--ink)_6%,transparent)]"} ${"[&:fullscreen]:w-full [&:fullscreen]:h-full [&:fullscreen]:aspect-auto"}`}
        aria-busy={nearViewport && !ready && !failed}
      >
        <section
          ref={container}
          className={"absolute! inset-0"}
          aria-label={copy.label}
          aria-hidden={!ready}
        />
        {!ready ? (
          <Image
            src={copy.src}
            alt={copy.alt}
            fill
            sizes="(min-width: 1584px) 844px, (min-width: 1024px) 53vw, calc(100vw - 48px)"
            className={"object-cover"}
          />
        ) : null}
        {!token || failed ? (
          <p
            className={
              "absolute z-1 bg-warm-cream text-peploe-burgundy rounded-[2px] py-2 px-3 text-[length:13px] bottom-7 left-3 right-3"
            }
            role="status"
          >
            {copy.unavailable}
          </p>
        ) : null}
        {ready ? (
          <Button
            variant="plain"
            type="button"
            className={
              "absolute z-1 bg-warm-cream text-peploe-burgundy rounded-[2px] py-2 px-3 text-[length:13px] top-3 right-13 min-w-11 min-h-11 grid place-items-center cursor-pointer"
            }
            aria-label={copy.recenterLabel}
            onClick={() =>
              mapRef.current?.flyTo({
                center: [...VISIT_MAP.center],
                zoom: VISIT_MAP.zoom,
                essential: false,
              })
            }
          >
            <LocateFixed size={18} aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </>
  );
}

function customizeDefaultStyle(map: MapboxMap) {
  // Keep a supplied Studio style intact; brand only the default light style.
  if (env.NEXT_PUBLIC_MAPBOX_STYLE_URL !== "mapbox://styles/mapbox/light-v11")
    return;
  for (const layer of map.getStyle().layers) {
    if (layer.type === "background") {
      map.setPaintProperty(layer.id, "background-color", VISIT_MAP.colors.land);
    } else if (
      layer.type === "fill" &&
      /water|park|landuse|landcover/.test(layer.id)
    ) {
      const color = layer.id.includes("water")
        ? VISIT_MAP.colors.water
        : VISIT_MAP.colors.park;
      map.setPaintProperty(layer.id, "fill-color", color);
    }
  }
}
