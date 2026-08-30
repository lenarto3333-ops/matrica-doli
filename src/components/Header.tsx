import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import LangSwitcher from "./LangSwitcher";
import AuthButton from "./AuthButton";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

const NAV_ANCHORS = ["#method", "#what-matrix", "#reviews", "#faq"];

export default function Header({ dict, locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EEE6D9]">
      <div className="mx-auto max-w-[1240px] flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0 min-w-0 group">
          <Image
            src="/logo.png"
            alt="Матриця Долі"
            width={2075}
            height={636}
            priority
            className="h-8 sm:h-11 w-auto transition-opacity group-hover:opacity-80"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#635E59]">
          {dict.nav.items.map((label, i) => (
            <a
              key={label}
              href={`/${locale}${NAV_ANCHORS[i] || "#calculator"}`}
              className="hover:text-[#985f6b] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <LangSwitcher locale={locale} />
          <AuthButton dict={dict} locale={locale} />
        </div>
      </div>
    </header>
  );
}
