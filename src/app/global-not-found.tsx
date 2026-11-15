import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/styles/globals.css";

import type { Metadata } from "next";

import { SITE } from "@/config/site";
import { THEME_INIT_SCRIPT } from "@/config/theme";
import { homePath, LOCALE_INFO, LOCALES, type Locale } from "@/i18n";

/*
  없는 주소의 페이지 — 언어마다 루트 레이아웃이 따로라 한 레이아웃 안의 not-found 로는 못 만든다(`next.config.ts` 의 globalNotFound).
  어느 언어의 주소였는지 모르므로 세 언어로 한 줄씩 적고, 그 언어의 첫 페이지로 보낸다.
*/
const TEXT: Record<Locale, { title: string; body: string; home: string }> = {
  ko: {
    title: "페이지를 찾지 못했어요",
    body: "주소가 바뀌었거나 없는 페이지예요.",
    home: "처음 화면으로",
  },
  en: {
    title: "Page not found",
    body: "The address changed or the page doesn't exist.",
    home: "Go to home",
  },
  ja: {
    title: "ページが見つかりません",
    body: "アドレスが変わったか、存在しないページです。",
    home: "ホームへ",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${TEXT.ko.title} · ${TEXT.en.title}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <main id="main" className="wrap notice-page">
          <h1>{TEXT.ko.title}</h1>
          {LOCALES.map((locale) => (
            <div key={locale} lang={LOCALE_INFO[locale].tag} className="notice-lang">
              {locale === "ko" ? null : <h2>{TEXT[locale].title}</h2>}
              <p>{TEXT[locale].body}</p>
              <a
                href={homePath(locale)}
                className="btn btn-ghost"
                hrefLang={LOCALE_INFO[locale].tag}
              >
                {TEXT[locale].home}
              </a>
            </div>
          ))}
        </main>
      </body>
    </html>
  );
}
