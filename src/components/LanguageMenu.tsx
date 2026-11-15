import { homePath, LOCALE_INFO, LOCALES, type Locale, messages } from "@/i18n";

/**
 * 언어 고르기 — 지금 언어의 짧은 이름을 누르면 세 언어가 펼쳐진다. 고르면 그 언어의 같은 페이지로 간다.
 * `<details>` 라 스크립트가 없어도 열린다. 언어 이름은 그 언어로 쓴다(「English」 · 「日本語」) — 못 읽는 언어의
 * 페이지에 들어온 사람도 자기 언어를 찾는다. 브라우저 언어를 보고 저절로 옮기지 않는다: 검색 엔진이 다른 언어의
 * 페이지를 못 보게 되고, 일부러 이 언어를 연 사람을 막는다.
 */
export function LanguageMenu({ locale }: { locale: Locale }) {
  const label = messages(locale).common.language;
  return (
    <details className="lang-menu">
      <summary className="press" aria-label={`${label}: ${LOCALE_INFO[locale].nativeName}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5s1.2-6.1 3.6-8.5z" />
        </svg>
        {LOCALE_INFO[locale].short}
      </summary>
      <ul aria-label={label}>
        {LOCALES.map((target) => (
          <li key={target}>
            <a
              href={homePath(target)}
              hrefLang={LOCALE_INFO[target].tag}
              lang={LOCALE_INFO[target].tag}
              aria-current={target === locale ? "page" : undefined}
              className="ripple"
            >
              {LOCALE_INFO[target].nativeName}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
