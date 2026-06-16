import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://woodlandsprint.com";

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/logo-preview"] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
