"use client";

// Marquee items exactly as in the design (fid.js)
const ITEMS = [
  { num: "01", label: "Strategic Communications" },
  { num: "02", label: "Media Strategy" },
  { num: "03", label: "Digital & Influencer" },
  { num: "04", label: "Experiential Marketing" },
  { num: "05", label: "Brand Activations" },
  { num: "06", label: "Public Relations" },
  { num: "07", label: "Owned Platforms" },
  { num: "08", label: "Cultural Relevance" },
];

export default function Marquee() {
  // Duplicate for seamless loop
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      className="marquee-strip overflow-hidden border-y"
      style={{
        backgroundColor: "var(--maroon-2, #1d0202)",
        borderColor: "rgba(217,171,136,0.16)",
        padding: "1.35rem 0",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: "14%", zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(90deg, #1d0202, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: "14%", zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(270deg, #1d0202, transparent)",
        }}
      />

      <div
        className="marquee-track"
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          animation: "fid-marquee 38s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="marquee-item"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.95rem",
              padding: "0 2.4rem",
            }}
          >
            <span
              className="mq-no"
              style={{
                fontFamily: "var(--font-body, 'Noto Sans', sans-serif)",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: "#F1E194",
                fontVariantNumeric: "tabular-nums",
                opacity: 0.85,
              }}
            >
              {item.num}
            </span>
            <span
              className="mq-txt"
              style={{
                fontFamily: "var(--font-heading, 'Oswald', 'Arial Narrow', sans-serif)",
                fontWeight: 500,
                fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#F5F2EC",
                whiteSpace: "nowrap",
                transition: "color 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {item.label}
            </span>
            {/* Diamond separator */}
            <span
              aria-hidden="true"
              style={{
                width: "6px",
                height: "6px",
                flexShrink: 0,
                transform: "rotate(45deg)",
                border: "1px solid #D9AB88",
                opacity: 0.5,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        .marquee-strip:hover .marquee-track { animation-play-state: paused; }
        .marquee-item:hover .mq-txt { color: #F1E194 !important; }
        @keyframes fid-marquee { to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
