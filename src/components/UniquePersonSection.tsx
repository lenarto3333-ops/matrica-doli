import Image from "next/image";
import AccentWord from "./AccentWord";
import MiniMatrixIcon from "./MiniMatrixIcon";
import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function UniquePersonSection({ dict }: Props) {
  const d = dict.unique;
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <MiniMatrixIcon className="h-9 w-9 text-plum mb-4" />
          <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight mb-5">
            {d.heading} <AccentWord>{d.headingAccent}</AccentWord>
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed mb-8 max-w-lg">{d.body}</p>
          <a
            href="#calculator"
            className="inline-block rounded-full bg-plum px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cream hover:bg-plum-dark transition-colors"
          >
            {d.cta}
          </a>
        </div>

        <div className="flex justify-center">
          <div className="relative aspect-[2/3] w-64 overflow-hidden rounded-[2rem] border border-[#E8D8CD] bg-[#F5E8DE] shadow-[0_24px_70px_rgba(152,95,107,0.16)] sm:w-80">
            <Image
              src="/lunar-energy-inner-silence.jfif"
              alt=""
              fill
              sizes="(min-width: 640px) 320px, 256px"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
