import Link from "next/link";
import { Logo } from "./logo";
import { footerLinks, siteName } from "@/lib/site-config";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{title}</p>
      <nav className="mt-3 flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-white/70 transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="full" onDark href="/" />
            <p className="mt-3 max-w-xs text-sm text-white/60">
              DTF transfers, custom shirts, and bulk apparel with fast turnaround and local support.
            </p>
          </div>
          <FooterColumn title="Company" links={[...footerLinks.company]} />
          <FooterColumn title="Resources" links={[...footerLinks.resources]} />
          <FooterColumn title="Policies" links={[...footerLinks.policies]} />
          <FooterColumn title="Service Areas" links={[...footerLinks.local]} />
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40 sm:text-left">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
