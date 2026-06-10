import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import FeatureBand from "@/components/sections/FeatureBand";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Philosophy from "@/components/sections/Philosophy";
import About from "@/components/sections/About";
import Platforms from "@/components/sections/Platforms";
import Sectors from "@/components/sections/Sectors";
import Founder from "@/components/sections/Founder";
import Insights from "@/components/sections/Insights";
import CTABanner from "@/components/sections/CTABanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeatureBand />
      <Services />
      <Work />
      <Philosophy />
      <About />
      <Platforms />
      <Sectors />
      <Founder />
      <Insights />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
