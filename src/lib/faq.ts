import { factValue } from "@/config/teacher";

import { getTeacherFacts } from "@/lib/cms/public";
import { readCms } from "@/lib/cms/store";

/**
 * Sık sorulan sorular.
 *
 * Cevabı gerçek bir bilgiye dayanan sorular buradan **türetilir**: bilgi
 * yoksa soru listeye hiç girmez. Süreç soruları yönetim panelindeki SSS
 * listesinden gelir.
 */
export type FaqItem = { readonly question: string; readonly answer: string };

export async function buildFaqs(): Promise<readonly FaqItem[]> {
  const facts = await getTeacherFacts();
  const cms = await readCms();
  const items: FaqItem[] = [];

  const grade = factValue(facts.gradeRange);
  const audience = factValue(facts.audience);
  if (grade || audience) {
    items.push({
      question: "Hangi sınıf seviyeleriyle çalışıyorsunuz?",
      answer: grade
        ? `${grade} öğrencileriyle birebir çalışıyorum${audience ? ` — ${audience.toLocaleLowerCase("tr")}.` : "."}`
        : `${audience} ile birebir çalışıyorum.`,
    });
  }

  const subjects = factValue(facts.subjects);
  if (subjects?.length) {
    items.push({
      question: "Hangi derste destek veriyorsunuz?",
      answer:
        subjects.length === 1
          ? `${subjects[0]}. Tek bir derse odaklandığım için konuları öğrencinin hızına göre ` +
            "derinlemesine ele alabiliyorum."
          : `${subjects.join(", ")} derslerinde destek veriyorum.`,
    });
  }

  const exams = factValue(facts.examPrep);
  if (exams?.length) {
    items.push({
      question: "Sınav hazırlığı için de çalışıyor musunuz?",
      answer:
        `${exams.join(", ")} hazırlığı ders sürecinin bir parçası. Sınav çalışması konuyu ` +
        "anlamanın yerine geçmiyor; eksik konu varken soru çözmeye geçilmiyor.",
    });
  }

  const formats = factValue(facts.lessonFormat);
  if (formats?.length) {
    items.push({
      question: "Dersler nerede yapılıyor? Online seçenek var mı?",
      answer: `${formats.join(". ")}.`,
    });
  }

  items.push(
    ...cms.faqs.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  );

  return items;
}
