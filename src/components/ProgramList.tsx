import type { ProgramContent } from "@/lib/programs";

export interface ProgramListItem {
  key: string;
  teaser: string;
  numbers: string;
  name: string | null;
  content: ProgramContent | null;
}

interface ProgramListProps {
  items: ProgramListItem[];
  comingSoonText: string;
  genericNameLabel: string;
}

export default function ProgramList({ items, comingSoonText, genericNameLabel }: ProgramListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.key}
          className="group overflow-hidden rounded-2xl border border-border bg-card"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 font-heading text-lg font-bold marker:content-none sm:text-xl">
            <span
              aria-hidden="true"
              className="text-plum transition-transform duration-200 group-open:rotate-180"
            >
              ▼
            </span>
            <span>{item.teaser}</span>
          </summary>
          <div className="border-t border-border px-6 py-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-plum">
              {item.numbers} · {item.name ?? genericNameLabel}
            </p>
            {item.content ? (
              <div className="space-y-3 text-base text-ink-soft sm:text-lg">
                {item.content.intro && <p>{item.content.intro}</p>}
                <p>{item.content.plus}</p>
                <p>{item.content.minus}</p>
                <p className="italic text-ink">{item.content.closing}</p>
              </div>
            ) : (
              <p className="text-sm text-ink-soft sm:text-base">{comingSoonText}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
