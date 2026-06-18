import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { MockupPreview } from "@/app/components/mockup-preview";
import { FadeIn } from "@/app/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Design Preview — See Your Art on a Shirt | Woodlands Print",
  description:
    "Upload your design and preview it on a t-shirt, hoodie, tank, or long sleeve in any color. Position it, size it, and request a quote — fast, free, no account needed.",
  alternates: { canonical: "/mockup" },
};

export default function MockupPage() {
  return (
    <>
      <SiteHeader variant="dark" />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-dark px-4 pb-8 pt-14 text-white sm:px-6 sm:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, rgba(201,162,39,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,107,80,0.45) 0%, transparent 45%)",
            }}
          />
          <FadeIn className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Design Preview</p>
            <h1 className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              See it before you print
            </h1>
            <p className="mt-3 max-w-xl text-white/75">
              Upload your artwork and preview it on a shirt, hoodie, tank, or long sleeve. Pick a color, position your design, and send it straight to a quote.
            </p>
          </FadeIn>
        </section>

        {/* Tool */}
        <section className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <MockupPreview />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-surface px-4 py-12 sm:px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">Like what you see?</h2>
            <p className="mt-2 text-muted">
              Browse our apparel catalog or get a quote with your design and details.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/blanks"
                className="inline-flex rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition hover:bg-brand/5"
              >
                Browse Apparel
              </Link>
              <Link
                href="/#quote"
                className="inline-flex rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
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
