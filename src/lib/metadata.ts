import type { Metadata } from "next";

import { SITE } from "@/config/site";

/** 공유 미리보기 그림 — `src/app/opengraph-image.png` 가 이 주소로 나간다 */
const SHARE_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — 나 · 가족 · 여행, 가계부 세 권을 한 앱에서`,
};

type PageMeta = {
  /** 브라우저 탭과 검색 결과의 제목. 비우면 사이트 제목 그대로다 */
  title?: string;
  description: string;
  /** 이 페이지의 대표 주소 (`ROUTES` 의 값) */
  path: string;
  type?: "website" | "article";
};

/*
  페이지마다 검색 엔진과 공유 미리보기가 읽는 것을 한 벌로 만든다.

  페이지에서 `openGraph` 를 따로 적으면 위 층(layout)의 것이 통째로 갈린다 — 사이트 이름 · 언어 · 그림이 빠진 채 나간다.
  그래서 페이지는 이 함수만 부르고, 빠지면 안 되는 것은 여기서 늘 같이 넣는다.
*/
export function pageMetadata({ title, description, path, type = "website" }: PageMeta): Metadata {
  const shareTitle = title ? `${title} — ${SITE.name}` : SITE.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ko_KR",
      siteName: SITE.name,
      title: shareTitle,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
