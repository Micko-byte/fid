"use client";

type WhoWeAreBackdropProps = {
  className?: string;
  image?: string;
};

export default function WhoWeAreBackdrop({
  className = "",
  image = "/illustrations/about-collage.png",
}: WhoWeAreBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`fid-who-backdrop ${className}`.trim()}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        isolation: "isolate",
        opacity: 0.38,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(117,0,6,0.26) 0%, rgba(117,0,6,0.08) 34%, transparent 72%), linear-gradient(180deg, rgba(245,242,236,0.08) 0%, rgba(245,242,236,0.02) 40%, rgba(245,242,236,0) 100%)",
        }}
      />
      <img
        src={image}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 24%",
          transformOrigin: "58% 30%",
          filter: "saturate(0.68) contrast(1.06) brightness(0.72) sepia(0.22)",
          animation: "fid-who-zoom 24s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(23,4,4,0.88) 0%, rgba(23,4,4,0.44) 42%, rgba(117,0,6,0.18) 100%), linear-gradient(0deg, rgba(15,3,3,0.88) 0%, rgba(15,3,3,0) 52%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(245,242,236,0.52) 1px, transparent 1.4px)",
          backgroundSize: "20px 20px",
          opacity: 0.16,
          animation: "fid-who-grain 40s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "7%",
          top: "14%",
          width: "clamp(110px, 18vw, 170px)",
          height: "clamp(110px, 18vw, 170px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 36%, #e59248, #c25a1a)",
          opacity: 0.48,
          mixBlendMode: "screen",
          animation: "fid-who-float-a 11s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "18%",
          width: "clamp(150px, 22vw, 220px)",
          height: "clamp(150px, 22vw, 220px)",
          borderRadius: "50%",
          border: "1.5px solid rgba(245,242,236,0.22)",
          animation: "fid-who-spin 70s linear infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "22px",
            borderRadius: "50%",
            border: "1.5px solid rgba(217,171,136,0.28)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "52px",
            borderRadius: "50%",
            border: "1.5px solid rgba(245,242,236,0.18)",
          }}
        />
      </div>
      <svg viewBox="0 0 1200 460" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <g
          stroke="rgba(245,242,236,0.42)"
          strokeWidth="1.1"
          fill="none"
          strokeDasharray="6 10"
          style={{ animation: "fid-who-flow calc(18s * var(--spd, 1)) linear infinite" }}
        >
          <polyline points="40,120 260,180 520,90 760,200 1030,120 1180,210" />
          <polyline points="120,300 340,240 600,320 880,250 1120,330" />
        </g>
        <circle cx="165" cy="184" r="7" fill="#f5f2ec" opacity="0.55" style={{ animation: "fid-who-blip 3.4s ease-in-out infinite" }} />
        <circle cx="492" cy="110" r="7" fill="#d98038" opacity="0.66" style={{ animation: "fid-who-blip 2.8s ease-in-out infinite .4s" }} />
        <circle cx="762" cy="202" r="7" fill="#d9ab88" opacity="0.62" style={{ animation: "fid-who-blip 3.1s ease-in-out infinite .9s" }} />
        <circle cx="1038" cy="126" r="7" fill="#d98038" opacity="0.68" style={{ animation: "fid-who-blip 2.6s ease-in-out infinite 1.3s" }} />
      </svg>

      <style>{`
        @keyframes fid-who-zoom {
          0%, 100% { transform: scale(1.04) translate(0, 0); }
          50% { transform: scale(1.14) translate(-2%, -2%); }
        }
        @keyframes fid-who-grain {
          to { background-position: 200px 160px; }
        }
        @keyframes fid-who-float-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(14px, -18px); }
        }
        @keyframes fid-who-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fid-who-flow {
          to { stroke-dashoffset: -1200; }
        }
        @keyframes fid-who-blip {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.35; }
          45% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fid-who-backdrop * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
