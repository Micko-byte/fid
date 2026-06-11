import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import SiteChrome from "@/components/SiteChrome";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CustomCursor from "@/components/motion/CustomCursor";

export const metadata: Metadata = {
  title: "FID & Co. | Strategic Communications & Brand Experience Agency | Nairobi, Kenya",
  description:
    "FID & Co. is a full-service strategic communications and brand experience firm delivering PR, media strategy, digital storytelling, influencer marketing and experiential activations across Kenya and Africa.",
  keywords: [
    "FID PR", "FID Public Relations", "FID and Co", "FID & Co Kenya",
    "strategic communications agency Nairobi", "360 agency Kenya",
    "brand experience agency Africa", "PR agency Nairobi",
    "experiential marketing Kenya", "media buying Kenya",
  ],
  openGraph: {
    title: "FID & Co. | Strategic Communications & Brand Experience",
    description: "Insight. Strategy. Impact. A 360 communications and brand experience agency operating across Africa.",
    url: "https://fidco.africa",
    siteName: "FID & Co.",
    locale: "en_KE",
    type: "website",
    images: [{ url: "https://fidco.africa/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FID & Co. | Strategic Communications",
    description: "Insight. Strategy. Impact.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://fidco.africa" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <SiteChrome>{children}</SiteChrome>
          <WhatsAppButton />
          <CustomCursor />
        </LenisProvider>
      </body>
    </html>
  );
}
