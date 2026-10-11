import "./closing.css";

import { Logo } from "@/components/Logo";
import { PlatformStatus } from "@/components/PlatformStatus";

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="glow" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <Logo />
        <h2 id="closing-title">곧 만나요</h2>
        <PlatformStatus />
      </div>
    </section>
  );
}
