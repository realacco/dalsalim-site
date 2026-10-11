/** 12345 → "12,345원". 화면 그림의 금액 표기를 한 곳에서 맞춘다 */
export function won(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}
