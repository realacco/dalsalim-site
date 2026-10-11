import { USE_FIGURE_DIR } from "@/config/routes";
import type { Figure } from "@/content/use";
import { pngSize } from "@/lib/image-size";

/**
 * 앱 화면 사진 한 장과 그 설명. 크기는 파일에서 읽어 자리를 먼저 잡는다 — 그림이 뜰 때 글이 밀리지 않는다.
 * 찍은 것이 아니라 본떠 그린 그림이면 설명에 그렇게 적는다.
 */
export function Shot({ figure }: { figure: Figure }) {
  const src = `${USE_FIGURE_DIR}/${figure.file}.png`;
  const { width, height } = pngSize(src);

  return (
    <figure className="shot">
      {/* 정적으로 내보내서 이미지 최적화 서버가 없다. 크기를 맞춰 둔 파일을 그대로 싣는다 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={figure.alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        {figure.caption}
        {figure.drawn ? <span> 앱 화면을 본떠 그린 그림이에요.</span> : null}
      </figcaption>
    </figure>
  );
}
