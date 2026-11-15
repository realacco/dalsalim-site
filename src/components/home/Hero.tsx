import "./hero.css";

import { PlatformStatus } from "@/components/PlatformStatus";
import { Phone } from "@/components/Phone";
import { HELP } from "@/config/site";
import { type Locale, messages, withLang } from "@/i18n";
import { won } from "@/lib/format";

/** 첫 화면 — 큰 제목과 부채꼴로 선 폰 세 대. 뒤에서 파스텔 빛이 천천히 번진다 */
export function Hero({ locale }: { locale: Locale }) {
  const m = messages(locale).hero;
  return (
    <section className="hero" data-tilt="4">
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <ul className="kinds" aria-label={m.kindsLabel}>
            <li data-kind="personal">{m.kinds.personal}</li>
            <li data-kind="family">{m.kinds.family}</li>
            <li data-kind="trip">{m.kinds.trip}</li>
          </ul>
          <h1>
            {m.titleFirst}
            <br />
            <em className="grad-text">{m.titleEm}</em>
            {m.titleAfterEm}
            <br className="only-wide" />
            {m.titleLast.startsWith(" ") ? " " : null}
            {/* 끝말은 한 덩어리로 줄을 바꾼다 — 일본어는 낱자마다 줄이 바뀌어 「ひと / つの」 처럼 갈렸다 */}
            <span className="keep">{m.titleLast.trim()}</span>
          </h1>
          <p className="hero-lede">{m.lede}</p>
          <PlatformStatus locale={locale} />
          <a href={withLang(HELP, locale)} className="btn btn-ghost press">
            {m.helpLink}
          </a>
        </div>

        <div className="hero-stage">
          <Phone locale={locale} shot="trip-records" className="side left" alt={m.alts.trip} />
          <Phone locale={locale} shot="family-summary" className="side right" alt={m.alts.family} />
          <Phone
            locale={locale}
            shot="personal-records"
            className="center"
            eager
            alt={m.alts.personal}
          />
          <p className="float-chip chip-budget" aria-hidden="true">
            {m.chipBudget}
            <b>{won(574300, locale)}</b>
          </p>
          <p className="float-chip chip-free" aria-hidden="true">
            {m.chipFree}
          </p>
        </div>
      </div>
    </section>
  );
}
