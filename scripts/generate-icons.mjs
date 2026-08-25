/**
 * Site ikonlarını tek kaynaktan üretir.
 *
 * Kaynak: src/app/icon.svg (tarayıcıya doğrudan da servis edilir)
 * Üretilenler:
 *   src/app/favicon.ico        16 + 32 + 48 px (PNG gömülü ICO)
 *   src/app/apple-icon.png     180 px, tam kanama (iOS köşe maskesini kendi uygular)
 *   src/app/opengraph-image.jpg 1200 x 630, paylaşım kartı (portre + tipografi)
 *   src/app/twitter-image.jpg   aynı görsel
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
 * Portre varsa sağ tarafa yerleşir; yoksa kart tamamen tipografik kalır.
 * Kartta yalnızca teyitli bilgi var: isim, unvan, şehir, sınıf aralığı,
 * hazırlık verilen sınavlar ve alan adı.
 */
const portraitPath = join(root, "public", "fotograflar", "alperen-govrek-portre.jpg");
let portrait = null;
try {
  portrait = await sharp(portraitPath)
    .resize(430, 630, { position: "top" })
    .toBuffer();
} catch {
  // Portre henüz yoksa kart tipografik kalır.
}

const textWidth = portrait ? 700 : 1008;
const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fbf8f3"/>
  <rect x="0" y="0" width="1200" height="10" fill="#b4522f"/>
  <g transform="translate(80 96)">
    <rect width="108" height="108" rx="24" fill="#1b2330"/>
    <path d="M31.4 66.7 H76.6" fill="none" stroke="#c25f3a" stroke-width="7.4"/>
    <path d="M26.2 84.4 L54 23.6 L81.8 84.4" fill="none" stroke="#fbf8f3" stroke-width="8.8"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="80" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="#1b2330">Alperen Gövrek</text>
  <text x="80" y="390" font-family="'Segoe UI', Tahoma, sans-serif" font-size="30" fill="#5b6577" textLength="${
    textWidth > 700 ? "" : ""
  }">Matematik Öğretmeni ve Öğrenci Koçu</text>
  <text x="80" y="462" font-family="'Segoe UI', Tahoma, sans-serif" font-size="25" font-weight="600" fill="#9e4527" letter-spacing="1.5">DENİZLİ · 1-12. SINIF · LGS · TYT · AYT</text>
  <text x="80" y="530" font-family="'Segoe UI', Tahoma, sans-serif" font-size="23" fill="#5b6577">Birebir ders · Yüz yüze ve online</text>
  <text x="80" y="578" font-family="'Segoe UI', Tahoma, sans-serif" font-size="22" fill="#8b8578">alperengövrek.com</text>
</svg>`);

const ogBase = sharp(ogSvg, { density: 144 }).resize(1200, 630);
// Kartta fotoğraf olduğu için JPEG: aynı görsel PNG olarak ~5 kat büyüktü.
const ogBuffer = await (portrait
  ? ogBase.composite([{ input: portrait, left: 770, top: 0 }])
  : ogBase
)
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();
await writeFile(join(appDir, "opengraph-image.jpg"), ogBuffer);
await writeFile(join(appDir, "twitter-image.jpg"), ogBuffer);

console.log(
  `favicon.ico (${icoSizes.join(", ")} px), apple-icon.png (180 px) ve ` +
    "opengraph-image.jpg (1200x630) üretildi.",
);
