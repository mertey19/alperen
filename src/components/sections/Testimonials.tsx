import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { teacher } from "@/config/teacher";

/**
 * Veli ve öğrenci görüşleri.
 *
 * Yapı hazır ama `teacher.testimonials` boş olduğu sürece bölüm **hiç
 * oluşturulmaz** — başlığı olan boş bir alan da kalmaz. Uydurma yorum, uydurma
 * isim ve uydurma puan bu sitede yer almaz; gerçek görüş geldiğinde diziye
 * eklenmesi yeterli.
 */
export function Testimonials() {
  const items = teacher.testimonials;
  if (items.length === 0) return null;

  return (
    <Section tone="paper-2">
      <SectionHeading
        eyebrow="Geri bildirim"
        title="Veli ve öğrenci görüşleri"
        description="Paylaşılmasına izin verilen gerçek görüşler."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            as="figure"
            key={item.quote}
            index={index}
            className="rounded-card border border-line bg-paper p-7"
          >
            <blockquote className="leading-relaxed text-ink">{item.quote}</blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              {item.by} · {item.role}
              {item.date ? (
                <>
                  {" · "}
                  <time dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                    })}
                  </time>
                </>
              ) : null}
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
