import Link from "next/link";

import { NAV, ROUTES } from "@/config/routes";
import { SITE } from "@/config/site";

import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href={ROUTES.home} className="site-logo press">
          <Logo />
          {SITE.name}
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="press"
              data-external={item.external || undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
