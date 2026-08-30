const MAX_EDGE = 1920;
const QUALITY = 0.82;

/**
 * Dosya penceresinden gelen büyük telefon fotoğraflarını küçültür.
 * Birden fazla okul görseli aynı istekte 4–5 MB sınırını aşmasın diye
 * kayıttan önce tarayıcıda sıkıştırılır.
 */
export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size < 220_000) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      bitmap.close();
      return file;
    }
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", QUALITY);
    });
    if (!blob || blob.size === 0) return file;

    const name = file.name.replace(/\.[^.]+$/, "") || "gorsel";
    return new File([blob], `${name}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}

export function filesFromInput(form: FormData, key: string): File[] {
  return form.getAll(key).filter((item): item is File => item instanceof File && item.size > 0);
}
