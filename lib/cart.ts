export type CartItemType = "gang-sheet" | "blank" | "custom";

export type CartItem = {
  id: string;
  type: CartItemType;
  title: string;
  subtitle?: string;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  /** Extra fields for quote notes (size, color, rush, etc.) */
  meta?: Record<string, string | number | boolean>;
  /** sessionStorage key for layout/mockup PNG */
  attachmentId?: string;
};

const CART_KEY = "woodlandsprint-cart";
export const CART_UPDATED_EVENT = "woodlandsprint-cart-updated";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + (item.totalPrice ?? item.unitPrice ?? 0) * (item.totalPrice ? 1 : item.quantity), 0);
}

/** When totalPrice is set per line, use it directly; else unitPrice × qty */
export function getLineTotal(item: CartItem) {
  if (item.totalPrice != null) return item.totalPrice;
  if (item.unitPrice != null) return item.unitPrice * item.quantity;
  return null;
}

export function formatCartForQuote(items: CartItem[]) {
  const lines = items.map((item, index) => {
    const total = getLineTotal(item);
    const price = total != null ? ` — est. $${total.toFixed(2)}` : "";
    const meta = item.meta
      ? Object.entries(item.meta)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ")
      : "";
    return `${index + 1}. ${item.title}${item.subtitle ? ` (${item.subtitle})` : ""} × ${item.quantity}${price}${meta ? ` [${meta}]` : ""}`;
  });

  const gangCount = items.filter((i) => i.type === "gang-sheet").length;
  const blankCount = items.filter((i) => i.type === "blank").length;

  let service = "Not Sure Yet";
  if (gangCount && !blankCount) service = "DTF Gang Sheets";
  else if (blankCount && !gangCount) service = "Custom T-Shirts";
  else if (items.length) service = "Custom T-Shirts";

  const totalQty = getCartCount(items);
  const subtotal = items.reduce((sum, item) => {
    const line = getLineTotal(item);
    return sum + (line ?? 0);
  }, 0);

  return {
    service,
    quantity: `${totalQty} item${totalQty !== 1 ? "s" : ""} in cart`,
    notes: [`Cart order (${items.length} line${items.length !== 1 ? "s" : ""}):`, ...lines, subtotal > 0 ? `\nEstimated subtotal: ~$${subtotal.toFixed(2)} (print & blanks — final quote may vary)` : ""].join("\n"),
  };
}
