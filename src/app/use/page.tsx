import "./use.css";

import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";
import { labelOf, USE_CASES } from "@/content/use";

export const metadata: Metadata = {
  title: "활용",
  description:
    "달살림을 어떤 집이 어떻게 쓰는지 소개해요. 맞벌이 부부의 고정비, 결혼 준비에 쓴 돈 모아 보기, 구독료 챙기기, 여럿이 간 여행 정산.",
  alternates: { canonical: ROUTES.use },
  openGraph: { title: `활용 — ${SITE.name}`, url: ROUTES.use },
};

export default function UseIndexPage() {
  return (
    <div className="use" data-page="index">
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
