import "./faq.css";

import { HELP } from "@/config/site";

/*
  자주 묻는 것. 화면에 보이는 글과 검색 엔진에 주는 구조화 데이터(FAQPage)가 이 한 벌에서 나온다 —
  둘이 다르면 검색 엔진이 속임으로 본다. 앱이 실제로 하는 것만 적는다.
*/
export const FAQ = [
  {
    question: "부부가 같이 쓰는 공유 가계부로 쓸 수 있나요?",
    answer:
      "네. 가족 가계부를 만들고 초대코드를 보내면, 가족장이 승인한 사람만 들어와 같이 적어요. 월세 · 관리비 · 통신비 · 보험료 같은 고정비를 한 번 적어 두면 매달 미리 채워져 있어서 달라진 줄만 고치면 돼요.",
  },
  {
    question: "가족 가계부를 쓰면 내 지출이 가족에게 다 보이나요?",
    answer:
      "아니요. 가족이 같이 보는 것은 약속한 고정비와 결산뿐이에요. 커피 · 택시 같은 자잘한 지출은 내 가계부에 적고, 내 가계부는 나만 봐요.",
  },
  {
    question: "여행 경비 정산이나 더치페이도 되나요?",
    answer:
      "네. 여행 가계부에 같이 간 사람을 동행으로 이름만 추가하고, 누가 얼마를 냈는지 적으면 누가 누구에게 얼마를 보내면 되는지 정산을 보여 줘요. 엔 · 달러 · 유로처럼 그 나라 돈으로 적으면 오늘 환율로 원화도 같이 보여요.",
  },
  {
    question: "카드 결제 내역을 자동으로 가져오나요?",
    answer:
      "안드로이드에서는 직접 고른 카드사 · 은행 · 페이 앱의 결제 알림을 알림함에 모아 둬요. 넣을지, 어느 분류로 넣을지는 직접 고르고, 켜 둔 곳은 자동으로 적게 할 수도 있어요. 문자는 읽지 않고, 알림 원문은 폰 밖으로 나가지 않아요.",
  },
  {
    question: "광고가 있나요?",
    answer: "없어요. 가계부를 쓰는 동안 끼어드는 광고가 없어요.",
  },
  {
    question: "아이폰에서도 쓸 수 있나요?",
    answer: "지금은 안드로이드 앱으로 베타 테스트 중이고, iOS 는 준비 중이에요.",
  },
  {
    question: "적은 기록을 따로 받아 둘 수 있나요?",
    answer:
      "네. 내 가계부 · 가족 가계부 · 여행 가계부를 엑셀 파일로 받을 수 있어요. 탈퇴하면 계정과 기록을 지워요.",
  },
] as const;

export function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">자주 묻는 것</p>
          <h2 id="faq-title">궁금한 게 있나요?</h2>
        </header>
        <div className="faq-list reveal">
          {FAQ.map((item) => (
            <details key={item.question}>
              <summary>
                <h3>{item.question}</h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="faq-more">
          더 자세한 쓰는 법은 <a href={HELP.href}>{HELP.label}</a>에 있어요.
        </p>
      </div>
    </section>
  );
}
