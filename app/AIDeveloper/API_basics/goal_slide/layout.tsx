import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API 개념 강의 슬라이드",
  description: "API의 개념과 제미나이 앱 vs API의 차이를 설명하는 강의 슬라이드",
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
