import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function saveUpload(
  file: File,
  folder: "blog" | "galeri" | "lgs",
  id: string,
): Promise<string> {
  if (!ALLOWED.has(file.type)) {
    throw new Error("Yalnızca JPEG, PNG veya WebP yüklenebilir.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Görsel 5 MB'dan büyük olamaz.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(buffer).rotate().webp({ quality: 84 }).toBuffer();
  const filename = `${id}.webp`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${folder}/${filename}`, webp, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "image/webp",
    });
    return blob.url;
  }

  const dir = join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), webp);
  return `/uploads/${folder}/${filename}`;
}
