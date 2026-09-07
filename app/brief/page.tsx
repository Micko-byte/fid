import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import DiscoveryBrief from "@/components/contact/DiscoveryBrief";
import BrandBackdrop from "@/components/graphics/BrandBackdrop";

export const metadata: Metadata = {
  title: "The Discovery Brief | FID & Co.",
  description:
    "Every great partnership starts with a great conversation. Tell us about your business, your brand, your audience and what success looks like from where you're sitting.",
};

export default function BriefPage() {
  return (
    <>
      <section className="section-light" style={{ position: "relative", overflow: "hidden", paddingTop: "clamp(7rem,14vw,11rem)", paddingBottom: "clamp(2.5rem,5vw,4rem)", backgroundColor: "#fbf7f1" }}>
        <BrandBackdrop variant="cream" map opacity={0.55} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", marginBottom: "1.4rem", fontWeight: 700 }}>
            The Discovery Brief
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.6rem,7vw,5.6rem)", lineHeight: 1.02, letterSpacing: "-0.03em", color: "#260000", maxWidth: "16ch" }}>
            Every great partnership starts with a great conversation.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.12rem)", lineHeight: 1.75, color: "rgba(28,28,28,0.7)", maxWidth: "58ch", marginTop: "1.8rem" }}>
            Before we start throwing around big ideas, beautiful decks and ambitious strategies, we&apos;d like to understand you — your business, your brand, your audience and what success looks like from where you&apos;re sitting.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.4vw,1.12rem)", lineHeight: 1.75, color: "rgba(28,28,28,0.7)", maxWidth: "58ch", marginTop: "1rem" }}>
            Don&apos;t worry if you don&apos;t have all the answers. That&apos;s partly why you called us. Grab a coffee. Or tea. We don&apos;t judge.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2f7f7a", marginTop: "1.8rem", fontWeight: 700 }}>
            Insight. Strategy. Impact.
          </p>
        </div>
      </section>

      <section className="section-light" style={{ backgroundColor: "#fbf7f1", paddingBottom: "clamp(5rem,10vw,8rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
          <DiscoveryBrief />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "rgba(28,28,28,0.55)", textAlign: "center", marginTop: "clamp(2.5rem,5vw,3.5rem)" }}>
            Just after a quick word instead?{" "}
            <Link href="/#contact" style={{ color: "#750006", fontWeight: 700 }}>Send us a short message</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
