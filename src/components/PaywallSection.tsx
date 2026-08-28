interface PaywallSectionProps {
  title: string;
  subtitle: string;
  items: string[];
}

export default function PaywallSection({ title, subtitle, items }: PaywallSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <div className="relative rounded-3xl border border-plum/30 bg-card p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/70 to-card pointer-events-none" />

        <div className="relative">
          <h3 className="font-heading font-bold text-2xl mb-2">{title}</h3>
          <p className="text-ink-soft mb-6">{subtitle}</p>

          <ul className="space-y-3 mb-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-cream-soft/60 px-4 py-3 blur-[3px] select-none"
              >
                <span className="text-plum">🔒</span>
                <span className="text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
