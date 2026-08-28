import { ActionForm, Field, SubmitButton, areaClass, inputClass } from "@/components/admin/ui";
import { saveSettingsAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

function join(values: readonly string[]): string {
  return values.join("\n");
}

export default async function AdminKunyePage() {
  const { settings } = await readCms();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Künye</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Hakkında bilgileri</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Listeli alanlarda her satır ayrı bir madde olur. Alanı boş bırakırsanız sitedeki teyitli
        varsayılan (veya henüz yoksa gizlenen) bilgi kullanılır.
      </p>

      <ActionForm action={saveSettingsAction} className="mt-8 space-y-5" success="Künye kaydedildi.">
        <Field label="Tanışma metni" hint="Her paragraf ayrı satır.">
          <textarea name="introduction" defaultValue={join(settings.introduction)} className={`${areaClass} min-h-48`} />
        </Field>
        <Field label="Eğitim">
          <textarea name="education" defaultValue={join(settings.education)} className={areaClass} />
        </Field>
        <Field label="Deneyim">
          <textarea name="experience" defaultValue={join(settings.experience)} className={areaClass} />
        </Field>
        <Field label="Kime">
          <input name="audience" defaultValue={settings.audience} className={inputClass} />
        </Field>
        <Field label="Sınıf aralığı">
          <input name="gradeRange" defaultValue={settings.gradeRange} className={inputClass} />
        </Field>
        <Field label="Dersler" hint="Her satır bir ders.">
          <textarea name="subjects" defaultValue={join(settings.subjects)} className={areaClass} />
        </Field>
        <Field label="Sınav hazırlığı">
          <textarea name="examPrep" defaultValue={join(settings.examPrep)} className={areaClass} />
        </Field>
        <Field label="Ders formatı">
          <textarea name="lessonFormat" defaultValue={join(settings.lessonFormat)} className={areaClass} />
        </Field>
        <Field label="Şehir">
          <input name="location" defaultValue={settings.location} className={inputClass} />
        </Field>
        <SubmitButton>Künyeyi kaydet</SubmitButton>
      </ActionForm>
    </div>
  );
}
