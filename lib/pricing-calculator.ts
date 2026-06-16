export type CalculatorService = "dtf" | "shirts" | "bulk";

export type PrintLocations = "front" | "front-back" | "full";

export type SheetSize = "standard" | "large";

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
  const base = sheetSize === "large" ? 36 : 28;
  if (quantity >= 25) return base * 0.68;
  if (quantity >= 10) return base * 0.79;
  if (quantity >= 5) return base * 0.89;
  return base;
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
