import { LgsEditor } from "@/components/admin/LgsEditor";

export default function AdminNewLgsPage() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">LGS</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Yeni istatistik sayfası</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Bu form sitede ayrı bir sayfa açar. Rakamlar kamuya açık kaynaktan olmalı; öğrenci sonucu
        veya doğrulanmamış başarı yüzdesi yazmayın.
      </p>
      <div className="mt-8">
        <LgsEditor />
      </div>
    </div>
  );
}
