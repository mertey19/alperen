/**
 * 3D sahnenin renkleri.
 *
 * Sitedeki CSS değişkenleriyle birebir aynı tonlar. Sahne, arayüzün devamı gibi
 * dursun diye buraya yeni renk eklenmez; palet globals.css ile birlikte değişir.
 */
export const PALETTE = {
  paper: "#fdfbf8",
  paper2: "#f1eae0",
  paper3: "#e3d8c6",
  sand: "#e0cfb2",
  sandDeep: "#cbb590",
  clay: "#bd5c37",
  clayDeep: "#a4462a",
  claySoft: "#f0dbcf",
  ink: "#1b2330",
  graphite: "#2c3646",
} as const;

/** Mat, hafif pürüzlü kil yüzey: parlama ve yansıma yok. */
export const CLAY_SURFACE = { roughness: 0.82, metalness: 0.02 } as const;

/** Kâğıt daha da mat. */
export const PAPER_SURFACE = { roughness: 0.94, metalness: 0 } as const;
