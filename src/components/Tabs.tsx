"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: ReactNode };

/** Accessible tablist with arrow-key navigation. Panels are rendered by the caller. */
export function TabList({
  tabs,
  active,
  onChange,
  label,
  variant = "underline",
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  variant?: "underline" | "pills";
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  const base =
    variant === "pills"
      ? "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
      : "flex overflow-x-auto border-b border-line [scrollbar-width:none]";

  return (
    <div role="tablist" aria-label={label} className={base}>
      {tabs.map((t, i) => {
        const selected = t.id === active;
        const cls =
          variant === "pills"
            ? `shrink-0 rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition ${
                selected ? "border-navy bg-navy text-white" : "border-line bg-white text-navy-deep hover:border-navy"
              }`
            : `relative shrink-0 px-5 py-3.5 font-display text-lg font-semibold transition md:px-8 md:text-xl ${
                selected
                  ? "text-brand after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:rounded-full after:bg-brand"
                  : "text-muted hover:text-navy-deep"
              }`;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cls}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
