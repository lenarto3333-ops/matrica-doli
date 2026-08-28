import AccentWord from "./AccentWord";
import MiniMatrixIcon from "./MiniMatrixIcon";
import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function LearnSection({ dict }: Props) {
  const d = dict.learn;
  return (
    <section id="learn" className="bg-card py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <MiniMatrixIcon className="h-9 w-9 text-plum mb-4 mx-auto" />
        <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight text-center mb-12 max-w-2xl mx-auto">
          {d.heading} <AccentWord>{d.headingAccent}</AccentWord>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {d.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-card border border-plum-soft p-6 shadow-sm"
            >
              <h3 className="font-heading font-bold text-base mb-2">{item.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#calculator"
            className="inline-block w-full sm:w-auto rounded-full bg-plum px-9 py-4 text-sm font-bold uppercase tracking-wide text-cream hover:bg-plum-dark transition-colors"
          >
            {d.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
