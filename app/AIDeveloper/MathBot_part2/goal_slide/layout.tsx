import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사진을 보고 푸는 수학 봇 (2부) — 개념 강의",
  description: "멀티모달 인식과 단계별 풀이 프롬프트의 원리를 이해하는 개념 슬라이드",
};

export default function MathBot2GoalSlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      {children}
    </div>
  );
}
