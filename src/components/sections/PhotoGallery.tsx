"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { ExpandIcon, ImageLightbox } from "@/components/ui/ImageLightbox";
import { Container, SectionHeading } from "@/components/ui/Section";
import type { GalleryItem } from "@/content/gallery";
import { isImageSrc, skipImageOptimize } from "@/lib/cms/media";

/**
 * Görsel galeri — Gürbüz Gövrek sitesindeki gibi: ızgara, tıklayınca büyüme,
 * oklarla gezinme. Afişlerin üzerindeki yazı kırpılmasın diye her kare kendi
 * oranında durur; üzerine ikinci bir başlık bindirilmez.
 */
export function PhotoGallery({ items }: { items: readonly GalleryItem[] }) {
  const pictures = items.filter((item) => isImageSrc(item.src));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  if (pictures.length === 0) return null;

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
            {pictures.length} görsel · galeri içinde oklarla ilerleyebilirsiniz.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pictures.map((item, index) => (
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
        <ImageLightbox
          items={pictures.map((item) => ({ src: item.src, alt: item.alt, title: item.title }))}
          index={openIndex}
          onClose={close}
          onStep={step}
        />
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
          unoptimized={skipImageOptimize(item.src)}
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
