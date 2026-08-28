import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountSidebar from "@/components/AccountSidebar";
import AccountCards from "@/components/AccountCards";
import AccentWord from "@/components/AccentWord";
import EsotericPageDecor from "@/components/EsotericPageDecor";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, defaultLocale } from "@/i18n/config";

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  const session = await auth();
  if (!session?.user) {
    redirect(`/${locale}`);
  }

  const a = dict.account;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="relative isolate overflow-hidden mx-auto max-w-[1240px] px-6 py-12 flex flex-col lg:flex-row gap-10">
        <EsotericPageDecor />
        <AccountSidebar dict={dict} locale={locale} />

        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-extrabold uppercase text-2xl mb-2">
            {a.availableDates.title} <AccentWord>{a.availableDates.accent}</AccentWord>
          </h1>
          <p className="text-ink-soft mb-10">{a.availableDates.empty}</p>

          <h2 className="font-heading font-extrabold uppercase text-2xl mb-2">
            {a.subscriptions.title} <AccentWord>{a.subscriptions.accent}</AccentWord>
          </h2>
          <p className="text-ink-soft mb-10">{a.subscriptions.empty}</p>

          <AccountCards cards={a.cards} />
        </div>
      </main>
      <Footer dict={dict} />
    </>
  );
}
