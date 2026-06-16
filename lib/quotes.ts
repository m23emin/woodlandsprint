import { getSupabaseAdmin, QUOTE_DESIGNS_BUCKET } from "@/lib/supabase/admin";
import type { QuoteRecord, QuoteStatus } from "@/lib/quote-status";

export type SaveQuoteInput = {
  name: string;
  phone: string;
  email: string;
  businessName?: string;
  service?: string;
  quantity?: string;
  needBy?: string;
  notes?: string;
  design?: File | null;
};

export async function saveQuoteRequest(input: SaveQuoteInput) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { saved: false as const, reason: "not_configured" as const };

  const { data: quote, error } = await supabase
    .from("quotes")
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email,
      business_name: input.businessName || null,
      service: input.service || null,
      quantity: input.quantity || null,
      need_by: input.needBy || null,
      notes: input.notes || null,
      status: "new",
      internal_notes: null,
      design_path: null,
      design_filename: null,
    })
    .select("id")
    .single();

  if (error || !quote) {
    logSupabaseError("insert quote", error);
    return { saved: false as const, reason: "insert_failed" as const };
  }

  if (input.design && input.design.size > 0) {
    const path = `${quote.id}/${Date.now()}-${sanitizeFilename(input.design.name)}`;
    const buffer = Buffer.from(await input.design.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(QUOTE_DESIGNS_BUCKET)
      .upload(path, buffer, {
        contentType: input.design.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      logSupabaseError("upload design", uploadError);
    } else {
      await supabase
        .from("quotes")
        .update({ design_path: path, design_filename: input.design.name })
        .eq("id", quote.id);
    }
  }

  return { saved: true as const, id: quote.id };
}

export async function listQuotes(): Promise<QuoteRecord[] | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    logSupabaseError("list quotes", error);
    return null;
  }

  return data as QuoteRecord[];
}

export async function getQuoteById(id: string): Promise<QuoteRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("quotes").select("*").eq("id", id).single();
  if (error) return null;
  return data as QuoteRecord;
}

export async function updateQuote(
  id: string,
  patch: { status?: QuoteStatus; internal_notes?: string | null },
) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false as const };

  const { error } = await supabase.from("quotes").update(patch).eq("id", id);
  if (error) {
    logSupabaseError("update quote", error);
    return { ok: false as const };
  }

  return { ok: true as const };
}

export async function getDesignSignedUrl(path: string, expiresIn = 3600) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.storage.from(QUOTE_DESIGNS_BUCKET).createSignedUrl(path, expiresIn);
  if (error) return null;
  return data.signedUrl;
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function logSupabaseError(action: string, error: unknown) {
  if (error && typeof error === "object") {
    const record = error as { message?: string; code?: string; hint?: string };
    console.error(`Supabase ${action} error:`, {
      message: record.message?.slice(0, 200),
      code: record.code,
      hint: record.hint,
    });
    return;
  }
  console.error(`Supabase ${action} error:`, error);
}
