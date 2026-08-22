"use client";

import { useEffect, useState } from "react";

/**
 * Sahnenin hangi kalitede çalışacağı.
 *
 * - `high`   : masaüstü. Tüm nesneler, gölge, imleç paralaksı.
 * - `lite`   : zayıf GPU / az çekirdek. Gölge yok, daha az nesne, düşük DPR.
 * - `static` : WebGL yok, hareket azaltma açık, veri tasarrufu açık ya da telefon.
 *              Bu durumda hiç WebGL yüklenmez; yerine sabit vektör görsel basılır.
 */
export type SceneTier = "high" | "lite" | "static";

/**
 * 3D sahne yalnızca hero'nun iki sütuna ayrıldığı genişlikte anlamlı.
 * Bunun altında portre tam genişlik kaplıyor ve arkasındaki hiçbir nesne
 * görünmüyor; görünmeyen pikseller için ~230 KB WebGL indirmek doğru olmaz.
 * Bu eşik, sayfadaki `lg` kırılma noktasıyla bilinçli olarak aynı.
 */
const WEBGL_MIN_WIDTH = 1024;

/** Bu değerlerin altındaki cihazlarda sahne sadeleştirilir. */
const LITE_MAX_MEMORY_GB = 4;
const LITE_MAX_CORES = 4;

type NetworkInformation = { saveData?: boolean };

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function detectTier(wideEnough: boolean): SceneTier {
  if (!wideEnough) return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return "static";

  if (!supportsWebGL()) return "static";

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if ((memory !== undefined && memory <= LITE_MAX_MEMORY_GB) || (cores && cores <= LITE_MAX_CORES)) {
    return "lite";
  }

  return "high";
}

/**
 * İlk render'da her zaman `static` döner: sunucu tarafında karar verilemez ve
 * sayfa metni WebGL kararını beklemeden okunabilir olmalıdır.
 */
export function useSceneTier(): SceneTier {
  const [tier, setTier] = useState<SceneTier>("static");

  useEffect(() => {
    const widthQuery = window.matchMedia(`(min-width: ${WEBGL_MIN_WIDTH}px)`);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setTier(detectTier(widthQuery.matches));
    update();

    widthQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      widthQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return tier;
}

/**
 * Bölüm ekrandayken true döner. Sahne görünmediğinde çizim döngüsü tamamen
 * durdurulur; sekme arka plandayken de GPU boşuna çalışmaz.
 */
export function useSceneActive(ref: React.RefObject<HTMLElement | null>): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let visible = false;
    const sync = () => setActive(visible && document.visibilityState === "visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);

  return active;
}
