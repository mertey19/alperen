"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type ReactNode, type RefObject } from "react";
import { MathUtils, type Group } from "three";

import { FloatingObject } from "./FloatingObject";
import { Notebook } from "./objects/Notebook";
import { Pencil } from "./objects/Pencil";
import { Ruler } from "./objects/Ruler";
import { ClayCube, PaperCard, Protractor } from "./objects/Solids";
import type { SceneTier } from "./useSceneTier";

/**
 * Kompozisyonun yazıldığı referans çerçeve (dünya birimi).
 * Sahne her ekranda bu çerçeveye sığacak şekilde ölçeklenir; böylece nesneler
 * ne kırpılır ne de dar ekranda üst üste biner.
 */
const FRAME_WIDTH = 3.4;
const FRAME_HEIGHT = 4.6;

/** İmleç paralaksının sınırı: yaklaşık 3 derece. Nesneler imleci kovalamaz. */
const MAX_PARALLAX_RAD = 0.055;
/** Kameranın yanal kayması — derinlik hissini artırır, kompozisyonu bozmaz. */
const MAX_CAMERA_SHIFT = 0.16;
/** Sönümleme katsayısı: büyüdükçe hareket daha çabuk yakalar. 2.2 ağır atalet verir. */
const DAMPING = 2.2;

/** Hero bölümünde dinlenen, normalize edilmiş (-1 … 1) imleç konumu. */
export type PointerTarget = { x: number; y: number };

function ParallaxRig({
  enabled,
  pointer,
  children,
}: {
  enabled: boolean;
  pointer: RefObject<PointerTarget>;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    const { x: pointerX, y: pointerY } = pointer.current;
    const targetY = enabled ? pointerX * MAX_PARALLAX_RAD : 0;
    const targetX = enabled ? -pointerY * MAX_PARALLAX_RAD * 0.8 : 0;

    node.rotation.y = MathUtils.damp(node.rotation.y, targetY, DAMPING, delta);
    node.rotation.x = MathUtils.damp(node.rotation.x, targetX, DAMPING, delta);

    const camera = state.camera;
    const targetCameraX = enabled ? pointerX * MAX_CAMERA_SHIFT : 0;
    const targetCameraY = enabled ? pointerY * MAX_CAMERA_SHIFT * 0.6 : 0;
    camera.position.x = MathUtils.damp(camera.position.x, targetCameraX, DAMPING, delta);
    camera.position.y = MathUtils.damp(camera.position.y, 0.5 + targetCameraY, DAMPING, delta);
    camera.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
}

/**
 * Masa kompozisyonu.
 *
 * Yedi görsel nesne: defter, kalem, cetvel, küp, iletki ve arkada iki kâğıt.
 * Daha fazlası sahneyi kalabalıklaştırıp "Three.js demosu" hissi verirdi.
 * `lite` kademesinde arka kâğıtlar ve iletki düşer, beş nesne kalır.
 */
export function DeskComposition({
  tier,
  pointer,
}: {
  tier: SceneTier;
  pointer: RefObject<PointerTarget>;
}) {
  const viewport = useThree((state) => state.viewport);
  const scale = Math.min(viewport.width / FRAME_WIDTH, viewport.height / FRAME_HEIGHT);
  const full = tier === "high";

  return (
    <ParallaxRig enabled={full} pointer={pointer}>
      <group scale={scale}>
        {/* Arkadaki kâğıtlar: sahnenin en sessiz katmanı, portrenin arkasında kalır. */}
        {full ? (
          <>
            <FloatingObject
              position={[-0.35, 1.75, -1.3]}
              rotation={[-1.22, 0.32, 0]}
              periodSeconds={14}
              amplitude={0.05}
              phase={1.4}
            >
              <group scale={0.9}>
                <PaperCard width={1.15} height={0.82} />
              </group>
            </FloatingObject>
            <FloatingObject
              position={[0.7, 0.25, -2.2]}
              rotation={[-1.26, -0.22, 0]}
              periodSeconds={13}
              amplitude={0.04}
              phase={2.6}
            >
              <group scale={1}>
                <PaperCard width={1.4} height={0.98} />
              </group>
            </FloatingObject>
          </>
        ) : null}

        {/* Ana nesne: portrenin altından çıkan hafif açık defter. */}
        <FloatingObject
          position={[0.2, -1.72, 0.25]}
          rotation={[-1.06, 0.46, 0.05]}
          periodSeconds={12}
          amplitude={0.05}
        >
          <group scale={0.6}>
            <Notebook />
          </group>
        </FloatingObject>

        {/* Kalem sağ şeritte durur; metin sütununa hiçbir zaman yaklaşmaz. */}
        <FloatingObject
          position={[-1.42, 0.45, 0.85]}
          rotation={[0.2, 0, -0.5]}
          periodSeconds={9}
          amplitude={0.065}
          phase={0.9}
        >
          <group scale={0.62}>
            <Pencil />
          </group>
        </FloatingObject>

        <FloatingObject
          position={[0.95, -1.62, 0.5]}
          rotation={[0.3, -0.22, 0.36]}
          periodSeconds={11}
          amplitude={0.045}
          phase={2.1}
        >
          <group scale={0.58}>
            <Ruler />
          </group>
        </FloatingObject>

        <FloatingObject
          position={[-1.34, -1.18, 0.45]}
          rotation={[0.42, 0.68, 0.16]}
          periodSeconds={8}
          amplitude={0.08}
          phase={3.4}
        >
          <group scale={0.85}>
            <ClayCube />
          </group>
        </FloatingObject>

        {full ? (
          <FloatingObject
            position={[-1.3, 1.62, -0.2]}
            rotation={[0.5, 0.24, -0.35]}
            periodSeconds={10}
            amplitude={0.055}
            phase={4.2}
          >
            <group scale={0.62}>
              <Protractor />
            </group>
          </FloatingObject>
        ) : null}
      </group>
    </ParallaxRig>
  );
}
