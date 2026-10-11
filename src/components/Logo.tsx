/**
 * 달살림 로고 — 앱 아이콘과 같은 그림(흰 네모 셋과 살구색 동그라미 하나).
 * 파일이 아니라 SVG 로 그려서 어떤 크기에서도 또렷하다. 색은 토큰의 브랜드 색이라 두 테마에서 같다.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1024 1024" role="img" aria-label="달살림 로고">
      <rect width="1024" height="1024" fill="var(--brand)" />
      <rect x="276" y="276" width="214" height="214" rx="54" fill="var(--brand-cell)" />
      <circle cx="640" cy="383" r="107" fill="var(--brand-dot)" />
      <rect x="276" y="533" width="214" height="214" rx="54" fill="var(--brand-cell)" />
      <rect x="533" y="533" width="214" height="214" rx="54" fill="var(--brand-cell)" />
    </svg>
  );
}
