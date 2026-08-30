/** Görsel kaynağı next/image için güvenli bir string mi? */
export function isImageSrc(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const src = value.trim();
  return src.length > 0 && src !== "undefined" && src !== "null";
}

/** Blob ve diğer uzak URL'lerde optimizer kırılmasın diye optimize etme. */
export function skipImageOptimize(src: string): boolean {
  return /^https?:\/\//i.test(src);
}
