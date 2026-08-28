import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MethodSection from "@/components/MethodSection";
import WhatMatrixTellsSection from "@/components/WhatMatrixTellsSection";
import UniquePersonSection from "@/components/UniquePersonSection";
import EnergiesSection from "@/components/EnergiesSection";
import ArcanaCardsGallery from "@/components/ArcanaCardsGallery";
import LearnSection from "@/components/LearnSection";
import FreeCalculateSection from "@/components/FreeCalculateSection";
import PricingSection from "@/components/PricingSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import PromoBlocks from "@/components/PromoBlocks";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, defaultLocale } from "@/i18n/config";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function Home({ params }: HomeProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} />
        <MethodSection />
        <WhatMatrixTellsSection dict={dict} />
        <UniquePersonSection dict={dict} />
        <EnergiesSection dict={dict} />
        <ArcanaCardsGallery locale={locale} />
        <LearnSection dict={dict} />
        <FreeCalculateSection dict={dict} />
        <PricingSection dict={dict} />
        <ReviewsSection />
        <FaqSection />
        <PromoBlocks dict={dict} />
        <FinalCtaSection dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
