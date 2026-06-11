import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import FeatureBand from "@/components/sections/FeatureBand";
import Services from "@/components/sections/Services";
import WorkIndustries from "@/components/sections/WorkIndustries";
import Philosophy from "@/components/sections/Philosophy";
import About from "@/components/sections/About";
import Platforms from "@/components/sections/Platforms";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Founder from "@/components/sections/Founder";
import Insights from "@/components/sections/Insights";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeatureBand />
      <Services />
      <WorkIndustries />
      <Philosophy />
      <About />
      <Platforms />
      <LogoMarquee />
      <Founder />
      <Insights />
      <InstagramFeed />
      <Contact />
      <Footer />
    </>
  );
}
