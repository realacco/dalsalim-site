import type { MetadataRoute } from "next";

import { META_COLORS } from "@/config/theme";
import { messages } from "@/i18n";

export const dynamic = "force-static";

/** 홈 화면에 추가했을 때의 이름 · 아이콘 · 바탕색. 파일이 하나라 처음 주소의 언어(한국어)로 적는다 */
export default function manifest(): MetadataRoute.Manifest {
  const site = messages("ko").site;
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    lang: "ko",
    start_url: "/",
    display: "browser",
    background_color: META_COLORS.bgLight,
    theme_color: META_COLORS.brand,
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
