import { Reveal } from "@/components/motion/Reveal";

type Item = { readonly title: string; readonly body: string };

/**
 * Kartlar.
 *
 * 3D eğim ve imleç takibi kaldırıldı: hover'da yalnızca kenarlık ve gölge
 * değişiyor. Kart bir yere gitmiyor, sadece dokunulabilir olduğunu gösteriyor.
 */
const card =
  "h-full rounded-card border border-line transition duration-200 ease-out " +
  "hover:border-clay/45 hover:shadow-[0_16px_34px_-28px_rgba(27,35,48,0.5)]";

/** Numaralı yaklaşım kartları. */
export function PrincipleCards({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="article" key={item.title} index={index} className={`${card} bg-paper-2 p-7`}>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-paper font-display text-base text-clay-strong"
          >
            0{index + 1}
          </span>
          <h3 className="mt-5 font-display text-xl text-ink">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Seviye kartları: numara yok, başlık büyük. */
export function AudienceCards({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      {items.map((item, index) => (
        <Reveal as="article" key={item.title} index={index} className={`${card} bg-paper p-7 sm:p-8`}>
          <h3 className="font-display text-2xl text-ink">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}
