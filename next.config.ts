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
};

export default nextConfig;
