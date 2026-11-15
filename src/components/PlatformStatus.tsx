import { PLATFORMS } from "@/config/site";
import { type Locale, messages, withStoreLang } from "@/i18n";

/**
 * 받기 버튼의 자리. 아직 받을 수 없는 동안은 눌리지 않는 상태 표시이고,
 * `PLATFORMS` 의 `storeUrl` 을 채우면 같은 자리가 스토어로 가는 글자 버튼이 된다. 스토어 배지 그림은 쓰지 않는다.
 */
export function PlatformStatus({ locale }: { locale: Locale }) {
  const m = messages(locale).platforms;
  return (
    <div className="actions">
      {PLATFORMS.map((platform) => {
        const text = m[platform.id];
        return platform.storeUrl ? (
          <a
            key={platform.id}
            href={withStoreLang(platform.storeUrl, locale)}
            className="btn press"
          >
            {text.storeLabel}
          </a>
        ) : (
          <span key={platform.id} className="btn btn-pending">
            {`${text.name} ${text.pending}`}
          </span>
        );
      })}
    </div>
  );
}
