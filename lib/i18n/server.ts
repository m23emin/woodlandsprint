import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./types";

function parseLocale(value: string | undefined): Locale {
  return value === "en" || value === "es" ? value : DEFAULT_LOCALE;
}

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return parseLocale(value);
}
