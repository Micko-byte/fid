import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#5C3C2C" }}
    >
      <p className="font-body text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#742F14" }}>
        404
      </p>
      <h1
        className="font-heading leading-none mb-6"
        style={{ fontSize: "clamp(4rem, 12vw, 9rem)", color: "#742F14", letterSpacing: "-0.03em" }}
      >
        Lost.
      </h1>
      <p className="font-body text-lg mb-10 max-w-sm" style={{ color: "#C7AC9F" }}>
        This page doesn't exist. Let's get you back to something deliberate.
      </p>
      <Link
        href="/"
        className="font-body text-sm px-8 py-4 transition-colors duration-200"
        style={{ backgroundColor: "#742F14", color: "#FFFFFF", letterSpacing: "0.05em" }}
      >
        Back to home
      </Link>
    </div>
  );
}
