/**
 * Site ikonlarını tek kaynaktan üretir.
 *
 * Kaynak: src/app/icon.svg (tarayıcıya doğrudan da servis edilir)
 * Üretilenler:
 *   src/app/favicon.ico        16 + 32 + 48 px (PNG gömülü ICO)
 *   src/app/apple-icon.png     180 px, tam kanama (iOS köşe maskesini kendi uygular)
 *   src/app/opengraph-image.png 1200 x 630, paylaşım kartı
 *   src/app/twitter-image.png   aynı görsel
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

/**
 * Paylaşım kartı.
 *
 * Tipografik: fotoğraf yok, uydurma görsel yok. Kartta yalnızca isim, yapılan
 * işin tanımı ve alan adı var — hepsi teyitli bilgi. Yazı tipi olarak sistemde
 * kesin bulunan aileler seçildi; SVG raster'lanırken web fontu yüklenemiyor.
 */
const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fbf8f3"/>
  <rect x="0" y="0" width="1200" height="10" fill="#b4522f"/>
  <g transform="translate(96 168)">
    <rect width="132" height="132" rx="29" fill="#1b2330"/>
    <path d="M38.4 81.5 H93.6" fill="none" stroke="#c25f3a" stroke-width="9.1"/>
    <path d="M32 103 L66 28.9 L100 103" fill="none" stroke="#fbf8f3" stroke-width="10.7"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="96" y="382" font-family="Georgia, 'Times New Roman', serif" font-size="86" fill="#1b2330">Alperen Gövrek</text>
  <text x="96" y="446" font-family="'Segoe UI', Tahoma, sans-serif" font-size="34" fill="#5b6577">${"İlkokul ve Ortaokul Matematik Desteği"}</text>
  <text x="96" y="510" font-family="'Segoe UI', Tahoma, sans-serif" font-size="28" font-weight="600" fill="#9e4527" letter-spacing="2">DENİZLİ · BİREBİR DERS · YÜZ YÜZE VE ONLİNE</text>
  <text x="96" y="576" font-family="'Segoe UI', Tahoma, sans-serif" font-size="24" fill="#5b6577">alperengövrek.com</text>
</svg>`);

// Tam 1200x630 üretilir: paylaşım kartları bu ölçüyü bekler ve dosya küçük kalır.
const ogBuffer = await sharp(ogSvg, { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(join(appDir, "opengraph-image.png"), ogBuffer);
await writeFile(join(appDir, "twitter-image.png"), ogBuffer);

console.log(
  `favicon.ico (${icoSizes.join(", ")} px), apple-icon.png (180 px) ve ` +
    "opengraph-image.png (1200x630) üretildi.",
);
