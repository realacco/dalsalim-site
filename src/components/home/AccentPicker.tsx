"use client";

import { useState } from "react";

export type Accent = { id: string; name: string; color: string };

/**
 * 강조색 견본 — 앱의 「화면」처럼 눌러서 고른다. 고른 색이 이 칸의 빛을 물들이고, 칸의 폰 사진이
 * 그 강조색으로 찍은 사진으로 바뀐다(`Phone` 의 `accentShot` — 사진 이름 끝의 `-<강조색>` 만 갈아 끼운다).
 * 사이트 전체의 색을 바꾸지 않는다: 견본을 만져 보는 자리일 뿐이고 어디에도 저장하지 않는다.
 * 스크립트가 없으면 처음 강조색의 사진 그대로다.
 */
export function AccentPicker({ label, accents }: { label: string; accents: readonly Accent[] }) {
  const [picked, setPicked] = useState(accents[0].name);

  function pick(accent: Accent, button: HTMLButtonElement) {
    setPicked(accent.name);
    const tile = button.closest<HTMLElement>(".tile");
    tile?.style.setProperty("--pick", accent.color);
    tile?.querySelectorAll<HTMLImageElement>("img[data-accent-alt]").forEach((img) => {
      img.src = img.src.replace(/-[a-z]+\.webp$/, `-${accent.id}.webp`);
      img.alt = (img.dataset.accentAlt ?? "").replace("{accent}", accent.name);
    });
  }

  return (
    <div className="accents" role="group" aria-label={label}>
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
