"use client";

const logos = [
  "executive-office-president", "state-dept-culture", "unhcr", "lc-waikiki",
  "wrc-safari-rally", "columbia-africa", "thrive-hospitality", "chloride-exide",
  "bomas-of-kenya", "amahoro-coalition", "elysium-capital", "2nu-kollexion",
  "abyan-salon-spa", "medigah-london-hair",
];

export default function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <section className="section-light" style={{ backgroundColor: "#f5f2ec", paddingTop: "clamp(4rem,8vw,6.5rem)", paddingBottom: "clamp(4rem,8vw,6.5rem)", overflow: "hidden", isolation: "isolate" }}>
      <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", marginBottom: "clamp(2.4rem,5vw,3.4rem)" }}>
        Trusted by institutions, governments &amp; brands across Africa
      </p>

      <div className="lm-mask">
        <div className="lm-track">
          {row.map((name, i) => (
            <div key={`${name}-${i}`} className="lm-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${name}.png`} alt={name.replace(/-/g, " ")} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lm-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .lm-track {
          display: flex;
          align-items: center;
          gap: clamp(2.5rem, 5vw, 4.5rem);
          width: max-content;
          animation: lm-scroll 42s linear infinite;
        }
        .lm-track:hover { animation-play-state: paused; }
        .lm-item {
          flex: 0 0 auto;
          height: 46px;
          display: flex;
          align-items: center;
        }
        .lm-item img {
          max-height: 46px;
          max-width: 150px;
          width: auto;
          object-fit: contain;
          filter: none;
          opacity: 1;
          mix-blend-mode: multiply;
          background: #f5f2ec;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .lm-item img:hover {
          transform: scale(1.08);
        }
        @keyframes lm-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lm-track { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
