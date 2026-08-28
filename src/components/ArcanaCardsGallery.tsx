"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getArcana } from "@/lib/arcana";

export interface ArcanaItem {
  id: number;
  roman: string;
  nameUk: string;
  nameRu: string;
  keywordUk: string;
  keywordRu: string;
  plusUk: string;
  minusUk: string;
  image: string;
}

export const ARCANA_LIST: ArcanaItem[] = [
  {
    id: 1,
    roman: "I",
    nameUk: "Маг",
    nameRu: "Маг",
    keywordUk: "Енергія новатора та першопрохідця",
    keywordRu: "Энергия новатора и первопроходца",
    plusUk: "Лідерство, новаторство, матеріалізація думок",
    minusUk: "Егоїзм, маніпуляції, невпевненість у силах",
    image: "/cards/arcana_11_style1.jpg",
  },
  {
    id: 2,
    roman: "II",
    nameUk: "Верховна Жриця",
    nameRu: "Верховная Жрица",
    keywordUk: "Енергія гармонії та інтуїції",
    keywordRu: "Энергия гармонии и интуиции",
    plusUk: "Глибока інтуїція, дипломатія, зцілення",
    minusUk: "Дволикість, плітки, приховування почуттів",
    image: "/cards/arcana_18.png",
  },
  {
    id: 3,
    roman: "III",
    nameUk: "Імператриця",
    nameRu: "Императрица",
    keywordUk: "Енергія процвітання та краси",
    keywordRu: "Энергия процветания и красоты",
    plusUk: "Достаток, краса, материнство, родючість",
    minusUk: "Контроль, деспотизм, недбалість до себе",
    image: "/cards/arcana_03.png",
  },
  {
    id: 4,
    roman: "IV",
    nameUk: "Імператор",
    nameRu: "Император",
    keywordUk: "Енергія влади та структури",
    keywordRu: "Энергия власти и структуры",
    plusUk: "Організованість, бізнес-хист, надійність",
    minusUk: "Жорсткість, тиранія, гіперконтроль",
    image: "/cards/arcana_11_style2.jpg",
  },
  {
    id: 5,
    roman: "V",
    nameUk: "Ієрофант (Вчитель)",
    nameRu: "Иерофант (Учитель)",
    keywordUk: "Енергія традицій та знань",
    keywordRu: "Энергия традиций и знаний",
    plusUk: "Мудрість, наставництво, передача досвіду",
    minusUk: "Догматизм, повчання інших, гординя",
    image: "/cards/arcana_11_style3.jpg",
  },
  {
    id: 6,
    roman: "VI",
    nameUk: "Закохані",
    nameRu: "Влюбленные",
    keywordUk: "Енергія вибору та краси",
    keywordRu: "Энергия выбора и красоты",
    plusUk: "Привабливість, тонкий смак, гармонія",
    minusUk: "Залежність від чужої думки, сумніви",
    image: "/cards/arcana_03.png",
  },
  {
    id: 7,
    roman: "VII",
    nameUk: "Колісниця",
    nameRu: "Колесница",
    keywordUk: "Енергія руху та перемоги",
    keywordRu: "Энергия движения и победы",
    plusUk: "Целеспрямованість, активність, командність",
    minusUk: "Агресія, хаотичність, страх руху",
    image: "/cards/arcana_10.png",
  },
  {
    id: 8,
    roman: "VIII",
    nameUk: "Справедливість",
    nameRu: "Справедливость",
    keywordUk: "Енергія причинно-наслідкових зв'язків",
    keywordRu: "Энергия причинно-следственных связей",
    plusUk: "Чесність, розуміння законів карми, об'єктивність",
    minusUk: "Осуд, боротьба за правду, образи",
    image: "/cards/arcana_11_style2.jpg",
  },
  {
    id: 9,
    roman: "IX",
    nameUk: "Мудрець (Отшельник)",
    nameRu: "Мудрец (Отшельник)",
    keywordUk: "Енергія глибини та самопізнання",
    keywordRu: "Энергия глубины и самопознания",
    plusUk: "Глибока мудрість, аналітичний розум",
    minusUk: "Замкнутість, страх самотності, гординя",
    image: "/cards/arcana_18.png",
  },
  {
    id: 10,
    roman: "X",
    nameUk: "Колесо Фортуни",
    nameRu: "Колесо Фортуны",
    keywordUk: "Енергія потоку та везіння",
    keywordRu: "Энергия потока и везения",
    plusUk: "Удача, легкість, довіра Всесвіту",
    minusUk: "Лінь, пасивність, страх змін",
    image: "/cards/arcana_10.png",
  },
  {
    id: 11,
    roman: "XI",
    nameUk: "Сила",
    nameRu: "Сила",
    keywordUk: "Енергія потенціалу та приборкання",
    keywordRu: "Энергия потенциала и укрощения",
    plusUk: "Внутрішня міць, витривалість, м'яке лідерство",
    minusUk: "Тиск, спалахи гніву, трудоголізм",
    image: "/cards/arcana_11.png",
  },
  {
    id: 12,
    roman: "XII",
    nameUk: "Служіння (Повішений)",
    nameRu: "Служение (Повешенный)",
    keywordUk: "Енергія нового погляду та милосердя",
    keywordRu: "Энергия нового взгляда и милосердия",
    plusUk: "Креативність, добрий характер, креатив",
    minusUk: "Жерттовність, невміння казати «ні»",
    image: "/cards/arcana_11_style3.jpg",
  },
  {
    id: 13,
    roman: "XIII",
    nameUk: "Трансформація",
    nameRu: "Трансформация",
    keywordUk: "Енергія оновлення та рішучості",
    keywordRu: "Энергия обновления и решительности",
    plusUk: "Здатність до змін, сміливість, реформаторство",
    minusUk: "Страх втрат, різкість, зачеплення за минуле",
    image: "/cards/arcana_10.png",
  },
  {
    id: 14,
    roman: "XIV",
    nameUk: "Поміркованість",
    nameRu: "Умеренность",
    keywordUk: "Енергія гармонії та душевної краси",
    keywordRu: "Энергия гармонии и душевной красоты",
    plusUk: "Ангельська терплячість, збалансованість",
    minusUk: "Емоційні крайності, нестриманість",
    image: "/cards/arcana_03.png",
  },
  {
    id: 15,
    roman: "XV",
    nameUk: "Тінь (Діявол)",
    nameRu: "Тень (Дьявол)",
    keywordUk: "Енергія спокуси та харизми",
    keywordRu: "Энергия искушения и харизмы",
    plusUk: "Магнетизм, бачення суті речей, багатство",
    minusUk: "Залежності, маніпуляції, ревнощі",
    image: "/cards/arcana_11_style1.jpg",
  },
  {
    id: 16,
    roman: "XVI",
    nameUk: "Вежа (Духовне пробудження)",
    nameRu: "Башня (Духовное пробуждение)",
    keywordUk: "Енергія перебудови та росту",
    keywordRu: "Энергия перестройки и роста",
    plusUk: "Духовна міць, загартованість, творення нового",
    minusUk: "Руйнування, спалахи агресії, травматизм",
    image: "/cards/arcana_10.png",
  },
  {
    id: 17,
    roman: "XVII",
    nameUk: "Зірка",
    nameRu: "Звезда",
    keywordUk: "Енергія таланту та натхнення",
    keywordRu: "Энергия таланта и вдохновения",
    plusUk: "Яскравість, професіоналізм, натхнення інших",
    minusUk: "Зоряна хвороба, зневіра в собі, гординя",
    image: "/cards/arcana_18.png",
  },
  {
    id: 18,
    roman: "XVIII",
    nameUk: "Місяць",
    nameRu: "Луна",
    keywordUk: "Енергія матеріалізації та уяви",
    keywordRu: "Энергия материализации и воображения",
    plusUk: "Матеріалізація думок, розвинена уява",
    minusUk: "Страхи, ілюзії, депресивні стани",
    image: "/cards/arcana_18.png",
  },
  {
    id: 19,
    roman: "XIX",
    nameUk: "Сонце",
    nameRu: "Солнце",
    keywordUk: "Енергія процвітання та радості",
    keywordRu: "Энергия процветания и радости",
    plusUk: "Щедрість, оптимізм, масштабна діяльність",
    minusUk: "Самоїдство, гординя, випалювання інших",
    image: "/cards/arcana_03.png",
  },
  {
    id: 20,
    roman: "XX",
    nameUk: "Благословення Роду",
    nameRu: "Благословение Рода",
    keywordUk: "Енергія зв'язку з корінням",
    keywordRu: "Энергия связи с корнями",
    plusUk: "Родова сила, яснобачення, відродження",
    minusUk: "Образи на батьків, судові позови, виснаження",
    image: "/cards/arcana_11_style2.jpg",
  },
  {
    id: 21,
    roman: "XXI",
    nameUk: "Світ",
    nameRu: "Мир",
    keywordUk: "Енергія масштабу та єдності",
    keywordRu: "Энергия масштаба и единства",
    plusUk: "Миротворчість, глобальні проекти, подорожі",
    minusUk: "Вузькість мислення, ворожість до світу",
    image: "/cards/arcana_10.png",
  },
  {
    id: 22,
    roman: "XXII",
    nameUk: "Свобода (Дурень)",
    nameRu: "Свобода (Дурак)",
    keywordUk: "Енергія вищої свободи та легкості",
    keywordRu: "Энергия высшей свободы и легкости",
    plusUk: "Легкість на підйом, довіра долі, щирість",
    minusUk: "Безвідповідальність, авантюризм, обмеження",
    image: "/cards/arcana_11_style1.jpg",
  },
];

const GALLERY_COPY: Record<
  Locale,
  {
    badge: string;
    headingLead: string;
    headingAccent: string;
    intro: string;
    energy: string;
    lightSide: string;
    positive: string;
    shadowSide: string;
    negative: string;
    recommendation: string;
    calculate: string;
  }
> = {
  uk: {
    badge: "Архетипи матриці",
    headingLead: "Відкрийте свої",
    headingAccent: "22 енергії долі",
    intro: "Дослідіть архетипи, які розкривають ваш характер, сильні сторони та прихований потенціал.",
    energy: "енергія",
    lightSide: "Світла сторона",
    positive: "Прояв у плюсі",
    shadowSide: "Тіньова сторона",
    negative: "Прояв у мінусі",
    recommendation: "У кожному розрахунку Матриці відкриваються персональні рекомендації для цієї енергії.",
    calculate: "Розрахувати",
  },
  ru: {
    badge: "Архетипы матрицы",
    headingLead: "Откройте свои",
    headingAccent: "22 энергии судьбы",
    intro: "Исследуйте архетипы, которые раскрывают ваш характер, сильные стороны и скрытый потенциал.",
    energy: "энергия",
    lightSide: "Светлая сторона",
    positive: "Проявление в плюсе",
    shadowSide: "Теневая сторона",
    negative: "Проявление в минусе",
    recommendation: "В каждом расчёте Матрицы открываются персональные рекомендации для этой энергии.",
    calculate: "Рассчитать",
  },
  en: {
    badge: "Matrix archetypes",
    headingLead: "Discover your",
    headingAccent: "22 energies of destiny",
    intro: "Explore the archetypes that reveal your character, strengths, and hidden potential.",
    energy: "energy",
    lightSide: "Light side",
    positive: "Positive expression",
    shadowSide: "Shadow side",
    negative: "Shadow expression",
    recommendation: "Every Matrix calculation includes personal guidance for this energy.",
    calculate: "Calculate",
  },
};

interface Props {
  locale: Locale;
}

export default function ArcanaCardsGallery({ locale }: Props) {
  const [selectedArcana, setSelectedArcana] = useState<ArcanaItem | null>(
    ARCANA_LIST[10] // Default Arcana 11 Strength
  );
  const copy = GALLERY_COPY[locale];
  const selectedCopy = selectedArcana ? getArcana(selectedArcana.id, locale) : null;

  const currentImage = selectedArcana
    ? `/cards/energies/energy-${String(selectedArcana.id).padStart(2, "0")}.png`
    : "/cards/energies/energy-11.png";

  return (
    <section className="py-20 bg-[#FDFBF7] relative overflow-hidden border-t border-[#EEE6D9]">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="relative mx-auto mb-10 max-w-5xl">
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#985f6b]/20 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#985f6b] shadow-sm backdrop-blur-sm sm:text-xs">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#C98B98] opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-[#985f6b]" />
            </span>
            {copy.badge}
          </div>

          <h2 className="mx-auto max-w-5xl text-balance font-serif text-3xl font-medium leading-[1.08] tracking-[-0.025em] text-[#2C2825] sm:text-4xl lg:text-5xl">
            <span>{copy.headingLead} </span>
            <span className="bg-gradient-to-r from-[#985f6b] via-[#B87383] to-[#C69369] bg-clip-text text-transparent">
              {copy.headingAccent}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-[#635E59] sm:text-lg">
            {copy.intro}
          </p>
        </div>

        {/* Arcana Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-5xl mx-auto">
          {ARCANA_LIST.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedArcana(item)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                selectedArcana?.id === item.id
                  ? "bg-[#985f6b] text-white border-[#985f6b] shadow-md shadow-[#985f6b]/20 scale-105"
                  : "bg-white text-[#635E59] border-[#EEE6D9] hover:border-[#985f6b]/50 hover:bg-[#F9EFF1]"
              }`}
            >
              <span className="font-serif font-bold mr-1">{item.roman}.</span>
              <span>{getArcana(item.id, locale).name}</span>
            </button>
          ))}
        </div>

        {/* Active Arcana Showcase Card Container */}
        {selectedArcana && (
          <div className="bg-white rounded-3xl border border-[#EEE6D9] shadow-2xl p-6 sm:p-10 max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-center text-left">
            {/* Card Visual Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[340px] aspect-[2/3] rounded-2xl overflow-hidden border-4 border-[#D4A373] shadow-2xl shadow-[#985f6b]/20 bg-[#1A1817]">
                <Image
                  src={currentImage}
                  alt={selectedCopy?.name ?? selectedArcana.nameUk}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 72px), 340px"
                  quality={88}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gold Frame Overlay Gradient */}
                <div className="absolute inset-0 pointer-events-none border-[6px] border-amber-500/30 rounded-xl" />
              </div>

            </div>

            {/* Arcana Details Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D4A373]">
                  {selectedArcana.roman}
                </span>
                <span className="h-6 w-px bg-[#EEE6D9]" />
                <span className="text-xs uppercase tracking-widest text-[#985f6b] font-bold">
                  {selectedArcana.id} {copy.energy}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2825] font-normal mb-3">
                {selectedCopy?.name}
              </h3>

              <p className="text-[#985f6b] font-medium text-base mb-6 italic">
                {selectedCopy?.keyword}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <article className="group relative overflow-hidden rounded-[1.4rem] border border-emerald-900/10 bg-gradient-to-br from-[#F6FBF8] to-[#EAF5EE] p-5 shadow-[0_12px_35px_-24px_rgba(19,78,74,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(19,78,74,0.6)]">
                  <div className="absolute -right-8 -top-10 size-28 rounded-full bg-emerald-300/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800/65">
                        {copy.lightSide}
                      </span>
                      <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-emerald-900 text-xl font-light text-white shadow-lg shadow-emerald-900/15">
                        +
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-emerald-950">
                      {copy.positive}
                    </h4>
                    <p className="text-sm leading-6 text-emerald-950/75">{selectedCopy?.personality}</p>
                  </div>
                </article>

                <article className="group relative overflow-hidden rounded-[1.4rem] border border-[#985f6b]/15 bg-gradient-to-br from-[#FFF9F8] to-[#F8ECEE] p-5 shadow-[0_12px_35px_-24px_rgba(152,95,107,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(152,95,107,0.65)]">
                  <div className="absolute -right-8 -top-10 size-28 rounded-full bg-[#DDA5B0]/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#985f6b]/70">
                        {copy.shadowSide}
                      </span>
                      <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-[#985f6b] text-xl font-light text-white shadow-lg shadow-[#985f6b]/20">
                        −
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-[#5F3540]">
                      {copy.negative}
                    </h4>
                    <p className="text-sm leading-6 text-[#5F3540]/75">{selectedCopy?.issue}</p>
                  </div>
                </article>
              </div>

              <div className="mt-8 pt-6 border-t border-[#EEE6D9] flex items-center justify-between">
                <span className="text-xs text-[#635E59]">
                  {copy.recommendation}
                </span>
                <a
                  href="#calculator"
                  className="shrink-0 rounded-full bg-[#985f6b] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#824d58] transition-colors"
                >
                  {copy.calculate}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
