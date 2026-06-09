import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Philosophy from "@/components/sections/Philosophy";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
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
      <Philosophy />
      <About />
      <Services />
      <Work />
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
