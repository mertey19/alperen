import Image from "next/image";

import { photoBriefs } from "@/config/authoring-notes";
import type { PhotoSlot } from "@/config/teacher";

/**
 * Gerçek fotoğraf slotu.
 *
 * Dosya yoksa **üretimde hiçbir şey render edilmez** — ziyaretçi ne boş bir
 * çerçeve ne de çekim talimatı görür. Geliştirmede, hangi karenin beklendiğini
 * hatırlatan bir kutu çıkar. Stok görsel ya da yapay üretim portre kullanılmaz.
 */
const SHOW_DEV_HINTS = process.env.NODE_ENV !== "production";

const aspectClass: Record<PhotoSlot["aspect"], string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
};

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
    if (!SHOW_DEV_HINTS) return null;
    return (
      <div
        className={`relative ${shape} ${className} overflow-hidden rounded-card border border-dashed border-line bg-paper-2`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <span className="pending-chip self-start">
            <span aria-hidden="true">✎</span>
            FOTOĞRAF EKLENECEK
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">{photoBriefs[slot.id]}</p>
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

/** Bir slotun gerçek dosyası var mı? Düzenin fotoğrafa göre değişmesi için. */
export function hasPhoto(slot: PhotoSlot): boolean {
  return slot.src !== null;
}
