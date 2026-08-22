/**
 * Hareket dili — tek kaynak.
 *
 * Sitedeki her animasyon buradaki eğri ve süreleri kullanır. Amaç, her bölüme
 * aynı "fade-up" şablonunu yapıştırmak değil; hareketin anlamına göre değişen
 * ama aynı fizik hissini taşıyan küçük bir sözlük kurmak.
 */

/** Editoryal yavaşlama: hızlı başlar, uzun ve yumuşak durur. */
export const EASE_EDITORIAL = [0.22, 0.61, 0.36, 1] as const;

/** Girişte hafif bir "yerine oturma" hissi veren eğri. */
export const EASE_SETTLE = [0.16, 0.84, 0.44, 1] as const;

export const DURATION = {
  /** Düğme, bağlantı, ikon gibi dokunmatik geri bildirimler. */
  micro: 0.22,
  /** Kart yükselmesi, vurgu geçişi. */
  fast: 0.4,
  /** Bölüm girişleri. */
  base: 0.7,
  /** Uzun çizgi/ilerleme animasyonları. */
  slow: 1.1,
} as const;

/**
 * Fiziksel atalet hissi veren yay.
 * Kart eğimi ve mıknatıs etkisi bu yayı kullanır; imleci "kovalamaz",
 * arkasından yumuşakça gelir.
 */
export const SPRING_INERTIA = {
  stiffness: 140,
  damping: 22,
  mass: 0.7,
} as const;

/** Daha sıkı, daha kısa yay: küçük ikon kaymaları için. */
export const SPRING_SNAP = {
  stiffness: 260,
  damping: 26,
  mass: 0.5,
} as const;

/** Bir bölümdeki kartların sırayla girmesi için gecikme adımı (sn). */
export const STAGGER_STEP = 0.08;

/** Görünür alana girme eşiği: eleman gerçekten okunabilir hale gelince tetiklenir. */
export const IN_VIEW_MARGIN = "0px 0px -12% 0px";
