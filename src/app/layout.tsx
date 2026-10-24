import type { Metadata, Viewport } from "next";

// 글꼴 파일은 꾸러미에서 가져와 이 사이트가 직접 준다 — 바깥 글꼴 서버를 부르지 않는다.
// 글자 범위별로 잘게 나뉜 파일이라, 페이지에 실제로 쓰인 글자의 조각만 받는다
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";
import { META_COLORS, THEME_INIT_SCRIPT } from "@/config/theme";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  // 아래의 상대 주소(대표 주소 · 공유 그림)가 이 주소를 기준으로 풀린다
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  applicationName: SITE.name,
  keywords: [
    "또링 가계부",
    "가계부",
    "가족 가계부",
    "부부 가계부",
    "개인 가계부",
    "여행 가계부",
    "가계부 앱",
  ],
  ...pageMetadata({ description: SITE.description, path: ROUTES.home }),
  // 전화번호처럼 보이는 금액을 폰 브라우저가 전화 링크로 바꾸지 않게
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_COLORS.bgLight },
    { media: "(prefers-color-scheme: dark)", color: META_COLORS.bgDark },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 저장해 둔 테마를 스크립트가 먼저 입히므로 서버가 만든 html 과 속성이 다를 수 있다
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* 스크립트가 꺼져 있으면 전환 버튼이 눌리지 않으므로 숨긴다. 테마는 기기 설정을 따른다 */}
        <noscript>
          <style>{`.theme-toggle{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
