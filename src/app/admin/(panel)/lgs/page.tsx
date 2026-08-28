import Image from "next/image";

import { DeleteButton } from "@/components/admin/DeleteButton";
import { ActionForm, Field, SubmitButton, areaClass, inputClass } from "@/components/admin/ui";
import { deleteLgsStatAction, saveLgsStatAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminLgsPage() {
  const cms = await readCms();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">LGS</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">İstatistiklerle LGS</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Sitedeki <span className="font-semibold text-ink">İstatistiklerle LGS</span> sayfasına kart
        ekleyin. Yalnızca resmi kaynaktan doğruladığınız sayıları yazın; Alperen&apos;in öğrenci
        sonuçları veya uydurma başarı oranı buraya girmez.
      </p>

      <ActionForm
        action={saveLgsStatAction}
        className="mt-8 space-y-4 rounded-card border border-line bg-paper p-6"
        success="İstatistik eklendi."
      >
        <h2 className="font-display text-xl text-ink">Yeni istatistik</h2>
        <Field label="Başlık">
          <input name="title" required className={inputClass} placeholder="Örneğin sınava giren öğrenci sayısı" />
        </Field>
        <Field label="Rakam" hint="Sayıyı tam olarak kaynağın yazdığı gibi girin.">
          <input name="figure" required className={inputClass} placeholder="Örneğin 1.000.000" />
        </Field>
        <Field label="Dönem" hint="İsteğe bağlı. Örneğin 2025 LGS.">
          <input name="period" className={inputClass} />
        </Field>
        <Field label="Açıklama">
          <textarea name="body" required className={areaClass} />
        </Field>
        <Field label="Kaynak" hint="MEB raporu, resmî duyuru vb.">
          <input name="source" required className={inputClass} />
        </Field>
        <Field label="Görsel" hint="İsteğe bağlı tablo veya grafik. JPEG, PNG veya WebP.">
          <input type="file" name="image" accept="image/jpeg,image/png,image/webp" />
        </Field>
        <Field label="Görsel alternatif metni">
          <input name="imageAlt" className={inputClass} />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="published" defaultChecked className="size-4 accent-clay" />
          Sitede yayımlansın
        </label>
        <SubmitButton>Ekle</SubmitButton>
      </ActionForm>

      <ul className="mt-8 space-y-4">
        {cms.lgsStats.map((item) => (
          <li key={item.id} className="rounded-card border border-line bg-paper p-6">
            {item.image ? (
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-paper-2">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="480px" className="object-contain" />
              </div>
            ) : null}
            <ActionForm action={saveLgsStatAction} className="space-y-3" success="Kaydedildi.">
              <input type="hidden" name="id" value={item.id} />
              <input name="title" defaultValue={item.title} className={inputClass} />
              <input name="figure" defaultValue={item.figure} className={inputClass} />
              <input name="period" defaultValue={item.period} className={inputClass} />
              <textarea name="body" defaultValue={item.body} className={areaClass} />
              <input name="source" defaultValue={item.source} className={inputClass} />
              <input
                name="imageAlt"
                defaultValue={item.image?.alt ?? ""}
                placeholder="Görsel alternatif metni"
                className={inputClass}
              />
              <input type="file" name="image" accept="image/jpeg,image/png,image/webp" />
              {item.image ? (
                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" name="removeImage" className="size-4 accent-clay" />
                  Görseli kaldır
                </label>
              ) : null}
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={item.published}
                  className="size-4 accent-clay"
                />
                Sitede yayımlansın
              </label>
              <div className="flex items-center justify-between">
                <SubmitButton>Kaydet</SubmitButton>
                <DeleteButton
                  confirmText="Bu istatistik silinsin mi?"
                  action={deleteLgsStatAction.bind(null, item.id)}
                />
              </div>
            </ActionForm>
          </li>
        ))}
      </ul>
    </div>
  );
}
