/**
 * Site metinleri.
 *
 * Buradaki her cümle, Alperen'in tarif ettiği çalışma biçiminden türetilmiştir:
 * "her öğrenci farklı öğrenir", "öğrenciyi anlamadan derse başlamamak",
 * "öğrencinin seviyesine, öğrenme hızına ve ihtiyaçlarına göre şekillenen
 * birebir akademik destek", "konu anlatımı, soru çözümü ve düzenli öğrenme takibi".
 *
 * Hiçbir metin sayı, süre, başarı oranı, ücret veya unvan iddia etmez.
 * Böyle bir bilgi eklenecekse önce `config/teacher.ts` içinde teyit edilmelidir.
 */

export const hero = {
  eyebrow: "Denizli · 1-12. Sınıf · Birebir Matematik",
  headline: "Her öğrenci farklı öğrenir.",
  headlineAccent: "Ders süreci de buna göre şekillenmeli.",
  body:
    "Denizli'de ilkokuldan liseye, öğrencinin seviyesine, öğrenme hızına ve ihtiyaçlarına " +
    "göre şekillenen birebir matematik desteği. LGS, TYT ve AYT hazırlığı dahil; şehir " +
    "dışından online.",
} as const;

export const principles = [
  {
    title: "Önce öğrenciyi tanımak",
    body:
      "Derse başlamadan önce öğrencinin nerede zorlandığını, hangi konuyu eksik bıraktığını ve " +
      "nasıl öğrendiğini anlamak gerekir. Aynı konu her öğrenciye aynı şekilde anlatılmaz.",
  },
  {
    title: "Seviyeye göre ilerlemek",
    body:
      "Program öğrenciye uydurulur, öğrenci programa değil. İhtiyaç varsa geri dönülür, " +
      "hazır olduğunda hızlanılır. Amaç konuyu bitirmek değil, öğrencinin anlamasıdır.",
  },
  {
    title: "Süreci görünür kılmak",
    body:
      "Düzenli öğrenme takibi sayesinde öğrencinin nerede olduğu, neyi kazandığı ve nerede " +
      "desteğe ihtiyaç duyduğu belirsiz kalmaz.",
  },
] as const;

export const services = [
  {
    title: "Konu anlatımı",
    body:
      "Öğrencinin takıldığı konu, sınıfın hızından bağımsız olarak öğrencinin anlayacağı " +
      "şekilde yeniden ele alınır.",
  },
  {
    title: "Soru çözümü",
    body:
      "Anlaşılan konunun soruya dönüşmesi ayrı bir beceridir. Sorular birlikte çözülür, " +
      "yapılan hata üzerinde konuşulur.",
  },
  {
    title: "Düzenli öğrenme takibi",
    body:
      "Ders tek başına yeterli değildir. Neyin tekrar edildiği ve neyin unutulduğu " +
      "düzenli olarak takip edilir.",
  },
] as const;

export const process = [
  {
    step: "01",
    title: "Ön görüşme",
    body:
      "Çocuğunuzun şu anda nerede zorlandığını, okulda neyi takip ettiğini ve sizin " +
      "beklentinizi konuşuyoruz.",
  },
  {
    step: "02",
    title: "Öğrenciyi tanıma",
    body:
      "İlk derslerde öğrencinin seviyesi, çalışma alışkanlığı ve öğrenme hızı görülür. " +
      "Plan bundan sonra yapılır.",
  },
  {
    step: "03",
    title: "Derslerin şekillenmesi",
    body:
      "Konu anlatımı ve soru çözümü, öğrencinin ihtiyacına göre ağırlığını değiştirir. " +
      "Sabit bir şablon uygulanmaz.",
  },
  {
    step: "04",
    title: "Düzenli takip ve geri bildirim",
    body:
      "Öğrencinin gelişimi takip edilir; veli olarak süreçte nerede olduğunuzu bilirsiniz.",
  },
] as const;

export const audienceCards = [
  {
    title: "İlkokul",
    body:
      "Temel kavramların oturmadığı dönemde acele etmek işe yaramaz. Öğrencinin kendi " +
      "hızında, güven kaybetmeden ilerlemesi esastır.",
  },
  {
    title: "Ortaokul",
    body:
      "Konular ağırlaşıp tempo arttığında eksikler birikmeye başlar. Amaç, biriken eksiği " +
      "kapatırken öğrencinin derse olan güvenini geri kazandırmak — LGS de bu temelin " +
      "üstüne kuruluyor.",
  },
  {
    title: "Lise",
    body:
      "Matematik artık hem müfredat hem sınav demek. Konu eksiği kapatılırken soru çözme " +
      "alışkanlığının da oturması gerekiyor; TYT ve AYT hazırlığı bu ikisini birlikte yürütmekle " +
      "ilerliyor.",
  },
] as const;

/**
 * SSS.
 * Yalnızca doğrulanmamış bilgi gerektirmeyen sorular burada durur; ders içeriği,
 * şehir ve ücret gibi konular teyit edilene kadar iletişim sayfasına yönlendirilir.
 */
export const faqs = [
  {
    question: "İlk görüşmede ne konuşuyoruz?",
    answer:
      "Çocuğunuzun şu anki durumu, zorlandığı konular, okul programı ve sizin beklentileriniz. " +
      "Ön görüşme bir tanışmadır; sürecin nasıl ilerleyeceğine birlikte karar veririz.",
  },
  {
    question: "Çocuğum konularda geride, yine de başlayabilir miyiz?",
    answer:
      "Evet. Ders süreci öğrencinin bulunduğu yerden başlar. Eksik konular tespit edilip " +
      "sırayla ele alınır; sınıf seviyesine yetişmek için konu atlanmaz.",
  },
  {
    question: "Veli olarak süreci nasıl takip ederim?",
    answer:
      "Düzenli öğrenme takibi sürecin parçasıdır. Öğrencinin hangi konuda ilerlediği ve " +
      "nerede desteğe ihtiyaç duyduğu size düzenli olarak aktarılır.",
  },
  {
    question: "Ders ücretleri hakkında bilgiyi nasıl alabilirim?",
    answer:
      "Ücret ve ders sıklığı gibi konuları doğrudan görüşmede netleştiriyoruz. " +
      "İletişim sayfasındaki kanallardan yazabilirsiniz.",
  },
] as const;

/**
 * Verilmeyen sözler.
 * Sınav sonucu, yüzde ve derece iddiası bu sitede hiç yer almıyor; bunun
 * nedenini gizlemek yerine açıkça yazmak veli için daha net bir bilgi.
 */
export const boundaries = [
  {
    title: "Not ya da sınav sonucu garantisi verilmez",
    body:
      "Hiçbir öğretmen bir çocuğun alacağı notu taahhüt edemez. Söz verilen şey, öğrencinin " +
      "eksiğinin görülmesi ve üzerine düzenli çalışılmasıdır.",
  },
  {
    title: "Hazır paket satılmaz",
    body:
      "Önceden belirlenmiş ders sayısı ve sabit içerik, öğrenciyi tanımadan verilen bir karardır. " +
      "Plan, öğrenci görüldükten sonra yapılır.",
  },
  {
    title: "Konu, öğrenci anlamadan bitmiş sayılmaz",
    body:
      "Müfredata yetişmek adına anlaşılmayan konunun üzerinden geçilmez; eksik konu geri gelir.",
  },
] as const;
