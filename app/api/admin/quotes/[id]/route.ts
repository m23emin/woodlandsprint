import { NextResponse } from "next/server";
import { getQuoteById, updateQuote } from "@/lib/quotes";
import type { QuoteStatus } from "@/lib/quote-status";

const validStatuses: QuoteStatus[] = [
  "new",
  "reviewing",
  "quoted",
  "production",
  "ready",
  "completed",
  "declined",
];

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const quote = await getQuoteById(id);

  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ quote });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as { status?: QuoteStatus; internal_notes?: string | null };

  const patch: { status?: QuoteStatus; internal_notes?: string | null } = {};

  if (body.status) {
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    patch.status = body.status;
  }

  if (body.internal_notes !== undefined) {
    patch.internal_notes = body.internal_notes;
  }

  const result = await updateQuote(id, patch);
  if (!result.ok) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  const quote = await getQuoteById(id);
  return NextResponse.json({ quote });
}
