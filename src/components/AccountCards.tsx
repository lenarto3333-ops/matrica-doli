import type { AccountCard } from "@/i18n/types";

const ICONS = ["💰", "🎓", "✦", "🎓"];

interface AccountCardsProps {
  cards: AccountCard[];
}

function highlight(title: string, accent: string) {
  const idx = title.indexOf(accent);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-plum">{accent}</span>
      {title.slice(idx + accent.length)}
    </>
  );
}

export default function AccountCards({ cards }: AccountCardsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-plum-soft text-2xl mb-4">
            {ICONS[i % ICONS.length]}
          </span>
          <p className="font-heading font-bold text-sm mb-6 flex-1">
            {highlight(card.title, card.accent)}
          </p>
          <a
            href="#calculator"
            className="w-full rounded-full bg-plum px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-cream hover:bg-plum-dark transition-colors"
          >
            {card.cta}
          </a>
        </div>
      ))}
    </div>
  );
}
