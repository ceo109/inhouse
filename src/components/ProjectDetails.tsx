"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { CARISTO_DETAILS as C, CONTACT, SEVENTH_DETAILS as S } from "@/lib/site";
import { EnquireButton } from "./Enquiry";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import { TabList } from "./Tabs";

const TABS = [
  { id: "caristo", label: "Inhouse Caristo" },
  { id: "seventh", label: "Seventh Avenue" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 md:p-7">
      <h4 className="mb-4 font-display text-xl font-semibold text-navy-deep">{title}</h4>
      {children}
    </div>
  );
}

function DistanceList({ items }: { items: { place: string; value: string }[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((d) => (
        <li key={d.place} className="flex items-center justify-between gap-4 py-2.5">
          <span className="flex items-center gap-2.5 text-ink/85">
            <Icon name="pin" className="size-4 shrink-0 text-brand" />
            {d.place}
          </span>
          <b className="shrink-0 rounded-full bg-brand-soft px-2.5 py-0.5 text-sm text-brand-dark">{d.value}</b>
        </li>
      ))}
    </ul>
  );
}

function Caristo() {
  return (
    <div className="grid gap-6">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-[1.75rem] leading-tight font-semibold md:text-[2.1rem]">{C.title}</h3>
          <p className="mt-4 text-[1.05rem] text-muted">{C.intro}</p>
          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-navy px-4 py-2 text-sm text-white">
            <Icon name="calendar" className="size-4 text-gold" />
            Expected completion: <strong>{C.completion}</strong>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {C.gallery.map((g, i) => (
            <div key={g.src} className={`relative overflow-hidden rounded-xl bg-sand ${i === 0 ? "col-span-3 aspect-[16/9]" : "aspect-[4/3]"}`}>
              <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width:1024px) 600px, 100vw" : "200px"} className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Block title="Project Highlights">
          <ul className="grid gap-3">
            {C.highlights.map((h) => (
              <li key={h.text} className="flex gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="check" className="size-3" />
                </span>
                <span className="text-ink/85">
                  {h.lead && <strong className="text-navy-deep">{h.lead} </strong>}
                  {h.text}
                </span>
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Location Advantages">
          <DistanceList items={C.travel} />
          <p className="mt-4 text-ink/85">{C.nearby}</p>
          <p className="mt-3 text-xs text-muted italic">{C.travelNote}</p>
        </Block>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {C.callouts.map((c) => (
          <div key={c.title} className="flex gap-4 rounded-2xl bg-cream p-6 md:p-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-card">
              <Icon name={c.icon} className="size-6" />
            </span>
            <div>
              <h4 className="font-display text-lg font-semibold text-navy-deep">{c.title}</h4>
              <p className="mt-1.5 text-ink/80">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <EnquireButton project="Inhouse Caristo" intent="visit">Book a Site Visit</EnquireButton>
        <EnquireButton project="Inhouse Caristo" intent="brochure" className="btn btn-outline">
          <Icon name="download" />
          Download Caristo Brochure
        </EnquireButton>
      </div>
    </div>
  );
}

function Seventh() {
  const pct = Math.round((S.handedOver / S.total) * 100);
  return (
    <div className="grid gap-6">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-[1.75rem] leading-tight font-semibold md:text-[2.1rem]">{S.title}</h3>
          <p className="mt-4 text-[1.05rem] text-muted">{S.intro}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {S.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-line bg-white p-3.5">
                <dt className="text-[0.7rem] font-semibold tracking-wider text-muted uppercase">{f.label}</dt>
                <dd className="mt-1 font-bold text-navy-deep">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[2/1] bg-sand">
            <Image src="/img/seventh-villa.jpg" alt="Seventh Avenue villas at Thiruvankulam" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/95 p-4 shadow-float backdrop-blur sm:right-auto sm:w-64">
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-bold text-brand">{S.handedOver}</span>
              <span className="text-muted">/ {S.total} villas handed over</span>
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-sand" role="img" aria-label={`${pct}% handed over`}>
              <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Block title="Amenities">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {S.amenities.map((a) => (
              <li key={a.label} className="flex flex-col items-start gap-2.5 rounded-xl bg-cream p-3.5 text-sm font-medium text-navy-deep">
                <Icon name={a.icon} className="size-6 text-brand" />
                {a.label}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Location">
          <p className="mb-3 flex gap-2 font-medium text-navy-deep">
            <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-brand" />
            {S.address}
          </p>
          <DistanceList items={S.distances} />
        </Block>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-navy p-6 text-white md:flex-row md:p-8">
        <div className="text-center md:text-left">
          <p className="text-white/75">For site visits and bookings, call</p>
          <a href={`tel:${CONTACT.phone}`} className="mt-1 inline-flex items-center gap-2.5 font-display text-3xl font-semibold">
            <Icon name="phone" className="size-6 text-gold" />
            95449 09991
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <EnquireButton project="Seventh Avenue" intent="visit" className="btn btn-primary">Book a Site Visit</EnquireButton>
          <EnquireButton project="Seventh Avenue" intent="brochure" className="btn btn-light">
            <Icon name="download" />
            Download Brochure
          </EnquireButton>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetails() {
  const [active, setActive] = useState("caristo");
  return (
    <section id="details" aria-labelledby="details-title" className="py-16 md:py-24">
      <div className="wrap">
        <SectionHead id="details-title" eyebrow="Project details" title="Everything You Need to Know" />
        <TabList tabs={TABS} active={active} onChange={setActive} label="Projects" />
        {TABS.map((t) => (
          <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id} className="pt-8 md:pt-10">
            {t.id === "caristo" ? <Caristo /> : <Seventh />}
          </div>
        ))}
      </div>
    </section>
  );
}
