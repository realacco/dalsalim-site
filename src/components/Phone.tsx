/** `public/shots/` 의 캡처 — 1080x2400 원본을 폭 540 으로 줄인 것 (`scripts/shots.mjs`) */
const SHOT = { width: 540, height: 1200 };

/**
 * 앱 화면 사진 한 장을 폰 틀에 넣는다. 캡처는 예시 데이터로 찍은 것이다.
 * 크기를 먼저 적어 자리를 잡는다 — 그림이 뜰 때 글이 밀리지 않는다.
 */
export function Phone({
  shot,
  alt,
  className,
  eager = false,
}: {
  shot: string;
  alt: string;
  className?: string;
  /** 첫 화면에 바로 보이는 것만 먼저 받는다 */
  eager?: boolean;
}) {
  return (
    <div className={className ? `phone ${className}` : "phone"}>
      {/* 정적으로 내보내서 이미지 최적화 서버가 없다. 크기를 맞춰 둔 파일을 그대로 싣는다 */}
      <img
        src={`/shots/${shot}.webp`}
        alt={alt}
        width={SHOT.width}
        height={SHOT.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
