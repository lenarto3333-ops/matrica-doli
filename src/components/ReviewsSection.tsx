// Placeholder testimonials — replace with real customer reviews before launch.
const REVIEWS = [
  {
    name: "Олена К.",
    text: "Найбільше вразила частина про фінансові блоки — дуже точно описала мою ситуацію.",
  },
  {
    name: "Дмитро П.",
    text: "Зробив розбір разом із дружиною — багато що прояснилось у наших стосунках.",
  },
  {
    name: "Марина В.",
    text: "Просто, зрозуміло, без зайвої містики. Отримала конкретні кроки, що робити далі.",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-cream-soft/60 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs tracking-[0.25em] uppercase text-sage-dark font-medium mb-4 text-center">
          Відгуки
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-center mb-12">
          Що кажуть ті, хто вже пройшов розбір
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl bg-card border border-border p-6">
              <p className="text-ink-soft leading-relaxed mb-4">“{r.text}”</p>
              <p className="font-serif">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
