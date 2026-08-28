"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { AuthDict } from "@/i18n/types";
import AccentWord from "./AccentWord";
import AuthModal from "./AuthModal";

interface ResetPasswordFormProps {
  dict: AuthDict;
  locale: Locale;
  token: string;
}

type ErrorKey = keyof AuthDict["errors"];

export default function ResetPasswordForm({ dict, locale, token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("passwords_mismatch");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data.error as ErrorKey) || "server_error");
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError("server_error");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-sm rounded-3xl bg-card border border-border p-8 text-center">
        <p className="text-sm text-plum-dark">{dict.errors.invalid_token}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-sm rounded-3xl bg-card border border-border p-8 text-center">
        <p className="text-ink-soft mb-6">{dict.newPasswordSuccess}</p>
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="w-full rounded-full bg-plum hover:bg-plum-dark transition-colors text-cream font-bold uppercase tracking-wide py-3"
        >
          {dict.newPasswordSuccessCta}
        </button>
        {loginOpen && (
          <AuthModal dict={dict} locale={locale} onClose={() => setLoginOpen(false)} initialMode="login" />
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-card border border-border p-8">
      <h1 className="font-heading font-extrabold uppercase text-xl mb-6 text-center">
        {dict.newPasswordTitle} <AccentWord>{dict.newPasswordTitleAccent}</AccentWord>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          {dict.newPassword}
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

        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          {dict.confirmPassword}
          <input
            type="password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={dict.confirmPasswordPlaceholder}
            className="rounded-xl border border-border bg-cream px-3.5 py-2.5 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-plum/40"
          />
        </label>

        {error && <p className="text-sm text-plum-dark">{dict.errors[error]}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-plum hover:bg-plum-dark transition-colors text-cream font-bold uppercase tracking-wide py-3 disabled:opacity-60"
        >
          {dict.newPasswordSubmit}
        </button>
      </form>
    </div>
  );
}
