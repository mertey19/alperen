import { factValue, teacher } from "@/config/teacher";
import { faqs as staticFaqs } from "@/content/copy";

/**
 * Sık sorulan sorular.
 *
 * Cevabı gerçek bir bilgiye dayanan sorular buradan **türetilir**: bilgi
 * `pending` ise soru listeye hiç girmez. Böylece "hangi derse bakıyorsunuz?"
 * gibi bir soru, cevabı olmadan asla ekranda görünmez ve zamanla eskimez.
 */
export type FaqItem = { readonly question: string; readonly answer: string };

export function buildFaqs(): readonly FaqItem[] {
  const items: FaqItem[] = [];

  const grade = factValue(teacher.gradeRange);
  const audience = factValue(teacher.audience);
  if (grade || audience) {
    items.push({
      question: "Hangi sınıf seviyeleriyle çalışıyorsunuz?",
      answer: grade
        ? `${grade} öğrencileriyle birebir çalışıyorum.`
        : `${audience} ile birebir çalışıyorum.`,
    });
  }

  const subjects = factValue(teacher.subjects);
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

  const formats = factValue(teacher.lessonFormat);
  if (formats?.length) {
    items.push({
      question: "Dersler nerede yapılıyor? Online seçenek var mı?",
      answer: `${formats.join(". ")}.`,
    });
  }

  // Süreçle ilgili sorular gerçek bir veriye değil, sitede yazılı çalışma
  // biçimine dayanır; bu yüzden her zaman gösterilir.
  items.push(...staticFaqs);

  return items;
}
