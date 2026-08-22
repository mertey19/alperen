# Alperen Gövrek — kişisel eğitim sitesi

İlkokul ve ortaokul öğrencilerine birebir akademik destek veren **Alperen Gövrek**'in
kişisel tanıtım sitesi. Bir kurum, kurs merkezi ya da eğitim şirketi sitesi değildir;
markanın merkezinde tek bir öğretmen vardır.

## Çalıştırma

```bash
npm run dev
```

| Komut | İş |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi |
| `npm start` | Derlenmiş siteyi çalıştırır |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run icons` | `icon.svg`'den `favicon.ico` + `apple-icon.png` üretir |

Stack: Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4
(CSS-first `@theme`, ayrı config dosyası yok) · `next/font` ile Fraunces + Inter ·
hareket için `motion` · hero sahnesi için `three` + `@react-three/fiber` +
`@react-three/drei`.

## Sıfır uydurma politikası

Bu sitede Alperen hakkında **hiçbir bilgi tahmin edilmez**. Üniversite, bölüm,
deneyim süresi, öğrenci sayısı, başarı oranı, sertifika, ödül, referans, şehir,
ders listesi ve ücret gibi bilgiler yalnızca teyit edildiğinde yazılır.

Bu, dokümantasyon değil kodun kendisiyle güvence altına alınmıştır:

```ts
// src/config/teacher.ts
education: pending("EĞİTİM BİLGİSİ", "Üniversite, bölüm ve mezuniyet yılı."),
```

- `pending(...)` alanlar arayüzde **kesik çizgili turuncu bir rozet** olarak görünür:
  `✎ EĞİTİM BİLGİSİ EKLENECEK`. Metnin içinde kaybolmaz, pazarlama cümlesine dönüşmez.
- `pending(...)` alanlar `lib/seo.ts` içindeki metadata ve JSON-LD üretimine
  **hiç girmez** — placeholder metni arama motoruna gitmez.
- `npm run dev` sırasında sağ altta bir panel, bekleyen tüm alanları ve
  bunlara ne yazılacağını listeler.

### Bilgi eklemek

Tek yapılacak şey `src/config/teacher.ts` içinde ilgili satırı değiştirmek:

```ts
// önce
subjects: pending("DERS BİLGİSİ", "Hangi derslerde destek veriliyor?"),

// sonra
subjects: confirmed(["Matematik", "Fen Bilimleri"]),
```

Rozet kaybolur, bilgi sitedeki tüm ilgili yerlerde ve JSON-LD'de belirir.
Başka hiçbir dosyaya dokunmak gerekmez.

### Şu an bekleyen alanlar

`teacher.subjects`, `teacher.gradeRange`, `teacher.lessonFormat`, `teacher.location`,
`teacher.education`, `teacher.experience`, `teacher.introduction` ve
`teacher.contact.*` (WhatsApp, telefon, e-posta, Instagram, görüşme saatleri).

Fotoğraflar için bkz. [`public/fotograflar/OKUBENI.md`](public/fotograflar/OKUBENI.md).

### Bilinçli olarak yok

Veli yorumları, öğrenci sayısı, başarı yüzdesi, sınav sonuçları, sertifika listesi
ve fiyat tablosu bu sitede **hiç üretilmedi**. Uydurma sosyal kanıt eklemektense
bölümün olmaması tercih edildi. Gerçek veri geldiğinde bu bölümler eklenebilir.

## Hareket ve 3D — "Learning in Motion"

Görsel sistem tek bir fikre dayanır: **öğrenci sabit bir sisteme sokulmaz; ders,
öğrencinin etrafında şekillenir.** 3D nesneler bu yüzden soyut küre/parçacık
değil, gerçek ders malzemeleridir: defter, kalem, cetvel, iletki, geometri küpü.

### Katmanların iş bölümü

| Katman | Ne yapar | Nerede |
| --- | --- | --- |
| WebGL (`three` + R3F) | Yalnızca hero'daki masa kompozisyonu | `components/three/` |
| `motion` | Kaydırma girişleri, kart eğimi, mıknatıs düğme, menü çizgisi | `components/motion/`, `components/sections/` |
| Saf CSS | SSS açılışı, bağlantı altı çizgisi, kart yükselmesi, kâğıt süzülmesi | `app/globals.css` |

CSS'in çözebildiği hiçbir şey için WebGL ya da JavaScript kullanılmadı. SSS
açılışı `::details-content` + `interpolate-size` ile yapılır: `<details>`
semantiği ve JavaScript'siz çalışması korunur.

### Hero sahnesi

Yedi görsel nesne (`lite` kademesinde beş). Kompozisyon 3,4 × 4,6 birimlik sabit
bir referans çerçeveye yazılır ve her ekranda o çerçeveye sığacak şekilde
ölçeklenir; böylece nesneler ne kırpılır ne de üst üste biner.

Kompozisyon üç katmanlıdır ve **portre asla 3D bir avatarla değiştirilmez**:
arkada masa sahnesi, ortada gerçek fotoğraf, önde isim kartı.

- **Aydınlatma:** yumuşak ana ışık + soğuk dolgu + sıcak kenar ışığı. Bloom,
  neon ve keskin yansıma yok.
- **Malzeme:** mat kil (`roughness` 0,82-0,94; `metalness` ~0).
- **İmleç paralaksı:** en fazla ~3°, `MathUtils.damp` ile ağır sönümlemeli.
  Nesneler imleci kovalamaz, arkasından gelir.
- **Durgun hareket:** 8-14 saniyelik döngüler, 0,04-0,08 birim genlik.

### Kalite kademeleri

`components/three/useSceneTier.ts` üç kademe belirler:

| Kademe | Koşul | Sonuç |
| --- | --- | --- |
| `high` | ≥1024 px, WebGL var, güçlü cihaz | 7 nesne, gölge, DPR 1-1,5, paralaks |
| `lite` | ≤4 GB RAM ya da ≤4 çekirdek | 5 nesne, gölge yok, DPR 1-1,25, paralaks yok |
| `static` | <1024 px, WebGL yok, hareket azaltma, veri tasarrufu | WebGL hiç indirilmez; sabit vektör kompozisyon |

**1024 px eşiği bilinçli:** bunun altında hero tek sütuna düşer, portre tam
genişlik kaplar ve arkadaki hiçbir nesne görünmez. Görünmeyen piksel için
~240 KB WebGL indirmek yanlış olurdu.

Sahne ekran dışına çıkınca `frameloop` `never` olur; sekme arka plandayken de
çizim durur.

### Erişilebilirlik ve yedekler

- Giriş animasyonu olan her eleman `data-reveal` taşır. Hareket azaltıldığında
  CSS bu elemanları koşulsuz görünür kılar; `<noscript>` bloğu aynı güvenceyi
  JavaScript'siz durum için verir. **İçerik hiçbir koşulda gizli kalmaz.**
- Hareket tercihi `lib/use-reduced-motion.ts` ile canlı dinlenir. Hareket
  kütüphanesinin kendi kancası tercihi yalnızca ilk render'da okuyor.
- 3D tamamen dekoratiftir: `aria-hidden`, metin içermez, odak almaz.
- Metinlerin tamamı sunucuda üretilen HTML'dir; SEO 3D'ye bağlı değildir.

## Mimari

```
src/
  config/teacher.ts     Tek gerçek kaynak: kişi bilgileri, rotalar, canonical URL
  content/copy.ts       Site metinleri (yaklaşım, süreç, SSS)
  lib/seo.ts            Metadata + Person/FAQ JSON-LD (yalnızca teyitli alanlar)
  lib/contact.ts        WhatsApp / tel / mailto bağlantıları (bilgi yoksa null)
  lib/motion.ts         Hareket dili: eğriler, süreler, yaylar
  lib/use-reduced-motion.ts  Hareket azaltma tercihini canlı dinler
  components/ui/        Fact, Button, Photo, Section, JsonLd
  components/motion/    Reveal, TiltCard
  components/sections/  CardGrid, LearningJourney, ProgressNotebook
  components/three/     HeroVisual (kademe + tembel yükleme), HeroScene,
                        DeskComposition, SceneLights, objects/, HeroSceneFallback
  components/layout/    Header, Footer
  components/dev/       PendingPanel (yalnızca geliştirmede)
  app/                  /, /alperen-govrek, /egitim-yaklasimi, /iletisim
```

Kararlar:

- **Backend yok.** Form yok, veri saklanmıyor. Veli doğrudan WhatsApp/telefon/e-posta
  ile ulaşır. `lib/contact.ts` bilgi teyit edilmediğinde `null` döner ve butonlar
  "bilgi eklendiğinde aktifleşir" durumunda görünür.
- **JSON-LD `Person`**, `Organization` değil. Tanıtılan bir kurum değil, bir öğretmen.
- **Unvan iddiası yok.** "Uzman eğitimci", "pedagog", "eğitim koçu", "LGS uzmanı"
  gibi ifadeler hiçbir yerde geçmez; yalnızca yapılan iş tarif edilir.
- **Rotalar ASCII.** `/alperen-govrek`, `/egitim-yaklasimi`, `/iletisim`.
- **Çocuk gizliliği.** Tanınabilir çocuk fotoğrafı ya da "öğrencisiymiş gibi" duran
  stok görsel kullanılmaz.
- **Takip görseli uydurma veri içermez.** "Düzenli öğrenme takibi" bölümündeki
  defter görseli bilinçli olarak soyuttur: ders adı, yüzde, not ya da öğrenci
  verisi yoktur ve erişilebilirlik ağacından gizlenir.

## İkon

Tek kaynak [`src/app/icon.svg`](src/app/icon.svg): mürekkep zeminde kâğıt renginde
bir **A**, ortasında kil rengi bir çizgi. Çizgi kasten harfin bacaklarının altında
kalıyor; görünen parça defterde çekilmiş bir kalem çizgisi gibi duruyor. Renkler
sitenin paletiyle aynı.

`favicon.ico` (16/32/48) ve `apple-icon.png` (180) bu dosyadan `npm run icons` ile
üretilir — elle düzenlenmez. İkonu değiştirmek için `icon.svg`'yi düzenleyip
komutu tekrar çalıştırmak yeterli.

Bu işaret **navbar'a konmadı**: sitenin markası tipografik, yani ismin kendisi.
Amblem yalnızca tarayıcı sekmesi ve ana ekran kısayolu gibi ismin sığmadığı
yerlerde kullanılıyor.

## Alan adı

`src/config/teacher.ts` içindeki `SITE_URL` şu an
`https://www.alperengovrek.com.tr`. Alan adı netleşince değişecek tek yer burasıdır;
canonical etiketler, sitemap ve robots.txt bu değerden türetilir.
