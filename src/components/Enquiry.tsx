"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { FormProject, LeadIntent } from "@/lib/site";
import { Icon } from "./Icon";
import { LeadForm } from "./LeadForm";

type OpenArgs = { project?: FormProject; intent?: LeadIntent };
const EnquiryContext = createContext<(args?: OpenArgs) => void>(() => {});

const COPY: Record<LeadIntent, { title: string; sub: string }> = {
  enquiry: { title: "Enquire Now", sub: "Share your details and our team will call you back shortly." },
  brochure: { title: "Download Brochure", sub: "Get the brochure with floor plans, specifications and pricing." },
  visit: { title: "Book a Site Visit", sub: "Tell us which community you’d like to see and we’ll fix a time." },
};

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [args, setArgs] = useState<OpenArgs & { n: number }>({ n: 0 });

  const open = useCallback((next: OpenArgs = {}) => {
    setArgs((prev) => ({ ...next, n: prev.n + 1 }));
    ref.current?.showModal();
  }, []);

  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close(); // click on backdrop
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  const intent = args.intent ?? "enquiry";

  return (
    <EnquiryContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="modal-title"
        className="m-auto w-[min(440px,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-6 shadow-float open:animate-[pop_.2s_ease-out] sm:p-8"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full text-muted transition hover:bg-sand hover:text-ink"
        >
          <Icon name="x" className="size-5" />
        </button>
        <h3 id="modal-title" className="pr-8 text-2xl font-semibold">
          {COPY[intent].title}
          {args.project && <span className="block text-base font-medium text-brand">{args.project}</span>}
        </h3>
        <p className="mt-1 mb-5 text-sm text-muted">{COPY[intent].sub}</p>
        {/* Remount per open so the selected project and status reset. */}
        <LeadForm key={args.n} location={`modal-${intent}`} defaultProject={args.project} intent={intent} />
      </dialog>
    </EnquiryContext.Provider>
  );
}

export function EnquireButton({
  project,
  intent,
  className = "btn btn-primary",
  children,
}: OpenArgs & { className?: string; children: ReactNode }) {
  const open = useContext(EnquiryContext);
  return (
    <button type="button" className={className} onClick={() => open({ project, intent })}>
      {children}
    </button>
  );
}
