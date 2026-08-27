"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { bannerSlides } from "@/content/gallery";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Yatay tanıtım afişleri.
 *
 * Gürbüz Gövrek sitesindeki gibi tam genişlikli bir görsel şerit; otomatik
 * dönmez (sitenin hareket dili sürekli animasyonu yasaklar). Oklar ve
 * noktalarla ziyaretçi kendi ilerler.
 */
export function BannerSlider() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [touch, setTouch] = useState<number | null>(null);

  const count = bannerSlides.length;
  const slide = bannerSlides[index];

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  if (!slide) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Tanıtım afişleri"
      className="relative isolate overflow-hidden bg-ink"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
      }}
      onTouchStart={(event) => setTouch(event.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touch == null) return;
        const end = event.changedTouches[0]?.clientX;
        if (end == null) return;
        const delta = end - touch;
        if (delta > 48) go(index - 1);
        else if (delta < -48) go(index + 1);
        setTouch(null);
      }}
    >
      <div className="relative h-[min(56.25vw,72vh,680px)] w-full">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority
          quality={88}
          sizes="100vw"
          className={`object-contain ${reduced ? "" : "banner-fade"}`}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {index + 1} / {count}: {slide.title}
      </p>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Önceki afiş"
        className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-ink/55 text-paper backdrop-blur-sm transition hover:bg-ink/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay sm:left-5"
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Sonraki afiş"
        className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-ink/55 text-paper backdrop-blur-sm transition hover:bg-ink/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay sm:right-5"
      >
        <Chevron dir="right" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 sm:bottom-5">
        {bannerSlides.map((item, i) => (
          <button
            key={item.src}
            type="button"
            aria-label={`${item.title} afişine geç`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-[width,background-color] duration-200 ${
              i === index ? "w-7 bg-clay" : "w-2 bg-paper/45 hover:bg-paper/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === "left" ? <path d="M15 5 8 12l7 7" /> : <path d="m9 5 7 7-7 7" />}
    </svg>
  );
}
