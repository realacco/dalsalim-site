import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
  `public/` 아래 PNG 의 크기를 빌드할 때 읽는다.

  그림의 크기를 글 옆에 손으로 적어 두면 사진을 다시 찍을 때마다 숫자를 같이 고쳐야 하고, 틀리면 그림이 찌그러진다.
  PNG 는 맨 앞 24 바이트 안에 폭과 높이가 있어서 도구 없이 읽힌다. 서버 컴포넌트에서만 부른다 — 브라우저로 가지 않는다.
*/
const PNG_SIGNATURE = "89504e470d0a1a0a";

export function pngSize(publicPath: string): { width: number; height: number } {
  const header = readFileSync(join(process.cwd(), "public", publicPath)).subarray(0, 24);
  if (header.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) {
    // 빌드를 멈춘다 — 크기 없이 실으면 그림이 뜰 때 글이 밀린다
    throw new Error(`PNG 가 아니에요: public${publicPath}`);
  }
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}
