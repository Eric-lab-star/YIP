import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "텔레그램 봇과 첫 인사하기 — 개념 강의",
  description: "텔레그램 봇의 동작 원리와 메아리 봇 기본 흐름을 이해하는 개념 슬라이드",
};

export default function MathBot1GoalSlideLayout({
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
