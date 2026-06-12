import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  openGraph: {
    title: "Woodlands Print | DTF Transfers & Custom Shirts",
    description:
      "Fast, local custom printing and DTF transfers for businesses and events across North Houston.",
    type: "website",
    locale: "en_US",
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
    <html lang="en" className={`${geistSans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
