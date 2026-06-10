import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Philosophy from "@/components/sections/Philosophy";
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
      <About />
      <Services />
      <Work />
      <Philosophy />
      <Founder />
      <Insights />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
