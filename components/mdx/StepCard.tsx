import type { ReactNode } from "react";
import { doodleBox, ink, sky } from "./doodle";

/**
 * 한 단계/상황을 담는 카드. 좌상단에 `step` 배지(예: "상황", "목표")와
 * 굵은 `title` 을 두고, 그 아래에 MDX 본문(children)을 렌더한다.
 */
export function StepCard({
  step,
  title,
  children,
}: {
  step: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-7 px-6 py-5" style={{ ...doodleBox }}>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span
          className="rounded-full px-3 py-1 text-sm font-bold"
          style={{ backgroundColor: sky, color: "#fff" }}
        >
          {step}
        </span>
        {title && (
          <span className="text-xl font-bold" style={{ color: ink }}>
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
