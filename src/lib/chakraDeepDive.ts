/**
 * Per-arcana "what to work on" health content: for whichever arcana lands in
 * a chakra's (or the Ітог/total row's) "emotions" column for a given birth
 * date, this is the plus/minus content on how that arcana manifests as
 * health. Keyed by arcana number alone (1-22), not by chakra — the source
 * material reuses the same arcana write-up verbatim regardless of which
 * chakra/row it appears under (confirmed: arcana 8's text is identical for
 * Аджна and for Ітог). Independent of the general per-arcana interpretation
 * library in src/lib/interpretations.ts.
 *
 * Content lives at src/content/chakra-health/{locale}/{arcana}.md. Only
 * arcana actually verified/written so far exist — one with no file falls
 * back to a "coming soon" note (same pattern as src/lib/programs.ts).
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

export interface ChakraHealthPoint {
  label: string;
  text: string;
}

export interface ChakraHealthContent {
  intro: string;
  plus: ChakraHealthPoint[];
  minus: ChakraHealthPoint[];
}

const CHAKRA_HEALTH_ROOT = path.join(process.cwd(), "src", "content", "chakra-health");

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

/** Parses "- **Label.** Text" bullet lines into labeled points. */
function parsePoints(section: string | undefined): ChakraHealthPoint[] {
  if (!section) return [];
  return section
    .split(/(?:^|\n)-\s+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\*\*(.+?)\.\*\*\s*([\s\S]+)$/);
      if (!match) return { label: "", text: line };
      return { label: match[1], text: match[2] };
    });
}

/** Reads an arcana's health content. Returns null if not yet written. */
export function getChakraHealthContent(arcana: number, locale: Locale): ChakraHealthContent | null {
  const filePath = path.join(CHAKRA_HEALTH_ROOT, locale, `${arcana}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const sections = parseSections(content);

  return {
    intro: sections["Вступ"] ?? "",
    plus: parsePoints(sections["Плюс"]),
    minus: parsePoints(sections["Мінус"]),
  };
}
