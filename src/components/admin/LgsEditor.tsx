"use client";

import { useState, useTransition } from "react";

import { areaClass, Field, inputClass } from "@/components/admin/ui";
import { saveLgsListAction } from "@/lib/cms/actions";
import { slugify } from "@/lib/cms/slug";
import type { CmsLgsList } from "@/lib/cms/types";

type RowDraft = {
  id: string;
  title: string;
  figure: string;
  period: string;
  body: string;
  source: string;
  imageAlt: string;
  imageSrc: string | null;
  removeImage: boolean;
};

function emptyRow(): RowDraft {
  return {
    id: crypto.randomUUID(),
    title: "",
    figure: "",
    period: "",
    body: "",
    source: "",
    imageAlt: "",
    imageSrc: null,
    removeImage: false,
  };
}

function rowsFromList(list?: CmsLgsList): RowDraft[] {
  if (!list || list.items.length === 0) return [emptyRow()];
  return list.items.map((item) => ({
    id: item.id,
    title: item.title,
    figure: item.figure,
    period: item.period,
    body: item.body,
    source: item.source,
    imageAlt: item.image?.alt ?? "",
    imageSrc: item.image?.src ?? null,
    removeImage: false,
  }));
}

export function LgsEditor({ list }: { list?: CmsLgsList }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(list?.title ?? "");
  const [slug, setSlug] = useState(list?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(list?.slug));
  const [rows, setRows] = useState<RowDraft[]>(() => rowsFromList(list));

  const patchRow = (id: string, patch: Partial<RowDraft>) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  return (
    <form
      className="space-y-6"
      action={(formData) => {
        formData.set(
          "items",
          JSON.stringify(
            rows.map((row) => ({
              id: row.id,
              title: row.title,
              figure: row.figure,
              period: row.period,
              body: row.body,
              source: row.source,
              imageAlt: row.imageAlt,
              removeImage: row.removeImage,
            })),
          ),
        );
        setError(null);
        start(async () => {
          const result = await saveLgsListAction(formData);
          if (result && !result.ok) setError(result.error);
        });
      }}
    >
      {list ? <input type="hidden" name="id" value={list.id} /> : null}

      <Field label="Liste başlığı">
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
          placeholder="Örneğin 2025 LGS"
        />
      </Field>

      <Field
        label="Adres (slug)"
        hint="Listenin /istatistiklerle-lgs/ altındaki yolu. Boş bırakılırsa başlıktan üretilir."
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

      <Field label="Kısa açıklama" hint="İsteğe bağlı. Hub sayfasında listenin altında görünür.">
        <textarea name="description" defaultValue={list?.description} className={areaClass} />
      </Field>

      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={list?.published ?? true}
          className="size-4 accent-clay"
        />
        Sitede yayımlansın
      </label>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">İstatistik satırları</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Aynı listede birden fazla satır ekleyebilirsiniz. Kaydetmek tüm satırları birden yazar.
            Rakamlar kamuya açık kaynaktan olmalı; öğrenci sonucu veya doğrulanmamış başarı yüzdesi
            yazmayın.
          </p>
        </div>

        {rows.map((row, index) => (
          <div key={row.id} className="space-y-4 rounded-card border border-line bg-paper p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Satır {index + 1}
              </p>
              <button
                type="button"
                onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
                className="text-sm font-semibold text-clay-strong"
              >
                Satırı kaldır
              </button>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Başlık</span>
              <input
                value={row.title}
                onChange={(event) => patchRow(row.id, { title: event.target.value })}
                className={inputClass}
                placeholder="Örneğin sınava giren öğrenci sayısı"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Rakam</span>
              <input
                value={row.figure}
                onChange={(event) => patchRow(row.id, { figure: event.target.value })}
                className={inputClass}
                placeholder="Kaynağın yazdığı gibi"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Dönem</span>
              <input
                value={row.period}
                onChange={(event) => patchRow(row.id, { period: event.target.value })}
                className={inputClass}
                placeholder="İsteğe bağlı. Örneğin 2025 LGS"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Açıklama</span>
              <textarea
                value={row.body}
                onChange={(event) => patchRow(row.id, { body: event.target.value })}
                className={areaClass}
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Kaynak</span>
              <input
                value={row.source}
                onChange={(event) => patchRow(row.id, { source: event.target.value })}
                className={inputClass}
                placeholder="MEB raporu, resmî duyuru vb."
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Görsel</span>
              <input
                type="file"
                name={`image-${row.id}`}
                accept="image/jpeg,image/png,image/webp"
                className="text-sm"
              />
              <span className="block text-sm leading-relaxed text-muted">
                İsteğe bağlı tablo veya grafik. JPEG, PNG veya WebP. En fazla 5 MB.
              </span>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Görsel alternatif metni
              </span>
              <input
                value={row.imageAlt}
                onChange={(event) => patchRow(row.id, { imageAlt: event.target.value })}
                className={inputClass}
              />
            </label>

            {row.imageSrc && !row.removeImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview of already stored asset
              <img
                src={row.imageSrc}
                alt=""
                className="max-h-32 rounded-xl border border-line object-contain"
              />
            ) : null}

            {row.imageSrc ? (
              <label className="flex items-center gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={row.removeImage}
                  onChange={(event) => patchRow(row.id, { removeImage: event.target.checked })}
                  className="size-4 accent-clay"
                />
                Mevcut görseli kaldır
              </label>
            ) : null}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRows((current) => [...current, emptyRow()])}
          className="text-sm font-semibold text-clay-strong"
        >
          Satır ekle
        </button>
      </div>

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
        {pending ? "Kaydediliyor…" : list ? "Listeyi güncelle" : "Listeyi kaydet"}
      </button>
    </form>
  );
}
