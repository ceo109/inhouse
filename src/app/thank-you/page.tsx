import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { CONTACT, PROJECTS, whatsappLink } from "@/lib/site";

// Every successful lead form submission lands here (full page load), so GTM can track
// conversions with a Page View trigger on "Page Path equals /thank-you".
export const metadata: Metadata = {
  title: "Thank You | Inhouse Projects",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ intent?: string; project?: string }>;

export default async function ThankYouPage({ searchParams }: { searchParams: SearchParams }) {
  const { intent, project } = await searchParams;
  const brochure = PROJECTS.find((p) => p.name === project)?.brochureUrl;

  const message =
    intent === "brochure"
      ? brochure
        ? "Your brochure is ready to download. Our team will also call you shortly."
        : "Our team will send the brochure to your WhatsApp and email shortly."
      : intent === "visit"
        ? "Our team will call you shortly to fix a convenient time for your site visit."
        : "Our team will call you back shortly.";

  return (
    <main className="grid min-h-dvh place-items-center bg-brand-soft/40 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg md:p-10">
        <a href="/" aria-label="Inhouse Projects home" className="inline-block">
          <Image src="/img/logo-sm.png" alt="Inhouse Projects" width={340} height={320} priority className="mx-auto h-16 w-auto" />
        </a>
        <span className="mx-auto mt-6 mb-4 grid size-16 place-items-center rounded-full bg-brand-soft text-brand">
          <Icon name="check" className="size-8" />
        </span>
        <h1 className="font-display text-3xl text-navy-deep">Thank you!</h1>
        <p className="mt-3 text-muted">
          We’ve received your {project ? `enquiry for ${project}` : "enquiry"}. {message}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
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
        <p className="mt-6 text-sm text-muted">
          Prefer to talk now? Call{" "}
          <a href={`tel:${CONTACT.phone}`} className="font-semibold text-navy underline">
            {CONTACT.phoneDisplay}
          </a>
        </p>
        <a href="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
          <Icon name="home" className="size-4" />
          Back to home
        </a>
      </div>
    </main>
  );
}
