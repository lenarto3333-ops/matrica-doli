import type { Dictionary } from "@/i18n/types";

interface FaqSectionProps {
  dict: Dictionary;
}

export default function FaqSection({ dict }: FaqSectionProps) {
  const { badge, heading, items } = dict.faq;
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs tracking-[0.25em] uppercase text-sage-dark font-medium mb-4 text-center">
        {badge}
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-center mb-12">
        {heading}
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-card p-6 open:border-coral/50"
          >
            <summary className="flex items-center justify-between cursor-pointer font-serif text-xl list-none">
              {item.q}
              <span className="ml-4 text-coral-dark transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-ink-soft text-lg leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
