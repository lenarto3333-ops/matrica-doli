import type { ReactNode } from "react";

interface FreeBlockProps {
  index: number;
  title: string;
  children: ReactNode;
  warn?: boolean;
}

export default function FreeBlock({ index, title, children, warn = false }: FreeBlockProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
            warn
              ? "bg-plum text-cream"
              : "bg-plum-soft text-plum-dark"
          }`}
        >
          {index}
        </span>
        <h3 className="font-heading font-bold text-lg">{title}</h3>
      </div>
      <div className="text-ink-soft leading-relaxed pl-10">{children}</div>
    </div>
  );
}
