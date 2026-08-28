export interface MarkdownSection {
  heading: string;
  body: string;
}

/**
 * Splits a markdown body into its top-level (`## `) sections. Nested `###`
 * subheadings stay inside their parent section's body untouched.
 */
export function splitMarkdownSections(markdown: string): MarkdownSection[] {
  const parts = markdown.split(/\n(?=## )/g);
  const sections: MarkdownSection[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    const match = trimmed.match(/^##\s+(.+?)\s*\n([\s\S]*)$/);
    if (!match) continue;
    sections.push({ heading: match[1].trim(), body: match[2].trim() });
  }

  return sections;
}
