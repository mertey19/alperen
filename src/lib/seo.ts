import type { Metadata } from "next";

import { SITE_URL, factValue, teacher } from "@/config/teacher";

/**
 * Metadata ve JSON-LD üretimi.
 *
 * Kural: yalnızca `confirmed(...)` alanlar buraya girer. Doğrulanmamış hiçbir
 * bilgi arama motoruna gönderilmez — placeholder metinleri de dahil.
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

export const SITE_TITLE = [
  teacher.name,
  [CITY, "İlkokul ve Ortaokul", SINGLE_SUBJECT, "Birebir Ders"].filter(Boolean).join(" "),
].join(" | ");

export const SITE_DESCRIPTION =
  `${teacher.name} ile ${CITY ? `${CITY}'de ` : ""}ilkokul ve ortaokul öğrencilerine ` +
  `yönelik birebir ${SINGLE_SUBJECT ? `${SINGLE_SUBJECT.toLocaleLowerCase("tr")} ` : "akademik "}` +
  "desteği. Öğrencinin seviyesine ve öğrenme hızına göre şekillenen konu anlatımı, " +
  "soru çözümü ve düzenli öğrenme takibi.";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

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
    },
  };
}

/**
 * Person şeması. `Organization` değil `Person` kullanılması bilinçlidir:
 * burada bir kurum değil, bir öğretmen tanıtılıyor.
 */
export function personJsonLd() {
  const subjects = factValue(teacher.subjects);
  const location = factValue(teacher.location);
  const education = factValue(teacher.education);
  const email = factValue(teacher.contact.email);
  const phone = factValue(teacher.contact.phone);
  const instagram = factValue(teacher.contact.instagram);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: teacher.name,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    // Unvan iddiası yok; yapılan iş tarif ediliyor.
    jobTitle: teacher.role,
    ...(subjects ? { knowsAbout: subjects } : {}),
    ...(location ? { address: { "@type": "PostalAddress", addressLocality: location } } : {}),
    ...(education
      ? { alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item })) }
      : {}),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(instagram ? { sameAs: [instagram] } : {}),
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
