interface UnlockListItem {
  key: string;
  title: string;
  /** Computed arcana number(s), shown as a teaser when the module is wired up. */
  energies?: number[];
}

interface UnlockListProps {
  items: UnlockListItem[];
  unlockLabel: string;
}

export default function UnlockList({ items, unlockLabel }: UnlockListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <a
          key={item.key}
          href="#pricing"
          className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-6 py-4 hover:border-plum/40 transition-colors"
        >
          <span className="flex items-center gap-3 font-heading font-bold text-base">
            {item.energies && item.energies.length > 0 && (
              <span className="flex shrink-0 items-center gap-1">
                {item.energies.map((energy, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-plum-soft text-xs font-bold text-plum"
                  >
                    {energy}
                  </span>
                ))}
              </span>
            )}
            {item.title}
          </span>
          <span className="text-sm font-medium text-plum underline underline-offset-2 shrink-0">
            {unlockLabel}
          </span>
        </a>
      ))}
    </div>
  );
}
