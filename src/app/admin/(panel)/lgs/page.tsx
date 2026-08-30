import Link from "next/link";

import { DeleteButton } from "@/components/admin/DeleteButton";
import { lgsListPath } from "@/config/teacher";
import { deleteLgsListAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminLgsPage() {
  const cms = await readCms();
  const lists = [...cms.lgsLists].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">LGS</p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">İstatistiklerle LGS</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Birden çok liste açabilirsiniz (örneğin 2025 LGS, Taban puanlar). Menüde tek bağlantı
            kalır: İstatistiklerle LGS. Listeyi açıp aynı ekranda Satır ekle ile birden fazla
            istatistik kaydedin. Yalnızca resmi kaynaktan doğruladığınız sayıları yazın;
            Alperen&apos;in öğrenci sonuçları veya uydurma başarı oranı buraya girmez.
          </p>
        </div>
        <Link
          href="/admin/lgs/yeni"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
        >
          Yeni liste
        </Link>
      </div>

      {lists.length === 0 ? (
        <p className="mt-8 text-sm leading-relaxed text-muted">
          Henüz liste yok. Yeni liste ile ekleyin; yayımladığınızda /istatistiklerle-lgs altında
          görünür.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {lists.map((list) => (
            <li key={list.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-display text-lg text-ink">{list.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {list.items.length} satır
                  {" · "}
                  {list.published ? "Yayımlı" : "Taslak"}
                  {" · "}
                  {lgsListPath(list.slug)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/lgs/${list.id}`} className="text-sm font-semibold text-clay-strong">
                  Düzenle
                </Link>
                <DeleteButton
                  confirmText={`“${list.title}” listesi ve içindeki satırlar silinsin mi?`}
                  action={deleteLgsListAction.bind(null, list.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
