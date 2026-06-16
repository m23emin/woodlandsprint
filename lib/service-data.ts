export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceHighlight = {
  title: string;
  description: string;
};

export type ServiceGalleryRef = {
  label: string;
  image: string;
  tone: string;
};

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  heroIntro: string;
  priceFrom: string;
  priceNote: string;
  highlights: ServiceHighlight[];
  whatYouGet: string[];
  gallery: ServiceGalleryRef[];
  faq: ServiceFaq[];
  relatedLocal: { label: string; href: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "dtf-transfers",
    eyebrow: "DTF Transfers",
    title: "DTF Transfers & Gang Sheets",
    metaTitle: "DTF Transfers & Gang Sheets | Woodlands Print",
    metaDescription:
      "Vibrant, durable DTF transfers and gang sheet printing in The Woodlands & North Houston. Full-color prints, fast turnaround, local pickup, reseller pricing.",
    heroSubtitle: "Full-color, ready-to-press transfers for any fabric",
    heroIntro:
      "Direct-to-film transfers give you vivid color, fine detail, and a soft stretch that lasts wash after wash. Perfect for one-offs, small runs, or production-ready gang sheets.",
    priceFrom: "From $28",
    priceNote: "Per standard gang sheet — volume discounts at 5, 10, and 25+ sheets.",
    highlights: [
      {
        title: "Vibrant & durable",
        description: "300 DPI full-color prints with bright whites and crisp edges that hold up to repeated washing.",
      },
      {
        title: "Any fabric",
        description: "Press onto cotton, blends, polyester, fleece, and more — no weeding, no minimums on single sheets.",
      },
      {
        title: "Gang sheet savings",
        description: "Fit multiple designs on one sheet to maximize space and lower your per-piece cost.",
      },
    ],
    whatYouGet: [
      "Standard and large gang sheet sizes",
      "Single custom transfers or full production runs",
      "Volume discounts for resellers and shops",
      "Rush turnaround when your deadline is tight",
      "Local pickup across North Houston",
    ],
    gallery: [
      { label: "DTF Gang Sheet", image: "/gallery/gang-sheet.jpg", tone: "from-brand/80 to-brand-light" },
      { label: "Vibrant Transfer", image: "/gallery/vibrant-transfer.jpg", tone: "from-brand to-amber-500/60" },
      { label: "Bulk Ready", image: "/gallery/bulk-ready.jpg", tone: "from-brand-dark to-brand-light" },
    ],
    faq: [
      {
        q: "What file format works best for DTF?",
        a: "PNG with a transparent background at 300 DPI is ideal. We also accept PDF, AI, EPS, and SVG. See our artwork requirements for full details.",
      },
      {
        q: "Do you have a minimum order?",
        a: "No minimum on single gang sheets. Volume pricing kicks in at 5, 10, and 25+ sheets.",
      },
      {
        q: "How do I press the transfers?",
        a: "Each order can include our heat press guide. Most transfers press around 300°F for 10–15 seconds — see our DTF pressing instructions.",
      },
    ],
    relatedLocal: [
      { label: "DTF Transfers — The Woodlands", href: "/dtf-transfers-the-woodlands" },
      { label: "DTF Printing — Houston", href: "/dtf-printing-houston" },
      { label: "Gang Sheets — Conroe", href: "/gang-sheet-printing-conroe" },
    ],
  },
  {
    slug: "custom-shirts",
    eyebrow: "Custom Apparel",
    title: "Custom T-Shirts, Hoodies & Polos",
    metaTitle: "Custom T-Shirts & Apparel Printing | Woodlands Print",
    metaDescription:
      "Custom printed t-shirts, hoodies, and business polos in The Woodlands & North Houston. Premium blanks, crisp prints, bulk discounts, fast local turnaround.",
    heroSubtitle: "Premium blanks with prints that look and feel great",
    heroIntro:
      "Soft, durable apparel printed with sharp, full-color designs for teams, brands, events, and everyday wear. Front, back, and sleeve placements available.",
    priceFrom: "From $22",
    priceNote: "Per shirt — varies by blank, print locations, and quantity. Bulk discounts at 12, 24, and 50+.",
    highlights: [
      {
        title: "Premium blanks",
        description: "Soft, well-fitting shirts, hoodies, and polos in popular colors and a full size range.",
      },
      {
        title: "Multi-location prints",
        description: "Front, back, and sleeve placements with accurate color and clean detail.",
      },
      {
        title: "Bulk-friendly",
        description: "The more you order, the lower the per-piece price — great for teams and events.",
      },
    ],
    whatYouGet: [
      "T-shirts, hoodies, crewnecks, and polos",
      "Front / back / sleeve print options",
      "Mixed sizes including 2XL and 3XL",
      "Bulk and reorder-friendly pricing",
      "Artwork review before we print",
    ],
    gallery: [
      { label: "Business Polo", image: "/gallery/business-polo.jpg", tone: "from-brand-dark to-brand" },
      { label: "Team Hoodies", image: "/gallery/team-hoodies.jpg", tone: "from-brand-light to-brand-dark" },
      { label: "Event Tees", image: "/gallery/event-tees.jpg", tone: "from-amber-600/70 to-brand-light" },
    ],
    faq: [
      {
        q: "Can I mix sizes and colors in one order?",
        a: "Yes. Tell us the breakdown in your quote and we'll price it out. Mixed sizes are common for teams and events.",
      },
      {
        q: "Do you print front and back?",
        a: "Absolutely — front, back, and sleeve placements are all available. Each location is factored into your quote.",
      },
      {
        q: "What's the turnaround?",
        a: "Most orders are ready within a few business days. Rush options are available — share your deadline in the quote form.",
      },
    ],
    relatedLocal: [
      { label: "Custom Shirts — Spring, TX", href: "/custom-shirts-spring-tx" },
      { label: "DTF Transfers — The Woodlands", href: "/dtf-transfers-the-woodlands" },
      { label: "Business & Bulk Printing", href: "/business-printing" },
    ],
  },
  {
    slug: "event-bulk",
    eyebrow: "Events & Bulk",
    title: "Event & Bulk Order Printing",
    metaTitle: "Event & Bulk Shirt Printing | Woodlands Print",
    metaDescription:
      "Bulk custom shirts and DTF for events, fundraisers, schools, teams, and reunions in The Woodlands & North Houston. Reliable timelines and volume pricing.",
    heroSubtitle: "Reliable runs for events, teams, and large orders",
    heroIntro:
      "Race shirts, school spirit wear, reunions, fundraisers, and corporate events — handled with dependable timelines and pricing that scales with your quantity.",
    priceFrom: "Custom quote",
    priceNote: "Best value for 25+ pieces. Tell us your quantity and deadline for an exact number.",
    highlights: [
      {
        title: "Deadline-driven",
        description: "We plan around your event date and offer rush options so you're never cutting it close.",
      },
      {
        title: "Volume pricing",
        description: "Per-piece cost drops as your order grows — ideal for big teams, schools, and events.",
      },
      {
        title: "One point of contact",
        description: "From artwork to pickup, you work with a local team that keeps your order on track.",
      },
    ],
    whatYouGet: [
      "Race, event, and fundraiser shirts",
      "School, team, and church spirit wear",
      "Reunions, festivals, and corporate runs",
      "Mixed sizes and large quantities",
      "Local pickup, delivery, and shipping options",
    ],
    gallery: [
      { label: "Event Tees", image: "/gallery/event-tees.jpg", tone: "from-amber-600/70 to-brand-light" },
      { label: "Team Hoodies", image: "/gallery/team-hoodies.jpg", tone: "from-brand-light to-brand-dark" },
      { label: "Bulk Ready", image: "/gallery/bulk-ready.jpg", tone: "from-brand-dark to-brand-light" },
    ],
    faq: [
      {
        q: "How far in advance should I order for an event?",
        a: "The earlier the better, but we offer rush options. Share your event date in the quote and we'll confirm a timeline.",
      },
      {
        q: "Can you handle large quantities?",
        a: "Yes — from 25 to 500+ pieces. Bulk pricing improves as your quantity goes up.",
      },
      {
        q: "Do you offer delivery?",
        a: "Local pickup and delivery are available across North Houston, plus shipping for orders that need it.",
      },
    ],
    relatedLocal: [
      { label: "Business & Bulk Printing", href: "/business-printing" },
      { label: "Custom Shirts — Spring, TX", href: "/custom-shirts-spring-tx" },
      { label: "Gang Sheets — Conroe", href: "/gang-sheet-printing-conroe" },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
