"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const serviceOptions = [
  "DTF Gang Sheets",
  "Custom T-Shirts",
  "Business Apparel",
  "Event & Bulk Orders",
  "Not Sure Yet",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("name") || !formData.get("phone") || !formData.get("email")) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      {status === "success" ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground">Quote request received</h3>
          <p className="mt-2 text-muted">
            Thanks for reaching out. We&apos;ll review your details and get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name" required>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={inputClass}
                placeholder="Your name"
              />
            </Field>
            <Field label="Phone" htmlFor="phone" required>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className={inputClass}
                placeholder="(281) 555-0123"
              />
            </Field>
          </div>

          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
              placeholder="you@email.com"
            />
          </Field>

          <Field label="Business Name" htmlFor="businessName">
            <input
              id="businessName"
              name="businessName"
              type="text"
              autoComplete="organization"
              className={inputClass}
              placeholder="Optional — for bulk or business orders"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service Type" htmlFor="service">
              <select id="service" name="service" className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Quantity" htmlFor="quantity">
              <input
                id="quantity"
                name="quantity"
                type="text"
                className={inputClass}
                placeholder="e.g. 24 shirts"
              />
            </Field>
          </div>

          <Field label="Need By Date" htmlFor="needBy">
            <input id="needBy" name="needBy" type="date" className={inputClass} />
          </Field>

          <Field label="Upload Design" htmlFor="design">
            <input
              id="design"
              name="design"
              type="file"
              accept="image/*,.pdf,.ai,.eps,.svg"
              className="block w-full text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-brand/10 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand/15"
            />
            <p className="mt-1.5 text-xs text-muted">PNG, JPG, PDF, AI, EPS, or SVG accepted.</p>
            <div className="mt-3 rounded-xl border border-border bg-background px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Before uploading
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted">
                <li>Transparent background?</li>
                <li>Correct print size?</li>
                <li>High resolution (300 DPI)?</li>
                <li>Not mirrored?</li>
                <li>No unwanted white box?</li>
              </ul>
              <Link href="/artwork-requirements" className="mt-2 inline-block text-xs font-medium text-brand hover:underline">
                Full artwork guide →
              </Link>
            </div>
          </Field>

          <Field label="Notes" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className={`${inputClass} resize-y min-h-28`}
              placeholder="Tell us about colors, sizes, placement, or any special requests."
            />
          </Field>

          {status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              Something went wrong sending your request. Please check your details and try again, or call us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-xl bg-accent px-6 py-4 text-base font-semibold text-foreground shadow-sm transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Request My Quote"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20";
