import Image from "next/image";

import type { PhotoSlot } from "@/config/teacher";

const aspectClass: Record<PhotoSlot["aspect"], string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
};

/**
 * Fotoğraf slotu.
 *
 * Dosya gelene kadar stok görsel kullanılmaz — çekim brief'ini gösteren sade bir
 * yer tutucu basılır. `teacher.photos.*.src` doldurulduğu anda gerçek fotoğrafa
 * geçer; başka hiçbir dosyada değişiklik gerekmez.
 */
export function Photo({
  slot,
  priority = false,
  sizes = "(min-width: 1024px) 480px, 100vw",
  className = "",
}: {
  slot: PhotoSlot;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const shape = aspectClass[slot.aspect];

  if (!slot.src) {
    return (
      <div
        className={`relative ${shape} ${className} overflow-hidden rounded-card border border-dashed border-line bg-paper-2`}
      >
        {/* Kâğıt hissi veren ince ızgara; fotoğraf gelince tamamen kaybolur. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(221,211,196,.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(221,211,196,.55) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-6">
          <span className="pending-chip self-start">
            <span aria-hidden="true">✎</span>
            FOTOĞRAF EKLENECEK
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">{slot.brief}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${shape} ${className} overflow-hidden rounded-card bg-paper-2`}>
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
