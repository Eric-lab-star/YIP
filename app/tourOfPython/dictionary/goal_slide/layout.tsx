import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "딕셔너리 개념 강의 슬라이드",
	description: "키와 값의 짝으로 자료를 다루는 딕셔너리를 설명하는 강의 슬라이드",
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
