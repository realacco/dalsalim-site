import { PLATFORMS } from "@/config/site";

/**
 * 받기 버튼의 자리. 아직 받을 수 없는 동안은 눌리지 않는 상태 표시이고,
 * `PLATFORMS` 의 `storeUrl` 을 채우면 같은 자리가 스토어로 가는 글자 버튼이 된다. 스토어 배지 그림은 쓰지 않는다.
 */
export function PlatformStatus() {
  return (
    <div className="actions">
      {PLATFORMS.map((platform) =>
        platform.storeUrl ? (
          <a key={platform.name} href={platform.storeUrl} className="btn">
            {platform.storeLabel}
          </a>
        ) : (
          <span key={platform.name} className="btn btn-pending">
            {`${platform.name} ${platform.pending}`}
          </span>
        ),
      )}
    </div>
  );
}
