import { SITE } from "@/config/site";

/*
  검색 엔진에 「이 페이지는 이런 앱을 소개한다」를 알리는 구조화 데이터.
  사실만 적는다 — 아직 없는 값(가격 · 별점 · 받는 주소)은 넣지 않는다. 지어낸 별점은 검색 결과를 속이는 것이다.
*/
const DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Android",
  inLanguage: "ko",
};

export function StructuredData() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DATA) }} />
  );
}
