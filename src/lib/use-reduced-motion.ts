"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * "Hareketi azalt" tercihi.
 *
 * Hareket kütüphanesinin kendi kancası tercihi yalnızca ilk render'da okuyor ve
 * sonradan değişince güncellemiyor (kendi kaynağında da böyle not edilmiş).
 * Burada tercih canlı dinleniyor: kullanıcı sistem ayarını açtığı anda site
 * hareketi bırakıyor.
 *
 * Sunucuda ve ilk render'da `false` döner; aksi hâlde sunucu ile istemci
 * çıktısı ayrışır. Gerçek güvence CSS tarafında: `[data-reveal]` kuralları
 * hareket azaltıldığında içeriği her hâlükârda görünür kılar.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
