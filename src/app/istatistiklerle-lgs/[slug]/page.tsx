import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { SITE_URL, lgsStatPath, routes, teacher } from "@/config/teacher";
import { getContactLinks, getPublishedLgsStat, getPublishedLgsStats } from "@/lib/cms/public";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

function bodyParagraphs(body: string): string[] {
  const blocks = body
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  return blocks.length > 0 ? blocks : [body.trim()].filter(Boolean);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedLgsStat(slug);
  if (!item) return {};

  return pageMetadata({
    title: item.title,
    description: item.body,
    path: lgsStatPath(item.slug),
  });
}

export default async function LgsStatPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = await getPublishedLgsStat(slug);
  if (!item) notFound();

  const [others, contact] = await Promise.all([getPublishedLgsStats(), getContactLinks()]);
  const related = others.filter((entry) => entry.slug !== item.slug).slice(0, 2);
  const wa = contact.whatsappUrl;
  const path = lgsStatPath(item.slug);

  return (
    <>
      <article>
        <section className="border-b border-line bg-paper">
          <Container className="py-14 sm:py-20">
            <Link
              href={routes.lgs}
              className="group inline-flex min-h-11 items-center text-sm font-semibold text-clay-strong transition-colors hover:text-ink"
            >
              <span className="link-underline">← Tüm istatistikler</span>
            </Link>

            {item.period ? (
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-clay-strong">
                {item.period}
              </p>
            ) : null}

            <p
              className={`font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl ${
                item.period ? "mt-4" : "mt-6"
              }`}
            >
              {item.figure}
            </p>

            <h1 className="mt-6 max-w-3xl font-display text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>
          </Container>
        </section>

        {item.image ? (
          <Container className="pt-10 sm:pt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-paper-2">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-contain"
              />
            </div>
          </Container>
        ) : null}

        <Section className="pt-10 sm:pt-14">
          <div className="max-w-2xl">
            {bodyParagraphs(item.body).map((paragraph) => (
              <p key={paragraph} className="mt-4 first:mt-0 text-lg leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
            <p className="mt-10 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              Kaynak: {item.source}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Bu rakam {teacher.informalName}&apos;nın öğrenci sonuçları değildir; yukarıdaki kamuya
              açık kaynaktan alınmıştır.
            </p>
          </div>
        </Section>
      </article>

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

      {related.length > 0 ? (
        <Section tone="paper-2">
          <h2 className="font-display text-2xl text-ink">Diğer istatistikler</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {related.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={lgsStatPath(entry.slug)}
                  className="group block h-full rounded-card border border-line bg-paper p-7 transition duration-200 ease-out hover:border-clay/45"
                >
                  {entry.period ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay-strong">
                      {entry.period}
                    </p>
                  ) : null}
                  <p className="mt-3 font-display text-3xl leading-none text-ink">{entry.figure}</p>
                  <h3 className="mt-3 font-display text-xl leading-snug text-ink">
                    <span className="link-underline">{entry.title}</span>
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: item.title,
          description: item.body,
          url: new URL(path, SITE_URL).toString(),
          inLanguage: "tr-TR",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(routes.lgs, { label: item.title, path })!} />
    </>
  );
}
