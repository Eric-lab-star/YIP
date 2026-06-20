import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수학 풀이 봇 완성 실습 슬라이드",
  description: "사진 핸들러를 추가하고 완성형 봇을 만드는 실습 슬라이드",
};

export default function MathBot3TaskSlideLayout({
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
