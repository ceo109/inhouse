import { COMPARISON } from "@/lib/site";
import { EnquireButton } from "./Enquiry";
import { SectionHead, StatusTag } from "./SectionHead";

const COLS = ["Location", "Type", "Size", "Starting Price", "Status"] as const;

export function CompareTable() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="bg-cream py-16 md:py-24">
      <div className="wrap">
        <SectionHead id="compare-title" eyebrow="Side by side" title="Find the Right Home in Kochi at the Right Price" />

        {/* Desktop/tablet: table. Mobile: each row becomes a card. */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-card max-md:bg-transparent max-md:shadow-none">
          <table className="w-full border-collapse text-left max-md:block">
            <thead className="bg-navy text-white max-md:hidden">
              <tr>
                <th scope="col" className="px-5 py-4 text-sm font-semibold">Project</th>
                {COLS.map((c) => (
                  <th key={c} scope="col" className="px-5 py-4 text-sm font-semibold">{c}</th>
                ))}
                <th scope="col" className="px-5 py-4"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody className="max-md:grid max-md:gap-4">
              {COMPARISON.map((r) => {
                const cells = [r.location, r.type, r.size, r.price];
                return (
                  <tr
                    key={r.project}
                    className="border-b border-line last:border-0 max-md:block max-md:rounded-2xl max-md:border-0 max-md:bg-white max-md:p-5 max-md:shadow-card"
                  >
                    <th scope="row" className="px-5 py-5 font-display text-lg font-semibold text-navy-deep max-md:block max-md:p-0 max-md:pb-3 max-md:text-xl">
                      {r.project}
                    </th>
                    {cells.map((v, i) => (
                      <td
                        key={COLS[i]}
                        className={`px-5 py-5 max-md:flex max-md:justify-between max-md:gap-4 max-md:border-t max-md:border-line max-md:px-0 max-md:py-2.5 ${i === 3 ? "font-bold text-brand" : ""}`}
                      >
                        <span className="text-sm font-normal text-muted md:hidden">{COLS[i]}</span>
                        {v}
                      </td>
                    ))}
                    <td className="px-5 py-5 max-md:flex max-md:items-center max-md:justify-between max-md:border-t max-md:border-line max-md:px-0 max-md:py-2.5">
                      <span className="text-sm text-muted md:hidden">Status</span>
                      <StatusTag tone={r.tone}>{r.status}</StatusTag>
                    </td>
                    <td className="px-5 py-5 text-right max-md:block max-md:px-0 max-md:pt-4 max-md:pb-0">
                      <EnquireButton project={r.project} className="btn btn-primary btn-sm max-md:w-full">
                        Enquire
                      </EnquireButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
