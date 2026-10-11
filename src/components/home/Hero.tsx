import "./hero.css";

import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { PlatformStatus } from "@/components/PlatformStatus";

import { won } from "@/lib/format";

/* 화면 그림의 값은 전부 지어낸 것이다 */
const FIXED = { before: 200_000, after: 212_000 };

export function Hero() {
  return (
    <section className="hero">
      <div className="glow" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <ul className="kinds" aria-label="가계부 종류">
            <li style={{ "--dot": "var(--kind-personal)" } as React.CSSProperties}>내 것</li>
            <li style={{ "--dot": "var(--kind-family)" } as React.CSSProperties}>가족</li>
            <li style={{ "--dot": "var(--kind-trip)" } as React.CSSProperties}>여행</li>
          </ul>
          <h1>
            살림을 한곳에 적는 <em>종합 가계부</em>
          </h1>
          <p className="hero-lede">내 가계부, 가족 가계부, 여행 가계부를 한 앱에서 적어요.</p>
          <PlatformStatus />
          <Link href={ROUTES.use} className="btn btn-ghost">
            어떻게 쓰는지 보기 ›
          </Link>
        </div>

        {/* 꾸미는 그림이다. 읽어 주는 도구에는 한 문장으로만 전한다 */}
        <div
          className="stage"
          role="img"
          aria-label="달살림 화면 예시. 고정비 목록에서 관리비가 지난달보다 12,000원 늘었고, 그 줄에만 이유 칸이 열려 있어요."
        >
          <div className="stage-back lift" aria-hidden="true">
            여행 정산 (예시)
            <br />
            민호 → 지수 {won(34_500)}
          </div>
          <div className="stage-main lift" aria-hidden="true">
            <p className="tiny">10월 고정비 (예시)</p>
            <div className="row">
              <span>통신비</span>
              <span className="amount">{won(89_000)}</span>
            </div>
            <div className="row">
              <span>관리비</span>
              <span className="amount">
                <span className="swap">
                  <span className="before">{won(FIXED.before)}</span>
                  <span className="after">{won(FIXED.after)}</span>
                </span>
                <span className="delta">지난달보다 +{won(FIXED.after - FIXED.before)}</span>
              </span>
            </div>
            <div className="reason">
              <div>
                <p>이유 (안 적어도 돼요)</p>
              </div>
            </div>
            <div className="row">
              <span>보험</span>
              <span className="amount">{won(154_000)}</span>
            </div>
          </div>
          <div className="stage-front lift" aria-hidden="true">
            남은 예산 (예시)
            <b>{won(182_400)}</b>
          </div>
        </div>
      </div>
    </section>
  );
}
