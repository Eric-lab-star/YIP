import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "seaborn 더 예쁜 그래프 그리기 개념 강의 슬라이드",
	description: "seaborn 더 예쁜 그래프 그리기 개념 강의 슬라이드",
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
