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
  seed,
}: {
  /** "light" for white pages, "cream" for the warmer #f5f2ec sections,
   *  "dark" for the deep-maroon panels (gold artwork, no multiply). */
  variant?: "light" | "cream" | "dark";
  /** Anchor the dotted Africa map in the bottom-right. */
  map?: boolean;
  opacity?: number;
  mapOpacity?: number;
  /** Any stable string (a slug works). Shifts and scales the tiling so pages
   *  don't all show the constellation in the same place. */
  seed?: string;
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

  // Deterministic per-seed variation, so the constellation doesn't sit in the
  // same place on every page. Hashed rather than random so the server and the
  // client render the same thing.
  let h = 0;
  for (let i = 0; i < (seed ?? "").length; i += 1) h = (h * 31 + seed!.charCodeAt(i)) >>> 0;
  const offsetX = seed ? h % 90 : 0;
  const offsetY = seed ? (h >> 8) % 90 : 0;
  const scale = seed ? 0.82 + ((h >> 16) % 45) / 100 : 1;
  const flip = seed ? ((h >> 5) & 1) === 1 : false;

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${pattern}')`,
          backgroundSize: seed ? `${Math.round(780 * scale)}px auto` : "clamp(620px, 62vw, 1000px) auto",
          backgroundPosition: `${offsetX}% ${offsetY}%`,
          backgroundRepeat: "repeat",
          transform: flip ? "scaleX(-1)" : undefined,
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
