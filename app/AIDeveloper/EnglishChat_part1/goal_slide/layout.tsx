import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영어 대화 앱 (1부) 개념 슬라이드",
  description: "대화 히스토리와 페르소나로 AI 영어 선생님을 만드는 개념 강의",
};

export default function EnglishChat1GoalSlideLayout({
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
