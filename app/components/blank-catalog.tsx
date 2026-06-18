"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  blankProducts,
  categoryLabels,
  hexForColor,
  isLightSwatch,
  productMinRetail,
  blankRetail,
  type BlankCategory,
  type BlankProduct,
} from "@/lib/blank-catalog";
import { saveQuotePrefill } from "@/lib/quote-prefill";
import { useCart } from "@/app/components/cart/cart-provider";

const categories = Object.keys(categoryLabels) as BlankCategory[];

/** Image with a graceful placeholder until real brand photos are added */
function BlankImage({ product, sizes }: { product: BlankProduct; sizes: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <svg className="h-16 w-16 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 2v5h-3v9H7v-9H4V6l4-2 2 2h4l2-2z" />
        </svg>
        <span className="text-xs font-medium text-zinc-400">{product.brand}</span>
      </div>
    );
  }

  return (
    <Image
      src={product.image}
      alt={`${product.brand} ${product.name}`}
      fill
      className="object-cover transition duration-500 group-hover:scale-105"
      sizes={sizes}
      onError={() => setErrored(true)}
    />
  );
}

export function BlankCatalog() {
  const [activeCat, setActiveCat] = useState<BlankCategory | "all">("all");
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [selected, setSelected] = useState<BlankProduct | null>(null);

  const brands = useMemo(() => {
    const pool = activeCat === "all" ? blankProducts : blankProducts.filter((p) => p.category === activeCat);
    return ["all", ...Array.from(new Set(pool.map((p) => p.brand)))];
  }, [activeCat]);

  const products = useMemo(
    () =>
      blankProducts.filter(
        (p) =>
          (activeCat === "all" || p.category === activeCat) &&
          (activeBrand === "all" || p.brand === activeBrand),
      ),
    [activeCat, activeBrand],
  );

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={activeCat === "all"} onClick={() => { setActiveCat("all"); setActiveBrand("all"); }}>
          All products
        </FilterChip>
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            active={activeCat === cat}
            onClick={() => { setActiveCat(cat); setActiveBrand("all"); }}
          >
            {categoryLabels[cat]}
          </FilterChip>
        ))}
      </div>

      {/* Brand filter */}
      {brands.length > 2 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                activeBrand === b
                  ? "bg-brand text-white"
                  : "bg-surface text-muted border border-border hover:border-brand/30 hover:text-foreground"
              }`}
            >
              {b === "all" ? "All brands" : b}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={() => setSelected(product)} />
        ))}
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProductCard({ product, onOpen }: { product: BlankProduct; onOpen: () => void }) {
  const fromPrice = productMinRetail(product);
  const swatches = product.colors.slice(0, 10);
  const extra = product.colors.length - swatches.length;

  return (
    <button
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm transition hover:border-brand/30 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <BlankImage product={product} sizes="(max-width: 640px) 100vw, 33vw" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-dark shadow-sm">
          {product.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display font-semibold text-foreground">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{product.blurb}</p>

        {/* swatches */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {swatches.map((c) => (
            <span
              key={c}
              title={c}
              className={`h-4 w-4 rounded-full ${isLightSwatch(c) ? "ring-1 ring-border" : ""}`}
              style={{ backgroundColor: hexForColor(c) }}
            />
          ))}
          {extra > 0 && <span className="text-xs text-muted">+{extra}</span>}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm text-muted">
            from <span className="font-display text-lg font-bold text-brand">${fromPrice.toFixed(2)}</span>
          </span>
          <span className="text-xs font-semibold text-brand transition group-hover:underline">View →</span>
        </div>
      </div>
    </button>
  );
}

function ProductModal({ product, onClose }: { product: BlankProduct; onClose: () => void }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(12);
  const [size, setSize] = useState(product.sizes[0]?.size ?? "M");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [cartMsg, setCartMsg] = useState<string | null>(null);

  const sizeCost = product.sizes.find((s) => s.size === size)?.cost ?? product.sizes[0]?.cost ?? 0;
  const unitPrice = blankRetail(sizeCost);

  function handleQuote() {
    saveQuotePrefill({
      service: "Custom T-Shirts",
      quantity: String(qty),
      blank: `${product.brand} ${product.name} — ${color}, ${size}`,
    });
  }

  function handleAddToCart() {
    addItem({
      id: crypto.randomUUID(),
      type: "blank",
      title: `${product.brand} ${product.name}`,
      subtitle: `${color} · size ${size}`,
      quantity: qty,
      unitPrice,
      totalPrice: Math.round(unitPrice * qty * 100) / 100,
      meta: { productId: product.id, color, size },
    });
    setCartMsg("Added to cart!");
    setTimeout(() => setCartMsg(null), 2500);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-dark shadow transition hover:bg-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="group relative aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 sm:aspect-auto">
            <BlankImage product={product} sizes="(max-width: 640px) 100vw, 50vw" />
          </div>

          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">{product.brand}</p>
            <h3 className="font-display mt-1 text-2xl font-bold text-foreground">{product.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{product.blurb}</p>

            {/* Size pricing */}
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Pricing by size</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <span key={s.size} className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs">
                  <span className="font-medium text-foreground">{s.size}</span>{" "}
                  <span className="text-brand font-semibold">${blankRetail(s.cost).toFixed(2)}</span>
                </span>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-muted">Blank price. DTF print added at quote — bulk discounts apply.</p>

            {/* Colors */}
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">
              {product.colors.length} colors
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  onClick={() => setColor(c)}
                  className={`h-6 w-6 rounded-full transition ${color === c ? "ring-2 ring-brand ring-offset-2" : ""} ${isLightSwatch(c) ? "ring-1 ring-border" : ""}`}
                  style={{ backgroundColor: hexForColor(c) }}
                />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="mb-1 block text-xs font-medium text-muted">Size</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
                >
                  {product.sizes.map((s) => (
                    <option key={s.size} value={s.size}>
                      {s.size} — ${blankRetail(s.cost).toFixed(2)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-xs font-medium text-muted">Quantity</span>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </label>
            </div>

            {cartMsg && (
              <p className="mt-4 rounded-lg bg-brand/10 px-3 py-2 text-center text-xs font-semibold text-brand">{cartMsg}</p>
            )}

            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-xl border border-brand bg-brand/5 px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand/10"
              >
                Add to Cart
              </button>
              <Link
                href="/#quote"
                onClick={handleQuote}
                className="flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
              >
                Get a Quote for This Blank →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-brand text-white shadow-sm"
          : "bg-surface text-muted border border-border hover:border-brand/30 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
