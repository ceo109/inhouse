import type { ReactNode } from "react";

export function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="text-3xl leading-tight font-semibold md:text-[2.6rem]">
        {title}
      </h2>
      {children && <p className="mt-4 text-[1.05rem] text-muted">{children}</p>}
    </header>
  );
}

export function StatusTag({ tone, children, className = "" }: { tone: "ongoing" | "hot"; children: ReactNode; className?: string }) {
  const styles = tone === "hot" ? "bg-brand text-white" : "bg-gold text-navy-deep";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${styles} ${className}`}>
      <span className={`size-1.5 rounded-full ${tone === "hot" ? "animate-pulse bg-white" : "bg-navy-deep"}`} />
      {children}
    </span>
  );
}
