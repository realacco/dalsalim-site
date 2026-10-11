/** 사이트 전체가 같이 쓰는 값. 주소 · 문의처가 바뀌면 여기만 고친다 */
export const SITE = {
  name: "달살림",
  url: "https://dalsalim.dabutdev.com",
  title: "달살림 — 살림을 한곳에 적는 종합 가계부",
  description:
    "내 가계부, 가족 가계부, 여행 가계부를 한 앱에서 적어요. 소비를 평가하지 않고 내역과 통계만 보여주는 가계부, 달살림.",
  supportEmail: "support@dabutdev.com",
  copyrightHolder: "dalsalim",
} as const;

/*
  약관 · 방침 · 계정 삭제 안내 · 오픈소스 라이선스는 이 사이트에 사본을 두지 않는다.
  본문의 원본은 앱 서버에 한 벌뿐이고, 여기서는 그 페이지로 보낸다 — 두 벌이면 개정할 때 갈라진다.
*/
const LEGAL_BASE = "https://api.dabutdev.com";

export const LEGAL_LINKS = [
  { label: "이용약관", href: `${LEGAL_BASE}/terms` },
  { label: "개인정보처리방침", href: `${LEGAL_BASE}/privacy` },
  { label: "계정 지우기", href: `${LEGAL_BASE}/account/delete` },
  { label: "오픈소스 라이선스", href: `${LEGAL_BASE}/licenses` },
] as const;

/** 받을 수 있게 되면 `href` 를 채운다. 비어 있는 동안은 눌리지 않는 상태 표시로 그린다 */
export const PLATFORMS = [
  { label: "안드로이드 베타 테스트 중", href: null },
  { label: "iOS 준비 중", href: null },
] as const satisfies readonly { label: string; href: string | null }[];
