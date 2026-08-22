"use client";

import { motion, type Variants } from "motion/react";

import { DURATION, EASE_EDITORIAL, IN_VIEW_MARGIN } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * "Düzenli öğrenme takibi" bölümünün görsel anlatımı.
 *
 * Bilinçli olarak soyut: ders adı, yüzde, not ya da öğrenci verisi yok. Sitenin
 * hiçbir yerinde uydurma veri gösterilmediği için burada da sahte bir panel
 * kurulmuyor; yalnızca "takip ediliyor" duygusu çiziliyor. Tamamen dekoratif
 * olduğundan erişilebilirlik ağacından gizlenir.
 */

/** Satır uzunlukları yalnızca görsel ritim içindir; bir ölçümü temsil etmez. */
const ROWS = [0.88, 0.66, 0.95, 0.58];

const page: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const row: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_EDITORIAL } },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE_EDITORIAL } },
};

const tick: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASE_EDITORIAL, delay: 0.35 },
  },
};

export function ProgressNotebook({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* Alttaki iki sayfa: defterin kalınlığını gösteren tek derinlik ipucu. */}
      <div className="absolute inset-x-5 -bottom-3 top-8 rounded-card bg-paper-3/50" />
      <div className="absolute inset-x-2.5 -bottom-1.5 top-4 rounded-card bg-paper-2" />

      <motion.div
        data-reveal=""
        className="relative overflow-hidden rounded-card border border-line bg-paper p-7 shadow-[0_28px_60px_-40px_rgba(27,35,48,0.6)] sm:p-8"
        variants={page}
        /* Tercih hidrasyondan sonra öğreniliyor; `initial` o an geçmiş oluyor.
           Bu yüzden hareket azaltıldığında açıkça "shown" durumuna sürülür. */
        initial={reduced ? "shown" : "hidden"}
        animate={reduced ? "shown" : undefined}
        whileInView={reduced ? undefined : "shown"}
        viewport={reduced ? undefined : { once: true, margin: IN_VIEW_MARGIN }}
        transition={reduced ? { duration: 0, staggerChildren: 0, delayChildren: 0 } : undefined}
      >
        <span className="absolute inset-y-7 left-0 w-1.5 rounded-r-full bg-clay-strong" />
        <span className="absolute -top-1 right-8 h-7 w-14 rounded-b-xl bg-clay/85" />

        <div className="ml-3 space-y-6">
          {ROWS.map((width, index) => (
            <motion.div key={width} data-reveal="" className="flex items-center gap-4" variants={row}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                  <motion.path
                    d="M4 10.5 8.2 14.5 16 6"
                    stroke="#9e4527"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={tick}
                  />
                </svg>
              </span>

              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-paper-2">
                <motion.span
                  data-reveal=""
                  className="absolute inset-y-0 left-0 origin-left rounded-full bg-clay/65"
                  style={{ width: `${width * 100}%` }}
                  variants={line}
                />
              </span>

              {index === ROWS.length - 1 ? null : (
                <span className="h-px w-6 shrink-0 bg-line sm:w-10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Sayfanın alt kenarındaki ince kil çizgi: ikondaki kalem çizgisiyle aynı işaret. */}
        <motion.span
          data-reveal=""
          className="mt-8 ml-3 block h-0.5 w-24 origin-left rounded-full bg-clay"
          variants={line}
        />
      </motion.div>
    </div>
  );
}
