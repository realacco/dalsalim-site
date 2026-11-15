import Link from "next/link";

import { navItems } from "@/config/routes";
import { homePath, type Locale, messages } from "@/i18n";

import { LanguageMenu } from "./LanguageMenu";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale }: { locale: Locale }) {
  const m = messages(locale);
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href={homePath(locale)} className="site-logo press">
          <Logo label={m.common.logo} />
          {m.site.name}
        </Link>
        <nav className="site-nav" aria-label={m.common.mainNav}>
          {navItems(locale).map((item) => (
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
        <LanguageMenu locale={locale} />
        <ThemeToggle label={m.common.themeToggle} />
      </div>
    </header>
  );
}
