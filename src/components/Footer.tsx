import { FOOTER_LINKS, SITE } from "@/config/site";

export function Footer() {
  // 정적으로 내보내므로 빌드한 해가 들어간다. 손으로 적으면 해가 바뀔 때 낡는다
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        {FOOTER_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <span className="contact">
          문의 <span className="mail">{SITE.supportEmail}</span>
        </span>
        <span className="copyright">
          © {year} {SITE.copyrightHolder}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
