import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";
import { getSiteUrl } from "@/lib/site-url";

function redirectOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (process.env.NODE_ENV !== "development" && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  if (process.env.NODE_ENV !== "development") {
    return getSiteUrl();
  }

  return request.nextUrl.origin;
}

/**
 * Supabase email confirmation / password-recovery callback (PKCE `code` exchange).
 * Add in Supabase → Authentication → URL Configuration → Redirect URLs:
 *   https://www.woodlandsprint.com/auth/callback
 *   http://localhost:3000/auth/callback
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next")?.startsWith("/")
    ? requestUrl.searchParams.get("next")!
    : "/account";
  const origin = redirectOrigin(request);
  const loginErrorUrl = new URL("/account/login", origin);
  loginErrorUrl.searchParams.set("error", "confirmation");

  const authError = requestUrl.searchParams.get("error");
  if (authError) {
    return NextResponse.redirect(loginErrorUrl);
  }

  if (!code) {
    // Implicit / hash flow — client page reads #access_token from the URL
    const confirmUrl = new URL("/auth/confirm", origin);
    confirmUrl.searchParams.set("next", next);
    return NextResponse.redirect(confirmUrl);
  }

  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseAnonKey();
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const redirectUrl = new URL(next, origin);
  let response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback exchangeCodeForSession:", error.message);
    return NextResponse.redirect(loginErrorUrl);
  }

  return response;
}
