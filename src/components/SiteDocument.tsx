import type { Viewport } from "next";
import type { ReactNode } from "react";

// 글꼴 파일은 꾸러미에서 가져와 이 사이트가 직접 준다 — 바깥 글꼴 서버를 부르지 않는다.
// 글자 범위별로 잘게 나뉜 파일이라, 페이지에 실제로 쓰인 글자의 조각만 받는다
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/styles/globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { META_COLORS, THEME_INIT_SCRIPT } from "@/config/theme";
import { LOCALE_INFO, type Locale, messages } from "@/i18n";

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_COLORS.bgLight },
    { media: "(prefers-color-scheme: dark)", color: META_COLORS.bgDark },
  ],
};

/**
 * 한 언어의 문서 뼈대 — `<html lang>` · 머리 · 꼬리말. 언어마다 루트 레이아웃이 따로라
 * (`app/(ko)` · `app/[locale]`) 두 레이아웃이 이것을 그대로 부른다. 그래야 `<html lang>` 이 페이지의 언어와 같다
 */
export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // 저장해 둔 테마를 스크립트가 먼저 입히므로 서버가 만든 html 과 속성이 다를 수 있다
    <html lang={LOCALE_INFO[locale].tag} suppressHydrationWarning>
      {/* 루트 레이아웃이 그리는 문서의 머리다 — app/ 밖의 파일이라 린트가 페이지의 <head> 로 오해한다 */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* 스크립트가 꺼져 있으면 전환 버튼이 눌리지 않으므로 숨긴다. 테마는 기기 설정을 따른다 */}
        <noscript>
          <style>{`.theme-toggle{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          {messages(locale).common.skipToMain}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <Motion />
      </body>
    </html>
  );
}
