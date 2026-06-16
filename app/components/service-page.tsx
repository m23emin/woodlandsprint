import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ServicePage } from "@/lib/service-data";
import { FadeIn, StaggerGrid, StaggerItem } from "./motion/fade-in";
import { SectionHeading } from "./section-heading";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TiltCard } from "./motion/tilt-card";

export function serviceMetadata(page: ServicePage): Metadata {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
    },
  };
}

export function ServicePageView({ page }: { page: ServicePage }) {
  return (
    <>
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
          <FadeIn className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{page.eyebrow}</p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">{page.heroSubtitle}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/65">{page.heroIntro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
              >
                Get a Fast Quote
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Try the Price Calculator
              </Link>
            </div>
            <p className="mt-6 inline-flex items-baseline gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
              <span className="font-display text-xl font-bold text-accent">{page.priceFrom}</span>
              <span className="text-white/60">{page.priceNote}</span>
            </p>
          </FadeIn>
        </section>

        {/* Highlights */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <SectionHeading
                eyebrow="Why this works"
                title={`What makes our ${page.eyebrow.toLowerCase()} stand out`}
                description="Quality you can feel, pricing that scales, and a local team that keeps your order on track."
              />
            </FadeIn>
            <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-3">
              {page.highlights.map((item) => (
                <StaggerItem key={item.title}>
                  <TiltCard className="h-full rounded-2xl">
                    <article className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                      <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    </article>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* Gallery + what you get */}
        <section className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <SectionHeading eyebrow="What you get" title="Included with every order" description="" />
              <ul className="mt-6 space-y-4">
                {page.whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/artwork-requirements"
                className="mt-8 inline-flex text-sm font-semibold text-brand hover:underline"
              >
                Review artwork requirements →
              </Link>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {page.gallery.map((item, index) => (
                  <div
                    key={item.label}
                    className={`relative overflow-hidden rounded-2xl shadow-lg ${
                      index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-sm font-semibold text-white drop-shadow">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <SectionHeading eyebrow="FAQ" title="Common questions" description="" centered />
            </FadeIn>
            <StaggerGrid className="mt-10 space-y-4">
              {page.faq.map((item) => (
                <StaggerItem key={item.q}>
                  <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <dt className="font-semibold text-foreground">{item.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* Related + CTA */}
        <section className="border-t border-border bg-brand px-4 py-16 text-white sm:px-6 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold">Ready to start your order?</h2>
            <p className="mt-3 text-white/75">
              Send us your design and details — we&apos;ll reply quickly with pricing and a timeline.
            </p>
            <Link
              href="/#quote"
              className="mt-8 inline-flex rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground transition hover:scale-[1.02] hover:bg-accent-hover"
            >
              Get a Fast Quote
            </Link>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {page.relatedLocal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
