import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function PricingCards({ dict }: Props) {
  const { plans, popularBadge, cta } = dict.pricing;
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`rounded-2xl border p-7 flex flex-col ${
            plan.highlighted
              ? "border-plum bg-card shadow-xl shadow-plum/10 md:-translate-y-2"
              : "border-border bg-card"
          }`}
        >
          {plan.highlighted && (
            <span className="self-start mb-3 rounded-full bg-plum-soft text-plum-dark text-xs px-3 py-1 font-bold uppercase tracking-wide">
              {popularBadge}
            </span>
          )}
          <h3 className="font-heading font-bold uppercase text-lg mb-1">{plan.name}</h3>
          <div className="flex items-baseline gap-2 mb-5">
            <span className="font-heading font-extrabold text-3xl">{plan.price} грн</span>
            <span className="text-sm text-ink-soft/60 line-through">{plan.oldPrice} грн</span>
          </div>
          <ul className="space-y-3 text-sm sm:text-base text-ink-soft mb-7 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="text-plum mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`rounded-full py-3 font-bold uppercase tracking-wide text-sm transition-colors ${
              plan.highlighted
                ? "bg-plum text-cream hover:bg-plum-dark"
                : "bg-ink text-cream hover:bg-ink/85"
            }`}
          >
            {cta}
          </button>
        </div>
      ))}
    </div>
  );
}
