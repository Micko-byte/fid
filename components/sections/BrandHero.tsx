"use client";

import Link from "next/link";
import { ArrowRight, Play, Target, Crown, Star } from "@phosphor-icons/react";
import { GooeyText } from "@/components/ui/GooeyText";

/* Real FID & Co. clients / institutions */
const CLIENTS = [
  { name: "Executive Office of the President", logo: "/logos/executive-office-president.png" },
  { name: "UNHCR", logo: "/logos/unhcr.png" },
  { name: "LC Waikiki", logo: "/logos/lc-waikiki.png" },
  { name: "Columbia Africa", logo: "/logos/columbia-africa.png" },
  { name: "Bomas of Kenya", logo: "/logos/bomas-of-kenya.png" },
  { name: "Thrive Hospitality", logo: "/logos/thrive-hospitality.png" },
  { name: "WRC Safari Rally", logo: "/logos/wrc-safari-rally.png" },
  { name: "Chloride Exide", logo: "/logos/chloride-exide.png" },
];

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.35rem", color: "#f5f2ec", lineHeight: 1 }}>{value}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,236,0.5)", marginTop: "0.35rem" }}>{label}</span>
    </div>
  );
}

export default function BrandHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      data-nav-dark
      style={{ background: "#0d0606", color: "#f5f2ec" }}
    >
      <style>{`
        @keyframes fid-fade-slide { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        @keyframes fid-marquee { from { transform:translateX(0);} to { transform:translateX(-50%);} }
        .fid-fade { animation: fid-fade-slide 0.8s ease-out forwards; opacity:0; }
        .fid-marquee { animation: fid-marquee 38s linear infinite; }
        .fid-d1{animation-delay:.1s}.fid-d2{animation-delay:.2s}.fid-d3{animation-delay:.3s}.fid-d4{animation-delay:.4s}.fid-d5{animation-delay:.5s}
      `}</style>

      {/* Ambient brand glows */}
      <div aria-hidden className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(60% 60% at 80% 0%, rgba(217,128,56,0.16) 0%, transparent 55%), radial-gradient(70% 70% at 12% 30%, rgba(117,0,6,0.55) 0%, transparent 60%)" }} />
      <div aria-hidden className="brand-pattern absolute inset-0 z-0" style={{ opacity: 0.4 }} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 pb-14 sm:px-6 md:pt-36 md:pb-24 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-start">

          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col space-y-7 pt-4">
            <div className="fid-fade fid-d1">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5" style={{ border: "1px solid rgba(217,128,56,0.3)", background: "rgba(245,242,236,0.04)", backdropFilter: "blur(8px)" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d98038", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Strategic Communications · Africa
                  <Star size={13} weight="fill" color="#d98038" />
                </span>
              </span>
            </div>

            {/* Heading with gooey morph */}
            <div className="fid-fade fid-d2">
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95, fontSize: "clamp(2.6rem, 7vw, 5.4rem)", margin: 0 }}>
                Communication as
              </h1>
              <GooeyText
                texts={["Insight.", "Strategy.", "Impact."]}
                morphTime={1}
                cooldownTime={1.6}
                className="mt-2 h-[clamp(3.6rem,13vw,8rem)] w-full"
                textClassName="font-heading font-extrabold tracking-tighter text-[clamp(3.2rem,11vw,7.5rem)] text-[#f5f2ec]"
              />
            </div>

            <p className="fid-fade fid-d3" style={{ maxWidth: "46ch", fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.65, color: "rgba(245,242,236,0.62)" }}>
              A full-service strategic communications and brand-experience firm —
              building reputation, shifting narratives and delivering measurable
              impact across Africa.
            </p>

            <div className="fid-fade fid-d4 flex flex-col sm:flex-row gap-4">
              <Link href="/#contact" className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4" style={{ background: "#d98038", color: "#260000", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.02em", textDecoration: "none" }}>
                Start a project
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/#work" className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4" style={{ border: "1px solid rgba(245,242,236,0.18)", background: "rgba(245,242,236,0.05)", color: "#f5f2ec", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, backdropFilter: "blur(6px)", textDecoration: "none" }}>
                <Play size={15} weight="fill" color="#d98038" />
                Our work
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 space-y-5 lg:mt-10">
            {/* Stats card */}
            <div className="fid-fade fid-d5 relative overflow-hidden rounded-3xl p-7" style={{ border: "1px solid rgba(245,242,236,0.1)", background: "rgba(245,242,236,0.05)", backdropFilter: "blur(16px)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
              <div aria-hidden className="absolute -top-16 -right-16 h-56 w-56 rounded-full pointer-events-none" style={{ background: "rgba(217,128,56,0.14)", filter: "blur(60px)" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "rgba(217,128,56,0.14)", border: "1px solid rgba(217,128,56,0.3)" }}>
                    <Target size={24} weight="light" color="#d98038" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.9rem", color: "#f5f2ec", lineHeight: 1 }}>250+</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(245,242,236,0.55)", marginTop: "0.2rem" }}>Campaigns delivered</div>
                  </div>
                </div>

                <div className="mb-7" style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  <div className="flex justify-between" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem" }}>
                    <span style={{ color: "rgba(245,242,236,0.55)" }}>Client retention</span>
                    <span style={{ color: "#f5f2ec", fontWeight: 600 }}>96%</span>
                  </div>
                  <div style={{ height: "8px", width: "100%", borderRadius: "999px", background: "rgba(245,242,236,0.1)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "96%", borderRadius: "999px", background: "linear-gradient(to right, #750006, #d98038)" }} />
                  </div>
                </div>

                <div style={{ height: "1px", width: "100%", background: "rgba(245,242,236,0.1)", marginBottom: "1.4rem" }} />

                <div className="grid grid-cols-3 gap-3 text-center">
                  <StatItem value="15+" label="Years" />
                  <StatItem value="12+" label="Markets" />
                  <StatItem value="80+" label="Brands" />
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ border: "1px solid rgba(245,242,236,0.1)", background: "rgba(245,242,236,0.05)", fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(245,242,236,0.75)" }}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#46c46b" }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#2fa653" }} />
                    </span>
                    AVAILABLE FOR BRIEFS
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ border: "1px solid rgba(245,242,236,0.1)", background: "rgba(245,242,236,0.05)", fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(245,242,236,0.75)" }}>
                    <Crown size={13} weight="fill" color="#d98038" />
                    PAN-AFRICAN
                  </span>
                </div>
              </div>
            </div>

            {/* Client marquee card */}
            <div className="fid-fade fid-d5 relative overflow-hidden rounded-3xl py-7" style={{ border: "1px solid rgba(245,242,236,0.1)", background: "rgba(245,242,236,0.05)", backdropFilter: "blur(16px)" }}>
              <h3 className="mb-5 px-7" style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,242,236,0.5)" }}>
                Trusted by leading brands &amp; institutions
              </h3>
              <div className="relative flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 18%, black 82%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 18%, black 82%, transparent)" }}>
                <div className="fid-marquee flex items-center gap-4 whitespace-nowrap px-5">
                  {[...CLIENTS, ...CLIENTS].map((c, i) => (
                    <div
                      key={i}
                      title={c.name}
                      style={{ flexShrink: 0, height: "54px", padding: "0 1.1rem", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "rgba(245,242,236,0.96)", border: "1px solid rgba(245,242,236,0.4)" }}
                    >
                      <img
                        src={c.logo}
                        alt={c.name}
                        loading="lazy"
                        style={{ height: "32px", width: "auto", maxWidth: "118px", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
