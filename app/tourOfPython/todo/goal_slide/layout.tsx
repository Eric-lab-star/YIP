import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "To-Do App 개념 강의 슬라이드",
	description:
		"할 일 목록 앱의 데이터 구조와 화면·데이터 함수 분리, 명령어 루프를 설명하는 강의 슬라이드",
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
