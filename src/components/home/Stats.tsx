import "./stats.css";

import { Phone } from "@/components/Phone";
import { SECTIONS } from "@/config/routes";
import { type Locale, messages, type Messages } from "@/i18n";

import { Highlighted } from "./Highlighted";

type Card = keyof Messages["stats"]["cards"];

/*
  통계 화면 넷. 앱이 실제로 보여 주는 것만 적는다 — 평가하는 말(「아꼈어요」 · 「많이 썼어요」)은 앱에 없어서 여기에도 없다.
  화면 사진은 예시 데이터로 찍은 것이다. 글은 `messages().stats.cards`
*/
const STATS: { card: Card; shot: string }[] = [
  { card: "glance", shot: "personal-glance" },
  { card: "spend", shot: "personal-spend" },
  { card: "yearly", shot: "personal-yearly" },
  { card: "family", shot: "family-yearly" },
];

/**
 * 통계 — 넓은 화면에서는 네 칸이 한 줄로, 폰 폭에서는 옆으로 밀어 넘기는 줄로 선다.
 * 칸은 누를 수 없어 줄지 않고 마우스를 따라 기울기만 한다(`data-tilt` · Motion)
 */
export function Stats({ locale }: { locale: Locale }) {
  const m = messages(locale).stats;
  return (
    <section className="stats" id={SECTIONS.stats} aria-labelledby="stats-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">{m.eyebrow}</p>
          <h2 id="stats-title">
            <Highlighted text={m.title} />
          </h2>
          <p className="soft">{m.lede}</p>
        </header>

        {/* 폰 폭에서는 옆으로 넘기는 줄이라 키보드로도 넘길 수 있게 초점을 받는다 */}
        <ul className="stat-rail" tabIndex={0} aria-label={m.railLabel}>
          {STATS.map(({ card, shot }) => {
            const stat = m.cards[card];
            return (
              <li className="stat-card reveal" data-tilt="4" key={shot}>
                <div className="stat-text">
                  <p className="stat-label">{stat.label}</p>
                  <h3>{stat.title}</h3>
                  <p className="soft">{stat.text}</p>
                </div>
                <Phone shot={shot} alt={stat.alt} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
