import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { connection } from "next/server";

import { seedState } from "./seed";
import type { CmsState } from "./types";
import { CMS_VERSION } from "./types";

const FILE_PATH = join(process.cwd(), "data", "cms.json");
const BLOB_PATH = "cms/state.json";

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function cmsPersistsOnThisHost(): boolean {
  if (hasBlobToken()) return true;
  return process.env.VERCEL !== "1";
}

function isState(value: unknown): value is CmsState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as CmsState;
  return (
    candidate.version === CMS_VERSION &&
    Array.isArray(candidate.posts) &&
    Array.isArray(candidate.gallery) &&
    Array.isArray(candidate.testimonials) &&
    Array.isArray(candidate.faqs) &&
    Boolean(candidate.settings)
  );
}

async function readBlob(): Promise<CmsState | null> {
  if (!hasBlobToken()) return null;
  const { get } = await import("@vercel/blob");
  const result = await get(BLOB_PATH, { access: "public", useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  const parsed: unknown = JSON.parse(text);
  return isState(parsed) ? parsed : null;
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

async function readFileState(): Promise<CmsState | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isState(parsed) ? parsed : null;
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
  if (hasBlobToken()) {
    try {
      const fromBlob = await readBlob();
      if (fromBlob) return fromBlob;
    } catch {
      // İlk kayıt henüz yoksa tohum kullanılır.
    }
  }

  const fromFile = await readFileState();
  if (fromFile) return fromFile;
  return seedState();
}

export async function writeCms(state: CmsState): Promise<void> {
  await enqueue(async () => {
    if (hasBlobToken()) {
      await writeBlob(state);
      return;
    }
    await writeFileState(state);
  });
}

export async function updateCms(mutator: (state: CmsState) => CmsState | Promise<CmsState>): Promise<CmsState> {
  return enqueue(async () => {
    const current = await readCms();
    const next = await mutator(structuredClone(current));
    if (hasBlobToken()) await writeBlob(next);
    else await writeFileState(next);
    return next;
  });
}
