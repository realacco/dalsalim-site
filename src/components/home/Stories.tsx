import { won } from "./format";

/** 가계부마다 그 가계부를 쓰는 사람의 한마디 · 짧은 설명 · 작은 화면 그림 한 묶음. 값은 지어낸 것이다 */
export function Stories() {
  return (
    <section className="stories" aria-labelledby="stories-title">
      <div className="wrap">
        <h2 id="stories-title" className="sr-only">
          가계부 세 가지
        </h2>

        <article className="story" data-kind="personal">
          <div className="story-text">
            <p className="label">내 가계부</p>
            <h3>자잘한 지출은 나만 보고 싶어요</h3>
            <p className="soft">
              예산을 정해 두고, 남은 예산을 보면서 써요. 여기 적은 것은 가족에게 안 보여요.
            </p>
            <ul className="tags">
              <li>나만 봐요</li>
            </ul>
          </div>
          <div className="story-ui" aria-hidden="true">
            <div className="row">
              <span className="soft">이번 달 예산</span>
              <span className="amount">{won(600_000)}</span>
            </div>
            <div className="row">
              <span className="soft">쓴 돈</span>
              <span className="amount">{won(417_600)}</span>
            </div>
            <div className="row">
              <span>남은 예산</span>
              <span className="amount big-number">{won(182_400)}</span>
            </div>
          </div>
        </article>

        <article className="story" data-kind="family">
          <div className="story-text">
            <p className="label">가족 가계부</p>
            <h3>정해 둔 항목만, 한 달에 한 번</h3>
            <p className="soft">
              생활비, 보험료, 전기요금, 대출 이자, 통신비, 월세. 약속한 항목만 한 달에 한 번 같이
              결산해요. 생활비를 어디에 썼는지까지는 같이 보지 않아요. 생활비 안에서 썼는지만
              확인하고 다음 달을 계획해요.
            </p>
            <ul className="tags">
              <li>한 달에 한 번</li>
            </ul>
          </div>
          <div className="story-ui" aria-hidden="true">
            <div className="row">
              <span>
                9월 생활비 결산
                <span className="sub">옮긴 돈 {won(800_000)}</span>
              </span>
              <span className="amount">
                {won(772_000)}
                <span className="sub">실제로 쓴 돈</span>
              </span>
            </div>
            <div className="row">
              <span>10월 생활비</span>
              <span className="amount">{won(800_000)}</span>
            </div>
            <div className="row">
              <span>대출 이자</span>
              <span className="amount">{won(412_300)}</span>
            </div>
            <div className="row">
              <span>월세</span>
              <span className="amount">{won(650_000)}</span>
            </div>
            <div className="row">
              <span>전기요금</span>
              <span className="amount">{won(48_200)}</span>
            </div>
            <div className="row">
              <span className="soft">보험료 · 통신비</span>
              <span className="amount soft">외 2개</span>
            </div>
          </div>
        </article>

        <article className="story" data-kind="trip">
          <div className="story-text">
            <p className="label">여행 가계부</p>
            <h3>혼자 가도, 같이 가도 거뜬해요</h3>
            <p className="soft">
              엔, 달러, 유로처럼 여행지 통화로 적고, 원화로 얼마쯤인지도 같이 봐요. 혼자 가면 내
              여행 경비 장부가 되고, 여럿이 가면 함께 쓴 돈을 나눠서 누가 누구에게 얼마를 보낼지까지
              정리해요.
            </p>
            <ul className="tags">
              <li>여행지 통화</li>
              <li>혼자</li>
              <li>같이</li>
            </ul>
          </div>
          <div className="story-ui" aria-hidden="true">
            <div className="row">
              <span>식비</span>
              <span className="amount">
                ¥1,800
                <span className="sub">약 {won(16_900)}</span>
              </span>
            </div>
            <div className="row">
              <span>교통</span>
              <span className="amount">
                ¥460
                <span className="sub">약 {won(4_300)}</span>
              </span>
            </div>
            <div className="row">
              <span className="soft">민호 → 지수</span>
              <span className="amount">¥3,500</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
