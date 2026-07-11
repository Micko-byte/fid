"use client";

import Footer from "@/components/Footer";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import WorkSectorsScroll from "@/components/work/WorkSectorsScroll";

export default function WorkSectorIndexClient() {
  return (
    <>
      {/* intro before the immersive scroll — the site nav is still visible
          here; it retracts only once the sector experience takes over */}
      <div
        className="wsi-intro"
        style={{
          background: "#f5f2ec",
          color: "#1c1c1c",
          padding: "clamp(6.5rem, 14vh, 9rem) clamp(1.2rem, 4vw, 2.5rem) clamp(2rem, 5vw, 3rem)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#750006",
            fontWeight: 700,
            margin: "1.8rem 0 0",
          }}
        >
          Our Work
        </p>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#1c1c1c",
            margin: "0.6rem 0 0",
            maxWidth: "12ch",
            textTransform: "uppercase",
          }}
        >
          11 Sectors
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(28,28,28,0.68)",
            maxWidth: "48ch",
            margin: "1rem 0 0",
          }}
        >
          Scroll through our work by sector — government, retail, hospitality, culture and more. Select any sector to explore the engagements inside.
        </p>
      </div>

      <WorkSectorsScroll />

      <section style={{ background: "#f5f2ec", padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <AfricanFootprint />
      </section>

      <Footer />
    </>
  );
}
