import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { SITE_URL, routes, teacher } from "@/config/teacher";
import { readingMinutes } from "@/content/blog";
import { districtBlogPosts } from "@/content/denizli-districts";
import { getPublishedPosts } from "@/lib/cms/public";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Denizli'nin 19 ilçesinde matematik özel ders arayan aileler için rehberler; " +
    "LGS, TYT, AYT, konu eksikleri ve çalışma düzeni üzerine yazılar.",
  path: routes.blog,
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  const districtLinks = districtBlogPosts.flatMap((districtPost) => {
    const post = posts.find(
      (item) => item.id === districtPost.slug || item.slug === districtPost.slug,
    );
    return post ? [{ district: districtPost.district, post }] : [];
  });

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Matematik çalışırken işe yarayan birkaç şey
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Matematik öğrenme, sınav hazırlığı ve çalışma düzeni üzerine veliler ve öğrenciler
            için yazılar. Denizli’nin tüm ilçeleri için hazırlanan rehberlerden kendi ihtiyacınıza
            uygun bir başlangıç seçebilirsiniz.
          </p>
          {districtLinks.length > 0 ? (
            <nav
              aria-labelledby="ilce-rehberleri-baslik"
              className="mt-10 rounded-card border border-line bg-paper-2 p-6 sm:p-8"
            >
              <h2 id="ilce-rehberleri-baslik" className="font-display text-2xl text-ink">
                İlçeniz için matematik rehberi
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                İlçenizi seçin; matematik desteği, ders planı ve ilk görüşmeye hazırlık üzerine
                yazıya ulaşın.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {districtLinks.map(({ district, post }) => (
                  <li key={district}>
                    <Link
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-clay-strong transition-colors hover:border-clay hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                    >
                      {district}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </Container>
      </section>

      <div className="border-b border-line bg-paper-2">
        <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-muted">İlkokul, ortaokul, online ders ve ücret bilgisi için ders rehberlerini inceleyin.</p>
          <Link href={routes.lessons} className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-clay-strong underline underline-offset-4">Matematik dersleri</Link>
        </Container>
      </div>

      <Section>
        {posts.length === 0 ? (
          <p className="text-muted">Yayımlanmış yazı henüz yok.</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2">
            {posts.map((post, index) => (
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
        )}
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
