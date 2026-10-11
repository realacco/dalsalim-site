import Link from "next/link";

import { SITE } from "@/config/site";

import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="site-logo">
          <Logo />
          {SITE.name}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
