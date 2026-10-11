import "./care.css";

import { LEGAL } from "@/config/site";

/** 적은 것이 어디에 저장되고, 무엇은 저장하지 않으며, 어떻게 받아 가고 지우는지 */
export function Care() {
  return (
    <section className="care" aria-labelledby="care-title">
      <div className="wrap">
        <div className="care-card">
          <h2 id="care-title">내 정보는 이렇게 다뤄요</h2>
          <ul>
            <li>
              <strong>적은 내용은 서버에 저장돼요</strong>
              계정에 이어져 있어서 폰을 바꿔도 로그인하면 그대로 보여요.
            </li>
            <li>
              <strong>결제 알림 원문은 저장하지 않아요</strong>
              알림은 폰 안에서만 읽어요. 서버에는 가계부에 넣은 내역만 올라가요.
            </li>
            <li>
              <strong>언제든 받아 가고 지울 수 있어요</strong>내 기록은 엑셀 파일로 받을 수 있어요.
              탈퇴하면 무엇이 지워지고 남는지는{" "}
              <a href={LEGAL.accountDeletion.href}>{LEGAL.accountDeletion.label}</a> 안내에 있어요.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
