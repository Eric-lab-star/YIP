import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "and, or, not 개념 강의 슬라이드",
	description:
		"조건 여러 개를 and·or·not 으로 엮는 법을 VIP 판별과 RGB 색 계산기로 설명하는 강의 슬라이드",
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
