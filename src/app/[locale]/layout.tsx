import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteDocument, siteViewport } from "@/components/SiteDocument";
import { isLocale, PREFIXED_LOCALES } from "@/i18n";
import { siteMetadata } from "@/lib/metadata";

/* 영어 · 일본어 — `/en/` · `/ja/`. 정적으로 내보내므로 이 둘만 만들고 다른 주소는 없는 페이지다 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale) : {};
}

export const viewport = siteViewport;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "ko") notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
