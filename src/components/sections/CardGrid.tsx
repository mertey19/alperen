"use client";

import { TiltCard, TiltLayer } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";

type Item = { readonly title: string; readonly body: string };

/**
 * Numaralı yaklaşım kartları.
 *
 * Kart imlece yaklaşık 2,5 derece tepki verir; numara rozeti karttan bağımsız,
 * biraz daha fazla kayar. Metin hiçbir aşamada eğilip okunmaz hale gelmez.
 */
export function PrincipleCards({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="div" key={item.title} variant="settle" index={index}>
          <TiltCard className="h-full rounded-card border border-line bg-paper-2 p-7">
            <TiltLayer depth={1.6} className="w-fit">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper font-display text-lg text-clay-strong shadow-[0_10px_20px_-14px_rgba(27,35,48,0.7)]">
                0{index + 1}
              </span>
            </TiltLayer>
            <h2 className="mt-5 font-display text-xl text-ink">{item.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

/** Seviye kartları: numara yok, başlık büyük. Aynı eğim davranışı. */
export function AudienceCards({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      {items.map((item, index) => (
        <Reveal as="div" key={item.title} variant="settle" index={index}>
          <TiltCard className="h-full rounded-card border border-line bg-paper p-7 sm:p-8">
            <TiltLayer depth={1.2} className="w-fit">
              <h3 className="font-display text-2xl text-ink">{item.title}</h3>
            </TiltLayer>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
