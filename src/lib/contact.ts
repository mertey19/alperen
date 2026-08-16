import { factValue, teacher } from "@/config/teacher";

/**
 * İletişim bağlantıları.
 *
 * Backend yok: form da, kayıt da yok. Veli doğrudan Alperen'e yazar.
 * Numara henüz verilmediği için bu fonksiyonlar `null` dönebilir; butonlar
 * o durumda tıklanabilir olmak yerine "bilgi eklenecek" durumunda görünür.
 */

const DEFAULT_MESSAGE =
  `Merhaba ${teacher.informalName}, çocuğum için birebir ders desteği hakkında bilgi almak istiyorum.`;

export function whatsappUrl(message: string = DEFAULT_MESSAGE): string | null {
  const number = factValue(teacher.contact.whatsapp);
  if (!number) return null;
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function phoneHref(): string | null {
  const phone = factValue(teacher.contact.phone);
  if (!phone) return null;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function emailHref(subject = "Birebir ders hakkında bilgi"): string | null {
  const email = factValue(teacher.contact.email);
  if (!email) return null;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/** Herhangi bir iletişim kanalı hazır mı? Hazır değilse CTA'lar iletişim sayfasına yönlenir. */
export function hasAnyContactChannel(): boolean {
  return Boolean(whatsappUrl() || phoneHref() || emailHref());
}
