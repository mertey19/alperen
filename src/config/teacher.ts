import type { PhotoSlotId } from "./authoring-notes";

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
  | { readonly status: "pending"; readonly label: string };

/** Alperen tarafından teyit edilmiş bilgi. Sitede ve SEO'da serbestçe kullanılır. */
export function confirmed<T>(value: T): Fact<T> {
  return { status: "confirmed", value };
}

/**
 * Henüz verilmemiş bilgi.
 *
 * Yalnızca bir etiket taşır; "bu alana ne yazılacak" açıklaması bilinçli olarak
 * `config/authoring-notes.ts` içinde durur. Böylece iç notlar üretim paketine
 * hiç girmez — bu dosya istemci bileşenlerine de dahil oluyor.
 */
export function pending<T = never>(label: string): Fact<T> {
  return { status: "pending", label };
}

/** Teyitliyse değeri, değilse null döner. SEO tarafında bilinçli olarak null kullanılır. */
export function factValue<T>(fact: Fact<T>): T | null {
  return fact.status === "confirmed" ? fact.value : null;
}

export type PhotoSlot = {
  /** Dosya `public/` altına konup yolu buraya yazılınca gerçek fotoğraf basılır. */
  readonly src: string | null;
  readonly alt: string;
  readonly aspect: "portrait" | "square" | "landscape";
  /** Çekim brief'i bu kimlikle `config/authoring-notes.ts` içinden okunur. */
  readonly id: PhotoSlotId;
};

const photo = (slot: PhotoSlot): PhotoSlot => slot;

/**
 * Veli/öğrenci görüşü.
 * Yapı hazır ama dizi boş: gerçek görüş gelmeden bölüm hiç render edilmez.
 * Uydurma sosyal kanıt bu sitede yer almaz.
 */
export type Testimonial = {
  readonly quote: string;
  /** "Veli" ya da "Öğrenci". */
  readonly role: string;
  /** Ad ya da yalnızca baş harf. Tam kimlik yayımlanmaz. */
  readonly by: string;
  /** ISO tarih. Görüşün ne zaman alındığı. */
  readonly date?: string;
};

export const teacher = {
  /** Sitenin merkezindeki kişi. Marka bu isimdir; kurum adı yoktur. */
  name: "Alperen Gövrek",
  /** Velilerin günlük dilde kullandığı hitap. CTA metinlerinde bilinçli tercih edilir. */
  informalName: "Alperen Hoca",
  /** Navbar'daki küçük ikincil satır. */
  descriptor: "Matematik & Öğrenci Koçluğu",
  /**
   * Unvan. Alperen kendi tanıtım materyalinde bu şekilde tanımlıyor; sitenin
   * dışından uydurulmuş bir unvan değil, kendi beyanı. Bu yüzden `Person`
   * şemasındaki `jobTitle` alanına da girer.
   */
  role: "Matematik Öğretmeni ve Öğrenci Koçu",

  audience: confirmed("İlkokul, ortaokul ve lise öğrencileri"),

  /**
   * Ders verilen branş. Tek branş olduğu için başlık ve açıklama metinleri de
   * `lib/seo.ts` içinde bu değerden türetilir; buraya ikinci bir ders eklenirse
   * metinler otomatik olarak genel ifadeye döner.
   */
  subjects: confirmed(["Matematik"]),

  /** Desteklenen sınıf seviyeleri (sayısal aralık). */
  gradeRange: confirmed("1-12. sınıf"),

  /** Ders formatı. */
  lessonFormat: confirmed([
    "Denizli'de birebir yüz yüze ders",
    "Şehir dışından online birebir ders",
  ]),

  /** Hazırlık verilen sınavlar. Boşsa ilgili SSS sorusu ve rozet hiç çıkmaz. */
  examPrep: confirmed(["LGS", "TYT", "AYT"]),

  /** Şehir / ilçe. İlçe ayrıca teyit edilmediği için yalnızca il yazılıdır. */
  location: confirmed("Denizli"),

  /** Üniversite / bölüm / mezuniyet. */
  education: pending<readonly string[]>("EĞİTİM BİLGİSİ"),

  /** Öğretmenlik deneyimi. Süre, öğrenci sayısı ve başarı oranı asla tahmin edilmez. */
  experience: pending<readonly string[]>("DENEYİM BİLGİSİ"),

  /**
   * Alperen'in kendi ağzından kısa tanıtım.
   *
   * DİKKAT — bu metin bir TASLAKTIR, Alperen'in yazdığı cümleler değildir.
   * Yalnızca sitede zaten yazılı olan çalışma biçiminden ve teyitli bilgilerden
   * (Denizli, 1-12. sınıf, birebir destek) kuruldu; doğrulanamayacak hiçbir
   * iddia içermez. Alperen okuyup kendi cümleleriyle değiştirmeli.
   */
  introduction: confirmed([
    "Merhaba, ben Alperen. Denizli'de ilkokuldan liseye 1-12. sınıf öğrencileriyle birebir " +
      "matematik çalışıyorum; LGS, TYT ve AYT hazırlığı da bu sürecin parçası. Şehir " +
      "dışındaki öğrencilerle online devam ediyoruz.",
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
    /**
     * Hero portresi.
     *
     * NOT — bu kare yapay zeka ile üretilmiş/işlenmiş bir portredir (kaynak
     * dosya adı: Gemini_Generated_Image...). Alperen'in kendi benzerliği ve
     * kendisi tarafından verildi; başka birinin fotoğrafı değil. Gerçek bir
     * stüdyo çekimi yapıldığında bu dosyanın değiştirilmesi önerilir.
     */
    hero: photo({
      src: "/fotograflar/alperen-govrek-portre.jpg",
      id: "hero",
      alt: "Alperen Gövrek portresi",
      aspect: "portrait",
    }),
    /**
     * Alperen ailesiyle. Kendi tanıtım materyalinden alındı, üzerindeki metin
     * katmanı kırpılarak çıkarıldı. Karede Alperen'in anne ve babası da var;
     * yayımlanması onların rızasına bağlıdır.
     */
    about: photo({
      src: "/fotograflar/alperen-ailesiyle.jpg",
      id: "about",
      alt: "Alperen Gövrek, annesi ve babasıyla birlikte",
      aspect: "landscape",
    }),
    detail: photo({
      src: null,
      id: "detail",
      alt: "Çalışma masasındaki ders materyalleri",
      aspect: "square",
    }),
  },

  /**
   * Veli ve öğrenci görüşleri.
   * Gerçek görüş eklenene kadar boş kalır; boşken ana sayfada o bölüm hiç
   * oluşturulmaz. Bkz. `components/sections/Testimonials.tsx`.
   */
  testimonials: [] as readonly Testimonial[],

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
  blog: "/blog",
  lgs: "/istatistiklerle-lgs",
  contact: "/iletisim",
} as const;

export const navigation = [
  { label: "Ana Sayfa", href: routes.home },
  { label: "Alperen Gövrek", href: routes.about },
  { label: "Eğitim Yaklaşımı", href: routes.approach },
  { label: "Galeri", href: "/#galeri" },
  { label: "Blog", href: routes.blog },
  { label: "İstatistiklerle LGS", href: routes.lgs },
  { label: "İletişim", href: routes.contact },
] as const;

/**
 * Canonical adres.
 *
 * Alan adı Türkçe karakter içeriyor: `alperengövrek.com`. Canonical, sitemap ve
 * JSON-LD'de **punycode** biçimi kullanılır (`xn--alperengvrek-cjb.com`) çünkü
 * URL'lerin ASCII karşılığı tek ve kesin olan biçimdir; tarayıcı kullanıcıya
 * yine Türkçe hâlini gösterir. Unicode ve punycode aynı adresi işaret ettiği
 * için ikisinin de indekslenmesi istenmez — tek doğru biçim burada tanımlıdır.
 */
export const SITE_URL = "https://www.xn--alperengvrek-cjb.com";

/** İnsana gösterilecek hâli. Yalnızca metin içinde kullanılır, bağlantıda değil. */
export const SITE_DOMAIN_DISPLAY = "alperengövrek.com";

/** Doğrulanmamış tüm alanların listesi — geliştirme panelinde gösterilir. */
export function collectPendingFacts(): Array<{ path: string; label: string }> {
  const found: Array<{ path: string; label: string }> = [];

  const walk = (node: unknown, path: string) => {
    if (node === null || typeof node !== "object") return;
    const candidate = node as { status?: unknown; label?: unknown };
    if (candidate.status === "pending") {
      found.push({ path, label: String(candidate.label) });
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
export function collectPendingPhotos(): Array<{ id: PhotoSlotId }> {
  return Object.values(teacher.photos)
    .filter((slot) => slot.src === null)
    .map((slot) => ({ id: slot.id }));
}
