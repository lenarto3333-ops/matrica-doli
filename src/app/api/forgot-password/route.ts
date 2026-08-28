import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { isLocale, defaultLocale } from "@/i18n/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const rawLocale = typeof body?.locale === "string" ? body.locale : defaultLocale;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond the same way whether or not the account exists, so the
  // endpoint can't be used to enumerate registered emails.
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  await prisma.passwordResetToken.deleteMany({ where: { email } });

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: { token, email, expiresAt: new Date(Date.now() + TOKEN_TTL_MS) },
  });

  const origin = request.headers.get("origin") || new URL(request.url).origin;
  const resetUrl = `${origin}/${locale}/reset-password?token=${token}`;

  // No transactional email provider is configured yet — log the link so it
  // can be used during development/testing. Wire up a real mail service
  // (Resend, SES, etc.) before this goes to production, and stop returning
  // devResetUrl once that's in place.
  console.log(`[password reset] ${email} -> ${resetUrl}`);

  const isProd = process.env.NODE_ENV === "production";
  return NextResponse.json({ ok: true, devResetUrl: isProd ? undefined : resetUrl });
}
