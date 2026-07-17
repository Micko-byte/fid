"use client";

// Round trig output: raw floats serialize differently server vs client and trip
// a hydration mismatch on the SVG coordinate attributes.
const r3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Branded abstract SVG graphics for FID & Co.
 * Palette: burgundy #750006 · gold #C9AA3C / #d98038 · sand #C7AC9F · ink #1c1c1c · cream #FFFFFF
 *
 * Each graphic is large, scalable, and only lightly animated (slow drift / gentle
 * opacity pulses) — deliberately NOT spinning. Pass `size` and `className`.
 */

interface GraphicProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const BURGUNDY = "#750006";
const GOLD = "#C9AA3C";
const GOLD_SOFT = "#d98038";
const SAND = "#C7AC9F";
const INK = "#1c1c1c";

/* Shared keyframes — injected once per graphic instance (cheap, scoped by unique ids) */
function Keyframes() {
  return (
    <style>{`
      @keyframes fid-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes fid-pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.9; } }
      @keyframes fid-pulse-strong { 0%,100% { opacity: 0.15; } 50% { opacity: 0.55; } }
      @keyframes fid-dash { to { stroke-dashoffset: -240; } }
      @media (prefers-reduced-motion: reduce) {
        .fid-anim { animation: none !important; }
      }
    `}</style>
  );
}

/* ── Government & Public Institutions — pillars, shield arc, authority radials ── */
export function GovernanceGraphic({ size = "100%", className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 600 720" width={size} height={size} className={className} style={style} role="img" aria-label="">
      <Keyframes />
      <defs>
        <linearGradient id="gov-col" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BURGUNDY} stopOpacity="0.9" />
          <stop offset="1" stopColor={BURGUNDY} stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="gov-glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor={GOLD_SOFT} stopOpacity="0.5" />
          <stop offset="1" stopColor={GOLD_SOFT} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="300" r="260" fill="url(#gov-glow)" />

      {/* authority radials */}
      <g stroke={GOLD} strokeWidth="1" opacity="0.4" className="fid-anim" style={{ animation: "fid-pulse 7s ease-in-out infinite" }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1="300" y1="300" x2={r3(300 + Math.cos(a) * 250)} y2={r3(300 + Math.sin(a) * 250)} />;
        })}
      </g>

      {/* shield arc */}
      <path d="M180 170 Q300 110 420 170 L420 300 Q300 400 180 300 Z" fill="none" stroke={BURGUNDY} strokeWidth="2.5" opacity="0.75" />
      <path d="M210 195 Q300 150 390 195 L390 290 Q300 360 210 290 Z" fill={BURGUNDY} opacity="0.08" />

      {/* pillars / columns */}
      <g className="fid-anim" style={{ animation: "fid-drift 9s ease-in-out infinite", transformOrigin: "center" }}>
        {[230, 275, 320, 365].map((x, i) => (
          <rect key={i} x={x} y={430} width="22" height="180" rx="3" fill="url(#gov-col)" opacity={0.85 - i * 0.06} />
        ))}
        <rect x="210" y="412" width="200" height="14" rx="3" fill={BURGUNDY} opacity="0.55" />
        <rect x="200" y="616" width="220" height="12" rx="3" fill={BURGUNDY} opacity="0.5" />
      </g>

      {/* nodes */}
      {[[150, 480], [450, 460], [120, 320], [480, 340]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill={GOLD} className="fid-anim" style={{ animation: `fid-pulse ${5 + i}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}

/* ── Owned Platforms — orbital rings, gathering nodes, community ── */
export function PlatformGraphic({ size = "100%", className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 600 720" width={size} height={size} className={className} style={style} role="img" aria-label="">
      <Keyframes />
      <defs>
        <radialGradient id="plat-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor={BURGUNDY} stopOpacity="0.25" />
          <stop offset="1" stopColor={BURGUNDY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="plat-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD} />
          <stop offset="1" stopColor={BURGUNDY} />
        </linearGradient>
      </defs>

      <circle cx="300" cy="330" r="280" fill="url(#plat-glow)" />

      {/* concentric platform rings (static, layered) */}
      {[210, 160, 110, 60].map((r, i) => (
        <ellipse key={i} cx="300" cy="330" rx={r} ry={r * 0.42} fill="none" stroke="url(#plat-ring)" strokeWidth={i === 0 ? 2.5 : 1.4} opacity={0.7 - i * 0.12} />
      ))}

      {/* gathering nodes around the inner ring */}
      <g className="fid-anim" style={{ animation: "fid-drift 8s ease-in-out infinite" }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const cx = r3(300 + Math.cos(a) * 160);
          const cy = r3(330 + Math.sin(a) * 67);
          return <circle key={i} cx={cx} cy={cy} r="9" fill={i % 2 ? GOLD : BURGUNDY} opacity="0.85" />;
        })}
      </g>

      {/* rising signal column */}
      <line x1="300" y1="330" x2="300" y2="120" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" className="fid-anim" style={{ animation: "fid-dash 6s linear infinite" }} />
      <circle cx="300" cy="120" r="14" fill="none" stroke={BURGUNDY} strokeWidth="2.5" opacity="0.8" />
      <circle cx="300" cy="120" r="5" fill={GOLD} className="fid-anim" style={{ animation: "fid-pulse 4s ease-in-out infinite" }} />
    </svg>
  );
}

/* ── Cultural IPs — festival sound waves, organic energy, rhythm dots ── */
export function CultureGraphic({ size = "100%", className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 600 720" width={size} height={size} className={className} style={style} role="img" aria-label="">
      <Keyframes />
      <defs>
        <radialGradient id="cult-glow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor={GOLD_SOFT} stopOpacity="0.45" />
          <stop offset="1" stopColor={GOLD_SOFT} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cult-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={BURGUNDY} stopOpacity="0.2" />
          <stop offset="0.5" stopColor={BURGUNDY} stopOpacity="0.85" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="360" r="260" fill="url(#cult-glow)" />

      {/* concentric sound waves */}
      <g fill="none" stroke="url(#cult-wave)">
        {[80, 130, 180, 230].map((r, i) => (
          <circle key={i} cx="300" cy="360" r={r} strokeWidth={2.5 - i * 0.3} opacity={0.7 - i * 0.13} className="fid-anim" style={{ animation: `fid-pulse-strong ${5 + i * 1.5}s ease-in-out infinite` }} />
        ))}
      </g>

      {/* flowing organic waveform */}
      <path d="M60 360 Q150 250 240 360 T420 360 T600 360" fill="none" stroke={BURGUNDY} strokeWidth="3" opacity="0.7" className="fid-anim" style={{ animation: "fid-drift 7s ease-in-out infinite" }} />
      <path d="M60 410 Q150 320 240 410 T420 410 T600 410" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.5" className="fid-anim" style={{ animation: "fid-drift 9s ease-in-out infinite" }} />

      {/* rhythm dots */}
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={120 + i * 45} cy={360} r="5" fill={i % 2 ? GOLD : BURGUNDY} className="fid-anim" style={{ animation: `fid-pulse ${3 + (i % 4)}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}

/* ── Global Institutions — meridian globe, network arcs, reach nodes ── */
export function InstitutionsGraphic({ size = "100%", className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 600 720" width={size} height={size} className={className} style={style} role="img" aria-label="">
      <Keyframes />
      <defs>
        <radialGradient id="inst-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor={SAND} stopOpacity="0.4" />
          <stop offset="1" stopColor={SAND} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="320" r="270" fill="url(#inst-glow)" />

      {/* globe */}
      <circle cx="300" cy="320" r="190" fill="none" stroke={BURGUNDY} strokeWidth="2.5" opacity="0.7" />
      {/* meridians */}
      <g fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" className="fid-anim" style={{ animation: "fid-pulse 8s ease-in-out infinite" }}>
        {[60, 110, 160].map((rx, i) => (
          <ellipse key={i} cx="300" cy="320" rx={rx} ry="190" />
        ))}
        {[60, 110, 160].map((ry, i) => (
          <ellipse key={`h${i}`} cx="300" cy="320" rx="190" ry={ry} />
        ))}
      </g>

      {/* network reach arcs + nodes */}
      <g className="fid-anim" style={{ animation: "fid-drift 10s ease-in-out infinite" }}>
        <path d="M170 230 Q300 120 430 230" fill="none" stroke={BURGUNDY} strokeWidth="2" opacity="0.6" />
        <path d="M150 400 Q300 520 450 400" fill="none" stroke={BURGUNDY} strokeWidth="2" opacity="0.5" />
        {[[170, 230], [430, 230], [150, 400], [450, 400], [300, 130], [300, 510]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="7" fill={i % 2 ? GOLD : BURGUNDY} />
        ))}
      </g>
    </svg>
  );
}

/* ── Who We Are — Insight → Strategy → Impact converging mark ── */
export function WhoWeAreGraphic({ size = "100%", className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 600 600" width={size} height={size} className={className} style={style} role="img" aria-label="">
      <Keyframes />
      <defs>
        <radialGradient id="who-glow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor={GOLD_SOFT} stopOpacity="0.5" />
          <stop offset="1" stopColor={GOLD_SOFT} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="who-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD} />
          <stop offset="1" stopColor={BURGUNDY} />
        </linearGradient>
      </defs>

      <circle cx="300" cy="300" r="250" fill="url(#who-glow)" />

      {/* three converging arcs: insight, strategy, impact */}
      <g fill="none" strokeWidth="3" className="fid-anim" style={{ animation: "fid-drift 8s ease-in-out infinite" }}>
        <path d="M120 180 Q300 60 480 180" stroke="url(#who-line)" opacity="0.8" />
        <path d="M120 300 Q300 180 480 300" stroke="url(#who-line)" opacity="0.65" />
        <path d="M120 420 Q300 300 480 420" stroke="url(#who-line)" opacity="0.5" />
      </g>

      {/* central convergence mark */}
      <circle cx="300" cy="300" r="60" fill="none" stroke={BURGUNDY} strokeWidth="2.5" opacity="0.8" />
      <circle cx="300" cy="300" r="20" fill={BURGUNDY} opacity="0.85" />
      <circle cx="300" cy="300" r="110" fill="none" stroke={GOLD} strokeWidth="1.2" strokeDasharray="3 7" opacity="0.6" className="fid-anim" style={{ animation: "fid-dash 9s linear infinite" }} />

      {/* labels' anchor nodes */}
      {[[120, 180], [120, 300], [120, 420], [480, 180], [480, 300], [480, 420]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill={i % 2 ? GOLD : BURGUNDY} className="fid-anim" style={{ animation: `fid-pulse ${4 + (i % 3)}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}
