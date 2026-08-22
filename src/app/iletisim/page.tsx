import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { FactList, FactText, PendingChip } from "@/components/ui/Fact";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { emailHref, instagramHandle, instagramUrl, phoneHref, whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

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

/** Tek bir iletişim kanalı kartı. Bilgi yoksa bağlantı yerine rozet gösterilir. */
function ChannelCard({
  label,
  href,
  value,
  action,
  pendingLabel,
}: {
  label: string;
  href: string | null;
  value: string | null;
  action: string;
  pendingLabel: string;
}) {
  return (
    <article className="flex h-full flex-col justify-between rounded-card border border-line bg-paper p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="mt-3 font-display text-xl text-ink">{value ?? <PendingChip label={pendingLabel} />}</p>
      </div>
      {href ? (
        <a
          href={href}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2"
        >
          {action}
        </a>
      ) : (
        <p className="mt-6 text-sm text-muted">
          Bu kanal, bilgi eklendiğinde otomatik olarak aktifleşir.
        </p>
      )}
    </article>
  );
}

export default function ContactPage() {
  const wa = whatsappUrl();
  const tel = phoneHref();
  const mail = emailHref();
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

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal as="div" variant="settle" index={0} className="h-full">
            <ChannelCard
              label="WhatsApp"
              href={wa}
              value={wa ? "Mesaj gönderin" : null}
              action="WhatsApp'tan Ulaşın"
              pendingLabel="WHATSAPP NUMARASI"
            />
          </Reveal>
          <Reveal as="div" variant="settle" index={1} className="h-full">
            <ChannelCard
              label="Telefon"
              href={tel}
              value={teacher.contact.phone.status === "confirmed" ? teacher.contact.phone.value : null}
              action="Arayın"
              pendingLabel="TELEFON NUMARASI"
            />
          </Reveal>
          <Reveal as="div" variant="settle" index={2} className="h-full">
            <ChannelCard
              label="E-posta"
              href={mail}
              value={teacher.contact.email.status === "confirmed" ? teacher.contact.email.value : null}
              action="E-posta Gönderin"
              pendingLabel="E-POSTA ADRESİ"
            />
          </Reveal>
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

        <dl className="mt-12 grid gap-x-12 gap-y-2 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Görüşme saatleri
            </dt>
            <dd className="mt-2 text-ink">
              <FactText fact={teacher.contact.availability} />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Şehir</dt>
            <dd className="mt-2 text-ink">
              <FactText fact={teacher.location} />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Ders formatı
            </dt>
            <dd className="mt-2 text-ink">
              <FactList fact={teacher.lessonFormat} />
            </dd>
          </div>
        </dl>
      </Section>

      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Ön görüşme" title="Görüşmede neler konuşuyoruz?" />
            <ul className="mt-8 space-y-4">
              {talkingPoints.map((point, index) => (
                <Reveal as="li" key={point} variant="slide" index={index} className="flex gap-3 border-t border-line pt-4 text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{point}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-paper p-8">
            <h2 className="font-display text-2xl text-ink">Bu sitede form yok</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Bilgilerinizi bir forma girip yanıt beklemenize gerek yok. Yazdığınız mesaj doğrudan
              {" "}
              {teacher.informalName}&apos;ya ulaşır; site hiçbir kişisel veriyi kaydetmez, saklamaz
              veya üçüncü bir tarafa iletmez.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Mesajınızda çocuğunuzun sınıfını ve zorlandığı konuyu yazarsanız, ilk görüşme çok daha
              verimli geçer.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
