import { Resend } from "resend";
import { NextResponse } from "next/server";
import { buildStatusChangeEmail } from "@/lib/quote-emails";
import { getQuoteById, updateQuote } from "@/lib/quotes";
import type { QuoteStatus } from "@/lib/quote-status";
import { getSiteUrl } from "@/lib/site-url";

const validStatuses: QuoteStatus[] = [
  "new",
  "reviewing",
  "quoted",
  "production",
  "ready",
  "completed",
  "declined",
];

const NOTIFY_STATUSES = new Set<QuoteStatus>(["reviewing", "quoted", "production", "ready", "completed", "declined"]);

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
  const body = (await request.json()) as {
    status?: QuoteStatus;
    internal_notes?: string | null;
    quoted_amount?: number | null;
    quoted_message?: string | null;
  };

  const existing = await getQuoteById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const patch: {
    status?: QuoteStatus;
    internal_notes?: string | null;
    quoted_amount?: number | null;
    quoted_message?: string | null;
  } = {};

  if (body.status) {
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    patch.status = body.status;
  }

  if (body.internal_notes !== undefined) {
    patch.internal_notes = body.internal_notes;
  }

  if (body.quoted_amount !== undefined) {
    patch.quoted_amount = body.quoted_amount;
  }

  if (body.quoted_message !== undefined) {
    patch.quoted_message = body.quoted_message;
  }

  const result = await updateQuote(id, patch);
  if (!result.ok) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  const quote = await getQuoteById(id);
  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const statusChanged = patch.status && patch.status !== existing.status;
  let emailSent = false;

  if (statusChanged && patch.status && NOTIFY_STATUSES.has(patch.status)) {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.QUOTE_FROM_EMAIL;

    if (apiKey && fromEmail) {
      const email = buildStatusChangeEmail({
        name: quote.name,
        service: quote.service,
        status: patch.status,
        quotedAmount: quote.quoted_amount,
        quotedMessage: quote.quoted_message,
        siteUrl: getSiteUrl(),
      });

      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: quote.email,
        replyTo: process.env.QUOTE_TO_EMAIL ?? fromEmail,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });

      emailSent = !error;
      if (error) console.error("Status email error:", error);
    }
  }

  return NextResponse.json({ quote, emailSent });
}
