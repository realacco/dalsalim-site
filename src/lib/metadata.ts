import type { Metadata } from "next";

import { SEARCH_VERIFICATION, SITE } from "@/config/site";
import { DEFAULT_LOCALE, homePath, LOCALE_INFO, LOCALES, type Locale, messages } from "@/i18n";

/** 공유 미리보기 그림 — `src/app/opengraph-image.png` 가 이 주소로 나간다. 설명(alt)은 언어마다 `messages().site.shareAlt` */
const SHARE_IMAGE = { url: "/opengraph-image.png", type: "image/png", width: 1200, height: 630 };

/**
 * 세 언어의 같은 페이지를 서로 묶는다 — 검색 엔진이 그 사람의 언어에 맞는 쪽을 보인다.
 * 어느 언어에도 안 맞는 사람에게는 처음 주소(한국어)를 보인다(x-default)
 */
export function languageAlternates(): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_INFO[locale].tag, homePath(locale)])),
    "x-default": homePath(DEFAULT_LOCALE),
  };
}

/*
  그 언어의 홈이 검색 엔진과 공유 미리보기에 내는 것 한 벌. 언어마다 루트 레이아웃이 따로라 레이아웃이 이것을 부른다.
  `openGraph` 를 다른 데서 따로 적으면 통째로 갈린다 — 사이트 이름 · 언어 · 그림이 빠진 채 나간다. 그래서 여기서 늘 같이 넣는다.
*/
export function siteMetadata(locale: Locale): Metadata {
  const m = messages(locale).site;
  const path = homePath(locale);
  const image = { ...SHARE_IMAGE, alt: m.shareAlt };
  return {
    // 아래의 상대 주소(대표 주소 · 공유 그림)가 이 주소를 기준으로 풀린다
    metadataBase: new URL(SITE.url),
    title: { default: m.title, template: `%s — ${m.name}` },
    description: m.description,
    applicationName: m.name,
    keywords: m.keywords,
    authors: [{ name: SITE.publisher }],
    creator: SITE.publisher,
    publisher: SITE.publisher,
    category: "finance",
    // 검색 결과의 미리보기를 줄이지 않는다 — 큰 그림 · 긴 설명이 그대로 뜬다
    robots: {
      index: true,
      follow: true,
      googleBot: { "max-image-preview": "large", "max-snippet": -1 },
    },
    verification: {
      ...(SEARCH_VERIFICATION.google ? { google: SEARCH_VERIFICATION.google } : {}),
      ...(SEARCH_VERIFICATION.naver
        ? { other: { "naver-site-verification": SEARCH_VERIFICATION.naver } }
        : {}),
    },
    alternates: { canonical: path, languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: LOCALE_INFO[locale].ogLocale,
      alternateLocale: LOCALES.filter((other) => other !== locale).map(
        (other) => LOCALE_INFO[other].ogLocale,
      ),
      siteName: m.name,
      title: m.title,
      description: m.description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image.url],
    },
    // 전화번호처럼 보이는 금액을 폰 브라우저가 전화 링크로 바꾸지 않게
    formatDetection: { telephone: false },
  };
}
