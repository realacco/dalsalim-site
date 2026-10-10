import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { USE_CASES } from "@/content/use";

// 정적으로 내보내므로 빌드 때 한 번 만든다
export const dynamic = "force-static";

/** 검색 엔진에 알리는 주소 목록. 활용 글은 배열에서 따라 나온다 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/use/", ...USE_CASES.map((useCase) => `/use/${useCase.slug}/`)];
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
