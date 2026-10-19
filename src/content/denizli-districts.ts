import type { BlogPost } from "./blog";

export type DistrictBlogPost = BlogPost & { readonly district: string };

function districtPost(post: Omit<DistrictBlogPost, "publishedAt" | "cover">): DistrictBlogPost {
  return { ...post, publishedAt: "2026-10-19", cover: null };
}

/**
 * İlçe adları: Denizli Valiliği, https://www.denizli.gov.tr/ilcelerimiz
 * Her yazı ayrı bir öğrenme ihtiyacına odaklanır. İlçede şube, sabit ders yeri,
 * ücret veya yüz yüze hizmet garantisi verilmez; bunlar ön görüşmede netleşir.
 */
export const districtBlogPosts: readonly DistrictBlogPost[] = [
  districtPost({
    district: "Acıpayam",
    slug: "acipayam-matematik-ozel-ders",
    title: "Acıpayam matematik özel ders: eksik konudan çalışma planına",
    description:
      "Acıpayam'da matematik özel ders arayan aileler için konu eksiğini belirleme, seviyeye uygun çalışma ve ilk görüşmeye hazırlık rehberi.",
    intro:
      "Acıpayam'da matematik desteği ararken başlangıç noktası yalnızca son sınav notu olmamalı. Öğrencinin hangi adımda durduğunu görmek, dersin amacını daha anlaşılır hale getirir. Kesirlerde zorlanan bir öğrenciyle problemi anlayıp işlem hatası yapan öğrencinin aynı çalışma planına ihtiyacı yoktur.",
    sections: [
      {
        heading: "Son yanlışın bir adım gerisine bakın",
        paragraphs: [
          "İlk görüşmeye son yazılı, birkaç ödev ve öğrencinin tek başına çözemediği sorularla hazırlanılabilir. Soruları yalnızca doğru ve yanlış diye ayırmak yerine, çözümün nerede kesildiği işaretlenir: verilenleri anlama, işlem seçme, hesaplama ya da sonucu kontrol etme.",
          "Örneğin oran sorusunda hata varsa önce kesir ve bölme bilgisi gözden geçirilebilir. Bir ön bilgi eksikliği görülüyorsa yeni konuyu tekrar anlatmadan önce o basamak üzerinde çalışmak için zaman ayrılır.",
        ],
      },
      {
        heading: "Haftayı küçük ve izlenebilir adımlara bölün",
        paragraphs: [
          "Örnek bir hafta; bir gün kısa konu tekrarı, başka bir gün seviyeye uygun sorular, sonrasında yanlışların yeniden çözümü şeklinde kurulabilir. Süre ve soru sayısı öğrencinin yaşına, okul ödevine ve dikkatini sürdürebildiği zamana göre belirlenir.",
          "İlerlemeyi yalnızca net sayısıyla izlemek yerine öğrencinin bir çözümü kendi cümleleriyle açıklayıp açıklayamadığına da bakın. Yapabildiği adımları kaydetmek, sonraki haftanın hedefini seçmeyi kolaylaştırır.",
        ],
      },
      {
        heading: "Ders düzenini görüşmede netleştirin",
        paragraphs: [
          "Acıpayam'dan iletişime geçerken sınıfı, hedefi ve uygun günleri paylaşmak yeterli bir başlangıçtır. Yüz yüze dersin yeri, ulaşım, saat ve ücret ön görüşmede konuşulmalıdır. Online ders düşünülüyorsa uygunluk, bağlantı ve öğrencinin çözümünü nasıl paylaşacağı da ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Acıpayam için matematik özel ders planı, öğrencinin mevcut bilgisini gördükten sonra anlam kazanır. İlk hedef bütün konuları hızla bitirmek değil, bir sonraki adımı bağımsız atabilmesini sağlamaktır.",
  }),
  districtPost({
    district: "Babadağ",
    slug: "babadag-matematik-ozel-ders",
    title: "Babadağ matematik özel ders: kısa tekrarlarla öğrenmeyi sürdürmek",
    description:
      "Babadağ'da matematik çalışmasını düzenlemek isteyen öğrenciler için kısa tekrar, hatırlama soruları ve dersler arası takip önerileri.",
    intro:
      "Babadağ'da matematik özel ders arayan bir aile için dersin kendisi kadar iki ders arasındaki çalışma da önem taşır. Öğrenci anlatım sırasında anladığı bir yöntemi birkaç gün sonra tek başına uygulayamıyorsa yalnızca yeni konu eklemek yeterli olmayabilir. Planın içinde hatırlamaya da yer açmak gerekir.",
    sections: [
      {
        heading: "Defteri kapatıp bir soruyla başlayın",
        paragraphs: [
          "Konu anlatımını tekrar okumadan önce önceki dersten kısa bir soru seçilebilir. Öğrenci ilk adımı kendi başına denediğinde hangi bilginin aklında kaldığı görülür. Takıldığı yerde çözümün tamamını göstermek yerine ihtiyaç duyduğu ipucunu vermek, sonraki denemeyi gözlemlemeyi sağlar.",
          "Örneğin kesirleri karşılaştırırken neden ortak payda seçildiğini açıklamasını isteyin. Doğru sonuca ulaşmasıyla yöntemin gerekçesini anlatması ayrı ayrı değerlendirilebilir; biri gelişirken diğerinin desteğe ihtiyacı olabilir.",
        ],
      },
      {
        heading: "Tek uzun oturum yerine birkaç buluşma noktası",
        paragraphs: [
          "Haftalık programa iki ya da üç kısa tekrar zamanı eklemek denenebilir. İlkinde öğrenilen yönteme benzer bir soru, ikincisinde farklı biçimde sorulmuş bir örnek, sonuncusunda eski bir konuyla karışık çalışma seçilir. Bu bir örnektir; süre öğrenciye göre ayarlanır.",
          "Takip çizelgesine yalnızca tamamlandı işareti koymak yerine öğrencinin sormak istediği tek bir soruyu da yazması istenebilir. Böylece bir sonraki özel ders, hangi noktaya dönülmesi gerektiği bilindiği için daha somut bir hedefle başlar.",
        ],
      },
      {
        heading: "Babadağ'dan ilk görüşmeye hazırlanırken",
        paragraphs: [
          "Sınıf düzeyi, okul programı ve ders dışında ayrılabilecek zaman birlikte paylaşılmalı. Yüz yüze görüşmenin konumu ve saatleri önceden netleştirilir. Online seçenek değerlendirilecekse öğrencinin defterini gösterebilmesi ve ders sırasında rahat soru sorabilmesi de görüşülür.",
        ],
      },
    ],
    closing:
      "Babadağ'da sürdürülebilir bir matematik düzeni kurarken küçük tekrarların gerçekten yapılıp yapılmadığına bakın. Öğrencinin ertesi hafta kendi başına hatırlayabildiği bilgi, planı değerlendirmek için somut bir işarettir.",
  }),
  districtPost({
    district: "Baklan",
    slug: "baklan-matematik-ozel-ders",
    title: "Baklan matematik özel ders: dört işlem ve kesir temelini güçlendirmek",
    description:
      "Baklan'da matematik desteği arayan veliler için işlem becerisi, kesirleri anlamlandırma ve temel konu çalışmalarını planlama rehberi.",
    intro:
      "Baklan'da ilkokul veya ortaokul için matematik özel ders düşünülüyorsa önce temel işlemlerin nasıl yapıldığına bakılabilir. Hızlı cevap vermek her zaman kavramın anlaşıldığı anlamına gelmez. Öğrencinin işlemi bir çizimle, nesneyle ya da kendi cümlesiyle açıklaması farklı bir bilgi sunar.",
    sections: [
      {
        heading: "İşlemin anlamını görünür hale getirin",
        paragraphs: [
          "Çarpma işlemi eş gruplarla, bölme ise paylaştırma örnekleriyle ele alınabilir. Öğrenci aynı durumu hem resim hem işlem olarak gösterdiğinde hangi gösterimde zorlandığı anlaşılır. Amaç bütün soruları somut malzemeyle çözmek değil, sembollerin neyi anlattığını kontrol etmektir.",
          "Örneğin 24 nesneyi altışarlı gruplara ayırmak ile altı kişiye eşit paylaştırmak aynı işlemle yazılabilir. Öğrencinin bu iki durumu açıklamasını istemek, ezberlenmiş işlemle anlamlı çözümü ayırt etmeye yardımcı olabilir.",
        ],
      },
      {
        heading: "Kesirlerde kurala geçmeden bütünü belirleyin",
        paragraphs: [
          "Bir kesrin neyi temsil ettiği, bütünün ne seçildiğine bağlıdır. Eş büyüklükte iki dikdörtgen çizip birini ikiye, diğerini dörde bölerek yarım ile iki çeyrek karşılaştırılabilir. Parçaların eş olması ve aynı bütün üzerinden konuşulması açıkça gösterilir.",
          "Sonraki adımda çizim kaldırılıp aynı ilişki sayılarla kurulur. Öğrenci çizimde yapabildiğini sembollerle yapamıyorsa bu geçişe ayrı zaman ayrılır. Soru sayısını artırmadan önce hangi gösterimde desteğe ihtiyaç olduğu belirlenir.",
        ],
      },
      {
        heading: "Temel çalışma planını yaşa göre kurun",
        paragraphs: [
          "Baklan'dan yapılacak ön görüşmede sınıf, kullanılan okul kaynakları ve örnek hatalar paylaşılabilir. Ders süresi ve ev çalışması öğrencinin yaşına göre konuşulur. Yüz yüze dersin konumu, program ve ücret teyit edilir; online çalışmanın uygunluğu ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Baklan'da temel matematik desteğinin ilk ölçütü hız olmak zorunda değil. Öğrencinin hangi işlemi neden seçtiğini anlatabilmesi, sonraki konular için üzerinde çalışılabilecek bir başlangıç sağlar.",
  }),
  districtPost({
    district: "Bekilli",
    slug: "bekilli-matematik-ozel-ders",
    title: "Bekilli matematik özel ders: LGS sorularında okuma ve çözüm adımları",
    description:
      "Bekilli'de LGS matematik hazırlığı için uzun soruları anlama, verilenleri ayırma ve çözümü kontrol etme üzerine uygulanabilir bir çalışma rehberi.",
    intro:
      "Bekilli'de LGS hazırlığı için matematik özel ders arayan öğrenciler bazen konuyu bildikleri halde uzun sorularda durduklarını söyler. Böyle bir durumda yalnızca konu anlatımıyla devam etmeden önce soruyu okuma sürecini incelemek gerekir. Hangi bilginin verildiğiyle hangi sonucun istendiği birbirine karışıyor olabilir.",
    sections: [
      {
        heading: "Soruyu üç parçaya ayırın",
        paragraphs: [
          "İlk okumada durumun ne olduğu öğrencinin kendi cümlesiyle anlatılır. İkinci adımda sayısal bilgiler ve koşullar ayrı yazılır. Son olarak sorulan büyüklük belirlenir. Her cümlenin altını çizmek yerine çözümde kullanılacak bilgilerin seçilmesi üzerinde durulur.",
          "Örneğin bir alan sorusunda kenar uzunlukları, birim ve şeklin koşulları ayrı ayrı kaydedilebilir. Öğrenci bu listeyi hazırladıktan sonra işlemi seçer. Yanlışın okuma sırasında mı yoksa matematiksel ilişkiyi kurarken mi oluştuğu daha kolay görülür.",
        ],
      },
      {
        heading: "Önce süre tutmadan, sonra kontrollü süreyle",
        paragraphs: [
          "Yeni bir soru türünde ilk hedef çözüm yolunu kurmak olabilir. Öğrenci yöntemi açıklayabildiğinde benzer sorularla süre takibine geçilebilir. En baştan hız baskısı oluşturmak yerine hangi adımın uzun sürdüğü kaydedilir ve o adım için ayrı çalışma seçilir.",
          "Çözüm sonunda bulunan değerin sorulanı karşılayıp karşılamadığı kontrol edilir. Birim, yaklaşık büyüklük ve verilen koşullar yeniden okunur. Deneme sonrasında aynı kontrolü yapmak, doğru cevabın neden doğru olduğunu da konuşmaya alan açar.",
        ],
      },
      {
        heading: "İlk görüşmede örnek soru paylaşın",
        paragraphs: [
          "Bekilli'den LGS desteği için iletişime geçerken öğrencinin çözümünü yarıda bıraktığı birkaç soru özellikle yararlıdır. Okul saatleri ve çalışma hedefiyle birlikte dersin yeri, takvimi ve ücreti konuşulur. Online ders uygunluğu ve materyal paylaşımı ayrıca netleştirilir.",
        ],
      },
    ],
    closing:
      "Bekilli'de LGS matematik çalışmasını değerlendirirken yalnızca kaç soru çözüldüğünü sormayın. Öğrencinin soruyu anlayıp çözüm yolunu kendi başına kurabildiği örnekleri de birlikte inceleyin.",
  }),
  districtPost({
    district: "Beyağaç",
    slug: "beyagac-matematik-ozel-ders",
    title: "Beyağaç matematik özel ders: dersler arasında bağımsız çalışmak",
    description:
      "Beyağaç'ta matematik özel ders planlayan öğrenciler için bağımsız çalışma, soru notları ve yüz yüze ya da online görüşmeye hazırlık önerileri.",
    intro:
      "Beyağaç'ta matematik özel ders arayışında dersler arasında öğrencinin ne yapacağı baştan konuşulmalı. Öğretmen yanındayken ilerleyen ama tek başına nereden başlayacağını bilemeyen bir öğrencinin, ayrıntılı bir konu listesinden önce açık bir çalışma yönergesine ihtiyacı olabilir.",
    sections: [
      {
        heading: "Ödevi yapılabilir bir yönergeye dönüştürün",
        paragraphs: [
          "Matematik çalış demek yerine hangi kaynaktan hangi konunun deneneceği, takılınca ne yapılacağı ve bir sonraki derse ne getirileceği belirlenebilir. Öğrenci görevi kendi cümleleriyle tekrar ettiğinde yönergenin anlaşılıp anlaşılmadığı da görülür.",
          "Örnek bir görev şöyle kurulabilir: kesirlerde toplamayla ilgili birkaç soruyu dene, yapamadığında durduğun satırı işaretle, ardından benzer bir çözüm örneğini incele. Sonraki derste yalnızca cevabı değil, hangi aşamada yardım gerektiğini konuşmak mümkün olur.",
        ],
      },
      {
        heading: "Çözülemeyen soruyu da çalışmanın parçası sayın",
        paragraphs: [
          "Öğrenci soruyu tamamen boş bırakmak yerine neyi anladığını ve hangi işlemi düşündüğünü yazabilir. Böylece öğretmen, çözümün görünmeyen başlangıcını da değerlendirebilir. Her boş soruyu aynı tür konu eksikliği olarak ele almak gerekmez.",
          "Haftalık görüşmede tamamlanan görevler kadar yarım kalanlar da incelenir. Görev sürekli erteleniyorsa zorluk, süre veya yönerge yeniden ele alınır. Programın kâğıt üzerinde dolu görünmesi yerine öğrencinin uygulayabildiği bir düzende olması hedeflenir.",
        ],
      },
      {
        heading: "Çalışma biçimini önceden konuşun",
        paragraphs: [
          "Beyağaç'tan iletişim kurarken yüz yüze ders için konum ve ulaşım, program için uygun günler paylaşılabilir. Online ders düşünülüyorsa bağlantı, kamera ve defter paylaşımı denenmelidir. Dersin uygunluğu, takip şekli ve ücret görüşmede netleşir; ilçe içinde sabit bir ders noktası varsayılmamalıdır.",
        ],
      },
    ],
    closing:
      "Beyağaç için hazırlanacak matematik planında küçük ama açık görevler başlangıcı kolaylaştırabilir. Öğrencinin kendi başına denediği ve soru üretebildiği bir süreç, sonraki dersin içeriğini de belirler.",
  }),
  districtPost({
    district: "Bozkurt",
    slug: "bozkurt-matematik-ozel-ders",
    title: "Bozkurt matematik özel ders: okul ödeviyle konu tekrarını dengelemek",
    description:
      "Bozkurt'ta matematik desteği arayan aileler için okul ödevleri, yazılı hazırlığı ve konu tekrarını aynı haftada planlama rehberi.",
    intro:
      "Bozkurt'ta matematik özel ders düşünülürken okul ödevleriyle ek çalışmanın birbiriyle nasıl ilişkilendirileceği önem taşır. Aynı konuyu farklı kaynaklardan tekrar tekrar çözmek her öğrenci için gerekli olmayabilir. Önce okulda işlenen konu, öğrencinin eksiği ve yaklaşan değerlendirme birlikte görülmelidir.",
    sections: [
      {
        heading: "Haftalık yükü görünür hale getirin",
        paragraphs: [
          "Okul ödevleri, sınavlar ve diğer etkinlikler tek bir takvime yazılabilir. Matematik çalışması için kalan zaman bundan sonra belirlenir. Her boşluğu soruyla doldurmak yerine dinlenme ve beklenmedik ödevler için de pay bırakmak programı değerlendirmeyi kolaylaştırır.",
          "Örneğin yazılı haftasında yeni bir soru bankasına başlamak yerine okul defterindeki temel örnekler ve önceki yanlışlar seçilebilir. Yazılı sonrasında ise kısa bir değerlendirmeyle hangi konunun tekrar istediği belirlenir; yalnızca nota bakılıp geçilmez.",
        ],
      },
      {
        heading: "Ödev kontrolünü cevap kontrolünden ayırın",
        paragraphs: [
          "Doğru cevap verilmiş bir soruda da öğrenciden kullandığı yöntemi açıklaması istenebilir. Yanlışta ise hemen doğru çözümü göstermek yerine ilk farklılaşan adım bulunur. Bu inceleme, bütün ödevi yeniden yaptırmadan belirli bir beceriye odaklanmayı sağlar.",
          "Ek çalışma seçilirken okul ödevinin hangi ihtiyacı zaten karşıladığına bakın. İşlem pratiği yeterliyken problem kurma eksik kalmışsa ek sorular bu alandan seçilebilir. Böylece ders ve ev çalışması birbirini tamamlayacak şekilde planlanır.",
        ],
      },
      {
        heading: "Bozkurt için görüşmeye ne getirilmeli?",
        paragraphs: [
          "Okul programı, örnek ödev ve son yazılı ilk görüşme için yararlı başlangıç malzemeleridir. Hedef, ders sıklığı ve ev çalışmasına ayrılabilecek zaman birlikte konuşulur. Yüz yüze dersin yeri ve ücret teyit edilir; online ders seçeneği öğrenciye uygunluğu üzerinden değerlendirilir.",
        ],
      },
    ],
    closing:
      "Bozkurt'ta matematik çalışma düzeni kurarken hedef her gün daha fazla iş eklemek olmamalı. Öğrencinin mevcut yükü içinde hangi çalışmanın hangi ihtiyacı karşılayacağı açık olmalıdır.",
  }),
  districtPost({
    district: "Buldan",
    slug: "buldan-matematik-ozel-ders",
    title: "Buldan matematik özel ders: ortaokuldan liseye sağlam geçiş",
    description:
      "Buldan'da lise matematiğine hazırlık için kesir, oran, cebir ve problem çözme temelini değerlendirmeye yönelik öğrenci ve veli rehberi.",
    intro:
      "Buldan'da liseye geçiş döneminde matematik özel ders arayan aileler için ilk adım, öğrencinin yeni konulara hangi bilgilerle başladığını görmek olabilir. Sınıf değiştiğinde kitap da değişir; ancak kesirlerle işlem, oran kurma ve bilinmeyeni anlamlandırma gibi beceriler çalışmanın içinde kalır.",
    sections: [
      {
        heading: "Geçmiş konuları tek tek taramak yerine bağlantı kurun",
        paragraphs: [
          "Basit bir denklemde zorlanma görüldüğünde işlem sırası ve kesir bilgisi de kontrol edilebilir. Öğrenci sözel bir durumu denklemle yazamıyorsa bilinmeyenin neyi temsil ettiğini anlatması istenir. Aynı yanlışın altında farklı ihtiyaçlar bulunabileceği için hazır bir tekrar listesiyle yetinilmez.",
          "Örneğin bir sayının üçte biriyle ilgili bir problemi önce sözle, sonra çizimle, son olarak cebirsel ifadeyle göstermek denenebilir. Hangi geçişin zor olduğu belirlendiğinde çalışma daha küçük bir hedefe ayrılır.",
        ],
      },
      {
        heading: "Lise başlangıcında çözümü yazma alışkanlığı",
        paragraphs: [
          "Sonucu zihinden bulmak bazı sorularda yeterli olsa da çözüm adımlarını yazmak düşünceyi incelemeyi sağlar. Eşitliğin iki tarafında hangi işlemin yapıldığı ve neden yapıldığı belirtilir. Böylece öğrenci hatayı yalnızca son satırda aramak zorunda kalmaz.",
          "Haftalık çalışmada bir bölüm okul konusuna, bir bölüm de o konunun ihtiyaç duyduğu eski bilgiye ayrılabilir. Oran ve süre sabit değildir; öğrencinin örnek çözümleri yeniden incelendikçe plan güncellenir.",
        ],
      },
      {
        heading: "Buldan'dan ders planını görüşürken",
        paragraphs: [
          "Sınıf, son işlenen konu ve öğrencinin zorlandığı örnekler paylaşılabilir. Okul saatleri ve düzenli çalışma zamanı dikkate alınarak ders biçimi konuşulur. Yüz yüze konum, program ve ücret önceden teyit edilir; online ders uygunluğu ayrıca ele alınır.",
        ],
      },
    ],
    closing:
      "Buldan'da lise matematiğine hazırlanırken bütün eski konuları baştan bitirmek gerekmeyebilir. Yeni konuyu taşıyan temel becerileri bulmak ve o bağlantıları çalışmak daha belirgin bir başlangıç sunar.",
  }),
  districtPost({
    district: "Çal",
    slug: "cal-matematik-ozel-ders",
    title: "Çal matematik özel ders: deneme yanlışlarından çalışma hedefi çıkarmak",
    description:
      "Çal'da matematik sınavlarına hazırlanan öğrenciler için deneme analizi, hata türlerini ayırma ve bir sonraki haftanın hedefini seçme rehberi.",
    intro:
      "Çal'da matematik özel ders ve sınav hazırlığı planlarken deneme sonucu bir başlangıç verisi olarak kullanılabilir. Aynı net sayısına ulaşan iki öğrenciden biri konuyu bilmediği, diğeri süreyi yetiştiremediği için soru kaçırmış olabilir. Bu iki durumun çalışma karşılığı aynı değildir.",
    sections: [
      {
        heading: "Yanlışları tek bir başlık altında toplamayın",
        paragraphs: [
          "Her soru için konu bilgisi, soruyu anlama, işlem ve süre gibi kısa notlar tutulabilir. Sınıflandırma öğrencinin çözümü incelenerek yapılır; her hatayı dikkatsizlik diye adlandırmak yeterli değildir. Öğrencinin nerede ve neden farklı bir adım seçtiği sorulur.",
          "Boş bırakılan sorular da ayrıca ele alınır. Öğrenci süre olmadan soruyu çözebiliyorsa zaman kullanımı üzerinde çalışılabilir. Çözemiyorsa gerekli ön bilgi ve yöntem yeniden gözden geçirilir. Böylece boş sayısı tek başına karar verdirmez.",
        ],
      },
      {
        heading: "Bir denemeden az sayıda somut hedef seçin",
        paragraphs: [
          "Bütün yanlışları aynı haftada kapatmaya çalışmak yerine tekrarlayan bir ya da iki ihtiyaç seçilebilir. Örneğin bir hedef oran kurmak, diğeri çözüm sonunda birimi kontrol etmek olabilir. Hedefler, öğrencinin uygulayabileceği bir görevle eşleştirilir.",
          "Sonraki değerlendirmede yalnızca toplam nete değil, seçilen hata türünün benzer sorularda sürüp sürmediğine bakılır. Eski yanlışın cevabını hatırlamakla aynı beceriyi yeni bir soruda kullanmak ayrı ayrı gözlenmelidir.",
        ],
      },
      {
        heading: "Çal için ön görüşmede deneme örneği paylaşın",
        paragraphs: [
          "Bir sonuç belgesiyle birlikte öğrencinin karalama ve çözüm sayfaları da değerlidir. Sınıf ve hedef sınav belirtildikten sonra ders düzeni konuşulur. Yüz yüze görüşmenin konumu, saatleri ve ücret netleştirilir; online ders ve soru paylaşımının uygunluğu ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Çal'da sınav hazırlığında denemenin değeri, sonucundan hangi çalışma kararının çıkarıldığıyla ilgilidir. Bir sonraki hafta neyin farklı yapılacağı belli olduğunda takip de daha anlaşılır olur.",
  }),
  districtPost({
    district: "Çameli",
    slug: "cameli-matematik-ozel-ders",
    title: "Çameli matematik özel ders: ders biçimini ve çalışma ortamını seçmek",
    description:
      "Çameli'de matematik desteği planlayan aileler için yüz yüze ve online ders görüşmesi, çalışma ortamı ve materyal hazırlığına ilişkin öneriler.",
    intro:
      "Çameli'de matematik özel ders ararken dersin hangi ortamda sürdürülebileceği baştan düşünülmeli. Ders biçimi seçilirken yalnızca takvim değil, öğrencinin soru sorabilmesi ve çözümünü gösterebilmesi de değerlendirilir. Her öğrenci için aynı düzenin uygun olduğu varsayılmamalıdır.",
    sections: [
      {
        heading: "Uygun ortamı somut sorularla değerlendirin",
        paragraphs: [
          "Öğrenci ders boyunca kullanabileceği sakin bir alana sahip mi? Defter, kitap ve gerekli araçlar elinin altında mı? Aile bu sorulara bakarak hazırlık yapabilir. Çalışma alanının gösterişli olması gerekmez; öğrencinin rahatça yazabildiği ve konuşabildiği bir düzen yeterli bir başlangıçtır.",
          "Yüz yüze ders planında görüşme yeri, ulaşım ve ders sonrası tekrar zamanı birlikte ele alınır. Çameli içinde sabit bir adres ya da her mahallede ders imkânı olduğu kabul edilmeden, mümkün olan düzen öğretmenle teyit edilmelidir.",
        ],
      },
      {
        heading: "Online seçenek konuşuluyorsa kısa bir hazırlık yapın",
        paragraphs: [
          "Online dersin öğrenci için uygun olup olmadığı ayrıca görüşülmelidir. Değerlendirilecekse bağlantı, ses ve defter görüntüsü önceden denenebilir. Öğrencinin yalnızca ekranı izlemesi yerine çözüm adımlarını nasıl paylaşacağı ve nerede söz alacağı belirlenir.",
          "Ders öncesinde soruların okunaklı fotoğraflarını hazırlamak ve kullanılacak sayfaları işaretlemek zaman kazandırabilir. Ders sonunda öğrencinin kendi başına çözeceği kısa bir görev belirlenir; sonraki görüşmede bu görevin hangi kısmının yapılabildiği incelenir.",
        ],
      },
      {
        heading: "İlk mesajda hangi bilgiler olmalı?",
        paragraphs: [
          "Çameli'den iletişime geçerken sınıf, okul programı, matematikteki temel ihtiyaç ve düşünülen ders biçimi paylaşılabilir. Uygun günler, ders sıklığı, konum ve ücret ön görüşmede netleşir. Böylece öğrenciye uygun bir düzenin kurulup kurulamayacağı birlikte değerlendirilebilir.",
        ],
      },
    ],
    closing:
      "Çameli için ders seçimini, öğrencinin aktif katılım gösterebildiği koşullar üzerinden yapın. Uygun çalışma ortamı ve açık bir takip planı, dersin nasıl ilerlediğini görmeyi kolaylaştırır.",
  }),
  districtPost({
    district: "Çardak",
    slug: "cardak-matematik-ozel-ders",
    title: "Çardak matematik özel ders: okul yazılısına adım adım hazırlanmak",
    description:
      "Çardak'ta matematik yazılılarına hazırlık için konu listesi oluşturma, örnek soru seçimi ve sınav sonrası değerlendirme üzerine bir rehber.",
    intro:
      "Çardak'ta okul yazılısı öncesinde matematik özel ders arayan bir öğrencinin ilk ihtiyacı bazen yeni kaynak değil, elindeki konuları düzenlemektir. Hazırlık planı okulda işlenen içerik ve öğrencinin yapabildiği sorular üzerinden kurulabilir. Son gece bütün defteri okumak yerine daha küçük hedefler seçilir.",
    sections: [
      {
        heading: "Önce sınav kapsamını teyit edin",
        paragraphs: [
          "Öğrenci okul öğretmeninin açıkladığı kapsamı ve verilen örnekleri bir araya getirebilir. Kesinleşmemiş konular sınavda çıkacakmış gibi sunulmamalıdır. Defter, ders kitabı ve ödevler üzerinden hangi soru türlerine çalışılacağı belirlenir.",
          "Her konu için yardım almadan çözülen bir örnek seçmek başlangıç değerlendirmesi sağlar. Öğrenci yapamadığı sorunun yanına yalnızca zor yazmak yerine takıldığı adımı not eder. Bu notlar özel dersin hangi noktaya ayrılacağını somutlaştırır.",
        ],
      },
      {
        heading: "Yazılı provasında işlemleri açıkça yazın",
        paragraphs: [
          "Çalışmanın bir bölümünde sorulara bakmadan çözüm basamaklarını yazmak denenebilir. Kullanılan kuralın nerede uygulandığı gösterilir ve sonucun soruyu karşılayıp karşılamadığı kontrol edilir. Sorunun biçimi değiştiğinde yöntemin hâlâ kullanılabilir olup olmadığına bakılır.",
          "Yazılı sonrasında notla birlikte cevap kâğıdı da incelenmelidir. İşlem hatası, eksik açıklama ve konu eksiği ayrı ayrı ele alınır. Yeni konuya geçerken tekrar gerektiren bir beceri varsa bunun için sonraki haftada yer ayrılır.",
        ],
      },
      {
        heading: "Çardak'tan ders görüşmesine hazırlanırken",
        paragraphs: [
          "Yazılı tarihi, teyit edilmiş konu kapsamı ve öğrencinin örnek çözümleri paylaşılabilir. Ders sayısı öğrenci görülmeden kesinleştirilmemeli. Yüz yüze dersin yeri, uygun saat ve ücret konuşulur; online seçeneğin öğrenciye uygunluğu ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Çardak'ta yazılı hazırlığının hedefi yalnızca yaklaşan sınava yetişmekle sınırlı kalmayabilir. Sonrasında hangi bilginin tekrar istediğini görmek, sonraki konular için de kullanılabilecek bir çalışma planı oluşturur.",
  }),
  districtPost({
    district: "Çivril",
    slug: "civril-matematik-ozel-ders",
    title: "Çivril matematik özel ders: TYT problemlerinde denklem kurmak",
    description:
      "Çivril'de TYT matematik hazırlığı için problem metnini ilişkilere dönüştürme, bilinmeyeni seçme ve çözümü kontrol etme rehberi.",
    intro:
      "Çivril'de TYT matematik için özel ders arayan öğrenciler işlemleri yapabildikleri halde problem sorularında başlayamadıklarını söyleyebilir. Böyle bir durumda metni matematik diline dönüştüren adımlar incelenir. Hangi büyüklüklerin ilişkili olduğunu bulmak, işlem yapmaktan ayrı bir çalışma konusu olarak ele alınabilir.",
    sections: [
      {
        heading: "Bilinmeyeni seçmeden ilişkiyi anlatın",
        paragraphs: [
          "Problem önce sayılar kullanılmadan özetlenebilir: ne artıyor, ne azalıyor, hangi miktar sabit kalıyor? Ardından bilinmeyenin neyi temsil ettiği ve birimi yazılır. Böylece x sembolü bir alışkanlık olarak değil, belirli bir büyüklüğün adı olarak kullanılır.",
          "Örneğin iki kişinin yaşlarıyla ilgili bir soruda yaş farkının sabit kalması önce sözle açıklanabilir. Daha sonra tablo veya denklem kurulur. Öğrenci tabloyla ilişkiyi görebiliyorsa cebirsel gösterime geçiş ayrıca çalışılabilir.",
        ],
      },
      {
        heading: "Çözüm videosundan önce kendi denemenizi saklayın",
        paragraphs: [
          "Çözüme bakmadan önce kurulan denklem ve yarım kalan adımlar silinmemeli. Doğru çözümle karşılaştırılırken ilk ayrılan nokta aranır. Öğrencinin hatası denklemdeyse aynı soruda işlem hızını çalışmak asıl ihtiyacı karşılamayabilir.",
          "Bir yöntem öğrenildikten sonra farklı sayılar ve farklı bir bağlamla yeni bir soru denenebilir. Amaç eski cevabı hatırlamak değil, ilişkinin yeniden kurulup kurulamadığını görmek. Süre çalışması da bu değerlendirmeye göre programa eklenir.",
        ],
      },
      {
        heading: "Çivril için TYT çalışma hedefini paylaşın",
        paragraphs: [
          "Ön görüşmede mevcut deneme örnekleri, haftalık okul düzeni ve problem çözümlerindeki notlar kullanılabilir. Hedefler öğrencinin başlangıcına göre konuşulur; net garantisi verilmez. Yüz yüze ders konumu, takvim ve ücret teyit edilir; online çalışma uygunluğu ayrıca ele alınır.",
        ],
      },
    ],
    closing:
      "Çivril'de TYT problemlerine çalışırken her soruya hemen işlemle başlamayı beklemeyin. Durumu anlamlandırma ve uygun ilişkiyi kurma adımları da matematik çalışmasının bir parçasıdır.",
  }),
  districtPost({
    district: "Güney",
    slug: "guney-matematik-ozel-ders",
    title: "Güney matematik özel ders: yanlış defterini işe yarar hale getirmek",
    description:
      "Güney'de matematik desteği arayan öğrenciler için yanlış defteri tutma, hata nedenini yazma ve benzer sorularla yeniden değerlendirme önerileri.",
    intro:
      "Güney'de matematik özel ders planlayan bir öğrenci için yanlış defteri, yalnızca doğru çözümlerin kopyalandığı bir defter olmak zorunda değil. İşlevi, hangi düşüncenin yanlış adımı doğurduğunu kaydetmek olabilir. Bu kayıt bir sonraki çalışmada neyin değiştirileceğini seçmeye yardımcı olur.",
    sections: [
      {
        heading: "Sorunun yanına hata nedenini ekleyin",
        paragraphs: [
          "Yanlış soruyla birlikte öğrencinin ilk çözümü de saklanabilir. Altına hangi bilgiyi kullanamadığı, hangi koşulu atladığı ya da hangi işlemi karıştırdığı yazılır. Dikkatsizlik gibi geniş bir kelime yerine somut bir adımın belirtilmesi tercih edilir.",
          "Örneğin negatif sayıyla çarparken işaretin unutulduğu görülüyorsa not bu işlemle ilgili olmalı. Problemde istenen yerine başka bir büyüklük bulunmuşsa sorunun son cümlesine dönme alışkanlığı konuşulur. Bu iki hata için aynı tekrar görevi seçilmez.",
        ],
      },
      {
        heading: "Tekrarı cevabı hatırlamaktan ayırın",
        paragraphs: [
          "Birkaç gün sonra soru çözüm kapalıyken yeniden denenebilir. Ardından aynı beceriyi gerektiren farklı bir soru seçilir. Öğrenci eski soruyu yapıp yeni soruda takılıyorsa hangi bilginin taşınamadığı incelenir ve defterdeki not güncellenir.",
          "Defterin bütününü her gün bitirme hedefi yerine, o haftanın konusuyla ilgili birkaç kayıt seçilebilir. Artık bağımsız çözülebilen soru işaretlenir. Tekrarlayan hata ise sonraki dersin kısa başlangıç çalışmasına dönüştürülebilir.",
        ],
      },
      {
        heading: "Güney'den görüşmeye çözüm örneği getirin",
        paragraphs: [
          "Sınıf ve hedefle birlikte birkaç yanlış soru, öğrencinin çalışma biçimini konuşmak için iyi bir başlangıçtır. Dersler arasındaki takip şekli de sorulabilir. Yüz yüze konum, saat ve ücret görüşmede belirlenir; online dersin uygunluğu ve soru paylaşımı ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Güney'de matematik çalışmasını izlerken defterde kaç soru biriktiğinden çok hangi hataların yeniden ele alındığına bakın. Kullanılan bir yanlış defteri, sonraki çalışma kararına bilgi taşır.",
  }),
  districtPost({
    district: "Honaz",
    slug: "honaz-matematik-ozel-ders",
    title: "Honaz matematik özel ders: geometride şekilden gerekçeye geçmek",
    description:
      "Honaz'da matematik ve geometri desteği için şekli okuma, verilenleri işaretleme ve kullanılan kuralı açıklama üzerine öğrenci rehberi.",
    intro:
      "Honaz'da matematik özel ders arayan öğrencilerin geometri sorularında yaşadığı güçlük her zaman formül eksikliği olmayabilir. Şekilde neyin verildiğiyle neyin yalnızca öyle göründüğünü ayırmak da çalışılmalıdır. Bir çizimin görünüşüne dayanarak yapılan varsayım, doğru işlemlerle bile yanlış sonuca götürebilir.",
    sections: [
      {
        heading: "Verilenleri şeklin üzerine taşıyın",
        paragraphs: [
          "Eşit uzunluklar, paralellik ve açı bilgileri soruda belirtildiği ölçüde işaretlenir. Şekil ölçekli görünse bile yalnızca görünüşe dayanarak eşitlik kurulmaz. Öğrenciden her işaretin kaynağını göstermesi istenerek okuma aşaması ayrıca incelenebilir.",
          "Çözümde kullanılacak bir ilişki seçildiğinde bunun hangi koşula dayandığı söylenir. Örneğin üçgendeki açıların toplamını kullanmakla paralel doğrulardaki açı ilişkisini kullanmak farklı gerekçeler ister. Bu ayrım, formül listesini ezberlemekten daha ayrıntılı bir kontrol sunar.",
        ],
      },
      {
        heading: "Aynı ilişkiyi farklı çizimlerde arayın",
        paragraphs: [
          "Öğrenci bir soruyu çözdükten sonra şeklin yönü değiştirilmiş bir örnek denenebilir. Görünüş değiştiğinde kullanılan ilişkinin hâlâ tanınıp tanınmadığına bakılır. Takılma varsa konu anlatımı yerine gösterimler arasındaki bağlantıya zaman ayrılabilir.",
          "Haftalık çalışmada kısa bir bölüm çizim ve işaretlemeye, bir bölüm de çözümün nedenlerini yazmaya ayrılabilir. Hız hedefi, öğrenci gerekçeyi açıklayabildiğinde konuşulur. Her sorunun aynı yöntemle çözüleceği varsayılmadan örnekler karşılaştırılır.",
        ],
      },
      {
        heading: "Honaz için geometri ihtiyacını tarif edin",
        paragraphs: [
          "İlk görüşmede sınıf, hedef sınav ve öğrencinin çizim üzerindeki notları paylaşılabilir. Online ders düşünülüyorsa şekil ve çözümün okunaklı biçimde gösterilebilmesi değerlendirilir. Yüz yüze dersin yeri, saatleri ve ücret önceden teyit edilir.",
        ],
      },
    ],
    closing:
      "Honaz'da geometri çalışmasının hedefi yalnızca doğru uzunluğu veya açıyı bulmak değil, o sonuca hangi bilgiyle ulaşıldığını açıklayabilmek de olabilir. Bu açıklama sonraki dersin yönünü belirler.",
  }),
  districtPost({
    district: "Kale",
    slug: "kale-matematik-ozel-ders",
    title: "Kale matematik özel ders: AYT için cebir ve fonksiyon bağlantısı",
    description:
      "Denizli Kale'de AYT matematik hazırlığı için cebirsel işlemler, fonksiyon kavramı ve ön bilgi eksiklerini birlikte değerlendirme rehberi.",
    intro:
      "Denizli'nin Kale ilçesinde AYT matematik için özel ders ararken yalnızca bitirilecek konu sayısıyla plan yapmak yeterli olmayabilir. Yeni bir konuda yaşanan güçlük, daha önceki bir cebir becerisinden kaynaklanabilir. Çalışma, öğrencinin çözüm adımlarını görerek hangi bağlantının eksik kaldığını belirlemekle başlayabilir.",
    sections: [
      {
        heading: "Fonksiyonu yalnızca yerine yazma işlemi olarak görmeyin",
        paragraphs: [
          "Fonksiyon sorusunda girdi, çıktı ve kuralın neyi anlattığı ayrı ayrı konuşulabilir. Öğrenci sembolik gösterimi tabloyla veya uygun bir grafikle ilişkilendirmeyi deneyebilir. Değer bulabildiği halde bu gösterimleri açıklayamıyorsa kavram üzerinde ayrıca durulur.",
          "Bir soruda cebirsel sadeleştirme gerekiyorsa eşitliğin hangi koşullarda geçerli olduğu kontrol edilir. Paydada sıfır oluşturan değerleri gözden kaçırmak gibi bir durum, yalnızca işlem hızını artırarak ele alınamaz. İlgili ön bilgi yeniden çalışılır.",
        ],
      },
      {
        heading: "Konu sırasını öğrencinin ihtiyacıyla ilişkilendirin",
        paragraphs: [
          "AYT planında okulda işlenen konu ile onu destekleyen eski beceriler yan yana yazılabilir. Örneğin fonksiyon çalışmasının bir bölümünde denklem çözme ve ifade düzenleme tekrarına yer verilebilir. Hangi konuya ne kadar süre ayrılacağı başlangıç değerlendirmesine göre konuşulur.",
          "Haftanın sonunda karışık birkaç soruda yöntemi seçme becerisi incelenir. Aynı başlık altında arka arkaya çözülen sorularla, hangi bilginin kullanılacağını öğrencinin seçtiği sorular farklı şeyler gösterebilir. İkisine de programda yer açılabilir.",
        ],
      },
      {
        heading: "Kale'den AYT desteği için görüşürken",
        paragraphs: [
          "Sınıf, mevcut denemeler ve zorlanılan çözüm örnekleriyle başlanabilir. Hedef sınav tarihi ve okul yükü paylaşılır; belirli net veya sonuç sözü beklenmez. Yüz yüze dersin konumu, program ve ücret teyit edilir; online ders uygunluğu ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Kale'de AYT matematik planı, konuları sıraya koymanın yanında aralarındaki bağlantıları da görünür kılmalıdır. Öğrencinin hangi adım için hangi ön bilgiye ihtiyaç duyduğu anlaşılınca çalışma hedefi netleşir.",
  }),
  districtPost({
    district: "Merkezefendi",
    slug: "merkezefendi-matematik-ozel-ders",
    title: "Merkezefendi matematik özel ders: öğretmenle ilk görüşmede neler konuşulmalı?",
    description:
      "Merkezefendi'de matematik özel ders seçerken seviye değerlendirmesi, ders hedefi, veli iletişimi ve çalışma düzeni hakkında sorulabilecek sorular.",
    intro:
      "Merkezefendi'de matematik özel ders seçerken ilk görüşmenin amacı yalnızca uygun bir saat bulmak değildir. Öğrencinin ihtiyacının nasıl belirleneceği, ders dışında ne yapacağı ve gelişimin nasıl paylaşılacağı da konuşulmalıdır. Bu sorular, aileyle öğretmenin aynı süreçten söz edip etmediğini gösterir.",
    sections: [
      {
        heading: "İlk dersin amacını sorun",
        paragraphs: [
          "Seviye nasıl değerlendirilecek ve hangi materyaller incelenecek sorularıyla başlanabilir. Son yazılı ve öğrencinin kendi çözümleri, yalnızca sınıf bilgisinden daha ayrıntılı bir başlangıç sağlar. Planın öğrenci görülmeden kesinleşip kesinleşmediği de bu görüşmede anlaşılır.",
          "Hedef okul dersini takip etmek, temel eksikleri çalışmak veya sınava hazırlanmak olabilir. Birden fazla hedef varsa öncelik sırası konuşulur. Örneğin yaklaşan yazılıyla uzun vadeli konu eksiğinin haftaya nasıl dağıtılacağı açıkça sorulabilir.",
        ],
      },
      {
        heading: "Takibi ve geri bildirimi somutlaştırın",
        paragraphs: [
          "Veliye hangi aralıklarla ve hangi bilgilerle dönüş yapılacağı görüşülebilir. Yalnızca iyi gidiyor demek yerine çalışılan beceri, öğrencinin tek başına yapabildiği adım ve tekrar ihtiyacı paylaşılabilir. Bunun biçimi iki tarafın uygunluğuna göre belirlenir.",
          "Öğrenci de sürecin parçası olmalı. Anlamadığında durup soru sorabilmesi, ev görevini anlayabilmesi ve zorlandığını söyleyebilmesi değerlendirilir. Not veya sınav sonucu garantisi yerine çalışma biçiminin açıkça anlatılması beklenir.",
        ],
      },
      {
        heading: "Merkezefendi için randevu ayrıntılarını teyit edin",
        paragraphs: [
          "İletişimde sınıf, hedef, uygun günler ve görüşme için düşünülen konum paylaşılabilir. Merkezefendi'de sabit bir dershane veya ofis bulunduğu varsayılmadan yüz yüze dersin yeri netleştirilir. Ders süresi, ücret ve varsa online seçenek de ayrıca konuşulur.",
        ],
      },
    ],
    closing:
      "Merkezefendi'de özel ders kararını verirken ilk görüşmeden öğrencinin ne üzerinde çalışacağı ve sürecin nasıl izleneceği anlaşılmış olarak ayrılmak, değerlendirme için sağlam bir başlangıçtır.",
  }),
  districtPost({
    district: "Pamukkale",
    slug: "pamukkale-matematik-ozel-ders",
    title: "Pamukkale matematik özel ders: LGS, TYT ve AYT hedeflerini ayırmak",
    description:
      "Pamukkale'de matematik özel ders arayan öğrenciler için LGS, TYT ve AYT hedeflerine göre başlangıç değerlendirmesi ve çalışma öncelikleri.",
    intro:
      "Pamukkale'de matematik özel ders arayan bir öğrenci için hazırlık hedefi planın önemli bir parçasıdır. LGS, TYT ve AYT için aynı çalışma listesini kullanmak uygun olmayabilir. Öğrencinin sınıfı, okul konuları ve mevcut çözümleri birlikte görülerek öncelikler belirlenir; sınav adı tek başına yeterli bilgi vermez.",
    sections: [
      {
        heading: "LGS hedefinde soruyu anlama ve temel beceriler",
        paragraphs: [
          "LGS hazırlığında öğrencinin okuduğu durumu matematiksel ilişkiye dönüştürmesi gözlenebilir. Verilenleri ayırma, şekil veya tabloyu yorumlama ve işlem seçme aşamaları ayrı ayrı incelenir. Takılma hangi adımda yaşanıyorsa çalışma oraya yöneltilir.",
          "Örneğin üslü ifadelerle ilgili bir soruda öğrencinin kavramı mı yoksa metni mi anlamadığı araştırılabilir. Konu bilgisi yeterliyse farklı bağlamlarda örnekler seçilir. Eksik ön bilgi varsa önce o beceri için tekrar zamanı ayrılır.",
        ],
      },
      {
        heading: "TYT ve AYT çalışmalarını birbirine bağlayın",
        paragraphs: [
          "TYT için temel işlem, problem kurma ve süre kullanımı değerlendirilebilir. AYT çalışmasında ise öğrencinin ilgili lise konularını ve bu konuların ihtiyaç duyduğu cebirsel becerileri nasıl kullandığına bakılır. İki çalışma okul programıyla birlikte düşünülür.",
          "Örnek bir haftada okul konusu, ihtiyaç duyulan temel tekrar ve yanlış analizi için ayrı zamanlar belirlenebilir. Dağılım sabit bir reçete değildir. Öğrencinin deneme ve ödev çözümleri değiştikçe plan da yeniden ele alınır.",
        ],
      },
      {
        heading: "Pamukkale'den ilk görüşmede hedefi belirtin",
        paragraphs: [
          "Sınıf, hazırlık hedefi ve birkaç örnek çözüm paylaşmak görüşmeyi somutlaştırır. Güncel sınav kapsamı ve tarihler için resmî duyurular esas alınmalıdır. Yüz yüze dersin yeri, randevu ve ücret teyit edilir; online dersin uygunluğu ayrıca konuşulur.",
        ],
      },
    ],
    closing:
      "Pamukkale'de matematik özel ders planı, yalnızca sınav adına göre değil öğrencinin o hedefe hangi bilgiyle başladığına göre kurulmalıdır. İlk görüşme bu başlangıcı ve çalışma önceliklerini netleştirmek için kullanılabilir.",
  }),
  districtPost({
    district: "Sarayköy",
    slug: "saraykoy-matematik-ozel-ders",
    title: "Sarayköy matematik özel ders: problem çözmede zamanı kullanmak",
    description:
      "Sarayköy'de matematik sınavlarına hazırlık için süreyi gözlemleme, takılınan soruyu değerlendirme ve aşamalı hız çalışması önerileri.",
    intro:
      "Sarayköy'de matematik özel ders arayan öğrencilerden biri konuyu bilmediğini, diğeri bildiği halde süreyi yetiştiremediğini söyleyebilir. Süre sorunu üzerinde çalışmadan önce bu ayrım kontrol edilmelidir. Bir sorunun uzun sürmesi; okuma, yöntem seçme veya hesaplama gibi farklı aşamalardan kaynaklanabilir.",
    sections: [
      {
        heading: "Sadece toplam süreyi kaydetmeyin",
        paragraphs: [
          "Kısa bir soru grubunda hangi sorunun hangi aşamasında durulduğu not edilebilir. Öğrenci metni tekrar tekrar mı okuyor, işlem yolunu mu arıyor, yoksa yaptığı işlemi sık sık mı siliyor? Bu gözlem, sonraki görevin türünü belirlemeye yardım eder.",
          "Süre tutulmadan yapılan ikinci denemede sorunun çözülüp çözülemediğine de bakılır. Yöntem bilinmiyorsa hız alıştırmasından önce konu veya örnek çözüm çalışılabilir. Bilgi yeterliyse daha küçük bir soru grubunda zaman takibi denenebilir.",
        ],
      },
      {
        heading: "Hız hedefini kademeli konuşun",
        paragraphs: [
          "Önce öğrenciye uygun bir soru grubu seçilir ve kendi başlangıç süresi görülür. Sonraki çalışmada amaç, çözümün gerekçesini kaybetmeden daha düzenli ilerlemektir. Her öğrenciye aynı dakika hedefini vermek yerine doğru ve bağımsız çözüm de birlikte izlenir.",
          "Bir soruda uzun süre kalındığında ne yapılacağı deneme sonrasında konuşulabilir. Soruyu işaretleyip daha sonra dönme gibi bir stratejinin öğrenciye nasıl uyduğu denenir. Stratejinin sonucu yalnızca kalan süreden değil, geri dönülen soruların çözümünden de değerlendirilir.",
        ],
      },
      {
        heading: "Sarayköy için çalışma verisiyle başlayın",
        paragraphs: [
          "Ön görüşmede sınıf, hedef sınav ve süre tutularak yapılmış birkaç çözüm paylaşılabilir. Dersler arasındaki uygulamanın nasıl takip edileceği sorulur. Yüz yüze ders konumu, uygun saat ve ücret netleştirilir; online ders seçeneği öğrenciye uygunluğu üzerinden değerlendirilir.",
        ],
      },
    ],
    closing:
      "Sarayköy'de matematikte süre kullanımı üzerine çalışırken önce yavaşlığın hangi adımdan geldiğini bulun. Hız hedefi, öğrencinin anlayarak çözebildiği sorular üzerinden anlam kazanır.",
  }),
  districtPost({
    district: "Serinhisar",
    slug: "serinhisar-matematik-ozel-ders",
    title: "Serinhisar matematik özel ders: matematiğe yeniden başlamak",
    description:
      "Serinhisar'da matematik desteği arayan aileler için yapamıyorum diyen öğrenciyle başlangıç düzeyi seçme ve küçük çalışma hedefleri oluşturma rehberi.",
    intro:
      "Serinhisar'da matematik özel ders arayan bir aile, çocuğunun daha soruyu okumadan yapamam dediğini gözlemleyebilir. Böyle bir durumda yalnızca daha çok ödev vermek yerine öğrencinin hangi adımları kendi başına yapabildiğini görmekle başlanabilir. İlk çalışma hedefi, öğrencinin bulunduğu düzeye göre seçilir.",
    sections: [
      {
        heading: "Başlangıcı sınıf etiketinden önce çözümle belirleyin",
        paragraphs: [
          "Öğrenciye farklı güçlükte birkaç kısa örnek sunulabilir. Yardımsız yaptığı adımlar ve ipucu istediği yerler ayrı ayrı not edilir. Bir önceki sınıfın becerisine dönmek gerekiyorsa bu, cezalandırıcı bir tekrar gibi sunulmadan çalışma planına alınır.",
          "Örneğin kesirli problem zor geliyorsa önce kesrin anlamı, sonra işlem, ardından problem üzerinde durulabilir. Her adımın tamamlandığı öğrencinin kendi açıklamasıyla kontrol edilir. Çok kolay sorularla uzun süre oyalanmak da ihtiyaç görülmeden seçilmemelidir.",
        ],
      },
      {
        heading: "Sonuç yerine kullanılan adım hakkında konuşun",
        paragraphs: [
          "Geri bildirimde yalnızca doğru veya yanlış demek yerine hangi adımın işe yaradığı belirtilebilir. Verilenleri doğru ayırdın ya da işlemi kontrol ederken hatayı buldun gibi somut ifadeler, öğrencinin neyi tekrar kullanabileceğini görmesini sağlar.",
          "Evde kısa ve açık bir görev seçilebilir; tamamlanamayan bölümde neden durulduğu konuşulur. Başka öğrencilerle kıyaslamak yerine aynı öğrencinin önceki denemesiyle karşılaştırma yapılır. Süreçteki güçlükler sonuç vaadiyle geçiştirilmeden yeniden değerlendirilir.",
        ],
      },
      {
        heading: "Serinhisar'dan ilk görüşmede gözlemlerinizi paylaşın",
        paragraphs: [
          "Sınıf, örnek çözümler ve öğrencinin ders çalışırken söylediği somut ifadeler başlangıç için paylaşılabilir. Öğrencinin rahat soru sorabileceği ders biçimi konuşulur. Yüz yüze konum, program ve ücret teyit edilir; online seçeneğin uygunluğu ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Serinhisar'da matematiğe yeniden başlarken ilk hedef, öğrencinin yapabildiği adımı görünür kılmak olabilir. Bir sonraki görev bu başlangıçtan seçildiğinde planın neden o şekilde kurulduğu da anlaşılır.",
  }),
  districtPost({
    district: "Tavas",
    slug: "tavas-matematik-ozel-ders",
    title: "Tavas matematik özel ders: öğrenci koçluğuyla haftalık planı izlemek",
    description:
      "Tavas'ta matematik özel ders ve öğrenci koçluğu düşünen aileler için haftalık hedef belirleme, uygulamayı izleme ve planı güncelleme rehberi.",
    intro:
      "Tavas'ta matematik özel ders ve öğrenci koçluğu arayan öğrenciler için plan hazırlamakla planı uygulamak farklı aşamalardır. Güzel görünen bir çizelge, hangi görevin neden yapılacağını açıklamıyorsa kullanımda zorlanılabilir. Çalışma düzeni öğrencinin okul yükü, mevcut bilgisi ve ayırabildiği zamanla birlikte ele alınır.",
    sections: [
      {
        heading: "Haftalık hedefi yapılacak işe çevirin",
        paragraphs: [
          "Matematiği düzeltmek gibi geniş bir hedef yerine kesirlerde işlem hatalarını incelemek veya bir problem türünde denklem kurmayı denemek seçilebilir. Her hedefin kaynağı, çalışma zamanı ve tamamlandığında neye bakılacağı belirlenir. Öğrenci görevi anladığını kendi cümlesiyle anlatabilir.",
          "Örnek bir haftada konu tekrarı, kısa uygulama ve yanlışlara dönüş için ayrı zamanlar ayrılabilir. Süreler hazır bir tabloya göre değil, öğrencinin okul ve dinlenme düzenine göre konuşulur. Planın içine beklenmedik işler için de esneklik bırakılır.",
        ],
      },
      {
        heading: "Tamamlanmayan görevin nedenini inceleyin",
        paragraphs: [
          "Hafta sonunda yalnızca kaç görev bittiği sayılmaz. Görev fazla mı uzundu, konu mu anlaşılmadı, kaynak mı uygun değildi, zaman mı yanlış seçildi? Bu sorulara verilen cevap, bir sonraki planın hangi bölümünün değişeceğini belirler.",
          "Matematik konu çalışmasıyla öğrenci koçluğunun rolü de açıklığa kavuşmalı. Takvim düzenlemek, anlaşılmayan bir matematik kavramını tek başına öğretmez. Planlama ve ders içeriği birlikte değerlendirilir; gelişim belirli bir sınav sonucu sözüyle ifade edilmez.",
        ],
      },
      {
        heading: "Tavas için ön görüşmede beklentiyi netleştirin",
        paragraphs: [
          "Sınıf, hedef, haftalık program ve uygulanamamış bir çalışma planı varsa paylaşılabilir. Matematik desteğinin ve takibin kapsamı görüşmede konuşulur. Yüz yüze dersin konumu, uygun günler ve ücret teyit edilir; online çalışma uygunluğu ayrıca değerlendirilir.",
        ],
      },
    ],
    closing:
      "Tavas'ta sürdürülebilir bir çalışma planı, öğrenci hakkında yeni bilgi geldikçe değişebilir. Hedefleri küçük tutmak ve uygulamadan gelen notlarla güncellemek, takibi daha anlaşılır hale getirir.",
  }),
];
