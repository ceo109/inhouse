import { NextResponse } from "next/server";
import { validateLead, type LeadPayload } from "@/lib/lead";

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they don't retry.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateLead(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    name: body.name.trim(),
    phone: `${body.countryCode} ${body.phone.replace(/\D/g, "")}`,
    email: body.email.trim(),
    project: body.project,
    message: body.message?.trim() ?? "",
    intent: body.intent,
    formLocation: body.formLocation,
    tracking: body.tracking ?? {},
    submittedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[lead] LEAD_WEBHOOK_URL is not set; lead was not forwarded:", lead);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[lead] forwarding failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry. Please call or WhatsApp us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
