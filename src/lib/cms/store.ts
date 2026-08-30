import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { connection } from "next/server";

import { newId, uniqueSlug } from "./slug";
import { seedState } from "./seed";
import type { CmsCover, CmsLgsList, CmsLgsStat, CmsState } from "./types";
import { CMS_VERSION } from "./types";

type StoredState = Omit<CmsState, "lgsLists"> & {
  lgsLists?: unknown;
  lgsStats?: unknown;
};

const FILE_PATH = join(process.cwd(), "data", "cms.json");
const BLOB_PATH = "cms/state.json";
const DEFAULT_LIST_ID = "lgs-list-default";
const DEFAULT_LIST_TITLE = "İstatistiklerle LGS";

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function cmsPersistsOnThisHost(): boolean {
  if (hasBlobToken()) return true;
  return process.env.VERCEL !== "1";
}

function isState(value: unknown): value is StoredState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as StoredState;
  return (
    candidate.version === CMS_VERSION &&
    Array.isArray(candidate.posts) &&
    Array.isArray(candidate.gallery) &&
    Array.isArray(candidate.testimonials) &&
    Array.isArray(candidate.faqs) &&
    Boolean(candidate.settings)
  );
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isPublishedFlag(value: unknown): boolean {
  return value !== false && value !== "false" && value !== 0 && value !== "0";
}

function normalizeCover(value: unknown): CmsCover | null {
  if (!value || typeof value !== "object") return null;
  const record = value as { src?: unknown; alt?: unknown };
  const src = asString(record.src);
  if (!src) return null;
  return { src, alt: asString(record.alt) };
}

function normalizeLgsStat(value: unknown): CmsLgsStat | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = asString(record.title);
  const figure = asString(record.figure);
  const body = asString(record.body);
  const source = asString(record.source);
  if (!title && !figure && !body && !source) return null;

  const item: CmsLgsStat = {
    id: asString(record.id) || newId(),
    title,
    figure,
    period: asString(record.period),
    body,
    source,
    image: normalizeCover(record.image),
  };
  const slug = asString(record.slug);
  if (slug) item.slug = slug;
  return item;
}

function normalizeLgsList(value: unknown, taken: CmsLgsList[]): CmsLgsList | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const title = asString(record.title) || DEFAULT_LIST_TITLE;
  const id = asString(record.id) || newId();
  const items = Array.isArray(record.items)
    ? record.items.map(normalizeLgsStat).filter((item): item is CmsLgsStat => item !== null)
    : [];

  return {
    id,
    title,
    slug: uniqueSlug(asString(record.slug) || title, taken, id, "liste"),
    description: asString(record.description),
    published: record.published === undefined ? true : isPublishedFlag(record.published),
    updatedAt: asString(record.updatedAt) || new Date().toISOString(),
    items,
  };
}

function migrateLegacyStats(stats: unknown[]): CmsLgsList {
  const items = stats.map(normalizeLgsStat).filter((item): item is CmsLgsStat => item !== null);
  const dates = stats
    .map((raw) => (raw && typeof raw === "object" ? asString((raw as { updatedAt?: unknown }).updatedAt) : ""))
    .filter(Boolean)
    .sort();
  const anyPublished = stats.some((raw) => {
    if (!raw || typeof raw !== "object") return false;
    return isPublishedFlag((raw as { published?: unknown }).published);
  });

  return {
    id: DEFAULT_LIST_ID,
    title: DEFAULT_LIST_TITLE,
    slug: uniqueSlug(DEFAULT_LIST_TITLE, [], DEFAULT_LIST_ID, "liste"),
    description: "",
    published: items.length === 0 ? false : anyPublished,
    updatedAt: dates.at(-1) || new Date().toISOString(),
    items,
  };
}

function normalizeLgsLists(state: StoredState): CmsLgsList[] {
  if (Array.isArray(state.lgsLists)) {
    const lists: CmsLgsList[] = [];
    for (const raw of state.lgsLists) {
      const list = normalizeLgsList(raw, lists);
      if (list) lists.push(list);
    }
    return lists;
  }

  if (Array.isArray(state.lgsStats) && state.lgsStats.length > 0) {
    return [migrateLegacyStats(state.lgsStats)];
  }

  return [];
}

function normalizeState(state: StoredState): CmsState {
  return {
    version: CMS_VERSION,
    posts: state.posts,
    gallery: state.gallery,
    testimonials: state.testimonials,
    faqs: state.faqs,
    settings: state.settings,
    lgsLists: normalizeLgsLists(state),
  };
}

async function parseBlobResult(result: { statusCode: number; stream: ReadableStream | null } | null): Promise<CmsState | null> {
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  const parsed: unknown = JSON.parse(text);
  return isState(parsed) ? normalizeState(parsed) : null;
}

async function readBlob(): Promise<CmsState | null> {
  if (!hasBlobToken()) return null;
  const { get } = await import("@vercel/blob");
  // Public store: useCache: false / cache=0 yalnızca private depoda çalışır.
  const published = await get(BLOB_PATH, { access: "public" });
  return parseBlobResult(published);
}

async function writeBlob(state: CmsState): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(BLOB_PATH, JSON.stringify(state), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

let memoryState: CmsState | null = null;
let memoryAt = 0;
const MEMORY_MS = 8_000;

async function readFileState(): Promise<CmsState | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isState(parsed) ? normalizeState(parsed) : null;
  } catch {
    return null;
  }
}

async function writeFileState(state: CmsState): Promise<void> {
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(FILE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

let writeQueue: Promise<void> = Promise.resolve();

function enqueue<T>(work: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(work, work);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function readCms(): Promise<CmsState> {
  await connection();
  if (memoryState && Date.now() - memoryAt < MEMORY_MS) return memoryState;

  if (hasBlobToken()) {
    try {
      const fromBlob = await readBlob();
      if (fromBlob) {
        memoryState = fromBlob;
        memoryAt = Date.now();
        return fromBlob;
      }
    } catch {
      // İlk kayıt henüz yoksa tohum kullanılır.
    }
  }

  const fromFile = await readFileState();
  if (fromFile) {
    memoryState = fromFile;
    memoryAt = Date.now();
    return fromFile;
  }
  const seeded = seedState();
  memoryState = seeded;
  memoryAt = Date.now();
  return seeded;
}

async function persist(state: CmsState): Promise<void> {
  memoryState = state;
  memoryAt = Date.now();
  if (hasBlobToken()) {
    await writeBlob(state);
    return;
  }
  await writeFileState(state);
}

export async function writeCms(state: CmsState): Promise<void> {
  await enqueue(async () => {
    await persist(state);
  });
}

export async function updateCms(mutator: (state: CmsState) => CmsState | Promise<CmsState>): Promise<CmsState> {
  return enqueue(async () => {
    const current = await readCms();
    const next = await mutator(structuredClone(current));
    await persist(next);
    return next;
  });
}
