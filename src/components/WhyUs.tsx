import Image from "next/image";
import { EnquireButton } from "./Enquiry";
import { CountUp } from "./CountUp";

const STATS = [
  { value: 25, suffix: "+", label: "Years of experience" },
  { value: 500, suffix: "+", label: "Happy families" },
  { value: 100, suffix: "%", label: "RERA registered projects" },
];

export function VisitBand() {
  return (
    <section aria-labelledby="visit-title" className="relative overflow-hidden bg-brand text-white">
      <div aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full border-[40px] border-white/10" />
      <div className="wrap relative flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14">
        <div>
          <h2 id="visit-title" className="text-3xl font-semibold text-white md:text-4xl">
            Visit the Home You’ve Been Dreaming Of
          </h2>
          <p className="mt-2 max-w-xl text-white/85">
            Walk through the communities, meet the families already living there, and see the quality for yourself.
          </p>
        </div>
        <EnquireButton intent="visit" className="btn btn-light shrink-0">
          Book a Site Visit
        </EnquireButton>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="py-16 md:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Why choose us?</span>
          <h2 id="why-title" className="text-3xl leading-tight font-semibold md:text-[2.6rem]">
            Why Choose Inhouse Projects for Villas in Kochi?
          </h2>
          <p className="mt-4 font-display text-xl text-brand italic">Building better tomorrows, with transparency since 2001.</p>
          <p className="mt-4 text-[1.05rem] text-muted">
            For 25 years, Inhouse Projects has built homes across Ernakulam with clear pricing, honest timelines and quality you can
            see. Every project is RERA registered, and every family gets a team that stays with them from the first visit to handover
            and beyond.
          </p>

          <ul className="mt-8 grid grid-cols-3 gap-3">
            {STATS.map((s) => (
              <li key={s.label} className="rounded-2xl border border-line p-4 text-center md:p-5">
                <p className="font-display text-3xl font-bold text-navy md:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium text-muted md:text-sm">{s.label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-5 rounded-2xl bg-navy p-5 text-white md:p-6">
            <span className="font-display text-5xl leading-none font-bold text-gold">23</span>
            <p className="text-white/85">
              <strong className="block text-white">23 villas handed over at Seventh Avenue.</strong>
              Real homes, real families, ready for you to visit.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-5 gap-3">
          <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-2xl">
            <Image src="/img/caristo-gate.jpg" alt="Gated entrance at Inhouse Caristo" fill sizes="(min-width:1024px) 360px, 60vw" className="object-cover" />
          </div>
          <div className="col-span-2 grid gap-3 self-end">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/img/solace-villa.jpg" alt="Villa at SolaceAve, Mulanthuruthy" fill sizes="(min-width:1024px) 240px, 40vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/img/caristo-pool.jpg" alt="Clubhouse pool at Inhouse Caristo" fill sizes="(min-width:1024px) 240px, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
