import { notFound } from "next/navigation";

import { LgsEditor } from "@/components/admin/LgsEditor";
import { readCms } from "@/lib/cms/store";

export default async function AdminEditLgsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cms = await readCms();
  const list = cms.lgsLists.find((entry) => entry.id === id);
  if (!list) notFound();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">LGS</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Listeyi düzenle</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Satır ekle ile aynı listede birden fazla istatistik tutabilirsiniz. Kaydetmek tüm satırları
        birden yazar.
      </p>
      <div className="mt-8">
        <LgsEditor list={list} />
      </div>
    </div>
  );
}
