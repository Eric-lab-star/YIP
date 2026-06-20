import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "윤리적인 AI (2부) 개념 슬라이드",
  description: "개인정보, 저작권, 공정성(편향) — AI 윤리 개념 강의",
};

export default function AIEthics2GoalSlideLayout({
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
