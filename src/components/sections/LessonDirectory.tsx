import Link from "next/link";

import { lessonPath, routes } from "@/config/teacher";
import { lessonPages } from "@/content/math-lessons";

export function LessonDirectory({ compact = false }: { compact?: boolean }) {
  const guides = lessonPages.filter((page) => !page.grade && (!compact ||
    ["ilkokul", "ortaokul", "online"].includes(page.slug)));

  return (
    <div className="mt-9">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((page) => (
          <li key={page.slug}>
            <Link
              href={lessonPath(page.slug)}
              className="group block h-full rounded-card border border-line bg-paper p-6 transition-colors hover:border-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
            >
              <h3 className="font-display text-2xl text-ink">
                <span className="link-underline">{page.label}</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{page.description}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-clay-strong">
                Ders rehberini inceleyin <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <nav aria-label="Sınıfınıza göre matematik dersleri" className="mt-8">
        <p className="text-sm font-semibold text-ink">1–8. sınıf matematik özel ders rehberleri</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {lessonPages.filter((page) => page.grade).map((page) => (
            <li key={page.slug}>
              <Link
                href={lessonPath(page.slug)}
                className="flex min-h-12 items-center justify-center rounded-xl border border-line bg-paper px-3 py-3 text-sm font-semibold text-clay-strong transition-colors hover:border-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              >
                {page.grade}. sınıf
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {compact ? (
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-clay-strong">
          <Link href={routes.lessons} className="inline-flex min-h-11 items-center underline underline-offset-4">
            Tüm matematik dersleri
          </Link>
          <Link href={lessonPath("fiyatlar")} className="inline-flex min-h-11 items-center underline underline-offset-4">
            Matematik özel ders fiyatları hakkında
          </Link>
        </div>
      ) : null}
    </div>
  );
}
