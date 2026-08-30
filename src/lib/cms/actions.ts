"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  adminPasswordConfigured,
  clearSession,
  createSession,
  hasSession,
  verifyPassword,
} from "./auth";
import { loginLimited, recordLoginFailure } from "./rate-limit";
import { newId, uniqueSlug } from "./slug";
import { updateCms } from "./store";
import type {
  CmsCover,
  CmsFaq,
  CmsGalleryItem,
  CmsLgsList,
  CmsLgsStat,
  CmsPost,
  CmsSection,
  CmsSettings,
  CmsTestimonial,
} from "./types";
import { saveUpload } from "./upload";

export type ActionResult = { ok: true } | { ok: false; error: string };
export type UploadActionResult =
  | { ok: true; url: string; id: string }
  | { ok: false; error: string };

const UPLOAD_FOLDERS = new Set(["blog", "galeri", "lgs"]);

async function requireAdmin(): Promise<void> {
  if (!(await hasSession())) redirect("/admin/login");
}

function clientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || headerList.get("x-real-ip") || "local";
}

function str(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function checked(form: FormData, key: string): boolean {
  const value = form.get(key);
  return value === "on" || value === "true" || value === "1";
}

function formFiles(form: FormData, key: string): File[] {
  return form.getAll(key).filter((item): item is File => item instanceof File && item.size > 0);
}

function filesForRow(form: FormData, rowId: string): File[] {
  const exact = formFiles(form, `image-${rowId}`);
  if (exact.length > 0) return exact;
  const extras: File[] = [];
  for (const [key, value] of form.entries()) {
    if (key === `image-${rowId}` || !key.startsWith(`image-${rowId}-`)) continue;
    if (value instanceof File && value.size > 0) extras.push(value);
  }
  return extras;
}

function parseUploadedPairs(raw: string): { id: string; src: string }[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const pairs: { id: string; src: string }[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const record = item as { id?: unknown; src?: unknown };
      const src = typeof record.src === "string" ? record.src.trim() : "";
      if (!src) continue;
      pairs.push({
        id: typeof record.id === "string" && record.id.trim() ? record.id.trim() : newId(),
        src,
      });
    }
    return pairs;
  } catch {
    return [];
  }
}

export async function uploadCmsImageAction(formData: FormData): Promise<UploadActionResult> {
  await requireAdmin();
  const folderRaw = str(formData, "folder");
  if (!UPLOAD_FOLDERS.has(folderRaw)) {
    return { ok: false, error: "Geçersiz yükleme klasörü." };
  }
  const folder = folderRaw as "blog" | "galeri" | "lgs";
  const file = formFiles(formData, "file")[0];
  if (!file) return { ok: false, error: "Yüklenecek dosya yok." };
  const id = str(formData, "id") || `${newId()}-${crypto.randomUUID()}`;

  try {
    const url = await saveUpload(file, folder, id);
    return { ok: true, url, id };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Görsel yüklenemedi." };
  }
}

function lines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function paragraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function refreshPublic(extra?: { blogSlug?: string; lgsSlugs?: string[] }): void {
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/admin/lgs");
  revalidatePath("/istatistiklerle-lgs", "layout");
  if (extra?.blogSlug) revalidatePath(`/blog/${extra.blogSlug}`);
  for (const slug of extra?.lgsSlugs ?? []) {
    if (slug) revalidatePath(`/istatistiklerle-lgs/${slug}`);
  }
}

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  if (!adminPasswordConfigured()) {
    return { ok: false, error: "Yönetim şifresi tanımlı değil. ADMIN_PASSWORD ekleyin." };
  }

  const ip = clientIp(await headers());
  if (loginLimited(ip)) {
    return { ok: false, error: "Çok fazla deneme. Lütfen 15 dakika sonra yeniden deneyin." };
  }

  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    recordLoginFailure(ip);
    return { ok: false, error: "Şifre yanlış." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}

function parseSections(raw: string): CmsSection[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const sections: CmsSection[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const record = item as { heading?: unknown; body?: unknown; paragraphs?: unknown };
    const heading = typeof record.heading === "string" ? record.heading.trim() : "";
    const fromBody = typeof record.body === "string" ? paragraphs(record.body) : [];
    const fromList = Array.isArray(record.paragraphs)
      ? record.paragraphs.map((line) => String(line).trim()).filter(Boolean)
      : [];
    const text = fromBody.length > 0 ? fromBody : fromList;
    if (!heading && text.length === 0) continue;
    sections.push({ heading: heading || "Bölüm", paragraphs: text });
  }
  return sections;
}

export async function savePostAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const title = str(formData, "title");
  if (!title) return { ok: false, error: "Başlık gerekli." };

  const description = str(formData, "description");
  const intro = str(formData, "intro");
  const closing = str(formData, "closing");
  if (!description || !intro || !closing) {
    return { ok: false, error: "Özet, giriş ve kapanış metinleri gerekli." };
  }

  const existingId = str(formData, "id") || newId();
  const publishedAtRaw = str(formData, "publishedAt") || new Date().toISOString().slice(0, 10);
  const publishedAt = publishedAtRaw.length === 10 ? `${publishedAtRaw}T00:00:00.000Z` : publishedAtRaw;
  const coverAlt = str(formData, "coverAlt");
  const removeCover = checked(formData, "removeCover");
  const coverFile = formData.get("cover");
  const sections = parseSections(str(formData, "sections"));
  const file = coverFile instanceof File && coverFile.size > 0 ? coverFile : null;

  try {
    let uploaded: string | null = null;
    if (file && !removeCover) {
      uploaded = await saveUpload(file, "blog", existingId);
    }

    await updateCms((state) => {
      const previous = state.posts.find((post) => post.id === existingId);
      const slug = uniqueSlug(str(formData, "slug") || title, state.posts, existingId);
      const cover = removeCover
        ? null
        : uploaded
          ? { src: uploaded, alt: coverAlt || title }
          : previous?.cover
            ? { ...previous.cover, alt: coverAlt || previous.cover.alt }
            : null;

      const next: CmsPost = {
        id: existingId,
        slug,
        title,
        description,
        publishedAt,
        published: checked(formData, "published"),
        cover,
        intro,
        sections,
        closing,
        updatedAt: new Date().toISOString(),
      };

      const posts = previous
        ? state.posts.map((post) => (post.id === existingId ? next : post))
        : [next, ...state.posts];

      return { ...state, posts };
    });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Yazı kaydedilemedi." };
  }

  refreshPublic();
  redirect("/admin/blog");
}

export async function deletePostAction(id: string): Promise<void> {
  await requireAdmin();
  await updateCms((state) => ({
    ...state,
    posts: state.posts.filter((post) => post.id !== id),
  }));
  refreshPublic();
}

export async function saveGalleryItemAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const title = str(formData, "title");
  const alt = str(formData, "alt");
  if (!title || !alt) return { ok: false, error: "Başlık ve alternatif metin gerekli." };

  const existingId = str(formData, "id") || null;
  const category = str(formData, "category") || "Galeri";
  const aspect = str(formData, "aspect") === "square" ? "square" : "landscape";
  const featured = checked(formData, "featured");
  const inSlider = checked(formData, "inSlider");
  const files = formFiles(formData, "image");
  const preUploaded = parseUploadedPairs(str(formData, "uploaded"));

  try {
    if (!existingId && files.length === 0 && preUploaded.length === 0) {
      return { ok: false, error: "Yeni görsel için bir dosya seçin." };
    }

    if (existingId) {
      const file = files[0] ?? null;
      let src: string | null = null;
      if (file) src = await saveUpload(file, "galeri", `${existingId}-${newId()}`);

      await updateCms((state) => {
        const previous = state.gallery.find((item) => item.id === existingId);
        if (!previous) return state;
        const next: CmsGalleryItem = {
          id: existingId,
          src: src ?? previous.src,
          alt,
          title,
          category,
          aspect,
          featured,
          inSlider,
        };
        return {
          ...state,
          gallery: state.gallery.map((item) => (item.id === existingId ? next : item)),
        };
      });
    } else {
      const uploaded = [...preUploaded];
      for (const [index, file] of files.entries()) {
        const id = newId();
        uploaded.push({ id, src: await saveUpload(file, "galeri", `${id}-${index}-${newId()}`) });
      }

      await updateCms((state) => {
        const added: CmsGalleryItem[] = uploaded.map(({ id, src }) => ({
          id,
          src,
          alt,
          title,
          category,
          aspect,
          featured,
          inSlider,
        }));
        return { ...state, gallery: [...state.gallery, ...added] };
      });
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Görsel kaydedilemedi." };
  }

  refreshPublic();
  return { ok: true };
}

export async function deleteGalleryItemAction(id: string): Promise<void> {
  await requireAdmin();
  await updateCms((state) => ({
    ...state,
    gallery: state.gallery.filter((item) => item.id !== id),
  }));
  refreshPublic();
}

export async function saveTestimonialAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const quote = str(formData, "quote");
  const role = str(formData, "role");
  const by = str(formData, "by");
  if (!quote || !role || !by) {
    return { ok: false, error: "Görüş, kim (veli/öğrenci) ve ad gerekli." };
  }

  const existingId = str(formData, "id") || newId();
  const date = str(formData, "date");

  await updateCms((state) => {
    const next: CmsTestimonial = { id: existingId, quote, role, by, date };
    const previous = state.testimonials.find((item) => item.id === existingId);
    const testimonials = previous
      ? state.testimonials.map((item) => (item.id === existingId ? next : item))
      : [...state.testimonials, next];
    return { ...state, testimonials };
  });

  refreshPublic();
  return { ok: true };
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  await requireAdmin();
  await updateCms((state) => ({
    ...state,
    testimonials: state.testimonials.filter((item) => item.id !== id),
  }));
  refreshPublic();
}

export async function saveFaqAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const question = str(formData, "question");
  const answer = str(formData, "answer");
  if (!question || !answer) return { ok: false, error: "Soru ve cevap gerekli." };

  const existingId = str(formData, "id") || newId();
  await updateCms((state) => {
    const next: CmsFaq = { id: existingId, question, answer };
    const previous = state.faqs.find((item) => item.id === existingId);
    const faqs = previous
      ? state.faqs.map((item) => (item.id === existingId ? next : item))
      : [...state.faqs, next];
    return { ...state, faqs };
  });

  refreshPublic();
  return { ok: true };
}

export async function deleteFaqAction(id: string): Promise<void> {
  await requireAdmin();
  await updateCms((state) => ({
    ...state,
    faqs: state.faqs.filter((item) => item.id !== id),
  }));
  refreshPublic();
}

type LgsItemDraft = {
  id?: unknown;
  title?: unknown;
  figure?: unknown;
  period?: unknown;
  body?: unknown;
  source?: unknown;
  imageAlt?: unknown;
  images?: unknown;
};

function parseLgsItemDrafts(raw: string): LgsItemDraft[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseKeepImages(value: unknown): CmsCover[] {
  if (!Array.isArray(value)) return [];
  const images: CmsCover[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as { src?: unknown; alt?: unknown };
    const src = typeof record.src === "string" ? record.src.trim() : "";
    if (!src) continue;
    images.push({
      src,
      alt: typeof record.alt === "string" ? record.alt.trim() : "",
    });
  }
  return images;
}

export async function saveLgsListAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const title = str(formData, "title");
  if (!title) return { ok: false, error: "Liste başlığı gerekli." };

  const existingId = str(formData, "id") || newId();
  const description = str(formData, "description");
  const drafts = parseLgsItemDrafts(str(formData, "items"));

  type PreparedRow = {
    id: string;
    title: string;
    figure: string;
    period: string;
    body: string;
    source: string;
    imageAlt: string;
    keepImages: CmsCover[];
    uploaded: string[];
  };

  const prepared: PreparedRow[] = [];

  try {
    for (const draft of drafts) {
      const id = typeof draft.id === "string" && draft.id.trim() ? draft.id.trim() : newId();
      const files = filesForRow(formData, id);
      const rowTitle = typeof draft.title === "string" ? draft.title.trim() : "";
      const figure = typeof draft.figure === "string" ? draft.figure.trim() : "";
      const period = typeof draft.period === "string" ? draft.period.trim() : "";
      const body = typeof draft.body === "string" ? draft.body.trim() : "";
      const source = typeof draft.source === "string" ? draft.source.trim() : "";
      const keepImages = parseKeepImages(draft.images);

      if (!rowTitle && !figure && !body && !source && !period && files.length === 0 && keepImages.length === 0) {
        continue;
      }
      if (!rowTitle || !figure || !body || !source) {
        return {
          ok: false,
          error: "Her dolu satırda başlık, rakam, açıklama ve kaynak gerekli.",
        };
      }

      const uploaded: string[] = [];
      for (const [index, file] of files.entries()) {
        uploaded.push(await saveUpload(file, "lgs", `${id}-${index}-${newId()}`));
      }

      prepared.push({
        id,
        title: rowTitle,
        figure,
        period,
        body,
        source,
        imageAlt: typeof draft.imageAlt === "string" ? draft.imageAlt.trim() : "",
        keepImages,
        uploaded,
      });
    }

    let savedSlug = "";
    let previousSlug: string | undefined;

    await updateCms((state) => {
      const previous = state.lgsLists.find((list) => list.id === existingId);
      previousSlug = previous?.slug;
      const slug = uniqueSlug(str(formData, "slug") || title, state.lgsLists, existingId, "liste");
      savedSlug = slug;

      const items: CmsLgsStat[] = prepared.map((row) => {
        const previousItem = previous?.items.find((item) => item.id === row.id);
        const alt = row.imageAlt || row.title;
        const images: CmsCover[] = [
          ...row.keepImages.map((image) => ({
            src: image.src,
            alt: alt || image.alt,
          })),
          ...row.uploaded.map((src) => ({ src, alt })),
        ];
        const item: CmsLgsStat = {
          id: row.id,
          title: row.title,
          figure: row.figure,
          period: row.period,
          body: row.body,
          source: row.source,
          images,
        };
        if (previousItem?.slug) item.slug = previousItem.slug;
        return item;
      });

      const next: CmsLgsList = {
        id: existingId,
        title,
        slug,
        description,
        published: checked(formData, "published"),
        updatedAt: new Date().toISOString(),
        items,
      };

      const lgsLists = previous
        ? state.lgsLists.map((list) => (list.id === existingId ? next : list))
        : [next, ...state.lgsLists];

      return { ...state, lgsLists };
    });

    const slugs = [savedSlug, previousSlug].filter((slug): slug is string => Boolean(slug));
    refreshPublic({ lgsSlugs: slugs });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Liste kaydedilemedi." };
  }

  return { ok: true };
}

export async function deleteLgsListAction(id: string): Promise<void> {
  await requireAdmin();
  let slug: string | undefined;
  await updateCms((state) => {
    slug = state.lgsLists.find((list) => list.id === id)?.slug;
    return {
      ...state,
      lgsLists: state.lgsLists.filter((list) => list.id !== id),
    };
  });
  refreshPublic({ lgsSlugs: slug ? [slug] : [] });
}

export async function saveSettingsAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  await updateCms((state) => {
    const current = state.settings;
    const pick = (key: keyof CmsSettings): string | undefined =>
      formData.has(key) ? str(formData, key) : undefined;
    const pickList = (key: keyof CmsSettings): string[] | undefined =>
      formData.has(key) ? lines(str(formData, String(key))) : undefined;

    const settings: CmsSettings = {
      whatsapp: pick("whatsapp") ?? current.whatsapp,
      phone: pick("phone") ?? current.phone,
      email: pick("email") ?? current.email,
      instagram: pick("instagram") ?? current.instagram,
      availability: pick("availability") ?? current.availability,
      location: pick("location") ?? current.location,
      gradeRange: pick("gradeRange") ?? current.gradeRange,
      audience: pick("audience") ?? current.audience,
      subjects: pickList("subjects") ?? current.subjects,
      examPrep: pickList("examPrep") ?? current.examPrep,
      lessonFormat: pickList("lessonFormat") ?? current.lessonFormat,
      education: pickList("education") ?? current.education,
      experience: pickList("experience") ?? current.experience,
      introduction: pickList("introduction") ?? current.introduction,
    };

    return { ...state, settings };
  });

  refreshPublic();
  return { ok: true };
}
