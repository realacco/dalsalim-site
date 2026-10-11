/*
  활용 글 — 「이런 집은 이렇게 써요」.

  상황을 말하고, 처음 한 번 할 일과 그 뒤에 되풀이할 일을 나눈다. 버튼을 하나하나 설명하지 않는다.

  글을 더하려면: 이 폴더에 파일 하나를 만들고 아래 `USE_CASES` 에 넣는다. 주소 · 목록 · 사이트맵이 따라 생긴다.
  배열의 순서가 목록에 서는 순서다.

  화면 사진(`public/use/*.png`)은 앱을 예시 데이터로 띄워 찍은 것이다. 사람 · 가게 · 금액은 전부 지어낸 값이다.
  `drawn: true` 인 그림은 찍은 것이 아니라 앱 화면을 본떠 그린 것이다 (`scripts/alerts-mock.html`) —
  결제 알림함에는 폰에 깔린 카드사 · 은행 앱의 실제 이름이 떠서, 지어낸 이름으로 바꿔 그렸다.
*/
import { familyFixedCosts } from "./family-fixed-costs";
import { paymentAlerts } from "./payment-alerts";
import { personalBudget } from "./personal-budget";
import { savingsAccounts } from "./savings-accounts";
import { subscriptions } from "./subscriptions";
import { tripSettle } from "./trip-settle";
import { weddingBudget } from "./wedding-budget";
import { KIND_LABEL, type UseCase } from "./types";

export { KIND_LABEL } from "./types";
export type { Figure, Kind, UseCase } from "./types";

export const USE_CASES: UseCase[] = [
  familyFixedCosts,
  personalBudget,
  weddingBudget,
  subscriptions,
  savingsAccounts,
  paymentAlerts,
  tripSettle,
];

export function findUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((useCase) => useCase.slug === slug);
}

export function labelOf(useCase: UseCase): string {
  return useCase.label ?? KIND_LABEL[useCase.kind];
}
