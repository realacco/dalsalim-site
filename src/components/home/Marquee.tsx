import "./marquee.css";

import { type Locale, messages, type Messages } from "@/i18n";

type Kind = "personal" | "family" | "trip" | undefined;
type Item = keyof Messages["marquee"]["items"];

/**
 * 기능 이름이 옆으로 흘러가는 띠. 같은 목록을 두 번 이어 붙여 끊김 없이 돈다 — 둘째 벌은 읽어 주지 않는다.
 * 색은 그 기능이 사는 가계부의 종류다. 세 가계부가 같이 쓰는 것은 종류 색 없이 선다
 */
const ITEMS: [Item, Kind][] = [
  ["budget", "personal"],
  ["calendar", "personal"],
  ["inbox", "personal"],
  ["familyFixed", "family"],
  ["familyCalendar", "family"],
  ["currency", "trip"],
  ["settlement", "trip"],
  ["assets", "personal"],
  ["recurring", "personal"],
  ["tags", "personal"],
  ["glance", undefined],
  ["excel", undefined],
  ["widget", undefined],
  ["theme", undefined],
];

export function Marquee({ locale }: { locale: Locale }) {
  const m = messages(locale).marquee;
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {ITEMS.map(([item, kind]) => (
        <li key={item} data-kind={kind}>
          {m.items[item]}
        </li>
      ))}
    </ul>
  );
  return (
    <section className="marquee" aria-label={m.label}>
      <div className="marquee-track">
        {list(false)}
        {list(true)}
      </div>
    </section>
  );
}
