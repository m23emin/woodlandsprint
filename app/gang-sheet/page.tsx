import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { GangSheetBuilder } from "@/app/components/gang-sheet-builder";
import { FadeIn } from "@/app/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Gang Sheet Builder — DTF Transfers | Woodlands Print",
  description:
    "Build your custom DTF gang sheet online. Upload designs, arrange them on the sheet, get an instant price, and request a quote. No minimums. Local pickup in North Houston.",
  alternates: { canonical: "/gang-sheet" },
};

export default function GangSheetPage() {
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
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">DTF Gang Sheets</p>
            <h1 className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Gang Sheet Builder
            </h1>
            <p className="mt-3 max-w-xl text-white/75">
              Upload your designs, arrange them on the sheet, and get an instant price estimate. No minimums. Local pickup across North Houston.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {[
                "No minimums",
                "Same-day before noon",
                "Local pickup",
                "Artwork review included",
              ].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-white/70">
                  <svg className="h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Builder */}
        <section className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <GangSheetBuilder />
          </div>
        </section>

        {/* File tips */}
        <section className="border-t border-border bg-surface px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">File tips</p>
            <h2 className="font-display mt-2 text-2xl font-bold text-foreground">Getting the best results</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "PNG with transparency",
                  body: "Transparent background prevents white boxes around your design on the garment.",
                },
                {
                  title: "300 DPI minimum",
                  body: "Higher resolution means sharper edges and finer detail in your finished print.",
                },
                {
                  title: "Full-size artwork",
                  body: "Upload at the actual print size you need — scaling up loses quality.",
                },
                {
                  title: "Not mirrored",
                  body: "DTF transfers are applied face-down — submit artwork in its final, correct orientation.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Full details →{" "}
              <a href="/artwork-requirements" className="font-medium text-brand hover:underline">
                Artwork requirements page
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
