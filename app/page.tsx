import HeroApproach from "@/components/sections/HeroApproach";
import Marquee from "@/components/sections/Marquee";
import FeatureBand from "@/components/sections/FeatureBand";
import Services from "@/components/sections/Services";
import WorkIndustries from "@/components/sections/WorkIndustries";
import About from "@/components/sections/About";
import Platforms from "@/components/sections/Platforms";
import BrandFlow from "@/components/sections/BrandFlow";
import Founder from "@/components/sections/Founder";
import Insights from "@/components/sections/Insights";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Hero + Our Approach: one scroll-choreographed stage.
          Logo starts full-screen, shrinks to the right through Insight →
          Strategy → Impact, then the rest of the site flows. */}
      <HeroApproach />
      <Marquee />
      <FeatureBand />
      <Services />
      <WorkIndustries />
      <About />
      <Platforms />
      <BrandFlow />
      <Founder />
      <Insights />
      <InstagramFeed />
      <Contact />
      <Footer />
    </>
  );
}
