import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createMiddlewareClient } from "@/lib/supabase/middleware";
import { isSupabaseAuthConfigured } from "@/lib/supabase/env";

const PUBLIC_ACCOUNT_PATHS = new Set([
  "/account/login",
  "/account/register",
  "/account/forgot-password",
  "/account/reset-password",
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  if (isSupabaseAuthConfigured()) {
    const { supabase, response: supabaseResponse } = createMiddlewareClient(request);
    response = supabaseResponse;

    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (pathname.startsWith("/account")) {
        const isPublic = PUBLIC_ACCOUNT_PATHS.has(pathname);

        if (!user && !isPublic) {
          const loginUrl = new URL("/account/login", request.url);
          loginUrl.searchParams.set("next", pathname);
          return NextResponse.redirect(loginUrl);
        }

        if (user && isPublic) {
          return NextResponse.redirect(new URL("/account", request.url));
        }
      }
    }
  } else if (pathname.startsWith("/account") && !PUBLIC_ACCOUNT_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  if (!pathname.startsWith("/admin")) {
    return response;
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (await verifyAdminSessionToken(token)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  if (pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout")) {
    return response;
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/api/admin/:path*"],
};
