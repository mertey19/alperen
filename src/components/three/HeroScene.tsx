"use client";

import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";

import { DeskComposition, type PointerTarget } from "./DeskComposition";
import { SceneLights } from "./SceneLights";
import type { SceneTier } from "./useSceneTier";

/**
 * Hero sahnesinin WebGL kabı. `next/dynamic` ile yalnızca gerektiğinde yüklenir;
 * sayfa metni bu paketi beklemez.
 */
export default function HeroScene({
  tier,
  active,
  pointer,
}: {
  tier: Exclude<SceneTier, "static">;
  /** Bölüm ekran dışındayken çizim döngüsü tamamen durur. */
  active: boolean;
  pointer: RefObject<PointerTarget>;
}) {
  const high = tier === "high";

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={high ? [1, 1.5] : [1, 1.25]}
      shadows={high ? "soft" : false}
      gl={{ antialias: high, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, position: [0, 0.5, 8.6], near: 1, far: 40 }}
      /* Olay dinleyicisi yok: imleç bilgisi dışarıdan ref ile geliyor, bu sayede
         her fare hareketinde ışın izleme (raycast) çalışmıyor. */
      events={undefined}
      style={{ pointerEvents: "none" }}
    >
      <SceneLights shadows={high} />
      <DeskComposition tier={tier} pointer={pointer} />
    </Canvas>
  );
}
