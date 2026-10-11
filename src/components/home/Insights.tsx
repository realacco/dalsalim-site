import "./insights.css";

import { won } from "@/lib/format";

/* 지어낸 값이다. 도넛 조각의 합이 가운데 숫자가 되고, 점선은 그려진 막대의 실제 평균 자리에 선다 */
const SLICES = [
  { name: "식비", amount: 142_000, color: "var(--slice-1)" },
  { name: "교통", amount: 91_900, color: "var(--slice-2)" },
  { name: "생활", amount: 66_800, color: "var(--slice-3)" },
  { name: "카페", amount: 50_100, color: "var(--slice-4)" },
  { name: "문화", amount: 37_600, color: "var(--slice-5)" },
  { name: "그 밖", amount: 29_200, color: "var(--ink-faint)" },
];

/** 만 원 단위 */
const MONTHS = [
  { label: "5월", spent: 48 },
  { label: "6월", spent: 61 },
  { label: "7월", spent: 52 },
  { label: "8월", spent: 66 },
  { label: "9월", spent: 55 },
  { label: "10월", spent: 42 },
];

const INBOX = [
  { initial: "S", source: "S카드", what: "별빛마트", amount: 23_400, auto: false },
  { initial: "N", source: "N은행", what: "동네택시", amount: 12_300, auto: false },
  { initial: "K", source: "K페이", what: "음악 구독", amount: 9_900, auto: true },
];

function donutGradient(total: number): string {
  let sum = 0;
  const stops = SLICES.map((slice) => {
    sum += slice.amount;
    return `${slice.color} 0 ${((sum / total) * 100).toFixed(2)}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function Insights() {
  const total = SLICES.reduce((sum, slice) => sum + slice.amount, 0);
  const average = MONTHS.reduce((sum, month) => sum + month.spent, 0) / MONTHS.length;
  // 가장 높은 막대 위로 조금 남긴다
  const ceiling = Math.max(...MONTHS.map((month) => month.spent)) * 1.06;

  return (
    <section className="insights" aria-labelledby="insights-title">
      <div className="wrap">
        <h2 id="insights-title" className="sr-only">
          통계와 결제 알림함
        </h2>

        <article className="tile" data-tile="stats">
          <p className="label">통계</p>
          <h3>다양한 통계 지표</h3>
          <p className="soft">분류별, 월별로 돈의 흐름을 봐요.</p>
          <div className="charts">
            <div
              className="chart"
              role="img"
              aria-label={`분류별 지출 예시. 쓴 돈 ${won(total)} 가운데 ${SLICES.map((slice) => `${slice.name} ${won(slice.amount)}`).join(", ")}.`}
            >
              <p className="tiny" aria-hidden="true">
                10월 분류별 지출 (예시)
              </p>
              <div className="donut-row" aria-hidden="true">
                <div className="donut" style={{ background: donutGradient(total) }}>
                  <div>
                    쓴 돈<b>{won(total)}</b>
                  </div>
                </div>
                <ul className="legend">
                  {SLICES.map((slice) => (
                    <li key={slice.name} style={{ "--dot": slice.color } as React.CSSProperties}>
                      {slice.name}
                      <span>{won(slice.amount)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="chart"
              role="img"
              aria-label={`월별 지출 예시. ${MONTHS.map((month) => `${month.label} ${month.spent}만 원`).join(", ")}. 평균 ${Math.round(average)}만 원.`}
            >
              <p className="tiny" aria-hidden="true">
                월별 지출 (예시) · 평균 {Math.round(average)}만 원
              </p>
              <div
                className="bars"
                aria-hidden="true"
                style={{ "--average": `${(average / ceiling) * 100}%` } as React.CSSProperties}
              >
                {MONTHS.map((month) => (
                  <i key={month.label} style={{ height: `${(month.spent / ceiling) * 100}%` }} />
                ))}
              </div>
              <ul className="months" aria-hidden="true">
                {MONTHS.map((month) => (
                  <li key={month.label}>{month.label}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article className="tile" data-tile="inbox">
          <p className="label">결제 알림함 · 안드로이드</p>
          <h3>카드 알림을 모아 둬요</h3>
          <p className="soft">
            가계부에 넣을지는 직접 고를 수도 있고, 자동으로 넣게 할 수도 있어요.
          </p>
          <div className="inbox" aria-hidden="true">
            {INBOX.map((item) => (
              <div className="row" key={item.source}>
                <span className="source">
                  <i>{item.initial}</i>
                  <span>
                    {item.what} {won(item.amount)}
                    <span className="sub">{item.source}</span>
                  </span>
                </span>
                {item.auto ? (
                  <span className="badge">자동</span>
                ) : (
                  <span className="add">추가</span>
                )}
              </div>
            ))}
            <div className="row">
              <span className="soft">자동으로 넣기</span>
              <span className="switch" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
