import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "강아지와 고양이 2 개념 강의 슬라이드",
	description:
		"f-string 과 중첩 조건문으로 suggest() 를 만들어 추천 앱을 완성하는 강의 슬라이드",
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
