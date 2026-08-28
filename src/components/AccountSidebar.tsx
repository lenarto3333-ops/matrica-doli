"use client";

import { signOut } from "next-auth/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface AccountSidebarProps {
  dict: Dictionary;
  locale: Locale;
}

export default function AccountSidebar({ dict, locale }: AccountSidebarProps) {
  const s = dict.account.sidebar;
  const items = [
    { label: s.myMatrices, href: `/${locale}/account` },
    { label: s.pricing, href: `/${locale}#pricing` },
    { label: s.history, href: `/${locale}/account` },
    { label: s.matrixOfDestiny, href: `/${locale}#calculator` },
    { label: s.finances, href: `/${locale}#calculator` },
    { label: s.changePassword, href: `/${locale}/account` },
    { label: s.support, href: `/${locale}#footer` },
  ];

  return (
    <nav className="w-full lg:w-56 shrink-0">
      <ul className="space-y-1 text-sm font-bold uppercase tracking-wide">
        {items.map((item, i) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={`block rounded-lg px-3 py-2 transition-colors ${
                i === 0 ? "text-plum bg-plum-soft" : "text-ink-soft hover:text-ink hover:bg-cream-soft"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            className="block w-full text-left rounded-lg px-3 py-2 text-ink-soft hover:text-plum-dark hover:bg-cream-soft transition-colors"
          >
            {s.logout}
          </button>
        </li>
      </ul>
    </nav>
  );
}
