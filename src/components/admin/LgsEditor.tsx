"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { areaClass, Field, inputClass } from "@/components/admin/ui";
import { saveLgsListAction, uploadCmsImageAction } from "@/lib/cms/actions";
import { compressImageFile } from "@/lib/cms/compress-image";
import { isImageSrc } from "@/lib/cms/media";
import { slugify } from "@/lib/cms/slug";
import type { CmsCover, CmsLgsList } from "@/lib/cms/types";

type RowDraft = {
  id: string;
  title: string;
  figure: string;
  period: string;
  body: string;
  source: string;
  imageAlt: string;
  images: CmsCover[];
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
    images: [],
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
    imageAlt: item.images.find((image) => isImageSrc(image.src))?.alt ?? "",
    images: item.images.filter((image) => isImageSrc(image.src)),
  }));
}

function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
  );
}

export function LgsEditor({ list }: { list?: CmsLgsList }) {
  const router = useRouter();
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
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
        setError(null);
        start(async () => {
          try {
            const nextImages: Record<string, CmsCover[]> = {};

            for (const row of rows) {
              const picked = [...(fileInputs.current[row.id]?.files ?? [])].filter(
                (file) => file.size > 0,
              );
              const uploaded: CmsCover[] = [];
              for (const [index, file] of picked.entries()) {
                const prepared = await compressImageFile(file);
                const payload = new FormData();
                payload.set("folder", "lgs");
                payload.set("id", `${row.id}-${index}-${crypto.randomUUID()}`);
                payload.set("file", prepared);
                const result = await uploadCmsImageAction(payload);
                if (!result.ok) {
                  setError(result.error);
                  return;
                }
                uploaded.push({ src: result.url, alt: row.imageAlt || row.title });
              }
              nextImages[row.id] = [...row.images, ...uploaded];
            }

            for (const key of [...formData.keys()]) {
              if (key.startsWith("image-")) formData.delete(key);
            }

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
                  images: nextImages[row.id] ?? row.images,
                })),
              ),
            );

            const result = await saveLgsListAction(formData);
            if (result && !result.ok) {
              setError(result.error);
              return;
            }
            router.push("/admin/lgs");
            router.refresh();
          } catch (caught) {
            if (isNextRedirect(caught)) throw caught;
            setError(caught instanceof Error ? caught.message : "Liste kaydedilemedi.");
          }
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
          placeholder="Örneğin 2025 LGS veya okul adı"
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Toplu liste — istatistik satırları
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Birden fazla okulu veya istatistiği aynı listede tutmak için Satır ekle kullanın.
            Kaydetmek tüm satırları birden yazar; her satır ayrı sayfa değildir. Her dolu satırda
            başlık, rakam, açıklama ve kaynak olmalı. Görseller isteğe bağlıdır; Ctrl veya Shift ile
            birden fazla dosya seçilir. Rakamlar kamuya açık kaynaktan olmalı.
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
                onClick={() => {
                  delete fileInputs.current[row.id];
                  setRows((current) => current.filter((item) => item.id !== row.id));
                }}
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
                placeholder="Okul veya istatistik adı"
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
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Görseller</span>
              <input
                type="file"
                ref={(element) => {
                  fileInputs.current[row.id] = element;
                }}
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="text-sm"
              />
              <span className="block text-sm leading-relaxed text-muted">
                İsteğe bağlı tablo veya grafik. Ctrl veya Shift ile birden fazla dosya seçin. JPEG,
                PNG veya WebP. Her dosya en fazla 5 MB; kayıtta küçültülür.
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

            {row.images.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {row.images.map((image) => (
                  <li key={image.src} className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of already stored asset */}
                    <img
                      src={image.src}
                      alt=""
                      className="max-h-32 rounded-xl border border-line object-contain"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patchRow(row.id, {
                          images: row.images.filter((item) => item.src !== image.src),
                        })
                      }
                      className="text-sm font-semibold text-clay-strong"
                    >
                      Görseli kaldır
                    </button>
                  </li>
                ))}
              </ul>
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
        {pending ? "Kaydediliyor…" : list ? "Listeyi güncelle" : "Toplu listeyi kaydet"}
      </button>
    </form>
  );
}
