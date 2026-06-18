"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAccountProfile } from "@/app/components/account/account-link";
import { useCart } from "@/app/components/cart/cart-provider";
import { clearQuotePrefill, loadQuotePrefill } from "@/lib/quote-prefill";
import { DesignUpload } from "./design-upload";
import {
  emptySizeBreakdown,
  formatSizeBreakdown,
  QuoteSizeBreakdown,
  showSizeBreakdown,
  sizeBreakdownTotal,
  type SizeBreakdown,
} from "./quote-size-breakdown";

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [mockupDataUrl, setMockupDataUrl] = useState<string | null>(null);
  const [mockupName, setMockupName] = useState<string | null>(null);
  const [sizes, setSizes] = useState<SizeBreakdown>(() => emptySizeBreakdown());
  const { profile, loaded: profileLoaded } = useAccountProfile();
  const { clearCart } = useCart();

  useEffect(() => {
    if (!profileLoaded || !profile) return;
    setName((prev) => prev || profile.fullName);
    setPhone((prev) => prev || profile.phone || "");
    setEmail((prev) => prev || profile.email);
    setBusinessName((prev) => prev || profile.businessName || "");
  }, [profile, profileLoaded]);

  useEffect(() => {
    const prefill = loadQuotePrefill();
    if (!prefill) return;

    if (typeof prefill.service === "string") setService(prefill.service);
    if (prefill.quantity != null) setQuantity(String(prefill.quantity));

    if (typeof prefill.notes === "string" && prefill.notes) {
      setNotes(prefill.notes);
    } else {
      const noteLines: string[] = [];
      if (typeof prefill.blank === "string" && prefill.blank) {
        noteLines.push(`Blank: ${prefill.blank}`);
      }
      if (typeof prefill.gangSheetSize === "string" && prefill.gangSheetSize) {
        noteLines.push(`Gang sheet size: ${prefill.gangSheetSize}`);
      }
      if (prefill.estimatedTotal && Number(prefill.estimatedTotal) > 0) {
        noteLines.push(`Calculator estimate: ~$${prefill.estimatedTotal}${prefill.rush ? " (rush requested)" : ""}`);
      }
      if (noteLines.length > 0) {
        setNotes((prev) => (prev ? `${prev}\n${noteLines.join("\n")}` : noteLines.join("\n")));
      }
    }
    if (typeof prefill.mockupImage === "string" && prefill.mockupImage) {
      setMockupDataUrl(prefill.mockupImage);
      setMockupName(typeof prefill.mockupName === "string" ? prefill.mockupName : "mockup.png");
    }
    clearQuotePrefill();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("name") || !formData.get("phone") || !formData.get("email")) {
      setStatus("error");
      return;
    }

    const sizeText = formatSizeBreakdown(sizes);
    const sizeTotal = sizeBreakdownTotal(sizes);
    if (sizeText) {
      const mergedNotes = notes ? `${notes}\n\n${sizeText}` : sizeText;
      formData.set("notes", mergedNotes);
    }
    if (sizeTotal > 0 && !formData.get("quantity")) {
      formData.set("quantity", `${sizeTotal} shirts`);
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

      clearCart();
      setStatus("success");
      form.reset();
      setName(profile?.fullName ?? "");
      setPhone(profile?.phone ?? "");
      setEmail(profile?.email ?? "");
      setBusinessName(profile?.businessName ?? "");
      setService("");
      setQuantity("");
      setNotes("");
      setSizes(emptySizeBreakdown());
      setMockupDataUrl(null);
      setMockupName(null);
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
            A confirmation email is on its way to your inbox.
            {profile && (
              <>
                {" "}
                Track this request in{" "}
                <a href="/account" className="font-semibold text-brand hover:underline">
                  your account
                </a>
                .
              </>
            )}
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
          {profile && (
            <p className="rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand">
              Signed in as {profile.email}. Your profile details are pre-filled below.
            </p>
          )}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service Type" htmlFor="service">
              <select
                id="service"
                name="service"
                className={inputClass}
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
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
                placeholder={
                  showSizeBreakdown(service) && sizeBreakdownTotal(sizes) > 0
                    ? `${sizeBreakdownTotal(sizes)} shirts (from sizes below)`
                    : "e.g. 24 shirts"
                }
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Field>
          </div>

          {showSizeBreakdown(service) && (
            <QuoteSizeBreakdown sizes={sizes} onChange={setSizes} />
          )}

          <Field label="Need By Date" htmlFor="needBy">
            <input id="needBy" name="needBy" type="date" className={inputClass} />
          </Field>

          <Field label="Upload Design" htmlFor="design">
            <DesignUpload initialDataUrl={mockupDataUrl} initialName={mockupName} />
          </Field>

          <Field label="Notes" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className={`${inputClass} resize-y min-h-28`}
              placeholder="Tell us about colors, sizes, placement, or any special requests."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>

          {status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
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
    <div className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20";
