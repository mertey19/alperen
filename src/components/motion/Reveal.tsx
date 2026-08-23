"use client";

import { motion, type Variants } from "motion/react";
import { type ElementType, type ReactNode } from "react";

import {
  DURATION,
  EASE_EDITORIAL,
  IN_VIEW_MARGIN,
  RISE_PX,
  SLIDE_PX,
  STAGGER_STEP,
} from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Görünür alana girince çalışan giriş hareketi.
 *
 * Yalnızca opaklık ve küçük bir kayma; ölçek, döndürme ve perspektif yok.
 * Süre 250 ms. Amaç, bölümün geldiğini hissettirmek — dikkat çekmek değil.
 */
export type RevealVariant = "rise" | "fade" | "slide";

const variants: Record<RevealVariant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: RISE_PX },
    shown: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_EDITORIAL } },
  },
  fade: {
    hidden: { opacity: 0 },
    shown: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_EDITORIAL } },
  },
  slide: {
    hidden: { opacity: 0, x: -SLIDE_PX },
    shown: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE_EDITORIAL } },
  },
};

/** Hareket azaltıldığında elemanların getirileceği dinlenme durumu. */
const REST = { opacity: 1, x: 0, y: 0 } as const;

const elements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  section: motion.section,
  figure: motion.figure,
  p: motion.p,
} satisfies Record<string, ElementType>;

export function Reveal({
  as = "div",
  variant = "rise",
  index = 0,
  delay = 0,
  className,
  children,
}: {
  as?: keyof typeof elements;
  variant?: RevealVariant;
  /** Kart dizilerinde sıra numarası; gecikmeyi kendi hesaplar. */
  index?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const Component = elements[as];

  /**
   * Tercih hidrasyondan sonra öğrenildiği için bileşenin yapısı değiştirilmez:
   * yapı değişince hareket kütüphanesinin bıraktığı satır içi stil takılı kalıyor
   * ve içerik gizli kalıyordu. Bunun yerine aynı bileşen dinlenme durumuna sürülür.
   */
  return (
    <Component
      className={className}
      /* CSS güvenlik ağı için işaret: JavaScript çalışmazsa ya da hareket
         azaltılmışsa bu elemanlar her koşulda görünür kılınır. */
      data-reveal=""
      variants={reduced ? undefined : variants[variant]}
      initial={reduced ? false : "hidden"}
      animate={reduced ? REST : undefined}
      whileInView={reduced ? undefined : "shown"}
      viewport={reduced ? undefined : { once: true, margin: IN_VIEW_MARGIN }}
      transition={reduced ? { duration: 0 } : { delay: delay + index * STAGGER_STEP }}
    >
      {children}
    </Component>
  );
}
