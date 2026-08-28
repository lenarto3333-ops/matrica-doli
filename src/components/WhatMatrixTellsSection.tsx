import MatrixDiagram from "./MatrixDiagram";
import AccentWord from "./AccentWord";
import MiniMatrixIcon from "./MiniMatrixIcon";
import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function WhatMatrixTellsSection({ dict }: Props) {
  const d = dict.whatMatrix;
  return (
    <section id="what-matrix" className="bg-cream-soft/50 py-20">
      <div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div className="max-w-md mx-auto w-full">
          <MatrixDiagram />
        </div>

        <div>
          <MiniMatrixIcon className="h-9 w-9 text-plum mb-4" />
          <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight mb-8">
            {d.heading} <AccentWord>{d.headingAccent}</AccentWord>
          </h2>
          <ul className="space-y-4 mb-9">
            {d.items.map((text) => (
              <li key={text} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-plum" />
                <span className="text-ink-soft text-lg">{text}</span>
              </li>
            ))}
          </ul>
          <a
            href="#calculator"
            className="inline-block rounded-full bg-plum px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cream hover:bg-plum-dark transition-colors"
          >
            {d.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
