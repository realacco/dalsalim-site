import "./home.css";

import { Closing } from "@/components/home/Closing";
import { FAQ, Faq } from "@/components/home/Faq";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Ledgers } from "@/components/home/Ledgers";
import { Marquee } from "@/components/home/Marquee";
import { Promises } from "@/components/home/Promises";
import { Stats } from "@/components/home/Stats";
import { JsonLd } from "@/components/JsonLd";
import { ROUTES } from "@/config/routes";
import { PLATFORMS, SITE } from "@/config/site";

export default function HomePage() {
  return (
    <div className="home">
      <JsonLd data={structuredData()} />
      <Hero />
      <Marquee />
      <Ledgers />
      <Stats />
      <Features />
      <Promises />
      <Faq />
      <Closing />
    </div>
  );
}

/*
  검색 엔진에 주는 구조화 데이터 — 만든 곳 · 사이트 · 앱 · 자주 묻는 것을 한 묶음(@graph)으로.
  사실만 적는다: 가격 · 별점 · 내려받기 수처럼 아직 없는 값은 넣지 않는다.
*/
function structuredData() {
  const id = (name: string) => `${SITE.url}${ROUTES.home}#${name}`;
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
        name: SITE.name,
        alternateName: SITE.alternateNames,
        url: SITE.url,
        inLanguage: "ko",
        publisher: { "@id": id("publisher") },
      },
      {
        "@type": "MobileApplication",
        "@id": id("app"),
        name: SITE.name,
        alternateName: SITE.alternateNames,
        description: SITE.description,
        url: SITE.url,
        image: `${SITE.url}/icon.png`,
        screenshot: ["personal-records", "family-summary", "trip-settlement"].map(
          (shot) => `${SITE.url}/shots/${shot}.webp`,
        ),
        applicationCategory: "FinanceApplication",
        operatingSystem: "Android",
        installUrl: PLATFORMS.find((platform) => platform.storeUrl)?.storeUrl,
        inLanguage: "ko",
        featureList: [
          "부부 · 가족 공유 가계부",
          "개인 가계부 · 월 예산",
          "월간 · 연간 통계 · 지출 분포",
          "여행 가계부 · 외화 지출 · 여행 경비 정산",
          "고정비 · 정기 항목 관리",
          "통장 · 카드 · 현금 자산",
          "카드 결제 알림 모으기 (안드로이드)",
          "엑셀 내보내기 · 홈 화면 위젯",
        ],
        publisher: { "@id": id("publisher") },
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
