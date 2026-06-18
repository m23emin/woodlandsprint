import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { getDictionary } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getSiteUrl } from "@/lib/site-url";
import { GrainOverlay } from "./components/grain-overlay";
import { LanguageProvider } from "./components/language-provider";
import { ThemeProvider } from "./components/theme-provider";
import { Analytics } from "./components/analytics";
import { CartRoot } from "./components/cart/cart-root";
import { ChatWidget } from "./components/chat/chat-widget";
import { ContactFloat } from "./components/contact-float";
import { StructuredData } from "./components/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(getSiteUrl()),
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    keywords: [
      "DTF transfers",
      "custom t-shirts",
      "The Woodlands printing",
      "business apparel",
      "bulk shirt orders",
      "gang sheets",
    ],
    icons: {
      icon: [
        { url: "/brand/logo-icon.png", sizes: "512x512", type: "image/png" },
        { url: "/brand/logo-icon.svg", type: "image/svg+xml" },
      ],
      apple: "/brand/logo-icon.png",
    },
    openGraph: {
      title: "Woodlands Print | DTF Transfers & Custom Shirts",
      description:
        "Fast, local custom printing and DTF transfers for businesses and events across North Houston.",
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      images: [{ url: "/brand/logo-full.png", width: 1200, height: 630, alt: "Woodlands Print" }],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e4d3a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${geistSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider locale={locale}>
            <CartRoot>
              <GrainOverlay />
              {children}
              <ChatWidget />
              <ContactFloat />
            </CartRoot>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <StructuredData />
      </body>
    </html>
  );
}
