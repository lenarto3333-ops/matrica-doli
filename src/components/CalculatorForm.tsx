"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, type FormEvent } from "react";
import { isValidDate, type Gender } from "@/lib/matrix";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 1900 + 1 },
  (_, i) => CURRENT_YEAR - i,
);

interface CalculatorFormProps {
  dict: Dictionary;
  locale: Locale;
  className?: string;
}

export default function CalculatorForm({ dict, locale, className = "" }: CalculatorFormProps) {
  const router = useRouter();

  // Initialize with current actual today's date
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [gender, setGender] = useState<Gender>("man");
  const [error, setError] = useState<string | null>(null);

  // Sync client-side date on load to get exact today's calendar date
  useEffect(() => {
    const today = new Date();
    setDay(today.getDate());
    setMonth(today.getMonth() + 1);
    setYear(today.getFullYear());
  }, []);

  const setToToday = () => {
    const today = new Date();
    setDay(today.getDate());
    setMonth(today.getMonth() + 1);
    setYear(today.getFullYear());
  };

  const formattedToday = `${String(day).padStart(2, "0")}.${String(month).padStart(
    2,
    "0",
  )}.${year}`;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidDate({ day, month, year })) {
      setError(dict.form.dateError);
      return;
    }
    setError(null);
    router.push(`/${locale}/result?d=${day}&m=${month}&y=${year}&sex=${gender}`);
  }

  return (
    <div className={`rounded-2xl sm:rounded-[28px] bg-white border border-[#EEE6D9] shadow-xl shadow-[#985f6b]/10 p-7 sm:p-9 text-left ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-6">
        <h2 className="font-sans font-bold text-xl text-[#2C2825]">
          Введіть дату народження
        </h2>
        <button
          type="button"
          onClick={setToToday}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#EEE6D9] bg-[#FDFBF7] px-2.5 py-1 text-xs font-medium text-[#985f6b] hover:bg-[#F9EFF1] transition-colors cursor-pointer"
          title="Виставити актуальну дата на сьогодні"
        >
          <span>📅</span>
          <span>{formattedToday}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <label className="flex flex-col gap-2 text-xs font-medium text-[#635E59]">
            <span>{dict.form.day}</span>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full rounded-xl border border-[#EEE6D9] bg-[#FDFBF7] px-3 py-3 text-[#2C2825] font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#985f6b]/40 cursor-pointer"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {String(d).padStart(2, "0")}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium text-[#635E59]">
            <span>{dict.form.month}</span>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full rounded-xl border border-[#EEE6D9] bg-[#FDFBF7] px-3 py-3 text-[#2C2825] font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#985f6b]/40 cursor-pointer"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {String(m).padStart(2, "0")}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium text-[#635E59]">
            <span>{dict.form.year}</span>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full rounded-xl border border-[#EEE6D9] bg-[#FDFBF7] px-3 py-3 text-[#2C2825] font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#985f6b]/40 cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="mb-6">
          <legend className="mb-2 text-xs font-medium text-[#635E59]">
            {dict.form.gender}
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(["man", "woman"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={gender === value}
                onClick={() => setGender(value)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  gender === value
                    ? "border-[#985f6b] bg-[#F9EFF1] text-[#824d58]"
                    : "border-[#EEE6D9] bg-[#FDFBF7] text-[#635E59]"
                }`}
              >
                {value === "man" ? dict.form.man : dict.form.woman}
              </button>
            ))}
          </div>
        </fieldset>

        {error && <p className="mb-4 text-xs font-medium text-[#985f6b]">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-[#985f6b] to-[#824d58] hover:from-[#88525e] hover:to-[#75434d] text-white font-medium text-lg py-4 flex items-center justify-center gap-2 shadow-md shadow-[#985f6b]/20 transition-all cursor-pointer"
        >
          <span>{dict.form.submit}</span>
          <span className="text-xl">→</span>
        </button>

        <div className="mt-5 flex items-center gap-2 text-xs text-[#635E59]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F9EFF1] text-[#985f6b] font-bold text-xs">
            ✓
          </span>
          <span>{dict.form.freeNote}</span>
        </div>
      </form>
    </div>
  );
}
