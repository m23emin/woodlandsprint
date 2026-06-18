import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { FadeIn } from "@/app/components/motion/fade-in";
import { serviceAreas, siteContact, siteName, sitePickup } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact & Pickup | Woodlands Print",
  description:
    "Contact Woodlands Print for DTF transfers and custom shirts. Local pickup across North Houston — call, text, or request a quote online.",
  alternates: { canonical: "/contact" },
};

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export default function ContactPage() {
  const phoneDisplay = formatPhone(siteContact.phone);
  const waHref = siteContact.whatsapp
    ? `https://wa.me/${siteContact.whatsapp}?text=${encodeURIComponent(siteContact.whatsappMessage)}`
    : null;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sitePickup.mapsQuery)}`;

  return (
    <>
      <SiteHeader variant="dark" />
      <main>
        <section className="relative overflow-hidden bg-brand-dark px-4 py-14 text-white sm:px-6 sm:py-20">
          <div className="relative mx-auto max-w-6xl">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Get in touch</p>
              <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Contact &amp; Pickup</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                Fast quotes, local pickup, and personal support across North Houston. Call, text, or send a quote
                online — we respond quickly.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ContactCard title="Phone">
              <a href={`tel:${siteContact.phone}`} className="text-xl font-semibold text-brand hover:underline">
                {phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-muted">Best for urgent deadlines and order questions.</p>
            </ContactCard>

            {waHref && (
              <ContactCard title="WhatsApp">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xl font-semibold text-[#25D366] hover:underline"
                >
                  Message us
                </a>
                <p className="mt-2 text-sm text-muted">Send artwork or ask for a quick quote.</p>
              </ContactCard>
            )}

            <ContactCard title="Online quote">
              <Link href="/#quote" className="text-xl font-semibold text-brand hover:underline">
                Request a quote →
              </Link>
              <p className="mt-2 text-sm text-muted">Upload designs and get pricing by email.</p>
            </ContactCard>

            <ContactCard title="Pickup hours">
              <p className="text-lg font-semibold text-foreground">{sitePickup.hours}</p>
              <p className="mt-2 text-sm text-muted">{sitePickup.pickupNote}</p>
            </ContactCard>

            <ContactCard title="Service area">
              <p className="text-sm font-medium text-foreground">{sitePickup.area}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </ContactCard>

            <ContactCard title="Map">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-brand hover:underline"
              >
                Open in Google Maps ↗
              </a>
              <p className="mt-2 text-sm text-muted">Serving {sitePickup.mapsQuery} and surrounding communities.</p>
            </ContactCard>
          </div>

          <FadeIn className="mx-auto mt-12 max-w-6xl rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-foreground">Ready to print?</h2>
            <p className="mt-2 text-muted">
              Gang sheets, custom shirts, and bulk runs — {siteName} handles it with fast turnaround.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/#quote"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent-hover"
              >
                Get a Quote
              </Link>
              <Link
                href="/gang-sheet"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-brand/30"
              >
                Build a Gang Sheet
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
