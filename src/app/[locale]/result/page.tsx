import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MatrixDiagram from "@/components/MatrixDiagram";
import ChakraTableView from "@/components/ChakraTable";
import ChakraDeepDive from "@/components/ChakraDeepDive";
import FreeInterpretationList from "@/components/FreeInterpretationList";
import UnlockList from "@/components/UnlockList";
import ProgramList from "@/components/ProgramList";
import AgePeriodsTable from "@/components/AgePeriodsTable";
import PricingCards from "@/components/PricingCards";
import EsotericPageDecor from "@/components/EsotericPageDecor";
import {
  calculateMatrix,
  calculateChakraTable,
  calculateAgePeriods,
  getCurrentAgePeriod,
  isValidDate,
  type BirthDate,
} from "@/lib/matrix";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getArcana } from "@/lib/arcana";
import { getInterpretation } from "@/lib/interpretations";
import {
  getModuleEnergies,
  CORE_MODULES,
  PERIPHERAL_MODULES,
  type WireableModule,
} from "@/lib/matrixContentMapping";
import {
  getAncestralPrograms,
  getSexualityProgramInfo,
  getKarmicTailInfo,
  getProgramContent,
  getAncestralProgramContent,
  getKarmicTailContent,
  getParentsChildrenProgram,
} from "@/lib/programs";

interface ResultPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ d?: string; m?: string; y?: string; sex?: string }>;
}

export default async function ResultPage({ params, searchParams }: ResultPageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  const sp = await searchParams;
  const birth: BirthDate = {
    day: Number(sp.d),
    month: Number(sp.m),
    year: Number(sp.y),
  };

  if (!isValidDate(birth)) {
    return (
      <>
        <Header dict={dict} locale={locale} />
        <main className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="font-heading font-bold text-3xl mb-4">
            {dict.result.notFoundTitle}
          </h1>
          <p className="text-ink-soft mb-8">{dict.result.notFoundBody}</p>
          <Link
            href={`/${locale}`}
            className="inline-block rounded-full bg-plum px-6 py-3 text-cream hover:bg-plum-dark transition-colors"
          >
            {dict.result.backHome}
          </Link>
        </main>
        <Footer dict={dict} />
      </>
    );
  }

  const matrix = calculateMatrix(birth);
  const chakraTable = calculateChakraTable(matrix, locale);
  const characterArcana = getArcana(matrix.day, locale);
  const comfortArcana = getArcana(matrix.center, locale);
  const r = dict.result;

  // TEMPORARY: every module with a resolved matrix-point mapping (10 core +
  // 7 peripheral) is unlocked for everyone until a further decision —
  // requested 2026-08-10 ("розблокуй всі рядки"). Two peripheral modules
  // (daily-energy-positive/negative, period-forecast) stay locked: their
  // content is about the current date/period, not the birth matrix, and no
  // approved formula for that exists yet (see matrixContentMapping.ts). To
  // re-lock everything, flip this back to false; the UnlockList/paywall
  // wiring underneath is untouched.
  const TEMP_UNLOCK_WIRED_MODULES = true;

  // Real interpretation content for the two free demo modules.
  const characterInterpretation = getInterpretation("character", matrix.day, locale);
  const comfortInterpretation = getInterpretation("inner-comfort", matrix.center, locale);

  // Every module with a resolved matrix-point mapping, minus the two always-
  // free ones (character/inner-comfort are rendered separately above).
  const wireableModules = [...CORE_MODULES, ...PERIPHERAL_MODULES].filter(
    (m) => m !== "character" && m !== "inner-comfort",
  ) as WireableModule[];
  const moduleEnergies = Object.fromEntries(
    wireableModules.map((m) => [m, getModuleEnergies(m, matrix)]),
  ) as Partial<Record<WireableModule, number[]>>;

  // Full interpretation content for the temporarily-unlocked modules. Most
  // modules resolve to one arcana; TRIPLE_MODULES (past-life, relationships,
  // money, parents-children) resolve to three, each rendered as its own
  // stacked point.
  //
  // `parents-children` additionally checks for a named "system program" for
  // its exact ordered triad (day-dayAxis0-dayAxis1) first — a richer,
  // per-position reading (see src/lib/programs.ts's
  // getParentsChildrenProgram doc comment) that replaces the generic 3x
  // stacked per-arcana text when one has been written. Falls back to the
  // generic stack for any triad without an authored program yet.
  // Locale-appropriate Plus/Minus headings for the synthetic markdown body
  // built below — must match InterpretationBody's isPlusHeading/
  // isMinusHeading regexes (which key off these literal substrings) while
  // still reading correctly in each language.
  const PLUS_MINUS_HEADING: Record<typeof locale, { plus: string; minus: string }> = {
    uk: { plus: "Плюс", minus: "Мінус" },
    ru: { plus: "Плюс", minus: "Минус" },
    en: { plus: "Positive", minus: "Negative" },
  };

  const unlockedItemsWithKey = TEMP_UNLOCK_WIRED_MODULES
    ? r.unlockList.items
        .filter((item) => wireableModules.includes(item.key as WireableModule))
        .map((item) => {
          const energies = moduleEnergies[item.key as WireableModule]!;
          // `past-life` shows ONLY the named karmic-tail program (see
          // src/lib/programs.ts getKarmicTailInfo) under this block's own
          // title, instead of the generic 3-stacked-arcana text every other
          // TRIPLE_MODULE gets — showing both used to duplicate the "karmic
          // tail" concept in two separate sections on the page (fixed
          // 2026-08-27 per explicit request: "залишити назву... а про
          // аркани прибрати").
          if (item.key === "past-life") {
            const karmicTailInfo = getKarmicTailInfo(matrix);
            const karmicTailContent = getKarmicTailContent(karmicTailInfo.programKey, locale);
            const numbers = karmicTailInfo.numbers.join("-");
            const heading = PLUS_MINUS_HEADING[locale];
            const body = karmicTailContent
              ? [
                  karmicTailContent.intro,
                  `## ${heading.plus}\n\n${karmicTailContent.plus}`,
                  `## ${heading.minus}\n\n${karmicTailContent.minus}`,
                  karmicTailContent.closing && `*${karmicTailContent.closing}*`,
                ]
                  .filter(Boolean)
                  .join("\n\n")
              : r.karmicTail.comingSoon;
            return {
              key: item.key,
              title: item.title,
              points: [
                {
                  energy: numbers,
                  arcanaName: karmicTailContent?.name || karmicTailInfo.name || r.karmicTail.genericNameLabel,
                  body,
                },
              ],
            };
          }
          if (item.key === "parents-children") {
            const program = getParentsChildrenProgram(energies.join("-"), locale);
            if (program) {
              return {
                key: item.key,
                title: item.title,
                points: [{ energy: program.numbers, arcanaName: program.name, body: program.body }],
              };
            }
          }
          // `talents` gets 2 extra stacked points beyond the main arcana:
          // the two "supporting" points directly below it on the month axis
          // (matrix.monthAxis[0]/[1]). Confirmed against the avatarium.life
          // reference for 24.09.1973 (monthAxis [7, 16, 5]: 7 and 16 are the
          // two supporting points shown there, each with its own named-arcana
          // card; 5/monthAxis[2] is visually a separate cluster on that
          // reference and isn't included). Each gets its own short, dedicated
          // per-arcana module (talent-intellect/talent-expression) rather
          // than reusing the main talents/NN.md content, since the content
          // owner wanted genuinely new text for these two positions, not a
          // generic one-liner or a copy of the main talent's write-up.
          if (item.key === "talents") {
            const mainArcana = getArcana(energies[0], locale);
            const mainInterp = getInterpretation("talents", energies[0], locale);
            const supportSpecs = [
              { energy: matrix.monthAxis[0], module: "talent-intellect", label: r.talentSupport.intellectLabel },
              { energy: matrix.monthAxis[1], module: "talent-expression", label: r.talentSupport.expressionLabel },
            ];
            const supportPoints = supportSpecs
              .map((s) => {
                const interp = getInterpretation(s.module, s.energy, locale);
                if (!interp?.body) return null;
                return {
                  energy: s.energy,
                  arcanaName: getArcana(s.energy, locale).name,
                  body: `**${s.label}**\n\n${interp.body}`,
                };
              })
              .filter((p): p is { energy: number; arcanaName: string; body: string } => p !== null);
            const points = [
              ...(mainInterp?.body
                ? [{ energy: energies[0], arcanaName: mainArcana.name, body: mainInterp.body }]
                : []),
              ...supportPoints,
            ];
            if (points.length > 0) {
              return { key: item.key, title: item.title, points };
            }
          }
          // parents-children without an authored named program still shows
          // 3 differentiated points, not the same generic text 3 times: each
          // position has its own role-specific module (see
          // src/content/interpretations/ru/parents-children-{a,b,c}).
          const PARENTS_CHILDREN_POSITION_MODULES = [
            "parents-children-a",
            "parents-children-b",
            "parents-children-c",
          ];
          const points = energies
            .map((energy, i) => {
              const arcana = getArcana(energy, locale);
              const module =
                item.key === "parents-children"
                  ? (PARENTS_CHILDREN_POSITION_MODULES[i] ?? item.key)
                  : item.key;
              const interpretation = getInterpretation(module, energy, locale);
              return {
                energy,
                arcanaName: arcana.name,
                body: interpretation?.body ?? "",
              };
            })
            .filter((point) => point.body);
          return { key: item.key, title: item.title, points };
        })
        .filter((item) => item.points.length > 0)
    : [];

  // Render order agreed in docs/result-blocks-redesign.md (blocks 1-25):
  // free character/comfort (1,4) -> these two groups (2,5,6,6b,8,8b,9,10,12,
  // ancestry, then later 19,20,22) -> ancestral programs (14-17) -> sexuality
  // (18) -> chakra deep-dive (24) -> age periods (25). Keys not listed here
  // (e.g. non-wireable ones) fall through to the generic `lockedItems` teaser
  // list further down, unchanged.
  const EARLY_BLOCK_KEYS = [
    "talents",
    "year",
    "past-life",
    "soul-lessons",
    "energy-field",
    "money",
    "money-blocks",
    "wellbeing",
    "relationships",
    "relationship-readiness",
    "balance-point",
    "ancestry",
  ];
  const LATE_BLOCK_KEYS = ["parents-children"];
  // Blocks 20, 21, 22 — kept together as one grouped "Призначення" section
  // (per user request 2026-08-13: these three were scattered across the page
  // before and hard to follow as one connected idea).
  const PURPOSE_BLOCK_KEYS = ["purpose", "social-purpose", "spiritual-purpose"];

  function pickOrdered(keys: string[]) {
    return keys
      .map((key) => unlockedItemsWithKey.find((item) => item.key === key))
      .filter((item): item is (typeof unlockedItemsWithKey)[number] => Boolean(item));
  }

  const earlyUnlockedItems = pickOrdered(EARLY_BLOCK_KEYS);
  const lateUnlockedItems = pickOrdered(LATE_BLOCK_KEYS);
  const purposeUnlockedItems = pickOrdered(PURPOSE_BLOCK_KEYS);

  // Locked-card items: unwireable modules (daily-energy-*, period-forecast,
  // the chakra duplicate) always stay locked; wireable modules only appear
  // here (with their teaser numbers) while not unlocked above.
  const lockedItems = r.unlockList.items
    .filter((item) =>
      TEMP_UNLOCK_WIRED_MODULES ? !wireableModules.includes(item.key as WireableModule) : true,
    )
    .map((item) => ({
      ...item,
      energies: moduleEnergies[item.key as WireableModule],
    }));

  const ancestralProgramItems = getAncestralPrograms(matrix).map((corner) => {
    const content = getAncestralProgramContent(corner.programKey, locale);
    return {
      key: corner.key,
      teaser: r.ancestralPrograms.corners[corner.key],
      numbers: corner.numbers.join("-"),
      // Prefer the locale-specific name from the translated content file
      // (once one exists for this locale); corner.name is the catalog's
      // Ukrainian name and is only a fallback for untranslated programs.
      name: content?.name || corner.name,
      content,
    };
  });

  const sexualityInfo = getSexualityProgramInfo(birth);
  const sexualityContent = getProgramContent(sexualityInfo.programKey, locale);
  const sexualityItems = [
    {
      key: "sexuality",
      teaser: r.sexualityProgram.teaser,
      numbers: sexualityInfo.numbers.join("-"),
      name: sexualityContent?.name || sexualityInfo.name,
      content: sexualityContent,
    },
  ];

  const agePeriods = calculateAgePeriods(birth);
  const currentAgePeriod = getCurrentAgePeriod(birth);

  const dateLabel = `${String(birth.day).padStart(2, "0")}.${String(
    birth.month,
  ).padStart(2, "0")}.${birth.year}`;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="relative isolate overflow-hidden">
        <EsotericPageDecor />
        <section className="mx-auto max-w-7xl px-6 pt-14 pb-8 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-plum font-bold mb-4">
              {dateLabel}
            </p>
            <h1 className="font-heading font-extrabold uppercase text-3xl sm:text-4xl leading-tight mb-4">
              {r.title}
            </h1>
            <p className="text-ink-soft text-xl leading-relaxed">{r.subtitle}</p>
          </div>
          <div className="relative aspect-[1/1.4] max-w-2xl mx-auto w-full">
            <MatrixDiagram
              values={{
                day: matrix.day,
                month: matrix.month,
                year: matrix.year,
                karma: matrix.karma,
                center: matrix.center,
                ancestralStrength: matrix.ancestralStrength,
                nw: matrix.nw,
                ne: matrix.ne,
                se: matrix.se,
                sw: matrix.sw,
                dayAxis: matrix.dayAxis,
                monthAxis: matrix.monthAxis,
                yearAxis: matrix.yearAxis,
                karmaAxis: matrix.karmaAxis,
                nwAxis: matrix.nwAxis,
                neAxis: matrix.neAxis,
                swAxis: matrix.swAxis,
                seAxis: matrix.seAxis,
                karmicTail: matrix.karmicTail,
                destinations: matrix.destinations,
                channels: matrix.channels,
              }}
            />
          </div>
        </section>

        {/* Blocks 1, 2, 5, 6, 6b, 8, 8b, 9, 10, 12 + ancestry-legacy */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <FreeInterpretationList
            items={[
              {
                title: r.unlockList.freeCharacterTitle,
                points: [
                  {
                    energy: matrix.day,
                    arcanaName: characterArcana.name,
                    body: characterInterpretation?.body ?? characterArcana.personality,
                  },
                ],
              },
              {
                title: r.unlockList.freeComfortTitle,
                points: [
                  {
                    energy: matrix.center,
                    arcanaName: comfortArcana.name,
                    body: comfortInterpretation?.body ?? comfortArcana.comfort,
                  },
                ],
              },
              ...earlyUnlockedItems,
            ]}
          />
        </section>

        {/* Blocks 14-17: ancestral (родові) programs */}
        <section className="mx-auto max-w-4xl px-6 pb-10">
          <h2 className="font-heading font-bold text-2xl mb-1">{r.ancestralPrograms.title}</h2>
          <p className="text-ink-soft text-sm mb-6">{r.ancestralPrograms.subtitle}</p>
          <ProgramList
            items={ancestralProgramItems}
            comingSoonText={r.ancestralPrograms.comingSoon}
            genericNameLabel={r.ancestralPrograms.genericNameLabel}
          />
        </section>

        {/* Block 18: sexuality program */}
        <section className="mx-auto max-w-4xl px-6 pb-10">
          <h2 className="font-heading font-bold text-2xl mb-1">{r.sexualityProgram.title}</h2>
          <ProgramList
            items={sexualityItems}
            comingSoonText={r.sexualityProgram.comingSoon}
            genericNameLabel={r.sexualityProgram.genericNameLabel}
          />
        </section>

        {/* Blocks 19, 20, 22 */}
        {lateUnlockedItems.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-10">
            <FreeInterpretationList items={lateUnlockedItems} />
          </section>
        )}

        {lockedItems.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-10">
            <UnlockList items={lockedItems} unlockLabel={r.unlockList.unlockLabel} />
          </section>
        )}

        {/* Blocks 20, 21, 22: personal/social/spiritual purpose, grouped */}
        {purposeUnlockedItems.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-10">
            <h2 className="font-heading font-bold text-2xl mb-1">{r.purposeSection.title}</h2>
            <p className="text-ink-soft text-sm mb-6">{r.purposeSection.subtitle}</p>
            <FreeInterpretationList items={purposeUnlockedItems} />
          </section>
        )}

        {/* Block 24: chakra deep-dive */}
        <section className="mx-auto max-w-4xl px-6 py-6">
          <h2 className="font-heading font-bold text-2xl mb-1">{r.chakraTitle}</h2>
          <p className="text-ink-soft text-sm mb-6">{r.chakraSubtitle}</p>
          <ChakraTableView
            table={chakraTable}
            locale={locale}
            columns={r.chakraColumns}
            disclaimer={r.chakraHealthDisclaimer}
          />
        </section>

        {/* Block 19 continued: chakra deep-dive (per-chakra description + arcana plus/minus) */}
        <section className="mx-auto max-w-4xl px-6 pb-10">
          <h2 className="font-heading font-bold text-2xl mb-1">{r.chakraDeepDive.title}</h2>
          <p className="text-ink-soft text-sm mb-6">{r.chakraDeepDive.subtitle}</p>
          <ChakraDeepDive
            table={chakraTable}
            locale={locale}
            comingSoonText={r.chakraDeepDive.comingSoon}
            positiveLabel={r.chakraDeepDive.positiveLabel}
            negativeLabel={r.chakraDeepDive.negativeLabel}
          />
        </section>

        {/* Block 25: age-period forecast */}
        <section className="mx-auto max-w-4xl px-6 pb-10">
          <h2 className="font-heading font-bold text-2xl mb-1">{r.agePeriods.title}</h2>
          <p className="text-ink-soft text-sm mb-6">{r.agePeriods.subtitle}</p>
          <AgePeriodsTable
            periods={agePeriods}
            currentPeriod={currentAgePeriod}
            currentLabel={r.agePeriods.currentLabel}
          />
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-heading font-extrabold uppercase text-3xl text-center mb-10">
            {r.pricingTitle}
          </h2>
          <PricingCards dict={dict} />
        </section>
      </main>
      <Footer dict={dict} />
    </>
  );
}
