"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { AccountLink } from "./account/account-link";
import { CartButton } from "./cart/cart-button";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "@/app/components/language-provider";
import { getNavLinks } from "@/lib/i18n";

export function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark";
  const { locale, dict } = useLanguage();
  const navLinks = getNavLinks(locale);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isDark ? "border-white/10 bg-brand-dark/95" : "border-border bg-surface/95"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo variant="full" onDark={isDark} href="/" />

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                isDark ? "text-white/75 hover:text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant={isDark ? "dark" : "light"} />
          <CartButton variant={isDark ? "dark" : "light"} />
          <AccountLink variant={isDark ? "dark" : "light"} />
          <ThemeToggle variant={isDark ? "dark" : "light"} />
          <Link
            href="/#quote"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-hover sm:inline-flex"
          >
            {dict.nav.getQuote}
          </Link>
          <MobileNav variant={isDark ? "dark" : "light"} />
        </div>
      </div>
    </header>
  );
}
