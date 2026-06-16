"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculatePriceEstimate,
  calculatorLocationOptions,
  calculatorServices,
  calculatorSheetSizes,
  type CalculatorService,
  type PrintLocations,
  type SheetSize,
} from "@/lib/pricing-calculator";
import { saveQuotePrefill } from "@/lib/quote-prefill";

export function PriceCalculator() {
  const [service, setService] = useState<CalculatorService>("shirts");
  const [quantity, setQuantity] = useState(24);
  const [locations, setLocations] = useState<PrintLocations>("front");
  const [sheetSize, setSheetSize] = useState<SheetSize>("standard");
  const [rush, setRush] = useState(false);

  const estimate = useMemo(
    () => calculatePriceEstimate({ service, quantity, locations, sheetSize, rush }),
    [service, quantity, locations, sheetSize, rush],
  );

  const maxQty = service === "dtf" ? 100 : service === "bulk" ? 500 : 99;

  function handleGetQuote() {
    const serviceLabel =
      service === "dtf" ? "DTF Gang Sheets" : service === "shirts" ? "Custom T-Shirts" : "Business Apparel";
    saveQuotePrefill({
      service: serviceLabel,
      quantity: String(quantity),
      rush,
      estimatedTotal: estimate.isCustomQuote ? 0 : estimate.total,
    });
  }

  return (
    <div id="calculator" className="mt-12 rounded-2xl border border-brand/20 bg-surface p-6 shadow-lg shadow-brand/5 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">Instant Estimate</p>
        <h3 className="font-display mt-1 text-2xl font-bold text-foreground">Price Calculator</h3>
        <p className="mt-2 text-sm text-muted">
          Ballpark pricing for planning — final quote may vary by blank, artwork, and deadline.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Field label="Service type">
            <select
              value={service}
              onChange={(e) => {
                const next = e.target.value as CalculatorService;
                setService(next);
                if (next === "bulk") setQuantity(50);
                else if (next === "dtf") setQuantity(10);
                else setQuantity(24);
              }}
              className={inputClass}
            >
              {calculatorServices.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label={`Quantity: ${quantity}`}>
            <input
              type="range"
              min={1}
              max={maxQty}
              value={Math.min(quantity, maxQty)}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <div className="mt-2 flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={500}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className={`${inputClass} max-w-[120px]`}
              />
              <span className="text-xs text-muted">
                {service === "dtf" ? "sheets" : service === "bulk" ? "pieces (25+)" : "shirts"}
              </span>
            </div>
          </Field>

          {service === "shirts" && (
            <Field label="Print locations">
              <select
                value={locations}
                onChange={(e) => setLocations(e.target.value as PrintLocations)}
                className={inputClass}
              >
                {calculatorLocationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {service === "dtf" && (
            <Field label="Sheet size">
              <select
                value={sheetSize}
                onChange={(e) => setSheetSize(e.target.value as SheetSize)}
                className={inputClass}
              >
                {calculatorSheetSizes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
            <input
              type="checkbox"
              checked={rush}
              onChange={(e) => setRush(e.target.checked)}
              className="h-4 w-4 rounded border-border text-brand accent-brand"
            />
            <span className="text-sm text-foreground">Rush turnaround (+20%)</span>
          </label>
        </div>

        <div className="flex flex-col rounded-2xl border border-border bg-background p-6">
          {estimate.isCustomQuote ? (
            <>
              <p className="font-display text-xl font-bold text-foreground">Custom quote recommended</p>
              <p className="mt-2 text-sm text-muted">{estimate.breakdown[0]}</p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Estimated total</p>
              <p className="font-display mt-1 text-4xl font-bold text-brand">${estimate.total.toFixed(2)}</p>
              <p className="mt-1 text-sm text-muted">${estimate.perUnit.toFixed(2)} per unit</p>
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-muted">
                {estimate.breakdown.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {line}
                  </li>
                ))}
              </ul>
              {estimate.savingsNote && (
                <p className="mt-3 rounded-lg bg-brand/10 px-3 py-2 text-xs text-brand">{estimate.savingsNote}</p>
              )}
            </>
          )}

          <Link
            href="/#quote"
            onClick={handleGetQuote}
            className="mt-auto pt-6 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-accent-hover"
          >
            Get Exact Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
