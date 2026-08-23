/**
 * İÇERİK NOTLARI — yalnızca geliştirme için.
 *
 * Bu dosya "bu alana ne yazılacak" ve "bu fotoğraf nasıl çekilecek" gibi
 * **iç talimatları** taşır. Site içeriğinden bilinçli olarak ayrıldı: daha önce
 * bu metinler `teacher.ts` içindeydi ve o dosya istemci bileşenlerine de
 * girdiği için talimatlar üretim JavaScript paketine sızıyordu.
 *
 * Kural: buradaki hiçbir metin ziyaretçiye gösterilmez ve yalnızca
 * `process.env.NODE_ENV !== "production"` dallarından okunur.
 */

export type PhotoSlotId = "hero" | "about" | "detail";

/** Çekim brief'leri. Fotoğraf gelene kadar geliştirmede hatırlatma olarak çıkar. */
export const photoBriefs: Record<PhotoSlotId, string> = {
  hero:
    "Alperen, kameraya hafif açıyla bakıyor. Bel üstü ya da 3/4 portre. Doğal gün ışığı, " +
    "sade arka plan (masa, kitaplık ya da düzenli çalışma odası). Tipografi için nefes payı.",
  about:
    "Daha doğal bir kare: masasında çalışırken, defter/kitap incelerken ya da not alırken. " +
    "Poz verilmiş 'ders anlatma' sahnesi olmasın.",
  detail:
    "Ortam detayı: defter, kitap, kalem, tahta notu ya da çalışan eller. " +
    "İnsan yüzü olmayabilir.",
};

/**
 * Bekleyen alanlara ne yazılacağı.
 * Anahtar, `pending("...")` çağrısındaki etiketle aynıdır.
 */
export const pendingHints: Record<string, string> = {
  "EĞİTİM BİLGİSİ": "Üniversite, bölüm ve mezuniyet yılı. Teyit edilmeden yazılmaz.",
  "DENEYİM BİLGİSİ": "Nerede, ne kadar süredir ders veriliyor? Sayı vermeden de yazılabilir.",
  "DERS BİLGİSİ": "Hangi derslerde destek veriliyor?",
  "SINIF SEVİYESİ": "Tam sınıf aralığı nedir? Örn. 4-8. sınıf.",
  "DERS FORMATI": "Dersler yüz yüze mi, online mı, ikisi de mi? Nerede yapılıyor?",
  "ŞEHİR BİLGİSİ": "Hangi şehir ve ilçede ders veriliyor?",
  "TANITIM YAZISI": "Alperen'in kendi cümleleriyle 2-3 paragraflık kişisel tanıtımı.",
  "GÖRÜŞME SAATLERİ": "Velilerin ne zaman ulaşabileceği. Örn. Hafta içi 17.00-21.00.",
  "WHATSAPP NUMARASI": "Uluslararası formatta, yalnızca rakam. Örn. 905XXXXXXXXX.",
  "TELEFON NUMARASI": "Görünen telefon numarası. Örn. +90 5XX XXX XX XX.",
  "E-POSTA ADRESİ": "Velilerin yazabileceği e-posta adresi.",
  "INSTAGRAM ADRESİ": "Varsa tam profil bağlantısı.",
};

export function hintFor(label: string): string {
  return pendingHints[label] ?? "Bu alan için gerçek bilgi bekleniyor.";
}
