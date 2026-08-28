import type { Locale } from "./config";
import type { Dictionary } from "./types";
import uk from "./dictionaries/uk";
import ru from "./dictionaries/ru";
import en from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { uk, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
