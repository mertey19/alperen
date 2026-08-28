"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/ui/Section";
import { navigation, routes, teacher } from "@/config/teacher";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Navigasyon markası tipografiktir: logo yerine ismin kendisi.
 * Bir eğitim şirketi amblemi bilinçli olarak yoktur.
 */
function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href={routes.home} className="group flex flex-col leading-none">
      <span
        className={`font-display text-xl tracking-tight sm:text-2xl ${
          onDark ? "text-paper" : "text-ink"
        }`}
      >
        {teacher.name}
      </span>
      <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-clay-strong">
        {teacher.descriptor}
      </span>
    </Link>
  );
}

export function Header({ ctaHref }: { ctaHref: string }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  // Menü, bağlantıya basıldığı anda kapanır; efektle kapatmak gereksiz render doğuruyor.
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Ana menü" className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const className = `group relative py-1 text-sm transition-colors ${
              active ? "font-semibold text-ink" : "text-muted hover:text-clay-strong"
            }`;
            const label = (
              <>
                <span className={active ? undefined : "link-underline"}>{item.label}</span>
                {active ? (
                  <motion.span
                    aria-hidden="true"
                    layoutId={reduced ? undefined : "nav-active"}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-clay"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  />
                ) : null}
              </>
            );

            if (item.href.includes("#")) {
              return (
                <a key={item.href} href={item.href} className={className}>
                  {label}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href={ctaHref}
            {...(ctaHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2"
          >
            {teacher.informalName} ile Görüşün
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobil-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink xl:hidden"
        >
          <span className="sr-only">Menüyü {open ? "kapat" : "aç"}</span>
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition ${
                open ? "top-1/2 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition ${
                open ? "top-1/2 -rotate-45" : "bottom-0.5"
              }`}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div id="mobil-menu" className="border-t border-line bg-paper xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navigation.map((item) => {
              const className = `rounded-xl px-3 py-3 text-base ${
                pathname === item.href
                  ? "bg-paper-2 font-semibold text-ink"
                  : "text-muted hover:bg-paper-2 hover:text-ink"
              }`;

              if (item.href.includes("#")) {
                return (
                  <a key={item.href} href={item.href} onClick={closeMenu} className={className}>
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.href} href={item.href} onClick={closeMenu} className={className}>
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={ctaHref}
              onClick={closeMenu}
              {...(ctaHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
            >
              {teacher.informalName} ile Görüşün
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
