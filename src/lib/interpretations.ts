/**
 * Loader for the interpretation content library at
 * src/content/interpretations/{locale}/{module}/{NN}.md
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

export interface InterpretationContent {
  energy: number;
  arcana: string;
  module: string;
  locale: string;
  status: string;
  /** Markdown body, frontmatter stripped, title (H1) stripped. */
  body: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "interpretations");

/** Removes the leading "# N. Name — Subtitle" heading line, if present. */
function stripTitleHeading(markdown: string): string {
  // `\s*` absorbs the blank line gray-matter's `content` leaves between the
  // frontmatter's closing "---" and the H1 — without it, `^#` never matches
  // (content starts with "\n#...", not "#..."), so the heading silently
  // never got stripped and rendered as a redundant duplicate <h1> on every
  // content block site-wide.
  return markdown.replace(/^\s*#\s.*\n+/, "");
}

/**
 * Reads and parses one interpretation file. Returns null if the arcana
 * number is out of range or the file doesn't exist on disk.
 */
export function getInterpretation(
  module: string,
  energy: number,
  locale: Locale,
): InterpretationContent | null {
  if (energy < 1 || energy > 22) return null;

  const nn = String(energy).padStart(2, "0");
  const filePath = path.join(CONTENT_ROOT, locale, module, `${nn}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    energy: data.energy ?? energy,
    arcana: data.arcana ?? "",
    module: data.module ?? module,
    locale: data.locale ?? locale,
    status: data.status ?? "draft",
    body: stripTitleHeading(content).trim(),
  };
}
