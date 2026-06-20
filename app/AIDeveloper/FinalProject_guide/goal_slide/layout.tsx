import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "최종 프로젝트 안내 슬라이드",
  description: "나만의 AI 앱 최종 프로젝트 기획·제작·발표 안내 슬라이드",
};

export default function FinalProjectGoalSlideLayout({
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
