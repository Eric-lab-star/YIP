import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프롬프트 엔지니어링 실습 미션 슬라이드",
  description: "나쁜 vs 좋은 프롬프트 비교 실습 미션 슬라이드",
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
