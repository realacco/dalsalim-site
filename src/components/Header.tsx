import Link from "next/link";

import { SITE } from "@/config/site";

import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="site-logo">
          <Logo />
          {SITE.name}
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          <NavLink href="/use/">활용</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
