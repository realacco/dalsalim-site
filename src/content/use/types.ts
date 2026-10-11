/*
  활용 글의 모양. 글 하나가 파일 하나이고(`src/content/use/<주소>.ts`), 차례는 `index.ts` 가 정한다.
*/
export type Kind = "personal" | "family" | "trip";

export const KIND_LABEL: Record<Kind, string> = {
  personal: "내 가계부",
  family: "가족 가계부",
  trip: "여행 가계부",
};

export type Figure = {
  /** `public/use/` 아래 파일 이름 (확장자 없이) */
  file: string;
  /** 그림을 못 보는 사람에게 읽어 줄 설명 */
  alt: string;
  caption: string;
  drawn?: boolean;
};

export type UseCase = {
  slug: string;
  kind: Kind;
  /** 꼬리표에 종류 이름 대신 쓸 글 — 두 가계부에 걸치거나 조건이 붙을 때 */
  label?: string;
  title: string;
  /** 목록과 검색 결과에 보이는 한 줄 */
  summary: string;
  /** 글 머리 — 어떤 상황인가 */
  situation: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
    figures?: Figure[];
  }[];
};
