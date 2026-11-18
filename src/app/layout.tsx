import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const GTM_IDS = [process.env.NEXT_PUBLIC_GTM_ID || "GTM-TZ5NKCDX", "GTM-5Z7QG67B"];

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
      <head>
        {/* Google Tag Manager (two containers sharing one dataLayer). The gtm.js start event is pushed once and
            read by both containers; also defines window.dataLayer + gtag() used by LeadForm's lead_submit event. */}
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});${JSON.stringify(GTM_IDS)}.forEach(function(i){var j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;document.head.appendChild(j);});`}
        </Script>
      </head>
      <body>
        {GTM_IDS.map((id) => (
          <noscript key={id}>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ))}
        {children}
      </body>
    </html>
  );
}
