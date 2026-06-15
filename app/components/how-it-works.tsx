import { FadeIn, StaggerGrid, StaggerItem } from "./motion/fade-in";
import { SectionHeading } from "./section-heading";
import { howItWorksSteps } from "@/lib/site-config";

export function HowItWorks() {
  return (
    <section id="process" className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Simple Process"
            title="How It Works"
            description="From upload to pickup — a straightforward path with clear communication at every step."
            centered
          />
        </FadeIn>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-brand/30 to-transparent md:block"
          />
          <StaggerGrid className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {howItWorksSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <article className="relative text-center md:text-left">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand shadow-sm md:mx-0">
                    <span className="font-display text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
