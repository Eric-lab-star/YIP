import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAG 챗봇 실습 미션 슬라이드",
  description: "RAG 챗봇 실습 미션 슬라이드",
};

export default function TaskSlideLayout({
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
