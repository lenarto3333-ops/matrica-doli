import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function FinalCtaSection({ dict }: Props) {
  const d = dict.finalCta;
  return (
    <section className="bg-plum-dark py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight text-cream mb-4">
          {d.heading}
        </h2>
        <p className="text-cream/80 text-lg mb-8">{d.subtitle}</p>
        <a
          href="#calculator"
          className="inline-block rounded-full bg-cream px-10 py-4 text-sm font-bold uppercase tracking-wide text-plum-dark hover:bg-white transition-colors"
        >
          {d.cta}
        </a>
      </div>
    </section>
  );
}
