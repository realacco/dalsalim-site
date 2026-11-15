import "./faq.css";

import { HELP } from "@/config/site";
import { type Locale, messages, withLang } from "@/i18n";

/*
  자주 묻는 것. 화면에 보이는 글과 검색 엔진에 주는 구조화 데이터(FAQPage)가 같은 한 벌(`messages().faq.items`)에서 나온다 —
  둘이 다르면 검색 엔진이 속임으로 본다.
*/
export function Faq({ locale }: { locale: Locale }) {
  const m = messages(locale);
  const f = m.faq;
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">{f.eyebrow}</p>
          <h2 id="faq-title">{f.title}</h2>
        </header>
        <div className="faq-list reveal">
          {f.items.map((item) => (
            <details key={item.question}>
              <summary className="ripple">
                <h3>{item.question}</h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="faq-more">
          {f.moreBefore}
          <a href={withLang(HELP, locale)}>{m.common.help}</a>
          {f.moreAfter}
        </p>
      </div>
    </section>
  );
}
