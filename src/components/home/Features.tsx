import "./features.css";

import { AccentPicker } from "./AccentPicker";
import { Phone } from "@/components/Phone";
import { SECTIONS } from "@/config/routes";
import { type Locale, messages, type Messages } from "@/i18n";

import { Highlighted } from "./Highlighted";

type AccentId = keyof Messages["features"]["theme"]["accents"];

/** 강조색 여섯 — 앱의 「화면」에서 고르는 것과 같은 순서다. 이름은 `messages().features.theme.accents` */
const ACCENTS: { id: AccentId; color: string }[] = [
  { id: "blue", color: "var(--accent-blue)" },
  { id: "green", color: "var(--accent-green)" },
  { id: "purple", color: "var(--accent-purple)" },
  { id: "pink", color: "var(--accent-pink)" },
  { id: "beige", color: "var(--accent-beige)" },
  { id: "mono", color: "var(--accent-mono)" },
];

/** 작은 칸의 그림 — 24 칸 위에 선으로 그린다 */
const ICONS = {
  download: "M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14",
  widget: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  cloud: "M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 11.1 3.5 3.5 0 0 0 7 18z",
};

type SmallId = keyof Messages["features"]["small"];

const SMALL: { id: SmallId; icon: string }[] = [
  { id: "excel", icon: ICONS.download },
  { id: "widget", icon: ICONS.widget },
  { id: "offline", icon: ICONS.cloud },
];

/** 기능 묶음 — 결제 알림함 · 자산, 작은 칸 셋, 구독, 화면(테마). 알림함 · 구독 · 화면은 한 줄을 다 쓴다 */
export function Features({ locale }: { locale: Locale }) {
  const m = messages(locale).features;
  return (
    <section className="features" id={SECTIONS.features} aria-labelledby="features-title">
      <div className="wrap">
        <header className="section-head reveal">
          <p className="eyebrow">{m.eyebrow}</p>
          <h2 id="features-title">
            <Highlighted text={m.title} />
          </h2>
          <p className="soft">{m.lede}</p>
        </header>

        <div className="bento">
          <article className="tile tile-inbox tile-wide reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">{m.inbox.label}</p>
              <h3>{m.inbox.title}</h3>
              <p className="soft">{m.inbox.text}</p>
            </div>
            <div className="tile-shots">
              <Phone locale={locale} shot="inbox" alt={m.inbox.alts[0]} />
              <Phone locale={locale} shot="auto-records" alt={m.inbox.alts[1]} />
            </div>
          </article>

          <article className="tile tile-assets reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">{m.assets.label}</p>
              <h3>{m.assets.title}</h3>
              <p className="soft">{m.assets.text}</p>
            </div>
            <div className="tile-shots">
              <Phone locale={locale} shot="assets-dark" alt={m.assets.alt} />
            </div>
          </article>

          {SMALL.map((item) => (
            <article className="tile tile-small reveal" data-tilt="5" key={item.id}>
              <span className="tile-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
              </span>
              <h3>{m.small[item.id].title}</h3>
              <p className="soft">{m.small[item.id].text}</p>
            </article>
          ))}

          <article className="tile tile-subs tile-wide reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">{m.subscriptions.label}</p>
              <h3>{m.subscriptions.title}</h3>
              <p className="soft">{m.subscriptions.text}</p>
            </div>
            <div className="tile-shots">
              <Phone locale={locale} shot="subscriptions" alt={m.subscriptions.alts[0]} />
              <Phone locale={locale} shot="subscription-services" alt={m.subscriptions.alts[1]} />
            </div>
          </article>

          <article className="tile tile-theme tile-wide reveal" data-tilt="3">
            <div className="tile-text">
              <p className="tile-label">{m.theme.label}</p>
              <h3>{m.theme.title}</h3>
              <p className="soft">{m.theme.text}</p>
              <AccentPicker
                label={m.theme.pickerLabel}
                accents={ACCENTS.map((accent) => ({
                  name: m.theme.accents[accent.id],
                  color: accent.color,
                }))}
              />
            </div>
            <div className="tile-shots">
              <Phone locale={locale} shot="glance-pink" alt={m.theme.alts[0]} />
              <Phone locale={locale} shot="personal-spend-dark" alt={m.theme.alts[1]} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
