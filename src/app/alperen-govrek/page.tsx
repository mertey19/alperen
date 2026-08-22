import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FactList, FactParagraphs, FactRow, FactText } from "@/components/ui/Fact";
import { Photo } from "@/components/ui/Photo";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { principles } from "@/content/copy";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${teacher.name} Kimdir?`,
    description:
      `${teacher.name}'in eğitim yaklaşımı, çalışma biçimi ve Denizli'de 1-8. sınıf ` +
      "öğrencileriyle birebir matematik ders süreci hakkında bilgi.",
    path: routes.about,
  }),
  // Şablon eklenirse isim iki kez geçiyor; bu sayfada başlık olduğu gibi kullanılır.
  // İkinci parça `teacher.role`'dan gelir ki branş değişince başlık da değişsin.
  title: { absolute: `${teacher.name} Kimdir? | ${teacher.role}` },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Tanışalım</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {teacher.name}
            </h1>
            <p className="mt-6 max-w-xl border-l-2 border-clay pl-5 font-display text-2xl leading-snug text-clay-strong">
              Öğrenciyi anlamadan derse başlamamak.
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              Bir öğretmeni seçerken velinin bilmek istediği şey aslında sadedir: bu kişi kim, nasıl
              çalışıyor ve çocuğumla ne yapacak. Bu sayfa tam olarak bunu anlatmak için var.
            </p>
          </div>
          <Reveal as="figure" variant="settle">
            <Photo slot={teacher.photos.about} sizes="(min-width: 1024px) 520px, 100vw" />
          </Reveal>
        </Container>
      </section>

      {/* KENDİ SÖZLERİYLE */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading eyebrow="Kendi sözleriyle" title="Merhaba" />
          <div className="max-w-2xl text-lg leading-relaxed text-muted">
            <FactParagraphs fact={teacher.introduction} className="space-y-5" />
          </div>
        </div>
      </Section>

      {/* KÜNYE — teyit edilmemiş her alan açıkça rozet olarak görünür. */}
      <Section tone="paper-2">
        <SectionHeading
          eyebrow="Kısa künye"
          title="Bilgiler"
          description="Bu bölümdeki alanlar yalnızca doğrulandığında yazılır; hiçbiri tahmin edilmez."
        />
        <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
          <FactRow label="Eğitim">
            <FactList fact={teacher.education} />
          </FactRow>
          <FactRow label="Deneyim">
            <FactList fact={teacher.experience} />
          </FactRow>
          <FactRow label="Çalışılan seviyeler">
            <FactText fact={teacher.audience} />
          </FactRow>
          <FactRow label="Sınıf aralığı">
            <FactText fact={teacher.gradeRange} />
          </FactRow>
          <FactRow label="Dersler">
            <FactList fact={teacher.subjects} />
          </FactRow>
          <FactRow label="Ders formatı">
            <FactList fact={teacher.lessonFormat} />
          </FactRow>
          <FactRow label="Şehir">
            <FactText fact={teacher.location} />
          </FactRow>
          <FactRow label="Görüşme saatleri">
            <FactText fact={teacher.contact.availability} />
          </FactRow>
        </dl>
      </Section>

      {/* YAKLAŞIM ÖZETİ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Çalışma biçimi"
              title="Ders, öğrenciye göre kurulur"
              description="Birebir dersin tek gerçek avantajı budur; şablon uygulanacaksa birebir olmasının anlamı kalmaz."
            />
            <ul className="mt-8 space-y-6">
              {principles.map((item, index) => (
                <Reveal as="li" key={item.title} variant="slide" index={index} className="border-t border-line pt-5">
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={routes.approach} variant="secondary">
                Eğitim yaklaşımının tamamı
              </Button>
            </div>
          </div>
          <Reveal as="figure" variant="settle" delay={0.1}>
            <Photo slot={teacher.photos.detail} sizes="(min-width: 1024px) 360px, 100vw" />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
              Tanışma görüşmesi için yazabilirsiniz.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper-3/90">
              Çocuğunuzun ihtiyacını konuşmadan söylenebilecek pek bir şey yok. Önce bir görüşelim.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Button
              href={whatsappUrl() ?? routes.contact}
              variant={whatsappUrl() ? "whatsapp" : "secondary"}
              withArrow
            >
              {teacher.informalName} ile Görüşün
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
