import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";
import { blogPosts, getPost, readingMinutes } from "@/content/blog";
import { whatsappUrl } from "@/lib/contact";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.cover ? { images: [{ url: post.cover.src }] } : {}),
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const wa = whatsappUrl();

  return (
    <>
      <article>
        <section className="border-b border-line bg-paper">
          <Container className="py-14 sm:py-20">
            <Link
              href={routes.blog}
              className="group inline-flex min-h-11 items-center text-sm font-semibold text-clay-strong transition-colors hover:text-ink"
            >
              <span className="link-underline">← Tüm yazılar</span>
            </Link>

            <h1 className="mt-6 max-w-3xl font-display text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-sm text-muted">
              <time dateTime={post.publishedAt}>
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
              {" · "}
              {readingMinutes(post)} dakikalık okuma
            </p>
          </Container>
        </section>

        {post.cover ? (
          <Container className="pt-10 sm:pt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-paper-2">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        ) : null}

        <Section className="pt-10 sm:pt-14">
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-ink">{post.intro}</p>

            {post.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-display text-2xl leading-snug text-ink">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <p className="mt-10 border-l-2 border-clay pl-5 font-display text-xl leading-snug text-ink">
              {post.closing}
            </p>
          </div>
        </Section>
      </article>

      {/* Yazının sonunda tek, sakin bir çağrı. */}
      <Section tone="ink">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-2xl leading-tight tracking-tight text-paper sm:text-3xl">
              Çocuğunuzun durumunu konuşmak isterseniz
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper-3/90">
              Kısa bir ön görüşme, yazıda anlatılanların çocuğunuz için geçerli olup olmadığını
              anlamanın en hızlı yolu.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Button
              href={wa ?? routes.contact}
              variant={wa ? "whatsapp" : "secondary"}
              withArrow
            >
              {teacher.informalName} ile Görüşün
            </Button>
          </div>
        </div>
      </Section>

      {others.length > 0 ? (
        <Section tone="paper-2">
          <h2 className="font-display text-2xl text-ink">Diğer yazılar</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block h-full rounded-card border border-line bg-paper p-7 transition duration-200 ease-out hover:border-clay/45"
                >
                  <h3 className="font-display text-xl leading-snug text-ink">
                    <span className="link-underline">{item.title}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          publishedAt: post.publishedAt,
          image: post.cover?.src,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(routes.blog, { label: post.title, path: `/blog/${post.slug}` })!}
      />
    </>
  );
}
