export const siteName = "Woodlands Print";

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Business", href: "/business-printing" },
  { label: "Quote", href: "/#quote" },
] as const;

export const footerLinks = {
  company: [
    { label: "Services", href: "/#services" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Get a Quote", href: "/#quote" },
    { label: "Business & Bulk", href: "/business-printing" },
  ],
  resources: [
    { label: "Artwork Requirements", href: "/artwork-requirements" },
    { label: "DTF Pressing Guide", href: "/dtf-pressing-instructions" },
    { label: "Turnaround Time", href: "/turnaround-time" },
  ],
  policies: [
    { label: "Custom Order Policy", href: "/custom-order-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
  local: [
    { label: "DTF — The Woodlands", href: "/dtf-transfers-the-woodlands" },
    { label: "Shirts — Spring, TX", href: "/custom-shirts-spring-tx" },
    { label: "DTF — Houston", href: "/dtf-printing-houston" },
    { label: "Gang Sheets — Conroe", href: "/gang-sheet-printing-conroe" },
  ],
};

export const pricingTiers = [
  {
    title: "DTF Gang Sheets",
    from: "$28",
    note: "Per sheet size — quantity discounts available",
    features: ["Vibrant full-color prints", "Gang sheet layout", "Rush options"],
  },
  {
    title: "Custom T-Shirts",
    from: "$22",
    note: "Per shirt — varies by blank, print locations & qty",
    features: ["Premium blanks", "Front / back / sleeve", "Bulk discounts"],
  },
  {
    title: "Business & Bulk",
    from: "Custom quote",
    note: "Best value for teams, events & uniforms",
    features: ["25+ shirt runs", "Logo placement help", "Reorder-friendly"],
    highlighted: true,
  },
];

export const galleryItems = [
  {
    label: "DTF Gang Sheet",
    tone: "from-brand/80 to-brand-light",
    icon: "⬛",
    detail: "Full-color transfer",
    size: "large",
  },
  {
    label: "Business Polo",
    tone: "from-brand-dark to-brand",
    icon: "👔",
    detail: "Logo embroidery & print",
    size: "small",
  },
  {
    label: "Event Tees",
    tone: "from-amber-600/70 to-brand-light",
    icon: "🎉",
    detail: "Bulk event runs",
    size: "small",
  },
  {
    label: "Team Hoodies",
    tone: "from-brand-light to-brand-dark",
    icon: "🏆",
    detail: "School & sports",
    size: "large",
  },
  {
    label: "Vibrant Transfer",
    tone: "from-brand to-amber-500/60",
    icon: "🎨",
    detail: "300 DPI full coverage",
    size: "small",
  },
  {
    label: "Bulk Ready",
    tone: "from-brand-dark to-brand-light",
    icon: "📦",
    detail: "25–500+ pieces",
    size: "small",
  },
];

export const faqItems = [
  {
    q: "How fast can you turn around my order?",
    a: "Standard orders typically ship or are ready for pickup within a few business days. Rush options are available — tell us your deadline in the quote form.",
  },
  {
    q: "What file format should I upload?",
    a: "PNG with a transparent background is best. We also accept PDF, AI, EPS, and SVG. See our Artwork Requirements page for full details.",
  },
  {
    q: "Do you offer local pickup?",
    a: "Yes. We serve The Woodlands, Spring, Conroe, and surrounding North Houston areas with local pickup and delivery options.",
  },
  {
    q: "Can you handle bulk business orders?",
    a: "Absolutely. Business uniforms, team shirts, church and event orders are our specialty. Visit our Business & Bulk page or request a quote.",
  },
];
