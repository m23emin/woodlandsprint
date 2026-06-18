import { getSiteUrl } from "@/lib/site-url";

type FaqItem = { q: string; a: string };

export function FaqStructuredData({ items, id }: { items: FaqItem[]; id: string }) {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}${id}`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
