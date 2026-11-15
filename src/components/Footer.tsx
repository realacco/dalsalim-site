import { FOOTER_LEGAL, HELP, LEGAL, SITE } from "@/config/site";
import { type Locale, messages, withLang } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const m = messages(locale);
  // 정적으로 내보내므로 빌드한 해가 들어간다. 손으로 적으면 해가 바뀔 때 낡는다
  const year = new Date().getFullYear();
  const links = [
    { label: m.common.help, href: withLang(HELP, locale) },
    ...FOOTER_LEGAL.map((page) => ({ label: m.legal[page], href: withLang(LEGAL[page], locale) })),
  ];

  return (
    <footer className="site-footer">
      <div className="wrap">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <span className="contact">
          {m.common.contact} <span className="mail">{SITE.supportEmail}</span>
        </span>
        <span className="copyright">
          © {year} {SITE.copyrightHolder}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
