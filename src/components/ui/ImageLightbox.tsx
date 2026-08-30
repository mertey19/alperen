"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { skipImageOptimize } from "@/lib/cms/media";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
};

export function ImageLightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: readonly LightboxItem[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [touch, setTouch] = useState<number | null>(null);
  const many = items.length > 1;

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
        if (many) {
          if (delta > 56) onStep(-1);
          else if (delta < -56) onStep(1);
        }
        setTouch(null);
      }}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[100dvh] w-full max-w-[1400px] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex w-full items-center justify-between gap-3 text-paper">
          <p id={titleId} className="min-w-0 truncate font-display text-lg">
            {item.title || item.alt}
          </p>
          {many ? (
            <p className="shrink-0 text-sm text-paper/70">
              {index + 1} / {items.length}
            </p>
          ) : null}
        </div>

        <div className="relative h-[min(92dvh,1200px)] w-full max-w-[min(96vw,1400px)] overflow-hidden rounded-card bg-ink">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            quality={90}
            sizes="96vw"
            unoptimized={skipImageOptimize(item.src)}
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          {many ? (
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Önceki görsel"
              className="flex size-12 items-center justify-center rounded-full border border-paper/25 text-paper transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay"
            >
              <Chevron dir="left" />
            </button>
          ) : null}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 items-center rounded-full border border-paper/25 px-5 text-sm font-semibold text-paper transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay"
          >
            Kapat
          </button>
          {many ? (
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Sonraki görsel"
              className="flex size-12 items-center justify-center rounded-full border border-paper/25 text-paper transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay"
            >
              <Chevron dir="right" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ExpandIcon() {
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
