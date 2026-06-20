import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수학 봇 실습 (2부) — 사진 인식 & 풀이 생성",
  description: "사진 속 수학 문제를 인식하고 단계별 풀이를 생성하는 실습 미션 슬라이드",
};

export default function MathBot2TaskSlideLayout({
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
