import { FORM_PROJECTS, type FormProject, type LeadIntent } from "./site";

export type LeadPayload = {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  project: FormProject | "";
  message?: string;
  intent: LeadIntent;
  formLocation: string;
  consent: boolean;
  /** Honeypot: real users leave it empty. */
  company?: string;
  tracking?: Record<string, string>;
};

export type LeadErrors = Partial<Record<"name" | "phone" | "email" | "project" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(p: LeadPayload): LeadErrors {
  const errors: LeadErrors = {};
  if (p.name.trim().length < 2) errors.name = "Please enter your name.";

  const digits = p.phone.replace(/\D/g, "");
  if (p.countryCode === "+91") {
    if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Enter a valid 10-digit mobile number.";
  } else if (digits.length < 6 || digits.length > 14) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!EMAIL_RE.test(p.email.trim())) errors.email = "Enter a valid email address.";
  if (!FORM_PROJECTS.includes(p.project as FormProject)) errors.project = "Please choose a project.";
  if (!p.consent) errors.consent = "Please allow us to contact you.";
  return errors;
}

export const COUNTRY_CODES = ["+91", "+971", "+966", "+974", "+965", "+968", "+973", "+1", "+44", "+61"] as const;

export const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
