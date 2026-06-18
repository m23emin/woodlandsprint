export type CalculatorService = "dtf" | "shirts" | "bulk";

export type PrintLocations = "front" | "front-back" | "full";

export type SheetSize = "standard" | "large";

export type GangSheetSize = {
  id: string;
  label: string;
  dimensions: string;
  sqft: number;
  basePrice: number;
  popular?: boolean;
};

export const gangSheetSizes: GangSheetSize[] = [
  { id: "22x12", label: "Small",    dimensions: '22" × 12"', sqft: 1.83, basePrice: 22 },
  { id: "22x16", label: "Standard", dimensions: '22" × 16"', sqft: 2.44, basePrice: 28, popular: true },
  { id: "22x20", label: "Medium",   dimensions: '22" × 20"', sqft: 3.06, basePrice: 34 },
  { id: "22x24", label: "Large",    dimensions: '22" × 24"', sqft: 3.67, basePrice: 40 },
  { id: "22x36", label: "XL",       dimensions: '22" × 36"', sqft: 5.50, basePrice: 56 },
];

export const gangSheetVolumeBreaks = [
  { minQty: 1,  label: "1–4",   discount: 0 },
  { minQty: 5,  label: "5–9",   discount: 0.10 },
  { minQty: 10, label: "10–24", discount: 0.20 },
  { minQty: 25, label: "25+",   discount: 0.30 },
];

export function gangSheetPrice(sizeId: string, qty: number): number {
  const size = gangSheetSizes.find((s) => s.id === sizeId) ?? gangSheetSizes[1];
  const tier = [...gangSheetVolumeBreaks].reverse().find((b) => qty >= b.minQty)!;
  const price = size.basePrice * (1 - tier.discount);
  return Math.round(price * 100) / 100;
}

export type PriceEstimateInput = {
  service: CalculatorService;
  quantity: number;
  locations?: PrintLocations;
  sheetSize?: SheetSize;
  rush?: boolean;
};

export type PriceEstimate = {
  total: number;
  perUnit: number;
  isCustomQuote: boolean;
  breakdown: string[];
  savingsNote?: string;
};

const locationMultiplier: Record<PrintLocations, number> = {
  front: 1,
  "front-back": 1.4,
  full: 1.65,
};

function dtfUnitPrice(quantity: number, sheetSize: SheetSize): number {
  const sizeId = sheetSize === "large" ? "22x24" : "22x16";
  return gangSheetPrice(sizeId, quantity);
}

function shirtUnitPrice(quantity: number): number {
  if (quantity >= 50) return 14;
  if (quantity >= 24) return 16;
  if (quantity >= 12) return 19;
  return 22;
}

export function calculatePriceEstimate(input: PriceEstimateInput): PriceEstimate {
  const { service, quantity, locations = "front", sheetSize = "standard", rush = false } = input;
  const qty = Math.max(1, Math.min(500, quantity));

  if (service === "bulk" || (service === "shirts" && qty >= 100)) {
    return {
      total: 0,
      perUnit: 0,
      isCustomQuote: true,
      breakdown: ["Large bulk orders get custom pricing — request a quote for the best rate."],
    };
  }

  let perUnit: number;
  const breakdown: string[] = [];

  if (service === "dtf") {
    perUnit = dtfUnitPrice(qty, sheetSize);
    breakdown.push(`${sheetSize === "large" ? "Large" : "Standard"} gang sheet`);
    breakdown.push(`${qty} sheet${qty === 1 ? "" : "s"} × $${perUnit.toFixed(2)}`);
    if (qty >= 5) breakdown.push("Volume discount applied");
  } else {
    const base = shirtUnitPrice(qty);
    perUnit = base * locationMultiplier[locations];
    const locationLabel =
      locations === "front" ? "Front print" : locations === "front-back" ? "Front + back" : "Front + back + sleeve";
    breakdown.push(`${locationLabel} on premium blank`);
    breakdown.push(`${qty} shirt${qty === 1 ? "" : "s"} × $${perUnit.toFixed(2)}`);
    if (qty >= 12) breakdown.push("Bulk discount applied");
  }

  let total = perUnit * qty;

  if (rush) {
    const rushFee = total * 0.2;
    total += rushFee;
    breakdown.push(`Rush fee (+20%): $${rushFee.toFixed(2)}`);
  }

  total = Math.round(total * 100) / 100;
  perUnit = Math.round(perUnit * 100) / 100;

  let savingsNote: string | undefined;
  if (service === "dtf" && qty < 25) {
    savingsNote = `Order 25+ sheets for deeper discounts — ask us for a bulk quote.`;
  } else if (service === "shirts" && qty < 24) {
    savingsNote = `24+ shirts unlock better per-piece pricing.`;
  }

  return {
    total,
    perUnit,
    isCustomQuote: false,
    breakdown,
    savingsNote,
  };
}

export const calculatorServices = [
  { value: "dtf" as const, label: "DTF Gang Sheets" },
  { value: "shirts" as const, label: "Custom T-Shirts" },
  { value: "bulk" as const, label: "Business & Bulk (25+)" },
];

export const calculatorLocationOptions = [
  { value: "front" as const, label: "Front only" },
  { value: "front-back" as const, label: "Front + back" },
  { value: "full" as const, label: "Front + back + sleeve" },
];

export const calculatorSheetSizes = [
  { value: "standard" as const, label: "Standard sheet" },
  { value: "large" as const, label: "Large sheet (+$8 base)" },
];
