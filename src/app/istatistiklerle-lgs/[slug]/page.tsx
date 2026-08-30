import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { SITE_URL, lgsListPath, routes, teacher } from "@/config/teacher";
import {
  findPublishedLgsListByStatSlug,
  getContactLinks,
  getPublishedLgsList,
  getPublishedLgsLists,
} from "@/lib/cms/public";
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
  const list =
    (await getPublishedLgsList(slug)) ?? (await findPublishedLgsListByStatSlug(slug));
  if (!list) return {};

  return pageMetadata({
    title: list.title,
    description: list.description || list.items[0]?.body || list.title,
    path: lgsListPath(list.slug),
  });
}

export default async function LgsListPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const exact = await getPublishedLgsList(slug);
  if (!exact) {
    const parent = await findPublishedLgsListByStatSlug(slug);
    if (parent) redirect(lgsListPath(parent.slug));
    notFound();
  }

  const list = exact;
  const [others, contact] = await Promise.all([getPublishedLgsLists(), getContactLinks()]);
  const related = others.filter((entry) => entry.slug !== list.slug).slice(0, 2);
  const wa = contact.whatsappUrl;
  const path = lgsListPath(list.slug);

  return (
    <>
      <article>
        <section className="border-b border-line bg-paper">
          <Container className="py-14 sm:py-20">
            <Link
              href={routes.lgs}
              className="group inline-flex min-h-11 items-center text-sm font-semibold text-clay-strong transition-colors hover:text-ink"
            >
              <span className="link-underline">← Tüm listeler</span>
            </Link>

            <h1 className="mt-6 max-w-3xl font-display text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {list.title}
            </h1>
            {list.description ? (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{list.description}</p>
            ) : null}
          </Container>
        </section>

        <Section className="pt-10 sm:pt-14">
          {list.items.length === 0 ? (
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Bu listede henüz istatistik satırı yok.
            </p>
          ) : (
            <ul className="grid gap-6">
              {list.items.map((item) => (
                <li key={item.id}>
                  <article className="overflow-hidden rounded-card border border-line bg-paper">
                    {item.images.length > 0 ? (
                      <div
                        className={
                          item.images.length > 1 ? "grid gap-px bg-line sm:grid-cols-2" : undefined
                        }
                      >
                        {item.images.map((image) => (
                          <div
                            key={image.src}
                            className="relative aspect-[16/9] overflow-hidden bg-paper-2"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(min-width: 1024px) 1000px, 100vw"
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div className="p-7 sm:p-8">
                      {item.period ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay-strong">
                          {item.period}
                        </p>
                      ) : null}
                      <p
                        className={`font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl ${
                          item.period ? "mt-4" : ""
                        }`}
                      >
                        {item.figure}
                      </p>
                      <h2 className="mt-4 font-display text-2xl leading-snug text-ink">{item.title}</h2>
                      {bodyParagraphs(item.body).map((paragraph) => (
                        <p key={paragraph} className="mt-4 text-lg leading-relaxed text-ink">
                          {paragraph}
                        </p>
                      ))}
                      <p className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                        Kaynak: {item.source}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        Bu rakam {teacher.informalName}&apos;nın öğrenci sonuçları değildir; yukarıdaki
                        kamuya açık kaynaktan alınmıştır.
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
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
          <h2 className="font-display text-2xl text-ink">Diğer listeler</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {related.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={lgsListPath(entry.slug)}
                  className="group block h-full rounded-card border border-line bg-paper p-7 transition duration-200 ease-out hover:border-clay/45"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay-strong">
                    {entry.items.length} istatistik
                  </p>
                  <h3 className="mt-3 font-display text-xl leading-snug text-ink">
                    <span className="link-underline">{entry.title}</span>
                  </h3>
                  {entry.description ? (
                    <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{entry.description}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: list.title,
          description: list.description || undefined,
          url: new URL(path, SITE_URL).toString(),
          inLanguage: "tr-TR",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(routes.lgs, { label: list.title, path })!} />
    </>
  );
}
