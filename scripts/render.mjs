/*
  HTML 원본을 찍어 그림 파일로 만든다.

    npm run render:og       # scripts/og-image.html    → src/app/opengraph-image.png (1200×630)
    npm run render:alerts   # scripts/alerts-mock.html → public/use/alerts-*.png     (폭 720)

  그리는 코드를 사이트에 넣지 않고 원본과 찍은 파일을 같이 둔다 — 빌드에 도구가 붙지 않는다.
  문구를 고쳤으면 다시 찍어 그림을 바꾼다. 글꼴은 node_modules 의 Pretendard 를 읽는다.
*/
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";

const ROOT = process.cwd();
const target = process.argv[2];

const browser = await chromium.launch();
try {
  if (target === "og") {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await open(page, "scripts/og-image.html");
    await page.screenshot({ path: join(ROOT, "src/app/opengraph-image.png") });
    console.log("src/app/opengraph-image.png");
  } else if (target === "alerts") {
    // 원본의 화면 하나는 폭 450 이다. 1.6배로 찍으면 다른 화면 사진과 같은 폭 720 이 된다
    const page = await browser.newPage({
      viewport: { width: 1500, height: 1500 },
      deviceScaleFactor: 1.6,
    });
    await open(page, "scripts/alerts-mock.html");
    for (const id of ["apps", "inbox", "auto"]) {
      await page.locator(`#${id}`).screenshot({ path: join(ROOT, `public/use/alerts-${id}.png`) });
      console.log(`public/use/alerts-${id}.png`);
    }
  } else {
    console.error("무엇을 찍을지 알려주세요: og | alerts");
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}

async function open(page, file) {
  await page.goto(pathToFileURL(join(ROOT, file)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
}
