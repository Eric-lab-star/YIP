import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "최종 프로젝트 실습 슬라이드",
  description: "기획서 작성부터 발표·회고까지 단계별 미션 실습 슬라이드",
};

export default function FinalProjectTaskSlideLayout({
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
