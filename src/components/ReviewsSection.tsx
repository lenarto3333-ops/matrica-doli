import type { Dictionary } from "@/i18n/types";

interface ReviewsSectionProps {
  dict: Dictionary;
}

export default function ReviewsSection({ dict }: ReviewsSectionProps) {
  const { badge, heading, items } = dict.reviews;
  return (
    <section id="reviews" className="bg-cream-soft/60 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs tracking-[0.25em] uppercase text-sage-dark font-medium mb-4 text-center">
          {badge}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-center mb-12">
          {heading}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((r) => (
            <div key={r.name} className="rounded-2xl bg-card border border-border p-6">
              <p className="text-ink-soft leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <p className="font-serif">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
