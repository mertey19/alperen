import type { Metadata } from "next";
import Link from "next/link";

import { LessonDirectory } from "@/components/sections/LessonDirectory";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { lessonPath, routes, teacher } from "@/config/teacher";
import { getContactLinks } from "@/lib/cms/public";
import { breadcrumbJsonLd, lessonServiceJsonLd, pageMetadata } from "@/lib/seo";

const title = "Matematik Özel Ders: Sınıflar ve Çalışma Rehberleri";
const description = "Denizli'de ilkokul ve ortaokul matematik özel ders, 1–8. sınıf rehberleri, online ders, konu anlatımı ve ücret bilgisi. Alperen Gövrek ile görüşün.";
export const metadata: Metadata = pageMetadata({ title, description, path: routes.lessons });

export default async function LessonsPage() {
  const contact = await getContactLinks();
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <p className="eyebrow">Denizli · Birebir matematik dersi</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            Matematik desteğini öğrencinin ihtiyacından başlayarak seçin
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            {teacher.name}, Denizli&apos;de 1–12. sınıf öğrencileriyle birebir matematik çalışıyor.
            Bu bölümde ilkokul ve ortaokul için sınıfınıza uygun rehberleri; konu anlatımı,
            soru çözümü, online ders ve ücret bilgisine ilişkin açıklamaları bulabilirsiniz.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Bir rehber, öğrenci görülmeden hazırlanmış kesin bir ders programı değildir.
            Çalışma planı okulda işlenen konular, öğrencinin kendi çözümleri ve ayırabildiği
            zaman üzerinden konuşulur. Lise, TYT ve AYT desteği için de iletişime geçebilirsiniz.
          </p>
        </Container>
      </section>

      <Section tone="paper-2">
        <SectionHeading title="Hangi alanda destek arıyorsunuz?" description="Önce çalışma alanını veya sınıfı seçin; örnekleri ve görüşmede konuşulabilecek soruları inceleyin." />
        <LessonDirectory />
      </Section>

      <Section>
        <SectionHeading title="Denizli’de yüz yüze matematik özel ders" />
        <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-muted">
          <p>
            Birebir dersin başlangıcında konu eksiği, soruyu anlama ve çözüm adımları birlikte
            değerlendirilir. İlk görüşmede öğrencinin sınıfını, hedefini ve örnek çözümlerini
            paylaşabilirsiniz. Yüz yüze dersin konumu, saatleri ve ücreti önceden netleştirilir.
          </p>
          <p>
            Denizli&apos;nin ilçeleri için hazırlanan bloglar, farklı çalışma ihtiyaçlarını ele
            alır. İlçenizde sabit bir ders noktası olduğu varsayılmadan uygun düzen görüşülür.
            Şehir dışından online ders planı da öğrencinin katılım koşullarına göre değerlendirilir.
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-clay-strong">
          <Link href={routes.blog} className="inline-flex min-h-11 items-center underline underline-offset-4">Denizli’nin 19 ilçesi için matematik rehberleri</Link>
          <Link href={lessonPath("online")} className="inline-flex min-h-11 items-center underline underline-offset-4">Online birebir matematik dersi</Link>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading onInk title="Sınıfınızı ve çalışma hedefinizi konuşalım" description="Matematik öğretmeni seçerken dersin içeriğini, takip biçimini ve güncel ücretini birlikte netleştirebilirsiniz." />
        <div className="mt-7">
          <Button href={contact.whatsappUrl ?? routes.contact} variant={contact.whatsappUrl ? "whatsapp" : "secondary"} withArrow>{teacher.informalName} ile Görüşün</Button>
        </div>
      </Section>
      <JsonLd data={breadcrumbJsonLd(routes.lessons)!} />
      <JsonLd data={lessonServiceJsonLd({ title, description, path: routes.lessons })} />
    </>
  );
}
