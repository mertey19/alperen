"use client";

import { useState, useTransition } from "react";

import { areaClass, Field, inputClass } from "@/components/admin/ui";
import { saveLgsStatAction } from "@/lib/cms/actions";
import { slugify } from "@/lib/cms/slug";
import type { CmsLgsStat } from "@/lib/cms/types";

export function LgsEditor({ item }: { item?: CmsLgsStat }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(item?.slug));

  return (
    <form
      className="space-y-6"
      action={(formData) => {
        setError(null);
        start(async () => {
          const result = await saveLgsStatAction(formData);
          if (result && !result.ok) setError(result.error);
        });
      }}
    >
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <Field label="Başlık">
        <input
          name="title"
          value={title}
          required
          onChange={(event) => {
            const value = event.target.value;
            setTitle(value);
            if (!slugTouched) setSlug(slugify(value));
          }}
          className={inputClass}
          placeholder="Örneğin sınava giren öğrenci sayısı"
        />
      </Field>

      <Field
        label="Adres (slug)"
        hint="Sayfanın /istatistiklerle-lgs/ altındaki yolu. Boş bırakılırsa başlıktan üretilir."
      >
        <input
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
          className={inputClass}
        />
      </Field>

      <Field label="Rakam" hint="Sayıyı tam olarak kaynağın yazdığı gibi girin. Uydurma başarı oranı yazmayın.">
        <input
          name="figure"
          required
          defaultValue={item?.figure}
          className={inputClass}
          placeholder="Örneğin 1.000.000"
        />
      </Field>

      <Field label="Dönem" hint="İsteğe bağlı. Örneğin 2025 LGS.">
        <input name="period" defaultValue={item?.period} className={inputClass} />
      </Field>

      <Field label="Açıklama">
        <textarea name="body" required defaultValue={item?.body} className={areaClass} />
      </Field>

      <Field label="Kaynak" hint="MEB raporu, resmî duyuru vb. Kaynaksız rakam yayımlamayın.">
        <input name="source" required defaultValue={item?.source} className={inputClass} />
      </Field>

      <Field label="Görsel" hint="İsteğe bağlı tablo veya grafik. JPEG, PNG veya WebP. En fazla 5 MB.">
        <input type="file" name="image" accept="image/jpeg,image/png,image/webp" className="text-sm" />
      </Field>
      <Field label="Görsel alternatif metni">
        <input name="imageAlt" defaultValue={item?.image?.alt ?? ""} className={inputClass} />
      </Field>
      {item?.image ? (
        <label className="flex items-center gap-3 text-sm text-ink">
          <input type="checkbox" name="removeImage" className="size-4 accent-clay" />
          Mevcut görseli kaldır
        </label>
      ) : null}

      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published ?? true}
          className="size-4 accent-clay"
        />
        Sitede yayımlansın
      </label>

      {error ? (
        <p className="text-sm text-clay-strong" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : item ? "Sayfayı güncelle" : "Sayfayı kaydet"}
      </button>
    </form>
  );
}
