import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "임베딩 실습 미션 슬라이드",
  description: "문장을 벡터로 변환하고 유사도를 비교하는 실습 미션 슬라이드",
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
