import { Resend } from "resend";
import { NextResponse } from "next/server";
import { buildCustomerQuoteEmail } from "@/lib/quote-emails";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getAdminQuoteUrl, saveQuoteRequest } from "@/lib/quotes";
import { getSiteUrl } from "@/lib/site-url";
import { tryCreateClient } from "@/lib/supabase/server";

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

const NOTIFY_STATUSES = new Set(["reviewing", "quoted", "production", "ready", "completed", "declined"]);

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`quote:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const formData = await request.formData();

  // Honeypot — bots fill hidden fields
  if (getString(formData.get("website"))) {
    return NextResponse.json({ ok: true });
  }

  const name = getString(formData.get("name"));
  const phone = getString(formData.get("phone"));
  const email = getString(formData.get("email"));
  const businessName = getString(formData.get("businessName"));
  const service = getString(formData.get("service"));
  const quantity = getString(formData.get("quantity"));
  const needBy = getString(formData.get("needBy"));
  const notes = getString(formData.get("notes"));

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Name, phone, and email are required." },
      { status: 400 },
    );
  }

  const designEntries = formData.getAll("design");
  const designs = designEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);

  let userId: string | null = null;
  const supabase = await tryCreateClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  }

  const dbResult = await saveQuoteRequest({
    name,
    phone,
    email,
    businessName,
    service,
    quantity,
    needBy,
    notes,
    designs,
    userId,
  });

  const attachments =
    designs.length > 0
      ? await Promise.all(
          designs.map(async (design) => ({
            filename: design.name,
            content: Buffer.from(await design.arrayBuffer()),
            contentType: design.type || undefined,
          })),
        )
      : undefined;

  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Business", businessName || "Not specified"],
    ["Service", service || "Not specified"],
    ["Quantity", quantity || "Not specified"],
    ["Need By", needBy || "Not specified"],
    ["Notes", notes || "None"],
    ...(designs.length > 1 ? [[`Design files`, `${designs.length} attached`] as const] : []),
    ...(dbResult.saved ? [["Admin ID", dbResult.id] as const] : []),
  ];

  const siteUrl = getSiteUrl();
  const adminUrl = dbResult.saved ? getAdminQuoteUrl(dbResult.id) : "";

  const html = `
    <h2>New quote request</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:600;vertical-align:top;">${label}</td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    ${adminUrl ? `<p><a href="${adminUrl}">View in admin panel</a></p>` : ""}
  `.trim();

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const subjectParts = [service || "Quote", quantity ? `(${quantity})` : "", `— ${name}`].filter(Boolean);

  const resend = new Resend(apiKey);
  const { error: adminError } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New quote: ${subjectParts.join(" ")}`,
    html,
    text,
    attachments,
  });

  if (adminError) {
    console.error("Resend admin error:", adminError);
    return NextResponse.json(
      {
        error: "Failed to send quote request.",
        quoteId: dbResult.saved ? dbResult.id : null,
        saved: dbResult.saved,
      },
      { status: 502 },
    );
  }

  const customerEmail = buildCustomerQuoteEmail({
    name,
    email,
    service,
    quantity,
    siteUrl,
    hasAccount: Boolean(userId),
  });

  const { error: customerError } = await resend.emails.send({
    from: fromEmail,
    to: email,
    replyTo: toEmail,
    subject: customerEmail.subject,
    html: customerEmail.html,
    text: customerEmail.text,
  });

  return NextResponse.json({
    ok: true,
    quoteId: dbResult.saved ? dbResult.id : null,
    customerEmailSent: !customerError,
    ...(customerError ? { customerEmailWarning: true } : {}),
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
