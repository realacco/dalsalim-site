import "./features.css";

import { AccentPicker } from "./AccentPicker";
import { Phone } from "@/components/Phone";
import { SECTIONS } from "@/config/routes";

/** 강조색 여섯 — 앱의 「화면」에서 고르는 것과 같은 순서다 */
const ACCENTS = [
  { name: "파랑", color: "var(--accent-blue)" },
  { name: "초록", color: "var(--accent-green)" },
  { name: "보라", color: "var(--accent-purple)" },
  { name: "핑크", color: "var(--accent-pink)" },
  { name: "베이지", color: "var(--accent-beige)" },
  { name: "모노", color: "var(--accent-mono)" },
];

/** 작은 칸의 그림 — 24 칸 위에 선으로 그린다 */
const ICONS = {
  download: "M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14",
  widget: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  cloud: "M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 11.1 3.5 3.5 0 0 0 7 18z",
};

const SMALL = [
  {
    icon: ICONS.download,
    title: "엑셀로 내보내기",
    text: "내 가계부 · 가족 · 여행을 엑셀 파일로 받아요.",
  },
  {
    icon: ICONS.widget,
    title: "홈 화면 위젯",
    text: "앱을 열지 않아도 이번 달 내 숫자를 봐요.",
  },
  {
    icon: ICONS.cloud,
    title: "인터넷이 없어도",
    text: "내 가계부는 폰에 먼저 적고, 연결되면 올려요.",
  },
];

/** 기능 묶음 — 결제 알림함 · 자산, 작은 칸 셋, 화면(테마). 알림함과 화면은 한 줄을 다 쓴다 */
export function Features() {
  return (
    <section className="features" id={SECTIONS.features} aria-labelledby="features-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">기능</p>
          <h2 id="features-title">
            필요한 만큼만, <span className="grad-text">켜서 쓰는 기능</span>
          </h2>
          <p className="soft">금액만 적어도 충분해요. 나머지는 쓰고 싶을 때 켜요.</p>
        </header>

        <div className="bento">
          <article className="tile tile-inbox tile-wide reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">결제 알림함 · 안드로이드</p>
              <h3>카드 · 은행 알림을 모아 둬요</h3>
              <p className="soft">
                고른 앱의 결제 알림이 알림함에 쌓여요. 넣을지, 어느 분류로 넣을지는 직접 골라요. 켜
                둔 곳은 자동으로 적게 할 수도 있어요. 알림 원문은 폰 밖으로 나가지 않아요.
              </p>
            </div>
            <div className="tile-shots">
              <Phone
                shot="inbox"
                alt="결제 알림함 화면 예시. S카드와 H카드의 결제 알림이 쌓여 있고, 분류를 골라 추가해요."
              />
              <Phone
                shot="auto-records"
                alt="내 가계부 내역 화면 예시. 알림으로 들어온 기록에 종 표시가 붙어 있어요."
              />
            </div>
          </article>

          <article className="tile tile-assets reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">자산</p>
              <h3>통장 · 카드 · 현금</h3>
              <p className="soft">
                계좌 잔액은 이어 둔 기록으로 세어요. 카드는 이번 달 결제 예정 금액만 보여 줘요.
              </p>
            </div>
            <div className="tile-shots">
              <Phone
                shot="assets-dark"
                alt="자산 화면 예시(어둡게). 총 자산과 계좌 · 카드 · 현금 목록이 보여요."
              />
            </div>
          </article>

          {SMALL.map((item) => (
            <article className="tile tile-small reveal" data-tilt="5" key={item.title}>
              <span className="tile-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
              </span>
              <h3>{item.title}</h3>
              <p className="soft">{item.text}</p>
            </article>
          ))}

          <article className="tile tile-theme tile-wide reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">화면</p>
              <h3>다크 모드와 강조색 여섯 가지</h3>
              <p className="soft">밝게 · 어둡게와 강조색을 내 마음대로 골라요.</p>
              <AccentPicker accents={ACCENTS} />
            </div>
            <div className="tile-shots">
              <Phone
                shot="glance-pink"
                alt="핑크 강조색을 고른 통계 요약 화면 예시. 10월 총 지출과 이 달 예산이 보여요."
              />
              <Phone
                shot="personal-spend-dark"
                alt="어둡게로 본 통계 화면 예시. 분류별 지출 도넛과 목록이 보여요."
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
