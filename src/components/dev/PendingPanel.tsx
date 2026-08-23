import { hintFor, photoBriefs, type PhotoSlotId } from "@/config/authoring-notes";

/**
 * Geliştirme paneli.
 *
 * `npm run dev` sırasında sağ altta durur ve "Alperen'den hangi bilgiler
 * bekleniyor" sorusunu tek bakışta yanıtlar. Üretim derlemesinde hiç render
 * edilmez (bkz. app/layout.tsx).
 *
 * Bilinçli olarak **sunucu bileşeni**: açılıp kapanması `<details>` ile
 * yapıldığı için JavaScript gerekmiyor. Böylece iç notları taşıyan
 * `authoring-notes` modülü istemci paketine hiç girmiyor — panelin kendisi de
 * dahil. Daha önce istemci bileşeniydi ve çekim talimatları üretim JS
 * paketinde görünüyordu.
 */
export function PendingPanel({
  facts,
  photos,
  absent,
}: {
  facts: ReadonlyArray<{ path: string; label: string }>;
  photos: ReadonlyArray<{ id: PhotoSlotId }>;
  absent: ReadonlyArray<string>;
}) {
  const total = facts.length + photos.length;

  return (
    <details className="fixed bottom-4 right-4 z-[60] w-[min(26rem,calc(100vw-2rem))] print:hidden">
      <summary className="ml-auto inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-full border border-clay bg-clay-soft px-4 text-sm font-semibold text-clay-strong shadow-lg marker:content-['']">
        <span aria-hidden="true">✎</span>
        {total} bilgi bekleniyor
      </summary>

      <div className="mt-3 max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-paper p-5 shadow-2xl">
        <p className="font-display text-lg text-ink">Bekleyen bilgiler</p>
        <p className="mt-1 text-xs text-muted">
          Hepsi <code className="rounded bg-paper-2 px-1">src/config/teacher.ts</code> içinde.
          <br />
          <code className="rounded bg-paper-2 px-1">pending(...)</code> →{" "}
          <code className="rounded bg-paper-2 px-1">confirmed(&quot;...&quot;)</code>
        </p>

        <ul className="mt-4 space-y-3">
          {facts.map((fact) => (
            <li key={fact.path} className="rounded-xl bg-paper-2 p-3">
              <p className="font-mono text-[0.7rem] text-clay-strong">{fact.path}</p>
              <p className="mt-1 text-sm text-ink">{hintFor(fact.label)}</p>
            </li>
          ))}
        </ul>

        {photos.length > 0 ? (
          <>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              Bekleyen fotoğraflar
            </p>
            <ul className="mt-3 space-y-3">
              {photos.map((item) => (
                <li key={item.id} className="rounded-xl bg-paper-2 p-3">
                  <p className="font-mono text-[0.7rem] text-clay-strong">photos.{item.id}</p>
                  <p className="mt-1 text-sm text-ink">{photoBriefs[item.id]}</p>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
          Bilinçli olarak yok
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {absent.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
