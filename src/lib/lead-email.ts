import { Resend } from "resend";

export type Lead = {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
  intent: string;
  formLocation: string;
  tracking: Record<string, string>;
  submittedAt: string;
  userAgent: string;
};

const INTENT_LABEL: Record<string, string> = {
  enquiry: "Enquiry",
  brochure: "Brochure request",
  visit: "Site visit request",
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:6px 0;color:#111">${esc(value) || "—"}</td></tr>`;
}

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL);
}

/** Emails the lead to the sales inbox. Throws if Resend rejects it. */
export async function sendLeadEmail(lead: Lead) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.LEAD_TO_EMAIL!.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEAD_FROM_EMAIL || "Inhouse Villas <leads@inhouseprojects.online>";
  const intent = INTENT_LABEL[lead.intent] ?? lead.intent;
  const when = new Date(lead.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const tracking = Object.entries(lead.tracking).map(([k, v]) => row(k, v)).join("");

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;max-width:600px">
  <h2 style="margin:0 0 12px;color:#111">New ${esc(intent.toLowerCase())}: ${esc(lead.project)}</h2>
  <table style="border-collapse:collapse">
    ${row("Name", lead.name)}
    ${row("Phone", lead.phone)}
    ${row("Email", lead.email)}
    ${row("Project", lead.project)}
    ${row("Type", intent)}
    ${row("Message", lead.message)}
    ${row("Form", lead.formLocation)}
    ${row("Submitted", `${when} IST`)}
  </table>
  ${tracking ? `<h3 style="margin:20px 0 8px;font-size:13px;color:#666">Tracking</h3><table style="border-collapse:collapse;font-size:12px">${tracking}</table>` : ""}
</div>`;

  const text = [
    `New ${intent.toLowerCase()}: ${lead.project}`,
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Project: ${lead.project}`,
    `Type: ${intent}`,
    `Message: ${lead.message || "—"}`,
    `Form: ${lead.formLocation}`,
    `Submitted: ${when} IST`,
    ...Object.entries(lead.tracking).map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `${intent}: ${lead.project} – ${lead.name}`,
    html,
    text,
  });
  if (error) throw new Error(`Resend: ${error.name} – ${error.message}`);
}
