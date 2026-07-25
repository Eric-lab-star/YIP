import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "숫자 맞히기 게임 개념 강의 슬라이드",
	description:
		"게임 규칙 설계부터 random, while, try...except, 함수 분리까지 설명하는 강의 슬라이드",
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
