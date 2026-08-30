import ReactMarkdown from "react-markdown";
import { splitMarkdownSections } from "@/lib/markdownSections";

interface InterpretationPoint {
  energy: number | string;
  arcanaName: string;
  body: string;
}

interface FreeInterpretationItem {
  title: string;
  points: InterpretationPoint[];
}

interface FreeInterpretationListProps {
  items: FreeInterpretationItem[];
}

const proseClass =
  "prose prose-base sm:prose-lg max-w-none text-ink-soft prose-headings:font-heading prose-headings:text-ink prose-strong:text-ink";

function isPlusHeading(heading: string) {
  return /плюс|позитив|positive/i.test(heading);
}

function isMinusHeading(heading: string) {
  return /мінус|минус|негатив|negative/i.test(heading);
}

/**
 * Pairs up every plus/minus heading found in document order (a body can
 * contain more than one pair — e.g. a short trait-keyword "У плюсі/У мінусі"
 * list followed later by the fuller "Прояв у плюсі/мінусі" prose) and
 * renders each pair as a two-column grid. Anything else renders normally.
 */
function InterpretationBody({ body }: { body: string }) {
  // Content before the first "## " heading (e.g. the short intro paragraph
  // in the condensed template) isn't part of any section — splitMarkdown-
  // Sections only returns "## "-headed sections, so it must be rendered
  // separately or it silently disappears.
  const firstHeadingIndex = body.search(/(^|\n)## /);
  const preamble = firstHeadingIndex === -1 ? body.trim() : body.slice(0, firstHeadingIndex).trim();

  const sections = splitMarkdownSections(body);
  const minusPartner = new Map<number, number>();
  const consumed = new Set<number>();

  for (let i = 0; i < sections.length; i++) {
    if (consumed.has(i) || !isPlusHeading(sections[i].heading)) continue;
    for (let j = i + 1; j < sections.length; j++) {
      if (isMinusHeading(sections[j].heading)) {
        minusPartner.set(i, j);
        consumed.add(i);
        consumed.add(j);
        break;
      }
      if (isPlusHeading(sections[j].heading)) break;
    }
  }

  if (minusPartner.size === 0) {
    return (
      <div className={proseClass}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    );
  }

  return (
    <>
      {preamble && (
        <div className={proseClass}>
          <ReactMarkdown>{preamble}</ReactMarkdown>
        </div>
      )}
      {sections.map((section, i) => {
        if (consumed.has(i) && !minusPartner.has(i)) return null;
        if (minusPartner.has(i)) {
          const minusSection = sections[minusPartner.get(i)!];
          return (
            <div key={i} className="my-6 grid gap-6 sm:grid-cols-2">
              <div className={proseClass}>
                <h2>{section.heading}</h2>
                <ReactMarkdown>{section.body}</ReactMarkdown>
              </div>
              <div className={proseClass}>
                <h2>{minusSection.heading}</h2>
                <ReactMarkdown>{minusSection.body}</ReactMarkdown>
              </div>
            </div>
          );
        }
        return (
          <div key={i} className={proseClass}>
            <h2>{section.heading}</h2>
            <ReactMarkdown>{section.body}</ReactMarkdown>
          </div>
        );
      })}
    </>
  );
}

export default function FreeInterpretationList({ items }: FreeInterpretationListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.title}
          className="group overflow-hidden rounded-2xl border border-border bg-card"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 font-heading text-lg font-bold marker:content-none sm:text-xl">
            <span
              aria-hidden="true"
              className="text-plum transition-transform duration-200 group-open:rotate-180"
            >
              ▼
            </span>
            <span>{item.title}</span>
          </summary>
          <div className="divide-y divide-border border-t border-border">
            {item.points.map((point, i) => (
              <div key={i} className="px-6 py-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-plum">
                  {point.energy} · {point.arcanaName}
                </p>
                <InterpretationBody body={point.body} />
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
