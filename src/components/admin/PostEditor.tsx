"use client";

import { useState, useTransition } from "react";

import { areaClass, Field, inputClass } from "@/components/admin/ui";
import { savePostAction } from "@/lib/cms/actions";
import { slugify } from "@/lib/cms/slug";
import type { CmsPost } from "@/lib/cms/types";

type SectionDraft = { heading: string; body: string };

export function PostEditor({ post }: { post?: CmsPost }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [sections, setSections] = useState<SectionDraft[]>(
    post?.sections.map((section) => ({
      heading: section.heading,
      body: section.paragraphs.join("\n\n"),
    })) ?? [{ heading: "", body: "" }],
  );

  return (
    <form
      className="space-y-6"
      action={(formData) => {
        formData.set("sections", JSON.stringify(sections));
        setError(null);
        start(async () => {
          const result = await savePostAction(formData);
          if (result && !result.ok) setError(result.error);
        });
      }}
    >
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

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
        />
      </Field>

      <Field label="Adres (slug)" hint="Yazının /blog/ altındaki yolu. Boş bırakılırsa başlıktan üretilir.">
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

      <Field label="Kısa özet">
        <textarea name="description" required defaultValue={post?.description} className={areaClass} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Yayımlanma tarihi">
          <input
            type="date"
            name="publishedAt"
            defaultValue={(post?.publishedAt ?? new Date().toISOString()).slice(0, 10)}
            className={inputClass}
          />
        </Field>
        <label className="flex items-center gap-3 self-end pb-2 text-sm text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="size-4 accent-clay"
          />
          Sitede yayımlansın
        </label>
      </div>

      <Field label="Kapak görseli" hint="JPEG, PNG veya WebP. En fazla 5 MB.">
        <input type="file" name="cover" accept="image/jpeg,image/png,image/webp" className="text-sm" />
      </Field>
      <Field label="Kapak açıklaması">
        <input name="coverAlt" defaultValue={post?.cover?.alt ?? ""} className={inputClass} />
      </Field>
      {post?.cover ? (
        <label className="flex items-center gap-3 text-sm text-ink">
          <input type="checkbox" name="removeCover" className="size-4 accent-clay" />
          Mevcut kapağı kaldır
        </label>
      ) : null}

      <Field label="Giriş paragrafı">
        <textarea name="intro" required defaultValue={post?.intro} className={areaClass} />
      </Field>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Bölümler</p>
        {sections.map((section, index) => (
          <div key={index} className="space-y-3 rounded-card border border-line bg-paper p-5">
            <input
              value={section.heading}
              placeholder="Bölüm başlığı"
              onChange={(event) => {
                const next = [...sections];
                next[index] = { ...section, heading: event.target.value };
                setSections(next);
              }}
              className={inputClass}
            />
            <textarea
              value={section.body}
              placeholder="Paragrafları boş satırla ayırın."
              onChange={(event) => {
                const next = [...sections];
                next[index] = { ...section, body: event.target.value };
                setSections(next);
              }}
              className={`${areaClass} min-h-40`}
            />
            {sections.length > 1 ? (
              <button
                type="button"
                onClick={() => setSections(sections.filter((_, i) => i !== index))}
                className="text-sm font-semibold text-clay-strong"
              >
                Bölümü kaldır
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSections([...sections, { heading: "", body: "" }])}
          className="text-sm font-semibold text-clay-strong"
        >
          Bölüm ekle
        </button>
      </div>

      <Field label="Kapanış">
        <textarea name="closing" required defaultValue={post?.closing} className={areaClass} />
      </Field>

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
        {pending ? "Kaydediliyor…" : post ? "Yazıyı güncelle" : "Yazıyı kaydet"}
      </button>
    </form>
  );
}
