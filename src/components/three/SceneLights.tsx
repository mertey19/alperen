"use client";

/**
 * Editoryal fotoğraf seti aydınlatması.
 *
 * Bir büyük yumuşak ana ışık, soğuk bir dolgu ve arkadan sıcak bir kenar ışığı.
 * Doygun renk, bloom ve keskin yansıma yok; amaç kil yüzeyleri okunur kılmak.
 */
export function SceneLights({ shadows }: { shadows: boolean }) {
  return (
    <>
      <ambientLight intensity={0.58} color="#fff4e6" />
      <hemisphereLight args={["#fff7ee", "#cbb590", 0.34]} />

      {/* Ana ışık: sol üstten, yumuşak. Gölge yalnızca güçlü cihazlarda açılır. */}
      <directionalLight
        position={[4.4, 6.6, 5.2]}
        intensity={2}
        color="#fff1de"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0008}
        shadow-normalBias={0.022}
        shadow-camera-near={1}
        shadow-camera-far={22}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />

      {/* Soğuk dolgu: gölgeleri siyaha düşürmeden açar. */}
      <directionalLight position={[-5.6, 2.2, 3.6]} intensity={0.46} color="#dde6f4" />

      {/* Kenar ışığı: nesnelerin siluetini zeminden ayırır. */}
      <directionalLight position={[-1.8, 3, -5.6]} intensity={0.85} color="#ffd8bd" />
    </>
  );
}
