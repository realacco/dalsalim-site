import "./home.css";

import { JsonLd } from "@/components/JsonLd";
import { PLATFORMS, SITE } from "@/config/site";
import { homePath, LOCALE_INFO, type Locale, messages, withStoreLang } from "@/i18n";

import { Closing } from "./Closing";
import { Faq } from "./Faq";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { Ledgers } from "./Ledgers";
import { Marquee } from "./Marquee";
import { Promises } from "./Promises";
import { Stats } from "./Stats";

/** 홈 — 언어마다 같은 차례의 같은 구역이 선다. 글만 그 언어다 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <div className="home">
      <JsonLd data={structuredData(locale)} />
      <Hero locale={locale} />
      <Marquee locale={locale} />
      <Ledgers locale={locale} />
      <Stats locale={locale} />
      <Features locale={locale} />
      <Promises locale={locale} />
      <Faq locale={locale} />
      <Closing locale={locale} />
    </div>
  );
}

/*
  검색 엔진에 주는 구조화 데이터 — 만든 곳 · 사이트 · 앱 · 자주 묻는 것을 한 묶음(@graph)으로.
  사실만 적는다: 가격 · 별점 · 내려받기 수처럼 아직 없는 값은 넣지 않는다.
  만든 곳 · 사이트 · 앱은 언어와 상관없이 하나라 `@id` 를 처음 주소(`/`)에 묶고, 이름 · 설명만 그 언어로 적는다.
*/
function structuredData(locale: Locale) {
  const m = messages(locale);
  const lang = LOCALE_INFO[locale].tag;
  const id = (name: string) => `${SITE.url}/#${name}`;
  const pageUrl = `${SITE.url}${homePath(locale)}`;
  const store = PLATFORMS.find((platform) => platform.storeUrl)?.storeUrl;
  return {
    "@graph": [
      {
        "@type": "Organization",
        "@id": id("publisher"),
        name: SITE.publisher,
        url: SITE.url,
        email: SITE.supportEmail,
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        name: m.site.name,
        alternateName: m.site.alternateNames,
        url: SITE.url,
        inLanguage: ["ko", "en", "ja"],
        publisher: { "@id": id("publisher") },
      },
      {
        "@type": "MobileApplication",
        "@id": id("app"),
        name: m.site.name,
        alternateName: m.site.alternateNames,
        description: m.site.description,
        url: pageUrl,
        image: `${SITE.url}/icon.png`,
        screenshot: ["personal-records", "family-summary", "trip-settlement"].map(
          (shot) => `${SITE.url}/shots/${shot}.webp`,
        ),
        applicationCategory: "FinanceApplication",
        operatingSystem: "Android",
        installUrl: store ? withStoreLang(store, locale) : undefined,
        inLanguage: ["ko", "en", "ja"],
        featureList: m.site.featureList,
        publisher: { "@id": id("publisher") },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: m.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
