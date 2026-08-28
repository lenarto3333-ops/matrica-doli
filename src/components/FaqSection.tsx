const FAQS = [
  {
    q: "Наскільки точний розрахунок?",
    a: "Розрахунок базується виключно на вашій даті народження й будується за фіксованим математичним алгоритмом, тому результат завжди однаковий для однієї дати.",
  },
  {
    q: "Чи потрібна реєстрація?",
    a: "Ні. Введіть дату народження й одразу отримаєте безкоштовну частину розбору без створення акаунта.",
  },
  {
    q: "Що я отримаю після оплати?",
    a: "Повний розбір відкриється одразу на сайті, а PDF-версію звіту можна буде завантажити або отримати на email.",
  },
  {
    q: "Чи можна розрахувати матрицю для дитини або пари?",
    a: "Так, окремі тарифи включають Матрицю Сумісності для пари та Дитячу Матрицю.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs tracking-[0.25em] uppercase text-sage-dark font-medium mb-4 text-center">
        FAQ
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-center mb-12">
        Часті запитання
      </h2>

      <div className="space-y-3">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-card p-6 open:border-coral/50"
          >
            <summary className="flex items-center justify-between cursor-pointer font-serif text-xl list-none">
              {item.q}
              <span className="ml-4 text-coral-dark transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-ink-soft text-lg leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
