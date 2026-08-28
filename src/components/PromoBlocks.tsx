import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function PromoBlocks({ dict }: Props) {
  return (
    <section className="bg-cream-soft/50 py-16">
      <div className="mx-auto max-w-[1240px] px-6 space-y-4">
        {dict.promo.items.map((p) => (
          <div
            key={p.title}
            className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-card border border-border p-6 sm:p-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-plum-soft text-2xl">
              {p.icon}
            </span>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-heading font-bold text-lg">{p.title}</h3>
              <p className="text-ink-soft text-sm mt-1">{p.text}</p>
            </div>
            <a
              href="#calculator"
              className="shrink-0 rounded-full bg-ink px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-cream hover:bg-ink/85 transition-colors"
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
