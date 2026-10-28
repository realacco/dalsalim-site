import "./ledgers.css";

import { Phone } from "@/components/Phone";
import { SECTIONS } from "@/config/routes";

type Ledger = {
  kind: "personal" | "family" | "trip";
  label: string;
  title: string;
  lede: string;
  points: string[];
  shots: { shot: string; alt: string }[];
};

/* 화면 사진은 예시 데이터로 찍은 것이다 */
const LEDGERS: Ledger[] = [
  {
    kind: "personal",
    label: "내 가계부",
    title: "자잘한 지출은 나만 보고 싶어요",
    lede: "금액만 적고 바로 저장해요. 예산을 정해 두면 남은 예산을 보면서 써요. 여기 적은 것은 가족에게도 안 보여요.",
    points: [
      "월 예산과 남은 예산, 달력으로 보는 내역",
      "총 지출 · 수입 · 저축 · 투자를 한눈에 보는 통계",
      "통장 · 카드 · 현금 자산, 매달 나가는 정기 항목",
      "태그 · 날짜 메모 · 월급날에 맞춘 달 시작일",
    ],
    shots: [
      {
        shot: "personal-calendar",
        alt: "내 가계부 달력 화면 예시. 날짜마다 그날의 지출과 수입이 적혀 있어요.",
      },
      {
        shot: "assets",
        alt: "내 가계부 자산 화면 예시. 총 자산 아래에 계좌 · 카드 · 현금이 종류별로 묶여 있어요.",
      },
    ],
  },
  {
    kind: "family",
    label: "가족 가계부",
    title: "정해 둔 항목만, 한 달에 한 번",
    lede: "월세 · 관리비 · 통신비 · 보험료 같은 고정비를 한 번 적어 두면 매달 미리 채워져 있어요. 달라진 줄만 고치고 제출하면 가족의 한 달이 한 장에 모여요.",
    points: [
      "지난달과 금액이 다른 줄에만 이유 칸이 열려요 — 적는 것은 선택이에요",
      "구성원이 각자 낸 것을 모아 가족의 요약과 흐름을 보여 줘요",
      "고정비가 나가는 날을 가족 달력으로 같이 봐요",
      "초대코드를 받아도 가족장이 승인해야 들어와요",
    ],
    shots: [
      {
        shot: "wizard-step",
        alt: "가족 가계부 입력 화면 예시. 자동차 보험이 지난달보다 6,000원 늘어 이유 칸이 열려 있어요.",
      },
      {
        shot: "family-summary",
        alt: "가족 가계부 월간지표 화면 예시. 9월 총 지출과 이번 달 달라진 항목, 그 차액이 모여 있어요.",
      },
    ],
  },
  {
    kind: "trip",
    label: "여행 가계부",
    title: "그 나라 돈으로 적고, 끝나면 보낼 돈만",
    lede: "여행마다 따로 적는 나만의 여행 가계부예요. 엔 · 달러 · 유로로 적으면 오늘 환율로 원화도 같이 보여요.",
    points: [
      "여행 예산과 남은 예산 — 정하지 않아도 돼요",
      "앱이 없는 동행도 이름만으로 추가해 함께 낸 돈을 나눠요",
      "누가 누구에게 얼마를 보내면 되는지 정산을 보여 줘요",
      "여행에서 쓴 내 몫은 내 가계부로 가져와요",
    ],
    shots: [
      {
        shot: "trip-records",
        alt: "여행 가계부 내역 화면 예시. 오사카 여행의 날짜별 지출이 엔화와 원화로 적혀 있어요.",
      },
      {
        shot: "trip-settlement",
        alt: "여행지표 화면 예시. 여행에서 쓴 돈과 남은 예산, 동행 사이에 누가 누구에게 얼마를 보내면 되는지 보여요.",
      },
    ],
  },
];

/** 가계부 세 권 — 한 권이 한 줄이고, 글과 폰 두 대가 번갈아 좌우에 선다 */
export function Ledgers() {
  return (
    <section className="ledgers" id={SECTIONS.ledgers} aria-labelledby="ledgers-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">가계부 세 권</p>
          <h2 id="ledgers-title">
            쓰는 사람마다, <span className="grad-text">따로 또 같이</span>
          </h2>
          <p className="soft">한 앱 안에서 가계부를 골라 쓰고, 서로 섞이지 않아요.</p>
        </header>

        {LEDGERS.map((ledger) => (
          <article className="ledger" data-kind={ledger.kind} key={ledger.kind}>
            <div className="ledger-text reveal">
              <p className="ledger-label">{ledger.label}</p>
              <h3>{ledger.title}</h3>
              <p className="soft">{ledger.lede}</p>
              <ul className="points">
                {ledger.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="ledger-shots reveal">
              <div className="ledger-glow" aria-hidden="true" />
              {ledger.shots.map((shot) => (
                <Phone key={shot.shot} shot={shot.shot} alt={shot.alt} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
