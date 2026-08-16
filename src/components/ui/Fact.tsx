import type { Fact } from "@/config/teacher";

/**
 * Doğrulanmamış bilgi rozeti.
 *
 * Bu bileşen bilinçli olarak "güzel" değil. Bir alan doldurulmadan yayına
 * çıkarsa metnin içinde kaybolmasın, pazarlama cümlesine dönüşmesin diye
 * kesik çizgili ve vurgu renginde görünür.
 */
export function PendingChip({ label }: { label: string }) {
  return (
    <span className="pending-chip" role="note">
      <span aria-hidden="true">✎</span>
      {label} EKLENECEK
    </span>
  );
}

/** Tek satırlık bir bilgi: teyitliyse metin, değilse rozet. */
export function FactText({
  fact,
  className,
}: {
  fact: Fact<string>;
  className?: string;
}) {
  if (fact.status === "pending") {
    return <PendingChip label={fact.label} />;
  }
  return <span className={className}>{fact.value}</span>;
}

/** Maddeli bilgi: teyitliyse liste, değilse tek rozet. */
export function FactList({
  fact,
  className,
}: {
  fact: Fact<readonly string[]>;
  className?: string;
}) {
  if (fact.status === "pending") {
    return <PendingChip label={fact.label} />;
  }
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

/** Paragraf dizisi: Alperen'in kendi yazacağı metinler için. */
export function FactParagraphs({
  fact,
  className,
}: {
  fact: Fact<readonly string[]>;
  className?: string;
}) {
  if (fact.status === "pending") {
    return (
      <div className="space-y-3">
        <PendingChip label={fact.label} />
        <p className="max-w-prose text-sm text-muted">{fact.hint}</p>
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

/** Etiket + değer satırı. Hakkında sayfasındaki künye ızgarası için. */
export function FactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 text-ink">{children}</dd>
    </div>
  );
}
