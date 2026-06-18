import Link from "next/link";
import { BeforeAfterSlider } from "./components/before-after-slider";
import { BentoGallery } from "./components/bento-gallery";
import { HowItWorks } from "./components/how-it-works";
import { PriceCalculator } from "./components/price-calculator";
import { QuoteForm } from "./components/quote-form";
import { Logo } from "./components/logo";
import { SectionHeading } from "./components/section-heading";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { StickyCta } from "./components/sticky-cta";
import { Testimonials } from "./components/testimonials";
import { FadeIn, StaggerGrid, StaggerItem } from "./components/motion/fade-in";
import { HeroScene } from "./components/motion/hero-scene";
import { ParallaxBlob, ParallaxLayer } from "./components/motion/parallax";
import { SectionDivider } from "./components/motion/section-divider";
import { TiltCard } from "./components/motion/tilt-card";
import { galleryItems } from "@/lib/site-config";
import { getDictionary } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n/server";

const SERVICE_ICONS = [
  (
    <svg key="dtf" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  (
    <svg key="shirts" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  (
    <svg key="apparel" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  (
    <svg key="bulk" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
];

export default async function Home() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const services = t.home.services.map((service, index) => ({
    ...service,
    icon: SERVICE_ICONS[index],
  }));
  const serviceAreas = [
    { label: t.footer.woodlands, href: "/dtf-transfers-the-woodlands" },
    { label: t.footer.spring, href: "/custom-shirts-spring-tx" },
    { label: t.footer.conroe, href: "/gang-sheet-printing-conroe" },
    { label: t.footer.houston, href: "/dtf-printing-houston" },
    { label: t.footer.tomball, href: "/custom-shirts-tomball-tx" },
    { label: t.footer.magnolia, href: "/dtf-transfers-magnolia-tx" },
    { label: t.footer.richmond, href: "/custom-shirts-richmond-tx" },
    { label: t.home.northHouston, href: null },
  ];

  return (
    <>
      <SiteHeader variant="dark" />

      <main className="pb-24 sm:pb-0">
        {/* Hero */}
        <section
          id="hero"
          className="relative overflow-hidden bg-brand-dark px-4 pb-16 pt-12 text-white sm:px-6 sm:pb-20 sm:pt-16"
        >
          {/* Parallax blobs */}
          <ParallaxBlob
            speed={0.15}
            className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-brand-light/20 blur-[80px] animate-blob-drift"
          />
          <ParallaxBlob
            speed={0.3}
            className="absolute right-[-5%] top-[10%] h-[350px] w-[350px] rounded-full bg-accent/10 blur-[60px] animate-blob-drift-reverse"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(201,162,39,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(42,107,80,0.45) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(201,162,39,0.1) 0%, transparent 35%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <FadeIn delay={0.05}>
                <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  {t.home.heroBadge}
                </p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <Logo variant="full" onDark className="h-12 sm:h-14" />
              </FadeIn>
              <h1 className="sr-only">{t.meta.siteTitle}</h1>
              <FadeIn delay={0.2}>
                <p className="font-display mt-4 max-w-xl text-2xl text-white/90 sm:text-3xl">
                  {t.home.heroTitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.28}>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
                  {t.home.heroSubtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.36} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-4 text-base font-semibold text-foreground shadow-lg shadow-black/25 transition hover:bg-accent-hover hover:shadow-accent/20"
                >
                  {t.home.heroCta}
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  {t.home.heroServices}
                </a>
              </FadeIn>
              <ParallaxLayer speed={0.05} className="mt-12">
                <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-md">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/50">{t.home.statTurnaround}</dt>
                    <dd className="mt-1 text-sm font-semibold">{t.home.statTurnaroundVal}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/50">{t.home.statQuality}</dt>
                    <dd className="mt-1 text-sm font-semibold">{t.home.statQualityVal}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/50">{t.home.statService}</dt>
                    <dd className="mt-1 text-sm font-semibold">{t.home.statServiceVal}</dd>
                  </div>
                </dl>
              </ParallaxLayer>
            </div>

            <FadeIn delay={0.3} className="mt-10 sm:hidden">
              <HeroScene />
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="hidden sm:block">
              <HeroScene />
            </FadeIn>
          </div>
        </section>

        {/* Trust / same-day strip */}
        <section className="border-y border-brand-dark/20 bg-brand-dark px-4 py-5 text-white sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-sm sm:text-base">
            {t.home.trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">{item}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-soft-top px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <SectionHeading
                eyebrow={t.home.servicesEyebrow}
                title={t.home.servicesTitle}
                description={t.home.servicesDesc}
              />
            </FadeIn>
            <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <TiltCard className="h-full rounded-2xl">
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-brand/30 hover:shadow-lg"
                    >
                      <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-3 text-brand transition group-hover:bg-brand group-hover:text-white">
                        {service.icon}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                      <span className="mt-auto pt-4 inline-flex items-center text-sm font-semibold text-brand transition group-hover:translate-x-0.5">
                        {t.home.learnMore}
                      </span>
                    </Link>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <HowItWorks />

        <SectionDivider variant="light" />

        {/* B2B banner */}
        <section className="relative overflow-hidden border-y border-border bg-brand px-4 py-10 text-white sm:px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(201,162,39,0.15) 50%, transparent 60%)",
            }}
          />
          <FadeIn className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t.home.b2bEyebrow}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.home.b2bTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-white/75">{t.home.b2bDesc}</p>
            </div>
            <Link
              href="/business-printing"
              className="shrink-0 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-foreground shadow-lg shadow-black/20 transition hover:scale-[1.03] hover:bg-accent-hover"
            >
              {t.home.b2bCta}
            </Link>
          </FadeIn>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <SectionHeading
                eyebrow={t.home.pricingEyebrow}
                title={t.home.pricingTitle}
                description={t.home.pricingDesc}
              />
            </FadeIn>
            <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-3" stagger={0.1}>
              {t.home.pricingTiers.map((tier) => (
                <StaggerItem key={tier.title}>
                  <TiltCard depth={10} className="h-full rounded-2xl">
                    <article
                      className={`h-full rounded-2xl border p-6 ${
                        tier.highlighted
                          ? "border-brand bg-brand/5 shadow-lg shadow-brand/10"
                          : "border-border bg-surface shadow-sm"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-foreground">{tier.title}</h3>
                      <p className="mt-2 text-3xl font-bold text-brand">{tier.from}</p>
                      <p className="mt-2 text-sm text-muted">{tier.note}</p>
                      <ul className="mt-4 space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
            <FadeIn delay={0.12}>
              <PriceCalculator />
            </FadeIn>
            <FadeIn delay={0.15} className="mt-6 text-center text-sm text-muted">
              {t.home.pricingNote}{" "}
              <Link href="/turnaround-time" className="font-medium text-brand hover:underline">
                {t.home.pricingTurnaround}
              </Link>
              .
            </FadeIn>
          </div>
        </section>

        <SectionDivider variant="brand" />

        {/* Before / After */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeIn>
                <SectionHeading
                  eyebrow={t.home.beforeEyebrow}
                  title={t.home.beforeTitle}
                  description={t.home.beforeDesc}
                />
              </FadeIn>
              <FadeIn direction="left" delay={0.1}>
                <BeforeAfterSlider />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <SectionHeading
                eyebrow={t.home.galleryEyebrow}
                title={t.home.galleryTitle}
                description={t.home.galleryDesc}
                centered
              />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10">
              <BentoGallery items={galleryItems} />
            </FadeIn>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="relative overflow-hidden bg-brand px-4 py-16 text-white sm:px-6 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-blob-drift"
          />
          <div className="relative mx-auto max-w-6xl">
            <FadeIn>
              <SectionHeading
                eyebrow={t.home.whyEyebrow}
                title={t.home.whyTitle}
                description={t.home.whyDesc}
                light
              />
            </FadeIn>
            <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-3">
              {t.home.benefits.map((benefit, index) => (
                <StaggerItem key={benefit.title}>
                  <TiltCard depth={8} className="h-full rounded-2xl">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-foreground">
                        {index + 1}
                      </span>
                      <h3 className="font-display mt-4 text-lg font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{benefit.description}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <Testimonials />

        {/* Quote */}
        <section id="quote" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeIn>
                <SectionHeading
                  eyebrow={t.home.quoteEyebrow}
                  title={t.home.quoteTitle}
                  description={t.home.quoteDesc}
                />
                <ul className="mt-8 space-y-4">
                  {t.home.quoteBullets.map((item) => (
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
                <p className="mt-6 text-sm text-muted">
                  {t.home.quoteArtworkPrefix}{" "}
                  <Link href="/artwork-requirements" className="font-medium text-brand hover:underline">
                    {t.home.quoteArtworkLink}
                  </Link>{" "}
                  {t.home.quoteArtworkSuffix}
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.1}>
                <QuoteForm />
              </FadeIn>
            </div>
          </div>
        </section>

        <SectionDivider variant="light" />

        {/* FAQ */}
        <section id="faq" className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <SectionHeading
                eyebrow={t.home.faqEyebrow}
                title={t.home.faqTitle}
                description={t.home.faqDesc}
                centered
              />
            </FadeIn>
            <StaggerGrid className="mt-10 space-y-4">
              {t.home.faq.map((item) => (
                <StaggerItem key={item.q}>
                  <div className="rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-brand/20 hover:shadow-md">
                    <dt className="font-semibold text-foreground">{item.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* Service Areas */}
        <section id="areas" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <FadeIn>
              <SectionHeading
                eyebrow={t.home.areasEyebrow}
                title={t.home.areasTitle}
                description={t.home.areasDesc}
                centered
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {serviceAreas.map((area) =>
                  area.href ? (
                    <Link
                      key={area.label}
                      href={area.href}
                      className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-md"
                    >
                      {area.label}
                    </Link>
                  ) : (
                    <span
                      key={area.label}
                      className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {area.label}
                    </span>
                  ),
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.18} className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted">
              {t.home.areasBody}
            </FadeIn>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyCta />
    </>
  );
}
