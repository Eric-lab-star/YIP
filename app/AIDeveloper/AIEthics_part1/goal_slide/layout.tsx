import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "윤리적인 AI (1부) 개념 슬라이드",
  description: "AI 환각(hallucination) 현상의 원인과 대응 방법 개념 강의",
};

export default function AIEthics1GoalSlideLayout({
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
