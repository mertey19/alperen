"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

/**
 * Nesnelerin durgun hâldeki hareketi.
 *
 * Genlik bilinçli olarak çok küçük ve döngü uzun (8-14 sn). Kullanıcı bakmayı
 * bıraktığında hareket neredeyse kaybolmalı; dikkat çeken bir animasyon değil,
 * sahnenin nefes alması gerekiyor.
 */
export function FloatingObject({
  position,
  rotation = [0, 0, 0],
  periodSeconds = 10,
  amplitude = 0.06,
  drift = 0.018,
  phase = 0,
  children,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  /** Tam bir salınımın süresi. 6 saniyenin altına inilmez. */
  periodSeconds?: number;
  /** Dikey salınım genliği (dünya birimi). */
  amplitude?: number;
  /** Eksenler etrafındaki çok küçük dönme sapması (radyan). */
  drift?: number;
  phase?: number;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;

    const time = state.clock.elapsedTime;
    const wave = (Math.PI * 2) / periodSeconds;

    node.position.y = position[1] + Math.sin(time * wave + phase) * amplitude;
    node.rotation.x = rotation[0] + Math.sin(time * wave * 0.7 + phase) * drift;
    node.rotation.z = rotation[2] + Math.cos(time * wave * 0.55 + phase) * drift;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {children}
    </group>
  );
}
