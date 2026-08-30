import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { SITE_URL, lgsListPath, routes, teacher } from "@/config/teacher";
import { getContactLinks, getPublishedLgsLists } from "@/lib/cms/public";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "İstatistiklerle LGS",
  description:
    "LGS'ye dair resmi kaynaklı sayılar ve kısa okumalar. Buradaki rakamlar öğrenci sonuçları veya " +
    "başarı yüzdesi değil; kaynağı belirtilen kamuya açık verilerdir.",
  path: routes.lgs,
});

export default async function LgsStatsPage() {
  const [lists, contact] = await Promise.all([getPublishedLgsLists(), getContactLinks()]);
  const wa = contact.whatsappUrl;

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">LGS</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            İstatistiklerle LGS
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Liselere Geçiş Sistemi&apos;ne dair kamuya açık sayılar ve kısa okumalar. Rakamlar{" "}
            {teacher.informalName}&apos;nın öğrenci sonuçları değildir; her listede kaynağı
            yazılıdır.
          </p>
        </Container>
      </section>

      <Section>
        {lists.length === 0 ? (
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Henüz yayımlanmış liste yok. Resmi kaynaklı veriler eklendikçe bu sayfada görünür.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {lists.map((list, index) => (
              <Reveal as="li" key={list.id} index={index}>
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition duration-200 ease-out hover:border-clay/45 hover:shadow-[0_16px_34px_-28px_rgba(27,35,48,0.5)]">
                  <Link href={lgsListPath(list.slug)} className="flex h-full flex-col focus-visible:outline-none">
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay-strong">
                        {list.items.length} istatistik
                      </p>
                      <h2 className="mt-4 font-display text-2xl leading-snug text-ink">
                        <span className="link-underline">{list.title}</span>
                      </h2>
                      {list.description ? (
                        <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-muted">
                          {list.description}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-2xl leading-tight tracking-tight text-paper sm:text-3xl">
              LGS hazırlığını çocuğunuzun durumu üzerinden konuşmak isterseniz
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper-3/90">
              Sayılar genel resmi gösterir. Ders planı her zaman öğrencinin eksiğine göre kurulur.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Button href={wa ?? routes.contact} variant={wa ? "whatsapp" : "secondary"} withArrow>
              {teacher.informalName} ile Görüşün
            </Button>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd(routes.lgs)!} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "İstatistiklerle LGS",
          url: new URL(routes.lgs, SITE_URL).toString(),
          inLanguage: "tr-TR",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
    </>
  );
}
