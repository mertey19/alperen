"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { gallery, type GalleryItem } from "@/content/gallery";

/**
 * Görsel galeri — Gürbüz Gövrek sitesindeki gibi: ızgara, tıklayınca büyüme,
 * oklarla gezinme. Afişlerin üzerindeki yazı kırpılmasın diye her kare kendi
 * oranında durur; üzerine ikinci bir başlık bindirilmez.
 */
export function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback((index: number) => setOpenIndex(index), []);
  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current == null) return current;
      return (current + delta + gallery.length) % gallery.length;
    });
  }, []);

  return (
    <section id="galeri" className="scroll-mt-24 bg-paper-2 py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Görsel galeri"
            title="Çalışma biçiminden kareler"
            description="Özel ders, öğrenci koçluğu ve aileyle kurulan yol. Bir görseli büyütmek için üzerine tıklayın."
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted lg:text-right">
            {gallery.length} görsel · galeri içinde oklarla ilerleyebilirsiniz.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <Reveal
              key={item.src}
              as="div"
              index={Math.min(index, 8)}
              className={item.featured ? "sm:col-span-2" : undefined}
            >
              <GalleryTile item={item} onOpen={() => show(index)} />
            </Reveal>
          ))}
        </div>
      </Container>

      {openIndex != null ? (
        <Lightbox index={openIndex} onClose={close} onStep={step} />
      ) : null}
    </section>
  );
}

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const shape = item.aspect === "landscape" ? "aspect-[16/9]" : "aspect-square";

  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${item.title} görselini büyüt`}
        className={`group relative ${shape} w-full overflow-hidden rounded-card bg-ink text-left shadow-[0_18px_40px_-32px_rgba(27,35,48,0.55)] transition duration-200 hover:shadow-[0_22px_44px_-28px_rgba(27,35,48,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-strong`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          quality={85}
          sizes={
            item.featured
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-contain"
        />
        <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full border border-paper/25 bg-ink/50 text-paper opacity-90 transition group-hover:bg-ink/75">
          <ExpandIcon />
        </span>
      </button>
      <figcaption className="mt-3 px-0.5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-clay-strong">
          {item.category}
        </p>
        <p className="mt-1 font-display text-lg text-ink">{item.title}</p>
      </figcaption>
    </figure>
  );
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const item = gallery[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [touch, setTouch] = useState<number | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onStep(-1);
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "Tab" && panelRef.current) {
        const nodes = [...panelRef.current.querySelectorAll<HTMLElement>("button")];
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      restoreRef.current?.focus();
    };
  }, [onClose, onStep]);

  if (!item) return null;

  const box =
    item.aspect === "square"
      ? "aspect-square w-[min(90vw,85vh,920px)]"
      : "aspect-[16/9] w-[min(92vw,1120px)]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(event) => setTouch(event.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touch == null) return;
        const end = event.changedTouches[0]?.clientX;
        if (end == null) return;
        const delta = end - touch;
        if (delta > 56) onStep(-1);
        else if (delta < -56) onStep(1);
        setTouch(null);
      }}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[100dvh] w-full max-w-[1120px] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex w-full items-center justify-between gap-3 text-paper">
          <p id={titleId} className="min-w-0 truncate font-display text-lg">
            {item.title}
          </p>
          <p className="shrink-0 text-sm text-paper/70">
            {index + 1} / {gallery.length}
          </p>
        </div>

        <div className={`relative ${box} max-h-[min(82vh,900px)] overflow-hidden rounded-card bg-ink`}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            quality={90}
            sizes="92vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Önceki görsel"
            className="flex size-12 items-center justify-center rounded-full border border-paper/25 text-paper transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay"
          >
            <Chevron dir="left" />
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 items-center rounded-full border border-paper/25 px-5 text-sm font-semibold text-paper transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay"
          >
            Kapat
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Sonraki görsel"
            className="flex size-12 items-center justify-center rounded-full border border-paper/25 text-paper transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 15 6 6" />
      <path d="m15 9 6-6" />
      <path d="M21 16v5h-5" />
      <path d="M21 8V3h-5" />
      <path d="M3 16v5h5" />
      <path d="m3 21 6-6" />
      <path d="M3 8V3h5" />
      <path d="M9 9 3 3" />
    </svg>
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
