import type { Metadata, Viewport } from "next";

// 글꼴 파일은 꾸러미에서 가져와 이 사이트가 직접 준다 — 바깥 글꼴 서버를 부르지 않는다.
// 글자 범위별로 잘게 나뉜 파일이라, 페이지에 실제로 쓰인 글자의 조각만 받는다
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/config/site";
import { THEME_INIT_SCRIPT } from "@/config/theme";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1217" },
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
