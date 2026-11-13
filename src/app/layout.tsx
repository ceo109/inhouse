import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Villas for Sale in Kochi | Inhouse Caristo & Seventh Avenue | Inhouse Projects",
  description:
    "Premium gated villas and villa plots across Ernakulam. Villas from ₹85 Lakh at Inhouse Caristo, Vengola and Seventh Avenue, Thiruvankulam. RERA registered. Since 2001.",
  icons: { icon: "/img/logo-header.png" },
  openGraph: {
    title: "Find Your Perfect Villa in Kochi | Inhouse Projects",
    description: "Gated villas from ₹85 Lakh. RERA registered. 25 years, 500+ happy families.",
    images: ["/img/caristo-villa.jpg"],
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = { themeColor: "#26207A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
