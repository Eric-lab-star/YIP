import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프롬프트 엔지니어링 개념 강의 슬라이드",
  description: "좋은 프롬프트의 네 가지 핵심 요소를 설명하는 강의 슬라이드",
};

export default function GoalSlideLayout({
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
