import Link from "next/link";

type Variant = "primary" | "secondary" | "whatsapp" | "quiet";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2 focus-visible:outline-ink",
  secondary:
    "border border-line bg-paper text-ink hover:border-clay hover:text-clay-strong focus-visible:outline-clay-strong",
  whatsapp: "bg-whatsapp text-white hover:brightness-95 focus-visible:outline-whatsapp",
  quiet: "text-clay-strong underline underline-offset-4 hover:text-ink px-0 min-h-0",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
