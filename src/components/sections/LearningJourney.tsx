"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { DURATION, EASE_EDITORIAL, EASE_SETTLE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Step = { readonly step: string; readonly title: string; readonly body: string };

/**
 * Öğrenme yolculuğu.
 *
 * Adımlar ekrana girdikçe sırayla etkinleşir ve aralarındaki çizgi büyür.
 * Çizgi tek parça değil, adım adım uzar: ilerleme duygusu böyle daha okunur.
 * Masaüstünde yatay, telefonda dikey akar; ikisi de aynı bileşenden gelir.
 */
function JourneyStep({
  item,
  index,
  isLast,
}: {
  item: Step;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const active = reduced || inView;

  const connector = {
    initial: reduced ? 1 : 0,
    animate: active ? 1 : 0,
    transition: reduced
      ? { duration: 0 }
      : { duration: DURATION.slow, ease: EASE_EDITORIAL, delay: 0.1 },
  };

  return (
    <li ref={ref} className="relative pl-16 lg:pl-0">
      {/* Dikey bağlantı (telefon/tablet) */}
      {!isLast ? (
        <>
          <span aria-hidden="true" className="absolute left-6 top-14 -bottom-8 w-px bg-line lg:hidden" />
          <motion.span
            data-reveal=""
            aria-hidden="true"
            className="absolute -bottom-8 left-6 top-14 w-px origin-top bg-clay lg:hidden"
            initial={{ scaleY: connector.initial }}
            animate={{ scaleY: connector.animate }}
            transition={connector.transition}
          />
        </>
      ) : null}

      {/* Yatay bağlantı (masaüstü) */}
      {!isLast ? (
        <>
          <span
            aria-hidden="true"
            className="absolute -right-6 left-14 top-6 hidden h-px bg-line lg:block"
          />
          <motion.span
            data-reveal=""
            aria-hidden="true"
            className="absolute -right-6 left-14 top-6 hidden h-px origin-left bg-clay lg:block"
            initial={{ scaleX: connector.initial }}
            animate={{ scaleX: connector.animate }}
            transition={connector.transition}
          />
        </>
      ) : null}

      {/* `animate` her zaman tanımlı: hareket azaltma tercihi hidrasyondan sonra
          öğrenildiğinde eleman gizli konumda takılı kalmasın. */}
      <motion.div
        data-reveal=""
        className="absolute left-0 top-0 lg:static"
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: DURATION.base, ease: EASE_SETTLE, delay: index * 0.05 }
        }
      >
        <span
          className={`journey-disc ${active ? "is-active" : ""}`}
          data-step={item.step}
          aria-hidden="true"
        >
          {item.step}
        </span>
      </motion.div>

      <motion.div
        data-reveal=""
        className="lg:mt-6"
        initial={{ opacity: 0, y: 16 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: DURATION.base, ease: EASE_SETTLE, delay: 0.08 + index * 0.05 }
        }
      >
        <h3 className="font-display text-lg text-ink">
          <span className="sr-only">{item.step}. adım: </span>
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
      </motion.div>
    </li>
  );
}

export function LearningJourney({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="mt-12 grid gap-12 lg:grid-cols-4 lg:gap-8">
      {steps.map((item, index) => (
        <JourneyStep
          key={item.step}
          item={item}
          index={index}
          isLast={index === steps.length - 1}
        />
      ))}
    </ol>
  );
}
