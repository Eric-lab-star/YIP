import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수학 풀이 봇 완성하기 개념 슬라이드",
  description: "봇 대화 기능과 사진 풀이 기능을 조립해 완성형 봇을 만드는 개념 강의",
};

export default function MathBot3GoalSlideLayout({
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
