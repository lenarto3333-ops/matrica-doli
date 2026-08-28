import AccentWord from "./AccentWord";
import MiniMatrixIcon from "./MiniMatrixIcon";
import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function EnergiesSection({ dict }: Props) {
  const d = dict.energies;
  return (
    <section className="bg-cream-soft/50 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <MiniMatrixIcon className="h-9 w-9 text-plum mb-4 mx-auto" />
        <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight mb-8">
          {d.heading} <AccentWord>{d.headingAccent}</AccentWord>
        </h2>

        <div className="space-y-4 text-ink-soft text-lg leading-relaxed text-left sm:text-center mb-10">
          {d.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <a
          href="#calculator"
          className="inline-block rounded-full bg-plum px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cream hover:bg-plum-dark transition-colors"
        >
          {d.cta}
        </a>
      </div>
    </section>
  );
}
