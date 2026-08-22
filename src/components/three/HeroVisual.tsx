"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import type { PointerTarget } from "./DeskComposition";
import { HeroSceneFallback } from "./HeroSceneFallback";
import { useSceneActive, useSceneTier } from "./useSceneTier";

/**
 * WebGL paketi yalnızca cihaz uygun bulunduğunda indirilir. Yüklenene kadar
 * sabit vektör kompozisyon görünür; yani hiçbir anda boş bir dikdörtgen olmaz.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroSceneFallback className="h-full w-full" />,
});

/**
 * Hero görselinin kabı.
 *
 * Sunucuda ve ilk render'da her zaman sabit görsel basılır; kalite kararı
 * yalnızca tarayıcıda verilir. Bu sayede sayfa metni WebGL kararını beklemez ve
 * canvas'ın yerini önceden ayırdığı için düzen kayması (CLS) oluşmaz.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  const tier = useSceneTier();
  const container = useRef<HTMLDivElement>(null);
  const active = useSceneActive(container);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });

  useEffect(() => {
    if (tier !== "high") return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [tier]);

  return (
    /* data-* öznitelikleri yalnızca gözlem içindir: hangi kademede çalıştığı ve
       çizim döngüsünün açık olup olmadığı tarayıcıdan doğrulanabilsin. */
    <div
      ref={container}
      aria-hidden="true"
      className={className}
      data-scene-tier={tier}
      data-scene-active={tier === "static" ? "n/a" : String(active)}
    >
      {tier === "static" ? (
        <HeroSceneFallback className="h-full w-full" />
      ) : (
        <HeroScene tier={tier} active={active} pointer={pointer} />
      )}
    </div>
  );
}
