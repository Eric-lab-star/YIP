import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "강아지와 고양이 1 실습 슬라이드",
	description:
		"start() 부터 색·크기 입력 함수까지 추천 앱의 뼈대를 만드는 실습 슬라이드",
};

export default function TaskSlideLayout({
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
