import type { Metadata } from "next";

import { SiteDocument, siteViewport } from "@/components/SiteDocument";
import { siteMetadata } from "@/lib/metadata";

/* 한국어 — 처음부터 있던 주소(`/`)를 그대로 갖는다. 다른 언어는 `app/[locale]` */
export const metadata: Metadata = siteMetadata("ko");
export const viewport = siteViewport;

export default function KoreanLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="ko">{children}</SiteDocument>;
}
