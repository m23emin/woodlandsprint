import type { MetadataRoute } from "next";
import { localSeoPages } from "@/lib/local-seo-data";

const staticPages = [
  "",
  "/business-printing",
  "/artwork-requirements",
  "/dtf-pressing-instructions",
  "/turnaround-time",
  "/custom-order-policy",
  "/refund-policy",
  "/shipping-policy",
  "/privacy-policy",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://woodlandsprint.com";

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...localSeoPages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
