"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import AuthModal from "./AuthModal";

interface AuthButtonProps {
  dict: Dictionary;
  locale: Locale;
}

export default function AuthButton({ dict, locale }: AuthButtonProps) {
  const { data: session, status } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  if (status === "authenticated" && session.user) {
    const fullName = session.user.name || session.user.email || "";
    const firstName = fullName.split(" ")[0];
    const w = dict.welcomePanel;
    const greetingParts = w.greeting.split("{name}");

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setPanelOpen((v) => !v)}
          className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-plum pl-1.5 sm:pl-2 pr-2.5 sm:pr-4 py-1.5 text-xs font-bold uppercase tracking-wide text-cream hover:bg-plum-dark transition-colors max-w-[140px] sm:max-w-none"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/20 text-sm">
            👤
          </span>
          <span className="truncate">{firstName}</span>
        </button>

        {panelOpen && (
          <>
            <button
              type="button"
              aria-label={dict.auth.close}
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setPanelOpen(false)}
            />
            <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-16 sm:top-full mt-0 sm:mt-3 z-50 sm:w-80 rounded-2xl bg-card border border-border shadow-2xl p-6">
              <p className="font-heading font-extrabold uppercase text-base leading-snug mb-4">
                {greetingParts[0]}
                <span className="text-plum">{firstName}</span>
                {greetingParts[1]}
              </p>

              <p className="text-sm text-ink-soft mb-2">{w.socialIntro}</p>
              <div className="flex items-center gap-2 mb-3">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-soft text-plum-dark"
                  aria-label="Telegram"
                >
                  ✈️
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-soft text-plum-dark"
                  aria-label="Instagram"
                >
                  📷
                </a>
              </div>
              <p className="text-sm text-ink-soft mb-5">{w.socialText}</p>

              <p className="text-xs font-bold uppercase tracking-wide text-ink mb-1.5">
                {w.navTitle}
              </p>
              <p className="text-sm text-ink-soft mb-1.5">
                {w.navCalculators}{" "}
                <a href={`/${locale}#calculator`} className="text-plum underline" onClick={() => setPanelOpen(false)}>
                  {w.navCalculatorsLink}
                </a>
              </p>
              <p className="text-sm text-ink-soft mb-5">
                {w.savedMatrices}{" "}
                <Link href={`/${locale}/account`} className="text-plum underline" onClick={() => setPanelOpen(false)}>
                  {w.savedMatricesLink}
                </Link>
              </p>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="w-full rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-cream hover:bg-ink/85 transition-colors"
              >
                {dict.auth.logout}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="shrink-0 whitespace-nowrap rounded-xl border border-[#985f6b] px-3.5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#2C2825] hover:bg-[#985f6b] hover:text-white transition-all cursor-pointer shadow-xs"
      >
        {dict.auth.login}
      </button>
      {modalOpen && (
        <AuthModal dict={dict.auth} locale={locale} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
