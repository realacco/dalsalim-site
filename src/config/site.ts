/** 사이트 전체가 같이 쓰는 값. 주소 · 문의처가 바뀌면 여기만 고친다 */
export const SITE = {
  name: "또링 가계부",
  url: "https://ddoring.dabutdev.com",
  /* 검색 결과의 제목 — 사람들이 찾는 말(부부 · 가족 공유 가계부, 여행 경비 정산)을 앞에 둔다 */
  title: "또링 가계부 — 부부 · 가족 공유 가계부와 내 가계부, 여행 경비 정산까지",
  description:
    "부부 · 가족이 함께 쓰는 공유 가계부, 혼자 쓰는 내 가계부, 외화 지출과 정산을 적는 여행 가계부를 한 앱에서. 예산 · 고정비 · 자산 · 카드 결제 알림까지, 보여 주기만 하는 가계부 앱이에요.",
  /* 같은 앱을 부르는 다른 이름 — 띄어쓰기 없이 찾는 사람과 옛 이름(달살림)으로 찾는 사람 */
  alternateNames: ["또링가계부", "또링", "달살림"],
  publisher: "dabutdev",
  supportEmail: "support@dabutdev.com",
  copyrightHolder: "dabutdev",
} as const;

/*
  약관 · 방침 · 계정 삭제 안내 · 오픈소스 라이선스 · 도움말은 이 사이트에 사본을 두지 않는다.
  본문의 원본은 앱 서버에 한 벌뿐이고, 여기서는 그 페이지로 보낸다 — 두 벌이면 개정할 때 갈라진다.
  도움말은 앱의 설정 › 도움말이 여는 페이지와 같은 것이다.

  이름표(terms · privacy …)로 찾는다. 화면에 뜨는 글자로 찾으면 문구를 바꿀 때 링크가 조용히 끊긴다.
*/
const SERVER_BASE = "https://api.dabutdev.com";

export const LEGAL = {
  terms: { label: "이용약관", href: `${SERVER_BASE}/terms` },
  privacy: { label: "개인정보처리방침", href: `${SERVER_BASE}/privacy` },
  accountDeletion: { label: "계정 지우기", href: `${SERVER_BASE}/account/delete` },
  licenses: { label: "오픈소스 라이선스", href: `${SERVER_BASE}/licenses` },
} as const;

export const HELP = { label: "도움말", href: `${SERVER_BASE}/help` } as const;

/*
  검색 엔진의 소유 확인 값 — 구글 서치 콘솔 · 네이버 서치어드바이저가 「HTML 태그」로 주는 content 값을 넣는다.
  비어 있으면 태그를 싣지 않는다. 비밀이 아니다(누구나 페이지 소스에서 본다).
*/
export const SEARCH_VERIFICATION: { google: string | null; naver: string | null } = {
  google: null,
  naver: null,
};

/** 꼬리말에 서는 순서 */
export const FOOTER_LINKS = [
  HELP,
  LEGAL.terms,
  LEGAL.privacy,
  LEGAL.accountDeletion,
  LEGAL.licenses,
] as const;

export type Platform = {
  name: string;
  /** 아직 받을 수 없을 때 이름 뒤에 붙는 말 — 「iOS 준비 중」 */
  pending: string;
  /** 받을 수 있게 되면 채운다. 비어 있는 동안은 눌리지 않는 상태 표시로 그린다 */
  storeUrl: string | null;
  /** 주소를 채웠을 때 버튼에 적을 글자 */
  storeLabel: string;
};

export const PLATFORMS: readonly Platform[] = [
  {
    name: "안드로이드",
    pending: "베타 테스트 중",
    storeUrl: "https://play.google.com/store/apps/details?id=com.dalsalim.app",
    storeLabel: "안드로이드 앱 받기",
  },
  { name: "iOS", pending: "준비 중", storeUrl: null, storeLabel: "iOS 앱 받기" },
];
