"use client";

import { useLanguage } from "@/app/components/language-provider";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { locale, setLocale, dict } = useLanguage();
  const isDark = variant === "dark";

  const base =
    "rounded-lg px-2 py-1 text-xs font-semibold transition";
  const active = isDark ? "bg-white/15 text-white" : "bg-brand/10 text-brand";
  const idle = isDark ? "text-white/60 hover:text-white" : "text-muted hover:text-foreground";

  function btn(lang: Locale, label: string) {
    return (
      <button
        type="button"
        aria-pressed={locale === lang}
        aria-label={label}
        onClick={() => setLocale(lang)}
        className={`${base} ${locale === lang ? active : idle}`}
      >
        {lang.toUpperCase()}
      </button>
    );
  }

  return (
    <div
      className={`flex items-center gap-0.5 rounded-lg border p-0.5 ${
        isDark ? "border-white/15" : "border-border"
      }`}
      aria-label={dict.lang.label}
    >
      {btn("en", dict.lang.en)}
      {btn("es", dict.lang.es)}
    </div>
  );
}
