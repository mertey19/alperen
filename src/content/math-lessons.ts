/** Hizmet içerikleri; konu örnekleri sabit bir müfredat veya sonuç vaadi değildir. */
export type LessonSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
};

export type LessonPage = {
  readonly slug: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly intro: string;
  readonly goals: readonly string[];
  readonly sections: readonly LessonSection[];
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
  readonly related: readonly string[];
  readonly grade?: number;
};

export const LESSONS_UPDATED_AT = "2026-10-19";

export const lessonPages: readonly LessonPage[] = [
  {
    slug: "1-sinif",
    label: "1. sınıf matematik",
    grade: 1,
    title: "Denizli 1. Sınıf Matematik Özel Ders",
    description: "Denizli'de 1. sınıf matematik özel ders: sayı kavramı, toplama ve çıkarma üzerine çocuğun seviyesine göre birebir çalışma. Alperen Gövrek ile görüşün.",
    intro: "İlkokula başlayan bir çocuk için matematik, doğru cevabı söylemekten önce sayının neyi anlattığını keşfetmektir. Denizli'de 1. sınıf matematik özel ders süreci; çocuğun sayma, karşılaştırma ve basit işlemleri nasıl düşündüğünü anlamakla başlar. Okuma hızıyla matematik bilgisini birbirine karıştırmadan, kısa ve yaşına uygun çalışmalar seçilir.",
    goals: ["Sayıları nesne ve çizimlerle ilişkilendirmek", "Toplama ve çıkarmanın anlamını konuşmak", "Kısa bir soruyu anlayıp çözümünü anlatmak"],
    sections: [
      { heading: "Önce çocuğun sayıyı nasıl gördüğüne bakılır", paragraphs: [
        "Bir grup nesneyi sayabilmekle o gruptan bir nesne çıkarıldığında ne olacağını düşünmek farklı becerilerdir. İlk çalışmalarda çocuk nesneleri sayar, iki grubu karşılaştırır ve yaptığını kendi kelimeleriyle anlatır. Zorlandığı adım görülmeden uzun işlem listelerine geçilmez.",
        "Örneğin masada yedi kalem varken ikisi kaldırıldığında ne kaldığı birlikte gösterilebilir. Ardından aynı durum bir çizime ve 7 − 2 işlemine dönüştürülür. Çocuk cevabı söylese bile çizimle işlem arasındaki bağlantıyı kurup kurmadığına bakılır.",
      ] },
      { heading: "Evde kısa ve anlaşılır tekrar", paragraphs: [
        "Ev çalışması, çocuğun tek başına anlayabildiği küçük bir görevle başlayabilir. Birkaç nesneyi gruplamak, bir sayıyı farklı biçimlerde göstermek veya gündelik bir durumu resimle anlatmak buna örnektir. Süre, çocuğun dikkatini sürdürebildiği zamana ve okul ödevlerine göre konuşulur.",
        "Veli için önemli bir gözlem, çocuğun yardım istediği noktadır. Soruyu okuyamamak, ne istendiğini anlayamamak ve işlemi kuramamak ayrı ayrı ele alınır. Evde bütün cevabı vermek yerine nerede durulduğu not edilerek sonraki derste paylaşılabilir.",
      ] },
      { heading: "1. sınıfta yüz yüze ve online ders planı", paragraphs: [
        "Denizli'de yüz yüze matematik özel dersin yeri ve saati ön görüşmede netleşir. Şehir dışından online ilkokul matematik özel ders düşünülüyorsa çocuğun ekranda iletişim kurabilmesi, defterini gösterebilmesi ve başlangıçta ihtiyaç duyacağı yetişkin desteği ayrıca değerlendirilir. Ders biçimi yaşa göre birlikte seçilir.",
      ] },
    ],
    faqs: [
      { question: "Çocuğum okumayı yeni öğreniyor; matematik desteği nasıl planlanır?", answer: "Okuma becerisiyle matematikteki düşünme adımları ayrı gözlenir. Sözlü yönergeler, nesneler ve çizimler kullanılabilir; çalışma okulda işlenen konulara ve çocuğun mevcut seviyesine göre belirlenir." },
      { question: "Her gün uzun ödev gerekir mi?", answer: "Hazır bir ödev süresi verilmez. Çocuğun yaşı, okul yükü ve kendi başına yapabildiği görevler görülerek kısa tekrarların kapsamı görüşülür." },
    ],
    related: ["ilkokul", "2-sinif", "fiyatlar"],
  },
  {
    slug: "2-sinif",
    label: "2. sınıf matematik",
    grade: 2,
    title: "Denizli 2. Sınıf Matematik Özel Ders",
    description: "Denizli'de 2. sınıf matematik özel ders için basamak değeri, işlem mantığı ve problem çözme desteği. Öğrenciye uygun çalışma planını birlikte konuşun.",
    intro: "Denizli'de 2. sınıf matematik özel ders arayan bir aile için başlangıç, çocuğun sayılarla nasıl işlem yaptığına bakmaktır. Sonucu bulurken kullandığı yol, hangi konuda desteğe ihtiyaç duyduğunu gösterebilir. İşlem hızı kadar sayıların büyüklüğünü ve basamakların anlamını açıklaması da önem taşır.",
    goals: ["Bir sayıyı onluk ve birliklerle göstermek", "İşlem adımlarını anlamıyla birlikte açıklamak", "Problemde verilenle isteneni ayırt etmek"],
    sections: [
      { heading: "Basamak değerini yalnızca isim olarak öğrenmemek", paragraphs: [
        "28 sayısındaki iki rakamının yirmiyi temsil etmesi, nesne grupları veya çizimler üzerinden gösterilebilir. Çocuk aynı sayıyı iki onluk ve sekiz birlik olarak kurar, sonra farklı bir sayıyla karşılaştırır. Yazdığı sembolle gösterdiği miktarın aynı olması kontrol edilir.",
        "Toplama veya çıkarmada takılma varsa hangi basamakta durulduğu gözlenir. Yalnızca işlem kuralını tekrar ettirmek yerine çocuğun sayıyı nasıl ayırdığı sorulur. Böylece konu anlatımı, ihtiyaç duyulan adımla ilişkilendirilir.",
      ] },
      { heading: "Problem metninden işlem seçmeye", paragraphs: [
        "Kısa bir problem önce çocuğun kendi cümlesiyle anlatılır. Ne olduğu, hangi miktarın bilindiği ve hangi miktarın sorulduğu konuşulur. Metindeki tek bir kelimeye bakıp toplama veya çıkarma seçmek yerine durumun anlamı üzerinde durulur.",
        "Örneğin bir gruba yeni nesneler eklemekle iki grubun farkını bulmak çizimle karşılaştırılabilir. Sonraki çalışmada benzer bir durum farklı sayılarla verilir. Çocuk işlemi yeniden seçebiliyorsa yalnızca eski cevabı hatırlamadığı da görülür.",
      ] },
      { heading: "Dersler arasındaki takip", paragraphs: [
        "Denizli'de birebir matematik dersi için okul defteri ve birkaç örnek ödev ilk görüşmede paylaşılabilir. Veliyle hangi becerinin çalışıldığı ve evde neyin gözlenebileceği konuşulur. Yüz yüze dersin konumu, program ve ücret teyit edilir; şehir dışından online dersin uygunluğu ayrıca değerlendirilir.",
      ] },
    ],
    faqs: [
      { question: "İşlem yapıyor ama problem çözemiyor; nereden başlanır?", answer: "Çocuğun problemdeki durumu anlatması ve verilenleri ayırması gözlenir. Zorlanma okumada, işlemi seçmede veya hesaplamada olabilir; çalışma bu gözleme göre planlanır." },
      { question: "Okul ödevleri derste tekrar mı yapılır?", answer: "Ödevler öğrencinin düşünme yolunu görmek için kullanılabilir. Dersin tamamını aynı ödeve ayırmak yerine ihtiyaç duyulan beceri belirlenerek uygun örnekler seçilir." },
    ],
    related: ["ilkokul", "1-sinif", "3-sinif"],
  },
  {
    slug: "3-sinif",
    label: "3. sınıf matematik",
    grade: 3,
    title: "Denizli 3. Sınıf Matematik Özel Ders",
    description: "Denizli 3. sınıf matematik özel ders: çarpma, bölme ve problem çözmede işlemin anlamına odaklanan birebir ders desteği. Alperen Gövrek ile tanışın.",
    intro: "3. sınıfta bir çocuğun işlemleri ezberden söylemesiyle bir problemde neden o işlemi seçtiğini açıklaması aynı şey değildir. Denizli'de 3. sınıf matematik özel ders planı, bu iki beceriyi ayrı ayrı gözlemleyerek kurulabilir. Okulda işlenen konu ve çocuğun önceki bilgileri birlikte değerlendirilir.",
    goals: ["Çarpma ve bölmeyi grup ve paylaşım örnekleriyle açıklamak", "Bir problemin çözümünü adımlara ayırmak", "Bulunan sonucu farklı bir yolla kontrol etmek"],
    sections: [
      { heading: "Çarpma bilgisini farklı gösterimlerle kullanmak", paragraphs: [
        "Altı grupta dörder nesne düşünmek, 6 × 4 işleminin neyi anlattığını görünür kılabilir. Çocuk aynı durumu çizimle veya tekrar eden toplamayla gösterir. Sonuca ulaşmasının yanında gösterimler arasındaki ilişkiyi açıklamasına da bakılır.",
        "Çarpım bilgisinde zorlanıyorsa yalnızca daha hızlı cevap vermesi istenmez. Hangi ilişkilerden yararlanabildiği gözlenir; bildiği bir işlemden bilmediğine geçiş denenebilir. Kullanılan yolun çocuğun seviyesine uygun olması önemlidir.",
      ] },
      { heading: "Paylaştırma ve gruplamayı ayırt etmek", paragraphs: [
        "24 kalemi altı çocuğa eşit dağıtmakla altışarlı kutulara yerleştirmek aynı sayılarla farklı durumlar anlatır. Çocuğun sorulanın ne olduğunu söylemesi ve sonucu birimiyle açıklaması istenir. İşlem doğru olsa bile cevabın soruyu karşılayıp karşılamadığı kontrol edilir.",
        "Ev çalışmasında birkaç sorunun ardından çocuğun kendi problemini kurması denenebilir. Kendi yazdığı durumun çözülebilir olup olmadığını incelemek, hangi bilgileri kullanabildiği hakkında öğretmene ve veliye somut bir gözlem sunar.",
      ] },
      { heading: "3. sınıf için çalışma düzeni", paragraphs: [
        "Matematik ders desteği, okul ödevlerini ve çocuğun dikkat süresini dikkate alan bir programla konuşulur. Denizli'de yüz yüze dersin yeri ve randevu saati teyit edilir. Şehir dışından online birebir matematik dersi düşünülüyorsa materyal ve çözüm paylaşımı önceden değerlendirilir.",
      ] },
    ],
    faqs: [
      { question: "Çarpım tablosunu bilmek tek başına yeterli mi?", answer: "Çarpım bilgisinin yanında hangi durumda çarpma veya bölme seçileceği de değerlendirilir. Çocuğun işlemi bir çizimle ya da problemle açıklaması, anlamı nasıl kurduğunu gösterir." },
      { question: "Ders öncesinde hangi materyaller paylaşılabilir?", answer: "Okul defteri, güncel ödevler ve çocuğun yardım almadan denediği birkaç soru başlangıç için kullanılabilir. Yeni kaynak seçimi ihtiyaç görüldükten sonra konuşulabilir." },
    ],
    related: ["ilkokul", "2-sinif", "4-sinif"],
  },
  {
    slug: "4-sinif",
    label: "4. sınıf matematik",
    grade: 4,
    title: "Denizli 4. Sınıf Matematik Özel Ders",
    description: "Denizli'de 4. sınıf matematik özel ders: kesirleri anlama, çok adımlı problemler ve ortaokula hazırlık. Yüz yüze ve online ders düzenini görüşün.",
    intro: "Denizli'de 4. sınıf matematik özel ders ararken yalnızca bir sonraki yazılıyı değil, çocuğun ortaokula taşıyacağı temel becerileri de düşünmek yararlıdır. İşlemi seçme, çözümünü düzenli yazma ve yaptığı işlemi açıklama birlikte ele alınabilir. Çalışma okulda işlenen konular ve öğrencinin mevcut bilgisi üzerinden planlanır.",
    goals: ["Kesri aynı bütün üzerinde anlamlandırmak", "Birden fazla adım gerektiren sorularda plan kurmak", "İşlemleri ve sonucu kontrol etme alışkanlığı geliştirmek"],
    sections: [
      { heading: "Kesirlerde parçayı ve bütünü birlikte görmek", paragraphs: [
        "Bir yarımla iki çeyreği karşılaştırırken aynı büyüklükte bütünler kullanılmalıdır. Öğrenci bunu bir çizimle gösterdikten sonra 1/2 ile 2/4 arasındaki ilişkiyi sayılarla açıklayabilir. Görselden sembole geçişte zorlanıyorsa bu aşamaya ayrıca zaman ayrılır.",
        "Kuralları arka arkaya sıralamak yerine öğrencinin parçaları nasıl düşündüğü sorulur. Eş parçalar, bütünün seçimi ve sayı doğrusundaki yer farklı örneklerle ele alınabilir. Amaç hazır bir çözümü tekrarlamaktan çok düşünceyi görünür hale getirmektir.",
      ] },
      { heading: "Çok adımlı soruda önce çözüm planı", paragraphs: [
        "Bir soruda hemen hesaplama yapmadan önce hangi ara sonuca ihtiyaç olduğu konuşulabilir. Öğrenci adımları kısa cümlelerle sıralar ve sonra işlemleri yazar. Yanlış yapıldığında ilk farklılaşan adımı bulmak, bütün çözümü yeniden anlatmaktan daha belirli bir hedef oluşturur.",
        "Ev tekrarında aynı yöntemi gerektiren farklı bir soru seçilir. Öğrenci benzerliği kendi başına fark edebiliyor mu, yoksa işlemin adı söylenince mi ilerliyor? Bu gözlem, sonraki derste ne kadar desteğe ihtiyaç olduğunu konuşmaya yardımcı olur.",
      ] },
      { heading: "Online 4. sınıf matematik özel ders hazırlığı", paragraphs: [
        "Şehir dışından online ders planlanıyorsa çocuğun defterini kameraya gösterebilmesi, soruyu sesli anlatabilmesi ve gerekli çizim araçlarını hazırlaması değerlendirilir. Denizli'de yüz yüze ders için konum ve saat görüşülür. Ders süresi, ücret ve veliyle takip biçimi ön görüşmede netleştirilir.",
      ] },
    ],
    faqs: [
      { question: "Ortaokula hazırlık için bütün konuları baştan bitirmek gerekir mi?", answer: "Hazır bir tekrar listesi yerine öğrencinin mevcut çözümleri incelenir. Yeni öğrenmeleri destekleyen bir temel eksikliği görülürse o beceri için ayrı çalışma planlanır." },
      { question: "Online derste çizimler nasıl paylaşılır?", answer: "Kullanılacak araçlar ve defter görüntüsü önceden denenebilir. Öğrencinin yalnızca ekranı izlemesi yerine kendi çizimini ve çözüm adımlarını gösterebilmesi değerlendirilir." },
    ],
    related: ["ilkokul", "5-sinif", "online"],
  },
  {
    slug: "5-sinif",
    label: "5. sınıf matematik",
    grade: 5,
    title: "Denizli 5. Sınıf Matematik Özel Ders",
    description: "Denizli 5. sınıf matematik özel ders: ortaokula geçişte sayı bilgisi, kesirler ve problem çözme desteği. Online ve yüz yüze ders için görüşün.",
    intro: "Ortaokula geçerken öğrencinin çalışma biçimi de değişebilir. Denizli'de 5. sınıf matematik özel ders, okulda işlenen konuyu takip etmenin yanında önceki bilgilerin nerede kullanıldığını görmeye alan açar. Öğrencinin neyi tek başına yapabildiği ve hangi adımda yardım istediği başlangıç için önemli bir bilgidir.",
    goals: ["Kesir ve sayı büyüklüklerini karşılaştırmak", "Çözümü gerekçesiyle birlikte yazmak", "Okul çalışmasıyla kısa tekrarları bir arada planlamak"],
    sections: [
      { heading: "Kesirlerde büyüklüğü düşünerek başlamak", paragraphs: [
        "3/4 ile 2/3 karşılaştırılırken öğrenciden önce yaklaşık büyüklükleri düşünmesi istenebilir. Sayı doğrusu veya eş bütünler kullanılabilir; sonrasında sembolik çözümle ilişki kurulur. Doğru işlemi yapmasıyla sonucu anlamlandırması ayrı ayrı gözlenir.",
        "Bir kesrin neden daha büyük olduğunu açıklamakta zorlanıyorsa yalnızca işlem kuralına dönülmez. Bütünün ve eş parçaların anlamı yeniden konuşulabilir. Konu tekrarı böylece öğrencinin takıldığı belirli bir soruya yanıt verir.",
      ] },
      { heading: "Ortaokulda kendi çalışmasını başlatmak", paragraphs: [
        "Öğrencinin hangi kaynağı açacağını, hangi soruları deneyeceğini ve yapamadığında neyi not edeceğini bilmesi gerekir. Matematik çalış demek yerine açık bir görev seçilebilir. Sonraki derse yarım kalan çözümünü getirmesi de çalışmanın bir parçası sayılır.",
        "Haftalık değerlendirmede okul ödevleriyle ek tekrarın aynı ihtiyacı karşılayıp karşılamadığına bakılır. Gereksiz tekrar yükü eklemek yerine eksik kalan beceri seçilir. Öğrenci programı uygulayamadığında süre, zorluk ve yönerge yeniden ele alınır.",
      ] },
      { heading: "Online 5. sınıf matematik özel ders düzeni", paragraphs: [
        "Şehir dışından online ortaokul matematik özel ders için ses, bağlantı ve öğrencinin defterini paylaşma biçimi görüşülür. Denizli'de yüz yüze dersin konumu ve takvimi ayrıca netleşir. Öğrencinin sınıfı, okul programı ve örnek çözümleri ilk görüşmede paylaşılabilir.",
      ] },
    ],
    faqs: [
      { question: "İlkokuldan kalan eksikler yeni konuyla birlikte çalışılabilir mi?", answer: "İlgili ön bilgi görülerek çalışma planında yer ayrılabilir. Hangi beceriye ne kadar süre gerektiği öğrencinin çözüm örneklerine göre konuşulur." },
      { question: "Çocuğum ödevini ancak yanındayken yapıyor; bu konuşulabilir mi?", answer: "Görevin anlaşılıp anlaşılmadığı, zorluğu ve çalışma süresi birlikte değerlendirilebilir. Öğrencinin kendi başına başlayabileceği küçük adımlar belirlemek görüşmenin bir parçası olabilir." },
    ],
    related: ["ortaokul", "4-sinif", "6-sinif"],
  },
  {
    slug: "6-sinif",
    label: "6. sınıf matematik",
    grade: 6,
    title: "Denizli 6. Sınıf Matematik Özel Ders",
    description: "Denizli'de 6. sınıf matematik özel ders: işlem temeli, ilişkileri kurma ve konu eksiklerini tamamlama. Alperen Gövrek ile birebir çalışma planı.",
    intro: "Denizli'de 6. sınıf matematik özel ders arayan bir öğrenci, anlatımı dinlerken anladığını ama farklı bir soruda nereden başlayacağını bilemediğini söyleyebilir. Bu durumda konu bilgisinin yanında yöntemi seçme aşaması da incelenir. Öğrencinin okul kitabı, ödevi ve kendi çözüm denemeleri planın başlangıcını oluşturur.",
    goals: ["Sayı ve işlem bilgisini farklı durumlarda kullanmak", "İki büyüklük arasındaki ilişkiyi açıklamak", "Yanlışın kaynağını bulup uygun tekrar seçmek"],
    sections: [
      { heading: "İlişkiyi işlemden önce anlatmak", paragraphs: [
        "Bir gruptaki iki farklı nesnenin sayıları karşılaştırılırken önce hangi iki büyüklükten söz edildiği belirlenebilir. Örneğin iki kırmızı ve üç mavi nesnenin oluşturduğu bir grubun tamamıyla tek bir parçası aynı şeyi anlatmaz. Öğrencinin sözel açıklaması incelenir.",
        "İlişki kurulduktan sonra tablo, çizim veya işlemle gösterilebilir. Öğrenci bir gösterimde ilerleyip diğerinde duruyorsa geçiş üzerinde çalışılır. Her soruda aynı şablonu aramak yerine neyin bilindiğini ve neyin istendiğini belirleme alışkanlığı ele alınır.",
      ] },
      { heading: "Eksik konuyu çalışırken nedenini ayırmak", paragraphs: [
        "Yanlış bir soruda yalnızca cevap değil, öğrencinin kullandığı adımlar saklanır. Hata işlem sırasından mı, sayının anlamından mı, yoksa soruyu okumaktan mı geliyor? Aynı görünen yanlışlar farklı çalışmalar gerektirebildiği için konu listesi tek başına yeterli olmaz.",
        "Kısa bir tekrarın ardından benzer beceriyi kullanan yeni bir soru denenebilir. Eski cevabı hatırlamakla yöntemi başka bir soruya taşımak ayrı değerlendirilir. Dersler arasındaki görevler de bu gözleme göre seçilir.",
      ] },
      { heading: "Online 6. sınıf matematik özel ders seçeneği", paragraphs: [
        "Online matematik konu anlatımı düşünülüyorsa öğrencinin kendi çözümünü nasıl göstereceği de konuşulmalıdır. Şehir dışından online dersin uygunluğu, Denizli'de yüz yüze dersin konumu ve uygun saatler ön görüşmede değerlendirilir. Ücret ve takip biçimi baştan netleştirilir.",
      ] },
    ],
    faqs: [
      { question: "Konu anlatımı mı soru çözümü mü öncelikli olmalı?", answer: "Öğrencinin örnek çözümleri görülerek karar verilir. Kavram eksikse anlatım ve anlamlandırma; bilgiyi kullanmakta zorlanıyorsa uygun sorular ve yanlış analizi birlikte planlanabilir." },
      { question: "Her yanlış konu eksiği anlamına mı gelir?", answer: "Hayır. Soruyu anlama, yöntem seçme ve işlem aşamaları ayrı ayrı incelenir. Çalışma hedefi yanlışın oluştuğu adıma göre belirlenir." },
    ],
    related: ["ortaokul", "5-sinif", "7-sinif"],
  },
  {
    slug: "7-sinif",
    label: "7. sınıf matematik",
    grade: 7,
    title: "Denizli 7. Sınıf Matematik Özel Ders",
    description: "Denizli 7. sınıf matematik özel ders: rasyonel sayılar, cebirsel düşünme ve problem çözme için kişiye özel çalışma. Online ders uygunluğunu görüşün.",
    intro: "7. sınıf matematiğinde öğrencinin bildiği işlemleri yeni gösterimlerle kullanması gerekebilir. Denizli'de 7. sınıf matematik özel ders planı, sembollerin ne anlama geldiğini ve hangi adımın neden seçildiğini konuşmaya zaman ayırır. Çalışma okulda ilerlenen konuya ve öğrencinin mevcut bilgisine göre belirlenir.",
    goals: ["İşaret ve kesir bilgisini birlikte kullanmak", "Sözel bir ilişkiyi cebirsel gösterimle anlatmak", "Çözüm adımlarını kontrol ederek hata yerini bulmak"],
    sections: [
      { heading: "İşaret hatasının hangi adımda oluştuğunu görmek", paragraphs: [
        "−3/4 + 1/2 gibi bir örnekte öğrenci ortak payda, işaret ve toplama adımlarını ayrı ayrı açıklayabilir. Sonucun yaklaşık hangi aralıkta olması gerektiğini düşünmek de kontrolün bir parçası olabilir. Hata bulunduğunda yalnızca doğru satır yazılıp geçilmez.",
        "Bir öğrenci ortak paydayı buluyor ama işareti kaybediyor olabilir; bir diğeri ise kesrin büyüklüğünü anlamlandırmakta zorlanabilir. Aynı soru bu farklı ihtiyaçları gösterebildiği için tekrar görevi öğrencinin çözümüne göre seçilir.",
      ] },
      { heading: "Bilinmeyeni anlamlı bir büyüklük olarak kullanmak", paragraphs: [
        "Bir denklemde harfin neyi temsil ettiği ve bulunan değerin başlangıçtaki duruma uyup uymadığı konuşulur. Öğrenci önce ilişkiyi sözle anlatabilir, ardından tablo veya denklemle gösterebilir. Yalnızca kural uygulamakla ilişki kurmak ayrı değerlendirilir.",
        "Ders sonrası görevde benzer bir durum farklı bir bağlamla sunulabilir. Öğrencinin hangi yöntemi seçeceğini kendisinin belirlemesi istenir. Takıldığı satırı not etmek, sonraki derste konu tekrarını daha belirli bir hedefe yöneltir.",
      ] },
      { heading: "Online 7. sınıf matematik özel ders ve takip", paragraphs: [
        "Şehir dışından online matematik soru çözümü için öğrencinin ilk denemelerini okunaklı paylaşması önemlidir. Denizli'de yüz yüze dersin yeri, günleri ve ücret ön görüşmede netleşir. Okul ödevleri ve düzenli tekrar birlikte düşünülerek öğrenciye uygulanabilir bir plan konuşulur.",
      ] },
    ],
    faqs: [
      { question: "Şimdiden yalnızca sınav sorularına mı çalışılmalı?", answer: "Okul konuları ve temel beceriler görülmeden tek tip soru planı yapılmaz. Mevcut konuyu anlama, farklı sorularda kullanma ve tekrar ihtiyacı birlikte değerlendirilir." },
      { question: "İşaret hataları nasıl takip edilebilir?", answer: "Öğrencinin ilk çözümü saklanıp hatanın başladığı satır işaretlenebilir. Sonraki örnekte aynı adımın nasıl yapıldığı gözlenerek tekrarın işe yarayıp yaramadığı konuşulur." },
    ],
    related: ["ortaokul", "6-sinif", "8-sinif"],
  },
  {
    slug: "8-sinif",
    label: "8. sınıf matematik",
    grade: 8,
    title: "Denizli 8. Sınıf Matematik Özel Ders ve LGS Desteği",
    description: "Denizli'de 8. sınıf matematik özel ders ve LGS desteği: konu eksiği, soru çözümü, deneme analizi ve birebir öğrenci takibi. Alperen Gövrek ile görüşün.",
    intro: "Denizli'de 8. sınıf matematik özel ders arayışında okul dersleriyle LGS hazırlığının nasıl birlikte yürütüleceği konuşulmalıdır. Öğrencinin yalnızca net sayısına bakmak yerine konu bilgisi, soruyu anlama ve süre kullanımı ayrı değerlendirilir. Çalışma planı bu başlangıçtan hareketle oluşturulur.",
    goals: ["Okul konularındaki eksikleri belirlemek", "Uzun sorularda verilenlerle isteneni ayırmak", "Deneme sonuçlarından bir sonraki çalışma hedefini çıkarmak"],
    sections: [
      { heading: "Konu bilgisini anlamıyla birlikte kontrol etmek", paragraphs: [
        "Bir kareköklü ifadeyi düzenleyen öğrenci, sonucun yaklaşık büyüklüğünü de düşünebilir. Örneğin √72 ifadesinin sekiz ile dokuz arasında olması, yapılan düzenlemenin kontrolünde kullanılabilir. Hesaplama ile sayının anlamı birlikte konuşulur.",
        "Bu yalnızca çalışma biçimine bir örnektir. Hangi konuların ele alınacağı okulda işlenen içerik, öğrencinin çözümleri ve güncel resmî sınav açıklamaları üzerinden belirlenir. Sabit bir konu listesi veya önceden verilmiş net hedefi bütün öğrencilere uygulanmaz.",
      ] },
      { heading: "Denemeden sonraki karar, denemenin bir parçasıdır", paragraphs: [
        "Yanlışlar konu bilgisi, okuma, işlem ve süre gibi başlıklarla incelenebilir. Boş soruya süre olmadan yeniden bakılması da yararlı bir gözlem sağlar. Öğrencinin soruyu yine çözememesiyle çözebilmesi farklı çalışma ihtiyaçları doğurur.",
        "Bir sonraki hafta için az sayıda somut hedef seçilir. Örneğin verilenleri işaretlemek veya belirli bir konu bağlantısını tekrar etmek planlanabilir. Gelişim yalnızca toplam netten değil, seçilen becerinin farklı sorularda kullanılıp kullanılmadığından da değerlendirilir.",
      ] },
      { heading: "Online 8. sınıf matematik özel ders hazırlığı", paragraphs: [
        "Şehir dışından online ders için öğrencinin deneme ve çözüm sayfalarını paylaşma biçimi önceden konuşulur. Denizli'de yüz yüze matematik özel dersin yeri ve takvimi, ders süresi ve ücret ön görüşmede netleşir. Sınav sonucu veya belirli bir net artışı taahhüt edilmez.",
      ] },
    ],
    faqs: [
      { question: "LGS için kaç derse ihtiyaç var?", answer: "Öğrenci görülmeden sabit bir ders sayısı verilemez. Mevcut bilgi, okul yükü, çalışma süresi ve hedefler değerlendirilerek ders düzeni konuşulur." },
      { question: "Deneme neti tek başına seviye belirlemek için yeterli mi?", answer: "Net sayısına öğrencinin çözüm adımları ve yanlış nedenleri eşlik etmelidir. Aynı sonucu alan öğrencilerin konu, okuma veya süre ihtiyaçları farklı olabilir." },
    ],
    related: ["ortaokul", "7-sinif", "konu-anlatimi-soru-cozumu"],
  },
  {
    slug: "ilkokul",
    label: "İlkokul matematik desteği",
    title: "Denizli İlkokul Matematik Özel Ders",
    description: "Denizli'de 1–4. sınıf çocuklar için ilkokul matematik özel ders: temel beceriler, problem çözme ve veliyle düzenli takip. Alperen Gövrek ile görüşün.",
    intro: "Denizli'de ilkokul matematik özel ders arayan veliler için temel soru, çocuğun hangi adımda desteğe ihtiyaç duyduğudur. Sayıları anlamlandırma, işlem seçme ve bir problemi anlatma aynı hızda gelişmeyebilir. Alperen Gövrek ile birebir matematik dersi görüşmesinde sınıf bilgisi kadar çocuğun kendi çözümü de değerlendirilir.",
    goals: ["1–4. sınıfta öğrencinin mevcut becerisinden başlamak", "İşlemle anlamı nesne, çizim ve sözle ilişkilendirmek", "Okul ödevleri ve ev tekrarını yaşa uygun planlamak"],
    sections: [
      { heading: "İlkokul matematik desteğinde başlangıç", paragraphs: [
        "Çocuğun öğretmen yardımı olmadan denediği birkaç soru, ihtiyacı anlamak için kullanılabilir. Sonucu söylemesi kadar ne düşündüğünü anlatabilmesi de gözlenir. Okuma sırasında zorlanmasıyla matematiksel ilişkiyi kuramaması birbirinden ayrılarak çalışma seçilir.",
        "İlk görüşmeye okul defteri, örnek ödev ve veli gözlemleri getirilebilir. Öğrencinin bütün geçmiş konuları aynı sırayla yeniden bitirmesi gerektiği varsayılmaz. Önce yeni konuyu destekleyen temel beceriler ve çocuğun bulunduğu düzey görülür.",
      ] },
      { heading: "Çocuklar için matematik özel ders nasıl ilerler?", paragraphs: [
        "Bir kavram gerekirse nesneyle veya çizimle gösterilir, sonra sayısal gösterimle ilişkilendirilir. Ardından çocuk kendi örneğini dener. İşlem hatası görüldüğünde sadece doğru cevap verilmez; ilk farklılaşan adım konuşulur. Bu yaklaşım konu anlatımıyla soru çözümünü birbirine bağlar.",
        "Veliyle takipte çocuğun bağımsız yapabildiği adımlar ve tekrar ihtiyacı paylaşılabilir. Ev çalışmasının süresi, kapsamı ve materyali çocuğun yaşına ve okul düzenine göre görüşülür. Özel ders, okul ödevini bir yetişkinin tamamlamasına dönüşmemelidir.",
      ] },
      { heading: "Sınıfınıza uygun rehberi seçin", paragraphs: [
        "1. sınıf sayı ve temel işlem anlamına, 2. sınıf basamak bilgisi ve problem okumaya, 3. sınıf grup ve paylaşım ilişkilerine, 4. sınıf ise çözüm planı ve ortaokula geçişte kullanılacak becerilere odaklanan örnekler içerir. Bunlar sabit bir müfredat listesi değildir; ders içeriği okulda işlenen konuya göre belirlenir.",
        "Denizli'de ilkokul özel ders öğretmeniyle çalışmayı planlarken yüz yüze konum, uygun saat ve ücret teyit edilir. Şehir dışından online ilkokul matematik özel ders seçeneği için çocuğun katılımı ve materyal paylaşımı ayrıca değerlendirilir.",
      ] },
    ],
    faqs: [
      { question: "İlkokulda özel ders için notların düşmesini beklemek gerekir mi?", answer: "İhtiyaç yalnızca notla değerlendirilmez. Öğrencinin soruyu anlayabilmesi, çözümünü anlatması ve ödeve başlayabilmesi gibi gözlemler ilk görüşmede konuşulabilir." },
      { question: "İlkokul matematik özel ders ücretini nasıl öğrenebilirim?", answer: "Sınıf, çalışma ihtiyacı, düşünülen ders biçimi ve uygun günler paylaşılarak güncel ücret sorulabilir. Ders süresi ve düzeniyle birlikte ön görüşmede netleştirilir." },
    ],
    related: ["1-sinif", "2-sinif", "3-sinif", "4-sinif", "online", "fiyatlar"],
  },
  {
    slug: "ortaokul",
    label: "Ortaokul matematik desteği",
    title: "Denizli Ortaokul Matematik Özel Ders",
    description: "Denizli'de 5–8. sınıf ortaokul matematik özel ders: konu anlatımı, eksik konu tamamlama, yazılı ve LGS hazırlığı için birebir ders ve öğrenci takibi.",
    intro: "Denizli'de ortaokul matematik özel ders, okul konularını anlamakla öğrencinin biriken eksiklerini birlikte ele almalıdır. 5–8. sınıfta aynı yanlışın altında farklı ihtiyaçlar bulunabilir: işlem bilgisi, problem okuma veya yöntemi seçme. Plan, öğrencinin sınıfı ve kendi çözümleri görülerek konuşulur.",
    goals: ["5–8. sınıfta konu ve ön bilgi ilişkisini görmek", "Yazılı hazırlığını düzenli tekrarlarla desteklemek", "LGS hedefinde deneme analizi ve bağımsız çözümü izlemek"],
    sections: [
      { heading: "Konu eksiğini yalnızca başlığıyla tanımlamamak", paragraphs: [
        "Kesir sorusunu yanlış yapan her öğrenci aynı çalışmaya ihtiyaç duymaz. Bir öğrenci bütünü anlamlandırırken, diğeri işlem sırasını uygularken zorlanabilir. Öğrencinin ilk denemesi incelenerek tekrarın hangi noktaya ayrılacağı belirlenir.",
        "Denizli'de matematikte zorlanan öğrencilere destek planlarken amaç, bütün soruları daha kolay hale getirmek değil uygun başlangıcı bulmaktır. Öğrenci gerekçeyi açıklayabildiğinde farklı bağlamdaki sorular denenir; yeni ihtiyaçlar görüldükçe plan güncellenir.",
      ] },
      { heading: "Okul yazılıları ve sınav hazırlığını birlikte düşünmek", paragraphs: [
        "Yazılı için okulda açıklanan kapsam ve örnekler esas alınır. LGS hazırlığı varsa öğrencinin konu bilgisiyle uzun sorulardaki okuma adımları ve süre kullanımı ayrı ayrı gözlenir. Net sayısı tek başına çalışma planına karar vermez.",
        "Haftalık matematik konu tekrarı, soru uygulaması ve yanlışlara dönüş birlikte planlanabilir. Her öğrenciye aynı soru sayısı veya süre verilmez. Okul programı, mevcut seviye ve öğrencinin bağımsız çalışma zamanı görüşmede değerlendirilir.",
      ] },
      { heading: "Birebir öğrenci takibinde neye bakılır?", paragraphs: [
        "Öğrencinin hangi görevi tamamladığı kadar nerede durduğu da konuşulur. Bir sonraki dersin hedefi, önceki haftanın örneklerinden seçilebilir. Veliye aktarılacak bilgiler ve iletişimin biçimi baştan netleştirilir; belirli bir sınav sonucu sözü verilmez.",
        "Denizli'de ortaokul özel ders öğretmeniyle yüz yüze çalışma için konum ve randevu teyit edilir. Şehir dışından online ortaokul matematik özel ders düşünülüyorsa öğrencinin çözümünü paylaşabilmesi ve ders dışındaki görevleri takip edebilmesi ayrıca değerlendirilir.",
      ] },
    ],
    faqs: [
      { question: "Ortaokul matematik ders desteği hangi sınıfları kapsıyor?", answer: "Bu bölümde 5, 6, 7 ve 8. sınıf için ayrı rehberler bulunur. Dersin içeriği öğrencinin seviyesi, okulda işlenen konular ve hazırlık hedefi üzerinden planlanır." },
      { question: "Önce konu mu bitirilmeli, yoksa deneme mi çözülmeli?", answer: "Öğrencinin ihtiyacına göre konu çalışması ve ölçme birlikte kullanılabilir. Denemede görülen yanlışın nedeni incelenerek sonraki konu tekrarı veya soru uygulaması belirlenir." },
    ],
    related: ["5-sinif", "6-sinif", "7-sinif", "8-sinif", "konu-anlatimi-soru-cozumu", "fiyatlar"],
  },
  {
    slug: "online",
    label: "Online birebir matematik dersi",
    title: "Online İlkokul ve Ortaokul Matematik Özel Ders",
    description: "Alperen Gövrek ile şehir dışından online birebir matematik dersi: ilkokul, ortaokul, konu anlatımı ve soru çözümü. Ders uygunluğunu birlikte görüşün.",
    intro: "Online birebir matematik dersi, öğrencinin yalnızca bir anlatımı izlemesinden fazlasını gerektirir. Soruyu nasıl düşündüğünü gösterebilmesi, anlamadığında durabilmesi ve kendi çözümünü paylaşabilmesi önemlidir. Alperen Gövrek ile şehir dışından online çalışma düzeni, öğrencinin yaşı ve ihtiyacı üzerinden ön görüşmede değerlendirilir.",
    goals: ["Öğrencinin online derse aktif katılımını değerlendirmek", "Defter ve soru paylaşımını önceden hazırlamak", "Konu anlatımını öğrencinin kendi çözümüyle birleştirmek"],
    sections: [
      { heading: "Online ilkokul matematik özel ders", paragraphs: [
        "Küçük yaşlarda kullanılan yönerge ve materyal seçimi özellikle önem taşır. Çocuğun kameraya çizimini gösterebilmesi, soruyu sözlü anlatabilmesi ve basit araçlara ulaşabilmesi değerlendirilir. Başlangıçta yetişkin desteği gerekip gerekmediği de görüşülür.",
        "Online 4. sınıf matematik özel ders için örneğin bir kesir çizimi veya problem çözüm planı paylaşılabilir. Daha küçük sınıflarda nesnelerle gösterim gerekebilir. Süre ve ev görevi, çocuğun dikkatini sürdürebildiği koşullara göre konuşulur.",
      ] },
      { heading: "Online ortaokul matematik özel ders", paragraphs: [
        "5, 6 ve 7. sınıfta öğrencinin kendi çözüm denemelerini saklaması görüşmeyi daha somut hale getirir. Online matematik konu anlatımı, bu çözümlerde görülen ihtiyaca göre şekillendirilebilir. Yeni soruda yöntemi öğrencinin kendisinin seçmesi de çalışmanın bir parçasıdır.",
        "Online 8. sınıf matematik özel ders ve LGS hazırlığı düşünülüyorsa deneme sayfaları, yanlış nedenleri ve süre kullanımı birlikte konuşulur. Her sınıfın rehberinde farklı çalışma örnekleri bulunur. Aynı hazır program tüm öğrencilere uygulanmaz.",
      ] },
      { heading: "Online matematik soru çözümü için hazırlık", paragraphs: [
        "Bağlantı, ses ve defter görüntüsü ders öncesinde denenebilir. Soruların okunaklı fotoğrafları ve öğrencinin ilk denemeleri hazırlanır. Kullanılacak araç ve dersler arasındaki görev paylaşımı görüşmede netleştirilir; belirli bir uygulama zorunluluğu burada varsayılmaz.",
        "Uygun ders saati, süre ve ücret ön görüşmede konuşulur. Denizli'de yaşayan öğrenciler için online biçimin uygunluğu ayrıca sorulabilir; yüz yüze matematik özel dersin yeri ve randevusu da görüşmede teyit edilir.",
      ] },
    ],
    faqs: [
      { question: "Online matematik dersi her çocuk için uygun mu?", answer: "Yaş, dikkat, iletişim ve çözüm paylaşabilme koşulları birlikte değerlendirilir. Ders biçimi öğrenci görülmeden herkes için uygun kabul edilmez." },
      { question: "Online ders için hangi cihaz veya uygulama gerekiyor?", answer: "Kullanılacak araçlar görüşmede belirlenir. Öncelik öğrencinin sesi duyabilmesi, yazısını gösterebilmesi ve çözüm sürecine katılabilmesidir; bağlantı ve görüntü önceden denenebilir." },
    ],
    related: ["ilkokul", "ortaokul", "4-sinif", "8-sinif", "fiyatlar"],
  },
  {
    slug: "fiyatlar",
    label: "Ders süresi ve ücret bilgisi",
    title: "Denizli Matematik Özel Ders Fiyatları ve Ücret Bilgisi",
    description: "Denizli matematik özel ders fiyatları için ders süresi, sınıf, çalışma hedefi ve ders biçimini birlikte görüşün. Alperen Gövrek'ten güncel ücret bilgisi alın.",
    intro: "Denizli matematik özel ders fiyatları araştırılırken yalnızca tek bir rakama bakmak, dersin kapsamını anlamaya yetmeyebilir. Süre, çalışma hedefi, ders biçimi ve takip düzeni birlikte konuşulmalıdır. Alperen Gövrek'in güncel matematik özel ders ücretleri, öğrencinin ihtiyacı ve düşünülen düzen paylaşılarak ön görüşmede öğrenilebilir.",
    goals: ["Ücreti dersin süresi ve kapsamıyla birlikte değerlendirmek", "Yüz yüze veya online düzeni baştan konuşmak", "Görüşmeye sınıf, hedef ve uygun gün bilgisiyle hazırlanmak"],
    sections: [
      { heading: "Güncel ücret nasıl öğrenilir?", paragraphs: [
        "İletişime geçerken öğrencinin sınıfını, okul desteği veya sınav hazırlığı hedefini ve uygun günleri paylaşabilirsiniz. Düşünülen ders biçimi de belirtilmelidir. Yüz yüze konum veya online ders uygunluğu değerlendirildikten sonra süre, program ve ücret birlikte netleştirilir.",
        "Sitede yayımlanmış sabit bir fiyat tablosu bulunmuyor. Bu nedenle burada başlangıç fiyatı, indirim, paket bedeli ya da Denizli ortalaması olarak bir tutar sunulmaz. Güncel bilgi doğrudan ön görüşmede teyit edilir.",
      ] },
      { heading: "Fiyat karşılaştırırken hangi sorular sorulabilir?", paragraphs: [
        "Bir dersin kaç dakika olduğu, ders dışında hangi görevlerin verileceği ve öğrenci gelişiminin nasıl paylaşılacağı sorulabilir. İptal veya erteleme koşulları ve ödeme düzeni de çalışmaya başlamadan önce konuşulmalıdır. Bu ayrıntılar burada belirlenmiş koşullar olarak sunulmaz.",
        "Öğrenci tanınmadan kaç derse ihtiyaç olduğu kesinleştirilemez. Sınıf düzeyi aynı olan iki öğrencinin konu eksiği ve bağımsız çalışma zamanı farklı olabilir. Ders sayısını bir sonuç garantisiyle ilişkilendirmek yerine ihtiyaç değerlendirmesi yapılır.",
      ] },
      { heading: "İlkokul, ortaokul ve online ders için görüşme", paragraphs: [
        "Denizli ilkokul matematik özel ders ve ortaokul matematik desteğinde öğrencinin yaşı, okul düzeni ve çalışma ihtiyacı paylaşılabilir. Şehir dışından online birebir matematik dersi düşünülüyorsa bağlantı ve çözüm paylaşımının uygunluğu da değerlendirilir.",
        "İlk mesajınızda sınıfı, destek istediğiniz konuyu ve uygun günleri belirtmek yeterli bir başlangıçtır. Görüşme bağlantısından güncel ders süresi ve ücret bilgisini sorabilirsiniz. Kesinleşmeyen bir ders programı veya ücret bu sayfada taahhüt edilmez.",
      ] },
    ],
    faqs: [
      { question: "Denizli matematik özel ders ücretleri ne kadar?", answer: "Bu sitede sabit bir ücret tablosu yayımlanmıyor. Sınıf, dersin süresi, çalışma hedefi ve düşünülen ders biçimi paylaşılarak güncel ücret ön görüşmede öğrenilebilir." },
      { question: "Online ve yüz yüze matematik dersinin ücreti aynı mı?", answer: "İki biçim için eşit veya farklı ücret olduğu varsayılmaz. Dersin uygunluğu, süresi ve güncel bedeli görüşmede ayrı ayrı teyit edilmelidir." },
      { question: "Ücret almak için hangi bilgileri paylaşmalıyım?", answer: "Öğrencinin sınıfı, hedefi, yüz yüze veya online ders tercihi ve uygun günler yeterli bir başlangıçtır. Ayrıntılı kişisel öğrenci bilgilerini ilk mesajda paylaşmanız gerekmez." },
    ],
    related: ["ilkokul", "ortaokul", "online"],
  },
  {
    slug: "konu-anlatimi-soru-cozumu",
    label: "Konu anlatımı ve soru çözümü",
    title: "Denizli Matematik Konu Anlatımı ve Soru Çözümü",
    description: "Denizli'de temel matematik, eksik konu tamamlama, konu tekrarı ve soru çözümü için birebir ders desteği. Öğrencinin seviyesine uygun planı görüşün.",
    intro: "Denizli'de matematik öğrenme desteği ararken konu anlatımıyla soru çözümünü iki ayrı seçenek olarak görmek gerekmez. Öğrencinin mevcut bilgisi görülür, ihtiyaç duyulan kavram ele alınır ve yeni sorularda nasıl kullanıldığı gözlenir. Matematikte bireysel eğitim, bu adımların öğrencinin başlangıcına göre düzenlenmesiyle somutlaşır.",
    goals: ["Temel matematikte eksik ön bilgiyi belirlemek", "Kavramı farklı gösterimlerle anlamlandırmak", "Soru çözümü ve yanlış analiziyle sonraki hedefi seçmek"],
    sections: [
      { heading: "Temel matematik ve eksik konu tamamlama", paragraphs: [
        "Bir öğrenci yeni konuda durduğunda gereken ön bilgiler incelenebilir. Örneğin denklemde yaşanan güçlük kesir veya işlem sırası bilgisine bağlı olabilir. Matematik eksik konu tamamlama çalışması, öğrencinin takıldığı yerden başlayıp gerekli bağlantıyı arar.",
        "Seviye değerlendirmesinde son yazılı, ödev ve öğrencinin ilk çözüm denemeleri kullanılabilir. Bütün konuları yeniden anlatmak yerine ihtiyaç görülen beceri seçilir. Bir eksiğin kaç derste kapanacağı öğrenci tanınmadan kesinleştirilmez.",
      ] },
      { heading: "Konu anlatımından bağımsız çözüme", paragraphs: [
        "Konu anlatımı sırasında öğrenci kavramı kendi cümlesiyle açıklamayı ve bir örnekte kullanmayı dener. Ardından benzer bir beceri farklı bir soruda istenir. Öğrencinin hangi yöntemi seçeceğini kendi başına belirlemesi, anlatımı izlemekten farklı bir aşamadır.",
        "Soru çözümünde doğru cevaba bakıp geçmek yerine ilk farklılaşan adım bulunur. Hatanın konu, okuma veya işlemden gelmesi farklı tekrar görevleri gerektirebilir. Denizli'de kişiye özel matematik dersi planı bu gözlemlerle güncellenir.",
      ] },
      { heading: "Konu tekrarı ve matematik sınavına hazırlık", paragraphs: [
        "Haftalık planda yeni konu, kısa tekrar ve yanlışlara dönüş için yer ayrılabilir. Okul yazılısında öğretmenin açıkladığı kapsam, sınav hazırlığında ise güncel resmî açıklamalar esas alınır. Sonuç veya net garantisi verilmeden öğrencinin çözüm becerisi takip edilir.",
        "Denizli'de yüz yüze matematik ders desteğinin konumu ve takvimi görüşmede netleşir. Şehir dışından online matematik konu anlatımı ve soru çözümü için materyal paylaşımı ayrıca değerlendirilir. Ders süresi, ücret ve takip biçimi baştan konuşulur.",
      ] },
    ],
    faqs: [
      { question: "Matematikte konu tekrarı nasıl seçilir?", answer: "Öğrencinin çözümlerinde tekrarlayan güçlükler ve yeni konunun gerektirdiği ön bilgiler incelenebilir. Tekrar, hangi becerinin neden çalışılacağı açık olacak şekilde seçilir." },
      { question: "Konu anlatımını dinleyince anlıyor ama tek başına yapamıyor; ne yapılabilir?", answer: "Yöntemi seçme ve ilk adımı kurma aşamaları ayrı gözlenebilir. Öğrencinin kendi denemesini saklaması, ihtiyaç duyduğu ipucunu ve sonraki çalışma hedefini belirlemeyi kolaylaştırır." },
    ],
    related: ["ilkokul", "ortaokul", "8-sinif", "online"],
  },
];

export function getLessonPage(slug: string): LessonPage | undefined {
  return lessonPages.find((page) => page.slug === slug);
}
