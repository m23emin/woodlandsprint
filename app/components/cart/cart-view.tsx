"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCart } from "@/app/components/cart/cart-provider";
import { getFirstCartAttachment } from "@/lib/cart-attachments";
import { formatCartForQuote, getLineTotal } from "@/lib/cart";
import { saveQuotePrefill } from "@/lib/quote-prefill";

export function CartView() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (getLineTotal(item) ?? 0), 0),
    [items],
  );

  function handleQuote() {
    const { service, quantity, notes } = formatCartForQuote(items);
    const attachment = getFirstCartAttachment(items);
    saveQuotePrefill({
      service,
      quantity,
      notes,
      ...(attachment ? { mockupImage: attachment.dataUrl, mockupName: attachment.name } : {}),
    });
    router.push("/#quote");
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
        <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
        <p className="mt-2 text-sm text-muted">Add gang sheets, blanks, or other items to build an order.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/gang-sheet" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light">
            Gang Sheet Builder
          </Link>
          <Link href="/blanks" className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand/30">
            Apparel Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="space-y-4">
        {items.map((item) => {
          const lineTotal = getLineTotal(item);
          return (
            <li key={item.id} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{item.type.replace("-", " ")}</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-foreground">{item.title}</h2>
                  {item.subtitle && <p className="mt-1 text-sm text-muted">{item.subtitle}</p>}
                </div>
                {lineTotal != null && (
                  <p className="font-display text-xl font-bold text-brand">${lineTotal.toFixed(2)}</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Qty</span>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                    className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-center text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="h-fit space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Order summary</p>
        <p className="text-sm text-muted">{items.length} line item{items.length !== 1 ? "s" : ""}</p>
        {subtotal > 0 && (
          <div className="flex items-baseline justify-between border-t border-border pt-3">
            <span className="text-sm text-muted">Estimated subtotal</span>
            <span className="font-display text-2xl font-bold text-brand">${subtotal.toFixed(2)}</span>
          </div>
        )}
        <p className="text-xs text-muted">Final pricing confirmed in your quote. Print fees may apply.</p>

        <button
          type="button"
          onClick={handleQuote}
          className="w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-accent-hover"
        >
          Request Quote for Cart →
        </button>
        <button
          type="button"
          onClick={clearCart}
          className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted transition hover:border-red-200 hover:text-red-600"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}
