import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "matplotlib 나만의 그래프 그리기 실습 슬라이드",
	description: "matplotlib 나만의 그래프 그리기 실습 슬라이드",
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
