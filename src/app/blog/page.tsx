import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { SITE_URL, routes, teacher } from "@/config/teacher";
import { blogPosts, readingMinutes } from "@/content/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Matematikte eksik konu, sınav hazırlığında konu–soru dengesi, özel ders seçimi ve " +
    "matematik korkusu üzerine veliler ve öğrenciler için yazılar.",
  path: routes.blog,
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Matematik çalışırken işe yarayan birkaç şey
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Velilerin ve öğrencilerin en sık karşılaştığı durumlar üzerine kısa yazılar. Hiçbiri
            garantili yöntem değil; yalnızca derste tekrar tekrar karşılaşılan sorunların nasıl ele
            alınabileceği.
          </p>
        </Container>
      </section>

      <Section>
        <ul className="grid gap-8 sm:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Reveal as="li" key={post.slug} index={index}>
              <article className="group h-full overflow-hidden rounded-card border border-line bg-paper transition duration-200 ease-out hover:border-clay/45 hover:shadow-[0_16px_34px_-28px_rgba(27,35,48,0.5)]">
                <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none">
                  {post.cover ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                      <Image
                        src={post.cover.src}
                        alt={post.cover.alt}
                        fill
                        sizes="(min-width: 640px) 480px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="p-7">
                    <p className="text-xs text-muted">
                      <time dateTime={post.publishedAt}>
                        {dateFormatter.format(new Date(post.publishedAt))}
                      </time>
                      {" · "}
                      {readingMinutes(post)} dakikalık okuma
                    </p>
                    <h2 className="mt-3 font-display text-2xl leading-snug text-ink">
                      <span className="link-underline">{post.title}</span>
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted">{post.description}</p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <JsonLd data={breadcrumbJsonLd(routes.blog)!} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${teacher.name} — Blog`,
          url: new URL(routes.blog, SITE_URL).toString(),
          inLanguage: "tr-TR",
        }}
      />
    </>
  );
}
