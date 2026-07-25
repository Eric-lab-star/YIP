import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "함수 개념 강의 슬라이드",
	description: "def로 함수를 정의하고 매개변수와 return을 다루는 법을 설명하는 강의 슬라이드",
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
