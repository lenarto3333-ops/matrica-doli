import type { ChakraTable } from "@/lib/matrix";
import type { Locale } from "@/i18n/config";
import {
  CHAKRA_HEALTH_ASSOCIATIONS,
  CHAKRA_THEMES,
  TOTAL_CHAKRA_ROW,
} from "@/lib/chakraContent";
import ChakraIcon from "./ChakraIcon";

interface ChakraTableProps {
  table: ChakraTable;
  locale: Locale;
  columns: {
    chakra: string;
    physics: string;
    energy: string;
    emotions: string;
    health: string;
    total: string;
  };
  disclaimer: string;
}

const CHAKRA_COLORS: Record<number, { bg: string; text: string; subtext: string }> = {
  7: { bg: "#8B3A9E", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Сахасрара — violet
  6: { bg: "#3B4FE0", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Аджна — blue
  5: { bg: "#38BDF8", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Вишудха — cyan
  4: { bg: "#5CB85C", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Анахата — green
  3: { bg: "#F5E663", text: "#332B00", subtext: "rgba(51, 43, 0, 0.8)" },    // Манипура — yellow
  2: { bg: "#F39C2E", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Свадхистана — orange
  1: { bg: "#E14238", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Муладхара — red
  0: { bg: "#6C5CE7", text: "#ffffff", subtext: "rgba(255, 255, 255, 0.85)" }, // Итог / Total
};

export default function ChakraTableView({
  table,
  locale,
  columns,
  disclaimer,
}: ChakraTableProps) {
  const themes = CHAKRA_THEMES[locale];
  const healthAssociations = CHAKRA_HEALTH_ASSOCIATIONS[locale];
  const totalRow = TOTAL_CHAKRA_ROW[locale] || TOTAL_CHAKRA_ROW.uk;
  const totalColors = CHAKRA_COLORS[0];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-black/5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
              <th className="px-5 py-3.5 font-semibold">{columns.chakra}</th>
              <th className="px-4 py-3.5 font-semibold text-center w-24">{columns.physics}</th>
              <th className="px-4 py-3.5 font-semibold text-center w-24">{columns.energy}</th>
              <th className="px-4 py-3.5 font-semibold text-center w-24">{columns.emotions}</th>
              <th className="px-5 py-3.5 font-semibold">{columns.health}</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => {
              const c = CHAKRA_COLORS[row.id] || CHAKRA_COLORS[0];
              const health = healthAssociations[row.id];
              return (
                <tr
                  key={row.id}
                  style={{ backgroundColor: c.bg, color: c.text }}
                  className="transition-colors border-b border-white/10"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        <ChakraIcon chakraId={row.id} className="h-9 w-9" />
                      </span>
                      <div>
                        <span className="block font-heading font-bold text-base sm:text-lg leading-snug">
                          {row.name}
                        </span>
                        <span
                          className="block text-xs italic mt-0.5"
                          style={{ color: c.subtext }}
                        >
                          {themes[row.id]}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center font-heading font-bold text-base">
                    {row.physics}
                  </td>
                  <td className="px-4 py-3.5 text-center font-heading font-bold text-base">
                    {row.energy}
                  </td>
                  <td className="px-4 py-3.5 text-center font-heading font-bold text-base">
                    {row.emotions}
                  </td>
                  <td
                    className="px-5 py-3.5 text-sm italic leading-relaxed max-w-sm"
                    style={{ color: c.subtext }}
                  >
                    {health?.areas}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr
              style={{ backgroundColor: totalColors.bg, color: totalColors.text }}
              className="border-t-2 border-white/20 font-medium"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <ChakraIcon chakraId={0} className="h-9 w-9" />
                  </span>
                  <div>
                    <span className="block font-heading font-bold text-base sm:text-lg leading-snug">
                      {totalRow.name}
                    </span>
                    <span
                      className="block text-xs italic mt-0.5"
                      style={{ color: totalColors.subtext }}
                    >
                      {totalRow.theme}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-center font-heading font-bold text-base">
                {table.total.physics}
              </td>
              <td className="px-4 py-4 text-center font-heading font-bold text-base">
                {table.total.energy}
              </td>
              <td className="px-4 py-4 text-center font-heading font-bold text-base">
                {table.total.emotions}
              </td>
              <td
                className="px-5 py-4 text-sm italic leading-relaxed max-w-sm"
                style={{ color: totalColors.subtext }}
              >
                {totalRow.health}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {disclaimer && (
        <div className="border-t border-[#E8D8CD] bg-[#FFF8F5] px-5 py-4 text-sm leading-relaxed text-[#635E59]">
          {disclaimer}
        </div>
      )}
    </div>
  );
}


