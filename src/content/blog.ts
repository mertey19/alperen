/**
 * Blog yazıları.
 *
 * İKİ KURAL
 * ---------
 * 1. Hiçbir yazı Alperen hakkında doğrulanamayacak bir iddia içermez: öğrenci
 *    sayısı, başarı oranı, sınav sonucu, deneyim yılı, referans yok. Yazılar
 *    genel matematik ve çalışma tavsiyesidir.
 * 2. Metinler kişisel deneyim anlatısı değil, bilgilendirici bir dille yazıldı
 *    ("ben şöyle yaparım" değil, "şu işe yarar"). Böylece sitenin geri kalanıyla
 *    aynı sakin tonda kalıyor ve Alperen'in ağzından uydurulmuş cümle olmuyor.
 *
 * NOT: metinler taslaktır; Alperen okuyup kendi diliyle düzeltmelidir.
 */

export type BlogSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
};

export type BlogPost = {
  readonly slug: string;
  readonly title: string;
  /** Kartta ve meta açıklamasında kullanılır. */
  readonly description: string;
  /** ISO tarih. Yayımlandığı gün. */
  readonly publishedAt: string;
  readonly cover: { readonly src: string; readonly alt: string } | null;
  readonly intro: string;
  readonly sections: readonly BlogSection[];
  readonly closing: string;
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "matematikte-eksik-konu-nasil-fark-edilir",
    title: "Matematikte eksik konu nasıl fark edilir?",
    description:
      "Matematikte eksik bir konu genellikle sessizce birikir. Velinin evde " +
      "gözleyebileceği işaretler ve eksiğin nasıl geriye doğru izleneceği.",
    publishedAt: "2026-08-25",
    cover: {
      src: "/blog/eksik-konu.jpg",
      alt: "İlkokul ve ortaokul matematiği için birebir ders",
    },
    intro:
      "Matematik, üst üste binen bir ders. Bir konu eksik kaldığında sorun genellikle o " +
      "konuda değil, aylar sonra gelen başka bir konuda görünür hale gelir. Bu yüzden " +
      "\"çocuğum bu konuyu anlamadı\" demek çoğu zaman geç kalmış bir tespittir.",
    sections: [
      {
        heading: "Not düşmeden önce görünen işaretler",
        paragraphs: [
          "Karne notu, eksiğin en geç fark edildiği yerdir. Ondan önce evde gözlenebilecek " +
            "birkaç işaret vardır: ödev süresinin sessizce uzaması, soru sorulduğunda " +
            "\"biliyorum ama anlatamıyorum\" cevabı, işlemi doğru yapıp neden öyle yaptığını " +
            "açıklayamamak.",
          "Bir diğeri, öğrencinin benzer soruları çözerken kendine güvenip soru biraz " +
            "değiştiğinde tamamen durmasıdır. Bu genellikle konunun değil, kalıbın " +
            "öğrenildiğini gösterir.",
        ],
      },
      {
        heading: "Eksik konu genelde daha geride",
        paragraphs: [
          "Öğrenci sekizinci sınıfta çarpanlara ayırmada zorlanıyorsa sorun çoğu zaman " +
            "çarpanlara ayırmada değildir; dört işlem önceliği, kesirler veya üslü sayılar " +
            "gibi daha eski bir konuda kalmış olabilir. Yeni konuyu tekrar tekrar anlatmak " +
            "bu durumda işe yaramaz.",
          "Bu yüzden eksik konu aramak geriye doğru yapılan bir iştir. Öğrencinin takıldığı " +
            "yerden başlayıp, hangi ön bilginin eksik olduğu bulunana kadar geriye gidilir. " +
            "Bulunduğunda genellikle birkaç dersle kapanır.",
        ],
      },
      {
        heading: "Ne yapılmamalı",
        paragraphs: [
          "Eksik konu fark edildiğinde ilk refleks daha çok soru çözdürmek olur. Oysa konu " +
            "eksikken çözülen soru, öğrenciye \"ben matematiği yapamıyorum\" duygusundan " +
            "başka bir şey kazandırmaz.",
          "Aynı şekilde, müfredata yetişmek adına anlaşılmayan konunun üzerinden geçmek " +
            "eksiği kapatmaz, sadece ertelemiş olur. Eksik konu her zaman geri gelir.",
        ],
      },
    ],
    closing:
      "Eksik konu, öğrencinin başarısızlığı değil, sürecin doğal bir parçasıdır. Erken " +
      "fark edildiğinde kapatılması da kısa sürer.",
  },
  {
    slug: "sinav-hazirliginda-konu-ve-soru-dengesi",
    title: "Sınav hazırlığında konu ve soru dengesi",
    description:
      "LGS, TYT ve AYT hazırlığında en sık yapılan hata, konu eksiği varken soru " +
      "çözümüne geçmek. İki çalışmanın hangi sırayla yürüdüğü.",
    publishedAt: "2026-08-25",
    cover: {
      src: "/blog/sinav-dengesi.jpg",
      alt: "LGS, TYT ve AYT için planlı matematik çalışması",
    },
    intro:
      "Sınav hazırlığı denince akla önce deneme ve soru bankası gelir. Oysa soru çözümü " +
      "bir ölçme aracıdır; tek başına öğretmez. Konu ile soru arasındaki sıra bozulduğunda " +
      "çalışılan saat artar ama sonuç değişmez.",
    sections: [
      {
        heading: "Soru çözümü neyi ölçer, neyi öğretir?",
        paragraphs: [
          "Bir soruyu çözmek, o konunun anlaşılıp anlaşılmadığını gösterir. Anlaşılmışsa " +
            "soru çözmek kalıcılığı artırır ve hızı geliştirir. Anlaşılmamışsa aynı soru " +
            "yalnızca eksiği tekrar tekrar hatırlatır.",
          "Bu yüzden \"günde 100 soru\" gibi hedefler tek başına anlamlı değildir. Önemli " +
            "olan çözülen sorunun sayısı değil, yanlış yapılan sorunun üzerinde geçirilen " +
            "zamandır.",
        ],
      },
      {
        heading: "Yanlışın üzerinde durmak",
        paragraphs: [
          "Yanlış yapılan soru, çalışmanın en değerli parçasıdır çünkü eksiğin tam yerini " +
            "gösterir. Doğru cevabı görüp geçmek bu bilgiyi harcamak demektir.",
          "Sorulması gereken şey \"doğrusu neymiş\" değil, \"ben neden o adımı seçtim\" " +
            "olmalıdır. Hata bazen bilgi eksikliği değil, okuma hatası ya da acele " +
            "kaynaklıdır; ikisinin çözümü aynı değildir.",
        ],
      },
      {
        heading: "Deneme sınavının yeri",
        paragraphs: [
          "Deneme, konu çalışması bittikten sonra değil, süreç boyunca yapılan bir ölçümdür. " +
            "Ama denemenin işlevi net sayısını izlemek değil, hangi konuların hâlâ eksik " +
            "olduğunu göstermektir.",
          "Net sayısının haftadan haftaya dalgalanması normaldir. Anlamlı olan, aynı konudan " +
            "gelen yanlışın tekrar edip etmediğidir.",
        ],
      },
    ],
    closing:
      "Sıra basittir: önce konu anlaşılır, sonra soruyla sınanır, sonra yanlış üzerinde " +
      "konuşulur. Bu sıra bozulduğunda harcanan emek karşılığını vermez.",
  },
  {
    slug: "ozel-ders-secerken-sorulacak-sorular",
    title: "Özel ders seçerken velinin sorabileceği sorular",
    description:
      "Bir öğretmenle çalışmaya başlamadan önce sorulduğunda süreci netleştiren " +
      "sorular — ve verilemeyecek sözler.",
    publishedAt: "2026-08-25",
    cover: {
      src: "/blog/ozel-ders-secimi.jpg",
      alt: "İlköğretim ve lise için birebir matematik özel dersi",
    },
    intro:
      "Özel ders kararı çoğu zaman aceleyle verilir: notlar düştüğünde, sınav " +
      "yaklaştığında. Oysa ilk görüşmede sorulan birkaç soru, sürecin nasıl " +
      "ilerleyeceğini baştan netleştirir.",
    sections: [
      {
        heading: "Süreçle ilgili sorular",
        paragraphs: [
          "\"Çocuğumun seviyesini nasıl belirleyeceksiniz?\" — Plan öğrenci görülmeden " +
            "yapılıyorsa, o plan öğrenciye değil ortalamaya göre kurulmuştur.",
          "\"Eksik konu çıkarsa ne yapıyorsunuz?\" — Cevap müfredata devam etmek yönündeyse, " +
            "eksik büyümeye devam edecek demektir.",
          "\"Gelişmeyi bana nasıl aktaracaksınız?\" — Veli iletişiminin sürecin parçası mı " +
            "yoksa istendiğinde verilen bir bilgi mi olduğunu gösterir.",
        ],
      },
      {
        heading: "Verilemeyecek sözler",
        paragraphs: [
          "Hiçbir öğretmen bir çocuğun alacağı notu ya da sınav sonucunu taahhüt edemez. " +
            "Sonuç, dersin yanında öğrencinin çalışmasına, okul programına ve zamana bağlıdır.",
          "Önceden belirlenmiş sabit bir ders sayısı da öğrenci tanınmadan verilmiş bir " +
            "karardır. Kaç derse ihtiyaç olduğu ancak eksiğin büyüklüğü görüldükten sonra " +
            "konuşulabilir.",
          "Bu tür net vaatler duyulduğunda soru sormaya devam etmek yerinde olur. Gerçekçi " +
            "bir öğretmen, neyin söz verilemeyeceğini de açıkça söyler.",
        ],
      },
      {
        heading: "Çocuğun kendisi ne diyor?",
        paragraphs: [
          "Birebir ders, öğrencinin rahat soru sorabildiği bir ortam olduğunda işe yarar. " +
            "İlk derslerden sonra çocuğa \"anlamadığın yerde durabiliyor musun\" diye sormak, " +
            "sürecin yürüyüp yürümediğini en hızlı gösteren şeydir.",
        ],
      },
    ],
    closing:
      "İyi bir ilk görüşme satış konuşması değil, karşılıklı bilgi alışverişidir. " +
      "Sorular arttıkça iki taraf için de doğru karar kolaylaşır.",
  },
  {
    slug: "cocugum-matematikten-korkuyor",
    title: "Çocuğum matematikten korkuyor",
    description:
      "Matematik korkusu genellikle yetenekle değil, biriken küçük başarısızlık " +
      "deneyimleriyle ilgilidir. Güvenin nasıl kaybedildiği ve nereden başlanacağı.",
    publishedAt: "2026-08-25",
    cover: {
      src: "/blog/matematik-korkusu.jpg",
      alt: "Ezber yerine mantığını anlatan matematik çalışması",
    },
    intro:
      "\"Ben matematikçi değilim\" cümlesini çocuklar genellikle birinden duyarak öğrenir. " +
      "Ama bu cümleye inanmaları için önce birkaç kez denerken başarısız olmaları " +
      "gerekir. Korku, yetenekten çok bu birikimin sonucudur.",
    sections: [
      {
        heading: "Güven nasıl kaybedilir?",
        paragraphs: [
          "Anlaşılmayan bir konu üzerine yeni konu geldiğinde öğrenci arka arkaya birkaç " +
            "kez tıkanır. Birkaç kez tıkanan öğrenci denemeyi bırakır; denemeyi bırakınca " +
            "da öğrenmesi imkânsız hale gelir.",
          "Bu noktadan sonra sorun artık konu eksikliği değildir. Öğrenci soruyu görmeden " +
            "\"yapamam\" der; çünkü geçmiş deneyimi ona bunu söyletir.",
        ],
      },
      {
        heading: "Ezber, korkuyu büyütür",
        paragraphs: [
          "Anlamadığı bir konuda ilerlemek zorunda kalan öğrenci genellikle kural ezberler. " +
            "Ezber kısa vadede işe yarar, sınavda birkaç soru kurtarır. Ama kural " +
            "unutulduğunda ya da soru biraz değiştiğinde geriye hiçbir şey kalmaz.",
          "\"Neden böyle oluyor\" sorusunun cevabı bilinmediğinde matematik, sebebi " +
            "bilinmeyen kurallar listesine dönüşür. Korkulan da genellikle budur.",
        ],
      },
      {
        heading: "Nereden başlanır?",
        paragraphs: [
          "Başlangıç noktası, öğrencinin gerçekten yapabildiği bir yerdir. Bu yer sınıf " +
            "seviyesinin epey gerisinde olabilir; önemli değil. Amaç, uzun süredir " +
            "yaşanmamış olan \"yaptım\" duygusunu geri getirmektir.",
          "Bunun için soruların kolaylaştırılması değil, doğru seviyeden seçilmesi gerekir. " +
            "Kolay soru çözdürmek geçici bir rahatlama sağlar; seviyeye uygun soru ise " +
            "gerçek bir kazanımdır.",
          "Güven geri geldiğinde ilerleme hızı da beklenenden yüksek olur. Çünkü sorun " +
            "genellikle öğrenme kapasitesinde değil, denemeye ara verilmiş olmasındaydı.",
        ],
      },
    ],
    closing:
      "Matematik korkusu, üzerine gidildiğinde çözülen bir şeydir. Yeter ki başlangıç " +
      "noktası çocuğun bulunduğu yer olsun.",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Kaba okuma süresi. Türkçe için dakikada ~200 kelime; yukarı yuvarlanır. */
export function readingMinutes(post: BlogPost): number {
  const words = [
    post.intro,
    post.closing,
    ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
