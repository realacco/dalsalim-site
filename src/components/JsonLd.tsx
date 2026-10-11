/*
  검색 엔진에 「이 페이지는 무엇이다」를 알리는 구조화 데이터.
  사실만 적는다 — 아직 없는 값(가격 · 별점 · 받는 주소)은 넣지 않는다. 지어낸 별점은 검색 결과를 속이는 것이다.
*/
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data }),
      }}
    />
  );
}
