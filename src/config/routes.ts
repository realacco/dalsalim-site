import { homePath, type Locale, messages, withLang } from "@/i18n";

import { HELP } from "./site";

/*
  사이트 안의 주소. 링크 · 대표 주소 · 사이트맵이 전부 여기서 가져간다 —
  주소를 글자로 여러 곳에 적어 두면 하나를 바꿀 때 나머지가 조용히 끊긴다.
  정적으로 내보내서 주소는 `/` 로 끝난다 (`next.config.ts` 의 `trailingSlash`).
  페이지는 홈 하나이고, 언어마다 한 벌씩 선다 — `/` · `/en/` · `/ja/` (`src/i18n/locales.ts` 의 `homePath`).
*/

/** 홈 안의 구역 — 머리 메뉴가 그 자리로 내려간다 */
export const SECTIONS = {
  ledgers: "ledgers",
  stats: "stats",
  features: "features",
  promises: "promises",
} as const;

/**
 * 머리에 서는 메뉴. 홈의 구역과 도움말(앱 서버의 페이지)이다.
 * `external` 은 이 사이트 밖이라 새 창 표시 없이 그 주소로 간다.
 */
export function navItems(locale: Locale) {
  const m = messages(locale);
  const home = homePath(locale);
  return [
    { label: m.nav.ledgers, href: `${home}#${SECTIONS.ledgers}`, external: false },
    { label: m.nav.features, href: `${home}#${SECTIONS.features}`, external: false },
    { label: m.common.help, href: withLang(HELP, locale), external: true },
  ];
}
