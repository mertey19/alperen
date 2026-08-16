/**
 * Site ikonlarını tek kaynaktan üretir.
 *
 * Kaynak: src/app/icon.svg (tarayıcıya doğrudan da servis edilir)
 * Üretilenler:
 *   src/app/favicon.ico   16 + 32 + 48 px (PNG gömülü ICO)
 *   src/app/apple-icon.png 180 px, tam kanama (iOS köşe maskesini kendi uygular)
 *
 * Çalıştırma: npm run icons
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "src", "app");

/** Vektör kaynağı yüksek yoğunlukta raster'lanır; küçük boyutlarda kenarlar temiz kalsın. */
const DENSITY = 900;

/** İkonun mürekkep zemini — apple-icon'da şeffaf köşeleri doldurmak için. */
const INK = { r: 0x1b, g: 0x23, b: 0x30, alpha: 1 };

/**
 * PNG gömülü ICO kabı (Vista+ biçimi).
 * 6 baytlık başlık + her görüntü için 16 baytlık dizin girdisi + ham PNG verisi.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // ayrılmış
  header.writeUInt16LE(1, 2); // tür: 1 = ikon
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;

  images.forEach((image, index) => {
    const entry = index * 16;
    directory.writeUInt8(image.size >= 256 ? 0 : image.size, entry + 0);
    directory.writeUInt8(image.size >= 256 ? 0 : image.size, entry + 1);
    directory.writeUInt8(0, entry + 2); // palet yok
    directory.writeUInt8(0, entry + 3); // ayrılmış
    directory.writeUInt16LE(1, entry + 4); // düzlem
    directory.writeUInt16LE(32, entry + 6); // bit derinliği
    directory.writeUInt32LE(image.data.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += image.data.length;
  });

  return Buffer.concat([header, directory, ...images.map((image) => image.data)]);
}

const svg = await readFile(join(appDir, "icon.svg"));
const render = (size) => sharp(svg, { density: DENSITY }).resize(size, size).png().toBuffer();

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await render(size) })),
);

await mkdir(appDir, { recursive: true });
await writeFile(join(appDir, "favicon.ico"), buildIco(icoImages));

// iOS ikonu şeffaflığı desteklemez ve köşeleri kendisi yuvarlar:
// yuvarlak köşelerin dışında kalan şeffaf alan aynı mürekkep rengiyle dolduruluyor.
await sharp(svg, { density: DENSITY })
  .resize(180, 180)
  .flatten({ background: INK })
  .png()
  .toFile(join(appDir, "apple-icon.png"));

console.log(`favicon.ico (${icoSizes.join(", ")} px) ve apple-icon.png (180 px) üretildi.`);
