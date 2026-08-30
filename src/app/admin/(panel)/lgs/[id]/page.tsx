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
  const item = cms.lgsStats.find((entry) => entry.id === id);
  if (!item) notFound();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">LGS</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Sayfayı düzenle</h1>
      <div className="mt-8">
        <LgsEditor item={item} />
      </div>
    </div>
  );
}
