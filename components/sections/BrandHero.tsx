"use client";

const HERO_VIDEO =
  "https://res.cloudinary.com/drpsrkmbk/video/upload/v1782892119/Untitled_design_1_qdy61c.mp4";

export default function BrandHero() {
  return (
    <section
      data-nav-dark
      aria-label="FID & Co."
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
        preload="auto"
        aria-hidden
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
    </section>
  );
}
