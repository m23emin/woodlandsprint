import type { Metadata } from "next";
import Link from "next/link";
import type { LocalSeoPage } from "@/lib/local-seo-data";
import { FadeIn } from "./motion/fade-in";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function localSeoMetadata(page: LocalSeoPage): Metadata {
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "website",
    },
  };
}

export function LocalSeoPageView({ page }: { page: LocalSeoPage }) {
  return (
    <>
      <SiteHeader variant="dark" />
      <main>
        <section className="relative overflow-hidden bg-brand-dark px-4 py-14 text-white sm:px-6 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(201,162,39,0.15) 0%, transparent 50%)",
            }}
          />
          <FadeIn className="relative mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{page.city}, TX</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{page.headline}</h1>
            <p className="mt-4 text-lg text-white/80">{page.subheadline}</p>
            <p className="mt-6 leading-relaxed text-white/65">{page.intro}</p>
            <Link
              href="/#quote"
              className="mt-8 inline-flex rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
            >
              {page.cta}
            </Link>
          </FadeIn>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <FadeIn className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">What we offer in {page.city}</h2>
            <ul className="mt-6 space-y-3">
              {page.services.map((service) => (
                <li key={service} className="flex items-start gap-3 text-muted">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/business-printing" className="text-sm font-semibold text-brand hover:underline">
                Business & bulk orders →
              </Link>
              <Link href="/artwork-requirements" className="text-sm font-semibold text-brand hover:underline">
                Artwork requirements →
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
