import { LgsEditor } from "@/components/admin/LgsEditor";

export default function AdminNewLgsPage() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">LGS</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Yeni liste</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Bu form sitede bir liste sayfası açar. Aynı ekranda Satır ekle ile birden fazla istatistik
        yazabilirsiniz; her satıra birden fazla görsel seçebilirsiniz. Kaydetmek hepsini birden
        kaydeder. Rakamlar kamuya açık kaynaktan olmalı.
      </p>
      <div className="mt-8">
        <LgsEditor />
      </div>
    </div>
  );
}
