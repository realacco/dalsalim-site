import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { HELP } from "@/config/site";

export const metadata: Metadata = {
  title: "페이지를 찾지 못했어요",
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="wrap notice-page">
      <h1>페이지를 찾지 못했어요</h1>
      <p>주소가 바뀌었거나 없는 페이지예요.</p>
      <div className="actions">
        <Link href={ROUTES.home} className="btn btn-ghost">
          처음 화면으로
        </Link>
        <a href={HELP.href} className="btn btn-ghost">
          도움말 보기
        </a>
      </div>
    </div>
  );
}
