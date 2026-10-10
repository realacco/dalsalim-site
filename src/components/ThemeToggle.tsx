"use client";

import { THEME_STORAGE_KEY } from "@/config/theme";

type Theme = "light" | "dark";

/** 지금 보이는 테마 — 사람이 고른 값이 있으면 그것, 없으면 기기 설정 */
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * 밝게 · 어둡게 전환. 처음에는 기기 설정을 따르고, 누르면 반대로 바뀐다.
 * 고른 값은 이 브라우저에만 저장한다 — 어디로도 보내지 않는다.
 */
export function ThemeToggle() {
  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 저장이 막힌 브라우저(사생활 보호 창 등) — 전환은 되고 다음에 열면 기기 설정으로 돌아간다
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="밝게 · 어둡게 전환"
      title="밝게 · 어둡게 전환"
    />
  );
}
