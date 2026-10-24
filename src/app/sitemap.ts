import type { MetadataRoute } from "next";

import { ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";

// 정적으로 내보내므로 빌드 때 한 번 만든다
export const dynamic = "force-static";

/** 검색 엔진에 알리는 주소 목록. 도움말 · 약관은 앱 서버의 페이지라 여기에 없다 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [ROUTES.home].map((path) => ({
    url: `${SITE.url}${path}`,
    // 정적으로 내보내서 빌드한 때가 곧 마지막으로 바뀐 때다
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
