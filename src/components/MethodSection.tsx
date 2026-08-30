import type { Dictionary } from "@/i18n/types";

interface MethodSectionProps {
  dict: Dictionary;
}

export default function MethodSection({ dict }: MethodSectionProps) {
  const { badge, heading, paragraphs } = dict.method;
  return (
    <section id="method" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-sage-dark font-medium mb-4">
            {badge}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight">{heading}</h2>
        </div>
        <div className="space-y-4 text-ink-soft text-xl leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
