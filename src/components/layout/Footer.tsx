import Link from "next/link";

import { Container } from "@/components/ui/Section";
import { navigation, routes, teacher } from "@/config/teacher";
import type { ContactLinks } from "@/lib/cms/public";

export function Footer({ contact }: { contact: ContactLinks }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-2">
      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight text-ink">{teacher.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-clay-strong">
            {teacher.descriptor}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Denizli&apos;de 1-12. sınıf öğrencileri için, öğrencinin seviyesine ve öğrenme hızına göre
            şekillenen birebir matematik desteği. LGS, TYT ve AYT hazırlığı dahil.
          </p>
        </div>

        <nav aria-label="Alt menü">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Sayfalar</p>
          <ul className="mt-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                {item.href.includes("#") ? (
                  <a
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-clay-strong"
                  >
                    <span className="link-underline">{item.label}</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-clay-strong"
                  >
                    <span className="link-underline">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">İletişim</p>
          <ul className="mt-3 text-sm">
            {contact.whatsappUrl ? (
              <li>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-clay-strong"
                >
                  <span className="link-underline">WhatsApp&apos;tan yazın</span>
                </a>
              </li>
            ) : null}
            {contact.phoneHref && contact.phoneDisplay ? (
              <li>
                <a
                  href={contact.phoneHref}
                  className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-clay-strong"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
            ) : null}
            {contact.emailHref && contact.emailDisplay ? (
              <li>
                <a
                  href={contact.emailHref}
                  className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-clay-strong"
                >
                  {contact.emailDisplay}
                </a>
              </li>
            ) : null}
            {contact.instagramUrl ? (
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center text-muted transition-colors hover:text-clay-strong"
                >
                  <span className="link-underline">
                    Instagram {contact.instagramHandle}
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
          <Link
            href={routes.contact}
            className="group mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-clay-strong transition-colors hover:text-ink"
          >
            <span className="link-underline">Çocuğunuz için görüşelim</span>
          </Link>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {teacher.name}
          </p>
          <p>{teacher.role}</p>
        </Container>
      </div>
    </footer>
  );
}
