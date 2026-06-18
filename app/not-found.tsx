import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#260000" }}
    >
      <p className="font-body text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#750006" }}>
        404
      </p>
      <h1
        className="font-heading leading-none mb-6"
        style={{ fontSize: "clamp(4rem, 12vw, 9rem)", color: "#750006", letterSpacing: "-0.03em" }}
      >
        Lost.
      </h1>
      <p className="font-body text-lg mb-10 max-w-sm" style={{ color: "#d9ab88" }}>
        This page doesn&apos;t exist. Let&apos;s get you back to something deliberate.
      </p>
      <Link
        href="/"
        className="font-body text-sm px-8 py-4 transition-colors duration-200"
        style={{ backgroundColor: "#750006", color: "#FFFFFF", letterSpacing: "0.05em", borderRadius: "var(--button-radius)" }}
      >
        Back to home
      </Link>
    </div>
  );
}
