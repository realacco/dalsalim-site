/*
  사이트가 말하는 언어 — 앱이 고를 수 있는 언어(한국어 · 영어 · 일본어)와 같은 셋이다.
  한국어가 처음부터 있던 주소(`/`)를 그대로 갖고, 다른 언어는 `/en/` · `/ja/` 아래에 같은 페이지가 선다.
  검색 엔진이 셋을 한 페이지의 다른 언어로 읽도록 hreflang 으로 서로 묶는다 (`src/lib/metadata.ts`).
*/
export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

/** 처음 주소의 언어. hreflang 의 x-default 도 이 언어다 */
export const DEFAULT_LOCALE: Locale = "ko";

/** `/` 밑에 따로 서는 언어 — 정적으로 내보낼 때 이 둘만 `[locale]` 로 만든다 */
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

type LocaleInfo = {
  /** `<html lang>` 과 hreflang 의 값 */
  tag: string;
  /** 공유 미리보기가 읽는 언어 */
  ogLocale: string;
  /** 언어 고르기에 서는 이름 — 그 언어로 쓴 이름이라 못 읽는 언어의 페이지에서도 자기 언어를 찾는다 */
  nativeName: string;
  /** 언어 고르기 단추에 서는 짧은 이름 */
  short: string;
};

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  ko: { tag: "ko", ogLocale: "ko_KR", nativeName: "한국어", short: "KO" },
  en: { tag: "en", ogLocale: "en_US", nativeName: "English", short: "EN" },
  ja: { tag: "ja", ogLocale: "ja_JP", nativeName: "日本語", short: "JA" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** 그 언어의 첫 페이지 주소 — `/` · `/en/` · `/ja/` */
export function homePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}

/**
 * 앱 서버의 페이지(도움말 · 약관 …)를 그 언어로 연다. 서버는 `?lang=` 을 받으면 그 언어로 그리고,
 * 번역이 없는 페이지(약관 · 방침)는 한국어 원문을 그대로 보인다. 한국어는 붙이지 않는다 — 옛 링크와 같은 주소다
 */
export function withLang(href: string, locale: Locale): string {
  return locale === DEFAULT_LOCALE ? href : `${href}?lang=${locale}`;
}

/** Play 스토어 페이지도 그 언어로 — `hl` 은 스토어 화면의 언어다 */
export function withStoreLang(href: string, locale: Locale): string {
  return locale === DEFAULT_LOCALE ? href : `${href}&hl=${locale}`;
}
