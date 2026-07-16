import type { Metadata, Viewport } from "next";
import { Gilda_Display, Manrope } from "next/font/google";
import { ConsultationProvider } from "@/components/layout/ConsultationDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileFurnitureCTA } from "@/components/layout/MobileFurnitureCTA";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const gilda = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Floor Nation | Premium Flooring, Decking & Custom Furniture Dubai",
    template: "%s | Floor Nation",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Floor Nation | Premium Flooring, Decking & Custom Furniture Dubai",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Warm contemporary interior with natural timber finishes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floor Nation | Premium Surfaces & Custom Interiors",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#211916" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phoneMobile,
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Al Nokhita Building, 6th Floor, Office 619, Al Khaleej Road, Al Hamriya",
    addressLocality: "Dubai",
    addressCountry: "AE",
    postOfficeBoxNumber: "63049",
  },
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  sameAs: [siteConfig.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${gilda.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('floor-nation-theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
      </head>
      <body className="bg-canvas pb-20 text-ink antialiased lg:pb-0">
        <a
          href="#main-content"
          className="fixed left-3 top-3 z-[60] -translate-y-24 rounded-lg bg-canvas px-4 py-2 font-semibold text-ink shadow-[var(--shadow-close)] transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ConsultationProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileFurnitureCTA />
        </ConsultationProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
