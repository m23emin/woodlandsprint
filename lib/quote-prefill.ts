const QUOTE_PREFILL_KEY = "woodlandsprint-quote-prefill";

export function saveQuotePrefill(data: Record<string, string | number | boolean>) {
  sessionStorage.setItem(QUOTE_PREFILL_KEY, JSON.stringify(data));
}

export function loadQuotePrefill(): Record<string, string | number | boolean> | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(QUOTE_PREFILL_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, string | number | boolean>;
  } catch {
    return null;
  }
}

export function clearQuotePrefill() {
  sessionStorage.removeItem(QUOTE_PREFILL_KEY);
}
