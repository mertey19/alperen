# Alperen Gövrek — kişisel eğitim sitesi

Denizli'de 1-12. sınıf öğrencilerine birebir matematik desteği veren
**Alperen Gövrek**'in kişisel tanıtım sitesi. Bir kurum, kurs merkezi ya da eğitim şirketi sitesi değildir;
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
| `npm run icons` | `icon.svg`'den favicon, apple-icon ve paylaşım kartını üretir |

Stack: Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4
(CSS-first `@theme`, ayrı config dosyası yok) · `next/font` ile Fraunces + Inter ·
kaydırma girişleri için `motion`. Başka çalışma zamanı bağımlılığı yok.

## Sıfır uydurma politikası

Bu sitede Alperen hakkında **hiçbir bilgi tahmin edilmez**. Üniversite, bölüm,
deneyim süresi, öğrenci sayısı, başarı oranı, sertifika, ödül, referans, şehir,
ders listesi ve ücret gibi bilgiler yalnızca teyit edildiğinde yazılır.

Bu, dokümantasyon değil kodun kendisiyle güvence altına alınmıştır:

```ts
// src/config/teacher.ts
education: pending("EĞİTİM BİLGİSİ"),
```

- **Üretimde** `pending(...)` alan hiç render edilmez; ilgili satır, kart ya da
  bölüm tamamen gizlenir. Ziyaretçi eksik bilginin varlığını fark etmez.
- **Geliştirmede** aynı alan kesik çizgili turuncu bir rozet olarak çıkar
  (`✎ EĞİTİM BİLGİSİ EKLENECEK`) — gözden kaçmasın diye.
- `pending(...)` alanlar `lib/seo.ts` içindeki metadata ve JSON-LD üretimine
  **hiç girmez**.
- `npm run dev` sırasında sağ altta bir panel, bekleyen tüm alanları ve
  bunlara ne yazılacağını listeler. Bu panel üretimde hiç oluşturulmaz.

### Bilgi eklemek

Tek yapılacak şey `src/config/teacher.ts` içinde ilgili satırı değiştirmek:

```ts
// önce
subjects: pending("DERS BİLGİSİ"),

// sonra
subjects: confirmed(["Matematik", "Fen Bilimleri"]),
```

Rozet kaybolur, bilgi sitedeki tüm ilgili yerlerde ve JSON-LD'de belirir.
Başka hiçbir dosyaya dokunmak gerekmez.

### Şu an bekleyen alanlar

Yalnızca ikisi: `teacher.education` (üniversite/bölüm) ve `teacher.experience`.
Bunlar bilinçli olarak boş; bir öğretmenin mezuniyeti ve deneyimi velinin güven
kararının merkezinde olduğu için tahmin edilmedi.

**Teyitli:** Denizli · 1-12. sınıf · matematik · LGS, TYT, AYT · yüz yüze ve
online · randevu ile · unvan "Matematik Öğretmeni ve Öğrenci Koçu" · WhatsApp,
telefon, e-posta, Instagram. Başlık, açıklama, SSS ve `Person` JSON-LD bunlardan
türetiliyor (şehir ya da branş `pending` olsaydı cümleden düşerlerdi).

**Fotoğraflar:** hero portresi ve hakkında karesi eklendi; `detail` slotu boş.
`hero` karesi **yapay zeka ile üretilmiş/işlenmiş** bir portredir (Alperen'in
kendi benzerliği, kendisi tarafından verildi) — gerçek stüdyo çekimi yapılınca
değiştirilmesi önerilir. `about` karesinde Alperen'in anne ve babası da var;
yayımlanması onların rızasına bağlıdır.

**`teacher.introduction` bir taslaktır.** Alperen'in yazdığı cümleler değil;
sitede zaten yazılı olan çalışma biçiminden kuruldu ve doğrulanamayacak hiçbir
iddia içermiyor. Alperen okuyup kendi cümleleriyle değiştirmeli.

Fotoğraflar için bkz. [`public/fotograflar/OKUBENI.md`](public/fotograflar/OKUBENI.md).

### Bilinçli olarak yok

Veli yorumları, öğrenci sayısı, başarı yüzdesi, sınav sonuçları, sertifika listesi
ve fiyat tablosu bu sitede **hiç üretilmedi**. Uydurma sosyal kanıt eklemektense
bölümün olmaması tercih edildi. Gerçek veri geldiğinde bu bölümler eklenebilir.

## Blog

Yazılar [`src/content/blog.ts`](src/content/blog.ts) içinde tek kaynakta durur;
sayfalar, sitemap, `BlogPosting` şeması ve kırıntı navigasyonu buradan üretilir.
Yeni yazı eklemek = diziye bir nesne eklemek.

**İki kural:** (1) hiçbir yazı Alperen hakkında doğrulanamayacak iddia içermez —
öğrenci sayısı, başarı oranı, sınav sonucu, deneyim yılı yok; (2) metinler
kişisel anlatı değil bilgilendirici dille yazılır, böylece Alperen'in ağzından
uydurulmuş cümle olmaz.

Yazı metinleri **taslaktır**; Alperen okuyup kendi diliyle düzeltmelidir.

Kapak görselleri `public/blog/` altında. Şu anki kapaklar Alperen'in sosyal
medya afişlerinden geliyor ve **yapay zeka üretimidir**; içlerinde AI ile
üretilmiş öğrenci figürleri var. Uydurma "ilerleme grafiği" içeren kareler
bilinçli olarak kullanılmadı.

## Üretim güvenliği — placeholder asla görünmez

Eksik bilgi **üretimde hiç render edilmez**. Ziyaretçi ne "EKLENECEK" yazısı, ne
boş bir çerçeve, ne de bir çekim talimatı görür; ilgili arayüz parçası tamamen
gizlenir. Geliştirmede ise aynı alan göze batan bir rozet olarak çıkar.

Bu iki yerde birden garanti altına alınmıştır:

1. **Render katmanı** — `Fact`, `Photo`, `WhenConfirmed` ve `FactRow`
   `process.env.NODE_ENV` değerine bakar. Üretimde `null` dönerler.
2. **Paket katmanı** — "bu alana ne yazılacak" ve çekim brief'i gibi **iç
   notlar** `config/authoring-notes.ts` içinde durur ve yalnızca sunucu
   bileşenlerinden okunur. Daha önce bu metinler `teacher.ts` içindeydi; o dosya
   istemci bileşenlerine de girdiği için notlar üretim JavaScript paketine
   sızıyordu.

Doğrulama:

```bash
npm run build
grep -rE "EKLENECEK|kameraya hafif" .next/static/chunks/*.js   # çıktı boş olmalı
```

Fotoğrafı olmayan bölümler düzeni de değiştirir: hero, hakkında ve yaklaşım
sayfalarındaki iki sütunlu ızgaralar portre yoksa tek sütuna düşer, boş bir
sütun bırakılmaz.

## Hareket

Hareket kasten neredeyse görünmezdir: yalnızca opaklık ve 10-12 pikselluk bir
kayma, 150-300 ms. 3D sahne, paralaks, süzülen nesne, imleç takibi ve sürekli
animasyon **yok** — veli bilgiye baksın diye.

| Katman | Ne yapar |
| --- | --- |
| `motion` | Yalnızca kaydırmayla giriş ve yolculuk adımlarının etkinleşmesi |
| Saf CSS | SSS açılışı, bağlantı altı çizgisi, kart vurgusu, düğme durumları |

SSS açılışı `::details-content` + `interpolate-size` ile yapılır: `<details>`
semantiği ve JavaScript'siz çalışma korunur.

Giriş animasyonu olan her eleman `data-reveal` taşır. Hareket azaltıldığında CSS
bu elemanları koşulsuz görünür kılar; `<noscript>` bloğu aynı güvenceyi
JavaScript'siz durum için verir. **İçerik hiçbir koşulda gizli kalmaz.**

## Alan adı ve canonical

Alan adı Türkçe karakter içeriyor: **alperengövrek.com**. Canonical, sitemap ve
JSON-LD'de tek biçim olarak **punycode** kullanılır:

```
https://www.xn--alperengvrek-cjb.com
```

Tarayıcı adres çubuğunda kullanıcıya yine Türkçe hâlini gösterir. Unicode ve
punycode aynı adresi işaret ettiği için ikisinin de indekslenmemesi gerekir —
tek doğru biçim `SITE_URL` içinde tanımlıdır.

### Google Search Console

Doğrulama dosyası `public/googlef1d5a46ab1e079ef.html` olarak duruyor ve
`/googlef1d5a46ab1e079ef.html` adresinden servis ediliyor. Dosya yöntemiyle
doğrulama, mülkiyet kaldırılmadıkça dosya sitede kaldığı sürece geçerlidir —
silmeyin.

Search Console'da mülk eklerken **canonical ile aynı biçimi** seçin:
`https://www.xn--alperengvrek-cjb.com`. Domain mülkü (DNS doğrulaması)
seçilirse www/punycode varyantlarının hepsi tek mülkte toplanır; en temizi odur.
Doğrulamadan sonra `sitemap.xml` adresini elle göndermek gerekir.

**Barındırma tarafında yapılması gerekenler** (kod bunu çözemez): `www` olmayan
adres `www`'ye, `http` `https`'ye 301 ile yönlenmeli; punycode ve unicode aynı
sertifikayı sunmalı. Eski `alperengovrek.com.tr` adresi hâlâ yayındaysa oradan
da 301 verilmeli.

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
  config/authoring-notes.ts  İç notlar — yalnızca geliştirmede okunur
  lib/faq.ts            SSS'yi teyitli alanlardan üretir (cevabı yoksa soru yok)
  components/motion/    Reveal
  components/sections/  CardGrid, LearningJourney, Testimonials
  components/layout/    Header, Footer, StickyContactBar
  components/dev/       PendingPanel (yalnızca geliştirmede)
  content/blog.ts       Blog yazıları (tek kaynak)
  app/                  /, /alperen-govrek, /egitim-yaklasimi, /blog,
                        /blog/[slug], /iletisim
```

Kararlar:

- **Backend yok.** Form yok, veri saklanmıyor. Veli doğrudan WhatsApp/telefon/
  e-posta ile ulaşır. WhatsApp bağlantısı mesajı yalnızca hazırlar; gönderme
  kararı her zaman kullanıcıdadır. `lib/contact.ts` bilgi teyit edilmediğinde
  `null` döner ve o kanal kartı hiç oluşturulmaz.
- **JSON-LD `Person`**, `Organization` değil. Tanıtılan bir kurum değil, bir öğretmen.
- **Unvan yalnızca kendi beyanı.** "Matematik Öğretmeni ve Öğrenci Koçu",
  Alperen'in kendi tanıtım materyalindeki ifadesidir. "Uzman eğitimci",
  "pedagog", "LGS uzmanı" gibi site dışından uydurulmuş bir sıfat yok.
- **Rotalar ASCII.** `/alperen-govrek`, `/egitim-yaklasimi`, `/iletisim`.
- **Çocuk gizliliği.** Tanınabilir çocuk fotoğrafı ya da "öğrencisiymiş gibi" duran
  stok görsel kullanılmaz.
- **Veli görüşleri mimarisi hazır, içerik boş.** `teacher.testimonials` boş
  olduğu sürece bölüm hiç oluşturulmaz. Uydurma yorum, uydurma isim ve puan yok.
- **Telefonda sabit tek çağrı.** `StickyContactBar` yalnızca gerçek bir kanal
  varsa render edilir; altındaki boşluk tutucu alt bilgiyi kapatmasını ve düzen
  kaymasını engeller.
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
