import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { AudienceCards } from "@/components/sections/CardGrid";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { Testimonials } from "@/components/sections/Testimonials";
import { Button } from "@/components/ui/Button";
import { FactList, FactText, WhenConfirmed } from "@/components/ui/Fact";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { audienceCards, boundaries, hero, principles, process, services } from "@/content/copy";
import { whatsappUrl } from "@/lib/contact";
import { buildFaqs } from "@/lib/faq";
import { faqJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  const wa = whatsappUrl();
  const primaryCta = wa ?? routes.contact;
  const faqs = buildFaqs();

  /** Portre yoksa hero tek sütuna düşer; boş bir kutu bırakılmaz. */
  const heroHasPortrait = hasPhoto(teacher.photos.hero);
  const aboutHasPhoto = hasPhoto(teacher.photos.about);

  return (
    <>
      {/* HERO — ziyaretçi beş saniyede kimin sitesinde olduğunu anlamalı. */}
      <section className="border-b border-line bg-paper">
        <Container
          className={`grid gap-12 py-16 sm:py-24 ${
            heroHasPortrait ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16" : ""
          }`}
        >
          <div className={heroHasPortrait ? undefined : "max-w-3xl"}>
            <p className="eyebrow">{hero.eyebrow}</p>

            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {teacher.name}
            </h1>

            <p className="mt-7 max-w-xl border-l-2 border-clay pl-5 font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">
              {hero.headline}
              <br />
              <span className="text-clay-strong">{hero.headlineAccent}</span>
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={primaryCta} variant={wa ? "whatsapp" : "primary"} withArrow>
                {teacher.informalName} ile Görüşün
              </Button>
              <Button href={routes.approach} variant="secondary">
                Eğitim Yaklaşımını İnceleyin
              </Button>
            </div>

            {/* Künye şeridi. Teyitli olmayan alan üretimde hiç render edilmez. */}
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Seviye
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  <FactText fact={teacher.gradeRange} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Ders
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  <FactList fact={teacher.subjects} className="space-y-1" />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Şehir
                </dt>
                <dd className="mt-1.5 text-sm text-ink">
                  <FactText fact={teacher.location} />
                </dd>
              </div>
            </dl>
          </div>

          {heroHasPortrait ? (
            <figure className="relative">
              <Photo
                slot={teacher.photos.hero}
                priority
                sizes="(min-width: 1024px) 400px, 100vw"
                className="shadow-[0_24px_60px_-40px_rgba(27,35,48,0.5)]"
              />
              <figcaption className="mt-4 text-sm text-muted">
                {teacher.name} · {teacher.role}
              </figcaption>
            </figure>
          ) : null}
        </Container>
      </section>

      {/* KİM İÇİN */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Kimlerle çalışıyorum"
          title="İlkokuldan liseye"
          description="Üç dönem, üç farklı ihtiyaç. Ders süreci de buna göre kuruluyor."
        />
        <AudienceCards items={audienceCards} />
        <WhenConfirmed fact={teacher.gradeRange}>
          <p className="mt-6 text-sm text-muted">
            Desteklenen sınıf aralığı: <FactText fact={teacher.gradeRange} />
          </p>
        </WhenConfirmed>
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
              <Reveal
                as="li"
                key={item.title}
                variant="slide"
                index={index}
                className="border-t border-paper/20 pt-6"
              >
                <p className="font-display text-sm text-sand">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl text-paper">{item.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-paper-3/90">{item.body}</p>
              </Reveal>
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
          {services.map((service, index) => (
            <Reveal
              as="article"
              key={service.title}
              index={index}
              className="rounded-card bg-paper-2 p-7"
            >
              <h3 className="font-display text-xl text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SÜREÇ */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Nasıl ilerliyoruz"
          title="Görüşmeden düzenli takibe"
          description="Dört adım; her biri bir öncekinin üstüne biniyor."
        />
        <LearningJourney steps={process} />
      </Section>

      {/* ALPEREN'İ TANIYIN */}
      <Section>
        <div
          className={`grid items-center gap-10 ${
            aboutHasPhoto ? "lg:grid-cols-[0.85fr_1.15fr] lg:gap-16" : ""
          }`}
        >
          {aboutHasPhoto ? (
            <Reveal as="figure">
              <Photo slot={teacher.photos.about} sizes="(min-width: 1024px) 420px, 100vw" />
            </Reveal>
          ) : null}
          <div className={aboutHasPhoto ? undefined : "max-w-2xl"}>
            <p className="eyebrow">Tanışalım</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              {teacher.name}&apos;i tanıyın
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Çocuğunuzu bir kuruma değil, kim olduğunu ve nasıl çalıştığını bilerek bir öğretmene
              emanet etmelisiniz. Alperen&apos;in çalışma biçimi ve ders süreci hakkındaki her şey
              ayrı bir sayfada.
            </p>
            <dl className="mt-6 space-y-3 text-sm text-muted">
              <WhenConfirmed fact={teacher.lessonFormat}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <dt className="font-semibold text-ink">Ders formatı:</dt>
                  <dd>
                    <FactList fact={teacher.lessonFormat} className="space-y-1" />
                  </dd>
                </div>
              </WhenConfirmed>
              <WhenConfirmed fact={teacher.location}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <dt className="font-semibold text-ink">Şehir:</dt>
                  <dd>
                    <FactText fact={teacher.location} />
                  </dd>
                </div>
              </WhenConfirmed>
            </dl>
            <div className="mt-8">
              <Button href={routes.about} variant="secondary">
                Hakkında sayfasına gidin
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* GERÇEKÇİ VE ŞEFFAF */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Açık olalım"
          title="Gerçekçi ve şeffaf bir eğitim yaklaşımı"
          description="Bir öğretmeni değerlendirirken verilmeyen sözler, verilenler kadar bilgilendiricidir."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {boundaries.map((item, index) => (
            <Reveal
              as="article"
              key={item.title}
              index={index}
              className="border-t-2 border-clay pt-5"
            >
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* VELİ VE ÖĞRENCİ GÖRÜŞLERİ — gerçek görüş yoksa hiç render edilmez */}
      <Testimonials />

      {/* SSS */}
      <Section>
        <SectionHeading eyebrow="Sık sorulanlar" title="Velilerin ilk sorduğu sorular" />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-6 font-display text-lg text-ink marker:content-['']">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-clay transition-transform duration-200 ease-out group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pt-3 leading-relaxed text-muted">{faq.answer}</p>
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
          <div className="flex flex-wrap items-center gap-5 lg:justify-end">
            <Button href={primaryCta} variant={wa ? "whatsapp" : "secondary"} withArrow>
              {wa ? "WhatsApp'tan Ulaşın" : "İletişim Bilgileri"}
            </Button>
            <Link
              href={routes.contact}
              className="group inline-flex min-h-12 items-center text-sm font-semibold text-sand transition-colors hover:text-paper"
            >
              <span className="link-underline">Tüm iletişim kanalları</span>
            </Link>
          </div>
        </div>
      </Section>

      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
