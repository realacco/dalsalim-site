/*
  빌드 결과(out/)를 띄워 사이트의 약속이 지켜지는지 브라우저로 확인한다.

    npm run build && npm run check

  lint 와 빌드가 못 보는 것을 본다 — 스크립트 없이도 본문이 있는가, 바깥으로 나가는 요청이 없는가,
  테마가 바뀌고 기억되는가, 움직임 줄이기를 따르는가. 하나라도 어긋나면 0 이 아닌 값으로 끝난다.
*/
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "playwright";

const OUT = join(process.cwd(), "out");
const PORT = 4598;
const BASE = `http://localhost:${PORT}`;
const SITE_URL = "https://dalsalim.dabutdev.com";

if (!existsSync(join(OUT, "index.html"))) {
  console.error("out/ 이 없어요. 먼저 npm run build 를 돌려주세요.");
  process.exit(1);
}

const results = [];
const ok = (name, pass, detail = "") =>
  results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);

const server = spawn("npx", ["serve", "-l", String(PORT), OUT], { stdio: "ignore" });
await new Promise((resolve) => setTimeout(resolve, 2500));
const browser = await chromium.launch();

try {
  // ── 스크립트 없이 받은 HTML — 검색 엔진이 읽는 것 ──────────────
  const home = readFileSync(join(OUT, "index.html"), "utf8");
  ok("홈 HTML 에 제목 글", home.includes("살림을 한곳에 적는"));
  ok("홈 HTML 에 원칙 글", home.includes("소비를 평가하지 않아요"));
  ok("홈의 h1 은 하나", (home.match(/<h1/g) ?? []).length === 1);

  // 활용 글은 사이트맵에서 따라간다 — 글을 더해도 이 파일을 고치지 않는다
  const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  const articles = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].replace(SITE_URL, ""))
    .filter((path) => /^\/use\/.+\/$/.test(path));
  ok("사이트맵에 활용 글이 있음", articles.length > 0, `${articles.length}편`);
  for (const path of articles) {
    const file = join(OUT, path, "index.html");
    const html = existsSync(file) ? readFileSync(file, "utf8") : "";
    ok(
      `${path} 에 본문과 h1`,
      html.includes('class="body"') && (html.match(/<h1/g) ?? []).length === 1,
    );
    const missing = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((src) => !existsSync(join(OUT, src)));
    ok(`${path} 의 그림 파일이 다 있음`, missing.length === 0, missing.join(" "));
  }

  // ── 머리의 정보 ──────────────────────────────────────────────
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", (error) => errors.push(String(error)));
  const external = [];
  page.on("request", (request) => !request.url().startsWith(BASE) && external.push(request.url()));

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const head = await page.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector("link[rel=canonical]")?.href,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    lang: document.documentElement.lang,
    structured: Boolean(document.querySelector('script[type="application/ld+json"]')),
    fonts: [...document.fonts].filter((font) => font.status === "loaded").length,
  }));
  ok("제목에 달살림", head.title.includes("달살림"));
  ok("대표 주소", head.canonical === `${SITE_URL}/`, head.canonical);
  ok("공유 그림", (head.ogImage ?? "").includes("opengraph-image"));
  ok("lang=ko", head.lang === "ko");
  ok("구조화 데이터", head.structured);
  ok("글꼴을 이 사이트에서 받음", head.fonts > 0, `${head.fonts}조각`);
  ok("바깥으로 나가는 요청 없음", external.length === 0, external.join(" "));

  // ── 테마 전환과 기억 ─────────────────────────────────────────
  const background = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const light = await background();
  await page.click(".theme-toggle");
  const dark = await background();
  ok("버튼을 누르면 어둡게", light !== dark, `${light} → ${dark}`);
  await page.reload({ waitUntil: "networkidle" });
  ok("다시 열어도 어둡게", (await background()) === dark);
  await page.click(".theme-toggle");
  ok("다시 누르면 밝게", (await background()) === light);

  // ── 이동 ────────────────────────────────────────────────────
  await page.click(".site-nav a");
  await page.waitForURL("**/use/");
  ok("머리 메뉴 → 활용", (await page.getAttribute(".site-nav a", "aria-current")) === "page");
  await page.click(".use .card");
  await page.waitForURL(/\/use\/.+\/$/);
  const articlePath = new URL(page.url()).pathname;
  ok(
    "목록 → 글, 글마다 다른 대표 주소",
    (await page.evaluate(() => document.querySelector("link[rel=canonical]")?.href)) ===
      `${SITE_URL}${articlePath}`,
  );
  const footer = await page.$$eval(".site-footer a", (links) => links.map((link) => link.href));
  ok("꼬리말 링크 넷", footer.length === 4, footer.join(" "));

  // ── 움직임 ──────────────────────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const moving = await page.evaluate(
    () => getComputedStyle(document.querySelector(".home .swap .after")).animationName,
  );
  ok("홈의 예시가 움직임", moving === "home-in", moving);

  const calm = await browser.newContext({ reducedMotion: "reduce" });
  const calmPage = await calm.newPage();
  await calmPage.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const still = await calmPage.evaluate(() => {
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    return [
      style(".home .swap .after").animationName,
      style(".home .swap .before").opacity,
      style(".home .swap .after").opacity,
    ];
  });
  ok(
    "움직임 줄이기를 켜면 멈추고 바뀐 뒤 모습",
    still[0] === "none" && still[1] === "0" && still[2] === "1",
    still.join(","),
  );

  // ── 스크립트를 끈 브라우저 ───────────────────────────────────
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const plainPage = await plain.newPage();
  await plainPage.goto(`${BASE}/`, { waitUntil: "load" });
  ok("스크립트 없이 제목이 보임", await plainPage.isVisible("h1"));
  ok("스크립트 없이 테마 버튼은 숨음", !(await plainPage.isVisible(".theme-toggle")));

  // ── 좁은 화면에서 옆으로 넘치지 않나 ─────────────────────────
  const phone = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const phonePage = await phone.newPage();
  for (const path of ["/", "/use/", ...articles]) {
    await phonePage.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const overflow = await phonePage.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    ok(`폭 360 에서 ${path} 가 넘치지 않음`, overflow <= 0, `${overflow}px`);
  }

  // ── 없는 주소 ───────────────────────────────────────────────
  const response = await page.goto(`${BASE}/no-such-page/`, { waitUntil: "networkidle" });
  ok("없는 주소는 404", response.status() === 404, String(response.status()));

  // 404 응답 자체가 콘솔에 오류 한 줄을 남긴다 — 그것은 뺀다
  const real = errors.filter((message) => !message.includes("404"));
  ok("콘솔 오류 없음", real.length === 0, real.join(" | "));
} finally {
  await browser.close();
  server.kill();
}

console.log(results.join("\n"));
const failed = results.filter((line) => line.startsWith("FAIL")).length;
console.log(`\n${results.length - failed}개 통과${failed ? `, ${failed}개 실패` : ""}`);
process.exit(failed ? 1 : 0);
