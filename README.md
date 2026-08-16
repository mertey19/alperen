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

Stack: Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4
(CSS-first `@theme`, ayrı config dosyası yok) · `next/font` ile Fraunces + Inter.

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

## Mimari

```
src/
  config/teacher.ts     Tek gerçek kaynak: kişi bilgileri, rotalar, canonical URL
  content/copy.ts       Site metinleri (yaklaşım, süreç, SSS)
  lib/seo.ts            Metadata + Person/FAQ JSON-LD (yalnızca teyitli alanlar)
  lib/contact.ts        WhatsApp / tel / mailto bağlantıları (bilgi yoksa null)
  components/ui/        Fact, Button, Photo, Section, JsonLd
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

## Alan adı

`src/config/teacher.ts` içindeki `SITE_URL` şu an
`https://www.alperengovrek.com.tr`. Alan adı netleşince değişecek tek yer burasıdır;
canonical etiketler, sitemap ve robots.txt bu değerden türetilir.
