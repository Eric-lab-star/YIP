import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "윤리적인 AI (2부) 실습 슬라이드",
  description: "AI 편향 관찰 실험과 가이드라인 만들기 실습 슬라이드",
};

export default function AIEthics2TaskSlideLayout({
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
