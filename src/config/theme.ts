/** 사람이 고른 테마를 브라우저에 저장하는 이름 — 이름을 바꾸면 고른 값이 사라져서 옛 이름 그대로 둔다 */
export const THEME_STORAGE_KEY = "dalsalim.theme";

/*
  화면이 그려지기 전에 도는 한 줄. 저장해 둔 테마를 먼저 입혀서, 어둡게를 고른 사람에게 밝은 화면이 번쩍이지 않게 한다.
  <head> 안에 글자로 들어가므로 바깥 값을 쓰지 않는다.
*/
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/*
  브라우저와 홈 화면이 CSS 밖에서 읽는 색 (주소창 색 · 홈 화면 추가). CSS 변수를 읽을 수 없는 자리라 값을 적는다.
  `src/styles/tokens.css` 의 `--bg` · `--brand` 와 같은 값이어야 한다.
*/
export const META_COLORS = {
  bgLight: "#ffffff",
  bgDark: "#0e1217",
  brand: "#4688f3",
} as const;
