import { DeleteButton } from "@/components/admin/DeleteButton";
import { ActionForm, Field, SubmitButton, areaClass, inputClass } from "@/components/admin/ui";
import { deleteFaqAction, saveFaqAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminFaqPage() {
  const cms = await readCms();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Sık sorulanlar</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">SSS</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Sınıf, ders ve format soruları künyedeki bilgilerden otomatik üretilir. Buraya süreç ve
        çalışma biçimine dair sorular eklenir.
      </p>

      <ActionForm
        action={saveFaqAction}
        className="mt-8 space-y-4 rounded-card border border-line bg-paper p-6"
        success="Soru eklendi."
      >
        <Field label="Soru">
          <input name="question" required className={inputClass} />
        </Field>
        <Field label="Cevap">
          <textarea name="answer" required className={areaClass} />
        </Field>
        <SubmitButton>Ekle</SubmitButton>
      </ActionForm>

      <ul className="mt-8 space-y-4">
        {cms.faqs.map((item) => (
          <li key={item.id} className="rounded-card border border-line bg-paper p-6">
            <ActionForm action={saveFaqAction} className="space-y-3" success="Kaydedildi.">
              <input type="hidden" name="id" value={item.id} />
              <input name="question" defaultValue={item.question} className={inputClass} />
              <textarea name="answer" defaultValue={item.answer} className={areaClass} />
              <div className="flex items-center justify-between">
                <SubmitButton>Kaydet</SubmitButton>
                <DeleteButton
                  confirmText="Bu soru silinsin mi?"
                  action={deleteFaqAction.bind(null, item.id)}
                />
              </div>
            </ActionForm>
          </li>
        ))}
      </ul>
    </div>
  );
}
