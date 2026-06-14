import type { ReactNode } from "react";
import { doodleBox } from "./doodle";

type CalloutType = "goal" | "analogy" | "tip" | "important" | "note";

/** Color-coded doodle box. The heading text lives in the MDX body, so this
 *  only sets the tint + accent border by `type`. */
const variants: Record<CalloutType, { bg: string; border: string }> = {
  goal: { bg: "#E6F4FB", border: "#49B6E5" }, // sky — 학습 목표
  analogy: { bg: "#FFF6E9", border: "#D97706" }, // amber — 비유
  tip: { bg: "#EAF7EF", border: "#16A34A" }, // green — 팁
  important: { bg: "#FDECEC", border: "#DC2626" }, // red — 중요
  note: { bg: "#F4F1FB", border: "#8B5CF6" }, // violet — 메모
};

export function Callout({
  type = "tip",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const v = variants[type] ?? variants.tip;
  return (
    <div
      className="my-7 px-6 py-5 text-lg leading-[1.8]"
      style={{ ...doodleBox, backgroundColor: v.bg, borderColor: v.border }}
    >
      {children}
    </div>
  );
}
