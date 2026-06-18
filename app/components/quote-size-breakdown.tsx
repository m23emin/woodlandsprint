"use client";

export const quoteSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

export type SizeBreakdown = Record<string, number>;

export function emptySizeBreakdown(): SizeBreakdown {
  return Object.fromEntries(quoteSizes.map((s) => [s, 0]));
}

export function sizeBreakdownTotal(sizes: SizeBreakdown) {
  return Object.values(sizes).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

export function formatSizeBreakdown(sizes: SizeBreakdown) {
  const lines = quoteSizes
    .map((size) => {
      const qty = sizes[size] ?? 0;
      return qty > 0 ? `${size}: ${qty}` : null;
    })
    .filter(Boolean);

  if (lines.length === 0) return "";

  const total = sizeBreakdownTotal(sizes);
  return `Size breakdown (${total} total):\n${lines.join(", ")}`;
}

type QuoteSizeBreakdownProps = {
  sizes: SizeBreakdown;
  onChange: (sizes: SizeBreakdown) => void;
};

export function QuoteSizeBreakdown({ sizes, onChange }: QuoteSizeBreakdownProps) {
  const total = sizeBreakdownTotal(sizes);

  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground">Size breakdown</p>
        {total > 0 && (
          <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
            {total} total
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">Optional — enter quantities per size for accurate quoting.</p>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {quoteSizes.map((size) => (
          <label key={size} className="block text-center">
            <span className="mb-1 block text-xs font-semibold text-muted">{size}</span>
            <input
              type="number"
              min={0}
              max={999}
              value={sizes[size] || ""}
              placeholder="0"
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value) || 0);
                onChange({ ...sizes, [size]: val });
              }}
              className="w-full rounded-lg border border-border bg-surface px-1 py-2 text-center text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function showSizeBreakdown(service: string) {
  return ["Custom T-Shirts", "Business Apparel", "Event & Bulk Orders"].includes(service);
}
