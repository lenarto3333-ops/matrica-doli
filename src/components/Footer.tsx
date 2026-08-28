import type { Dictionary } from "@/i18n/types";

interface Props {
  dict: Dictionary;
}

export default function Footer({ dict }: Props) {
  return (
    <footer className="bg-cream border-t border-border mt-auto">
      <div className="mx-auto max-w-[1240px] px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <span className="font-heading font-bold uppercase tracking-wide text-sm">
            {dict.footer.brand}
          </span>
          <nav className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs">
            {dict.footer.links.map((label) => (
              <a key={label} href="#" className="text-plum hover:text-plum-dark">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="text-xs text-ink-soft text-center sm:text-left">
          {dict.footer.disclaimer} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
