import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerGrid, StaggerItem } from "../components/motion/fade-in";
import { TiltCard } from "../components/motion/tilt-card";
import { SectionHeading } from "../components/section-heading";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Business & Bulk Printing | Woodlands Print",
  description:
    "Wholesale DTF transfers, business uniforms, team shirts, and bulk custom apparel in The Woodlands and North Houston.",
};

const audiences = [
  "Restaurants & food service",
  "Gyms & fitness studios",
  "Construction & trade crews",
  "Churches & schools",
  "Event organizers",
  "Etsy sellers & print shops",
  "Cleaning & landscaping companies",
  "Real estate teams",
];

const packages = [
  {
    title: "Starter Pack",
    qty: "25 shirts",
    desc: "Logo front print, premium blanks, ideal for new teams and small businesses.",
  },
  {
    title: "Team Uniform",
    qty: "50+ shirts",
    desc: "Front and back prints, mixed sizes, volume pricing for schools and crews.",
  },
  {
    title: "Wholesale DTF",
    qty: "Gang sheets",
    desc: "Reseller and production pricing for shops running regular transfer orders.",
  },
];

export default function BusinessPrintingPage() {
  return (
    <>
      <SiteHeader variant="dark" />
      <main>
        <section className="relative overflow-hidden bg-brand-dark px-4 py-14 text-white sm:px-6 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-35"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(42,107,80,0.4) 0%, transparent 45%)",
            }}
          />
          <FadeIn className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">B2B &amp; Wholesale</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Business &amp; Bulk Printing
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Uniforms, team shirts, event runs, and wholesale DTF — built for repeat orders and serious volume.
            </p>
            <p className="mt-4 max-w-lg text-white/65">
              Most retail customers spend $20–$50. Business customers often spend $300–$3,000 per order. That&apos;s
              where we help you win.
            </p>
            <Link
              href="/#quote"
              className="mt-8 inline-flex rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground transition hover:bg-accent-hover"
            >
              Request Bulk Quote
            </Link>
          </FadeIn>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
            <SectionHeading
              eyebrow="Who We Serve"
              title="Built for businesses that reorder"
              description="If you need shirts more than once a year, we make it easy to come back."
            />
            </FadeIn>
            <StaggerGrid className="mt-10 flex flex-wrap gap-3">
              {audiences.map((item) => (
                <StaggerItem key={item}>
                  <span className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <SectionHeading
                eyebrow="Packages"
                title="Popular bulk options"
                description="Every order is quoted to your specs — these are common starting points."
              />
            </FadeIn>
            <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-3">
              {packages.map((pkg) => (
                <StaggerItem key={pkg.title}>
                  <TiltCard className="h-full rounded-2xl">
                    <article className="h-full rounded-2xl border border-border bg-background p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand">{pkg.qty}</p>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">{pkg.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.desc}</p>
                    </article>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Why businesses choose us"
              title="Fast quotes. Consistent quality. Local support."
              description="Upload your logo once — reorder anytime with the same great results."
            />
            <ul className="mt-8 space-y-4 text-sm text-muted">
              {[
                "Dedicated bulk quote turnaround",
                "Volume and reorder-friendly pricing",
                "Local pickup and delivery in North Houston",
                "Artwork review before production",
                "Rush options when your event deadline is tight",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
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
              href="/#quote"
              className="mt-10 inline-flex rounded-xl bg-brand px-7 py-4 text-base font-semibold text-white transition hover:bg-brand-light"
            >
              Get Your Bulk Quote
            </Link>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
