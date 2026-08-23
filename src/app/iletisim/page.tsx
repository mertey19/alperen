import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { FactList, FactText, WhenConfirmed } from "@/components/ui/Fact";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { emailHref, instagramHandle, instagramUrl, phoneHref, whatsappUrl } from "@/lib/contact";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description:
    `${teacher.name} ile ilkokul ve ortaokul öğrencileri için birebir ders desteği hakkında ` +
    "görüşmek üzere iletişime geçin.",
  path: routes.contact,
});

const talkingPoints = [
  "Çocuğunuzun şu anda hangi konularda zorlandığı",
  "Okulda takip edilen program ve ders temposu",
  "Daha önce denenen çalışma yöntemleri ve sonuçları",
  "Sizin ve çocuğunuzun süreçten beklentisi",
] as const;

type Channel = {
  label: string;
  href: string;
  value: string;
  action: string;
  note?: string;
  icon: ReactNode;
  primary?: boolean;
};

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.1 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.2-.3.3-.5v-.5l-.8-2c-.2-.5-.4-.4-.6-.4z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

/**
 * İletişim kanalları.
 *
 * Yalnızca gerçek değeri olan kanal listeye girer — "bilgi eklenecek" durumunda
 * bir kart hiç oluşturulmaz. Sunucu tarafında hesaplandığı için eksik kanal
 * üretim HTML'ine de girmez.
 */
function buildChannels(): Channel[] {
  const channels: Channel[] = [];

  const wa = whatsappUrl();
  if (wa) {
    channels.push({
      label: "WhatsApp",
      href: wa,
      value: "Hazır mesajla yazın",
      action: `WhatsApp'tan ${teacher.informalName}'ya Yaz`,
      note: "Mesaj hazır gelir; göndermeden önce dilediğiniz gibi değiştirebilirsiniz.",
      icon: <WhatsAppIcon />,
      primary: true,
    });
  }

  const tel = phoneHref();
  const phone = teacher.contact.phone;
  if (tel && phone.status === "confirmed") {
    channels.push({
      label: "Telefon",
      href: tel,
      value: phone.value,
      action: "Telefon Et",
      icon: <PhoneIcon />,
    });
  }

  const mail = emailHref();
  const email = teacher.contact.email;
  if (mail && email.status === "confirmed") {
    channels.push({
      label: "E-posta",
      href: mail,
      value: email.value,
      action: "E-posta Gönder",
      icon: <MailIcon />,
    });
  }

  return channels;
}

export default function ContactPage() {
  const channels = buildChannels();
  const instagram = instagramUrl();

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">İletişim</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Çocuğunuz için görüşelim.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Ders sürecine karar vermeden önce kısa bir ön görüşme yapmak en doğrusu. Aşağıdaki
            kanallardan doğrudan {teacher.informalName}&apos;ya ulaşabilirsiniz.
          </p>
        </Container>
      </section>

      {channels.length > 0 ? (
        <Section>
          <div
            className={`grid gap-5 ${
              channels.length >= 3 ? "md:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {channels.map((channel, index) => (
              <Reveal as="div" key={channel.label} index={index} className="h-full">
                <article className="flex h-full flex-col justify-between rounded-card border border-line bg-paper p-7 transition duration-200 ease-out hover:border-clay/45">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      <span className="text-clay-strong">{channel.icon}</span>
                      {channel.label}
                    </p>
                    <p className="mt-3 font-display text-xl text-ink">{channel.value}</p>
                    {channel.note ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted">{channel.note}</p>
                    ) : null}
                  </div>
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 ${
                      channel.primary
                        ? "bg-whatsapp text-white hover:brightness-[1.06] focus-visible:outline-whatsapp"
                        : "bg-ink text-paper hover:bg-ink-2 focus-visible:outline-ink"
                    }`}
                  >
                    {channel.action}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          {instagram ? (
            <p className="mt-8 text-sm text-muted">
              Ayrıca Instagram&apos;dan da ulaşabilirsiniz:{" "}
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-clay-strong transition-colors hover:text-ink"
              >
                <span className="link-underline">{instagramHandle()}</span>
              </a>
            </p>
          ) : null}

          <dl className="mt-12 grid gap-x-12 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
            <WhenConfirmed fact={teacher.contact.availability}>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Görüşme saatleri
                </dt>
                <dd className="mt-2 text-ink">
                  <FactText fact={teacher.contact.availability} />
                </dd>
              </div>
            </WhenConfirmed>
            <WhenConfirmed fact={teacher.location}>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Şehir
                </dt>
                <dd className="mt-2 text-ink">
                  <FactText fact={teacher.location} />
                </dd>
              </div>
            </WhenConfirmed>
            <WhenConfirmed fact={teacher.lessonFormat}>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Ders formatı
                </dt>
                <dd className="mt-2 text-ink">
                  <FactList fact={teacher.lessonFormat} />
                </dd>
              </div>
            </WhenConfirmed>
          </dl>
        </Section>
      ) : null}

      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Ön görüşme" title="Görüşmede neler konuşuyoruz?" />
            <ul className="mt-8 space-y-4">
              {talkingPoints.map((point, index) => (
                <Reveal
                  as="li"
                  key={point}
                  variant="slide"
                  index={index}
                  className="flex gap-3 border-t border-line pt-4 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"
                  />
                  <span>{point}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-paper p-8">
            <h2 className="font-display text-2xl text-ink">Bu sitede form yok</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Bilgilerinizi bir forma girip yanıt beklemenize gerek yok. Yazdığınız mesaj seçtiğiniz
              kanaldan doğrudan {teacher.informalName}&apos;ya ulaşır; site hiçbir kişisel veriyi
              kaydetmez, saklamaz veya üçüncü bir tarafa iletmez.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              WhatsApp bağlantısı mesajı yalnızca hazırlar — göndermeden önce dilediğiniz gibi
              değiştirebilir, isterseniz hiç göndermeyebilirsiniz.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Mesajınızda çocuğunuzun sınıfını ve zorlandığı konuyu yazarsanız, ilk görüşme çok daha
              verimli geçer.
            </p>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd(routes.contact)!} />
    </>
  );
}
