"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { COUNTRY_CODES, TRACKING_KEYS, validateLead, type LeadErrors, type LeadPayload } from "@/lib/lead";
import { CONTACT, FORM_PROJECTS, PROJECTS, whatsappLink, type FormProject, type LeadIntent } from "@/lib/site";
import { Icon } from "./Icon";

type Props = {
  location: string;
  defaultProject?: FormProject;
  intent?: LeadIntent;
  showMessage?: boolean;
  submitLabel?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function readTracking(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = { page_url: window.location.href };
  for (const key of TRACKING_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  try {
    // Keep first-touch UTMs across in-page navigation and reloads.
    const stored = JSON.parse(sessionStorage.getItem("lead_tracking") ?? "{}") as Record<string, string>;
    const merged = { ...out, ...stored, page_url: out.page_url };
    sessionStorage.setItem("lead_tracking", JSON.stringify(merged));
    return merged;
  } catch {
    return out;
  }
}

export function LeadForm({ location, defaultProject, intent = "enquiry", showMessage, submitLabel }: Props) {
  const uid = useId();
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [submittedProject, setSubmittedProject] = useState<FormProject | "">("");

  useEffect(() => {
    readTracking();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: LeadPayload = {
      name: String(fd.get("name") ?? ""),
      countryCode: String(fd.get("countryCode") ?? "+91"),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      project: String(fd.get("project") ?? "") as FormProject | "",
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
      intent,
      formLocation: location,
      tracking: readTracking(),
    };

    const v = validateLead(payload);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(v)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; errors?: LeadErrors };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error ?? "Something went wrong.");
      }
      setSubmittedProject(payload.project);
      setStatus("done");
      window.dataLayer?.push({ event: "lead_submit", form_location: location, project: payload.project, intent });
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    const brochure = PROJECTS.find((p) => p.name === submittedProject)?.brochureUrl;
    return (
      <div className="py-4 text-center" role="status">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
          <Icon name="check" className="size-7" />
        </span>
        <h4 className="font-display text-2xl text-navy-deep">Thank you!</h4>
        <p className="mt-2 text-muted">
          {intent === "brochure"
            ? brochure
              ? "Your brochure is ready to download. Our team will also call you shortly."
              : "Our team will send the brochure to your WhatsApp and email shortly."
            : intent === "visit"
              ? "Our team will call you shortly to fix a convenient time for your site visit."
              : "Our team will call you back shortly."}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {intent === "brochure" && brochure && (
            <a href={brochure} className="btn btn-primary" target="_blank" rel="noopener">
              <Icon name="download" />
              Download Brochure
            </a>
          )}
          <a href={whatsappLink()} className="btn btn-outline" target="_blank" rel="noopener">
            <Icon name="whatsapp" />
            WhatsApp us now
          </a>
        </div>
      </div>
    );
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (k: keyof LeadErrors) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-1 text-xs font-medium text-brand-dark">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof LeadErrors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? id(`${k}-err`) : undefined,
  });
  const label = "mb-1.5 block text-[0.8rem] font-semibold text-navy-deep";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5">
      <div>
        <label htmlFor={id("name")} className={label}>
          Name*
        </label>
        <input id={id("name")} name="name" autoComplete="name" placeholder="Your full name" className="field-input" {...a11y("name")} />
        {err("name")}
      </div>

      <div>
        <label htmlFor={id("phone")} className={label}>
          Phone number*
        </label>
        <div className="flex gap-2">
          <select name="countryCode" aria-label="Country code" defaultValue="+91" className="field-input w-[5.5rem] shrink-0 px-2">
            {COUNTRY_CODES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Mobile number"
            className="field-input"
            {...a11y("phone")}
          />
        </div>
        {err("phone")}
      </div>

      <div>
        <label htmlFor={id("email")} className={label}>
          Email*
        </label>
        <input id={id("email")} name="email" type="email" autoComplete="email" placeholder="you@example.com" className="field-input" {...a11y("email")} />
        {err("email")}
      </div>

      <div>
        <label htmlFor={id("project")} className={label}>
          Project*
        </label>
        <select id={id("project")} name="project" defaultValue={defaultProject ?? ""} className="field-input" {...a11y("project")}>
          <option value="" disabled>
            Select project
          </option>
          {FORM_PROJECTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {err("project")}
      </div>

      {showMessage && (
        <div>
          <label htmlFor={id("message")} className={label}>
            Message
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={3}
            placeholder="Preferred villa size, budget or visit time (optional)"
            className="field-input resize-y"
          />
        </div>
      )}

      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

      <label className="flex items-start gap-2 text-xs leading-snug text-muted">
        <input type="checkbox" name="consent" defaultChecked className="mt-0.5 size-4 shrink-0 accent-brand" {...a11y("consent")} />
        I agree to be contacted by Inhouse Projects by call, SMS or WhatsApp.
      </label>
      {err("consent")}

      <button type="submit" className="btn btn-primary mt-1 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : (submitLabel ?? (intent === "brochure" ? "Get Brochure" : "Submit Enquiry"))}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-brand-dark" role="alert">
          {serverError} Call <a className="font-semibold underline" href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>.
        </p>
      )}
    </form>
  );
}
