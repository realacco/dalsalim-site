import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { META_COLORS } from "@/config/theme";

export const dynamic = "force-static";

/** 홈 화면에 추가했을 때의 이름 · 아이콘 · 바탕색 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: SITE.name,
    description: SITE.description,
    lang: "ko",
    start_url: "/",
    display: "browser",
    background_color: META_COLORS.bgLight,
    theme_color: META_COLORS.brand,
    icons: [{ src: "/icon.png", sizes: "1024x1024", type: "image/png" }],
  };
}
