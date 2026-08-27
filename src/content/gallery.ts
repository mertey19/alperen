/**
 * Tanıtım görselleri.
 *
 * Hepsi Alperen'in kendi hazırladığı afişlerdir; stok ya da başka birine ait
 * fotoğraf yoktur. Kare afişler (1:1) ve yatay afişler (16:9) karışıktır —
 * kırpılmadan gösterilmeleri için `aspect` alanı karonun oranını belirler.
 */

export type GalleryAspect = "landscape" | "square";

export type GalleryItem = {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
  readonly category: string;
  readonly aspect: GalleryAspect;
  /** Izgarada iki sütun kaplayan yatay afiş. */
  readonly featured?: boolean;
};

export const gallery: readonly GalleryItem[] = [
  {
    src: "/fotograflar/hedeften-universiteye.webp",
    alt: "İstanbul Üniversitesi kapısı önünde “Hedeften üniversiteye” tanıtım afişi",
    title: "Hedeften üniversiteye",
    category: "Üniversite",
    aspect: "landscape",
    featured: true,
  },
  {
    src: "/fotograflar/matematikte-hedefine-ulas.webp",
    alt: "Alperen Gövrek, “Matematikte hedefine ulaş” tanıtım afişinde",
    title: "Matematikte hedefine ulaş",
    category: "Matematik",
    aspect: "square",
  },
  {
    src: "/fotograflar/ogrenci-koclugu.webp",
    alt: "Alperen Gövrek öğrenci koçluğu tanıtım afişinde çalışma planı gösterirken",
    title: "Öğrenci koçluğu",
    category: "Koçluk",
    aspect: "square",
  },
  {
    src: "/fotograflar/emek-takip-ve-basari.webp",
    alt: "Alperen Gövrek ödül töreninde, “Emek, takip ve başarı” afişi",
    title: "Emek, takip ve başarı",
    category: "Başarı",
    aspect: "landscape",
    featured: true,
  },
  {
    src: "/fotograflar/soru-cozumunde-dogru-yontem.webp",
    alt: "Alperen Gövrek tahta başında, “Soru çözümünde doğru yöntem” afişi",
    title: "Soru çözümünde doğru yöntem",
    category: "Matematik",
    aspect: "square",
  },
  {
    src: "/fotograflar/lise-matematik.webp",
    alt: "Alperen Gövrek, lise matematik (9–12. sınıf) tanıtım afişinde",
    title: "Lise matematik",
    category: "Lise",
    aspect: "square",
  },
  {
    src: "/fotograflar/bir-diplomadan-daha-fazlasi.webp",
    alt: "Alperen Gövrek ailesiyle mezuniyet gününde, “Bir diplomadan daha fazlası” afişi",
    title: "Bir diplomadan daha fazlası",
    category: "Aile",
    aspect: "landscape",
    featured: true,
  },
  {
    src: "/fotograflar/matematik-ozel-ders.webp",
    alt: "Alperen Gövrek, “Matematik özel ders” tanıtım afişinde",
    title: "Matematik özel ders",
    category: "Özel ders",
    aspect: "square",
  },
  {
    src: "/fotograflar/ilkogretim-matematik.webp",
    alt: "Alperen Gövrek, ilköğretim matematik (5–8. sınıf) tanıtım afişinde",
    title: "İlköğretim matematik",
    category: "İlköğretim",
    aspect: "square",
  },
  {
    src: "/fotograflar/sinavdan-kampuse.webp",
    alt: "Sınav salonundan üniversite kampüsüne uzanan yol tanıtım afişi",
    title: "Sınavdan kampüse uzanan yol",
    category: "Sınav",
    aspect: "landscape",
    featured: true,
  },
  {
    src: "/fotograflar/planli-calisma.webp",
    alt: "Alperen Gövrek, LGS · TYT · AYT için “Planlı çalışma, kalıcı başarı” afişinde",
    title: "Planlı çalışma, kalıcı başarı",
    category: "Sınav",
    aspect: "square",
  },
  {
    src: "/fotograflar/duzenli-gelisim-takibi.webp",
    alt: "Alperen Gövrek, düzenli gelişim takibi ve veli bilgilendirmesi afişinde",
    title: "Düzenli gelişim takibi",
    category: "Takip",
    aspect: "square",
  },
  {
    src: "/fotograflar/hayat-egitim-aile.webp",
    alt: "Alperen Gövrek ailesiyle, “Hayat; eğitim, aile ve paylaşmaktır” afişi",
    title: "Hayat; eğitim, aile ve paylaşmaktır",
    category: "Aile",
    aspect: "landscape",
    featured: true,
  },
  {
    src: "/fotograflar/kisiye-ozel-calisma-programi.webp",
    alt: "Alperen Gövrek, kişiye özel çalışma programı tanıtım afişinde",
    title: "Kişiye özel çalışma programı",
    category: "Program",
    aspect: "square",
  },
  {
    src: "/fotograflar/basariya-birlikte.webp",
    alt: "Alperen Gövrek, “Başarıya birlikte ulaşalım” tanıtım afişinde",
    title: "Başarıya birlikte ulaşalım",
    category: "Tanıtım",
    aspect: "square",
  },
  {
    src: "/fotograflar/aileden-aldigim-degerlerle.webp",
    alt: "Alperen Gövrek ailesiyle masada, “Aileden aldığım değerlerle” afişi",
    title: "Aileden aldığım değerlerle",
    category: "Aile",
    aspect: "landscape",
    featured: true,
  },
  {
    src: "/fotograflar/basarinin-arkasinda-aile.webp",
    alt: "Alperen Gövrek ailesiyle, “Başarının arkasında aile vardır” afişi",
    title: "Başarının arkasında aile vardır",
    category: "Aile",
    aspect: "landscape",
    featured: true,
  },
] as const;

/** Ana sayfa üst şeridinde dönen yatay afişler. */
export const bannerSlides: readonly GalleryItem[] = gallery.filter(
  (item) => item.aspect === "landscape",
);
