import type { Locale } from "./locales";
import { en } from "./messages/en";
import { ja } from "./messages/ja";
import { ko, type Messages } from "./messages/ko";

export type { Highlight, Messages } from "./messages/ko";
export * from "./locales";

const MESSAGES: Record<Locale, Messages> = { ko, en, ja };

/** 그 언어의 사이트 글 한 벌 */
export function messages(locale: Locale): Messages {
  return MESSAGES[locale];
}
