/**
 * Blank apparel catalog — cost data from supplier sheet.
 *
 * PRICING MODEL
 * -------------
 * Costs below are OUR cost per blank (what we pay the supplier).
 * Customer-facing price = cost × markup, rounded up to `roundTo`.
 * DTF / print cost is added separately at quote time.
 *
 * To change margin across the whole site, edit `blankConfig` only.
 */

export const blankConfig = {
  markup: 2.0, // retail blank price = cost × markup
  roundTo: 0.5, // round retail up to nearest $0.50
};

export function blankRetail(cost: number): number {
  const raw = cost * blankConfig.markup;
  return Math.ceil(raw / blankConfig.roundTo) * blankConfig.roundTo;
}

/* ── Color swatches (approx. brand colors for on-screen swatches) ── */
export const colorHex: Record<string, string> = {
  "Ash Grey": "#b9bdb6",
  Asphalt: "#3b3e42",
  Autumn: "#a0522d",
  Black: "#1a1a1a",
  Blossom: "#f2b9c4",
  "Blue Jean": "#6f8faf",
  "Burnt Orange": "#bf5a16",
  Cancun: "#57b4c9",
  Chambray: "#9aa9c4",
  Chili: "#9e3b2e",
  Citron: "#9aa61f",
  "Coyote Brown": "#81613c",
  Crimson: "#9e1b32",
  Crunchberry: "#d14d8b",
  "Dark Grey": "#3f3f46",
  "Dusty Blue": "#6e8ca3",
  Espresso: "#4b3621",
  Evergreen: "#1b4d3e",
  "Forest Green": "#2e4d34",
  Gold: "#d4af37",
  "Heather Dark Grey": "#4b4f54",
  "Heather Deep Teal": "#2e6e6e",
  "Heather Ice Blue": "#c5d8e8",
  "Heather Maroon": "#6e2a35",
  "Heather Mauve": "#9b7a83",
  "Heather Natural": "#ece5d3",
  "Heather Navy": "#36405a",
  "Heather Peach": "#e8b89b",
  "Heather Tan": "#b89c82",
  "Heather Yellow Gold": "#d6b653",
  Indigo: "#3f4e8c",
  "Irish Green": "#00a94f",
  Ivory: "#f6f0df",
  Kelly: "#009e60",
  "Light Blue": "#aed3e6",
  "Light Cream / Natural": "#f0e6d2",
  "Light Cream": "#f0e6d2",
  "Light Green": "#b5d6a7",
  Lilac: "#c8a2c8",
  Maroon: "#6e2a35",
  "Military Green": "#4b5320",
  Mint: "#aef0c8",
  Mustard: "#e1ad01",
  Natural: "#f0e6d2",
  Navy: "#1f2a44",
  "Neon Pink": "#ff5ca8",
  Orange: "#f5731f",
  Orchid: "#b76ba3",
  Pepper: "#5c5c52",
  Pink: "#f7c5cf",
  Red: "#c0202c",
  Royal: "#1d3aa8",
  Rust: "#b7410e",
  Sand: "#d8c9a8",
  "Soft Cream": "#f5ecd7",
  "Sport Grey / Athletic Heather": "#b3b3b3",
  "True Royal Blue": "#1d3aa8",
  White: "#ffffff",
  Yam: "#e08a1e",
  Yellow: "#ffd400",
};

export function hexForColor(name: string): string {
  return colorHex[name] ?? "#cccccc";
}

/** Light swatches need a visible border on white UI */
export function isLightSwatch(name: string): boolean {
  const light = [
    "White",
    "Ivory",
    "Light Cream / Natural",
    "Light Cream",
    "Natural",
    "Soft Cream",
    "Heather Natural",
    "Heather Ice Blue",
    "Heather Peach",
    "Mint",
    "Light Green",
    "Light Blue",
    "Pink",
    "Blossom",
    "Yellow",
    "Gold",
    "Heather Yellow Gold",
    "Ash Grey",
    "Sport Grey / Athletic Heather",
    "Sand",
    "Heather Tan",
  ];
  return light.includes(name);
}

export type BlankCategory =
  | "tshirt"
  | "longsleeve"
  | "sweatshirt"
  | "hoodie"
  | "tank"
  | "onesie";

export type SizePrice = { size: string; cost: number };

export type BlankProduct = {
  id: string;
  brand: string;
  name: string;
  category: BlankCategory;
  /** Product photo — drop brand image at this path (see public/blanks/README) */
  image: string;
  /** Representative size run + our cost */
  sizes: SizePrice[];
  /** Available color names (keys of colorHex) */
  colors: string[];
  blurb: string;
};

/* helper to build a size run quickly */
const run = (entries: [string, number][]): SizePrice[] =>
  entries.map(([size, cost]) => ({ size, cost }));

const TEE_COLORS = [
  "Ash Grey", "Asphalt", "Autumn", "Black", "Burnt Orange", "Citron",
  "Dusty Blue", "Evergreen", "Forest Green", "Gold", "Heather Dark Grey",
  "Heather Ice Blue", "Heather Maroon", "Heather Mauve", "Heather Peach",
  "Heather Tan", "Heather Yellow Gold", "Kelly", "Light Blue",
  "Light Cream / Natural", "Lilac", "Military Green", "Mint", "Mustard",
  "Navy", "Orange", "Pink", "Red", "Rust", "Soft Cream",
  "Sport Grey / Athletic Heather", "White", "Yellow",
];

const FLEECE_COLORS = [
  "Ash Grey", "Black", "Burnt Orange", "Forest Green", "Heather Dark Grey",
  "Heather Natural", "Indigo", "Irish Green", "Light Blue",
  "Light Cream / Natural", "Maroon", "Military Green", "Navy", "Orange",
  "Pink", "Red", "Sand", "Sport Grey / Athletic Heather", "True Royal Blue",
  "White",
];

const LONGSLEEVE_COLORS = [
  "Ash Grey", "Black", "Light Cream / Natural", "Heather Natural", "Pink",
  "Red", "Sport Grey / Athletic Heather", "White",
];

const TANK_COLORS = [
  "Black", "Blossom", "Blue Jean", "Cancun", "Chambray", "Crimson",
  "Dark Grey", "Ivory", "Light Cream", "Lilac", "Mint", "Neon Pink",
  "Orange", "Pepper", "Pink", "Red", "Royal", "Sport Grey / Athletic Heather",
  "White",
];

const COMFORT_COLORS = [
  "Black", "Blossom", "Blue Jean", "Burnt Orange", "Chambray", "Chili",
  "Crunchberry", "Espresso", "Ivory", "Light Green", "Neon Pink", "Orchid",
  "Pepper", "White", "Yam",
];

const GENERIC_COLORS = [
  "Ash Grey", "Black", "Heather Dark Grey", "Heather Deep Teal",
  "Heather Maroon", "Heather Mauve", "Heather Navy", "Heather Peach", "Kelly",
  "Light Blue", "Light Cream / Natural", "Navy", "Orange", "Pink", "Red",
  "Sport Grey / Athletic Heather", "White",
];

export const blankProducts: BlankProduct[] = [
  /* ── Bella Canvas / Rabbit Skins — T-Shirts (page 1) ── */
  {
    id: "bc-adult-tee",
    brand: "Bella Canvas",
    name: "Adult Unisex T-Shirt",
    category: "tshirt",
    image: "/blanks/bella-canvas/adult-tee.jpg",
    sizes: run([["XS", 8.5], ["S", 8.5], ["M", 8.5], ["L", 8.5], ["XL", 8.5], ["2XL", 9.5], ["3XL", 10.5], ["4XL", 11.5]]),
    colors: TEE_COLORS,
    blurb: "Soft, retail-fit unisex tee — our most popular blank for everyday prints.",
  },
  {
    id: "rs-youth-tee",
    brand: "Rabbit Skins",
    name: "Youth T-Shirt",
    category: "tshirt",
    image: "/blanks/rabbit-skins/youth-tee.jpg",
    sizes: run([["YS", 8], ["YM", 8], ["YL", 8], ["YXL", 8]]),
    colors: TEE_COLORS,
    blurb: "Lightweight youth tee for school, team, and family prints.",
  },
  {
    id: "rs-toddler-tee",
    brand: "Rabbit Skins",
    name: "Toddler T-Shirt",
    category: "tshirt",
    image: "/blanks/rabbit-skins/toddler-tee.jpg",
    sizes: run([["2T", 7.5], ["3T", 7.5], ["4T", 7.5], ["5T", 7.5]]),
    colors: TEE_COLORS,
    blurb: "Durable toddler tee in a wide color range.",
  },
  {
    id: "rs-baby-onesie",
    brand: "Rabbit Skins",
    name: "Baby Onesie",
    category: "onesie",
    image: "/blanks/rabbit-skins/baby-onesie.jpg",
    sizes: run([["NB", 8.5], ["6M", 8.5], ["12M", 8.5], ["18M", 8.5], ["24M", 8.5]]),
    colors: TEE_COLORS,
    blurb: "Snap-bottom infant bodysuit — perfect for announcements and gifts.",
  },

  /* ── Gildan — Fleece (page 2) ── */
  {
    id: "gildan-sweatshirt",
    brand: "Gildan",
    name: "Adult Crewneck Sweatshirt",
    category: "sweatshirt",
    image: "/blanks/gildan/adult-sweatshirt.jpg",
    sizes: run([["S", 11], ["M", 11], ["L", 11], ["XL", 11], ["2XL", 14], ["3XL", 15], ["4XL", 16]]),
    colors: FLEECE_COLORS,
    blurb: "Classic heavy-blend crewneck — warm, durable, and budget-friendly.",
  },
  {
    id: "gildan-hoodie",
    brand: "Gildan",
    name: "Adult Pullover Hoodie",
    category: "hoodie",
    image: "/blanks/gildan/adult-hoodie.jpg",
    sizes: run([["S", 14.5], ["M", 14.5], ["L", 14.5], ["XL", 14.5], ["2XL", 18], ["3XL", 19]]),
    colors: FLEECE_COLORS,
    blurb: "Cozy fleece hoodie with front pouch pocket — a year-round seller.",
  },
  {
    id: "gildan-youth-sweatshirt",
    brand: "Gildan",
    name: "Youth Sweatshirt",
    category: "sweatshirt",
    image: "/blanks/gildan/youth-sweatshirt.jpg",
    sizes: run([["YXS", 11], ["YS", 11], ["YM", 11], ["YL", 11], ["YXL", 11]]),
    colors: FLEECE_COLORS,
    blurb: "Warm youth crewneck for school spirit and team wear.",
  },

  /* ── Bella Canvas — Long Sleeve (page 3) ── */
  {
    id: "bc-long-sleeve",
    brand: "Bella Canvas",
    name: "Adult Long Sleeve Tee",
    category: "longsleeve",
    image: "/blanks/bella-canvas/long-sleeve.jpg",
    sizes: run([["XS", 12.5], ["S", 12.5], ["M", 12.5], ["L", 12.5], ["XL", 12.5], ["2XL", 14.5], ["3XL", 15.5]]),
    colors: LONGSLEEVE_COLORS,
    blurb: "Soft long-sleeve tee for cooler weather and layered looks.",
  },
  {
    id: "bc-youth-long-sleeve",
    brand: "Bella Canvas",
    name: "Youth Long Sleeve Tee",
    category: "longsleeve",
    image: "/blanks/bella-canvas/youth-long-sleeve.jpg",
    sizes: run([["YS", 10], ["YM", 10], ["YL", 10]]),
    colors: LONGSLEEVE_COLORS,
    blurb: "Comfortable youth long sleeve in core colors.",
  },

  /* ── Next Level / Bella Canvas — Tanks (page 4) ── */
  {
    id: "nl-racerback-tank",
    brand: "Next Level",
    name: "Adult Racerback Tank",
    category: "tank",
    image: "/blanks/next-level/racerback-tank.jpg",
    sizes: run([["XS", 8], ["S", 8], ["M", 8], ["L", 8], ["XL", 8], ["2XL", 9]]),
    colors: TANK_COLORS,
    blurb: "Flattering racerback tank — popular for fitness and summer events.",
  },
  {
    id: "bc-jersey-tank",
    brand: "Bella Canvas",
    name: "Adult Jersey Tank",
    category: "tank",
    image: "/blanks/bella-canvas/jersey-tank.jpg",
    sizes: run([["XS", 9], ["S", 9], ["M", 9], ["L", 9], ["XL", 9], ["2XL", 11]]),
    colors: TANK_COLORS,
    blurb: "Relaxed unisex jersey tank with a soft drape.",
  },
  {
    id: "bc-tank-9360",
    brand: "Bella Canvas",
    name: "Tank 9360",
    category: "tank",
    image: "/blanks/bella-canvas/tank-9360.jpg",
    sizes: run([["XS", 11], ["S", 11], ["M", 11], ["L", 11], ["XL", 11], ["2XL", 13]]),
    colors: TANK_COLORS,
    blurb: "Premium flowy tank with a longer body and side seams.",
  },

  /* ── Comfort Colors (page 5) ── */
  {
    id: "cc-tee",
    brand: "Comfort Colors",
    name: "Garment-Dyed Adult Tee",
    category: "tshirt",
    image: "/blanks/comfort-colors/adult-tee.jpg",
    sizes: run([["S", 10], ["M", 10], ["L", 10], ["XL", 10], ["2XL", 12], ["3XL", 14.5], ["4XL", 15]]),
    colors: COMFORT_COLORS,
    blurb: "Heavyweight garment-dyed tee with a vintage, lived-in feel.",
  },
  {
    id: "cc-long-sleeve",
    brand: "Comfort Colors",
    name: "Garment-Dyed Long Sleeve",
    category: "longsleeve",
    image: "/blanks/comfort-colors/long-sleeve.jpg",
    sizes: run([["S", 15], ["M", 15], ["L", 15], ["XL", 15], ["2XL", 17.5], ["3XL", 19.5]]),
    colors: COMFORT_COLORS,
    blurb: "Premium garment-dyed long sleeve — rich color, soft hand.",
  },
  {
    id: "cc-sweatshirt",
    brand: "Comfort Colors",
    name: "Garment-Dyed Sweatshirt",
    category: "sweatshirt",
    image: "/blanks/comfort-colors/sweatshirt.jpg",
    sizes: run([["S", 25], ["M", 25], ["L", 25], ["XL", 25], ["2XL", 29], ["3XL", 32]]),
    colors: COMFORT_COLORS,
    blurb: "Top-tier garment-dyed crewneck — premium weight and color depth.",
  },

  /* ── Generic — value line (page 6) ── */
  {
    id: "generic-tee",
    brand: "Value",
    name: "Adult Unisex Tee (Value)",
    category: "tshirt",
    image: "/blanks/value/adult-tee.jpg",
    sizes: run([["S", 6.5], ["M", 6.5], ["L", 6.5], ["XL", 6.5], ["2XL", 7.5], ["3XL", 8.5], ["4XL", 10]]),
    colors: GENERIC_COLORS,
    blurb: "Budget-friendly tee for high-volume runs and giveaways.",
  },
  {
    id: "generic-long-sleeve",
    brand: "Value",
    name: "Adult Long Sleeve (Value)",
    category: "longsleeve",
    image: "/blanks/value/long-sleeve.jpg",
    sizes: run([["S", 9.5], ["M", 9.5], ["L", 9.5], ["XL", 9.5], ["2XL", 10.5], ["3XL", 11.5]]),
    colors: GENERIC_COLORS,
    blurb: "Affordable long sleeve for bulk and event orders.",
  },
  {
    id: "generic-baby-bodysuit",
    brand: "Value",
    name: "Baby Bodysuit (Value)",
    category: "onesie",
    image: "/blanks/value/baby-bodysuit.jpg",
    sizes: run([["0-6M", 6.25], ["6-12M", 6.25], ["12-18M", 6.25], ["18-24M", 6.25]]),
    colors: GENERIC_COLORS,
    blurb: "Economical infant bodysuit for gifts and bulk orders.",
  },
];

export const categoryLabels: Record<BlankCategory, string> = {
  tshirt: "T-Shirts",
  longsleeve: "Long Sleeve",
  sweatshirt: "Sweatshirts",
  hoodie: "Hoodies",
  tank: "Tank Tops",
  onesie: "Baby & Onesies",
};

export function productMinRetail(product: BlankProduct): number {
  const minCost = Math.min(...product.sizes.map((s) => s.cost));
  return blankRetail(minCost);
}

export function allBrands(): string[] {
  return Array.from(new Set(blankProducts.map((p) => p.brand)));
}
