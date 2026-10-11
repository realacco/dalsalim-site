import { USE_FIGURE_DIR } from "@/config/routes";
import type { Figure } from "@/content/use";
import { pngSize } from "@/lib/image-size";

/**
 * 앱 화면 사진 한 장과 그 설명. 크기는 파일에서 읽어 자리를 먼저 잡는다 — 그림이 뜰 때 글이 밀리지 않는다.
 * 찍은 것이 아니라 본떠 그린 그림이면 설명에 그렇게 적는다.
 *
 * 브라우저는 가벼운 WebP 를 받고, 모르는 브라우저는 PNG 를 받는다 (`npm run shots:webp` 가 짝을 만든다).
 */
export function Shot({ figure }: { figure: Figure }) {
  const base = `${USE_FIGURE_DIR}/${figure.file}`;
  const { width, height } = pngSize(`${base}.png`);

  return (
    <figure className="shot">
      <picture>
        <source srcSet={`${base}.webp`} type="image/webp" />
        {/* 정적으로 내보내서 이미지 최적화 서버가 없다. 크기를 맞춰 둔 파일을 그대로 싣는다 */}
        <img
          src={`${base}.png`}
          alt={figure.alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>
        {figure.caption}
        {figure.drawn ? <span> 앱 화면을 본떠 그린 그림이에요.</span> : null}
      </figcaption>
    </figure>
  );
}
