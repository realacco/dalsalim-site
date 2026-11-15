import type { Highlight } from "@/i18n";

/** 제목 가운데 한 말에 색을 입힌다. 색이 서는 자리가 언어마다 달라 앞 · 색 · 뒤를 글에서 받는다 */
export function Highlighted({ text }: { text: Highlight }) {
  return (
    <>
      {text.before}
      <span className="grad-text">{text.em}</span>
      {text.after}
    </>
  );
}
