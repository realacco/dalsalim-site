import "./closing.css";

import { Logo } from "@/components/Logo";
import { PlatformStatus } from "@/components/PlatformStatus";
import { HELP } from "@/config/site";

/** 맨 끝 — 빛 고리 안의 로고와 받기 자리 */
export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="wrap reveal">
        <div className="logo-ring">
          <Logo />
        </div>
        <h2 id="closing-title">
          살림을 <span className="grad-text">한곳에</span>
        </h2>
        <p className="soft">나 · 가족 · 여행, 가계부 세 권을 또링 가계부 하나로.</p>
        <PlatformStatus />
        <a href={HELP.href} className="text-link">
          쓰는 법이 궁금하면 도움말 ›
        </a>
      </div>
    </section>
  );
}
