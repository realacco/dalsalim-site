/*
  앱 화면 캡처를 홈에 싣는 가벼운 WebP 로 바꾼다.

    npm run shots -- <캡처 폴더>

  캡처는 에뮬레이터에서 예시 데이터로 찍은 1080x2400 원본이다(실제 금액 · 이름 · 가게가 찍힌 것은 넣지 않는다).
  홈이 쓰는 이름만 바꾸고, 폭 540 으로 줄인다 — 폰 틀 안에서 가장 커도 300 안팎이라 두 배 화면에서도 또렷하다.
  폭과 높이는 `src/components/Phone.tsx` 의 `SHOT` 이 들고 있다. 캡처의 비율이 바뀌면 거기도 고친다.
*/
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

const NAMES = [
  "personal-records",
  "personal-glance",
  "personal-calendar",
  "inbox",
  "auto-records",
  "wizard-step",
  "family-summary",
  "trip-records",
  "trip-settlement",
  "glance-pink",
  "assets-dark",
  "personal-spend-dark",
  "assets",
  "personal-spend",
  "personal-yearly",
  "family-yearly",
];

const from = process.argv[2];
if (!from) {
  console.error("캡처 폴더를 알려주세요: npm run shots -- <폴더>");
  process.exit(1);
}
const out = join(process.cwd(), "public/shots");
mkdirSync(out, { recursive: true });

for (const name of NAMES) {
  const source = join(from, `${name}.png`);
  if (!existsSync(source)) {
    console.log(`${name}: 캡처 없음 — 건너뜀`);
    continue;
  }
  await sharp(source)
    .resize({ width: 540 })
    .webp({ quality: 82 })
    .toFile(join(out, `${name}.webp`));
  console.log(`public/shots/${name}.webp`);
}
