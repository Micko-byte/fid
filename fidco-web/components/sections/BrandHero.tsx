"use client";

// q_auto + vc_auto let Cloudinary pick the best quality/codec per browser —
// substantially smaller than the raw upload, same visual quality.
const HERO_VIDEO =
  "https://res.cloudinary.com/drpsrkmbk/video/upload/q_auto,vc_auto,w_1920/v1782892119/Untitled_design_1_qdy61c.mp4";

export default function BrandHero() {
  return (
    <section
      data-nav-dark
      aria-label="FID & Co."
      className="brand-hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "560px",
        overflow: "hidden",
        background: "#260000",
      }}
    >
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/photos/hero-poster.jpg"
        aria-hidden
        className="brand-hero-video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
      {/* subtle top scrim so the header reads over the video */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(38,0,0,0.35) 0%, transparent 22%, transparent 78%, rgba(38,0,0,0.35) 100%)",
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .brand-hero-section {
            height: auto !important;
            min-height: 0 !important;
            /* nav bar first, video below it — not overlaid */
            padding-top: 64px !important;
          }
          .brand-hero-video {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
          }
        }
      `}</style>
    </section>
  );
}
