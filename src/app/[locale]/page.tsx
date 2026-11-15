import { notFound } from "next/navigation";

import { HomePage } from "@/components/home/HomePage";
import { isLocale } from "@/i18n";

export default async function LocaleHome({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
