import type { Locale } from "@/i18n/locales";

/**
 * 12345 → 「12,345원」 · 「₩12,345」. 화면 그림의 원화 표기를 한 곳에서 맞춘다.
 * 앱이 그 언어로 쓰는 표기와 같다 — 한국어는 「원」, 영어 · 일본어는 앞에 「₩」 (앱의 일본어 화면도 「₩」 다)
 */
export function won(amount: number, locale: Locale): string {
  const digits = amount.toLocaleString("en-US");
  return locale === "ko" ? `${digits}원` : `₩${digits}`;
}
