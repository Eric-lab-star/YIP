import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ".ipynb 개념 강의 슬라이드",
  description: ".py와 .ipynb의 차이점을 설명하는 개념 강의 슬라이드",
};

export default function GoalSlideLayout({
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
