import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInThisContext } from "node:vm";
import ts from "typescript";

// Aynı TypeScript kaynaklarını çalıştırır; ek test bağımlılığı gerektirmez.
const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();
function loadSource(path) {
  const filename = resolve(root, path);
  if (modules.has(filename)) return modules.get(filename).exports;
  const cachedModule = { exports: {} };
  modules.set(filename, cachedModule);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  const localRequire = (specifier) => {
    assert.ok(specifier.startsWith("@/") || specifier.startsWith("."));
    const base = specifier.startsWith("@/")
      ? resolve(root, "src", specifier.slice(2))
      : resolve(dirname(filename), specifier);
    return loadSource(`${base}.ts`);
  };
  runInThisContext(`(function(require, module, exports) {\n${outputText}\n})`, { filename })(
    localRequire, cachedModule, cachedModule.exports,
  );
  return cachedModule.exports;
}

const { districtBlogPosts } = loadSource("src/content/denizli-districts.ts");
const { blogPosts } = loadSource("src/content/blog.ts");
const { seedState } = loadSource("src/lib/cms/seed.ts");
const { applyContentMigrations, DISTRICT_BLOG_MIGRATION } = loadSource(
  "src/lib/cms/content-migrations.ts",
);
const expected = [
  "Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan",
  "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale",
  "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas",
];
assert.deepEqual(districtBlogPosts.map((post) => post.district), expected);
assert.equal(new Set(blogPosts.map((post) => post.slug)).size, blogPosts.length);
assert.equal(new Set(districtBlogPosts.map((post) => post.description)).size, 19);
for (const post of districtBlogPosts) {
  assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(post.title.includes(post.district), post.title);
  assert.ok(post.description && post.intro && post.closing);
  assert.equal(Number.isNaN(Date.parse(post.publishedAt)), false);
  assert.ok(post.sections.length >= 3);
  const text = [post.intro, post.closing, ...post.sections.flatMap((s) => s.paragraphs)].join(" ");
  assert.ok(text.split(/\s+/).length >= 200, `${post.district}: içerik çok kısa`);
}

const seeded = seedState();
assert.equal(seeded.posts.length, 23);
assert.ok(seeded.contentMigrations.includes(DISTRICT_BLOG_MIGRATION));
assert.ok(seeded.posts.every((post) => post.published));

// Mevcut CMS: özel içerik/ayarlar korunur, geçiş tekrarlandığında çoğaltılmaz.
const districtSlugs = new Set(districtBlogPosts.map((post) => post.slug));
const legacy = structuredClone(seeded);
delete legacy.contentMigrations;
legacy.posts = legacy.posts.filter((post) => !districtSlugs.has(post.slug));
legacy.posts[0].title = "Editörün düzenlediği başlık";
legacy.settings.location = "Editörün konum bilgisi";
legacy.lgsLists = [{ id: "custom-list", title: "Özel liste", items: [] }];
const before = JSON.stringify(legacy);
const migrated = applyContentMigrations(legacy);
assert.equal(JSON.stringify(legacy), before, "Geçiş girdiyi değiştirmemeli");
assert.equal(migrated.posts.length, legacy.posts.length + 19);
assert.deepEqual(migrated.posts.slice(0, legacy.posts.length), legacy.posts);
for (const key of ["gallery", "testimonials", "faqs", "lgsLists", "settings"]) {
  assert.deepEqual(migrated[key], legacy[key]);
}
assert.deepEqual(applyContentMigrations(migrated), migrated);

// Hem yeniden adlandırılmış kimlik hem de başka kimlikli aynı adres korunur.
const conflicts = structuredClone(legacy);
const first = seeded.posts.find((post) => post.slug === districtBlogPosts[0].slug);
const second = seeded.posts.find((post) => post.slug === districtBlogPosts[1].slug);
conflicts.posts.push(
  { ...first, slug: "editorun-yeni-adresi", title: "Yeni başlık", published: false },
  { ...second, id: "editor-id", title: "Mevcut taslak", published: false },
);
const resolved = applyContentMigrations(conflicts);
assert.equal(resolved.posts.length, 23);
assert.deepEqual(resolved.posts.slice(0, conflicts.posts.length), conflicts.posts);

// Panelde silme/taslak kararları bir JSON kayıt-okuma turundan sonra da korunur.
const edited = structuredClone(migrated);
edited.posts = edited.posts.filter((post) => post.id !== first.id);
edited.posts.find((post) => post.id === second.id).published = false;
const reloaded = applyContentMigrations(JSON.parse(JSON.stringify(edited)));
assert.equal(reloaded.posts.some((post) => post.id === first.id), false);
assert.equal(reloaded.posts.find((post) => post.id === second.id).published, false);

console.log("19 ilçe, 23 yazı ve CMS içerik geçişi kontrolleri geçti.");

// İsteğe bağlı: çalışan üretim sunucusunda bağlantı, içerik ve SEO kontrolü.
if (process.argv[2]) {
  const base = new URL(process.argv[2]);
  const indexResponse = await fetch(new URL("/blog", base));
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  const directory = indexHtml.match(
    /<nav[^>]*aria-labelledby="ilce-rehberleri-baslik"[^>]*>([\s\S]*?)<\/nav>/,
  );
  assert.ok(directory, "İlçe rehberi görünmeli");
  assert.equal((directory[1].match(/<a /g) ?? []).length, 19);
  const sitemapResponse = await fetch(new URL("/sitemap.xml", base));
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const post of blogPosts) {
    const path = `/blog/${post.slug}`;
    assert.ok(indexHtml.includes(`href="${path}"`), path);
    assert.ok(sitemap.includes(`${path}</loc>`), `${path}: sitemap kaydı`);
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(post.title), `${path}: başlık`);
    assert.ok(html.includes('rel="canonical"'), `${path}: canonical`);
    assert.ok(html.includes('"@type":"BlogPosting"'), `${path}: makale şeması`);
  }
  assert.equal((await fetch(new URL("/blog/olmayan-bir-yazi", base))).status, 404);
  console.log("23 yazı adresi, 19 ilçe bağlantısı, sitemap, SEO ve 404 kontrolleri geçti.");
}
