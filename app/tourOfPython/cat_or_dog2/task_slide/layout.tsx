import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "강아지와 고양이 2 실습 슬라이드",
	description:
		"suggest() 를 조립해 추천 앱을 완성하고 나만의 앱으로 바꿔보는 실습 슬라이드",
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
