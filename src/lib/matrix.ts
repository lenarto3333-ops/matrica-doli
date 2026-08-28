/**
 * Matrix of Destiny calculation engine.
 *
 * Base formulas were verified against independent calculator examples.
 * Ancestral programs use Natalia Ladini's revised "ancestral strength"
 * method and are checked against Avatarium reference matrices.
 */

import type { Locale } from "@/i18n/config";
import { CHAKRA_NAMES } from "@/lib/chakraContent";

export interface BirthDate {
  day: number;
  month: number;
  year: number;
}

export type Gender = "man" | "woman";

export interface Destinations {
  personal: {
    sky: number;
    earth: number;
    total: number;
  };
  social: {
    maleLine: number;
    femaleLine: number;
    total: number;
  };
  spiritual: {
    total: number;
  };
  planetary: {
    total: number;
  };
}

export interface Channels {
  love: {
    entrance: number;
    energy: number;
    junction: number;
  };
  money: {
    junction: number;
    energy: number;
    entrance: number;
  };
}

export interface MatrixPoints {
  day: number; // W — День (личность)
  month: number; // N — Месяц (вища суть)
  year: number; // E — Рік (родова енергія)
  karma: number; // S — reduce(day+month+year), нижня точка (кармічна задача)
  center: number; // C — reduce(day+month+year+karma), Зона комфорту
  nw: number; // reduce(day+month) — чоловіча лінія (верх)
  ne: number; // reduce(month+year) — жіноча лінія (верх)
  se: number; // reduce(year+karma) — жіноча лінія (низ)
  sw: number; // reduce(karma+day) — чоловіча лінія (низ)
  /** Сила роду: reduced sum of the four ancestral-square corners. */
  ancestralStrength: number;
  sky: number; // reduce(month+karma) — вісь «Небо»
  earth: number; // reduce(day+year) — вісь «Земля»
  /** small circles along the day-center axis, ordered day -> center */
  dayAxis: [number, number, number];
  /** small circles along the month-center axis, ordered month -> center */
  monthAxis: [number, number, number];
  /** small circles along the year-center axis, ordered year -> center */
  yearAxis: [number, number, number];
  /** small circles along the karma-center axis, ordered karma -> center (karmic tail) */
  karmaAxis: [number, number, number];
  /** 3 numbers of the karmic tail: [karma, D1, D2] */
  karmicTail: [number, number, number];
  /** Ancestral program on the NW diagonal, ordered center -> nw corner. */
  nwAxis: [number, number];
  /** Female-lineage program on the NE diagonal, ordered center -> ne corner. */
  neAxis: [number, number];
  /** Ancestral program on the SW diagonal, ordered center -> sw corner. */
  swAxis: [number, number];
  /** Ancestral program on the SE diagonal, ordered center -> se corner. */
  seAxis: [number, number];
  destinations: Destinations;
  channels: Channels;
}

/** Reduce a number to the 1-22 arcana range by repeated digit-summing. */
export function reduce(n: number): number {
  let value = Math.abs(n);
  while (value > 22) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value === 0 ? 22 : value;
}

function sumDigits(n: number): number {
  return String(Math.abs(n))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}

/**
 * Builds the 3 small "axis" circles that sit between a cardinal point and the center.
 * Produces [p2, p1, p3] where:
 *   p1 = reduce(center + cardinal)
 *   p2 = reduce(cardinal + p1)
 *   p3 = reduce(center + p1)
 */
function buildFullAxis(center: number, cardinal: number): [number, number, number] {
  const p1 = reduce(center + cardinal);
  const p2 = reduce(cardinal + p1);
  const p3 = reduce(center + p1);
  return [p2, p1, p3];
}

/**
 * Builds the two points between the matrix interior and an ancestral corner.
 * The tuple is ordered center -> corner:
 *   inner = reduce(seed + corner)
 *   outer = reduce(corner + inner)
 */
function buildAncestralAxis(seed: number, corner: number): [number, number] {
  const inner = reduce(seed + corner);
  const outer = reduce(corner + inner);
  return [inner, outer];
}

/**
 * Builds all four ancestral programs using Ladini's "ancestral strength"
 * method used by Avatarium. Gender does not participate in this arithmetic.
 */
function buildLadiniAncestralAxes(points: {
  nw: number;
  ne: number;
  sw: number;
  se: number;
}) {
  const { nw, ne, sw, se } = points;
  const ancestralStrength = reduce(nw + ne + se + sw);

  return {
    ancestralStrength,
    nwAxis: buildAncestralAxis(ancestralStrength, nw),
    neAxis: buildAncestralAxis(ancestralStrength, ne),
    swAxis: buildAncestralAxis(ancestralStrength, sw),
    seAxis: buildAncestralAxis(ancestralStrength, se),
  };
}

export function calculateMatrix({ day, month, year }: BirthDate): MatrixPoints {
  const d = reduce(day);
  const m = reduce(month);
  const y = reduce(sumDigits(year));
  const karma = reduce(d + m + y);
  const center = reduce(d + m + y + karma);

  const nw = reduce(d + m);
  const ne = reduce(m + y);
  const se = reduce(y + karma);
  const sw = reduce(karma + d);

  const sky = reduce(m + karma);
  const earth = reduce(d + y);
  const personalTotal = reduce(sky + earth);

  const maleLine = reduce(nw + se);
  const femaleLine = reduce(ne + sw);
  const socialTotal = reduce(maleLine + femaleLine);

  const spiritualTotal = reduce(personalTotal + socialTotal);
  const planetaryTotal = reduce(socialTotal + spiritualTotal);

  const dayAxis = buildFullAxis(center, d);
  const monthAxis = buildFullAxis(center, m);
  const yearAxis = buildFullAxis(center, y);
  const karmaAxis = buildFullAxis(center, karma);

  const moneyEntrance = yearAxis[1];
  const loveEntrance = karmaAxis[1];
  const x = reduce(loveEntrance + moneyEntrance); // Balance point
  const x2 = reduce(x + moneyEntrance); // Money channel energy
  const x1 = reduce(x + loveEntrance); // Love channel energy

  // Karmic tail consists of [Karma (d), d1, d2]
  const d2 = reduce(karma + loveEntrance);
  const karmicTail: [number, number, number] = [karma, loveEntrance, d2];

  const ancestralAxes = buildLadiniAncestralAxes({
    nw,
    ne,
    sw,
    se,
  });

  return {
    day: d,
    month: m,
    year: y,
    karma,
    center,
    nw,
    ne,
    se,
    sw,
    sky,
    earth,
    dayAxis,
    yearAxis,
    monthAxis,
    karmaAxis,
    karmicTail,
    ...ancestralAxes,
    destinations: {
      personal: {
        sky,
        earth,
        total: personalTotal,
      },
      social: {
        maleLine,
        femaleLine,
        total: socialTotal,
      },
      spiritual: {
        total: spiritualTotal,
      },
      planetary: {
        total: planetaryTotal,
      },
    },
    channels: {
      love: {
        entrance: loveEntrance,
        energy: x1,
        junction: x,
      },
      money: {
        junction: x,
        energy: x2,
        entrance: moneyEntrance,
      },
    },
  };
}

export interface ChakraRow {
  id: number;
  name: string;
  physics: number;
  energy: number;
  emotions: number;
}

export interface ChakraTable {
  rows: ChakraRow[]; // ordered 7 (Сахасрара) down to 1 (Муладхара)
  total: { physics: number; energy: number; emotions: number };
}

/**
 * Health map / chakra table (7 rows x Физика/Энергия/Эмоции).
 * physics/energy for the id=6,5,4 rows come from the 3-value dayAxis /
 * monthAxis (day-center and month-center chains). The id=2 row (Свадхистана)
 * uses the single direct-sum point of the year-center / karma-center
 * diagonal — yearAxis[1] / karmaAxis[1], i.e. reduce(year+center) and
 * reduce(karma+center) (== moneyEntrance / loveEntrance) — NOT
 * yearAxis[0]/karmaAxis[0] (the two-hop chained values). Confirmed against
 * an Avatarium reference dossier (24.09.1973) and independently against
 * gadalkindom.ru's own stated formulas "L = C + E", "M = D + E" (year+center,
 * karma+center) for that diagonal position — id2 must be a single-hop sum,
 * matching yearAxis/karmaAxis index 1, not the two-hop index 0.
 *
 *   physics: row7=day, rows 6-4=dayAxis, row3=center, row2=yearAxis[1], row1=year
 *   energy:  row7=month, rows 6-4=monthAxis, row3=center, row2=karmaAxis[1], row1=karma
 *   emotions[i] = reduce(physics[i] + energy[i])
 */
export function calculateChakraTable(
  matrix: MatrixPoints,
  locale: Locale,
): ChakraTable {
  const { day, month, year, karma, center, dayAxis, monthAxis, yearAxis, karmaAxis } =
    matrix;

  // rows ordered 7,6,5,4,3,2,1
  const physicsCol = [day, ...dayAxis, center, yearAxis[1], year];
  const energyCol = [month, ...monthAxis, center, karmaAxis[1], karma];
  const emotionsCol = physicsCol.map((p, i) => reduce(p + energyCol[i]));

  const ids = [7, 6, 5, 4, 3, 2, 1];
  const rows: ChakraRow[] = ids.map((id, i) => ({
    id,
    name: CHAKRA_NAMES[locale][id],
    physics: physicsCol[i],
    energy: energyCol[i],
    emotions: emotionsCol[i],
  }));

  const sum = (arr: number[]) => reduce(arr.reduce((a, b) => a + b, 0));

  return {
    rows,
    total: {
      physics: sum(physicsCol),
      energy: sum(energyCol),
      emotions: sum(emotionsCol),
    },
  };
}

export function isValidDate({ day, month, year }: BirthDate): boolean {
  if (!day || !month || !year) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Calculates the Manipura / Sexuality Program triplet [center, sexPoint1, sexPoint2]
 * along the right horizontal line:
 *   sexPoint1 = ancestralStrength
 *   sexPoint2 = reduce(center + sexPoint1)
 * Verified against avatariumlife.com for 26.07.1997
 * (center=10, ancestralStrength=11 -> sexPoint2=21).
 */
export function calculateSexualityProgram(
  birthDate: BirthDate,
): [number, number, number] {
  const matrix = calculateMatrix(birthDate);
  const { center, ancestralStrength } = matrix;
  const sexPoint1 = ancestralStrength;
  const sexPoint2 = reduce(center + sexPoint1);

  return [center, sexPoint1, sexPoint2];
}

export interface AgePeriod {
  fromAge: number;
  toAge: number;
  energy: number;
}

/**
 * Cycle of 8 "vertex" points spaced 10 years apart, repeating every 80 years.
 * Reverse-engineered and verified 2026-08-13 against two independent
 * gadalkindom.ru reference tables (24.09.1973 and 29.06.2008) — every vertex
 * value AND every subdivision value matched exactly on both. See
 * docs/result-blocks-redesign.md block 25 for the full derivation notes.
 */
const AGE_VERTEX_SEQUENCE = [
  "day",
  "nw",
  "month",
  "ne",
  "year",
  "se",
  "karma",
  "sw",
] as const;

function getVertexValue(
  matrix: MatrixPoints,
  key: (typeof AGE_VERTEX_SEQUENCE)[number],
): number {
  return matrix[key];
}

/**
 * Full life-span age-period energy table. Each 10-year span between two
 * consecutive vertices (val1, val2) subdivides symmetrically from both ends
 * toward a shared midpoint S = reduce(val1 + val2), using the same
 * `buildFullAxis` recursion used elsewhere in this file:
 *   [t-1, t+1]     -> val1                         (vertex, 2y)
 *   [t+1, t+2.5]   -> buildFullAxis(S, val1)[0]     (nearest val1, 1.5y)
 *   [t+2.5, t+3.5] -> buildFullAxis(S, val1)[1]     (middle, 1y)
 *   [t+3.5, t+4]   -> buildFullAxis(S, val1)[2]     (nearest S, 0.5y)
 *   [t+4, t+6]     -> S                             (midpoint, 2y)
 *   [t+6, t+7.5]   -> buildFullAxis(S, val2)[2]     (nearest S, 1.5y)
 *   [t+7.5, t+8.5] -> buildFullAxis(S, val2)[1]     (middle, 1y)
 *   [t+8.5, t+9]   -> buildFullAxis(S, val2)[0]     (nearest val2, 0.5y)
 * ...then val2 becomes val1 for the next decade, continuing indefinitely.
 */
export function calculateAgePeriods(birthDate: BirthDate, maxAge = 90): AgePeriod[] {
  const matrix = calculateMatrix(birthDate);
  const periods: AgePeriod[] = [];

  let vertexIndex = 0;
  for (let t = 0; t < maxAge; t += 10) {
    const val1 = getVertexValue(matrix, AGE_VERTEX_SEQUENCE[vertexIndex % 8]);
    const val2 = getVertexValue(matrix, AGE_VERTEX_SEQUENCE[(vertexIndex + 1) % 8]);
    const s = reduce(val1 + val2);
    const side1 = buildFullAxis(s, val1);
    const side2 = buildFullAxis(s, val2);

    periods.push(
      { fromAge: Math.max(0, t - 1), toAge: t + 1, energy: val1 },
      { fromAge: t + 1, toAge: t + 2.5, energy: side1[0] },
      { fromAge: t + 2.5, toAge: t + 3.5, energy: side1[1] },
      { fromAge: t + 3.5, toAge: t + 4, energy: side1[2] },
      { fromAge: t + 4, toAge: t + 6, energy: s },
      { fromAge: t + 6, toAge: t + 7.5, energy: side2[2] },
      { fromAge: t + 7.5, toAge: t + 8.5, energy: side2[1] },
      { fromAge: t + 8.5, toAge: t + 9, energy: side2[0] },
    );

    vertexIndex += 1;
  }

  return periods;
}

/** Fractional age in years as of a given date (defaults to now). */
export function calculateFractionalAge(birthDate: BirthDate, asOf: Date = new Date()): number {
  const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
  const diffMs = asOf.getTime() - birth.getTime();
  return diffMs / (365.2425 * 24 * 60 * 60 * 1000);
}

/** The age period a person is currently in, given their birth date. */
export function getCurrentAgePeriod(birthDate: BirthDate, asOf: Date = new Date()): AgePeriod {
  const age = calculateFractionalAge(birthDate, asOf);
  const periods = calculateAgePeriods(birthDate, Math.ceil(age) + 11);
  return (
    periods.find((p) => age >= p.fromAge && age < p.toAge) ?? periods[periods.length - 1]
  );
}
