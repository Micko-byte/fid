/**
 * CornerBrackets — decorative white L-shaped corner accents
 * Placed on top-right and bottom-left corners of maroon/oxblood image plates
 * to break monotony and add editorial tension.
 *
 * Usage:
 *   <div style={{ position: "relative" }}>
 *     ...plate content...
 *     <CornerBrackets />
 *   </div>
 */

interface CornerBracketsProps {
  color?: string;
  size?: number;    // leg length in px
  weight?: number;  // line thickness in px
  inset?: number;   // distance from edge in px
}

export default function CornerBrackets({
  color = "rgba(255,255,255,0.55)",
  size = 22,
  weight = 1.5,
  inset = 0,
}: CornerBracketsProps) {
  const s = `${size}px`;
  const w = `${weight}px`;

  const corners = [
    // top-right: horizontal goes left from right, vertical goes down from top
    {
      style: { top: inset, right: inset } as React.CSSProperties,
      h: { top: 0, right: 0, width: s, height: w } as React.CSSProperties,
      v: { top: 0, right: 0, width: w, height: s } as React.CSSProperties,
    },
    // bottom-left: horizontal goes right from left, vertical goes up from bottom
    {
      style: { bottom: inset, left: inset } as React.CSSProperties,
      h: { bottom: 0, left: 0, width: s, height: w } as React.CSSProperties,
      v: { bottom: 0, left: 0, width: w, height: s } as React.CSSProperties,
    },
  ];

  return (
    <>
      {corners.map((c, ci) => (
        <div
          key={ci}
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 5,
            pointerEvents: "none",
            ...c.style,
          }}
        >
          {/* horizontal arm */}
          <div
            style={{
              position: "absolute",
              backgroundColor: color,
              ...c.h,
            }}
          />
          {/* vertical arm */}
          <div
            style={{
              position: "absolute",
              backgroundColor: color,
              ...c.v,
            }}
          />
        </div>
      ))}
    </>
  );
}
