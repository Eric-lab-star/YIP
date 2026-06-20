import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "윤리적인 AI (1부) 실습 슬라이드",
  description: "AI 환각 유도 실험과 안전장치 프롬프트 실습 슬라이드",
};

export default function AIEthics1TaskSlideLayout({
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
