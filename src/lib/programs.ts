/**
 * Named karmic "programs" — 3-number combinations (родові ancestral-line
 * programs + non-ancestral programs like the sexuality program) that have
 * their own archetype name and plus/minus content, independent of the
 * per-arcana (1-22) interpretation library in src/lib/interpretations.ts.
 *
 * Content lives at src/content/programs/{locale}/{programKey}.md for
 * sexuality programs (programKey is the natural/unsorted order — direction
 * matters there), src/content/programs/parents-children/{locale}/{key}.md
 * for parents-children, and src/content/programs/ancestral/{locale}/{key}.md
 * for родові (ancestral) programs — each type has its OWN subdirectory so
 * their key spaces can never collide (see the comment on
 * ANCESTRAL_PROGRAMS_ROOT below for why this matters). родові keys use the
 * format `${outerMin}-${middle}-${outerMax}` (see the comment on
 * ANCESTRAL_PROGRAM_NAMES below and `ancestralProgramKey`) — NOT a plain
 * ascending sort, which was tried first and found to be wrong (see
 * docs/rod-programs-catalog.md).
 *
 * ANCESTRAL_PROGRAM_NAMES holds 167 of gadalkindom.ru's distinct родові
 * triples (see the comment above that const for scrape/reconciliation
 * details, and docs/rod-programs-catalog.md for the full raw data). Named
 * plus/minus content is a separate, still-incremental task — populating it
 * is the same kind of ongoing work as filling the interpretation library.
 * A combination with no catalog entry falls back to a generic "Родова
 * програма {numbers}" label; a combination with a name but no written
 * plus/minus content falls back to a "coming soon" note.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";
import type { BirthDate, MatrixPoints } from "@/lib/matrix";
import { calculateSexualityProgram } from "@/lib/matrix";

/**
 * Named детско-родительский (parents-children channel) programs, keyed by
 * the NATURAL "day-dayAxis0-dayAxis1" order (direction matters, same as
 * SEXUALITY_PROGRAM_NAMES — position 1 = day/purple circle = "чему ребенок
 * пришел научить родителей", position 2 = dayAxis[0]/light-blue circle =
 * "задача отношений", position 3 = dayAxis[1]/blue circle = "кармические
 * ошибки и уроки"). Stored as full free-form markdown per triad (not the
 * rigid Суть/Плюс/Мінус template used by ANCESTRAL/SEXUALITY, since the
 * content is a richer per-point breakdown) — see getParentsChildrenProgram.
 * Populated incrementally as real triads are authored, same as the other
 * program catalogs; a triad with no file falls back to the generic
 * per-arcana 3-point stack (src/content/interpretations/*\/parents-children).
 */
const PARENTS_CHILDREN_PROGRAMS_ROOT = path.join(
  process.cwd(),
  "src",
  "content",
  "programs",
  "parents-children",
);

export interface ParentsChildrenProgram {
  name: string;
  numbers: string;
  body: string;
}

/** Reads a детско-родительский program's content by its natural-order triple key ("day-dayAxis0-dayAxis1"). Returns null if not yet written. */
export function getParentsChildrenProgram(
  programKey: string,
  locale: Locale,
): ParentsChildrenProgram | null {
  const filePath = path.join(PARENTS_CHILDREN_PROGRAMS_ROOT, locale, `${programKey}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    name: data.name ?? "",
    numbers: data.numbers ?? programKey,
    body: content.trim(),
  };
}

/**
 * Родові (ancestral-line) program names, keyed by `${outerMin}-${middle}-${outerMax}`
 * where `middle` is the axis[1] ("outer" ancestral) value and outerMin/outerMax
 * are corner and axis[0] ("inner") sorted ascending — NOT a full ascending
 * sort of all 3 numbers. This was cross-checked against gadalkindom.ru's
 * individual program pages for 8 real corner triples across 2 birth dates
 * (24.09.1973 and 29.06.2008) and matched exactly every time; a full
 * ascending sort was tried first and found to silently collide two different
 * real programs together whenever their middle value differed (e.g. the set
 * {5,9,14} is «Помста» when 14 is the middle but «Внутрішній учитель» when 5
 * is the middle — full sort can't tell these apart). See
 * docs/rod-programs-catalog.md for the scrape, the reconciliation, and this
 * bug's discovery/fix history. `getAncestralPrograms` builds this key via
 * `ancestralProgramKey`, not `sortedKey`.
 * A combination with no entry here falls back to a generic "Родова
 * програма {numbers}" label; content (plus/minus prose) is a separate,
 * still-incremental task — see getProgramContent.
 */
export const ANCESTRAL_PROGRAM_NAMES: Record<string, string> = {
  "2-6-22": "Нерозважливий романтик",
  "2-8-6": "Зріла любов",
  "2-9-7": "Просвітлений",
  "2-10-8": "Безтурботний балакун",
  "2-11-9": "Прихований потенціал",
  "2-12-10": "Незвичайний талант",
  "2-13-11": "Тренер",
  "2-14-12": "Смирення й очікування",
  "2-15-13": "Перехід на темний бік",
  "2-16-14": "Зламаний баланс",
  "2-17-15": "Згубна мрія",
  "2-20-18": "Жриця Місяця",
  "3-5-20": "Храм або Скверна",
  "3-6-21": "Любов без меж",
  "3-8-5": "Випробування достатком",
  "3-9-6": "Неприйняття власного тіла (краси)",
  "3-10-7": "Життя в достатку",
  "3-11-8": "Успішний правитель",
  "3-14-11": "Ні багатства, ні бідності",
  "3-15-12": "Фатальна жінка (чоловік)",
  "3-16-13": "Випробування нуждою",
  "3-17-14": "Скромна велич",
  "3-18-15": "Найкраще або найгірше",
  "3-19-16": "Багате життя",
  "3-20-17": "Таємна любов",
  "3-21-18": "Від ілюзій до реальності",
  "4-5-19": "Переоцінка сил",
  "4-6-20": "Влада любові",
  "4-7-21": "Глобальні завдання",
  "4-8-22": "В'язниця",
  "4-10-6": "Тягар керівника",
  "4-11-7": "Охоронець порядку",
  "4-12-8": "Скинутий правитель",
  "4-13-9": "Скінченність буття",
  "4-14-10": "Нема віри в себе",
  "4-15-11": "Спокуса владою",
  "4-17-13": "Капсулювання, поховання",
  "4-19-15": "Багатоваріантність успіху",
  "4-20-16": "Втрата влади й контролю",
  "4-21-17": "Розсіяність або фокус",
  "4-22-18": "Розтоптати віру",
  "5-5-18": "Магічні знання роду та ідеалізація сім'ї",
  "5-6-19": "Вогонь любові",
  "5-7-20": "Вигнання із системи",
  "5-8-21": "Порушення ієрархії",
  "5-9-22": "Вільний мислитель",
  "5-10-5": "Вчений",
  "5-12-7": "Духовний застій",
  "5-13-8": "Чуже місце",
  "5-14-9": "Помста",
  "5-14-19": "Код мільйонера",
  "5-15-10": "Висока місія об'єднання",
  "5-16-11": "Знецінення",
  "5-17-12": "Публічна ганьба",
  "5-18-13": "Сакральна жертва",
  "5-19-14": "Багатство",
  "5-21-16": "Псування майна",
  "5-22-17": "Академічні знання",
  "6-5-17": "Фізична і духовна краса",
  "6-7-19": "Винен за всіх",
  "6-9-21": "Усиновлення",
  "6-10-22": "Погана компанія",
  "6-12-6": "Жертва заради любові",
  "6-16-10": "Музей або доступ до цінностей",
  "6-18-12": "Залежні стосунки",
  "6-19-13": "Життя без вигорання",
  "6-21-15": "Розгул",
  "6-22-16": "Жарт чи серйозність",
  "7-5-16": "Втрата авторитету",
  "7-6-17": "Паралельна любов",
  "7-7-18": "Страх розвитку",
  "7-8-19": "Шлях до самореалізації",
  "7-9-20": "Ніхто не забере",
  "7-11-22": "Від наївності до сили",
  "7-16-9": "Мовчання",
  "7-17-10": "Шлях до відомості",
  "7-18-11": "Бойовий маг",
  "7-20-13": "Шлях переродження",
  "7-21-14": "Знущання і тортури",
  "7-22-15": "Азарт, ризик, адреналін",
  "8-3-22": "Уявна любов",
  "8-6-16": "У полоні любові",
  "8-7-17": "Ексклюзив",
  "8-8-18": "Страх розчарування й обману",
  "8-9-19": "Безнадія",
  "8-10-20": "Звільнення з неволі",
  "8-11-21": "Творець нової реальності",
  "8-18-10": "У пошуках справедливості",
  "8-19-11": "Господар своєї долі",
  "8-20-12": "Спустошення душі",
  "8-21-13": "Системна помилка",
  "8-22-14": "Скупість",
  "9-4-22": "Несвобода",
  "9-5-14": "Внутрішній учитель",
  "9-6-15": "Казковий світ, письменник і творець",
  "9-7-16": "Руйнівник ілюзій",
  "9-8-17": "Приховування істини",
  "9-10-19": "Мандрівний мудрець",
  "9-11-20": "Мудрий Лев",
  "9-21-12": "Переоцінка життєвого шляху",
  "9-22-13": "Неспокійні душі",
  "10-3-20": "Обман з боку жінок",
  "10-5-13": "Перегляд звичних шаблонів",
  "10-5-22": "Інквізиція",
  "10-6-14": "Поворот долі",
  "10-7-15": "Шлях спокус",
  "10-8-16": "Змова, змовник",
  "10-9-17": "Ідеаліст",
  "10-9-19": "Чистий потік енергії",
  "10-10-18": "Страх довіри Богу",
  "10-11-19": "Вигорання, спалах",
  "11-3-19": "Марність зусиль",
  "11-4-20": "Сильна воля",
  "11-5-21": "Підробка",
  "11-6-22": "Маніпуляція дитиною",
  "11-7-14": "Розмірене життя",
  "11-9-16": "Саморуйнування",
  "11-10-17": "Втрачений шанс",
  "11-11-18": "Страх прийняття магічної сили",
  "12-4-19": "Жертва заради влади",
  "12-5-20": "Жертва заради мрії",
  "12-6-21": "Жертва обставин",
  "12-7-22": "Пошук обхідних шляхів",
  "12-9-15": "Усвідомлені жертви",
  "12-10-16": "Втрачені можливості",
  "12-11-17": "Незвичайні мрії",
  "13-3-17": "Метаморфози долі",
  "13-4-18": "Страх влади та відповідальності",
  "13-5-19": "Неприйняття вчителів",
  "13-6-20": "Страх серйозних стосунків",
  "13-8-22": "Потяг до невиправданого ризику",
  "14-5-18": "Хибні духовні цінності",
  "14-6-19": "Тихе сімейне щастя",
  "14-7-20": "Шлях у тиху гавань",
  "14-8-21": "Баланс протилежностей",
  "14-9-22": "Занудний всезнайко",
  "15-7-19": "У пошуку задоволень",
  "15-8-20": "У клітці протиріч",
  "15-9-21": "Самотність серед натовпу",
  "15-10-22": "Циклічне саморуйнування",
  "16-9-20": "Реформатор традицій",
  "16-11-22": "Відновлення зруйнованого",
  "17-11-21": "Маяк в океані",
  "17-12-22": "Переворот світогляду",
  "18-4-22": "Мандрівник без мети",
};

/**
 * Sexuality program names, keyed by the NATURAL (unsorted) "E-L2-L1" order —
 * unlike родові programs, direction matters here: mirrored orders (e.g.
 * "3-6-9" vs "6-3-9") are distinct named programs with different content, per
 * gadalkindom.ru's own "Направление формирования программы — зеркальная"
 * note. There are exactly 25 possible combinations (E, L2 each an arcana
 * number, L1 = reduce(E + L2)) — full catalog pasted into the project chat
 * 2026-08-24.
 */
export const SEXUALITY_PROGRAM_NAMES: Record<string, string> = {
  "6-12-18": "Ідеаліст і скептик",
  "8-7-15": "Священний союз",
  "10-11-21": "Покірний слуга",
  "3-6-9": "Вогонь і папір",
  "5-10-15": "Порок і чистота",
  "7-5-12": "Сукуб і Інкуб",
  "9-9-18": "Тіні минулих стосунків",
  "11-4-15": "Батіг і наручники",
  "4-8-12": "Зцілення близькістю",
  "6-3-9": "Естет і гурман",
  "11-13-6": "Той, хто біжить по лезу",
  "12-6-18": "Помилки молодості",
  "7-14-21": "Болісна скромність",
  "13-8-21": "Дикий звір",
  "12-15-9": "Розчарований мисливець",
  "11-22-6": "Пристрасть чи любов",
  "9-18-9": "Тантричний шлях",
  "8-16-6": "Пристрасть у моменти кризи",
  "10-20-3": "Випадкові зв'язки",
  "6-21-9": "Низка зрад",
  "14-10-6": "Вишуканий коханець",
  "16-5-21": "Один на все життя",
  "18-9-9": "Спляча красуня",
  "20-4-6": "Зміна темпераменту",
  "22-8-3": "Потяг до різноманітності",
};

export type AncestralCornerKey = "nw" | "ne" | "sw" | "se";

export interface AncestralCorner {
  key: AncestralCornerKey;
  numbers: [number, number, number];
  programKey: string;
  name: string | null;
}

/**
 * Builds an ANCESTRAL_PROGRAM_NAMES lookup key from a corner value and its
 * axis pair. The archetype is determined by axis[1] (the "outer" ancestral
 * value) sitting in the middle, with corner and axis[0] ("inner") sorted
 * ascending around it — see the comment on ANCESTRAL_PROGRAM_NAMES for why
 * a plain sorted key is wrong here.
 */
function ancestralProgramKey(corner: number, axis: readonly [number, number]): string {
  const [inner, outer] = axis;
  const outerMin = Math.min(corner, inner);
  const outerMax = Math.max(corner, inner);
  return `${outerMin}-${outer}-${outerMax}`;
}

/**
 * The four родові corner programs: [corner value, axis-inner, axis-outer]
 * for each of nw (батьківська духовна), ne (материнська духовна), sw
 * (батьківська матеріальна), se (материнська матеріальна).
 */
export function getAncestralPrograms(matrix: MatrixPoints): AncestralCorner[] {
  const corners: { key: AncestralCornerKey; corner: number; axis: [number, number] }[] = [
    { key: "nw", corner: matrix.nw, axis: matrix.nwAxis },
    { key: "ne", corner: matrix.ne, axis: matrix.neAxis },
    { key: "sw", corner: matrix.sw, axis: matrix.swAxis },
    { key: "se", corner: matrix.se, axis: matrix.seAxis },
  ];

  return corners.map(({ key, corner, axis }) => {
    const numbers: [number, number, number] = [corner, axis[0], axis[1]];
    const programKey = ancestralProgramKey(corner, axis);
    return { key, numbers, programKey, name: ANCESTRAL_PROGRAM_NAMES[programKey] ?? null };
  });
}

/**
 * Кармічний хвіст (karmic tail) program names, keyed the same
 * `${outerMin}-${middle}-${outerMax}` way as ANCESTRAL_PROGRAM_NAMES — a
 * genuinely separate gadalkindom catalog from родові programs, even though
 * both share the same key format and can coincidentally collide on the same
 * 3-number key (confirmed: `6-5-17` and `6-15-9` each name a DIFFERENT
 * program in this catalog than in ANCESTRAL_PROGRAM_NAMES). Content is
 * stored in its own `src/content/programs/karmic-tail/{locale}/` directory
 * for exactly this reason — see the comment on KARMIC_TAIL_PROGRAMS_ROOT.
 * Sourced from gadalkindom.ru's dedicated karmic-tail index page (only
 * ~24-26 programs total exist, per the site's own count — a much smaller,
 * closed catalog than родові's 145+), scraped 2026-08-27. See
 * docs/rod-programs-catalog.md for the scrape and validation (the formula
 * `[karma, loveEntrance, d2]` from `matrix.ts`'s `karmicTail` field was
 * cross-checked against 2 real birth dates and matched this catalog's keys
 * exactly: `8-5-15` for 24.09.1973, `9-9-18` for 27.08.2026).
 */
export const KARMIC_TAIL_PROGRAM_NAMES: Record<string, string> = {
  "3-7-22": "В'язень",
  "3-12-9": "Жіноча самотність",
  "3-13-10": "Самогубець",
  "3-22-19": "Ненароджена дитина",
  "4-16-12": "Володар",
  "6-5-17": "Краса і марнославство",
  "6-6-18": "Нерозділена любов",
  "6-8-20": "Ганьба родини",
  "6-14-8": "Деспот",
  "6-15-9": "Пристрасть чи любов",
  "6-17-11": "Нереалізований талант",
  "6-20-14": "Жертва",
  "7-10-21": "Воїн віри",
  "7-19-12": "Військовий",
  "8-5-15": "Сімейні пристрасті",
  "9-3-21": "Наглядач",
  "9-9-18": "Заборонені знання",
  "10-4-21": "Пригнічений дух",
  "11-8-15": "Фізична агресія",
  "12-3-18": "Фізичні страждання",
  "13-7-21": "Руйнівник і вбивця",
  "5-20-15": "Бунтар",
  "15-6-18": "Чорний маг",
  "16-10-21": "Духовний учитель",
};

export interface KarmicTailInfo {
  numbers: [number, number, number];
  programKey: string;
  name: string | null;
}

/**
 * `matrix.karmicTail` is `[karma, loveEntrance, d2]` where
 * `d2 = reduce(karma + loveEntrance)` — structurally identical to
 * `buildAncestralAxis`'s corner/inner/outer chain, so the same
 * middle-is-the-outer-derived-value rule applies: the site's real key sorts
 * karma/loveEntrance ascending around `d2` in the middle.
 */
export function getKarmicTailInfo(matrix: MatrixPoints): KarmicTailInfo {
  const [karma, loveEntrance, d2] = matrix.karmicTail;
  const outerMin = Math.min(karma, loveEntrance);
  const outerMax = Math.max(karma, loveEntrance);
  const programKey = `${outerMin}-${d2}-${outerMax}`;
  return { numbers: matrix.karmicTail, programKey, name: KARMIC_TAIL_PROGRAM_NAMES[programKey] ?? null };
}

export interface SexualityProgramInfo {
  numbers: [number, number, number];
  programKey: string;
  name: string | null;
}

export function getSexualityProgramInfo(birthDate: BirthDate): SexualityProgramInfo {
  const numbers = calculateSexualityProgram(birthDate);
  // Natural order (not sorted) — direction distinguishes programs here, see
  // the comment on SEXUALITY_PROGRAM_NAMES above.
  const programKey = numbers.join("-");
  return { numbers, programKey, name: SEXUALITY_PROGRAM_NAMES[programKey] ?? null };
}

export interface ProgramContent {
  name: string;
  numbers: string;
  intro: string;
  plus: string;
  minus: string;
  closing: string;
}

const PROGRAMS_ROOT = path.join(process.cwd(), "src", "content", "programs");

/**
 * родові program content lives in its OWN subdirectory, separate from
 * PROGRAMS_ROOT (which sexuality programs read from directly). This is a
 * deliberate fix, not the original layout: родові and sexuality programs
 * used to share the same flat `src/content/programs/{locale}/{key}.md`
 * path, and since родові keys are still being populated incrementally
 * across a large possible range (145+ triples), a coincidental key
 * collision with one of the 25 fixed sexuality keys silently served the
 * WRONG program's content (found live 2026-08-27: birth-date corner key
 * `18-9-9` resolved to the sexuality file «Спляча красуня» instead of
 * falling back to "no content yet"). See docs/rod-programs-catalog.md.
 */
const ANCESTRAL_PROGRAMS_ROOT = path.join(process.cwd(), "src", "content", "programs", "ancestral");

/** Кармічний хвіст content — its own subdirectory for the same reason as ANCESTRAL_PROGRAMS_ROOT (shared key format, separate catalog). */
const KARMIC_TAIL_PROGRAMS_ROOT = path.join(process.cwd(), "src", "content", "programs", "karmic-tail");

/** Splits markdown body into `## Heading` sections, keyed by heading text. */
function parseSections(markdown: string): Record<string, string> {
  const parts = markdown.split(/\n##\s+/);
  const sections: Record<string, string> = {};
  for (const part of parts.slice(1)) {
    const newlineIndex = part.indexOf("\n");
    const heading = (newlineIndex === -1 ? part : part.slice(0, newlineIndex)).trim();
    const body = newlineIndex === -1 ? "" : part.slice(newlineIndex + 1).trim();
    sections[heading] = body;
  }
  return sections;
}

/**
 * Section heading text varies by locale (translators localize the `##`
 * headings themselves, e.g. ru "Минус"/"Итог" vs uk "Мінус"/"Підсумок" —
 * these are never rendered to the user, ProgramList only shows the parsed
 * paragraph text, but `parseSections` keys its output by the literal
 * heading string, so the lookup below must match each locale's actual
 * wording or the section silently comes back empty).
 */
const PROGRAM_SECTION_HEADINGS: Record<Locale, { intro: string; plus: string; minus: string; closing: string }> = {
  uk: { intro: "Суть", plus: "Плюс", minus: "Мінус", closing: "Підсумок" },
  ru: { intro: "Суть", plus: "Плюс", minus: "Минус", closing: "Итог" },
  en: { intro: "Essence", plus: "Positive", minus: "Negative", closing: "Summary" },
};

function readProgramContent(root: string, programKey: string, locale: Locale): ProgramContent | null {
  const filePath = path.join(root, locale, `${programKey}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const sections = parseSections(content);
  const headings = PROGRAM_SECTION_HEADINGS[locale];

  return {
    name: data.name ?? "",
    numbers: data.numbers ?? programKey,
    intro: sections[headings.intro] ?? "",
    plus: sections[headings.plus] ?? "",
    minus: sections[headings.minus] ?? "",
    closing: sections[headings.closing] ?? "",
  };
}

/** Reads a sexuality program's plus/minus content by its natural-order key. Returns null if not yet written. */
export function getProgramContent(programKey: string, locale: Locale): ProgramContent | null {
  return readProgramContent(PROGRAMS_ROOT, programKey, locale);
}

/** Reads a родові (ancestral) program's plus/minus content by its `ancestralProgramKey`. Returns null if not yet written. */
export function getAncestralProgramContent(programKey: string, locale: Locale): ProgramContent | null {
  return readProgramContent(ANCESTRAL_PROGRAMS_ROOT, programKey, locale);
}

/** Reads a кармічний хвіст program's plus/minus content by its karmic-tail key. Returns null if not yet written. */
export function getKarmicTailContent(programKey: string, locale: Locale): ProgramContent | null {
  return readProgramContent(KARMIC_TAIL_PROGRAMS_ROOT, programKey, locale);
}
