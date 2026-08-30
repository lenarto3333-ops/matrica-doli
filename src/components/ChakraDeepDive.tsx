import type { ChakraTable } from "@/lib/matrix";
import type { Locale } from "@/i18n/config";
import { CHAKRA_DESCRIPTIONS, TOTAL_CHAKRA_ROW } from "@/lib/chakraContent";
import { getChakraHealthContent } from "@/lib/chakraDeepDive";
import { getArcana } from "@/lib/arcana";
import ChakraIcon from "./ChakraIcon";

interface ChakraDeepDiveProps {
  table: ChakraTable;
  locale: Locale;
  comingSoonText: string;
  positiveLabel: string;
  negativeLabel: string;
}

export default function ChakraDeepDive({
  table,
  locale,
  comingSoonText,
  positiveLabel,
  negativeLabel,
}: ChakraDeepDiveProps) {
  const descriptions = CHAKRA_DESCRIPTIONS[locale];
  const totalRow = TOTAL_CHAKRA_ROW[locale] || TOTAL_CHAKRA_ROW.uk;
  const rows = [
    ...table.rows,
    { id: 0, name: totalRow.name, physics: table.total.physics, energy: table.total.energy, emotions: table.total.emotions },
  ];

  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const arcana = getArcana(row.emotions, locale);
        const content = getChakraHealthContent(row.emotions, locale);
        return (
          <details
            key={row.id}
            className="group overflow-hidden rounded-2xl border border-border bg-card"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 marker:content-none">
              <span
                aria-hidden="true"
                className="text-plum transition-transform duration-200 group-open:rotate-180"
              >
                ▼
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum-soft">
                <ChakraIcon chakraId={row.id} className="h-7 w-7" />
              </span>
              <span className="font-heading text-base font-bold sm:text-lg">{row.name}</span>
            </summary>
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="space-y-3 text-base text-ink-soft sm:text-lg">
                {descriptions[row.id].split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-plum">
                  {row.emotions} · {arcana.name}
                </p>
                {content ? (
                  <div className="space-y-4 text-base text-ink-soft sm:text-lg">
                    {content.intro && <p>{content.intro}</p>}
                    {content.plus.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
                          {positiveLabel}
                        </p>
                        <ul className="space-y-1.5 list-disc pl-5">
                          {content.plus.map((point, i) => (
                            <li key={i}>
                              {point.label && <strong className="text-ink">{point.label}. </strong>}
                              {point.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {content.minus.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-rose-700">
                          {negativeLabel}
                        </p>
                        <ul className="space-y-1.5 list-disc pl-5">
                          {content.minus.map((point, i) => (
                            <li key={i}>
                              {point.label && <strong className="text-ink">{point.label}. </strong>}
                              {point.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-ink-soft sm:text-base">{comingSoonText}</p>
                )}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
