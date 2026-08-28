import { ActionForm, Field, SubmitButton, inputClass } from "@/components/admin/ui";
import { saveSettingsAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

export default async function AdminContactPage() {
  const { settings } = await readCms();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">İletişim</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Kanallar</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Boş bırakılan kanal sitede görünmez. WhatsApp numarasını ülke koduyla yazın (905…).
      </p>

      <ActionForm action={saveSettingsAction} className="mt-8 space-y-5" success="İletişim kaydedildi.">
        <Field label="WhatsApp">
          <input name="whatsapp" defaultValue={settings.whatsapp} className={inputClass} />
        </Field>
        <Field label="Telefon">
          <input name="phone" defaultValue={settings.phone} className={inputClass} />
        </Field>
        <Field label="E-posta">
          <input type="email" name="email" defaultValue={settings.email} className={inputClass} />
        </Field>
        <Field label="Instagram adresi">
          <input name="instagram" defaultValue={settings.instagram} className={inputClass} />
        </Field>
        <Field label="Görüşme saatleri">
          <input name="availability" defaultValue={settings.availability} className={inputClass} />
        </Field>
        <SubmitButton>Kaydet</SubmitButton>
      </ActionForm>
    </div>
  );
}
