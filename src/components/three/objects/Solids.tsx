"use client";

import { RoundedBox } from "@react-three/drei";

import { CLAY_SURFACE, PALETTE, PAPER_SURFACE } from "../palette";

/** Geometri küpü — matematik tarafının en sade temsili. */
export function ClayCube({ size = 0.46 }: { size?: number }) {
  return (
    <RoundedBox args={[size, size, size]} radius={size * 0.16} smoothness={4} castShadow receiveShadow>
      <meshStandardMaterial color={PALETTE.clay} {...CLAY_SURFACE} />
    </RoundedBox>
  );
}

/** İletki: yarım halka ve düz tabanı. */
export function Protractor({ radius = 0.52 }: { radius?: number }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[radius, 0.05, 10, 28, Math.PI]} />
        <meshStandardMaterial color={PALETTE.sandDeep} {...CLAY_SURFACE} />
      </mesh>
      <RoundedBox args={[radius * 2 + 0.1, 0.05, 0.1]} radius={0.024} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color={PALETTE.sand} {...CLAY_SURFACE} />
      </RoundedBox>
    </group>
  );
}

/** Arkada duran ince kâğıt kartı: sahneye derinlik veren sessiz katman. */
export function PaperCard({ width = 1.05, height = 0.78 }: { width?: number; height?: number }) {
  return (
    <RoundedBox args={[width, 0.025, height]} radius={0.035} smoothness={2} receiveShadow>
      <meshStandardMaterial color={PALETTE.paper2} {...PAPER_SURFACE} />
    </RoundedBox>
  );
}
