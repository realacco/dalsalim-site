import "./ledgers.css";

import { Phone } from "@/components/Phone";
import { SECTIONS } from "@/config/routes";
import { type Locale, messages } from "@/i18n";

import { Highlighted } from "./Highlighted";

type Kind = "personal" | "family" | "trip";

/* 화면 사진은 예시 데이터로 찍은 것이다. 글 · 사진 설명은 `messages().ledgers` 에 같은 차례로 있다 */
const LEDGERS: { kind: Kind; shots: [string, string] }[] = [
  { kind: "personal", shots: ["personal-calendar", "assets"] },
  { kind: "family", shots: ["wizard-step", "family-summary"] },
  { kind: "trip", shots: ["trip-records", "trip-settlement"] },
];

/** 가계부 세 권 — 한 권이 한 줄이고, 글과 폰 두 대가 번갈아 좌우에 선다 */
export function Ledgers({ locale }: { locale: Locale }) {
  const m = messages(locale).ledgers;
  return (
    <section className="ledgers" id={SECTIONS.ledgers} aria-labelledby="ledgers-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">{m.eyebrow}</p>
          <h2 id="ledgers-title">
            <Highlighted text={m.title} />
          </h2>
          <p className="soft">{m.lede}</p>
        </header>

        {LEDGERS.map(({ kind, shots }) => {
          const ledger = m[kind];
          return (
            <article className="ledger" data-kind={kind} key={kind}>
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
                {shots.map((shot, index) => (
                  <Phone locale={locale} key={shot} shot={shot} alt={ledger.alts[index]} />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
