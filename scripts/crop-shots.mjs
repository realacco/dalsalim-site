/*
  에뮬레이터에서 찍은 앱 화면(1080×2400)을 활용 글에 실을 크기로 만든다.

    npm run shots:crop -- <캡처가 든 폴더>

  위의 상태 표시줄을 잘라 내고, 아래는 화면마다 적어 둔 자리까지만 남긴 뒤 폭 720 으로 줄여 public/use/ 에 넣는다.
  무엇을 어디까지 자를지는 scripts/shots.json 에 있다 — 화면을 더하려면 거기에 한 줄을 더한다.

  ★ 예시 데이터로 찍은 화면만 넣는다. 실제 금액 · 사람 이름 · 가게 이름이 찍힌 사진은 넣지 않는다.
    밝게 · 글자 크기 기본으로 찍는다.
*/
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";

const source = process.argv[2];
if (!source) {
  console.error("캡처가 든 폴더를 알려주세요: npm run shots:crop -- <폴더>");
  process.exit(1);
}

const ROOT = process.cwd();
const OUT = join(ROOT, "public/use");
const { sourceWidth, top, width, shots } = JSON.parse(
  readFileSync(join(ROOT, "scripts/shots.json"), "utf8"),
);
const scale = width / sourceWidth;
const holder = join(OUT, "_crop.html");

const browser = await chromium.launch();
try {
  for (const { from, to, bottom } of shots) {
    const file = resolve(source, `${from}.png`);
    if (!existsSync(file)) {
      console.log(`건너뜀  ${from}.png 가 없어요`);
      continue;
    }
    const height = Math.round((bottom - top) * scale);
    const page = await browser.newPage({ viewport: { width, height: height + 100 } });
    // 위로 끌어올려 상태 표시줄이 화면 밖으로 나가게 한다
    writeFileSync(
      holder,
      `<body style="margin:0"><img src="${pathToFileURL(file).href}" style="display:block;width:${width}px;margin-top:${-Math.round(top * scale)}px"></body>`,
    );
    await page.goto(pathToFileURL(holder).href, { waitUntil: "load" });
    await page.screenshot({ path: join(OUT, `${to}.png`), clip: { x: 0, y: 0, width, height } });
    await page.close();
    console.log(`${to}.png  ${width}×${height}`);
  }
} finally {
  await browser.close();
  rmSync(holder, { force: true });
}
