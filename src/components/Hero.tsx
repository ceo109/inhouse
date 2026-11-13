import Image from "next/image";
import { whatsappLink } from "@/lib/site";
import { Icon, type IconName } from "./Icon";
import { LeadForm } from "./LeadForm";

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "RERA registered projects" },
  { icon: "award", label: "25 years of experience" },
  { icon: "heart", label: "500+ happy families" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image
        src="/img/caristo-villa.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[center_40%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy-deep/40" />

      <div className="wrap grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-24">
        <div>
          <span className="eyebrow text-gold">Gated villas &amp; villa plots · Ernakulam</span>
          <h1 id="hero-title" className="text-[2.35rem] leading-[1.08] font-semibold text-white sm:text-5xl lg:text-[3.6rem]">
            Find Your Perfect Villa in Kochi
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Premium gated villas and villa plots across Ernakulam. Villas from{" "}
            <strong className="text-white">₹85 Lakh</strong> and plots from{" "}
            <strong className="text-white">₹5.75 Lakh per cent</strong>. Built with transparency since 2001.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium backdrop-blur">
                <Icon name={t.icon} className="size-4 text-gold" />
                {t.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-light">
              Explore Projects
              <Icon name="arrow" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost-light">
              <Icon name="whatsapp" />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div id="enquire" className="rounded-2xl bg-white p-6 text-ink shadow-float sm:p-7">
          <h2 className="text-2xl font-semibold">Get Price &amp; Brochure</h2>
          <p className="mt-1 mb-5 text-sm text-muted">Share your details. Our team will call you back shortly.</p>
          <LeadForm location="hero" />
        </div>
      </div>
    </section>
  );
}
