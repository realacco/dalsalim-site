import "./marquee.css";

type Kind = "personal" | "family" | "trip" | undefined;

/**
 * 기능 이름이 옆으로 흘러가는 띠. 같은 목록을 두 번 이어 붙여 끊김 없이 돈다 — 둘째 벌은 읽어 주지 않는다.
 * 색은 그 기능이 사는 가계부의 종류다. 세 가계부가 같이 쓰는 것은 종류 색 없이 선다
 */
const ITEMS: [string, Kind][] = [
  ["월 예산 · 남은 예산", "personal"],
  ["달력으로 보는 내역", "personal"],
  ["결제 알림함", "personal"],
  ["가족 고정비 결산", "family"],
  ["가족 달력", "family"],
  ["외화 · 오늘 환율", "trip"],
  ["여행 정산", "trip"],
  ["통장 · 카드 · 현금", "personal"],
  ["정기 항목", "personal"],
  ["태그 · 날짜 메모", "personal"],
  ["통계 한눈에 보기", undefined],
  ["엑셀로 내보내기", undefined],
  ["홈 화면 위젯", undefined],
  ["다크 모드 · 강조색", undefined],
];

export function Marquee() {
  return (
    <section className="marquee" aria-label="또링 가계부의 기능">
      <div className="marquee-track">
        <ul>
          {ITEMS.map(([item, kind]) => (
            <li key={item} data-kind={kind}>
              {item}
            </li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {ITEMS.map(([item, kind]) => (
            <li key={item} data-kind={kind}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
