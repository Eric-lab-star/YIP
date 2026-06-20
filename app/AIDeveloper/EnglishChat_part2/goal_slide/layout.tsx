import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영어 대화 앱 (2부) 개념 슬라이드",
  description: "Streamlit 채팅 UI와 세션 상태, 표현 교정 기능 개념 강의",
};

export default function EnglishChat2GoalSlideLayout({
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
