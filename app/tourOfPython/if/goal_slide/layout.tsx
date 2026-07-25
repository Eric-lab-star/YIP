import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "조건문 개념 강의 슬라이드",
	description: "if / else / elif 로 상황을 나누는 법과 검사 순서를 설명하는 강의 슬라이드",
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
