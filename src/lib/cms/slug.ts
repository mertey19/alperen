/** Türkçe başlıktan URL yolu. */
export function slugify(value: string): string {
  const from = "ığüşöçİĞÜŞÖÇ";
  const to = "igusocIGUSOC";
  let next = value.trim().toLocaleLowerCase("tr");
  for (let i = 0; i < from.length; i += 1) {
    next = next.replaceAll(from[i]!, to[i]!);
  }
  return next
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function newId(): string {
  return crypto.randomUUID();
}

export function uniqueSlug(
  desired: string,
  taken: ReadonlyArray<{ id: string; slug: string }>,
  excludeId?: string,
): string {
  const base = slugify(desired) || "yazi";
  let slug = base;
  let n = 2;
  while (taken.some((item) => item.slug === slug && item.id !== excludeId)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}
