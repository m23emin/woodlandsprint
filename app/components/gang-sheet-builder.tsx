"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  gangSheetSizes,
  gangSheetVolumeBreaks,
  gangSheetPrice,
  type GangSheetSize,
} from "@/lib/pricing-calculator";
import { saveQuotePrefill } from "@/lib/quote-prefill";
import { saveCartAttachment } from "@/lib/cart-attachments";
import { useCart } from "@/app/components/cart/cart-provider";
import { GangSheetCanvas, type CanvasHandle } from "./gang-sheet-canvas";

const ACCEPT = "image/png,image/jpeg,image/webp,.pdf";
const MAX_BYTES = 30 * 1024 * 1024;

export function GangSheetBuilder() {
  const [sizeId, setSizeId] = useState("22x16");
  const [qty, setQty] = useState(1);
  const [rush, setRush] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState(0);
  const [cartMsg, setCartMsg] = useState<string | null>(null);
  const canvasRef = useRef<CanvasHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  const selectedSize = gangSheetSizes.find((s) => s.id === sizeId) as GangSheetSize;
  const unitPrice = useMemo(() => gangSheetPrice(sizeId, qty), [sizeId, qty]);
  const rushMultiplier = rush ? 1.2 : 1;
  const total = Math.round(unitPrice * qty * rushMultiplier * 100) / 100;
  const activeTier = [...gangSheetVolumeBreaks].reverse().find((b) => qty >= b.minQty)!;

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      setUploadError(null);
      for (const file of Array.from(files)) {
        if (file.size > MAX_BYTES) {
          setUploadError(`"${file.name}" is too large (max 30 MB).`);
          continue;
        }
        await canvasRef.current?.addImageFile(file);
        setUploadCount((n) => n + 1);
      }
    },
    [],
  );

  function handleGetQuote() {
    const dataUrl = canvasRef.current?.exportPNG();
    const prefill: Record<string, string | number | boolean> = {
      service: "DTF Gang Sheets",
      quantity: String(qty),
      rush,
      estimatedTotal: total,
      gangSheetSize: `${selectedSize.label} (${selectedSize.dimensions})`,
    };

    if (dataUrl) {
      prefill.mockupImage = dataUrl;
      prefill.mockupName = `gang-sheet-${sizeId}-qty${qty}.png`;
    }

    saveQuotePrefill(prefill);
  }

  function handleAddToCart() {
    const attachmentId = crypto.randomUUID();
    const dataUrl = canvasRef.current?.exportPNG();
    if (dataUrl) saveCartAttachment(attachmentId, dataUrl);

    const unitWithRush = Math.round(unitPrice * rushMultiplier * 100) / 100;

    addItem({
      id: crypto.randomUUID(),
      type: "gang-sheet",
      title: `DTF Gang Sheet — ${selectedSize.label}`,
      subtitle: selectedSize.dimensions,
      quantity: qty,
      unitPrice: unitWithRush,
      totalPrice: total,
      meta: { rush: rush ? "yes" : "no", size: sizeId },
      attachmentId: dataUrl ? attachmentId : undefined,
    });

    setCartMsg("Added to cart!");
    setTimeout(() => setCartMsg(null), 2500);
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
      {/* ── Canvas area ── */}
      <div className="flex flex-col gap-4">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto rounded-xl border border-border bg-surface px-3 py-2.5 sm:px-4">
          {/* Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="sr-only"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          <ToolBtn
            icon={<UploadIcon />}
            label="Add design"
            accent
            onClick={() => fileInputRef.current?.click()}
          />

          <div className="h-5 w-px bg-border" />

          <ToolBtn
            icon={<DuplicateIcon />}
            label="Duplicate"
            disabled={!hasSelection}
            onClick={() => canvasRef.current?.duplicateSelected()}
          />
          <ToolBtn
            icon={<FlipIcon />}
            label="Flip H"
            disabled={!hasSelection}
            onClick={() => canvasRef.current?.flipHSelected()}
          />
          <ToolBtn
            icon={<ForwardIcon />}
            label="Bring up"
            disabled={!hasSelection}
            onClick={() => canvasRef.current?.bringForward()}
          />
          <ToolBtn
            icon={<BackwardIcon />}
            label="Send back"
            disabled={!hasSelection}
            onClick={() => canvasRef.current?.sendBackward()}
          />

          <div className="h-5 w-px bg-border" />

          <ToolBtn
            icon={<DeleteIcon />}
            label="Delete"
            danger
            disabled={!hasSelection}
            onClick={() => canvasRef.current?.deleteSelected()}
          />
          <ToolBtn
            icon={<ClearIcon />}
            label="Clear all"
            danger
            disabled={uploadCount === 0}
            onClick={() => { canvasRef.current?.clearAll(); setUploadCount(0); }}
          />
        </div>

        {uploadError && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{uploadError}</p>
        )}

        {/* Drop zone overlay */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
          }}
          className="relative -mx-1 overflow-x-auto sm:mx-0"
        >
          <GangSheetCanvas
            ref={canvasRef}
            sheetSize={selectedSize}
            onSelectionChange={setHasSelection}
          />

          {uploadCount === 0 && (
            <div
              className="pointer-events-none absolute inset-4 flex items-center justify-center rounded-xl"
              aria-hidden
            >
              <div className="rounded-2xl border-2 border-dashed border-brand/30 bg-white/60 px-8 py-6 text-center backdrop-blur-sm">
                <p className="text-sm font-medium text-brand">Drop your designs here</p>
                <p className="mt-1 text-xs text-muted">or click "Add design" in the toolbar</p>
                <p className="mt-1 text-xs text-muted">PNG, JPG, WebP — max 30 MB each</p>
              </div>
            </div>
          )}
        </div>

        {/* Size selector (below canvas for context) */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Sheet size</p>
          <div className="flex flex-wrap gap-2">
            {gangSheetSizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSizeId(s.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  sizeId === s.id
                    ? "border-brand bg-brand/5 font-semibold text-brand ring-2 ring-brand/20"
                    : "border-border bg-surface text-muted hover:border-brand/30 hover:text-foreground"
                }`}
              >
                <span>{s.label}</span>
                <span className="text-xs opacity-70">{s.dimensions}</span>
                {s.popular && (
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold text-foreground">
                    ★
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right sidebar: order summary ── */}
      <aside className="space-y-5">
        {/* Quantity + discount */}
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="mb-3 text-sm font-medium text-foreground">Quantity</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold text-foreground transition hover:border-brand hover:text-brand"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={500}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded-xl border border-border bg-background px-3 py-2 text-center text-sm font-semibold text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold text-foreground transition hover:border-brand hover:text-brand"
            >
              +
            </button>
            <span className="text-sm text-muted">sheets</span>
          </div>

          {/* Discount ladder */}
          <div className="mt-3 space-y-1.5">
            {gangSheetVolumeBreaks.map((b) => (
              <div
                key={b.minQty}
                className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs ${
                  activeTier.minQty >= b.minQty
                    ? "bg-brand/10 font-semibold text-brand"
                    : "bg-background text-muted"
                }`}
              >
                <span>{b.minQty === 1 ? "1–4 sheets" : b.label + " sheets"}</span>
                <span>{b.discount === 0 ? "Base price" : `-${b.discount * 100}%`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rush */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
          <input
            type="checkbox"
            checked={rush}
            onChange={(e) => setRush(e.target.checked)}
            className="h-4 w-4 rounded accent-brand"
          />
          <div>
            <p className="text-sm font-medium text-foreground">Rush turnaround</p>
            <p className="text-xs text-muted">Same/next-day production +20%</p>
          </div>
        </label>

        {/* Price summary */}
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Order estimate</p>
          <div className="mt-3 space-y-2 border-b border-border pb-3 text-sm">
            <SummaryRow label={selectedSize.label + " " + selectedSize.dimensions} value={"$" + unitPrice.toFixed(2) + " each"} />
            <SummaryRow label={qty + " sheet" + (qty !== 1 ? "s" : "")} value={"×"} small />
            {activeTier.discount > 0 && (
              <SummaryRow label={"Volume discount"} value={"-" + activeTier.discount * 100 + "%"} highlight />
            )}
            {rush && <SummaryRow label="Rush fee" value="+20%" />}
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm text-muted">Total estimate</span>
            <span className="font-display text-3xl font-bold text-brand">${total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs text-muted">Final price confirmed in your quote.</p>

          {activeTier.discount === 0 && qty < 5 && (
            <p className="mt-3 rounded-lg bg-brand/10 px-3 py-2 text-xs text-brand">
              Order 5+ sheets for 10% off — 25+ for 30% off.
            </p>
          )}

          {cartMsg && (
            <p className="rounded-lg bg-brand/10 px-3 py-2 text-center text-xs font-semibold text-brand">{cartMsg}</p>
          )}

          <Link
            href="/#quote"
            onClick={handleGetQuote}
            className="flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
          >
            Get Exact Quote →
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-brand/30 hover:bg-brand/5"
          >
            Add to Cart
          </button>
          <Link
            href="/cart"
            className="block text-center text-xs font-medium text-brand hover:underline"
          >
            View cart →
          </Link>
        </div>

        {/* Trust */}
        <ul className="space-y-2.5">
          {[
            "No minimums — 1 sheet or 500",
            "Artwork check before production",
            "Local pickup · North Houston",
            "Same-day orders before noon (CT)",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-xs text-muted">
              <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

/* ── Small helpers ── */

function SummaryRow({
  label, value, highlight, small,
}: { label: string; value: string; highlight?: boolean; small?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={small ? "text-xs text-muted" : "text-muted"}>{label}</span>
      <span className={highlight ? "font-semibold text-brand" : "font-medium text-foreground"}>{value}</span>
    </div>
  );
}

function ToolBtn({
  icon, label, onClick, disabled, accent, danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  accent?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
        accent
          ? "bg-accent text-foreground hover:bg-accent-hover"
          : danger
          ? "text-red-600 hover:bg-red-50"
          : "text-foreground hover:bg-brand/5"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ── Icons ── */
const UploadIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const DuplicateIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const FlipIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
const ForwardIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);
const BackwardIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const DeleteIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const ClearIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
