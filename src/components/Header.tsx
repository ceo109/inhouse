import Image from "next/image";
import { CONTACT } from "@/lib/site";
import { EnquireButton } from "./Enquiry";
import { Icon } from "./Icon";

const NAV = [
  ["#projects", "Projects"],
  ["#compare", "Compare"],
  ["#details", "Details"],
  ["#why-us", "Why Us"],
  ["#location", "Location"],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <a href="#top" aria-label="Inhouse Projects, back to top" className="shrink-0">
          <Image src="/img/logo-sm.png" alt="Inhouse Projects" width={340} height={320} priority className="h-12 w-auto md:h-14" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-medium text-ink/80 transition hover:text-brand">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href={`tel:${CONTACT.phone}`} className="hidden items-center gap-2 text-sm font-semibold text-navy sm:flex">
            <Icon name="phone" className="size-4 text-brand" />
            {CONTACT.phoneDisplay}
          </a>
          <EnquireButton className="btn btn-primary btn-sm">Enquire Now</EnquireButton>
        </div>
      </div>
    </header>
  );
}
