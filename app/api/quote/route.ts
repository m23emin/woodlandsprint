import { Resend } from "resend";
import { NextResponse } from "next/server";
import { saveQuoteRequest } from "@/lib/quotes";

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const formData = await request.formData();

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

  const designEntry = formData.get("design");
  const design = designEntry instanceof File && designEntry.size > 0 ? designEntry : null;

  const dbResult = await saveQuoteRequest({
    name,
    phone,
    email,
    businessName,
    service,
    quantity,
    needBy,
    notes,
    design,
  });

  const attachments = design
    ? [
        {
          filename: design.name,
          content: Buffer.from(await design.arrayBuffer()),
          contentType: design.type || undefined,
        },
      ]
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
    ...(dbResult.saved ? [["Admin ID", dbResult.id] as const] : []),
  ];

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
    ${dbResult.saved ? `<p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin/quotes/${dbResult.id}">View in admin panel</a></p>` : ""}
  `.trim();

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const subjectParts = [service || "Quote", quantity ? `(${quantity})` : "", `— ${name}`].filter(Boolean);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New quote: ${subjectParts.join(" ")}`,
    html,
    text,
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send quote request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, quoteId: dbResult.saved ? dbResult.id : null });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
