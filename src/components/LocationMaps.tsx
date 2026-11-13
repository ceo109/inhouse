"use client";

import { useState } from "react";
import { CONTACT, MAP_LOCATIONS, mapEmbedUrl } from "@/lib/site";
import { EnquireButton } from "./Enquiry";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import { TabList } from "./Tabs";

export function LocationMaps() {
  const [active, setActive] = useState<string>(MAP_LOCATIONS[0].id);
  const loc = MAP_LOCATIONS.find((l) => l.id === active) ?? MAP_LOCATIONS[0];

  return (
    <section id="location" aria-labelledby="location-title" className="bg-cream py-16 md:py-24">
      <div className="wrap">
        <SectionHead id="location-title" eyebrow="Lifestyle and location" title="Visit Now">
          Our communities sit in calm, green neighbourhoods on Kochi’s eastern side, with quick access to the city, Infopark,
          hospitals, schools and the airport.
        </SectionHead>

        <TabList
          variant="pills"
          label="Project locations"
          active={active}
          onChange={setActive}
          tabs={MAP_LOCATIONS.map((l) => ({
            id: l.id,
            label: (
              <>
                {l.name}
                <span className="block text-xs font-normal opacity-70">{l.area}</span>
              </>
            ),
          }))}
        />

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div role="tabpanel" id={`panel-${loc.id}`} aria-labelledby={`tab-${loc.id}`} className="overflow-hidden rounded-2xl bg-sand shadow-card">
            <iframe
              key={loc.id}
              title={`Map: ${loc.name}, ${loc.area}`}
              src={mapEmbedUrl(loc.query)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[340px] w-full border-0 md:h-[440px]"
            />
          </div>

          <aside className="flex flex-col rounded-2xl bg-white p-6 shadow-card md:p-7">
            <h3 className="text-2xl font-semibold">Head Office</h3>
            <ul className="mt-5 grid gap-4 text-ink/85">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  {CONTACT.address.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  <a href={`tel:${CONTACT.phone}`} className="block hover:text-brand">{CONTACT.phoneDisplay}</a>
                  <a href={`tel:${CONTACT.office}`} className="block hover:text-brand">{CONTACT.officeDisplay}</a>
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 size-5 shrink-0 text-brand" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-brand">{CONTACT.email}</a>
              </li>
            </ul>
            <div className="mt-auto pt-6">
              <EnquireButton intent="visit" className="btn btn-primary w-full">
                Schedule a Site Visit
              </EnquireButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
