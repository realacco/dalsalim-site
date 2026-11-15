import type { NextConfig } from "next";

/*
  정적 내보내기 — 빌드할 때 모든 페이지를 HTML 로 만들어 `out/` 에 둔다.
  서버가 없으므로 Cloudflare Pages 에 그대로 올라가고, 검색 엔진은 완성된 HTML 을 읽는다.
*/
const nextConfig: NextConfig = {
  output: "export",
  // `/use` → `/use/index.html`. 정적 호스팅에서 주소가 확장자 없이 열린다
  trailingSlash: true,
  // 이미지 최적화 서버가 없다. 싣는 그림은 미리 크기를 맞춰 둔다
  images: { unoptimized: true },
  // 언어마다 루트 레이아웃이 따로라(`app/(ko)` · `app/[locale]`) 없는 주소의 페이지를 한 레이아웃에서 못 만든다.
  // `app/global-not-found.tsx` 가 레이아웃 없이 그 자리를 맡는다
  experimental: { globalNotFound: true },
};

export default nextConfig;
