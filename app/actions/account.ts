"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customerQuoteColumns, type CustomerProfile } from "@/lib/account";
import { createClient, tryCreateClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/env";

export async function signUpAction(_prev: unknown, formData: FormData) {
  if (!isSupabaseAuthConfigured()) {
    return { error: "Account sign-up is not configured yet." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const businessName = String(formData.get("businessName") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || null,
        business_name: businessName || null,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect("/account");
  }

  redirect("/account/login?registered=1");
}

export async function signInAction(_prev: unknown, formData: FormData) {
  if (!isSupabaseAuthConfigured()) {
    return { error: "Account login is not configured yet." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/account");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Invalid email or password." };
  }

  redirect(next.startsWith("/account") ? next : "/account");
}

export async function signOutAction() {
  const supabase = await tryCreateClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/");
}

export async function updateProfileAction(_prev: unknown, formData: FormData) {
  const supabase = await tryCreateClient();
  if (!supabase) {
    return { error: "Account system is not configured." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const businessName = String(formData.get("businessName") ?? "").trim();

  if (!fullName) {
    return { error: "Name is required." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
      business_name: businessName || null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Could not save profile. Try again." };
  }

  revalidatePath("/account");
  return { ok: true as const };
}

export async function getSessionUser() {
  const supabase = await tryCreateClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCustomerProfile(): Promise<CustomerProfile | null> {
  const supabase = await tryCreateClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  if (!profile) {
    return {
      id: user.id,
      full_name: user.user_metadata?.full_name ?? "",
      phone: user.user_metadata?.phone ?? null,
      business_name: user.user_metadata?.business_name ?? null,
      email: user.email ?? "",
      created_at: user.created_at,
      updated_at: user.updated_at ?? user.created_at,
    };
  }

  return {
    id: profile.id,
    full_name: profile.full_name,
    phone: profile.phone,
    business_name: profile.business_name,
    email: user.email ?? "",
    created_at: profile.created_at,
    updated_at: profile.updated_at,
  };
}

export async function getCustomerQuotes() {
  const supabase = await tryCreateClient();
  if (!supabase) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("quotes")
    .select(customerQuoteColumns)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getCustomerQuote(id: string) {
  const supabase = await tryCreateClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("quotes")
    .select(customerQuoteColumns)
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  return data;
}
