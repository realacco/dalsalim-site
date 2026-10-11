import "./use.css";

import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";
import { labelOf, USE_CASES } from "@/content/use";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "활용 — 이럴 때 이렇게 써요",
  description:
    "달살림을 어떤 집이 어떻게 쓰는지 소개해요. 맞벌이 부부의 고정비, 결혼 준비에 쓴 돈 모아 보기, 구독료 챙기기, 여럿이 간 여행 정산.",
  path: ROUTES.use,
});

export default function UseIndexPage() {
  return (
    <div className="use" data-page="index">
      {/* 검색 엔진에 이 페이지가 글의 목록이라는 것과 그 차례를 알린다 */}
      <JsonLd
        data={{
          "@type": "ItemList",
          name: "달살림 활용",
          itemListElement: USE_CASES.map((useCase, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: useCase.title,
            url: `${SITE.url}${ROUTES.article(useCase.slug)}`,
          })),
        }}
      />
      <div className="wrap">
        <header>
          <h1>이럴 때 이렇게 써요</h1>
          <p className="lede">달살림을 어떤 집이 어떻게 쓰는지 상황별로 모았어요.</p>
        </header>
        <ul className="cards">
          {USE_CASES.map((useCase) => (
            <li key={useCase.slug} data-kind={useCase.kind}>
              <Link href={ROUTES.article(useCase.slug)} className="card">
                <span className="kind">{labelOf(useCase)}</span>
                <h2>{useCase.title}</h2>
                <p>{useCase.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
