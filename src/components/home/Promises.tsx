import "./promises.css";

import { SECTIONS } from "@/config/routes";
import { LEGAL } from "@/config/site";

const PROMISES = [
  {
    title: "광고가 없어요",
    text: "가계부를 여는 동안 끼어드는 광고가 없어요.",
  },
  {
    title: "소비를 평가하지 않아요",
    text: "「너무 많이 썼어요」 같은 말, 점수 · 등급 · 순위가 없어요. 내역과 통계만 보여 주고, 판단은 쓰는 사람의 몫이에요.",
  },
  {
    title: "세세한 내역은 나만 봐요",
    text: "가족이 같이 보는 것은 약속한 고정비뿐이에요. 무엇을 샀는지는 각자의 내 가계부에 남아요.",
  },
  {
    title: "결제 알림 원문은 폰에만",
    text: "알림은 폰 안에서만 읽어요. 서버에는 가계부에 넣은 기록만 올라가요.",
  },
];

/** 또링 가계부가 지키는 것과 내 정보를 다루는 법. 짙은 밤하늘 띠 위에 선다 */
export function Promises() {
  return (
    <section className="promises" id={SECTIONS.promises} aria-labelledby="promises-title">
      <div className="night-sky" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">약속</p>
          <h2 id="promises-title">보여 주기만 하는 가계부</h2>
          <p className="soft">
            잔소리하는 가계부는 오래 못 써요. 그래서 하지 않기로 한 것들이에요.
          </p>
        </header>

        <ul className="promise-grid">
          {PROMISES.map((promise, index) => (
            <li className="promise reveal" key={promise.title}>
              <span className="promise-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{promise.title}</h3>
              <p>{promise.text}</p>
            </li>
          ))}
        </ul>

        <div className="care reveal">
          <h3>내 기록은 내 것</h3>
          <ul>
            <li>적은 내용은 계정에 이어져 있어, 폰을 바꿔도 로그인하면 그대로예요.</li>
            <li>가계부는 언제든 엑셀 파일로 받아 갈 수 있어요.</li>
            <li>
              탈퇴하면 계정과 기록을 지워요. 무엇이 지워지고 남는지는{" "}
              <a href={LEGAL.accountDeletion.href}>{LEGAL.accountDeletion.label}</a> 안내에 있어요.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
