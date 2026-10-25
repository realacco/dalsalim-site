"use client";

import { useState } from "react";

export type Accent = { name: string; color: string };

/**
 * 강조색 견본 — 앱의 「화면」처럼 눌러서 고른다. 고른 색이 이 칸의 빛을 물들인다.
 * 사이트 전체의 색을 바꾸지 않는다: 견본을 만져 보는 자리일 뿐이고 어디에도 저장하지 않는다.
 */
export function AccentPicker({ accents }: { accents: readonly Accent[] }) {
  const [picked, setPicked] = useState(accents[0].name);

  function pick(accent: Accent, button: HTMLButtonElement) {
    setPicked(accent.name);
    button.closest<HTMLElement>(".tile")?.style.setProperty("--pick", accent.color);
  }

  return (
    <div className="accents" role="group" aria-label="강조색 미리보기">
      {accents.map((accent) => (
        <button
          key={accent.name}
          type="button"
          className="press"
          style={{ "--accent": accent.color } as React.CSSProperties}
          title={accent.name}
          aria-label={accent.name}
          aria-pressed={picked === accent.name}
          onClick={(event) => pick(accent, event.currentTarget)}
        />
      ))}
    </div>
  );
}
