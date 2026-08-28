import PricingCards from "./PricingCards";
import MiniMatrixIcon from "./MiniMatrixIcon";
import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function PricingSection({ dict }: Props) {
  return (
    <section id="pricing" className="mx-auto max-w-[1240px] px-6 py-20">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <MiniMatrixIcon className="h-9 w-9 text-plum mb-4 mx-auto" />
        <h2 className="font-heading font-extrabold uppercase text-2xl sm:text-3xl leading-tight">
          {dict.pricing.heading}
        </h2>
      </div>
      <PricingCards dict={dict} />
    </section>
  );
}
