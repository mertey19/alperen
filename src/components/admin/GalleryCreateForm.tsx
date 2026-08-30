"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Field, inputClass } from "@/components/admin/ui";
import { compressImageFile, filesFromInput } from "@/lib/cms/compress-image";
import { saveGalleryItemAction, uploadCmsImageAction } from "@/lib/cms/actions";

export function GalleryCreateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, start] = useTransition();

  return (
    <form
      className="mt-8 space-y-4 rounded-card border border-line bg-paper p-6"
      action={(formData) => {
        setError(null);
        setSuccess(false);
        start(async () => {
          const files = filesFromInput(formData, "image");
          if (files.length === 0) {
            setError("Yeni görsel için bir dosya seçin.");
            return;
          }

          const uploaded: { id: string; src: string }[] = [];
          for (const [index, file] of files.entries()) {
            const prepared = await compressImageFile(file);
            const payload = new FormData();
            payload.set("folder", "galeri");
            payload.set("id", `${crypto.randomUUID()}-${index}`);
            payload.set("file", prepared);
            const result = await uploadCmsImageAction(payload);
            if (!result.ok) {
              setError(result.error);
              return;
            }
            uploaded.push({ id: result.id, src: result.url });
          }

          formData.delete("image");
          formData.set("uploaded", JSON.stringify(uploaded));
          const saved = await saveGalleryItemAction(formData);
          if (saved && !saved.ok) {
            setError(saved.error);
            return;
          }
          setSuccess(true);
          router.refresh();
        });
      }}
    >
      <h2 className="font-display text-xl text-ink">Yeni görsel</h2>
      <Field
        label="Dosyalar"
        hint="Ctrl veya Shift ile birden fazla görsel seçebilirsiniz. JPEG, PNG veya WebP. Her dosya en fazla 5 MB; kayıtta küçültülür."
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
      {error ? (
        <p className="text-sm text-clay-strong" role="alert">
          {error}
        </p>
      ) : null}
      {success ? <p className="text-sm text-muted">Görseller kaydedildi.</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2 disabled:opacity-60"
      >
        {pending ? "Yükleniyor…" : "Yükle"}
      </button>
    </form>
  );
}
