"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createContext, useContext, type PointerEvent, type ReactNode } from "react";

import { SPRING_INERTIA, SPRING_SNAP } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Kartın imlece verdiği çok küçük derinlik tepkisi.
 *
 * Kart 3 dereceden fazla dönmez: amaç kartı uçurmak değil, kâğıdın masada
 * hafifçe kalkması hissini vermek. Metin her zaman okunur kalır.
 */
const MAX_TILT_DEG = 2.6;

type TiltContextValue = {
  /** -0.5 … 0.5 aralığında, yaylanmış imleç konumu. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  active: boolean;
};

const TiltContext = createContext<TiltContextValue | null>(null);

export function TiltCard({
  as = "article",
  className = "",
  children,
}: {
  as?: "article" | "div" | "li";
  className?: string;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lift = useMotionValue(0);

  const x = useSpring(pointerX, SPRING_INERTIA);
  const y = useSpring(pointerY, SPRING_INERTIA);
  const liftSpring = useSpring(lift, SPRING_INERTIA);

  const rotateY = useTransform(x, (value) => value * MAX_TILT_DEG * 2);
  const rotateX = useTransform(y, (value) => -value * MAX_TILT_DEG * 2);
  const translateZ = useTransform(liftSpring, (value) => value * 10);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handleEnter = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    lift.set(1);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    lift.set(0);
  };

  const Component = motion[as];

  return (
    <TiltContext.Provider value={{ x, y, active: !reduced }}>
      <Component
        className={`tilt-card ${className}`}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, translateZ, transformPerspective: 1100, transformStyle: "preserve-3d" }
        }
      >
        {children}
      </Component>
    </TiltContext.Provider>
  );
}

/**
 * Kartın içinde, karttan bağımsız hareket eden katman.
 * `depth` büyüdükçe eleman öne çıkar ve imlece biraz daha fazla tepki verir.
 */
export function TiltLayer({
  depth = 1,
  className = "",
  children,
}: {
  depth?: number;
  className?: string;
  children: ReactNode;
}) {
  const context = useContext(TiltContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const sourceX = context?.x ?? fallbackX;
  const sourceY = context?.y ?? fallbackY;

  const x = useSpring(useTransform(sourceX, (value) => value * depth * 8), SPRING_SNAP);
  const y = useSpring(useTransform(sourceY, (value) => value * depth * 6), SPRING_SNAP);

  if (!context?.active) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ x, y, translateZ: depth * 14 }}>
      {children}
    </motion.div>
  );
}
