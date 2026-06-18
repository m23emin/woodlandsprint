import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader variant="light" />
      <main className="flex flex-1 items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">404</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Page not found</h1>
          <p className="mt-3 text-muted">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Go home
            </Link>
            <Link
              href="/#quote"
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-brand/30"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
