import "./principles.css";

import { won } from "@/lib/format";

/** 달살림이 지키는 것 셋. 원칙마다 글과 작은 그림이 한 면에 있다 */
export function Principles() {
  return (
    <section className="principles" aria-labelledby="principles-title">
      <div className="wrap">
        <h2 id="principles-title">달살림의 원칙</h2>

        <article className="principle">
          <div className="principle-text">
            <h3>소비를 평가하지 않아요</h3>
            <p className="soft">
              「너무 많이 썼어요!」「분발하세요!」 같은 말을 하지 않아요. 내역과 통계만 깔끔하게
              보여줘요. 판단은 쓰는 사람의 몫이에요.
            </p>
          </div>
          <div className="visual" aria-hidden="true">
            <ul className="bubbles">
              <li>너무 많이 사용했어요!</li>
              <li>분발하세요!</li>
              <li>이번 달 소비 점수 62점</li>
            </ul>
            <p className="tiny">달살림에서는</p>
            <div className="plain">
              <div className="row">
                <span>이번 달 쓴 돈</span>
                <span className="amount">{won(417_600)}</span>
              </div>
              <div className="row">
                <span>남은 예산</span>
                <span className="amount">{won(182_400)}</span>
              </div>
            </div>
          </div>
        </article>

        <article className="principle">
          <div className="principle-text">
            <h3>세세한 소비 내역까지 가족과 나누지 않아요</h3>
            <p className="soft">
              무엇을 샀는지까지 다 보이면 서로의 소비를 평가하게 돼요. 가족 사이에도 각자의 영역이
              있어요. 같이 보는 것은 미리 약속한 항목뿐이에요. 그 안에서 썼는지, 넘겼는지, 넘겼다면
              이번 달은 무엇 때문이었는지만 한 달에 한 번 같이 돌아봐요.
            </p>
          </div>
          <div className="visual" aria-hidden="true">
            <div className="split">
              <div className="box" data-kind="personal">
                <b>나만 보는 것</b>
                <p className="line">
                  편의점<span>{won(4_800)}</span>
                </p>
                <p className="line">
                  카페<span>{won(5_500)}</span>
                </p>
                <p className="line">
                  택시<span>{won(12_300)}</span>
                </p>
              </div>
              <div className="box" data-kind="family">
                <b>가족이 같이 보는 것</b>
                <p className="line">
                  생활비<span>{won(800_000)}</span>
                </p>
                <p className="line">
                  관리비<span>{won(212_000)}</span>
                </p>
                <p className="why">이유: 난방을 켜기 시작했어요</p>
              </div>
            </div>
          </div>
        </article>

        <article className="principle">
          <div className="principle-text">
            <h3>필요한 만큼만 쓰면 돼요</h3>
            <p className="soft">
              자산, 목적, 결제 알림처럼 헤비 유저를 위한 기능도 있지만 전부 선택이에요. 금액만
              적어도 충분해요.
            </p>
          </div>
          <div className="visual" aria-hidden="true">
            <ul className="options">
              <li data-core>금액 적기</li>
              <li>예산</li>
              <li>자산</li>
              <li>목적</li>
              <li>정기 항목</li>
              <li>결제 알림</li>
              <li>홈 화면 위젯</li>
            </ul>
            <p className="tiny">점선으로 된 것은 켜고 싶을 때만 써요.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
