import FeatureBand from "@/components/sections/FeatureBand";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import BrandFlow from "@/components/sections/BrandFlow";
import CTABanner from "@/components/sections/CTABanner";
import WorkIndustries from "@/components/sections/WorkIndustries";
import StatsBand from "@/components/sections/StatsBand";
import Platforms from "@/components/sections/Platforms";
import Founder from "@/components/sections/Founder";
import Insights from "@/components/sections/Insights";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Contact from "@/components/sections/Contact";
import CurvedLoop from "@/components/ui/CurvedLoop";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Atra-style flow: hero → about → services → CTA → work → stats → testimonial → logos → contact */}
      <FeatureBand />
      <About />
      <Services />
      <BrandFlow />
      <CTABanner />
      <WorkIndustries />
      <StatsBand />
      <Platforms />
      <Founder />
      <Insights />
      <InstagramFeed />
      <Contact />
      {/* Service ribbon above footer */}
      <div style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(2rem,5vw,4rem)", paddingBottom: "clamp(1rem,3vw,2rem)", borderTop: "1px solid rgba(38,0,0,0.1)" }}>
        <CurvedLoop
          marqueeText="Strategic Communications ✦ Media Management ✦ Influencer & Creator ✦ Digital Strategy ✦ Experiential Marketing ✦"
          speed={1.6}
          curveAmount={90}
          className="curved-ribbon"
        />
      </div>
      <Footer />
    </>
  );
}
