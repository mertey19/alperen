"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { ExpandIcon, ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { skipImageOptimize } from "@/lib/cms/media";

export type LgsPicture = LightboxItem;

/**
 * LGS liste görselleri: sayfada büyük durur; masaüstünde üzerine gelince büyür,
 * tıklanınca (telefonda dokununca) galeriyle aynı lightbox açılır.
 */
export function LgsZoomableImages({
  pictures,
  variant = "list",
  visibleCount,
}: {
  pictures: readonly LgsPicture[];
  variant?: "list" | "hub";
  visibleCount?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shown = visibleCount != null ? pictures.slice(0, visibleCount) : pictures;

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback((index: number) => setOpenIndex(index), []);
  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current == null) return current;
        return (current + delta + pictures.length) % pictures.length;
      });
    },
    [pictures.length],
  );

  if (shown.length === 0) return null;

  const stacked = variant === "list" || shown.length === 1;

  return (
    <div>
      <ul className={stacked ? "grid gap-px bg-line" : "grid gap-px bg-line sm:grid-cols-2"}>
        {shown.map((picture, index) => (
          <li key={`${picture.src}-${index}`}>
            <ZoomTile
              picture={picture}
              variant={variant}
              roundTop={variant === "hub" || index === 0}
              onOpen={() => show(index)}
            />
          </li>
        ))}
      </ul>
      <p className="border-t border-line bg-paper-2 px-4 py-2.5 text-sm leading-relaxed text-muted">
        <span className="lgs-zoom-hint-hover">Üzerine gelince büyür · </span>
        <span className="lgs-zoom-hint-touch">Büyütmek için dokunun · </span>
        tıklayınca tam ekran
        {pictures.length > 1 ? ` · ${pictures.length} görsel` : null}
      </p>

      {openIndex != null ? (
        <ImageLightbox items={pictures} index={openIndex} onClose={close} onStep={step} />
      ) : null}
    </div>
  );
}

function ZoomTile({
  picture,
  variant,
  roundTop,
  onOpen,
}: {
  picture: LgsPicture;
  variant: "list" | "hub";
  roundTop: boolean;
  onOpen: () => void;
}) {
  const [ratio, setRatio] = useState<number | null>(null);
  const label = picture.alt || picture.title || "Liste görseli";
  const scaleClass =
    variant === "hub"
      ? "[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.55]"
      : "[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.22]";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${label} görselini büyüt`}
      className="group relative z-0 block w-full overflow-visible bg-paper-2 text-left hover:z-[60] focus-visible:z-[60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-strong"
    >
      <span
        className={`lgs-zoom-frame relative block w-full overflow-hidden bg-paper-2 shadow-[0_18px_40px_-32px_rgba(27,35,48,0.55)] motion-reduce:transform-none ${variant === "hub" ? "origin-center" : "origin-top"} ${roundTop ? "rounded-t-card" : ""} ${scaleClass} motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-[0_28px_56px_-24px_rgba(27,35,48,0.55)]`}
        style={
          ratio
            ? { aspectRatio: `${ratio}` }
            : {
                aspectRatio: "1 / 1",
                minHeight: variant === "hub" ? "16rem" : undefined,
              }
        }
      >
        <Image
          src={picture.src}
          alt={picture.alt}
          fill
          quality={90}
          sizes={
            variant === "hub"
              ? "(min-width: 640px) 50vw, 100vw"
              : "(min-width: 1024px) 1100px, 100vw"
          }
          unoptimized={skipImageOptimize(picture.src)}
          className="object-contain object-top"
          onLoad={(event) => {
            const img = event.currentTarget;
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
              setRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
        <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full border border-paper/25 bg-ink/50 text-paper opacity-90 transition group-hover:bg-ink/75">
          <ExpandIcon />
        </span>
      </span>
    </button>
  );
}
