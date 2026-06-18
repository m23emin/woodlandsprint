export const siteName = "Woodlands Print";

/**
 * Contact details for the WhatsApp / call float and links.
 * ⚠️ Replace with your real numbers. Leave a value empty ("") to hide that button.
 *  - phone:    E.164 for tel: link, e.g. "+12815550123"
 *  - whatsapp: digits only for wa.me, e.g. "12815550123"
 */
export const siteContact = {
  phone: "+19369003250",
  whatsapp: "19369003250",
  whatsappMessage: "Hi! I'd like a quote for custom printing.",
};

/** Pickup & hours — edit for your shop */
export const sitePickup = {
  area: "North Houston — The Woodlands, Spring, Conroe & nearby",
  hours: "Mon–Fri 9am–6pm · Sat by appointment",
  pickupNote: "Local pickup available. Exact pickup location is sent with your order confirmation.",
  mapsQuery: "The Woodlands, TX",
};

export const serviceAreas = [
  "The Woodlands",
  "Spring",
  "Conroe",
  "Tomball",
  "Magnolia",
  "Houston",
  "Richmond",
] as const;

export const navLinks = [
  { label: "DTF Transfers", href: "/dtf-transfers" },
  { label: "Custom Shirts", href: "/custom-shirts" },
  { label: "Apparel", href: "/blanks" },
  { label: "Design Preview", href: "/mockup" },
  { label: "Gang Sheet", href: "/gang-sheet" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Quote", href: "/#quote" },
] as const;

export const howItWorksSteps = [
  {
    title: "Upload & Quote",
    description: "Send your artwork and project details. We respond quickly with pricing and timeline options.",
  },
  {
    title: "Review & Approve",
    description: "We check file quality and sizing. You approve before anything goes to print.",
  },
  {
    title: "Print & QC",
    description: "Your order is printed with premium materials and checked before it leaves our shop.",
  },
  {
    title: "Pickup or Ship",
    description: "Local pickup in North Houston or shipping to your door — ready when you need it.",
  },
] as const;

export const testimonials = [
  {
    name: "Marcus T.",
    role: "Gym Owner — Spring, TX",
    rating: 5,
    quote:
      "Ordered 40 team shirts with a tight deadline. Colors were spot-on and they had everything ready for pickup on time.",
  },
  {
    name: "Sarah L.",
    role: "Event Coordinator — The Woodlands",
    rating: 5,
    quote:
      "Great communication from quote to delivery. The DTF transfers looked vibrant and held up great after multiple washes.",
  },
  {
    name: "David R.",
    role: "Small Business — Conroe",
    rating: 5,
    quote:
      "We use them for polos and bulk runs. Fair pricing, consistent quality, and reordering is easy every season.",
  },
] as const;

export const trustCategories = [
  "Gyms & Fitness",
  "Barber Shops",
  "Restaurants",
  "Churches",
  "Schools & Teams",
  "Landscaping",
  "Construction",
  "Event Planners",
] as const;

export type GalleryItem = {
  label: string;
  detail: string;
  tone: string;
  icon?: string;
  image?: string;
  layout: "hero" | "tall" | "wide" | "default";
};

export const footerLinks = {
  company: [
    { label: "DTF Transfers", href: "/dtf-transfers" },
    { label: "Custom Shirts", href: "/custom-shirts" },
    { label: "Apparel Catalog", href: "/blanks" },
    { label: "Design Preview", href: "/mockup" },
    { label: "Gang Sheet Builder", href: "/gang-sheet" },
    { label: "Events & Bulk", href: "/event-bulk" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Get a Quote", href: "/#quote" },
    { label: "My Account", href: "/account" },
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

export const galleryItems: GalleryItem[] = [
  {
    label: "DTF Gang Sheet",
    tone: "from-brand/80 to-brand-light",
    icon: "⬛",
    detail: "Full-color transfer",
    layout: "hero",
    image: "/gallery/gang-sheet.jpg",
  },
  {
    label: "Business Polo",
    tone: "from-brand-dark to-brand",
    icon: "👔",
    detail: "Logo & print",
    layout: "default",
    image: "/gallery/business-polo.jpg",
  },
  {
    label: "Event Tees",
    tone: "from-amber-600/70 to-brand-light",
    icon: "🎉",
    detail: "Bulk event runs",
    layout: "default",
    image: "/gallery/event-tees.jpg",
  },
  {
    label: "Team Hoodies",
    tone: "from-brand-light to-brand-dark",
    icon: "🏆",
    detail: "School & sports",
    layout: "tall",
    image: "/gallery/team-hoodies.jpg",
  },
  {
    label: "Vibrant Transfer",
    tone: "from-brand to-amber-500/60",
    icon: "🎨",
    detail: "300 DPI coverage",
    layout: "default",
    image: "/gallery/vibrant-transfer.jpg",
  },
  {
    label: "Bulk Ready",
    tone: "from-brand-dark to-brand-light",
    icon: "📦",
    detail: "25–500+ pieces",
    layout: "wide",
    image: "/gallery/bulk-ready.jpg",
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
