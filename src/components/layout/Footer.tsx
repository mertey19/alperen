import Link from "next/link";

import { FactText } from "@/components/ui/Fact";
import { Container } from "@/components/ui/Section";
import { navigation, routes, teacher } from "@/config/teacher";
import { emailHref, instagramHandle, instagramUrl, phoneHref, whatsappUrl } from "@/lib/contact";

export function Footer() {
  const wa = whatsappUrl();
  const tel = phoneHref();
  const mail = emailHref();
  const instagram = instagramUrl();
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
            Denizli&apos;de 1-8. sınıf öğrencileri için, öğrencinin seviyesine ve öğrenme hızına göre
            şekillenen birebir matematik desteği.
          </p>
        </div>

        <nav aria-label="Alt menü">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Sayfalar</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-clay-strong">
                  <span className="link-underline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">İletişim</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition hover:text-clay-strong"
                >
                  WhatsApp&apos;tan yazın
                </a>
              ) : (
                <FactText fact={teacher.contact.whatsapp} />
              )}
            </li>
            <li>
              {tel ? (
                <a href={tel} className="text-muted transition hover:text-clay-strong">
                  {teacher.contact.phone.status === "confirmed" ? teacher.contact.phone.value : null}
                </a>
              ) : (
                <FactText fact={teacher.contact.phone} />
              )}
            </li>
            <li>
              {mail ? (
                <a href={mail} className="text-muted transition hover:text-clay-strong">
                  {teacher.contact.email.status === "confirmed" ? teacher.contact.email.value : null}
                </a>
              ) : (
                <FactText fact={teacher.contact.email} />
              )}
            </li>
            {instagram ? (
              <li>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-clay-strong"
                >
                  <span className="link-underline">Instagram {instagramHandle()}</span>
                </a>
              </li>
            ) : null}
          </ul>
          <Link
            href={routes.contact}
            className="group mt-5 inline-flex text-sm font-semibold text-clay-strong transition-colors hover:text-ink"
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
