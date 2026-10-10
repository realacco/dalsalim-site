"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** 지금 그 아래 페이지를 보고 있으면 고른 상태로 그리는 머리의 메뉴 */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(href);

  return (
    <Link href={href} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}
