import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { JsonLd } from "@/components/ui/json-ld";
import { site } from "@/config/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mvaak — Egocentric Data & AI Training Data Services",
    template: "%s · Mvaak",
  },
  description: site.description,
  applicationName: site.name,
  icons: { icon: "/brand/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: "Mvaak — Real-world demonstrations. Training-ready data.",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#151a21",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <AnalyticsScripts />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: `${site.url}/brand/favicon.svg`,
            email: site.email,
            telephone: "+91-73880-73490",
            description: site.description,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Moti Nagar",
              addressLocality: site.address.locality,
              postalCode: site.address.postalCode,
              addressCountry: site.address.country,
            },
          }}
        />
      </body>
    </html>
  );
}
