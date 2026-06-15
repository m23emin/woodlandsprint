import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function ContentPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="light" />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-light"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 text-lg text-muted">{description}</p>}
          <div className="legal-prose mt-10">{children}</div>
          <div className="mt-12 rounded-2xl border border-border bg-brand/5 p-6 text-center sm:p-8">
            <p className="font-semibold text-foreground">Ready to start your order?</p>
            <p className="mt-2 text-sm text-muted">Upload your design and get a fast, no-obligation quote.</p>
            <Link
              href="/#quote"
              className="mt-4 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent-hover"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
