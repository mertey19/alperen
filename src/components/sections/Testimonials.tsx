import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getTestimonials } from "@/lib/cms/public";

/**
 * Veli ve öğrenci görüşleri.
 *
 * Yönetim panelinden gerçek görüş eklenene kadar bölüm **hiç oluşturulmaz**.
 * Uydurma yorum, uydurma isim ve uydurma puan bu sitede yer almaz.
 */
export async function Testimonials() {
  const items = await getTestimonials();
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
            key={item.id}
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
                    {new Date(item.date.length === 7 ? `${item.date}-01` : item.date).toLocaleDateString(
                      "tr-TR",
                      { year: "numeric", month: "long" },
                    )}
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
