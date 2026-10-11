/*
  public/use/ 의 PNG 마다 WebP 를 하나씩 만든다.

    npm run shots:webp

  화면 사진은 PNG 로 두면 무겁다 — WebP 로 바꾸면 3분의 1 이하가 된다. 브라우저는 WebP 를 받고,
  WebP 를 모르는 곳(오래된 브라우저 · 검색 엔진에 알리는 그림 주소)은 PNG 를 쓴다. 그래서 둘 다 싣는다.
  사진을 다시 찍거나 그림을 다시 그렸으면 이 명령도 다시 돌린다 — 안 돌리면 동작 확인이 짝이 안 맞는다고 알린다.
*/
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

const DIR = join(process.cwd(), "public/use");
let before = 0;
let after = 0;

for (const file of readdirSync(DIR).filter((name) => name.endsWith(".png"))) {
  const source = join(DIR, file);
  const target = source.replace(/\.png$/, ".webp");
  await sharp(source).webp({ quality: 82 }).toFile(target);
  before += statSync(source).size;
  after += statSync(target).size;
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;
console.log(`PNG ${kb(before)} → WebP ${kb(after)}`);
