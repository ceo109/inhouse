import Image from "next/image";
import { CONTACT, MAP_LOCATIONS, whatsappLink } from "@/lib/site";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";

const POINTS = ["Villas from ₹85 Lakh", "Villa plots from ₹5.75 Lakh per cent", "RERA registered, transparent pricing"];

export function Closing() {
  return (
    <section id="contact" aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-navy-deep py-16 text-white md:py-24">
      <Image src="/img/caristo-drone.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <span className="eyebrow text-gold">Get special offers today</span>
          <h2 id="closing-title" className="text-3xl leading-tight font-semibold text-white md:text-5xl">
            Find Your Perfect Villa in Kochi
          </h2>
          <p className="mt-4 max-w-lg text-lg text-white/80">
            Tell us what you’re looking for. We’ll share prices, floor plans and available villas, and help you plan a site visit at a
            time that suits you.
          </p>
          <ul className="mt-6 grid gap-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-brand">
                  <Icon name="check" className="size-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${CONTACT.phone}`} className="btn btn-ghost-light">
              <Icon name="phone" />
              Call Now
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost-light">
              <Icon name="whatsapp" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 text-ink shadow-float sm:p-8">
          <h3 className="text-2xl font-semibold">Request a Callback</h3>
          <p className="mt-1 mb-5 text-sm text-muted">We usually respond within a few hours.</p>
          <LeadForm location="closing" showMessage />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0f0c35] pt-14 pb-28 text-white/70 md:pb-10">
      <div className="wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-white px-3 py-2">
            <Image src="/img/logo-sm.png" alt="Inhouse Projects" width={340} height={320} className="h-14 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm">Gated villas and villa plots across Ernakulam. Building better tomorrows since 2001.</p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Projects</h4>
          <ul className="grid gap-2 text-sm">
            {MAP_LOCATIONS.map((l) => (
              <li key={l.id}>
                {l.name}, {l.area}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="grid gap-2 text-sm">
            <li>{CONTACT.address.slice(1).join(", ")}</li>
            <li><a href={`tel:${CONTACT.phone}`} className="hover:text-white">{CONTACT.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-10 border-t border-white/10 pt-6 text-xs">
        <p>© {new Date().getFullYear()} Inhouse Projects. All rights reserved.</p>
        <p className="mt-2 text-white/45">
          Images are artist’s impressions. Prices, sizes and timelines are indicative and subject to change; please refer to the
          agreement for final terms. RERA details are available at rera.kerala.gov.in.
        </p>
      </div>
    </footer>
  );
}
