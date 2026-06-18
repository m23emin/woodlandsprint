import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { FaqStructuredData } from "@/app/components/faq-structured-data";
import { FadeIn, StaggerGrid, StaggerItem } from "@/app/components/motion/fade-in";
import { pricingFaqItems } from "@/lib/site-config";
import { gangSheetSizes, gangSheetVolumeBreaks, gangSheetPrice } from "@/lib/pricing-calculator";

export const metadata: Metadata = {
  title: "Pricing — DTF Transfers & Custom Shirts | Woodlands Print",
  description:
    "Transparent pricing for DTF gang sheets, custom t-shirts, and bulk apparel orders in The Woodlands & North Houston. Volume discounts, no hidden fees.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Woodlands Print",
    description: "Transparent DTF gang sheet and custom shirt pricing for North Houston.",
    images: [{ url: "/brand/logo-full.png", width: 1200, height: 630, alt: "Woodlands Print" }],
  },
};

const shirtQtyTiers = [
  { label: "1–11", qty: 1 },
  { label: "12–23", qty: 12 },
  { label: "24–49", qty: 24 },
  { label: "50+", qty: 50 },
];

const shirtLocationMultipliers: { label: string; multiplier: number }[] = [
  { label: "Front only", multiplier: 1 },
  { label: "Front + back", multiplier: 1.4 },
  { label: "Front + back + sleeve", multiplier: 1.65 },
];

const shirtBaseByQty: Record<number, number> = { 1: 22, 12: 19, 24: 16, 50: 14 };

function shirtPrice(qty: number, multiplier: number) {
  return Math.round(shirtBaseByQty[qty] * multiplier * 100) / 100;
}

export default function PricingPage() {
  return (
    <>
      <FaqStructuredData items={pricingFaqItems} id="/pricing#faq" />
      <SiteHeader variant="dark" />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-dark px-4 py-14 text-white sm:px-6 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(201,162,39,0.16) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,107,80,0.4) 0%, transparent 45%)",
            }}
          />
          <FadeIn className="relative mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Transparent pricing</p>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, honest pricing
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              No hidden fees, no setup charges. Volume discounts apply automatically. Final quote may vary by blank, artwork complexity, and deadline.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/gang-sheet"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
              >
                Build a Gang Sheet
              </Link>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Get a Custom Quote
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* DTF Gang Sheets */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">DTF Transfers</p>
                <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground">Gang Sheet Pricing</h2>
                <p className="mt-2 text-muted">
                  All prices per sheet. Volume discounts apply to each size.
                  {" "}<Link href="/gang-sheet" className="font-medium text-brand hover:underline">Build & price yours →</Link>
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="py-3 pr-4 text-left font-semibold text-foreground">Size</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Dimensions</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Sq ft</th>
                      {gangSheetVolumeBreaks.map((b) => (
                        <th key={b.minQty} className="px-4 py-3 text-right font-semibold text-foreground">
                          {b.minQty === 1 ? "1–4" : b.label}
                          {b.discount > 0 && (
                            <span className="ml-1 text-xs font-normal text-brand">(-{b.discount * 100}%)</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gangSheetSizes.map((s) => (
                      <tr key={s.id} className={`border-b border-border ${s.popular ? "bg-brand/5" : ""}`}>
                        <td className="py-3.5 pr-4 font-medium text-foreground">
                          {s.label}
                          {s.popular && (
                            <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-foreground">
                              Popular
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-muted">{s.dimensions}</td>
                        <td className="px-4 py-3.5 text-muted">{s.sqft}</td>
                        {gangSheetVolumeBreaks.map((b) => {
                          const price = gangSheetPrice(s.id, b.minQty);
                          return (
                            <td key={b.minQty} className="px-4 py-3.5 text-right font-semibold text-brand">
                              ${price.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted">
                Rush orders add 20%. Prices confirmed in your quote.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Custom Shirts */}
        <section className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Custom Apparel</p>
                <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground">T-Shirt & Apparel Pricing</h2>
                <p className="mt-2 text-muted">Per-shirt price varies by quantity and print locations. Blank cost included.</p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="py-3 pr-4 text-left font-semibold text-foreground">Print locations</th>
                      {shirtQtyTiers.map((t) => (
                        <th key={t.label} className="px-4 py-3 text-right font-semibold text-foreground">{t.label} shirts</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shirtLocationMultipliers.map((loc) => (
                      <tr key={loc.label} className="border-b border-border">
                        <td className="py-3.5 pr-4 font-medium text-foreground">{loc.label}</td>
                        {shirtQtyTiers.map((t) => (
                          <td key={t.label} className="px-4 py-3.5 text-right font-semibold text-brand">
                            ${shirtPrice(t.qty, loc.multiplier).toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted">
                Prices per shirt, blank included. Hoodies and polos vary — request a quote for exact pricing. Rush +20%.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Bulk / Event */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Events & Bulk</p>
                <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground">Large orders & events</h2>
                <p className="mt-2 text-muted">25+ pieces, schools, teams, fundraisers, and corporate runs.</p>
              </div>
            </FadeIn>
            <StaggerGrid className="grid gap-5 sm:grid-cols-3">
              {[
                { label: "25–49 pieces", note: "Best for small teams, club runs, events", badge: "Volume" },
                { label: "50–99 pieces", note: "Fundraisers, school spirit, events", badge: "Best value" },
                { label: "100+ pieces", note: "Corporate, large events, wholesale", badge: "Custom quote" },
              ].map((tier) => (
                <StaggerItem key={tier.label}>
                  <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">{tier.badge}</span>
                    <p className="font-display mt-3 text-xl font-bold text-foreground">{tier.label}</p>
                    <p className="mt-1.5 text-sm text-muted">{tier.note}</p>
                    <Link
                      href="/#quote"
                      className="mt-4 inline-flex items-center text-sm font-semibold text-brand hover:underline"
                    >
                      Get a quote →
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-brand">FAQ</p>
              <h2 className="font-display mt-2 text-center text-3xl font-bold text-foreground">Pricing questions</h2>
            </FadeIn>
            <div className="mt-10 space-y-4">
              {pricingFaqItems.map((item) => (
                <FadeIn key={item.q}>
                  <div className="rounded-2xl border border-border bg-background p-6">
                    <dt className="font-semibold text-foreground">{item.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand px-4 py-16 text-white sm:px-6 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold">Ready to order?</h2>
            <p className="mt-3 text-white/75">Build your gang sheet online or send us your details — we reply fast.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/gang-sheet"
                className="inline-flex rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
              >
                Build a Gang Sheet
              </Link>
              <Link
                href="/#quote"
                className="inline-flex rounded-xl border border-white/25 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Get a Quote
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
