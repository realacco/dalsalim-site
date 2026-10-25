"use client";

import { useEffect } from "react";

/*
  손에 반응하는 움직임 — 앱의 `Touchable` 과 같은 말을 쓴다. 그리는 것은 CSS 이고 여기는 손의 자리만 건넨다.

  - 누른 자리에서 퍼지는 면 (`.ripple`) — 앱의 목록 줄처럼, 누른 점에서 배경이 번진다
  - 스크롤하면 떠오르는 칸 (`.reveal`) — 같이 화면에 든 칸은 위 · 왼쪽부터 차례로
  - 마우스를 따라 기우는 면 (`[data-tilt]`) — 누를 수 없는 칸은 줄지 않고 기울기만 한다
  - 스크롤하면 머리 아래 선 (`.site-header[data-scrolled]`)

  「움직임 줄이기」면 떠오르기 · 기울기를 걸지 않는다 — 처음부터 선 모습이 완성된 화면이다.
  스크립트가 없으면 아무것도 숨기지 않는다: 칸을 숨기는 규칙은 여기서 html 에 표시를 단 뒤에만 먹는다.
*/
export function Motion() {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [trackHeader(), spreadOnPress()];
    if (!calm) {
      cleanups.push(revealOnScroll());
      // 손가락에는 따라갈 자리가 없다 — 마우스처럼 떠 있는 포인터에만 건다
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        cleanups.push(tiltOnPointer());
      }
    }
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}

/** 머리 아래 선은 첫 화면을 벗어난 뒤에만 — 맨 위에서는 빛이 머리 뒤로 이어진다 */
function trackHeader() {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return () => {};
  let frame = 0;
  const update = () => {
    frame = 0;
    header.toggleAttribute("data-scrolled", window.scrollY > 8);
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(frame);
  };
}

/** 누른 점을 면에 건넨다. 퍼짐은 누르는 동안, 사라짐은 손을 뗄 때 */
function spreadOnPress() {
  const release = (target: HTMLElement) => {
    target.classList.remove("is-pressed");
    target.classList.add("is-released");
  };
  const onDown = (event: PointerEvent) => {
    const target = (event.target as Element | null)?.closest<HTMLElement>(".ripple");
    if (!target) return;
    const box = target.getBoundingClientRect();
    target.style.setProperty("--ripple-x", `${event.clientX - box.left}px`);
    target.style.setProperty("--ripple-y", `${event.clientY - box.top}px`);
    // 누른 점에서 가장 먼 모서리까지 덮는 지름
    target.style.setProperty("--ripple-size", `${Math.hypot(box.width, box.height) * 2}px`);
    target.classList.remove("is-pressed", "is-released");
    // 같은 줄을 다시 누르면 퍼짐을 처음부터 — 표시를 뗀 상태를 한 번 그리게 한다
    void target.offsetWidth;
    target.classList.add("is-pressed");
    const end = () => {
      release(target);
      target.removeEventListener("pointerup", end);
      target.removeEventListener("pointercancel", end);
      target.removeEventListener("pointerleave", end);
    };
    target.addEventListener("pointerup", end);
    target.addEventListener("pointercancel", end);
    target.addEventListener("pointerleave", end);
  };
  document.addEventListener("pointerdown", onDown);
  return () => document.removeEventListener("pointerdown", onDown);
}

function revealOnScroll() {
  const root = document.documentElement;
  const items = [...document.querySelectorAll<HTMLElement>(".reveal")];
  if (items.length === 0 || !("IntersectionObserver" in window)) return () => {};

  // 이미 화면에 있거나 지나간 칸은 숨겼다 다시 띄우지 않는다 — 새로고침하면 깜빡인다
  for (const item of items) {
    if (item.getBoundingClientRect().top < window.innerHeight) item.classList.add("is-shown");
  }
  root.classList.add("motion-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      const arriving = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        .sort((a, b) => {
          const boxA = a.getBoundingClientRect();
          const boxB = b.getBoundingClientRect();
          return boxA.top - boxB.top || boxA.left - boxB.left;
        });
      arriving.forEach((item, order) => {
        item.style.setProperty("--reveal-delay", `${Math.min(order, 4) * 80}ms`);
        item.classList.add("is-shown");
        observer.unobserve(item);
      });
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  items
    .filter((item) => !item.classList.contains("is-shown"))
    .forEach((item) => observer.observe(item));

  return () => {
    observer.disconnect();
    root.classList.remove("motion-reveal");
  };
}

/** 포인터가 면 위 어디에 있는지를 기울기(도)와 빛의 자리(%)로 건넨다. 값은 `data-tilt` 에 적힌 최대 각도까지 */
function tiltOnPointer() {
  const surfaces = [...document.querySelectorAll<HTMLElement>("[data-tilt]")];
  const cleanups = surfaces.map((surface) => {
    const limit = Number(surface.dataset.tilt) || 4;
    let frame = 0;
    let point = { x: 0.5, y: 0.5 };
    const paint = () => {
      frame = 0;
      surface.style.setProperty("--tilt-x", `${((point.x - 0.5) * 2 * limit).toFixed(2)}deg`);
      surface.style.setProperty("--tilt-y", `${((0.5 - point.y) * 2 * limit).toFixed(2)}deg`);
      surface.style.setProperty("--glow-x", `${(point.x * 100).toFixed(1)}%`);
      surface.style.setProperty("--glow-y", `${(point.y * 100).toFixed(1)}%`);
    };
    const onMove = (event: PointerEvent) => {
      const box = surface.getBoundingClientRect();
      point = {
        x: (event.clientX - box.left) / box.width,
        y: (event.clientY - box.top) / box.height,
      };
      surface.classList.add("is-tilting");
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      surface.classList.remove("is-tilting");
      surface.style.removeProperty("--tilt-x");
      surface.style.removeProperty("--tilt-y");
    };
    surface.addEventListener("pointermove", onMove);
    surface.addEventListener("pointerleave", onLeave);
    return () => {
      onLeave();
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerleave", onLeave);
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
