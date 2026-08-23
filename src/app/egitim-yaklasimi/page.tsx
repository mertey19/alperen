import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { AudienceCards, PrincipleCards } from "@/components/sections/CardGrid";
import { Button } from "@/components/ui/Button";
import { FactList, WhenConfirmed } from "@/components/ui/Fact";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo, hasPhoto } from "@/components/ui/Photo";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { audienceCards, boundaries, principles, process, services } from "@/content/copy";
import { buildFaqs } from "@/lib/faq";
import { whatsappUrl } from "@/lib/contact";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Eğitim Yaklaşımı",
  description:
    "Konu anlatımı, soru çözümü ve düzenli öğrenme takibinin öğrencinin seviyesine göre nasıl " +
    "şekillendiği; ilkokul ve ortaokul öğrencileriyle birebir ders süreci.",
  path: routes.approach,
});


export default function ApproachPage() {
  const faqs = buildFaqs();

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">Eğitim yaklaşımı</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Her öğrenci farklı öğrenir.{" "}
            <span className="text-clay-strong">Ders süreci de buna göre şekillenmeli.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Bu sayfada birebir dersin nasıl kurulduğunu, ilk görüşmeden düzenli takibe kadar sürecin
            nasıl ilerlediğini ve neyin söz verilip neyin verilmediğini bulacaksınız.
          </p>
        </Container>
      </section>

      {/* İLKELER */}
      <Section>
        <SectionHeading eyebrow="Üç temel ilke" title="Dersin dayandığı yer" />
        <PrincipleCards items={principles} />
      </Section>

      {/* SÜREÇ */}
      <Section tone="ink">
        <SectionHeading
          onInk
          eyebrow="Süreç"
          title="Ön görüşmeden düzenli takibe"
          description="Hiçbir adım öğrenciyi tanımadan başlamaz."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2">
          {process.map((item, index) => (
            <Reveal as="li" key={item.step} variant="slide" index={index} className="border-t border-paper/20 pt-6">
              <p className="font-display text-sm text-sand">{item.step}</p>
              <h3 className="mt-2 font-display text-xl text-paper">{item.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-paper-3/90">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* DERSİN İÇERİĞİ */}
      <Section>
        <div
          className={`grid gap-12 ${
            hasPhoto(teacher.photos.detail)
              ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16"
              : ""
          }`}
        >
          <div>
            <SectionHeading eyebrow="Derste ne yapıyoruz" title="Üç parça birlikte yürür" />
            <div className="mt-8 space-y-6">
              {services.map((service) => (
                <div key={service.title} className="border-t border-line pt-5">
                  <h3 className="font-display text-xl text-ink">{service.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{service.body}</p>
                </div>
              ))}
            </div>
            <WhenConfirmed fact={teacher.subjects}>
              <div className="mt-8 rounded-card bg-paper-2 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Çalışılan dersler
                </p>
                <div className="mt-3 text-ink">
                  <FactList fact={teacher.subjects} />
                </div>
              </div>
            </WhenConfirmed>
          </div>
          {hasPhoto(teacher.photos.detail) ? (
            <Photo slot={teacher.photos.detail} sizes="(min-width: 1024px) 420px, 100vw" />
          ) : null}
        </div>
      </Section>

      {/* SEVİYELER */}
      <Section tone="paper-2">
        <SectionHeading eyebrow="İlkokul ve ortaokul" title="İki dönem, iki farklı ihtiyaç" />
        <AudienceCards items={audienceCards} />
      </Section>

      {/* SÖZ VERİLMEYENLER */}
      <Section>
        <SectionHeading
          eyebrow="Açık olalım"
          title="Neyin sözü verilmiyor?"
          description="Bir öğretmeni değerlendirirken verilmeyen sözler, verilenler kadar bilgilendiricidir."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {boundaries.map((item, index) => (
            <Reveal as="article" key={item.title} variant="rise" index={index} className="border-t-2 border-clay pt-5">
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SSS */}
      <Section tone="paper-2">
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
        <div className="mt-10">
          <Button
            href={whatsappUrl() ?? routes.contact}
            variant={whatsappUrl() ? "whatsapp" : "primary"}
            withArrow
          >
            Dersler Hakkında Bilgi Alın
          </Button>
        </div>
      </Section>

      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(routes.approach)!} />
    </>
  );
}
