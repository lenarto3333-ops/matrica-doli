import MiniMatrixIcon from "./MiniMatrixIcon";
import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function FreeCalculateSection({ dict }: Props) {
  const d = dict.freeCalculate;
  return (
    <section className="bg-plum py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <MiniMatrixIcon className="h-9 w-9 text-cream mb-4 mx-auto" />
        <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight text-center mb-12 text-cream">
          {d.heading}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {d.cards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-card p-7">
              <span className="inline-block h-2.5 w-2.5 rounded-full mb-4 bg-plum" />
              <h3 className="font-heading font-bold text-xl mb-2">{card.title}</h3>
              <p className="text-ink-soft mb-4">{card.text}</p>
              <ul className="space-y-1.5 mb-6">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-plum" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#calculator"
                className="inline-block rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wide text-cream bg-plum hover:bg-plum-dark transition-colors"
              >
                {d.cardCta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
