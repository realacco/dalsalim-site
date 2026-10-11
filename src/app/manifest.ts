import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";

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
    background_color: "#f5f7fa",
    theme_color: "#1966f0",
    icons: [{ src: "/icon.png", sizes: "1024x1024", type: "image/png" }],
  };
}
