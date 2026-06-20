import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAG와 임베딩 개념 강의 슬라이드",
  description: "RAG의 개념과 임베딩이 무엇인지 설명하는 강의 슬라이드",
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
