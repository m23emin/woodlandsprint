import { GoogleReviews } from "./google-reviews";
import { FadeIn, StaggerGrid, StaggerItem } from "./motion/fade-in";
import { SectionHeading } from "./section-heading";
import { testimonials, trustCategories } from "@/lib/site-config";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${index < rating ? "text-accent" : "text-border"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="border-y border-border bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Local Trust"
            title="What Customers Say"
            description="Businesses and creators across North Houston count on us for quality and reliable turnaround."
            centered
          />
        </FadeIn>

        <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-3" stagger={0.1}>
          {testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-brand/25 hover:shadow-md">
                <StarRow rating={item.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeIn delay={0.12}>
          <GoogleReviews />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12 overflow-hidden">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
            Serving local businesses
          </p>
          <div className="relative">
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
              {[...trustCategories, ...trustCategories].map((label, index) => (
                <span
                  key={`${label}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
