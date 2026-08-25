import type { Metadata } from "next";

import { SITE_URL, factValue, navigation, teacher } from "@/config/teacher";

/**
 * Metadata ve JSON-LD üretimi.
 *
 * Kural: yalnızca `confirmed(...)` alanlar buraya girer. Doğrulanmamış hiçbir
 * bilgi arama motoruna gönderilmez — placeholder metinleri de dahil. Yapısal
 * veride de aynı kural geçerli: değeri olmayan hiçbir özellik yazılmaz.
 */

/**
 * Başlık ve açıklama teyitli alanlardan türetilir.
 *
 * Şehir ve tek branş yerel aramada en değerli iki kelimedir ("Denizli",
 * "matematik") ama ikisi de uydurulacak bilgi değildir: `pending` iseler
 * cümleden tamamen düşerler. İkiden fazla ders girilirse başlık kendiliğinden
 * genel ifadeye ("Birebir Ders") döner.
 */
const CITY = factValue(teacher.location);
const SUBJECTS = factValue(teacher.subjects);
const SINGLE_SUBJECT = SUBJECTS?.length === 1 ? SUBJECTS[0] : null;

const GRADE = factValue(teacher.gradeRange);
const EXAMS = factValue(teacher.examPrep);

export const SITE_TITLE = [
  teacher.name,
  [CITY, SINGLE_SUBJECT, "Özel Ders"].filter(Boolean).join(" ") + (GRADE ? ` · ${GRADE}` : ""),
].join(" | ");

export const SITE_DESCRIPTION =
  `${teacher.name} ile ${CITY ? `${CITY}'de ` : ""}${GRADE ? `${GRADE} ` : ""}öğrencilerine ` +
  `yönelik birebir ${SINGLE_SUBJECT ? `${SINGLE_SUBJECT.toLocaleLowerCase("tr")} ` : "akademik "}` +
  `desteği${EXAMS?.length ? `; ${EXAMS.join(", ")} hazırlığı dahil` : ""}. ` +
  "Öğrencinin seviyesine ve öğrenme hızına göre şekillenen konu anlatımı, soru çözümü ve " +
  "düzenli öğrenme takibi.";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

/**
 * Paylaşım görseli.
 *
 * Alt sayfada `openGraph` tanımlamak kökten gelen dosya-kuralı görselini
 * eziyor; bu yüzden görsel burada açıkça yeniden veriliyor. Aksi hâlde ana
 * sayfa dışındaki bağlantılar sosyal medyada görselsiz paylaşılıyordu.
 */
const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${teacher.name} — ${teacher.role}`,
} as const;

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: teacher.name,
      locale: "tr_TR",
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/**
 * Person şeması. `Organization` değil `Person` kullanılması bilinçlidir:
 * burada bir kurum değil, bir öğretmen tanıtılıyor.
 *
 * `jobTitle` Alperen'in kendi tanıtım materyalindeki beyanıdır, site dışından
 * uydurulmadı. `alumniOf`, `award` ve `aggregateRating` gerçek veri olmadığı
 * için hiç yok.
 */
export function personJsonLd() {
  const location = factValue(teacher.location);
  const education = factValue(teacher.education);
  const email = factValue(teacher.contact.email);
  const phone = factValue(teacher.contact.phone);
  const instagram = factValue(teacher.contact.instagram);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#alperen-govrek`,
    name: teacher.name,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    jobTitle: teacher.role,
    ...(SUBJECTS || EXAMS ? { knowsAbout: [...(SUBJECTS ?? []), ...(EXAMS ?? [])] } : {}),
    ...(location ? { address: { "@type": "PostalAddress", addressLocality: location } } : {}),
    ...(education
      ? { alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item })) }
      : {}),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(instagram ? { sameAs: [instagram] } : {}),
  };
}

/** Site düzeyinde tek kayıt. Arama sonucunda site adının doğru görünmesi için. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: teacher.name,
    description: SITE_DESCRIPTION,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#alperen-govrek` },
  };
}

/** Alt sayfalarda kırıntı navigasyonu. Ana sayfada gereksiz olduğu için yok. */
export function breadcrumbJsonLd(path: string) {
  const item = navigation.find((entry) => entry.href === path);
  if (!item || path === "/") return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: item.label,
        item: new URL(path, SITE_URL).toString(),
      },
    ],
  };
}

export function faqJsonLd(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
