import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { GrainOverlay } from "./components/grain-overlay";
import { ThemeProvider } from "./components/theme-provider";
import { Analytics } from "./components/analytics";
import { ContactFloat } from "./components/contact-float";
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

export const metadata: Metadata = {
  title: "Woodlands Print | DTF Transfers & Custom T-Shirts in The Woodlands, TX",
  description:
    "Premium DTF transfers, custom t-shirts, business apparel, and bulk event orders with fast turnaround. Serving The Woodlands, Spring, Conroe, Tomball, Magnolia, Richmond, and surrounding areas.",
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
    locale: "en_US",
    images: [{ url: "/brand/logo-full.png", width: 1200, height: 630, alt: "Woodlands Print" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e4d3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <GrainOverlay />
          {children}
          <ContactFloat />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
