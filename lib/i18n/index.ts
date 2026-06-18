import en from "./en";
import es from "./es";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Dictionary, type Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "es";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function getNavLinks(locale: Locale) {
  const t = getDictionary(locale).nav;
  return [
    { label: t.dtf, href: "/dtf-transfers" },
    { label: t.shirts, href: "/custom-shirts" },
    { label: t.apparel, href: "/blanks" },
    { label: t.mockup, href: "/mockup" },
    { label: t.gangSheet, href: "/gang-sheet" },
    { label: t.pricing, href: "/pricing" },
    { label: t.contact, href: "/contact" },
    { label: t.quote, href: "/#quote" },
  ];
}

export function getFooterLinks(locale: Locale) {
  const t = getDictionary(locale).footer;
  return {
    company: [
      { label: t.about, href: "/#why-us" },
      { label: t.contact, href: "/contact" },
      { label: t.quote, href: "/#quote" },
    ],
    resources: [
      { label: t.gangSheet, href: "/gang-sheet" },
      { label: t.pricing, href: "/pricing" },
      { label: t.artwork, href: "/artwork-requirements" },
      { label: t.turnaround, href: "/turnaround-time" },
    ],
    policies: [
      { label: t.privacy, href: "/privacy-policy" },
      { label: t.terms, href: "/terms-of-service" },
      { label: t.shipping, href: "/shipping-policy" },
      { label: t.refund, href: "/refund-policy" },
      { label: t.customOrder, href: "/custom-order-policy" },
    ],
    local: [
      { label: t.woodlands, href: "/dtf-transfers-the-woodlands" },
      { label: t.spring, href: "/custom-shirts-spring-tx" },
      { label: t.houston, href: "/dtf-printing-houston" },
      { label: t.conroe, href: "/gang-sheet-printing-conroe" },
    ],
  };
}

export { DEFAULT_LOCALE, LOCALE_COOKIE, type Dictionary, type Locale };
