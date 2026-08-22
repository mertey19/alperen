/**
 * WebGL çalışmadığında (telefon, hareket azaltma, veri tasarrufu, eski tarayıcı)
 * görünen sabit kompozisyon.
 *
 * 3D sahnenin aynı nesnelerini aynı paletle, düz bir masa görünümünde anlatır.
 * Amaç "boş bir canvas dikdörtgeni" bırakmamak: yedek görsel de bitmiş bir
 * tasarım gibi durmalı. Tamamen dekoratif olduğu için erişilebilirlik
 * ağacından gizlenir.
 */
export function HeroSceneFallback({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 560"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <defs>
        <radialGradient id="hero-glow" cx="52%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#f0dbcf" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#f4eee4" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#fbf8f3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-paper" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#fdfbf7" />
          <stop offset="100%" stopColor="#ece4d6" />
        </linearGradient>
        <linearGradient id="hero-sand" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#eee0cb" />
          <stop offset="100%" stopColor="#d6c4a6" />
        </linearGradient>
        <linearGradient id="hero-clay" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#c96a45" />
          <stop offset="100%" stopColor="#a4462a" />
        </linearGradient>
      </defs>

      <rect width="460" height="560" fill="url(#hero-glow)" />

      {/* Arkada duran ikinci kâğıt: derinlik için tek bir ipucu. */}
      <g transform="rotate(7 250 250)" opacity="0.7">
        <rect x="150" y="120" width="210" height="270" rx="14" fill="#f4eee4" stroke="#ddd3c4" />
      </g>

      {/* Hafif açık defter */}
      <g transform="rotate(-8 200 290)">
        <ellipse cx="205" cy="432" rx="130" ry="16" fill="#1b2330" opacity="0.07" />
        <rect x="86" y="150" width="230" height="285" rx="16" fill="url(#hero-paper)" stroke="#ddd3c4" />
        <rect x="100" y="164" width="202" height="257" rx="10" fill="#fdfbf8" />
        <rect x="86" y="150" width="18" height="285" rx="9" fill="url(#hero-clay)" />
        {[210, 244, 278, 312, 346].map((y) => (
          <line key={y} x1="126" y1={y} x2="286" y2={y} stroke="#ddd3c4" strokeWidth="2" />
        ))}
        <line x1="126" y1="380" x2="222" y2="380" stroke="#c96a45" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Kalem */}
      <g transform="rotate(34 330 300)">
        <rect x="286" y="176" width="26" height="196" rx="4" fill="url(#hero-clay)" />
        <rect x="286" y="152" width="26" height="18" fill="url(#hero-sand)" />
        <rect x="286" y="136" width="26" height="18" rx="6" fill="#f0dbcf" />
        <polygon points="286,372 312,372 299,412" fill="#eadfcc" />
        <polygon points="294,396 304,396 299,412" fill="#1b2330" />
      </g>

      {/* Cetvel */}
      <g transform="rotate(-22 150 486)">
        <rect x="34" y="466" width="236" height="42" rx="10" fill="url(#hero-sand)" />
        {[62, 88, 114, 140, 166, 192, 218, 244].map((x, index) => (
          <line
            key={x}
            x1={x}
            y1="466"
            x2={x}
            y2={index % 2 === 0 ? 488 : 480}
            stroke="#1b2330"
            strokeWidth="2"
            opacity="0.35"
          />
        ))}
      </g>

      {/* Geometrik küp */}
      <g transform="translate(348 92)">
        <polygon points="0,22 38,0 76,22 38,44" fill="#d5764f" />
        <polygon points="0,22 38,44 38,88 0,66" fill="#a4462a" />
        <polygon points="76,22 38,44 38,88 76,66" fill="#bb583a" />
      </g>
    </svg>
  );
}
