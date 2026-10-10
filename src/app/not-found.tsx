import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾지 못했어요",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="wrap notice-page">
      <h1>페이지를 찾지 못했어요</h1>
      <p>주소가 바뀌었거나 없는 페이지예요.</p>
      <div className="actions">
        <Link href="/" className="btn btn-ghost">
          처음 화면으로
        </Link>
        <Link href="/use/" className="btn btn-ghost">
          활용 보기
        </Link>
      </div>
    </div>
  );
}
