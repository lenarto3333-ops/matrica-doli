/**
 * Registry mapping interpretation modules to the matrix point that drives
 * their arcana number.
 *
 * Mapping verified 2026-08-10 against:
 *  - docs/matrix-calculation-standard.md (point definitions)
 *  - Avatarium reference calculator (cross-checked on two birth dates)
 *  - "Зоны и точки в Матрице Судьбы" by Екатерина Кравченко (Ladini method reference)
 *
 * `CORE_MODULES` are the 11 modules from
 * docs/author-interpretation-content-standard.md §2.
 * `PERIPHERAL_MODULES` are 8 of the 10 additional modules — content-owner
 * approved for unlocking 2026-08-10 ("розблокуй всі рядки"). Two peripheral
 * modules (`daily-energy-positive`, `daily-energy-negative`, and
 * `period-forecast`) are deliberately NOT included: their content is about
 * the CURRENT date/period, not the birth matrix, and no approved formula
 * for that exists yet in matrix-calculation-standard.md — do not guess one
 * without a written standard update and content-owner sign-off (see the
 * standard's own change-control rules, §11).
 */

import type { MatrixPoints } from "@/lib/matrix";

export const CORE_MODULES = [
  "character",
  "inner-comfort",
  "soul-lessons",
  "past-life",
  "purpose",
  "money",
  "money-after-40",
  "relationships",
  "parents-children",
  "ancestry",
  "health",
] as const;

export const PERIPHERAL_MODULES = [
  "talents",
  "spiritual-purpose",
  "soul-tasks-before-40",
  "money-blocks",
  "money-career",
  "relationship-problems",
  "relationship-readiness",
  "balance-point",
  "energy-field",
  "social-purpose",
  "year",
  "wellbeing",
] as const;

export type CoreModule = (typeof CORE_MODULES)[number];
export type PeripheralModule = (typeof PERIPHERAL_MODULES)[number];
export type WireableModule = CoreModule | PeripheralModule;

/**
 * Modules whose real-world reference product (Avatarium dossier, cross-
 * checked against gadalkindom.ru's own point formulas) shows a combined
 * 3-number reading rather than one arcana — these are single blocks in
 * docs/result-blocks-redesign.md that are INHERENTLY a 3-number combo, not
 * a stand-in for 3 separately-covered blocks:
 *  - `past-life`  -> karmicTail (gadalkindom's "М-Н-Д" triple-code, exact
 *    value-set match against the reference dossier: {15,5,8}) — block 5,
 *    "Карма з минулого життя", one named 3-number karmic-tail program.
 *  - `parents-children` -> [day, dayAxis[0], dayAxis[1]] — added 2026-08-13,
 *    confirmed against Avatarium for 24.09.1973 -> [6,19,13] (see
 *    docs/result-blocks-redesign.md block 16, "Канал дитячо-батьківських
 *    стосунків": base identity + inner child + inner parent, one combined
 *    reading). Reuses the existing 22-file `parents-children` content as-is
 *    for all 3 stacked points.
 *
 * `money` and `relationships` were ALSO triple-modules (channels.money /
 * channels.love {entrance,energy,junction}) until 2026-08-23, when this
 * turned out to be a stale leftover from before the channel got split into
 * 3 separate blocks: entrance (block 8/10, `money`/`relationships`), energy
 * (block 9, `money-blocks`/`money-career`/`relationship-readiness`), and
 * junction (block 12, `balance-point`). Showing all 3 stacked under `money`/
 * `relationships` duplicated content already covered by those other blocks
 * (confirmed by the content owner: "ці енергії описуємо в інших пунктах") —
 * both are now single-point (entrance only), matching every other channel
 * sub-point module.
 */
export const TRIPLE_MODULES = ["past-life", "parents-children"] as const;
export type TripleModule = (typeof TRIPLE_MODULES)[number];

function isTripleModule(module: WireableModule): module is TripleModule {
  return (TRIPLE_MODULES as readonly string[]).includes(module);
}

/**
 * Returns every arcana number that drives a module's content — one for most
 * modules, three for TRIPLE_MODULES (see docstring above).
 */
export function getModuleEnergies(module: WireableModule, matrix: MatrixPoints): number[] {
  if (isTripleModule(module)) {
    switch (module) {
      case "past-life":
        return [...matrix.karmicTail];
      case "parents-children":
        return [matrix.day, matrix.dayAxis[0], matrix.dayAxis[1]];
    }
  }
  return [getModuleEnergy(module, matrix)];
}

/**
 * Returns the single representative arcana number (1-22) for a module,
 * given a birth matrix. Note: `health` has TWO complementary displays on
 * the result page — the 7-row numeric chakra table (calculateChakraTable,
 * always free, not part of this registry) AND a per-arcana written
 * interpretation (src/content/interpretations/*\/health/NN.md, driven by
 * this registry). `health`'s point mapping (matrix.day) is a pragmatic
 * choice, not sourced from the Kravchenko book or Avatarium like the
 * others — the book's own "Карта здоровья" section only describes the
 * table, not a single-arcana-keyed narrative for this module. Revisit if
 * a better source turns up.
 */
export function getModuleEnergy(module: WireableModule, matrix: MatrixPoints): number {
  switch (module) {
    case "character":
      // Point А (west/day) — "day of birth, visible character".
      return matrix.day;
    case "inner-comfort":
      // Point Д (center) — "зона комфорту".
      return matrix.center;
    case "soul-lessons":
      // Point Г (south/karma) — "духовна карма минулих життів".
      return matrix.karma;
    case "soul-tasks-before-40":
      // Same karma point as soul-lessons, life-stage framing (same
      // pattern as money/money-after-40).
      return matrix.karma;
    case "past-life":
      // Same zone as soul-lessons; book explicitly ties point Г to
      // "задачі минулих втілень" in the 4th-purpose section.
      return matrix.karma;
    case "purpose":
      // First (personal) purpose — Небо + Земля. Headline number for the
      // module; the other 3 purposes (social/spiritual/planetary) are a
      // richer breakdown to add in a later pass.
      return matrix.destinations.personal.total;
    case "spiritual-purpose":
      // Third purpose — "духовна гармонія, духовний залік, хто я для
      // Бога" per the Kravchenko book. A narrower slice of `purpose`.
      return matrix.destinations.spiritual.total;
    case "money":
      // Л — entrance to the money channel.
      return matrix.channels.money.entrance;
    case "money-after-40":
      // Same money channel, later-life framing.
      return matrix.channels.money.entrance;
    case "money-blocks":
      // О (energy point of the money channel) — Avatarium tooltip
      // explicitly states this point holds "основные блоки и негативные
      // установки, связанные с деньгами" (also doubles as money-career's
      // "profession that brings maximum income" — same point, plus vs
      // minus framing, same pattern as money/money-after-40).
      return matrix.channels.money.energy;
    case "money-career":
      // Same money-channel energy point as money-blocks; book explicitly
      // calls this point "профессия, приносящая максимальный доход".
      return matrix.channels.money.energy;
    case "relationships":
      // К — entrance to the relationship channel.
      return matrix.channels.love.entrance;
    case "relationship-problems":
      // Same entrance point; book explicitly describes К itself as
      // "неосознанная проблема в чакре Свадхистана" — the problem framing
      // is inherent to this point, same pattern as relationships.
      return matrix.channels.love.entrance;
    case "relationship-readiness":
      // О (energy point of the love channel) — book: "качества, которые
      // необходимо проявлять в отношениях... идеальный партнёр" —
      // matches "readiness" / partner-type framing directly.
      return matrix.channels.love.energy;
    case "parents-children":
      // Point А, position 1 (purple) — "ресурс, візитна картка".
      // Confirmed against two independent birth dates.
      return matrix.day;
    case "ancestry":
      // q — сила роду (sum of the four ancestral corners).
      return matrix.ancestralStrength;
    case "health":
      // Pragmatic default — see the docstring above. Matches `character`'s
      // anchor point (day = core personal identity expressed through body).
      return matrix.day;
    case "talents":
      // Point Б (north/month) — Kravchenko book: "головний талант, що
      // надихає" + "прихований талант з минулого життя". Confirmed
      // against Avatarium screenshots and by the content owner directly.
      return matrix.month;
    case "balance-point":
      // x — the junction point shared by both channels (money.junction ===
      // love.junction, same value in matrix.ts). Why money and love rarely
      // peak at the same time; added 2026-08-13 as its own module rather
      // than folding into money/relationships, since it's about the
      // relationship *between* the two channels, not either one alone.
      return matrix.channels.money.junction;
    case "energy-field":
      // Same karma point as soul-lessons/soul-tasks-before-40, but framed as
      // "what actually strengthens this energy" (the answer/prescription
      // side of block 6's diagnosis) rather than the problem itself. Only
      // arcana 8's content is written so far (block 23 in
      // docs/result-blocks-redesign.md) — other arcana values render nothing
      // until filled in, same pattern as any other in-progress module.
      return matrix.karma;
    case "social-purpose":
      // Second (social) purpose — maleLine+femaleLine, the 40-60 life stage.
      // Added 2026-08-13 to complete the personal/social/spiritual purpose
      // trio (`purpose`/`social-purpose`/`spiritual-purpose`) as one grouped
      // section — only arcana 14's content is written so far.
      return matrix.destinations.social.total;
    case "year":
      // Point E — "родова енергія" (raw year value). Block 3, "Задача душі:
      // шлях вашого розвитку" — added 2026-08-18. Distinct from `purpose`
      // (destinations.personal/social/spiritual), which is a separate later
      // life-stage breakdown; this is the single soul-task point tied to the
      // birth year itself.
      return matrix.year;
    case "wellbeing":
      // yearAxis[0] — Block 13, "Енергія фінансового благополуччя": a
      // two-sided switch that either lifts every other money energy to a
      // new scale (plus) or is where the main money blocks/negative
      // attitudes live (minus). Added 2026-08-23 per the "[SW.BAND]
      // Финансовое благополучие" reference PDF (per-arcana Энергия в
      // плюсе/минусе + established recommendations), but the point was
      // originally guessed as `ne` (reduce(month+year)) without an
      // independent cross-check.
      //
      // **Corrected 2026-08-25**: user reported the live site showing 15
      // (Диявол) for 26.07.1997 when the correct value is 8
      // (Справедливість) per their reference source. `ne` gives 15 for
      // that date (wrong); `yearAxis[0]` gives 8 (right). Re-checked
      // against the doc's reference date (24.09.1973, where the original
      // `ne`-based content was written): `yearAxis[0]` is ALSO 11 there,
      // same as `ne` — the two formulas coincide for that one date only
      // because `reduce(center + year)` happened to equal `month` (9) for
      // it, which is why the bug wasn't caught when the block was added.
      // Confirmed `yearAxis[0]` isn't used by any other module (unlike
      // `yearAxis[1]`, which is `money.entrance`).
      return matrix.yearAxis[0];
    default: {
      const exhaustiveCheck: never = module;
      throw new Error(`Unhandled module: ${exhaustiveCheck}`);
    }
  }
}
