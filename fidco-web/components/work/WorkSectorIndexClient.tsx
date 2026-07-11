"use client";

import Footer from "@/components/Footer";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import WorkSectorsScroll from "@/components/work/WorkSectorsScroll";

export default function WorkSectorIndexClient() {
  return (
    <main style={{ background: "#f5f2ec", color: "#1c1c1c", minHeight: "100vh" }}>
      {/* All 11 sectors as a scrolling experience with a right-edge index */}
      <WorkSectorsScroll />

      <section className="section-shell" style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
        <AfricanFootprint />
      </section>

      <Footer />
    </main>
  );
}
