import BrandHero from "@/components/sections/BrandHero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import CTABanner from "@/components/sections/CTABanner";
import WorkExpandGallery from "@/components/sections/WorkExpandGallery";
import StatsBand from "@/components/sections/StatsBand";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import Platforms from "@/components/sections/Platforms";
import Founder from "@/components/sections/Founder";
import Insights from "@/components/sections/Insights";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Contact from "@/components/sections/Contact";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import Footer from "@/components/Footer";
import ResponsiveHome from "@/components/mobile/ResponsiveHome";

export default function HomePage() {
  return (
    <ResponsiveHome
      desktop={
    <>
      <BrandHero />
      <About />
      <Services />
      <CTABanner />
      <WorkExpandGallery />
      <StatsBand />
      <AfricanFootprint />
      <Platforms />
      <Founder />
      <Insights />
      <InstagramFeed />
      <Contact />
      <div className="footer-capability-strip" aria-label="FID & Co. capabilities">
        <ScrollVelocity
          texts={["Strategic Communications / Media Management / Influencer & Creator / Digital Strategy / Experiential Marketing / "]}
          velocity={42}
          numCopies={4}
          className="footer-capability-text"
        />
        <style>{`
          .footer-capability-strip {
            overflow: hidden;
            background: #750006;
            color: #d98038;
            border-top: 1px solid rgba(217,128,56,0.22);
            border-bottom: 1px solid rgba(38,0,0,0.28);
            padding: clamp(0.85rem, 2vw, 1.15rem) 0;
          }
          .footer-capability-strip section {
            scroll-margin-top: 0;
          }
          .footer-capability-text {
            font-family: var(--font-heading);
            font-size: clamp(1.4rem, 4.2vw, 3.6rem);
            font-weight: 800;
            line-height: 0.92;
            letter-spacing: 0;
            text-transform: uppercase;
            white-space: nowrap;
          }
        `}</style>
      </div>
      <Footer />
    </>
      }
    />
  );
}
