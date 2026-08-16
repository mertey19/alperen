import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { FactList, FactText } from "@/components/ui/Fact";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { audienceCards, faqs, hero, principles, process, services } from "@/content/copy";
import { whatsappUrl } from "@/lib/contact";
import { faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  const primaryCta = whatsappUrl() ?? routes.contact;

  return (
    <>
      {/* HERO — ziyaretçi beş saniyede kimin sitesinde olduğunu anlamalı. */}
      <section className="relative overflow-hidden bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-clay-soft/50 blur-3xl"
        />
        <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>

            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {teacher.name}
            </h1>

            <div className="mt-7 max-w-xl border-l-2 border-clay pl-5">
              <p className="font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">
                {hero.headline}
                <br />
                <span className="text-clay-strong">{hero.headlineAccent}</span>
              </p>
            </div>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={primaryCta} variant={whatsappUrl() ? "whatsapp" : "primary"}>
                {teacher.informalName} ile Görüşün
              </Button>
              <Button href={routes.approach} variant="secondary">
                Eğitim Yaklaşımını İnceleyin
              </Button>
            </div>

            {/* Künye şeridi: teyitli bilgi metin, teyitsiz bilgi rozet olarak çıkar. */}
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Seviye
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  <FactText fact={teacher.audience} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Dersler
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  <FactList fact={teacher.subjects} className="space-y-1" />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Ders formatı
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  <FactList fact={teacher.lessonFormat} className="space-y-1" />
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <Photo
              slot={teacher.photos.hero}
              priority
              sizes="(min-width: 1024px) 460px, 100vw"
              className="shadow-[0_24px_60px_-30px_rgba(27,35,48,0.45)]"
            />
            <p className="mt-4 text-center font-display text-sm text-muted lg:text-left">
              {teacher.name} · {teacher.role}
            </p>
          </div>
        </Container>
      </section>

      {/* KİM İÇİN */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Kimlerle çalışıyorum"
          title="İlkokul ve ortaokul öğrencileri"
          description="İki dönem, iki farklı ihtiyaç. Ders süreci de buna göre kuruluyor."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {audienceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-card border border-line bg-paper p-7 sm:p-8"
            >
              <h3 className="font-display text-2xl text-ink">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{card.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Desteklenen sınıf aralığı: <FactText fact={teacher.gradeRange} />
        </p>
      </Section>

      {/* EĞİTİM YAKLAŞIMI */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            onInk
            eyebrow="Eğitim yaklaşımı"
            title="Öğrenciyi anlamadan derse başlamamak."
            description="Birebir dersin asıl değeri, dersin öğrenciye göre kurulabilmesidir."
          />
          <ol className="space-y-8">
            {principles.map((item, index) => (
              <li key={item.title} className="border-t border-paper/20 pt-6">
                <p className="font-display text-sm text-sand">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl text-paper">{item.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-paper-3/90">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12">
          <Button href={routes.approach} variant="secondary">
            Yaklaşımın tamamını okuyun
          </Button>
        </div>
      </Section>

      {/* DERSTE NE OLUYOR */}
      <Section>
        <SectionHeading
          eyebrow="Derste ne oluyor"
          title="Konu anlatımı, soru çözümü ve düzenli takip"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-card bg-paper-2 p-7">
              <h3 className="font-display text-xl text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* SÜREÇ */}
      <Section tone="paper-2">
        <SectionHeading eyebrow="Nasıl ilerliyoruz" title="Görüşmeden düzenli takibe" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <li key={item.step} className="rounded-card border border-line bg-paper p-6">
              <span className="font-display text-3xl text-clay-soft">{item.step}</span>
              <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ALPEREN'İ TANIYIN */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Photo slot={teacher.photos.about} sizes="(min-width: 1024px) 420px, 100vw" />
          <div>
            <p className="eyebrow">Tanışalım</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              {teacher.name}&apos;i tanıyın
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Çocuğunuzu bir kuruma değil, kim olduğunu ve nasıl çalıştığını bilerek bir öğretmene
              emanet etmelisiniz. Alperen&apos;in eğitim geçmişi, deneyimi ve çalışma biçimi
              hakkındaki her şey ayrı bir sayfada.
            </p>
            <dl className="mt-6 space-y-3 text-sm text-muted">
              <div className="flex flex-wrap items-baseline gap-2">
                <dt className="font-semibold text-ink">Eğitim:</dt>
                <dd>
                  <FactList fact={teacher.education} className="space-y-1" />
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <dt className="font-semibold text-ink">Şehir:</dt>
                <dd>
                  <FactText fact={teacher.location} />
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <Button href={routes.about} variant="secondary">
                Hakkında sayfasına gidin
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* SSS */}
      <Section tone="paper-2">
        <SectionHeading eyebrow="Sık sorulanlar" title="Velilerin ilk sorduğu sorular" />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-6 font-display text-lg text-ink marker:content-['']">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-clay transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* İLETİŞİM ÇAĞRISI */}
      <Section tone="ink">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow-on-ink">İletişim</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
              Çocuğunuz için önce bir konuşalım.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper-3/90">
              Karar vermeden önce çocuğunuzun neye ihtiyacı olduğunu birlikte konuşmak en doğrusu.
              Kısa bir ön görüşme için yazmanız yeterli.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={primaryCta} variant={whatsappUrl() ? "whatsapp" : "secondary"}>
              {whatsappUrl() ? "WhatsApp'tan Ulaşın" : "İletişim Bilgileri"}
            </Button>
            <Link
              href={routes.contact}
              className="inline-flex min-h-12 items-center text-sm font-semibold text-sand underline underline-offset-4 hover:text-paper"
            >
              Dersler hakkında bilgi alın
            </Link>
          </div>
        </div>
      </Section>

      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
