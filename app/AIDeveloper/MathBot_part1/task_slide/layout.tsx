import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "텔레그램 메아리 봇 실습 슬라이드",
  description: "BotFather로 봇을 만들고 메아리 봇을 실행하는 실습 미션 슬라이드",
};

export default function MathBot1TaskSlideLayout({
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
