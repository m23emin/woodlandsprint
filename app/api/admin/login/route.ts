import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  getSessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  const body = (await request.json()) as { password?: string };
  const password = body.password?.trim() ?? "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, getSessionCookieOptions());

  return NextResponse.json({ ok: true });
}
