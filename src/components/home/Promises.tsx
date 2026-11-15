import "./promises.css";

import { SECTIONS } from "@/config/routes";
import { LEGAL } from "@/config/site";
import { type Locale, messages, withLang } from "@/i18n";

/** 또링 가계부가 지키는 것과 내 정보를 다루는 법. 짙은 밤하늘 띠 위에 선다 */
export function Promises({ locale }: { locale: Locale }) {
  const m = messages(locale);
  const p = m.promises;
  return (
    <section className="promises" id={SECTIONS.promises} aria-labelledby="promises-title">
      <div className="night-sky" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 id="promises-title">{p.title}</h2>
          <p className="soft">{p.lede}</p>
        </header>

        <ul className="promise-grid">
          {p.items.map((promise, index) => (
            <li className="promise reveal" data-tilt="5" key={promise.title}>
              <span className="promise-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{promise.title}</h3>
              <p>{promise.text}</p>
            </li>
          ))}
        </ul>

        <div className="care reveal">
          <h3>{p.care.title}</h3>
          <ul>
            {p.care.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              {p.care.deletionBefore}
              <a href={withLang(LEGAL.accountDeletion, locale)}>{m.legal.accountDeletion}</a>
              {p.care.deletionAfter}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
