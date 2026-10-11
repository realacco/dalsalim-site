/*
  빌드 결과(out/)를 띄워 사이트의 약속이 지켜지는지 브라우저로 확인한다.

    npm run build && npm run check

  lint 와 빌드가 못 보는 것을 본다 — 스크립트 없이도 본문이 있는가, 바깥으로 나가는 요청이 없는가,
  검색 엔진과 공유 미리보기가 읽는 것이 페이지마다 다 있는가, 접근성 검사에 걸리는 것이 없는가,
  테마가 바뀌고 기억되는가, 움직임 줄이기를 따르는가. 하나라도 어긋나면 0 이 아닌 값으로 끝난다.

  서버는 `public/_headers` 의 보안 헤더를 그대로 건다 — 콘텐츠 보안 정책이 사이트를 깨뜨리면 여기서 콘솔 오류로 잡힌다.
*/
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { chromium } from "playwright";

import { globalHeaders, serveStatic } from "./lib/static-server.mjs";

const OUT = join(process.cwd(), "out");
const PORT = 4598;
const BASE = `http://localhost:${PORT}`;
const SITE_URL = "https://dalsalim.dabutdev.com";
const AXE = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

if (!existsSync(join(OUT, "index.html"))) {
  console.error("out/ 이 없어요. 먼저 npm run build 를 돌려주세요.");
  process.exit(1);
}

const results = [];
const ok = (name, pass, detail = "") =>
  results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch();

try {
  ok("보안 헤더에 콘텐츠 보안 정책이 있음", "Content-Security-Policy" in globalHeaders(OUT));

  // ── 스크립트 없이 받은 HTML — 검색 엔진이 읽는 것 ──────────────
  const home = readFileSync(join(OUT, "index.html"), "utf8");
  ok("홈 HTML 에 제목 글", home.includes("살림을 한곳에 적는"));
  ok("홈 HTML 에 원칙 글", home.includes("소비를 평가하지 않아요"));

  // 활용 글은 사이트맵에서 따라간다 — 글을 더해도 이 파일을 고치지 않는다
  const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replace(SITE_URL, ""),
  );
  const articles = listed.filter((path) => /^\/use\/.+\/$/.test(path));
  ok("사이트맵에 활용 글이 있음", articles.length > 0, `${articles.length}편`);
  for (const path of articles) {
    const file = join(OUT, path, "index.html");
    const html = existsSync(file) ? readFileSync(file, "utf8") : "";
    ok(`${path} 에 본문`, html.includes('class="body"'));
    // 사진(PNG)과 가벼운 짝(WebP) 둘 다 — 다시 찍고 shots:webp 를 안 돌리면 여기서 걸린다
    const missing = [
      ...html.matchAll(/<(?:img[^>]+src|source[^>]+srcSet|source[^>]+srcset)="([^"]+)"/g),
    ]
      .map((match) => match[1])
      .filter((src) => !existsSync(join(OUT, src)));
    ok(`${path} 의 그림 파일이 다 있음`, missing.length === 0, missing.join(" "));
  }

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

  // ── 검색 엔진 · 공유 미리보기가 읽는 것 — 사이트맵의 모든 페이지 ──
  const titles = new Map();
  for (const path of listed) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const head = await page.evaluate(() => {
      const meta = (selector) => document.querySelector(selector)?.content ?? "";
      return {
        title: document.title,
        description: meta("meta[name=description]"),
        canonical: document.querySelector("link[rel=canonical]")?.href ?? "",
        ogTitle: meta('meta[property="og:title"]'),
        ogUrl: meta('meta[property="og:url"]'),
        ogImage: meta('meta[property="og:image"]'),
        ogSite: meta('meta[property="og:site_name"]'),
        twitterImage: meta('meta[name="twitter:image"]'),
        lang: document.documentElement.lang,
        h1: document.querySelectorAll("h1").length,
        structured: document.querySelectorAll('script[type="application/ld+json"]').length,
      };
    });
    const url = `${SITE_URL}${path}`;
    const missing = [
      !head.title.includes("달살림") && "제목",
      head.description.length < 20 && "설명",
      head.canonical !== url && "대표 주소",
      head.ogUrl !== url && "공유 주소",
      !head.ogTitle && "공유 제목",
      !head.ogImage.includes("opengraph-image") && "공유 그림",
      !head.twitterImage && "트위터 그림",
      !head.ogSite && "사이트 이름",
      head.lang !== "ko" && "lang",
      head.h1 !== 1 && "h1 하나",
      head.structured === 0 && "구조화 데이터",
    ].filter(Boolean);
    ok(`${path} 의 머리 정보`, missing.length === 0, missing.join(" · "));
    titles.set(head.title, [...(titles.get(head.title) ?? []), path]);
  }
  const repeated = [...titles.values()].filter((paths) => paths.length > 1);
  ok("페이지마다 제목이 다름", repeated.length === 0, repeated.flat().join(" "));

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const fonts = await page.evaluate(
    () => [...document.fonts].filter((font) => font.status === "loaded").length,
  );
  ok("글꼴을 이 사이트에서 받음", fonts > 0, `${fonts}조각`);
  ok("바깥으로 나가는 요청 없음", external.length === 0, external.join(" "));

  // ── 접근성 — 밝게 · 어둡게, 폰 폭에서 ───────────────────────
  for (const scheme of ["light", "dark"]) {
    const a11y = await browser.newContext({
      viewport: { width: 390, height: 844 },
      colorScheme: scheme,
      reducedMotion: "reduce",
      // 검사 도구를 페이지에 넣으려면 정책을 잠깐 지나가야 한다. 정책 자체는 위의 페이지들이 본다
      bypassCSP: true,
    });
    const a11yPage = await a11y.newPage();
    for (const path of [...listed, "/no-such-page/"]) {
      await a11yPage.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      await a11yPage.addScriptTag({ content: AXE });
      const violations = await a11yPage.evaluate(async () => {
        const result = await window.axe.run(document, {
          runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"],
        });
        return result.violations.map(
          (violation) =>
            `${violation.id} ${violation.nodes.length}곳 [${violation.nodes[0].target.join(" ")}]`,
        );
      });
      ok(
        `접근성 ${scheme === "light" ? "밝게" : "어둡게"} ${path}`,
        violations.length === 0,
        violations.join(" / "),
      );
    }
    await a11y.close();
  }

  // ── 키보드 ──────────────────────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  ok("탭 키의 첫 자리는 「본문으로 건너뛰기」", first === "본문으로 건너뛰기", first);
  ok("테마 버튼에 이름이 있음", Boolean(await page.getAttribute(".theme-toggle", "aria-label")));

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
  ok("목록 → 글", (await page.locator("h1").count()) === 1);
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

  // ── 좁은 화면 · 큰 글자 ─────────────────────────────────────
  const phone = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const phonePage = await phone.newPage();
  const overflowOf = () =>
    phonePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  for (const path of listed) {
    await phonePage.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    ok(`폭 360 에서 ${path} 가 넘치지 않음`, (await overflowOf()) <= 0, `${await overflowOf()}px`);
    // 브라우저의 기본 글자 크기를 키운 사람 — 글자가 같이 커지고 옆으로 넘치지 않아야 한다
    const before = await phonePage.evaluate(() =>
      parseFloat(getComputedStyle(document.querySelector("h1")).fontSize),
    );
    await phonePage.addStyleTag({ content: "html{font-size:200%}" });
    const after = await phonePage.evaluate(() =>
      parseFloat(getComputedStyle(document.querySelector("h1")).fontSize),
    );
    ok(
      `글자를 두 배로 키우면 ${path} 의 글자가 커지고 넘치지 않음`,
      after > before * 1.9 && (await overflowOf()) <= 0,
      `${before}→${after}px, 넘침 ${await overflowOf()}px`,
    );
  }

  // ── 없는 주소 ───────────────────────────────────────────────
  const response = await page.goto(`${BASE}/no-such-page/`, { waitUntil: "networkidle" });
  ok("없는 주소는 404", response.status() === 404, String(response.status()));
  ok(
    "없는 주소는 검색에 넣지 않고 대표 주소도 없음",
    (await page.getAttribute("meta[name=robots]", "content")) === "noindex" &&
      (await page.locator("link[rel=canonical]").count()) === 0,
  );

  // 404 응답 자체가 콘솔에 오류 한 줄을 남긴다 — 그것은 뺀다. 보안 정책에 막힌 것은 여기에 걸린다
  const real = errors.filter((message) => !message.includes("404"));
  ok("콘솔 오류 없음 (보안 정책에 막힌 것 포함)", real.length === 0, real.join(" | "));
} finally {
  await browser.close();
  server.close();
}

console.log(results.join("\n"));
const failed = results.filter((line) => line.startsWith("FAIL")).length;
console.log(`\n${results.length - failed}개 통과${failed ? `, ${failed}개 실패` : ""}`);
process.exit(failed ? 1 : 0);
