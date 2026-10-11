import Link from "next/link";

import { NAV, ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";

import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href={ROUTES.home} className="site-logo">
          <Logo />
          {SITE.name}
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
