export type LocalSeoPage = {
  slug: string;
  title: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  city: string;
  intro: string;
  services: string[];
  cta: string;
};

export const localSeoPages: LocalSeoPage[] = [
  {
    slug: "dtf-transfers-the-woodlands",
    title: "DTF Transfers in The Woodlands, TX | Woodlands Print",
    metaDescription:
      "Same-area DTF transfers and gang sheet printing in The Woodlands, TX. Fast quotes, local pickup, vibrant prints for businesses and creators.",
    headline: "DTF Transfers in The Woodlands",
    subheadline: "Gang sheets, custom transfers & fast local service",
    city: "The Woodlands",
    intro:
      "Need DTF transfers near The Woodlands? We print vibrant, durable direct-to-film transfers for small runs, gang sheets, and production-ready orders — with local pickup and quick quotes.",
    services: [
      "DTF gang sheet printing",
      "Custom transfer orders by size",
      "Rush turnaround available",
      "Local pickup in The Woodlands area",
      "Business & reseller-friendly pricing",
    ],
    cta: "Get a DTF quote for The Woodlands",
  },
  {
    slug: "custom-shirts-spring-tx",
    title: "Custom T-Shirts in Spring, TX | Woodlands Print",
    metaDescription:
      "Custom t-shirts and business apparel in Spring, TX. Team shirts, event tees, and bulk orders with fast turnaround and local support.",
    headline: "Custom T-Shirts in Spring, TX",
    subheadline: "Team shirts, events, business apparel & bulk orders",
    city: "Spring",
    intro:
      "Looking for custom shirt printing in Spring? From team and event tees to business uniforms, we deliver crisp prints on premium blanks with competitive bulk pricing.",
    services: [
      "Custom t-shirts & hoodies",
      "Business & uniform printing",
      "School, church & event shirts",
      "Bulk quantity discounts",
      "Pickup and shipping options",
    ],
    cta: "Request a Spring, TX quote",
  },
  {
    slug: "dtf-printing-houston",
    title: "DTF Printing Houston & North Houston | Woodlands Print",
    metaDescription:
      "DTF printing for Houston and North Houston customers. Gang sheets, custom transfers, and shirt printing with fast quotes and reliable turnaround.",
    headline: "DTF Printing — Houston & North Houston",
    subheadline: "Transfers, gang sheets & custom apparel",
    city: "Houston",
    intro:
      "Serving Houston and North Houston with professional DTF printing. Upload your artwork, get a fast quote, and choose local pickup or shipping — ideal for businesses, Etsy sellers, and bulk buyers.",
    services: [
      "DTF transfer printing",
      "Gang sheet layout & print",
      "Custom shirt fulfillment",
      "Wholesale & bulk pricing",
      "Fast quote turnaround",
    ],
    cta: "Get a Houston area quote",
  },
  {
    slug: "gang-sheet-printing-conroe",
    title: "Gang Sheet Printing Conroe, TX | Woodlands Print",
    metaDescription:
      "Gang sheet DTF printing near Conroe, TX. Maximize your sheet space with vibrant prints, quantity discounts, and local North Houston service.",
    headline: "Gang Sheet Printing — Conroe Area",
    subheadline: "Efficient DTF gang sheets with local pickup",
    city: "Conroe",
    intro:
      "Conroe-area customers trust us for gang sheet DTF printing that maximizes space and color quality. Perfect for print shops, creators, and businesses running regular transfer orders.",
    services: [
      "Full-color gang sheet printing",
      "Optimized sheet layouts",
      "Repeat order friendly",
      "Rush production options",
      "Serving Conroe & Montgomery County",
    ],
    cta: "Quote your gang sheet order",
  },
];

export function getLocalPageBySlug(slug: string): LocalSeoPage | undefined {
  return localSeoPages.find((page) => page.slug === slug);
}
