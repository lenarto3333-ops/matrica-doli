import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import EsotericPageDecor from "@/components/EsotericPageDecor";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, defaultLocale } from "@/i18n/config";

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const { token } = await searchParams;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="relative isolate overflow-hidden mx-auto max-w-[1240px] px-6 py-16">
        <EsotericPageDecor />
        <ResetPasswordForm dict={dict.auth} locale={locale} token={token || ""} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
