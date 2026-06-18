import { faqItems, siteContact, siteName } from "@/lib/site-config";
import { getSiteUrl } from "@/lib/site-url";

/**
 * LocalBusiness + WebSite JSON-LD for rich results and local SEO.
 * Service-area business (no public storefront address required).
 */
export function StructuredData() {
  const url = getSiteUrl();

  const areas = [
    "The Woodlands",
    "Spring",
    "Conroe",
    "Tomball",
    "Magnolia",
    "Houston",
    "Richmond",
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${url}/#business`,
        name: siteName,
        description:
          "DTF transfers, custom t-shirts, business apparel, and bulk event printing with fast local turnaround in The Woodlands and North Houston.",
        url,
        ...(siteContact.phone ? { telephone: siteContact.phone } : {}),
        image: `${url}/brand/logo-full.png`,
        logo: `${url}/brand/logo-icon.png`,
        priceRange: "$$",
        areaServed: areas.map((name) => ({ "@type": "City", name })),
        address: {
          "@type": "PostalAddress",
          addressRegion: "TX",
          addressCountry: "US",
          addressLocality: "The Woodlands",
        },
        knowsAbout: [
          "DTF transfers",
          "Gang sheet printing",
          "Custom t-shirts",
          "Screen print transfers",
          "Bulk apparel printing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteName,
        publisher: { "@id": `${url}/#business` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
