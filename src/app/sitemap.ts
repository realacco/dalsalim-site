import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { homePath, LOCALES } from "@/i18n";
import { languageAlternates } from "@/lib/metadata";

// 정적으로 내보내므로 빌드 때 한 번 만든다
export const dynamic = "force-static";

/**
 * 검색 엔진에 알리는 주소 목록 — 세 언어의 홈. 줄마다 다른 언어의 같은 페이지를 적어 서로 묶는다(hreflang).
 * 도움말 · 약관은 앱 서버의 페이지라 여기에 없다
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates()).map(([tag, path]) => [tag, `${SITE.url}${path}`]),
  );
  return LOCALES.map((locale) => ({
    url: `${SITE.url}${homePath(locale)}`,
    // 정적으로 내보내서 빌드한 때가 곧 마지막으로 바뀐 때다
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
