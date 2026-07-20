import type { ReactNode } from "react";
import { doodleBox, ink, sky } from "./doodle";

/**
 * 실습 미션 한 개를 감싸는 카드. 헤더에 "미션 N · 제목 (시간)" 을 두고,
 * 본문에는 안내 글/코드/체크 항목 등을 MDX 로 자유롭게 작성한다.
 */
export function MissionCard({
  number,
  title,
  time,
  children,
}: {
  number: number | string;
  title: string;
  time?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 px-6 py-5" style={{ ...doodleBox }}>
      <div
        className="-mx-6 -mt-5 mb-4 flex flex-wrap items-center gap-2 rounded-t-[14px] px-6 py-3 text-lg font-bold"
        style={{ backgroundColor: sky, color: "#fff" }}
      >
        <span>미션 {number}</span>
        <span aria-hidden style={{ opacity: 0.7 }}>
          ·
        </span>
        <span>{title}</span>
        {time && (
          <span
            className="ml-auto rounded-full bg-white/25 px-2.5 py-0.5 text-sm"
            style={{ color: "#fff" }}
          >
            {time}
          </span>
        )}
      </div>
      <div style={{ color: ink }}>{children}</div>
    </div>
  );
}
