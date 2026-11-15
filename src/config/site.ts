/**
 * 사이트 전체가 같이 쓰는 값 중 언어와 상관없는 것. 주소 · 문의처가 바뀌면 여기만 고친다.
 * 이름 · 제목 · 설명처럼 언어마다 다른 글은 `src/i18n/messages/` 에 있다
 */
export const SITE = {
  url: "https://ddoring.dabutdev.com",
  publisher: "dabutdev",
  supportEmail: "support@dabutdev.com",
  copyrightHolder: "dabutdev",
} as const;

/*
  약관 · 방침 · 계정 삭제 안내 · 오픈소스 라이선스 · 도움말은 이 사이트에 사본을 두지 않는다.
  본문의 원본은 앱 서버에 한 벌뿐이고, 여기서는 그 페이지로 보낸다 — 두 벌이면 개정할 때 갈라진다.
  도움말은 앱의 설정 › 도움말이 여는 페이지와 같은 것이다.

  이름표(terms · privacy …)로 찾는다. 화면에 뜨는 글자로 찾으면 문구를 바꿀 때 링크가 조용히 끊긴다.
  글자(「이용약관」)는 언어마다 `messages().legal` 에 있고, 주소에 언어를 붙이는 것은 `withLang()` 이다.
*/
const SERVER_BASE = "https://api.dabutdev.com";

export const LEGAL = {
  terms: `${SERVER_BASE}/terms`,
  privacy: `${SERVER_BASE}/privacy`,
  accountDeletion: `${SERVER_BASE}/account/delete`,
  licenses: `${SERVER_BASE}/licenses`,
} as const;

export type LegalPage = keyof typeof LEGAL;

export const HELP = `${SERVER_BASE}/help`;

/*
  검색 엔진의 소유 확인 값 — 구글 서치 콘솔 · 네이버 서치어드바이저가 「HTML 태그」로 주는 content 값을 넣는다.
  비어 있으면 태그를 싣지 않는다. 비밀이 아니다(누구나 페이지 소스에서 본다).
*/
export const SEARCH_VERIFICATION: { google: string | null; naver: string | null } = {
  google: null,
  naver: null,
};

/** 꼬리말에 서는 순서 — 도움말 다음에 약관 · 방침 · 계정 지우기 · 라이선스 */
export const FOOTER_LEGAL: readonly LegalPage[] = [
  "terms",
  "privacy",
  "accountDeletion",
  "licenses",
];

export type Platform = {
  id: "android" | "ios";
  /** 받을 수 있게 되면 채운다. 비어 있는 동안은 눌리지 않는 상태 표시로 그린다. 이름 · 버튼 글자는 `messages().platforms` */
  storeUrl: string | null;
};

export const PLATFORMS: readonly Platform[] = [
  { id: "android", storeUrl: "https://play.google.com/store/apps/details?id=com.dalsalim.app" },
  { id: "ios", storeUrl: null },
];
