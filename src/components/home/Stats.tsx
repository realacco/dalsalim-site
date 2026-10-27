import "./stats.css";

import { Phone } from "@/components/Phone";
import { SECTIONS } from "@/config/routes";

type Stat = { label: string; title: string; text: string; shot: string; alt: string };

/*
  통계 화면 넷. 앱이 실제로 보여 주는 것만 적는다 — 평가하는 말(「아꼈어요」 · 「많이 썼어요」)은 앱에 없어서 여기에도 없다.
  화면 사진은 예시 데이터로 찍은 것이다
*/
const STATS: Stat[] = [
  {
    label: "월간지표",
    title: "이 달을 한 장에",
    text: "총 지출과 수입 · 저축 · 투자, 예산에서 남은 돈까지 한 화면에 모았어요.",
    shot: "personal-glance",
    alt: "월간지표 화면 예시. 9월 총 지출 921,600원과 수입 · 저축 · 투자, 이 달 예산과 남은 예산이 보여요.",
  },
  {
    label: "지출 분포",
    title: "어디에 썼는지",
    text: "분류별 도넛으로 쓴 곳을 보고, 카드 · 현금별 · 주별로도 나눠 봐요.",
    shot: "personal-spend",
    alt: "지출 분포 화면 예시. 분류별 지출 도넛 가운데에 남은 예산이 있고, 아래에 분류마다 몫과 금액이 적혀 있어요.",
  },
  {
    label: "연간지표",
    title: "한 해의 흐름",
    text: "최근 12개월의 지출 · 수입을 꺾은선으로 봐요. 분류를 골라 그 흐름만 볼 수도 있어요.",
    shot: "personal-yearly",
    alt: "연간지표 화면 예시. 최근 12개월 총 지출과 수입 · 저축이 있고, 월별 지출이 평균선과 함께 꺾은선으로 그려져 있어요.",
  },
  {
    label: "가족 통계",
    title: "가족의 수입은 어디로",
    text: "구성원이 낸 기록을 모아 총 수입이 소비 · 저축 · 투자로 얼마씩 갔는지 보여 줘요.",
    shot: "family-yearly",
    alt: "가족 연간지표 화면 예시. 최근 12개월 총 지출과 수입, 그리고 총 수입 배분 막대에 소비 · 저축 · 투자 · 남은 돈의 몫이 보여요.",
  },
];

/**
 * 통계 — 넓은 화면에서는 네 칸이 한 줄로, 폰 폭에서는 옆으로 밀어 넘기는 줄로 선다.
 * 칸은 누를 수 없어 줄지 않고 마우스를 따라 기울기만 한다(`data-tilt` · Motion)
 */
export function Stats() {
  return (
    <section className="stats" id={SECTIONS.stats} aria-labelledby="stats-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">통계</p>
          <h2 id="stats-title">
            이번 달도, 한 해도 <span className="grad-text">숫자로 한눈에</span>
          </h2>
          <p className="soft">
            쓴 돈을 평가하지 않고 보여 주기만 해요. 판단은 쓰는 사람의 몫이에요.
          </p>
        </header>

        {/* 폰 폭에서는 옆으로 넘기는 줄이라 키보드로도 넘길 수 있게 초점을 받는다 */}
        <ul className="stat-rail" tabIndex={0} aria-label="통계 화면 예시">
          {STATS.map((stat) => (
            <li className="stat-card reveal" data-tilt="4" key={stat.shot}>
              <div className="stat-text">
                <p className="stat-label">{stat.label}</p>
                <h3>{stat.title}</h3>
                <p className="soft">{stat.text}</p>
              </div>
              <Phone shot={stat.shot} alt={stat.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
