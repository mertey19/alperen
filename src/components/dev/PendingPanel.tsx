"use client";

import { useState } from "react";

/**
 * Geliştirme paneli.
 *
 * `npm run dev` sırasında sağ altta durur ve "Alperen'den hangi bilgiler
 * bekleniyor" sorusunu tek bakışta yanıtlar. Üretim derlemesinde hiç render
 * edilmez (bkz. app/layout.tsx).
 */
export function PendingPanel({
  facts,
  photos,
  absent,
}: {
  facts: ReadonlyArray<{ path: string; label: string; hint: string }>;
  photos: ReadonlyArray<{ key: string; brief: string }>;
  absent: ReadonlyArray<string>;
}) {
  const [open, setOpen] = useState(false);
  const total = facts.length + photos.length;

  return (
    <div className="fixed bottom-4 right-4 z-[60] print:hidden">
      {open ? (
        <div className="mb-3 max-h-[70vh] w-[min(26rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-paper p-5 shadow-2xl">
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
                <p className="mt-1 text-sm text-ink">{fact.hint}</p>
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
                  <li key={item.key} className="rounded-xl bg-paper-2 p-3">
                    <p className="font-mono text-[0.7rem] text-clay-strong">photos.{item.key}</p>
                    <p className="mt-1 text-sm text-ink">{item.brief}</p>
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
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-clay bg-clay-soft px-4 text-sm font-semibold text-clay-strong shadow-lg"
      >
        <span aria-hidden="true">✎</span>
        {open ? "Paneli kapat" : `${total} bilgi bekleniyor`}
      </button>
    </div>
  );
}
