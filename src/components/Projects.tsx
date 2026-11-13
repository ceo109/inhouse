import Image from "next/image";
import { PROJECTS } from "@/lib/site";
import { EnquireButton } from "./Enquiry";
import { Icon } from "./Icon";
import { SectionHead, StatusTag } from "./SectionHead";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-16 md:py-24">
      <div className="wrap">
        <SectionHead id="projects-title" eyebrow="Our communities" title="Villas for Sale in Kochi">
          Explore gated villas and villa plots across Inhouse Projects communities in Vengola, Thiruvankulam, Kaitharam and
          Mulanthuruthy, all within easy reach of Kochi.
        </SectionHead>

        <div className="grid gap-7 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <StatusTag tone={p.statusTone} className="absolute top-4 left-4 shadow-md">
                  {p.status}
                </StatusTag>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{p.name}</p>
                <h3 className="mt-2 text-2xl leading-snug font-semibold">{p.headline}</h3>
                <p className="mt-3 text-muted">{p.summary}</p>

                <ul className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl bg-cream py-3 text-center">
                  {p.specs.map((s) => (
                    <li key={s.label} className="px-2">
                      <span className="block text-[0.7rem] font-semibold tracking-wider text-muted uppercase">{s.label}</span>
                      <span className="mt-0.5 block text-sm font-bold text-navy-deep sm:text-[0.95rem]">{s.value}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-5 grid gap-2 text-sm">
                  {p.meta.map((m) => (
                    <div key={m.label} className="flex flex-wrap justify-between gap-x-4 border-b border-dashed border-line pb-2">
                      <dt className="text-muted">{m.label}</dt>
                      <dd className="font-semibold text-navy-deep">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <EnquireButton project={p.name} className="btn btn-primary flex-1">
                    Enquire Now
                  </EnquireButton>
                  <EnquireButton project={p.name} intent="brochure" className="btn btn-outline flex-1">
                    <Icon name="download" />
                    Download Brochure
                  </EnquireButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
