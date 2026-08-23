import type { ReactNode } from "react";

import { hintFor } from "@/config/authoring-notes";
import type { Fact } from "@/config/teacher";

/**
 * Doğrulanmamış bilgiyi ekrana basmanın tek kuralı: **üretimde asla**.
 *
 * Geliştirme sırasında eksik alan kesik çizgili bir rozet olarak görünür ki
 * gözden kaçmasın. Üretim derlemesinde aynı alan hiç render edilmez — ziyaretçi
 * ne "EKLENECEK" yazısı ne de boş bir kutu görür. Bu ayrım derleme zamanında
 * yapıldığı için placeholder metinleri üretim paketine hiç girmez.
 */
const SHOW_DEV_HINTS = process.env.NODE_ENV !== "production";

/** Yalnızca geliştirmede görünen "bu alan eksik" rozeti. */
export function PendingChip({ label }: { label: string }) {
  if (!SHOW_DEV_HINTS) return null;
  return (
    <span className="pending-chip" role="note">
      <span aria-hidden="true">✎</span>
      {label} EKLENECEK
    </span>
  );
}

/** Tek satırlık bilgi. Teyitli değilse üretimde hiçbir şey basılmaz. */
export function FactText({ fact, className }: { fact: Fact<string>; className?: string }) {
  if (fact.status === "pending") return <PendingChip label={fact.label} />;
  return <span className={className}>{fact.value}</span>;
}

/** Maddeli bilgi. Teyitli değilse üretimde hiçbir şey basılmaz. */
export function FactList({
  fact,
  className,
}: {
  fact: Fact<readonly string[]>;
  className?: string;
}) {
  if (fact.status === "pending") return <PendingChip label={fact.label} />;
  return (
    <ul className={className ?? "space-y-1.5"}>
      {fact.value.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Paragraf dizisi. */
export function FactParagraphs({
  fact,
  className,
}: {
  fact: Fact<readonly string[]>;
  className?: string;
}) {
  if (fact.status === "pending") {
    if (!SHOW_DEV_HINTS) return null;
    return (
      <div className="space-y-3">
        <PendingChip label={fact.label} />
        <p className="max-w-prose text-sm text-muted">{hintFor(fact.label)}</p>
      </div>
    );
  }
  return (
    <div className={className ?? "space-y-4"}>
      {fact.value.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * Bilgi teyitliyse çocuklarını basar, değilse **hiç render etmez**.
 * Eksik bir alan yüzünden başlığı olan ama içi boş bir blok kalmasını engeller.
 */
export function WhenConfirmed({
  fact,
  children,
}: {
  fact: Fact<unknown>;
  children: ReactNode;
}) {
  if (fact.status === "pending") {
    return SHOW_DEV_HINTS ? <PendingChip label={fact.label} /> : null;
  }
  return <>{children}</>;
}

/** Künye ızgarasındaki etiket + değer satırı. Değer yoksa satır hiç çıkmaz. */
export function FactRow({
  label,
  fact,
  children,
}: {
  label: string;
  fact: Fact<unknown>;
  children: ReactNode;
}) {
  if (fact.status === "pending" && !SHOW_DEV_HINTS) return null;

  return (
    <div className="border-t border-line py-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 text-ink">{children}</dd>
    </div>
  );
}
