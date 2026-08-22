"use client";

import { CLAY_SURFACE, PALETTE } from "../palette";

/** Altıgen gövdeli kalem. Gövde 6 kenarlı; yuvarlak silindirden daha "kırtasiye" durur. */
export function Pencil() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.075, 0.075, 1.5, 6]} />
        <meshStandardMaterial color={PALETTE.clay} {...CLAY_SURFACE} flatShading />
      </mesh>

      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.078, 0.078, 0.14, 6]} />
        <meshStandardMaterial color={PALETTE.sandDeep} roughness={0.55} metalness={0.15} flatShading />
      </mesh>

      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.072, 0.072, 0.13, 12]} />
        <meshStandardMaterial color={PALETTE.claySoft} {...CLAY_SURFACE} />
      </mesh>

      <mesh position={[0, -0.86, 0]} castShadow>
        <coneGeometry args={[0.076, 0.24, 6]} />
        <meshStandardMaterial color={PALETTE.paper3} {...CLAY_SURFACE} flatShading />
      </mesh>

      <mesh position={[0, -0.99, 0]} castShadow>
        <coneGeometry args={[0.028, 0.08, 6]} />
        <meshStandardMaterial color={PALETTE.ink} roughness={0.6} />
      </mesh>
    </group>
  );
}
