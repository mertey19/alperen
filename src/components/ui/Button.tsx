import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "quiet";

/**
 * Düğme.
 *
 * Sunucu bileşeni: mıknatıs etkisi ve yay fiziği kaldırıldığından JavaScript'e
 * ihtiyacı kalmadı. Geri bildirimin tamamı CSS geçişleriyle veriliyor —
 * arka plan, kenarlık, gölge ve basma durumu. Ok, metinden bağımsız kayıyor.
 */
const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm " +
  "font-semibold transition duration-150 ease-out active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper shadow-[0_8px_20px_-14px_rgba(27,35,48,0.9)] hover:bg-ink-2 " +
    "hover:shadow-[0_12px_26px_-16px_rgba(27,35,48,0.85)] focus-visible:outline-ink",
  secondary:
    "border border-line bg-paper text-ink hover:border-clay hover:text-clay-strong " +
    "focus-visible:outline-clay-strong",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_8px_20px_-14px_rgba(31,157,85,0.9)] hover:brightness-[1.06] " +
    "focus-visible:outline-whatsapp",
  quiet: "min-h-0 px-0 text-clay-strong hover:text-ink",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
    </svg>
  );
}

export function Button({
  href,
  variant = "primary",
  withArrow = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  /** Birincil çağrılarda yön duygusu veren ok. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  const content = (
    <>
      {variant === "quiet" ? <span className="link-underline">{children}</span> : children}
      {withArrow ? <Arrow /> : null}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
