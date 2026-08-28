import type { AgePeriod } from "@/lib/matrix";

function formatAge(age: number): string {
  return Number.isInteger(age) ? String(age) : age.toFixed(1).replace(/\.0$/, "");
}

interface AgePeriodsTableProps {
  periods: AgePeriod[];
  currentPeriod: AgePeriod;
  currentLabel: string;
}

export default function AgePeriodsTable({
  periods,
  currentPeriod,
  currentLabel,
}: AgePeriodsTableProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {periods.map((period) => {
        const isCurrent =
          period.fromAge === currentPeriod.fromAge && period.toAge === currentPeriod.toAge;
        return (
          <div
            key={`${period.fromAge}-${period.toAge}`}
            className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-sm ${
              isCurrent
                ? "border-plum bg-plum-soft font-bold text-plum"
                : "border-border bg-card text-ink-soft"
            }`}
          >
            <span>
              {formatAge(period.fromAge)}–{formatAge(period.toAge)}
            </span>
            <span className="flex items-center gap-2">
              {isCurrent && <span className="text-xs uppercase tracking-wide">{currentLabel}</span>}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isCurrent ? "bg-plum text-cream" : "bg-plum-soft text-plum"
                }`}
              >
                {period.energy}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
