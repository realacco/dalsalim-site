import "./closing.css";

import { Logo } from "@/components/Logo";
import { PlatformStatus } from "@/components/PlatformStatus";
import { HELP } from "@/config/site";
import { type Locale, messages, withLang } from "@/i18n";

import { Highlighted } from "./Highlighted";

/** 맨 끝 — 빛 고리 안의 로고와 받기 자리 */
export function Closing({ locale }: { locale: Locale }) {
  const m = messages(locale);
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="wrap reveal">
        <div className="logo-ring">
          <Logo label={m.common.logo} />
        </div>
        <h2 id="closing-title">
          <Highlighted text={m.closing.title} />
        </h2>
        <p className="soft">{m.closing.lede}</p>
        <PlatformStatus locale={locale} />
        <a href={withLang(HELP, locale)} className="text-link press">
          {m.closing.helpLink}
        </a>
      </div>
    </section>
  );
}
