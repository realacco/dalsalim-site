/*
  빌드 결과(out/)를 Cloudflare Pages 와 비슷하게 띄우는 작은 서버 — 동작 확인 전용이다.

  `public/_headers` 의 맨 위 묶음(`/*`)을 모든 응답에 건다. 그래서 콘텐츠 보안 정책이 사이트의 무엇을 막는지가
  배포하기 전에 여기서 드러난다. 없는 주소는 404.html 과 함께 404 를 준다.
*/
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

/** `_headers` 에서 `/*` 묶음의 헤더만 읽는다 */
export function globalHeaders(outDir) {
  const file = join(outDir, "_headers");
  if (!existsSync(file)) return {};
  const headers = {};
  let inGlobal = false;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (line.startsWith("#") || line.trim() === "") continue;
    if (!line.startsWith(" ")) {
      inGlobal = line.trim() === "/*";
    } else if (inGlobal) {
      const at = line.indexOf(":");
      headers[line.slice(0, at).trim()] = line.slice(at + 1).trim();
    }
  }
  return headers;
}

export function serveStatic(outDir, port) {
  const headers = globalHeaders(outDir);
  const server = createServer((request, response) => {
    const path = normalize(decodeURIComponent(new URL(request.url, "http://x").pathname));
    let file = join(outDir, path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    const found = file.startsWith(outDir) && existsSync(file);
    if (!found) file = join(outDir, "404.html");
    response.writeHead(found ? 200 : 404, {
      ...headers,
      "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
    });
    response.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}
