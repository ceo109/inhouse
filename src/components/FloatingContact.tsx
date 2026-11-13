import { CONTACT, whatsappLink } from "@/lib/site";
import { EnquireButton } from "./Enquiry";
import { Icon } from "./Icon";

export function FloatingContact() {
  return (
    <>
      {/* Desktop: floating WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-30 hidden size-14 place-items-center rounded-full bg-whatsapp text-white shadow-float transition hover:scale-105 md:grid"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" />
        <Icon name="whatsapp" className="relative size-7" />
      </a>

      {/* Mobile: bottom action bar */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(23_19_77/0.25)] md:hidden"
      >
        <a href={`tel:${CONTACT.phone}`} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-navy">
          <Icon name="phone" className="size-5" />
          Call
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener" className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-[#128c4a]">
          <Icon name="whatsapp" className="size-5" />
          WhatsApp
        </a>
        <EnquireButton className="flex flex-col items-center gap-1 bg-brand py-2.5 text-xs font-semibold text-white">
          <Icon name="mail" className="size-5" />
          Enquire
        </EnquireButton>
      </nav>
    </>
  );
}
