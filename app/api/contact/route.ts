import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { siteContact } from "@/lib/site-config";

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 3, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const formData = await request.formData();

  if (getString(formData.get("website"))) {
    return NextResponse.json({ ok: true });
  }

  const name = getString(formData.get("name"));
  const email = getString(formData.get("email"));
  const phone = getString(formData.get("phone"));
  const message = getString(formData.get("message"));

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Message", message],
  ];

  const html = `
    <h2>Contact form message</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:600;vertical-align:top;">${label}</td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
  `.trim();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Contact: ${name}`,
    html,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
  });

  if (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  // Auto-reply to customer
  await resend.emails.send({
    from: fromEmail,
    to: email,
    replyTo: toEmail,
    subject: "We received your message — Woodlands Print",
    html: `
      <p>Hi ${escapeHtml(name.split(" ")[0] || name)},</p>
      <p>Thanks for contacting Woodlands Print. We received your message and will reply soon.</p>
      <p>For faster help, call <a href="tel:${siteContact.phone}">${siteContact.phone}</a>.</p>
      <p>— Woodlands Print</p>
    `,
    text: `Hi ${name},\n\nThanks for contacting Woodlands Print. We received your message and will reply soon.\n\nCall ${siteContact.phone} for faster help.\n\n— Woodlands Print`,
  });

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
