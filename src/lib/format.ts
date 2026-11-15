import type { Locale } from "@/i18n/locales";

/**
 * 12345 → 「12,345원」 · 「₩12,345」 · 「12,345ウォン」. 화면 그림의 원화 표기를 한 곳에서 맞춘다.
 * 앱이 그 언어로 쓰는 표기와 같다 — 금액은 언제나 원화다
 */
export function won(amount: number, locale: Locale): string {
  const digits = amount.toLocaleString("en-US");
  if (locale === "en") return `₩${digits}`;
  if (locale === "ja") return `${digits}ウォン`;
  return `${digits}원`;
}
