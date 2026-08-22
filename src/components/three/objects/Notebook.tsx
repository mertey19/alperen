"use client";

import { RoundedBox } from "@react-three/drei";

import { CLAY_SURFACE, PALETTE, PAPER_SURFACE } from "../palette";

/**
 * Hafif açık defter — sahnenin ana nesnesi.
 * Kapaklar sırttan itibaren birkaç derece kalkık; kitap "yeni bırakılmış" durur.
 */
export function Notebook({ openRadians = 0.13 }: { openRadians?: number }) {
  return (
    <group>
      <group rotation={[0, 0, -openRadians]}>
        <RoundedBox args={[1.24, 0.07, 1.62]} radius={0.045} smoothness={3} position={[-0.66, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={PALETTE.paper2} {...PAPER_SURFACE} />
        </RoundedBox>
        <RoundedBox args={[1.1, 0.05, 1.46]} radius={0.025} smoothness={2} position={[-0.68, 0.06, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={PALETTE.paper} {...PAPER_SURFACE} />
        </RoundedBox>
      </group>

      <group rotation={[0, 0, openRadians]}>
        <RoundedBox args={[1.24, 0.07, 1.62]} radius={0.045} smoothness={3} position={[0.66, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={PALETTE.paper2} {...PAPER_SURFACE} />
        </RoundedBox>
        <RoundedBox args={[1.1, 0.05, 1.46]} radius={0.025} smoothness={2} position={[0.68, 0.06, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={PALETTE.paper} {...PAPER_SURFACE} />
        </RoundedBox>
        {/* Sağ sayfadaki tek kil çizgi: ikonun kalem çizgisiyle aynı işaret. */}
        <RoundedBox args={[0.58, 0.012, 0.045]} radius={0.006} smoothness={1} position={[0.6, 0.09, 0.24]}>
          <meshStandardMaterial color={PALETTE.clay} {...CLAY_SURFACE} />
        </RoundedBox>
      </group>

      <RoundedBox args={[0.17, 0.11, 1.66]} radius={0.05} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color={PALETTE.clayDeep} {...CLAY_SURFACE} />
      </RoundedBox>
    </group>
  );
}
