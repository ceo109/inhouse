import { NextResponse } from "next/server";
import { validateLead, type LeadPayload } from "@/lib/lead";
import { isResendConfigured, sendLeadEmail } from "@/lib/lead-email";

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
  const deliveries: Promise<void>[] = [];

  if (isResendConfigured()) deliveries.push(sendLeadEmail(lead));
  if (webhook) {
    deliveries.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then((res) => {
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      }),
    );
  }

  if (!deliveries.length) {
    console.warn("[lead] No RESEND_API_KEY/LEAD_TO_EMAIL or LEAD_WEBHOOK_URL set; lead was not forwarded:", lead);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  const results = await Promise.allSettled(deliveries);
  for (const r of results) if (r.status === "rejected") console.error("[lead] delivery failed", r.reason, lead);

  // Succeed as long as the lead reached at least one destination.
  if (!results.some((r) => r.status === "fulfilled")) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry. Please call or WhatsApp us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
