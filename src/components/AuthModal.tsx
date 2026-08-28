"use client";

import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";
import type { Locale } from "@/i18n/config";
import type { AuthDict } from "@/i18n/types";
import AccentWord from "./AccentWord";

interface AuthModalProps {
  dict: AuthDict;
  locale: Locale;
  onClose: () => void;
  initialMode?: Mode;
}

type Mode = "login" | "signup" | "reset";
type ErrorKey = keyof AuthDict["errors"];

export default function AuthModal({ dict, locale, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setResetSent(false);
    setDevResetUrl(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "reset") {
        const res = await fetch("/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, locale }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError((data.error as ErrorKey) || "server_error");
          setLoading(false);
          return;
        }
        setResetSent(true);
        setDevResetUrl(data.devResetUrl || null);
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError((data.error as ErrorKey) || "server_error");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("invalid_credentials");
        setLoading(false);
        return;
      }

      onClose();
    } catch {
      setError("server_error");
      setLoading(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-card p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-extrabold uppercase text-lg">
            {mode === "login" && dict.loginTitle}
            {mode === "signup" && dict.signupTitle}
            {mode === "reset" && (
              <>
                {dict.resetTitle} <AccentWord>{dict.resetTitleAccent}</AccentWord>
              </>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.close}
            className="text-ink-soft hover:text-ink text-xl leading-none"
          >
            ×
          </button>
        </div>

        {mode === "reset" && resetSent ? (
          <div>
            <p className="text-sm text-ink-soft mb-4">{dict.resetSent}</p>
            {devResetUrl && (
              <div className="mb-4 rounded-xl border border-border bg-cream-soft/60 p-3">
                <p className="text-xs text-muted mb-1">{dict.resetDevLinkNote}</p>
                <a
                  href={devResetUrl}
                  className="text-xs text-plum break-all underline"
                  onClick={onClose}
                >
                  {devResetUrl}
                </a>
              </div>
            )}
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="w-full rounded-full bg-plum hover:bg-plum-dark transition-colors text-cream font-bold uppercase tracking-wide py-3"
            >
              {dict.loginLink}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                {dict.name}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.namePlaceholder}
                  className="rounded-xl border border-border bg-cream px-3.5 py-2.5 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-plum/40"
                />
              </label>
            )}

            <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
              {dict.email}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.emailPlaceholder}
                className="rounded-xl border border-border bg-cream px-3.5 py-2.5 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-plum/40"
              />
            </label>

            {mode !== "reset" && (
              <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
                {dict.password}
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={dict.passwordPlaceholder}
                  className="rounded-xl border border-border bg-cream px-3.5 py-2.5 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-plum/40"
                />
              </label>
            )}

            {mode === "login" && (
              <button
                type="button"
                onClick={() => switchMode("reset")}
                className="block text-right w-full text-xs text-plum hover:text-plum-dark -mt-2"
              >
                {dict.forgotPassword}
              </button>
            )}

            {error && <p className="text-sm text-plum-dark">{dict.errors[error]}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-plum hover:bg-plum-dark transition-colors text-cream font-bold uppercase tracking-wide py-3 disabled:opacity-60"
            >
              {mode === "login" && dict.loginSubmit}
              {mode === "signup" && dict.signupSubmit}
              {mode === "reset" && dict.resetSubmit}
            </button>
          </form>
        )}

        {!(mode === "reset" && resetSent) && (
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={mode === "signup" ? "text-plum font-bold" : "text-ink-soft hover:text-plum underline"}
            >
              {dict.registerLink}
            </button>
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={mode === "login" ? "text-plum font-bold" : "text-ink-soft hover:text-plum underline"}
            >
              {dict.loginLink}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
