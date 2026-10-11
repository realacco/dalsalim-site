/*
  사이트 안의 주소. 링크 · 대표 주소 · 사이트맵이 전부 여기서 가져간다 —
  주소를 글자로 여러 곳에 적어 두면 하나를 바꿀 때 나머지가 조용히 끊긴다.
  정적으로 내보내서 주소는 `/` 로 끝난다 (`next.config.ts` 의 `trailingSlash`).
*/
export const ROUTES = {
  home: "/",
  use: "/use/",
  // 이름이 use 로 시작하면 린트가 React 훅으로 본다
  article: (slug: string) => `/use/${slug}/`,
} as const;

/** 머리에 서는 메뉴. 페이지를 더하면 여기에 한 줄을 더한다 */
export const NAV = [{ label: "활용", href: ROUTES.use }] as const;

/** 활용 글의 화면 사진이 놓인 자리 (`public/use/`) */
export const USE_FIGURE_DIR = "/use";
