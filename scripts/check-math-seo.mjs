import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// İçerik dosyası yalnızca veri ve saf fonksiyonlar içerir; Next sunucusu gerektirmez.
const source = readFileSync(new URL("../src/content/math-lessons.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { lessonPages } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const slugs = new Set(lessonPages.map((page) => page.slug));
assert.equal(slugs.size, lessonPages.length);
assert.deepEqual(lessonPages.filter((page) => page.grade).map((page) => page.grade), [1, 2, 3, 4, 5, 6, 7, 8]);
assert.equal(new Set(lessonPages.map((page) => page.title)).size, lessonPages.length);
assert.equal(new Set(lessonPages.map((page) => page.description)).size, lessonPages.length);
for (const page of lessonPages) {
  assert.match(page.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(page.intro && page.description && page.goals.length && page.sections.length && page.faqs.length);
  assert.ok(page.sections.every((section) => section.heading && section.paragraphs.length));
  assert.ok(page.related.every((slug) => slug !== page.slug && slugs.has(slug)), page.slug);
}
console.log(`${lessonPages.length} hizmet içeriği: sınıf kapsamı, benzersiz başlık/özet ve ilgili bağlantı kontrolleri geçti.`);

if (process.argv[2]) {
  const base = new URL(process.argv[2]);
  const origin = "https://www.xn--alperengvrek-cjb.com";
  const pathFor = (slug) => `/matematik-ozel-ders/${slug}`;
  const getHtml = async (path) => {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    return response.text();
  };
  const schemas = (html) => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const canonical = (html) => [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)]
    .map((match) => new URL(match[1]).toString());
  const home = await getHtml("/");
  assert.ok(home.includes("<title>Denizli Matematik Özel Ders | Alperen Gövrek</title>"));
  assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
  assert.match(home, /<h1\b[^>]*>[\s\S]*?Denizli matematik özel ders[\s\S]*?<\/h1>/);
  assert.deepEqual(canonical(home), [`${origin}/`]);
  const hub = await getHtml("/matematik-ozel-ders");
  assert.deepEqual(canonical(hub), [`${origin}/matematik-ozel-ders`]);
  const sitemap = await getHtml("/sitemap.xml");
  const sitemapAgain = await getHtml("/sitemap.xml");
  assert.equal(sitemap, sitemapAgain, "Değişmeyen içerikte sitemap tarihleri değişmemeli");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "Sitemap adresleri çoğalmamalı");
  assert.ok(urls.includes(`${origin}/matematik-ozel-ders`));
  const robots = await getHtml("/robots.txt");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));

  for (const page of lessonPages) {
    const path = pathFor(page.slug);
    assert.ok(hub.includes(`href="${path}"`), `${path}: rehberde bağlantı`);
    assert.ok(urls.includes(`${origin}${path}`), `${path}: sitemap`);
    const html = await getHtml(path);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
    assert.ok(html.includes(`<h1`) && html.includes(page.title), `${path}: başlık`);
    assert.deepEqual(canonical(html), [`${origin}${path}`]);
    assert.ok(html.includes('name="description"'), `${path}: açıklama`);
    assert.ok(html.includes('property="og:title"'), `${path}: paylaşım başlığı`);
    assert.equal(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html), false, path);
    const data = schemas(html);
    const service = data.find((item) => item["@type"] === "Service");
    assert.ok(service, `${path}: hizmet şeması`);
    assert.equal(service.url, `${origin}${path}`);
    assert.equal(service.provider["@id"], `${origin}/#alperen-govrek`);
    assert.equal(service.offers, undefined, "Teyitsiz fiyat verisi olmamalı");
    assert.equal(service.aggregateRating, undefined, "Teyitsiz puan olmamalı");
    const breadcrumb = data.find((item) => item["@type"] === "BreadcrumbList");
    assert.deepEqual(breadcrumb.itemListElement.map((item) => item.position), [1, 2, 3]);
    assert.equal(breadcrumb.itemListElement[2].item, `${origin}${path}`);
    const faq = data.find((item) => item["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, page.faqs.length);
    for (const [index, item] of page.faqs.entries()) {
      assert.equal(faq.mainEntity[index].name, item.question);
      assert.equal(faq.mainEntity[index].acceptedAnswer.text, item.answer);
      assert.ok(html.includes("<summary"), `${path}: görünür SSS`);
    }
    for (const related of page.related) {
      assert.ok(html.includes(`href="${pathFor(related)}"`), `${path}: ilgili bağlantı`);
    }
  }
  const missing = await fetch(new URL("/matematik-ozel-ders/olmayan-bir-sinif", base));
  assert.equal(missing.status, 404);
  assert.ok((await missing.text()).includes("noindex"));
  console.log("14 hizmet adresi, ana sayfa, canonical, sitemap, robots, Service/SSS/kırıntı verileri ve 404 kontrolleri geçti.");
}
