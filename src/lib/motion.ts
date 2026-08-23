/**
 * Hareket dili — tek kaynak.
 *
 * Kural: hareket neredeyse görünmez olmalı. Veli bilgiye baksın, efekte değil.
 * Bu yüzden tek izin verilen şeyler kısa bir opaklık geçişi ve 8-16 pikselluk
 * bir kayma; süreler 150-300 ms aralığında tutulur. Sürekli dönen, süzülen ya
 * da paralaks yapan hiçbir şey yok.
 */

/** Editoryal yavaşlama: hızlı başlar, yumuşak durur. */
export const EASE_EDITORIAL = [0.22, 0.61, 0.36, 1] as const;

export const DURATION = {
  /** Düğme, bağlantı, ikon gibi dokunmatik geri bildirimler. */
  micro: 0.15,
  /** Kart vurgusu, kenarlık geçişi. */
  fast: 0.2,
  /** Bölüm girişleri. */
  base: 0.25,
  /** İlerleme çizgisi gibi biraz daha uzun sürmesi anlamlı olanlar. */
  slow: 0.3,
} as const;

/** Girişte kullanılan dikey kayma (px). Brief'in üst sınırı 16. */
export const RISE_PX = 12;

/** Yanal listelerde kullanılan kayma (px). */
export const SLIDE_PX = 10;

/** Bir bölümdeki kartların sırayla girmesi için gecikme adımı (sn). */
export const STAGGER_STEP = 0.06;

/** Görünür alana girme eşiği: eleman gerçekten okunabilir hale gelince tetiklenir. */
export const IN_VIEW_MARGIN = "0px 0px -10% 0px";
