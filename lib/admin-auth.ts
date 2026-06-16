export const ADMIN_COOKIE = "wp_admin_session";
const SESSION_DAYS = 7;
const enc = new TextEncoder();

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < password.length; i++) {
    mismatch |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

async function signHmac(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToHex(new Uint8Array(signature));
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createAdminSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured");

  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const sig = await signHmac(secret, String(exp));
  return Buffer.from(JSON.stringify({ exp, sig })).toString("base64url");
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  try {
    const { exp, sig } = JSON.parse(Buffer.from(token, "base64url").toString()) as {
      exp: number;
      sig: string;
    };

    if (typeof exp !== "number" || typeof sig !== "string") return false;
    if (Date.now() > exp) return false;

    const expected = await signHmac(secret, String(exp));
    return timingSafeEqualHex(sig, expected);
  } catch {
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}
