/** Canonical site URL — always prefers www.woodlandsprint.com in production. */
export function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  return "https://www.woodlandsprint.com";
}
