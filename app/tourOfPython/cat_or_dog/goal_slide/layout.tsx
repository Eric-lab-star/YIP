import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "강아지와 고양이 1 개념 강의 슬라이드",
	description:
		"CLI 앱의 뼈대를 세우고 입력을 함수로 나누며 잘못된 입력을 막는 법을 설명하는 강의 슬라이드",
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
