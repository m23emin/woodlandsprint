import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { BlankCatalog } from "@/app/components/blank-catalog";
import { FadeIn } from "@/app/components/motion/fade-in";
import { allBrands } from "@/lib/blank-catalog";

export const metadata: Metadata = {
  title: "Apparel Catalog — Shirts, Hoodies & More | Woodlands Print",
  description:
    "Browse our blank apparel catalog — Bella Canvas, Gildan, Comfort Colors, Next Level and more. T-shirts, hoodies, long sleeves, tanks, and onesies in dozens of colors. Get a quote.",
  alternates: { canonical: "/blanks" },
};

export default function BlanksPage() {
  const brands = allBrands();

  return (
    <>
      <SiteHeader variant="dark" />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-dark px-4 pb-10 pt-14 text-white sm:px-6 sm:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, rgba(201,162,39,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,107,80,0.45) 0%, transparent 45%)",
            }}
          />
          <FadeIn className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Apparel Catalog</p>
            <h1 className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Pick your blank
            </h1>
            <p className="mt-3 max-w-xl text-white/75">
              Premium shirts, hoodies, long sleeves, tanks, and onesies in dozens of colors. Choose a style, then get a quote with your design — print cost and bulk discounts included.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Brands we carry: {brands.join(" · ")}
            </p>
          </FadeIn>
        </section>

        {/* Catalog */}
        <section className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <BlankCatalog />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-surface px-4 py-12 sm:px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">Don&apos;t see what you need?</h2>
            <p className="mt-2 text-muted">
              We can source almost any blank. Tell us the brand and style in your quote and we&apos;ll price it out.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/#quote"
                className="inline-flex rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
              >
                Get a Quote
              </Link>
              <Link
                href="/pricing"
                className="inline-flex rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition hover:bg-brand/5"
              >
                See Pricing
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
