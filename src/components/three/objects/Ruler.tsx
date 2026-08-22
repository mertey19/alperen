"use client";

import { RoundedBox } from "@react-three/drei";

import { CLAY_SURFACE, PALETTE } from "../palette";

const TICKS = [-0.78, -0.52, -0.26, 0, 0.26, 0.52, 0.78];

/** Cetvel. Çentikler olmadan sadece bir çubuk gibi duruyordu; yedi ince çentik yeterli. */
export function Ruler() {
  return (
    <group>
      <RoundedBox args={[1.9, 0.06, 0.32]} radius={0.03} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color={PALETTE.sand} {...CLAY_SURFACE} />
      </RoundedBox>

      {TICKS.map((x, index) => (
        <mesh key={x} position={[x, 0.035, index % 2 === 0 ? 0.03 : 0.06]}>
          <boxGeometry args={[0.012, 0.01, index % 2 === 0 ? 0.16 : 0.1]} />
          <meshStandardMaterial color={PALETTE.graphite} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
