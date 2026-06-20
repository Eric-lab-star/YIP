import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청킹과 유사도 검색 개념 강의 슬라이드",
  description: "문서를 청크로 나누고 유사도 검색하는 개념을 설명하는 강의 슬라이드",
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
