"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/lib/cms/actions";
import { teacher } from "@/config/teacher";

const links = [
  { href: "/admin", label: "Özet" },
  { href: "/admin/blog", label: "Yazılar" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/yorumlar", label: "Yorumlar" },
  { href: "/admin/sss", label: "SSS" },
  { href: "/admin/kunye", label: "Künye" },
  { href: "/admin/iletisim", label: "İletişim" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-line bg-paper lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-6 px-5 py-6 lg:sticky lg:top-0 lg:px-6 lg:py-8">
        <div>
          <p className="font-display text-xl tracking-tight text-ink">Yönetim</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-clay-strong">
            {teacher.name}
          </p>
        </div>
        <nav aria-label="Yönetim menüsü" className="flex flex-wrap gap-1 lg:flex-col">
          {links.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm transition ${
                  active ? "bg-paper-2 font-semibold text-ink" : "text-muted hover:bg-paper-2 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/" className="font-semibold text-clay-strong hover:text-ink">
            Siteye dön
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-muted hover:text-ink">
              Çıkış
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
