import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "내장함수와 표준 라이브러리 개념 강의 슬라이드",
	description:
		"input · int · len · range · max · min 내장함수와 import 로 라이브러리를 가져오는 법을 설명하는 강의 슬라이드",
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
