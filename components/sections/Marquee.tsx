"use client";

const items = [
  "Strategic Communications",
  "Media Strategy",
  "Digital & Influencer",
  "Experiential Marketing",
  "Brand Activations",
  "Public Relations",
  "360 Agency",
  "Brand Experiences",
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden py-5 border-y"
      style={{
        backgroundColor: "#750006",
        borderColor: "rgba(217,171,136,0.2)",
      }}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: "marquee 40s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="font-body text-sm tracking-widest uppercase inline-flex items-center">
            <span style={{ color: "#F5F2EC", padding: "0 2.5rem" }}>{item}</span>
            <span style={{ color: "#D9AB88", opacity: 0.6 }}>·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
