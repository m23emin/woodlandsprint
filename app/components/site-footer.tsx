"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useLanguage } from "@/app/components/language-provider";
import { getFooterLinks } from "@/lib/i18n";
import { siteName } from "@/lib/site-config";

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
  const { locale, dict } = useLanguage();
  const footerLinks = getFooterLinks(locale);

  return (
    <footer className="bg-brand-dark px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="full" onDark href="/" />
            <p className="mt-3 max-w-xs text-sm text-white/60">{dict.footer.tagline}</p>
          </div>
          <FooterColumn title={dict.footer.company} links={footerLinks.company} />
          <FooterColumn title={dict.footer.resources} links={footerLinks.resources} />
          <FooterColumn title={dict.footer.policies} links={footerLinks.policies} />
          <FooterColumn title={dict.footer.areas} links={footerLinks.local} />
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40 sm:text-left">
          &copy; {new Date().getFullYear()} {siteName}. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
