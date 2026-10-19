import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { lessonPath, routes, teacher } from "@/config/teacher";
import { getLessonPage, lessonPages } from "@/content/math-lessons";
import { getContactLinks } from "@/lib/cms/public";
import { breadcrumbJsonLd, faqJsonLd, lessonServiceJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lessonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLessonPage(slug);
  if (!page) notFound();
  return pageMetadata({ title: page.title, description: page.description, path: lessonPath(slug) });
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const page = getLessonPage(slug);
  if (!page) notFound();
  const contact = await getContactLinks();
  const related = page.related.flatMap((item) => {
    const other = getLessonPage(item);
    return other ? [other] : [];
  });
  const path = lessonPath(slug);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-12 sm:py-18">
          <nav aria-label="Sayfa yolu" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <li><Link href={routes.home} className="inline-flex min-h-11 items-center underline underline-offset-4">Ana Sayfa</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={routes.lessons} className="inline-flex min-h-11 items-center underline underline-offset-4">Matematik Dersleri</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{page.label}</li>
            </ol>
          </nav>
          <p className="eyebrow mt-7">{teacher.name} · Birebir matematik desteği</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{page.intro}</p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0">
            <div className="rounded-card border border-line bg-paper-2 p-6 sm:p-8">
              <h2 className="font-display text-2xl text-ink">Birlikte ele alınabilecekler</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted">
                {page.goals.map((goal) => <li key={goal}>{goal}</li>)}
              </ul>
            </div>
            {page.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-display text-2xl leading-snug text-ink">{section.heading}</h2>
                {section.paragraphs.map((text) => <p key={text} className="mt-4 leading-relaxed text-muted">{text}</p>)}
              </section>
            ))}
            <section className="mt-12" aria-labelledby="ders-sorulari">
              <h2 id="ders-sorulari" className="font-display text-2xl text-ink">Sık sorulan sorular</h2>
              <div className="mt-5 divide-y divide-line border-y border-line">
                {page.faqs.map((item) => (
                  <details key={item.question} className="py-5">
                    <summary className="cursor-pointer pr-3 font-semibold leading-relaxed text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">{item.question}</summary>
                    <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside aria-label="Ders görüşmesi ve ilgili rehberler" className="self-start rounded-card border border-line bg-paper-2 p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl text-ink">Çalışma planını konuşalım</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">İlk görüşmede sınıfı, hedefi ve uygun günleri paylaşabilirsiniz. Ders yeri, süre ve güncel ücret birlikte netleştirilir.</p>
            <div className="mt-5">
              <Button href={contact.whatsappUrl ?? routes.contact} variant={contact.whatsappUrl ? "whatsapp" : "primary"} withArrow>
                {slug === "fiyatlar" ? "Güncel Ücreti Sorun" : "Ders İçin Görüşün"}
              </Button>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">İlgili ders rehberleri</p>
            <ul className="mt-3 space-y-1">
              {related.map((other) => <li key={other.slug}><Link href={lessonPath(other.slug)} className="inline-flex min-h-11 items-center text-sm font-semibold text-clay-strong underline underline-offset-4">{other.label}</Link></li>)}
              <li><Link href={routes.about} className="inline-flex min-h-11 items-center text-sm text-muted underline underline-offset-4">Alperen Gövrek’i tanıyın</Link></li>
            </ul>
          </aside>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd(routes.lessons, { label: page.label, path })!} />
      <JsonLd data={lessonServiceJsonLd({ title: page.title, description: page.description, path })} />
      <JsonLd data={faqJsonLd(page.faqs)} />
    </>
  );
}
