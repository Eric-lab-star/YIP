import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LangChain 실습 미션 슬라이드",
  description: "LangChain Tool과 Agent를 직접 만드는 실습 미션 슬라이드",
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
