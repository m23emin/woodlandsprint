const PREFIX = "woodlandsprint-cart-file-";

export function saveCartAttachment(itemId: string, dataUrl: string) {
  try {
    sessionStorage.setItem(`${PREFIX}${itemId}`, dataUrl);
  } catch {
    /* quota exceeded — cart works without preview attachment */
  }
}

export function getCartAttachment(itemId: string) {
  return sessionStorage.getItem(`${PREFIX}${itemId}`);
}

export function removeCartAttachment(itemId: string) {
  sessionStorage.removeItem(`${PREFIX}${itemId}`);
}

export function getFirstCartAttachment(items: { attachmentId?: string }[]) {
  for (const item of items) {
    if (!item.attachmentId) continue;
    const data = getCartAttachment(item.attachmentId);
    if (data) return { dataUrl: data, name: `cart-${item.attachmentId.slice(0, 8)}.png` };
  }
  return null;
}
