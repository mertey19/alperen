/**
 * ALPEREN GÖVREK — sitenin tek gerçek kaynağı.
 *
 * SIFIR UYDURMA POLİTİKASI
 * ------------------------
 * Bu sitede Alperen Gövrek hakkında hiçbir bilgi tahmin edilmez, örneklenmez veya
 * "pazarlama dili" olsun diye yazılmaz. Doğrulanmamış her alan `pending(...)` ile
 * işaretlenir; arayüzde gözle görülür bir "eklenecek" rozeti olarak çıkar, SEO
 * metadata'sına ve JSON-LD'ye ise hiç girmez.
 *
 * Bir bilgi netleştiğinde yapılacak tek şey: ilgili satırda `pending(...)` yerine
 * `confirmed("gerçek bilgi")` yazmak. Başka hiçbir dosyaya dokunmak gerekmez.
 */

export type Fact<T> =
  | { readonly status: "confirmed"; readonly value: T }
  | { readonly status: "pending"; readonly label: string; readonly hint: string };

/** Alperen tarafından teyit edilmiş bilgi. Sitede ve SEO'da serbestçe kullanılır. */
export function confirmed<T>(value: T): Fact<T> {
  return { status: "confirmed", value };
}

/**
 * Henüz verilmemiş bilgi.
 * `label` arayüzde `[LABEL EKLENECEK]` olarak görünür, `hint` ise geliştirme
 * panelinde "bu alana tam olarak ne yazılacak" notudur.
 */
export function pending<T = never>(label: string, hint: string): Fact<T> {
  return { status: "pending", label, hint };
}

export function isConfirmed<T>(fact: Fact<T>): fact is { status: "confirmed"; value: T } {
  return fact.status === "confirmed";
}

/** Teyitliyse değeri, değilse null döner. SEO tarafında bilinçli olarak null kullanılır. */
export function factValue<T>(fact: Fact<T>): T | null {
  return fact.status === "confirmed" ? fact.value : null;
}

export type PhotoSlot = {
  /** Dosya `public/` altına konup yolu buraya yazılınca placeholder yerine gerçek fotoğraf basılır. */
  readonly src: string | null;
  readonly alt: string;
  readonly aspect: "portrait" | "square" | "landscape";
  /** Çekim brief'i — placeholder kutusunda ve README'de görünür. */
  readonly brief: string;
};

const photo = (slot: PhotoSlot): PhotoSlot => slot;

export const teacher = {
  /** Sitenin merkezindeki kişi. Marka bu isimdir; kurum adı yoktur. */
  name: "Alperen Gövrek",
  /** Velilerin günlük dilde kullandığı hitap. CTA metinlerinde bilinçli tercih edilir. */
  informalName: "Alperen Hoca",
  /** Navbar'daki küçük ikincil satır. Unvan değil, hizmet tanımıdır. */
  descriptor: "Birebir Eğitim",
  /** Uzun tanım — hero altı, footer ve metadata. Unvan iddiası içermez. */
  role: "İlkokul ve Ortaokul Matematik Desteği",

  /**
   * Kullanıcının verdiği tanımdan birebir gelir: ilkokul ve ortaokul öğrencileri.
   * Sınıf aralığı ayrıca teyit edilmediği için burada sınıf numarası iddia edilmez.
   */
  audience: confirmed("İlkokul ve ortaokul öğrencileri"),

  /**
   * Ders verilen branş. Tek branş olduğu için başlık ve açıklama metinleri de
   * `lib/seo.ts` içinde bu değerden türetilir; buraya ikinci bir ders eklenirse
   * metinler otomatik olarak genel ifadeye döner.
   */
  subjects: confirmed(["Matematik"]),

  /** Desteklenen sınıf seviyeleri (sayısal aralık). */
  gradeRange: confirmed("1-8. sınıf"),

  /** Ders formatı. */
  lessonFormat: confirmed([
    "Denizli'de birebir yüz yüze ders",
    "Şehir dışından online birebir ders",
  ]),

  /** Şehir / ilçe. İlçe ayrıca teyit edilmediği için yalnızca il yazılıdır. */
  location: confirmed("Denizli"),

  /** Üniversite / bölüm / mezuniyet. */
  education: pending<readonly string[]>(
    "EĞİTİM BİLGİSİ",
    "Üniversite, bölüm ve mezuniyet yılı. Teyit edilmeden yazılmaz.",
  ),

  /** Öğretmenlik deneyimi. Süre, öğrenci sayısı ve başarı oranı asla tahmin edilmez. */
  experience: pending<readonly string[]>(
    "DENEYİM BİLGİSİ",
    "Nerede, ne kadar süredir ders veriliyor? Sayı vermeden de yazılabilir.",
  ),

  /**
   * Alperen'in kendi ağzından kısa tanıtım.
   *
   * DİKKAT — bu metin bir TASLAKTIR, Alperen'in yazdığı cümleler değildir.
   * Yalnızca sitede zaten yazılı olan çalışma biçiminden ve teyitli bilgilerden
   * (Denizli, 1-8. sınıf, birebir destek) kuruldu; doğrulanamayacak hiçbir
   * iddia içermez. Alperen okuyup kendi cümleleriyle değiştirmeli.
   */
  introduction: confirmed([
    "Merhaba, ben Alperen. Denizli'de 1-8. sınıf öğrencileriyle birebir matematik çalışıyorum. " +
      "Şehir dışındaki öğrencilerle online devam ediyoruz.",
    "Bir öğrenciyle çalışmaya başlarken ilk merak ettiğim şey sınıf seviyesi değil, nerede " +
      "zorlandığı oluyor. Matematikte eksik bir konu bırakıldığında üstüne gelen her konu " +
      "daha zor öğreniliyor; bu yüzden ders planını öğrenciyi gördükten sonra yapıyorum.",
    "Veliyle iletişimi de sürecin bir parçası sayıyorum. Çocuğun nerede ilerlediğini ve nerede " +
      "desteğe ihtiyacı olduğunu düzenli olarak paylaşmadığım bir ders sürecinin eksik " +
      "kaldığını düşünüyorum.",
  ]),

  contact: {
    /** Uluslararası formatta, yalnızca rakam: wa.me bağlantısı bundan üretilir. */
    whatsapp: confirmed("905513965531"),
    phone: confirmed("+90 551 396 55 31"),
    email: confirmed("alperengovrek@gmail.com"),
    instagram: confirmed("https://www.instagram.com/alperengovrek/"),
    /**
     * Görüşme saatleri.
     * Belirli bir saat aralığı verilmediği için taahhüt içermeyen ifade seçildi;
     * sabit saatler netleşirse buraya yazılır.
     */
    availability: confirmed("Randevu ile"),
  },

  /**
   * Fotoğraf slotları. Hiçbiri stok görsel değildir; dosya gelene kadar sitede
   * çekim brief'ini gösteren zarif bir yer tutucu render edilir.
   */
  photos: {
    hero: photo({
      src: null,
      alt: "Alperen Gövrek portresi",
      aspect: "portrait",
      brief:
        "Alperen, kameraya hafif açıyla bakıyor. Bel üstü ya da 3/4 portre. Doğal gün ışığı, sade arka plan (masa, kitaplık ya da düzenli çalışma odası). Tipografi için nefes payı bırakılsın.",
    }),
    about: photo({
      src: null,
      alt: "Alperen Gövrek ders notlarını hazırlarken",
      aspect: "landscape",
      brief:
        "Daha doğal bir kare: masasında çalışırken, defter/kitap incelerken ya da not alırken. Poz verilmiş 'ders anlatma' sahnesi olmasın.",
    }),
    detail: photo({
      src: null,
      alt: "Çalışma masasındaki ders materyalleri",
      aspect: "square",
      brief:
        "Ortam detayı: defter, kitap, kalem, tahta notu ya da çalışan eller. İnsan yüzü olmayabilir.",
    }),
  },

  /**
   * Bilinçli olarak YOK olan bölümler.
   * Veli yorumu, başarı yüzdesi, öğrenci sayısı, sınav sonucu ve fiyat listesi
   * gerçek veri gelmeden hiç üretilmez; uydurma sosyal kanıt bu sitede yer almaz.
   */
  intentionallyAbsent: [
    "Veli ve öğrenci yorumları",
    "Öğrenci sayısı ve başarı yüzdesi",
    "Sınav sonuçları ve dereceler",
    "Sertifika ve ödül listesi",
    "Fiyat ve paket tablosu",
  ],
} as const;

export type Teacher = typeof teacher;

/** Sitede kullanılan tüm sayfalar. Navigasyon ve sitemap buradan üretilir. */
export const routes = {
  home: "/",
  about: "/alperen-govrek",
  approach: "/egitim-yaklasimi",
  contact: "/iletisim",
} as const;

export const navigation = [
  { label: "Ana Sayfa", href: routes.home },
  { label: "Alperen Gövrek", href: routes.about },
  { label: "Eğitim Yaklaşımı", href: routes.approach },
  { label: "İletişim", href: routes.contact },
] as const;

/**
 * Canonical adres. Alan adı netleşince tek değişecek yer burasıdır.
 * Türkçe karakter içermeyen ASCII karşılığı bilinçli tercih edildi.
 */
export const SITE_URL = "https://www.alperengovrek.com.tr";

/** Doğrulanmamış tüm alanların listesi — geliştirme panelinde gösterilir. */
export function collectPendingFacts(): Array<{ path: string; label: string; hint: string }> {
  const found: Array<{ path: string; label: string; hint: string }> = [];

  const walk = (node: unknown, path: string) => {
    if (node === null || typeof node !== "object") return;
    const candidate = node as { status?: unknown; label?: unknown; hint?: unknown };
    if (candidate.status === "pending") {
      found.push({
        path,
        label: String(candidate.label),
        hint: String(candidate.hint),
      });
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      walk(value, path ? `${path}.${key}` : key);
    }
  };

  walk(teacher, "");
  return found;
}

/** Fotoğrafı gelmemiş slotlar. */
export function collectPendingPhotos(): Array<{ key: string; brief: string }> {
  return Object.entries(teacher.photos)
    .filter(([, slot]) => slot.src === null)
    .map(([key, slot]) => ({ key, brief: slot.brief }));
}
