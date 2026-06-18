import { NextResponse } from "next/server";
import { getCustomerProfile } from "@/app/actions/account";

export async function GET() {
  const profile = await getCustomerProfile();

  if (!profile) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    profile: {
      fullName: profile.full_name,
      phone: profile.phone,
      businessName: profile.business_name,
      email: profile.email,
    },
  });
}
