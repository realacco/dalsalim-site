import { PLATFORMS, SITE } from "@/config/site";

/** 홈의 자리만 잡아 둔다. 본문은 다음 작업에서 채운다 */
export default function HomePage() {
  return (
    <div className="wrap notice-page">
      <h1>{SITE.name}</h1>
      <p>살림을 한곳에 적는 종합 가계부</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
        {PLATFORMS.map((platform) => (
          <span key={platform.label} className="btn btn-pending">
            {platform.label}
          </span>
        ))}
      </div>
    </div>
  );
}
