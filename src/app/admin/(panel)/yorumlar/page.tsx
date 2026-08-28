import { DeleteButton } from "@/components/admin/DeleteButton";
import { ActionForm, Field, SubmitButton, areaClass, inputClass } from "@/components/admin/ui";
import { deleteTestimonialAction, saveTestimonialAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminTestimonialsPage() {
  const cms = await readCms();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Geri bildirim</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Veli ve öğrenci görüşleri</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Yalnızca paylaşılmasına izin verilen gerçek görüşleri ekleyin. Uydurma isim veya puan yok.
        Liste boşsa sitede bu bölüm hiç görünmez.
      </p>

      <ActionForm
        action={saveTestimonialAction}
        className="mt-8 space-y-4 rounded-card border border-line bg-paper p-6"
        success="Görüş eklendi."
      >
        <Field label="Görüş">
          <textarea name="quote" required className={areaClass} />
        </Field>
        <Field label="Kim" hint="Örneğin Veli veya Öğrenci.">
          <input name="role" required className={inputClass} />
        </Field>
        <Field label="Ad" hint="Tam kimlik yayımlamayın; baş harf yeter.">
          <input name="by" required className={inputClass} />
        </Field>
        <Field label="Tarih">
          <input type="month" name="date" className={inputClass} />
        </Field>
        <SubmitButton>Ekle</SubmitButton>
      </ActionForm>

      <ul className="mt-8 space-y-4">
        {cms.testimonials.map((item) => (
          <li key={item.id} className="rounded-card border border-line bg-paper p-6">
            <ActionForm action={saveTestimonialAction} className="space-y-3" success="Kaydedildi.">
              <input type="hidden" name="id" value={item.id} />
              <textarea name="quote" defaultValue={item.quote} className={areaClass} />
              <input name="role" defaultValue={item.role} className={inputClass} />
              <input name="by" defaultValue={item.by} className={inputClass} />
              <input
                type="month"
                name="date"
                defaultValue={item.date ? item.date.slice(0, 7) : ""}
                className={inputClass}
              />
              <div className="flex items-center justify-between">
                <SubmitButton>Kaydet</SubmitButton>
                <DeleteButton
                  confirmText="Bu görüş silinsin mi?"
                  action={deleteTestimonialAction.bind(null, item.id)}
                />
              </div>
            </ActionForm>
          </li>
        ))}
      </ul>
    </div>
  );
}
