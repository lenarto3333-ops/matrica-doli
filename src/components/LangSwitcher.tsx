"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";

const LABELS: Record<Locale, string> = { uk: "UA", ru: "RU", en: "EN" };

interface LangSwitcherProps {
  locale: Locale;
}

function LangSwitcherInner({ locale }: LangSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const restOfPath = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1 text-xs font-bold">
      {locales.map((loc, i) => {
        const href = `/${loc}${restOfPath ? `/${restOfPath}` : ""}${query ? `?${query}` : ""}`;
        return (
          <span key={loc} className="flex items-center">
            <Link
              href={href}
              className={loc === locale ? "text-plum" : "text-ink-soft hover:text-ink"}
            >
              {LABELS[loc]}
            </Link>
            {i < locales.length - 1 && <span className="mx-1 text-border">/</span>}
          </span>
        );
      })}
    </div>
  );
}

export default function LangSwitcher(props: LangSwitcherProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-1 text-xs font-bold">
          {locales.map((loc, i) => (
            <span key={loc} className="flex items-center">
              <span className={loc === props.locale ? "text-plum" : "text-ink-soft"}>
                {LABELS[loc]}
              </span>
              {i < locales.length - 1 && <span className="mx-1 text-border">/</span>}
            </span>
          ))}
        </div>
      }
    >
      <LangSwitcherInner {...props} />
    </Suspense>
  );
}
