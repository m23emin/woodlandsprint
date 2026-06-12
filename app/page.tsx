import { QuoteForm } from "./components/quote-form";
import { StickyCta } from "./components/sticky-cta";

const services = [
  {
    title: "DTF Gang Sheets",
    description:
      "High-quality direct-to-film transfers with vibrant color and durable wear. Perfect for one-offs or production runs.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Custom T-Shirts",
    description:
      "Soft, premium blanks with crisp prints for teams, brands, gifts, and everyday wear that looks and feels great.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: "Business Apparel",
    description:
      "Polos, hoodies, and uniforms that keep your team looking professional with consistent branding.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Event & Bulk Orders",
    description:
      "Race shirts, school events, reunions, and large runs handled with reliable timelines and competitive pricing.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: "Fast Turnaround",
    description: "Rush options available. We respect your deadlines so your order arrives when you need it.",
  },
  {
    title: "Premium Quality",
    description: "Sharp prints, accurate colors, and materials built to hold up wash after wash.",
  },
  {
    title: "Local Service",
    description: "Personal support from a team that knows The Woodlands area and nearby communities.",
  },
];

const serviceAreas = [
  "The Woodlands",
  "Spring",
  "Conroe",
  "Tomball",
  "Magnolia",
  "Richmond",
  "North Houston",
  "Surrounding Areas",
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-dark/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="text-lg font-bold tracking-tight text-white">
            Woodlands Print
          </a>
          <a
            href="#quote"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-hover sm:inline-flex"
          >
            Get a Fast Quote
          </a>
        </div>
      </header>

      <main className="pb-24 sm:pb-0">
        {/* Hero */}
        <section
          id="hero"
          className="relative overflow-hidden bg-brand-dark px-4 pb-16 pt-12 text-white sm:px-6 sm:pb-20 sm:pt-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(201,162,39,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,107,80,0.4) 0%, transparent 40%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80">
              Local Custom Printing
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight lg:text-6xl">
              Woodlands Print
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80 sm:text-xl">
              DTF Transfers &amp; Custom Shirts
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
              Premium printing for businesses, events, and creators across North Houston — with fast
              quotes and quality you can feel.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground shadow-lg shadow-black/20 transition hover:bg-accent-hover"
              >
                Get a Fast Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View Services
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-md">
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Turnaround</dt>
                <dd className="mt-1 text-sm font-semibold">Fast &amp; Rush</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Quality</dt>
                <dd className="mt-1 text-sm font-semibold">Premium Prints</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50">Service</dt>
                <dd className="mt-1 text-sm font-semibold">Local Team</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="What We Do"
              title="Services"
              description="From single transfers to full bulk runs, we handle every detail so your order looks professional."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-brand/30 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-3 text-brand transition group-hover:bg-brand group-hover:text-white">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="bg-brand px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why Woodlands Print"
              title="Why Choose Us"
              description="We combine speed, quality, and personal service so you never have to compromise."
              light
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-foreground">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Free Quote"
                  title="Get a Fast Quote"
                  description="Tell us about your project and we'll respond quickly with pricing and timeline options."
                />
                <ul className="mt-8 space-y-4">
                  {[
                    "No obligation — just honest pricing",
                    "Upload your design for accurate quotes",
                    "Rush deadlines welcome",
                  ].map((item) => (
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
              </div>
              <QuoteForm />
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section id="areas" className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <SectionHeading
              eyebrow="Coverage"
              title="Service Areas"
              description="Proudly serving customers throughout North Houston and nearby communities."
              centered
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted">
              Based in The Woodlands area, we serve Spring, Conroe, Tomball, Magnolia, Richmond, and
              surrounding communities with pickup, delivery, and shipping options available.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xl font-bold">Woodlands Print</p>
              <p className="mt-2 max-w-xs text-sm text-white/60">
                DTF transfers, custom shirts, and bulk apparel with fast turnaround and local support.
              </p>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Quick Links</p>
                <nav className="mt-3 flex flex-col gap-2 text-sm">
                  <a href="#services" className="text-white/70 transition hover:text-white">
                    Services
                  </a>
                  <a href="#why-us" className="text-white/70 transition hover:text-white">
                    Why Choose Us
                  </a>
                  <a href="#quote" className="text-white/70 transition hover:text-white">
                    Get a Quote
                  </a>
                  <a href="#areas" className="text-white/70 transition hover:text-white">
                    Service Areas
                  </a>
                </nav>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Services</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>DTF Gang Sheets</li>
                  <li>Custom T-Shirts</li>
                  <li>Business Apparel</li>
                  <li>Event &amp; Bulk Orders</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40 sm:text-left">
            &copy; {new Date().getFullYear()} Woodlands Print. All rights reserved.
          </div>
        </div>
      </footer>

      <StickyCta />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${
          light ? "text-accent" : "text-brand"
        } ${centered ? "text-center" : ""}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-foreground"
        } ${centered ? "text-center" : ""}`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 text-base leading-relaxed ${
          light ? "text-white/70" : "text-muted"
        } ${centered ? "text-center" : ""}`}
      >
        {description}
      </p>
    </div>
  );
}
