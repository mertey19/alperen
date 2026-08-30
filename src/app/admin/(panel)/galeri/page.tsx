import Image from "next/image";

import { DeleteButton } from "@/components/admin/DeleteButton";
import { ActionForm, Field, SubmitButton, areaClass, inputClass } from "@/components/admin/ui";
import { deleteGalleryItemAction, saveGalleryItemAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminGalleryPage() {
  const cms = await readCms();

  return (
    <div>
      <p className="eyebrow">Galeri</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Görseller</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Yeni görsel yükleyin veya mevcut afişin başlığını, oranını ve slaytta görünüp görünmeyeceğini
        düzenleyin. Yeni yüklemede Ctrl veya Shift ile birden fazla dosya seçebilirsiniz. Tanınabilir
        çocuk fotoğrafı kullanmayın.
      </p>

      <ActionForm
        action={saveGalleryItemAction}
        className="mt-8 space-y-4 rounded-card border border-line bg-paper p-6"
        success="Görseller kaydedildi."
      >
        <h2 className="font-display text-xl text-ink">Yeni görsel</h2>
        <Field
          label="Dosyalar"
          hint="Ctrl veya Shift ile birden fazla görsel seçebilirsiniz. JPEG, PNG veya WebP. Her dosya en fazla 5 MB."
        >
          <input
            type="file"
            name="image"
            required
            multiple
            accept="image/jpeg,image/png,image/webp"
          />
        </Field>
        <Field label="Başlık">
          <input name="title" required className={inputClass} />
        </Field>
        <Field label="Alternatif metin">
          <input name="alt" required className={inputClass} />
        </Field>
        <Field label="Kategori">
          <input name="category" defaultValue="Galeri" className={inputClass} />
        </Field>
        <Field label="Oran">
          <select name="aspect" defaultValue="landscape" className={inputClass}>
            <option value="landscape">Yatay (16:9) — slayt için</option>
            <option value="square">Kare</option>
          </select>
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="inSlider" defaultChecked className="size-4 accent-clay" />
          Üst slaytta göster
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="featured" className="size-4 accent-clay" />
          Izgarada geniş kare
        </label>
        <SubmitButton>Yükle</SubmitButton>
      </ActionForm>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {cms.gallery.map((item) => (
          <li key={item.id} className="rounded-card border border-line bg-paper p-4">
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-paper-2">
              <Image src={item.src} alt={item.alt} fill sizes="400px" className="object-contain" />
            </div>
            <ActionForm action={saveGalleryItemAction} className="space-y-3" success="Kaydedildi.">
              <input type="hidden" name="id" value={item.id} />
              <input name="title" defaultValue={item.title} className={inputClass} />
              <textarea name="alt" defaultValue={item.alt} className={`${areaClass} min-h-20`} />
              <input name="category" defaultValue={item.category} className={inputClass} />
              <select name="aspect" defaultValue={item.aspect} className={inputClass}>
                <option value="landscape">Yatay</option>
                <option value="square">Kare</option>
              </select>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="inSlider"
                  defaultChecked={item.inSlider}
                  className="size-4 accent-clay"
                />
                Slayt
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={item.featured}
                  className="size-4 accent-clay"
                />
                Öne çıkan
              </label>
              <div className="flex items-center justify-between gap-3">
                <SubmitButton>Kaydet</SubmitButton>
                <DeleteButton
                  confirmText={`“${item.title}” silinsin mi?`}
                  action={deleteGalleryItemAction.bind(null, item.id)}
                />
              </div>
            </ActionForm>
          </li>
        ))}
      </ul>
    </div>
  );
}
