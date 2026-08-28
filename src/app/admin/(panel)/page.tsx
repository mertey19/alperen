import Link from "next/link";

import { readCms } from "@/lib/cms/store";

export default async function AdminDashboardPage() {
  const cms = await readCms();
  const published = cms.posts.filter((post) => post.published).length;

  const cards = [
    { href: "/admin/blog", label: "Yazılar", value: `${published} yayımlı / ${cms.posts.length}` },
    { href: "/admin/galeri", label: "Galeri", value: `${cms.gallery.length} görsel` },
    { href: "/admin/yorumlar", label: "Yorumlar", value: `${cms.testimonials.length} görüş` },
    { href: "/admin/sss", label: "SSS", value: `${cms.faqs.length} soru` },
  ];

  return (
    <div>
      <p className="eyebrow">Yönetim</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Özet</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Blog, galeri, veli yorumları, sık sorulanlar ve iletişim bilgileri buradan yönetilir.
        Uydurma öğrenci sayısı veya başarı oranı eklemeyin.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block rounded-card border border-line bg-paper p-6 transition hover:border-clay/45"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{card.label}</p>
              <p className="mt-2 font-display text-2xl text-ink">{card.value}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
