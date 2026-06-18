type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/** Simple in-memory rate limiter for API routes (resets on cold start). */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false as const, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true as const, remaining: limit - entry.count };
}

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
