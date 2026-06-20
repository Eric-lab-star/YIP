import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 앱 1부 개념 강의 슬라이드",
  description: "블로그 앱 1부 개념 강의 슬라이드",
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
