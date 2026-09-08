/**
 * Brand backdrop for light pages — the 2026 constellation pattern, with the
 * dotted Africa map as an optional anchor in the corner.
 *
 * The artwork ships on its own cream ground rather than as a cut-out, so it is
 * composited with `mix-blend-mode: multiply`: the pale ground drops away
 * against a light page and only the dots and lines remain. That keeps the fine
 * tan linework intact, which keying the background out would have eaten.
 *
 * Purely decorative: aria-hidden, never intercepts pointer events, and sits
 * behind content on its own stacking layer.
 */
export default function BrandBackdrop({
  variant = "light",
  map = false,
  opacity = 0.5,
  mapOpacity = 0.3,
}: {
  /** "light" for white pages, "cream" for the warmer #f5f2ec sections,
   *  "dark" for the deep-maroon panels (gold artwork, no multiply). */
  variant?: "light" | "cream" | "dark";
  /** Anchor the dotted Africa map in the bottom-right. */
  map?: boolean;
  opacity?: number;
  mapOpacity?: number;
}) {
  const dark = variant === "dark";
  // The gold artwork is transparent PNG, so it sits on a dark panel directly;
  // the light artwork carries its own pale ground and needs multiply.
  const pattern = dark
    ? "/brand/pattern-constellation-gold.png"
    : variant === "cream"
      ? "/brand/pattern-constellation-cream.jpg"
      : "/brand/pattern-constellation-light.jpg";
  const mapSrc = dark ? "/brand/africa-constellation-gold.png" : "/brand/africa-constellation-maroon.jpg";

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${pattern}')`,
          backgroundSize: "clamp(620px, 62vw, 1000px) auto",
          backgroundRepeat: "repeat",
          mixBlendMode: dark ? "normal" : "multiply",
          opacity,
        }}
      />
      {map && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mapSrc}
          alt=""
          loading="lazy"
          style={{
            position: "absolute",
            right: "clamp(-90px, -6vw, -40px)",
            bottom: "clamp(-90px, -6vw, -40px)",
            width: "clamp(280px, 34vw, 560px)",
            height: "auto",
            mixBlendMode: dark ? "normal" : "multiply",
            opacity: mapOpacity,
          }}
        />
      )}
    </div>
  );
}
