import { useId } from "react";

/**
 * 또링 가계부 로고 — 앱 아이콘과 같은 그림(연한 타일 위에 겹친 카드 두 장).
 * 파일이 아니라 SVG 로 그려서 어떤 크기에서도 또렷하다. 색은 토큰의 브랜드 색이라 두 테마에서 같다.
 * 한 페이지에 로고가 여럿 서므로 그라데이션 · 마스크의 이름을 로고마다 따로 짓는다.
 */
export function Logo({ className, tile = true }: { className?: string; tile?: boolean }) {
  const id = useId().replace(/:/g, "");
  const ref = (name: string) => `url(#${id}${name})`;
  const front =
    "M421.1 425.5 L698.9 350.5 C753.0 335.9 780.0 356.6 780.0 412.6 L780.0 584.6 C780.0 640.6 753.0 675.9 698.9 690.5 L421.1 765.5 C367.0 780.1 340.0 759.4 340.0 703.4 L340.0 531.4 C340.0 475.4 367.0 440.1 421.1 425.5 Z";

  return (
    <svg className={className} viewBox="0 0 1024 1024" role="img" aria-label="또링 가계부 로고">
      <defs>
        <linearGradient id={`${id}tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-tile-a)" />
          <stop offset="1" stopColor="var(--brand-tile-b)" />
        </linearGradient>
        <linearGradient id={`${id}back`} x1="0.85" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="var(--brand-back-a)" />
          <stop offset="1" stopColor="var(--brand-back-b)" />
        </linearGradient>
        <linearGradient id={`${id}front`} x1="0.9" y1="0" x2="0.1" y2="1">
          <stop offset="0" stopColor="var(--brand-front-a)" />
          <stop offset="0.55" stopColor="var(--brand-front-b)" />
          <stop offset="1" stopColor="var(--brand-front-c)" />
        </linearGradient>
        {/* 앞 카드 둘레만큼 뒤 카드를 파 내 두 장 사이에 틈이 선다 */}
        <mask id={`${id}gap`} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
          <rect width="1024" height="1024" fill="#fff" />
          <path d={front} fill="#000" stroke="#000" strokeWidth="60" strokeLinejoin="round" />
        </mask>
      </defs>
      {tile ? <rect x="24" y="24" width="976" height="976" rx="230" fill={ref("tile")} /> : null}
      <path
        d="M325.1 333.5 L602.9 258.5 C657.0 243.9 684.0 264.6 684.0 320.6 L684.0 492.6 C684.0 548.6 657.0 583.9 602.9 598.5 L325.1 673.5 C271.0 688.1 244.0 667.4 244.0 611.4 L244.0 439.4 C244.0 383.4 271.0 348.1 325.1 333.5 Z"
        fill={ref("back")}
        mask={ref("gap")}
      />
      <path d={front} fill={ref("front")} />
      <line
        x1="630.4"
        y1="627"
        x2="709.6"
        y2="605.6"
        stroke="#fff"
        strokeWidth="46"
        strokeLinecap="round"
      />
    </svg>
  );
}
