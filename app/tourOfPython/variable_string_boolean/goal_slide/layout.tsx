import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "변수·문자열·불리언 개념 강의 슬라이드",
	description: "변수와 문자열, 불리언을 설명하는 강의 슬라이드",
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
