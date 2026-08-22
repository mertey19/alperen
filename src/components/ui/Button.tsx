"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { type PointerEvent, type ReactNode } from "react";

import { DURATION, SPRING_INERTIA } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/** Next.js Link'i bir kez motion bileşenine sarılır; her render'da yeniden üretmek
 * bağlantıyı yeniden bağlar ve tıklama durumunu kaybettirir. */
const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "whatsapp" | "quiet";

/** Mıknatıs etkisinin sınırı. Düğme imlece gitmez, ona doğru birkaç piksel yaslanır. */
const MAGNET_PX = 4;

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold " +
  "transition-[background-color,border-color,color,box-shadow] focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper shadow-[0_10px_24px_-14px_rgba(27,35,48,0.9)] hover:bg-ink-2 " +
    "hover:shadow-[0_16px_34px_-16px_rgba(27,35,48,0.85)] focus-visible:outline-ink",
  secondary:
    "border border-line bg-paper text-ink hover:border-clay hover:text-clay-strong " +
    "hover:shadow-[0_12px_28px_-20px_rgba(27,35,48,0.7)] focus-visible:outline-clay-strong",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_10px_24px_-14px_rgba(31,157,85,0.9)] hover:brightness-[1.06] " +
    "focus-visible:outline-whatsapp",
  quiet: "min-h-0 px-0 text-clay-strong hover:text-ink",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
    </svg>
  );
}

export function Button({
  href,
  variant = "primary",
  withArrow = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  /** Birincil çağrılarda yön duygusu veren ok. Hover'da metinden bağımsız kayar. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, SPRING_INERTIA);
  const y = useSpring(offsetY, SPRING_INERTIA);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    offsetX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * MAGNET_PX * 2);
    offsetY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * MAGNET_PX);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  const interaction = {
    onPointerMove: handleMove,
    onPointerLeave: reset,
    style: reduced ? undefined : { x, y },
    whileTap: reduced ? undefined : { scale: 0.975 },
    transition: { duration: DURATION.micro },
  } as const;

  const content = (
    <>
      {variant === "quiet" ? <span className="link-underline">{children}</span> : children}
      {withArrow ? <Arrow /> : null}
    </>
  );

  if (isExternal) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...interaction}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...interaction}>
      {content}
    </MotionLink>
  );
}
