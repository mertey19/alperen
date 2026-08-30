import Link from "next/link";

import { DeleteButton } from "@/components/admin/DeleteButton";
import { lgsStatPath } from "@/config/teacher";
import { deleteLgsStatAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminLgsPage() {
  const cms = await readCms();
  const items = [...cms.lgsStats].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">LGS</p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">İstatistiklerle LGS</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Her kayıt sitede ayrı bir sayfa olur. Menüde tek bağlantı kalır: İstatistiklerle LGS.
            Yalnızca resmi kaynaktan doğruladığınız sayıları yazın; Alperen&apos;in öğrenci sonuçları
            veya uydurma başarı oranı buraya girmez.
          </p>
        </div>
        <Link
          href="/admin/lgs/yeni"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
        >
          Yeni sayfa
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-sm leading-relaxed text-muted">
          Henüz istatistik sayfası yok. Yeni sayfa ile ekleyin; yayımladığınızda
          /istatistiklerle-lgs altında görünür.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-display text-lg text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.figure}
                  {item.period ? ` · ${item.period}` : ""}
                  {" · "}
                  {item.published ? "Yayımlı" : "Taslak"}
                  {" · "}
                  {lgsStatPath(item.slug)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/lgs/${item.id}`} className="text-sm font-semibold text-clay-strong">
                  Düzenle
                </Link>
                <DeleteButton
                  confirmText={`“${item.title}” silinsin mi?`}
                  action={deleteLgsStatAction.bind(null, item.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
