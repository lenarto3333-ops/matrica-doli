import CalculatorForm from "./CalculatorForm";
import MysticBackground from "./MysticBackground";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section id="calculator" className="relative isolate overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24">
      <MysticBackground />

      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 text-[#985f6b] tracking-[0.25em] uppercase text-xs font-semibold mb-6">
              <span>ПІЗНАННЯ СЕБЕ</span>
              <span>•</span>
              <span>ЯСНІСТЬ</span>
              <span>•</span>
              <span>НАПРЯМОК</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#2C2825] font-normal leading-[1.12] mb-6">
              {dict.hero.title}
            </h1>

            <p className="text-[#635E59] text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-8">
              {dict.hero.subtitle}
            </p>
          </div>

          {/* Right Column Form Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CalculatorForm dict={dict} locale={locale} className="w-full max-w-md" />
          </div>
        </div>

        {/* Bottom Feature Cards Bar (Feature Strip) */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3.5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#EEE6D9] shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFF1] text-[#985f6b]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <span className="font-semibold text-sm sm:text-base text-[#2C2825]">Точний розрахунок</span>
          </div>

          <div className="flex items-center justify-center gap-3.5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#EEE6D9] shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFF1] text-[#985f6b]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="font-semibold text-sm sm:text-base text-[#2C2825]">Персональне трактування</span>
          </div>

          <div className="flex items-center justify-center gap-3.5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#EEE6D9] shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9EFF1] text-[#985f6b]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6m-5 3h4M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
              </svg>
            </div>
            <span className="font-semibold text-sm sm:text-base text-[#2C2825]">Зрозумілі рекомендації</span>
          </div>
        </div>
      </div>
    </section>
  );
}
