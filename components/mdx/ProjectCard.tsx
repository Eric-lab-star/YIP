import type { ReactNode } from "react";
import { doodleBox, ink } from "./doodle";

/**
 * 프로젝트 사례 한 개를 감싸는 카드. 헤더에 제목과 분야를 두고,
 * 본문에는 설명/수업 연결/링크를 MDX 로 자유롭게 작성한다.
 */
export function ProjectCard({
  title,
  field,
  children,
}: {
  title: string;
  field?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 px-3 py-5 sm:px-6" style={{ ...doodleBox }}>
      <div
        className="-mx-3 -mt-5 mb-4 flex flex-wrap items-center gap-2 rounded-t-[14px] px-3 py-3 text-lg font-bold sm:-mx-6 sm:px-6"
        style={{ backgroundColor: ink, color: "#fff" }}
      >
        <span className="min-w-0">{title}</span>
        {field && (
          <span
            className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-sm"
            style={{ color: "#fff" }}
          >
            {field}
          </span>
        )}
      </div>
      <div style={{ color: ink }}>{children}</div>
    </div>
  );
}
