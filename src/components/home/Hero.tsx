import "./hero.css";

import { PlatformStatus } from "@/components/PlatformStatus";
import { Phone } from "@/components/Phone";
import { HELP } from "@/config/site";

/** 첫 화면 — 큰 제목과 부채꼴로 선 폰 세 대. 뒤에서 파스텔 빛이 천천히 번진다 */
export function Hero() {
  return (
    <section className="hero" data-tilt="4">
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <ul className="kinds" aria-label="가계부 종류">
            <li data-kind="personal">나</li>
            <li data-kind="family">가족</li>
            <li data-kind="trip">여행</li>
          </ul>
          <h1>
            나 · 가족 · 여행,
            <br />
            <em className="grad-text">가계부 세 권</em>을<br className="only-wide" /> 한 앱에서
          </h1>
          <p className="hero-lede">
            혼자 쓰는 내 가계부, 부부 · 가족이 같이 결산하는 공유 가계부, 외화로 적고 정산하는 여행
            가계부. 소비를 평가하지 않고 보여 주기만 해요.
          </p>
          <PlatformStatus />
          <a href={HELP.href} className="btn btn-ghost press">
            도움말 보기 ›
          </a>
        </div>

        <div className="hero-stage">
          <Phone
            shot="trip-records"
            className="side left"
            alt="여행 가계부 화면 예시. 오사카 여행의 날짜별 지출이 엔화와 원화로 적혀 있어요."
          />
          <Phone
            shot="family-summary"
            className="side right"
            alt="가족 가계부 요약 화면 예시. 9월 총 지출과 이번 달 달라진 항목이 보여요."
          />
          <Phone
            shot="personal-records"
            className="center"
            eager
            alt="내 가계부 내역 화면 예시. 남은 예산 578,400원과 날짜별 지출이 보여요."
          />
          <p className="float-chip chip-budget" aria-hidden="true">
            남은 예산
            <b>578,400원</b>
          </p>
          <p className="float-chip chip-free" aria-hidden="true">
            잔소리 없는 가계부
          </p>
        </div>
      </div>
    </section>
  );
}
